#!/bin/bash

# Accessibility audit with axe over every route of a running site, in both
# light and dark mode. Dark mode is exercised twice: emulated
# prefers-color-scheme (what a first-time visitor gets) and the explicit
# header toggle (what a choosing visitor gets).
#
# Usage: ./scripts/axe-playwright-audit.sh [base-url]
# The base URL must point at a running dev or preview server.

URL="${1:-http://localhost:4173/felix-ds-demo-site/}"
OUTPUT="accessibility-report"

if [ ! -d "node_modules/playwright" ] || [ ! -d "node_modules/axe-playwright" ]; then
	echo "Installing dependencies..."
	bun install
fi

echo "Auditing $URL ..."

cat >temp_audit.cjs <<'EOF'
const { chromium } = require('playwright');
const { injectAxe, getViolations } = require('axe-playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = process.argv[2];
const outputDir = process.argv[3];

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Route discovery – same single source of truth as the prerender script.
const root = __dirname.replace(/scripts$/, ''); // temp script lives at repo root
function discoverRoutes() {
    const routerSrc = fs.readFileSync(path.join(root, 'src/router/index.ts'), 'utf-8');
    const blocks = routerSrc.split(/}\s*,\s*\{/);
    return blocks.flatMap((block) => {
        const pathMatch = block.match(/path:\s*['"`]([^'"`]+)['"`]/);
        if (!pathMatch || pathMatch[1].includes(':')) return [];
        return [pathMatch[1]];
    });
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const routes = discoverRoutes();
    const results = [];
    let totalViolations = 0;

    // Three passes: light, dark via emulated system preference, dark via the
    // explicit header toggle (checked on one representative page).
    const passes = [
        { name: 'light', colorScheme: 'light', toggle: false, routes },
        { name: 'dark-emulated', colorScheme: 'dark', toggle: false, routes },
        { name: 'dark-toggle', colorScheme: 'light', toggle: true, routes: ['/'] }
    ];

    for (const pass of passes) {
        const context = await browser.newContext({
            colorScheme: pass.colorScheme,
            viewport: { width: 1280, height: 900 }
        });
        const page = await context.newPage();

        if (pass.toggle) {
            // Make the explicit choice once, then audit with it persisted.
            await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
            await page.click('.app-header .color-mode-toggle');
        }

        for (const route of pass.routes) {
            const url = new URL(route.replace(/^\//, ''), baseUrl).href;
            try {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

                // The toggle pass relies on the persisted localStorage choice.
                const mode = await page.evaluate(() =>
                    document.documentElement.getAttribute('data-color-mode')
                );
                const expectDark = pass.name !== 'light';
                if (expectDark && mode !== 'dark') {
                    results.push({
                        pass: pass.name,
                        url,
                        error: `expected dark mode, got "${mode}"`,
                        count: -1
                    });
                    continue;
                }

                await injectAxe(page);
                const violations = await getViolations(page, null, {
                    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
                });

                const count = violations.length;
                totalViolations += count;
                const label =
                    count === 0 ? 'PASS' : `FAIL (${count})`;
                console.log(`[${pass.name}] ${route} -> ${label}`);
                if (count > 0) {
                    for (const v of violations) {
                        console.log(
                            `    ${v.id}: ${v.nodes.length} nodes – ${v.help} (${v.nodes[0]?.target?.join(' ') ?? ''})`
                        );
                    }
                }
                results.push({ pass: pass.name, url, violations, count });
            } catch (error) {
                results.push({ pass: pass.name, url, error: error.message, count: -1 });
                console.log(`[${pass.name}] ${route} -> ERROR ${error.message}`);
            }
        }
        await context.close();
    }

    await browser.close();

    const pagesAudited = results.length;
    const pagesWithIssues = results.filter((r) => r.count !== 0).length;

    fs.writeFileSync(`${outputDir}/results.json`, JSON.stringify(results, null, 2));

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Accessibility Report</title>
	<style>
		body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 40px auto; padding: 20px; }
		h1 { color: #1e40af; }
		.summary { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; display: flex; gap: 30px; }
		.stat { text-align: center; }
		.stat-value { font-size: 3em; font-weight: bold; }
		.stat-label { color: #6b7280; margin-top: 5px; }
		table { width: 100%; border-collapse: collapse; background: white; }
		th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e5e7eb; }
		th { background: #f9fafb; font-weight: 600; }
		.pass { color: #059669; font-weight: bold; }
		.fail { color: #dc2626; font-weight: bold; }
		.error { color: #f59e0b; }
	</style>
</head>
<body>
	<h1>Accessibility Audit</h1>
	<div class="summary">
		<div class="stat"><div class="stat-value" style="color: #1e40af;">${pagesAudited}</div><div class="stat-label">Audits</div></div>
		<div class="stat"><div class="stat-value" style="color: #dc2626;">${totalViolations}</div><div class="stat-label">Violations</div></div>
		<div class="stat"><div class="stat-value" style="color: #059669;">${pagesAudited - pagesWithIssues}</div><div class="stat-label">Clean Audits</div></div>
	</div>
	<table>
		<thead><tr><th>Pass</th><th>Page</th><th>Status</th></tr></thead>
		<tbody>
		${results
            .map((r) => {
                const urlShort = r.url.replace(baseUrl, '/') || '/';
                let status;
                if (r.count === -1) status = '<span class="error">Error</span>';
                else if (r.count === 0) status = '<span class="pass">Pass</span>';
                else status = `<span class="fail">${r.count} violations</span>`;
                return `<tr><td>${r.pass}</td><td>${urlShort}</td><td>${status}</td></tr>`;
            })
            .join('')}
		</tbody>
	</table>
	<p style="margin-top: 40px; color: #6b7280;">
		Generated: ${new Date().toLocaleString()}<br>
		Detailed JSON: results.json
	</p>
</body>
</html>`;
    fs.writeFileSync(`${outputDir}/report.html`, html);

    console.log(`\nSummary: ${pagesAudited} audits, ${totalViolations} violations, ${pagesWithIssues} audits with issues`);
    console.log(`Report: ${outputDir}/report.html`);

    process.exit(totalViolations === 0 && pagesWithIssues === 0 ? 0 : 1);
})();
EOF

node temp_audit.cjs "$URL" "$OUTPUT"
NODE_EXIT_CODE=$?
rm -f temp_audit.cjs

if [ $NODE_EXIT_CODE -ne 0 ]; then
	echo "Audit FAILED (violations or errors above)"
	exit $NODE_EXIT_CODE
fi

echo "Audit passed: zero violations"
