/**
 * Prerender script — generates static .html for every route by loading the
 * built SPA in headless Chromium (Playwright) and snapshotting the rendered DOM.
 *
 * Replaces the previous vite-ssg pipeline. Unlike server-side rendering, this
 * never evaluates the app's Vue modules in Node — the page boots in a real
 * browser exactly as it does in production, so browser-only dependencies
 * (e.g. anything that touches `document` at import time) work without patches.
 *
 * Run after `vite build` has produced `dist/`. The base path
 * (`/felix-ds-demo-site/` in production) is read from the built
 * index.html so the preview server matches GitHub Pages.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'node:http'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const MIME = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.map': 'application/json'
}

// --- route discovery: parse the router source (single source of truth) ------

/**
 * Extract static routes (path + expected title) from src/router/index.ts.
 * Dynamic segments (e.g. the 404 catch-all) are skipped — they can't be
 * prerendered without a concrete value. Keep this in sync with the router.
 */
function discoverRoutes() {
	const routerSrc = fs.readFileSync(path.join(root, 'src/router/index.ts'), 'utf-8')
	// each route block: path: '...', ... meta: { title: '...', description: '...' }
	const blocks = routerSrc.split(/}\s*,\s*\{/)
	return blocks.flatMap(block => {
		const pathMatch = block.match(/path:\s*['"`]([^'"`]+)['"`]/)
		const titleMatch = block.match(/title:\s*['"`]([^'"`]+)['"`]/)
		if (!pathMatch || pathMatch[1].includes(':')) return []
		return [{ path: pathMatch[1], title: titleMatch ? titleMatch[1] : null }]
	})
}

// --- static file server over dist/ -----------------------------------------

function startStaticServer(basePath) {
	return new Promise(resolve => {
		const server = http.createServer((req, res) => {
			try {
				let urlPath = decodeURIComponent(req.url.split('?')[0])
				// strip the base path so dist/ is served at its root
				if (basePath && urlPath.startsWith(basePath)) {
					urlPath = urlPath.slice(basePath.length) || '/'
				}
				if (urlPath.endsWith('/')) urlPath += 'index.html'

				let filePath = path.join(distDir, urlPath)
				// if a path has no extension and isn't a real file, try .html
				if (!path.extname(filePath) && !fs.existsSync(filePath)) {
					filePath = filePath + '.html'
				}
				if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
					filePath = path.join(distDir, 'index.html')
				}

				const ext = path.extname(filePath)
				res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
				fs.createReadStream(filePath).pipe(res)
			} catch (err) {
				res.statusCode = 500
				res.end(String(err))
			}
		})
		server.listen(0, '127.0.0.1', () => {
			const port = server.address().port
			resolve({ server, port })
		})
	})
}

// --- output path mapping -----------------------------------------------------

/**
 * Map a route path to its output file under dist/, matching the layout the
 * previous vite-ssg build produced:
 *   "/"            -> dist/index.html
 *   "/om-oss"      -> dist/om-oss.html
 *   "/boka-tid/form" -> dist/boka-tid/form.html
 */
function routeToOutputPath(routePath) {
	const clean = routePath.replace(/^\//, '')
	if (clean === '') return path.join(distDir, 'index.html')
	return path.join(distDir, `${clean}.html`)
}

// --- main -------------------------------------------------------------------

async function main() {
	if (!fs.existsSync(distDir)) {
		console.error(`[prerender] dist/ not found — run "vite build" first.`)
		process.exit(1)
	}

	const routes = discoverRoutes()
	console.log(`[prerender] discovered ${routes.length} routes from src/router/index.ts`)

	// Read the base path from the built index.html (production uses the repo
	// subdir; local dev uses '/'). We preview the already-built dist, so this
	// matches whatever Vite wrote.
	const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
	const assetSrc = indexHtml.match(/src="([^"]+\/assets\/)/)
	const basePath = assetSrc ? new URL(assetSrc[1], 'http://x').pathname.replace(/\/assets\/$/, '/') : '/'
	console.log(`[prerender] base path detected: "${basePath}"`)

	const { server, port } = await startStaticServer(basePath)
	const origin = `http://127.0.0.1:${port}${basePath === '/' ? '' : basePath}`
	console.log(`[prerender] preview server: ${origin}`)

	const browser = await chromium.launch()

	let written = 0
	for (const route of routes) {
		// origin ends with the base path (e.g. ".../swedish-healthcare-demo-site/");
		// strip the leading slash from the route to avoid a double-slash URL,
		// which vue-router would fail to match (landing on the 404 catch-all).
		const routeSuffix = route.path === '/' ? '' : route.path.replace(/^\//, '')
		const url = `${origin}${routeSuffix}`
		const outPath = routeToOutputPath(route.path)

		// a fresh page per route avoids a vue-router/history issue where
		// reusing a page across navigations lands on the catch-all (404) route.
		const page = await browser.newPage()
		try {
			await page.goto(url, { waitUntil: 'networkidle' })
			await page.waitForSelector('#app:not(:empty)', { timeout: 10000 })
			if (route.title) {
				try {
					await page.waitForFunction(expected => document.title === expected, route.title, { timeout: 5000 })
				} catch {
					// title didn't match expected — snapshot anyway so the content
					// is still captured; the title will be flagged below
					const actual = await page.title()
					console.warn(`  ! title mismatch for ${route.path}: expected "${route.title}", got "${actual}"`)
				}
			}
			fs.mkdirSync(path.dirname(outPath), { recursive: true })
			const html = await page.content()
			fs.writeFileSync(outPath, html)
			written++
			console.log(`  ✓ ${route.path === '/' ? '/' : route.path} -> ${path.relative(distDir, outPath)}`)
		} finally {
			await page.close()
		}
	}

	await browser.close()
	server.close()
	console.log(`[prerender] wrote ${written} static HTML files to dist/`)
}

main().catch(err => {
	console.error('[prerender] failed:', err)
	process.exit(1)
})
