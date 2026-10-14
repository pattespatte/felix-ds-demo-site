// Copies the pinned @sveltia/cms bundle from node_modules into public/admin/
// so the admin UI is self-hosted: no CDN dependency for a page that handles
// GitHub tokens, and the CMS version is locked in package.json. The copied
// files are gitignored; this script runs as part of the dev and build
// scripts, and in CI (bun install → bun run build).
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const src = fileURLToPath(new URL('../node_modules/@sveltia/cms/dist/', import.meta.url))
const dest = fileURLToPath(new URL('../public/admin/', import.meta.url))

if (!existsSync(src)) {
    console.error(
        '[sveltia-cms] node_modules/@sveltia/cms/dist not found — run the install step first.'
    )
    process.exit(1)
}

// Remove any previously copied bundle files (the chunk set can change
// between versions) but keep index.html and config.yml in place.
for (const entry of ['sveltia-cms.js', 'sveltia-cms.js.map', 'chunks']) {
    rmSync(`${dest}${entry}`, { recursive: true, force: true })
}

// sveltia-cms.js lazily imports ./chunks/*.js for optional features, so the
// chunks directory must sit next to the bundle. Source maps are not needed.
cpSync(src, dest, {
    recursive: true,
    filter: (file) => !file.endsWith('.map') && !file.endsWith('.mjs')
})

const copied = readdirSync(dest).filter((f) => f !== 'index.html' && f !== 'config.yml')
console.log(`[sveltia-cms] copied bundle to public/admin/: ${copied.join(', ')}`)
