/**
 * Generates src/icons/phosphor-spritesheet.ts — the Phosphor extension of
 * FIcon's "f" icon library.
 *
 * The FKUI default library (@fkui/icon-lib-default) ships 31 utility icons
 * with no medical or content glyphs. This script server-renders a curated
 * set of Phosphor icons (https://phosphoricons.com, MIT) with
 * @phosphor-icons/vue at a fixed weight per icon, captures the <path> markup
 * and writes it as SVG symbols with `f-icon-*` ids, so `<f-icon name="...">`
 * renders them like any default-library icon.
 *
 * The set mirrors the icon choices of the sibling swedish-healthcare-demo-site
 * (same concepts, same glyphs). Icons that the default library already covers
 * (search, calendar, arrow-right, ...) stay FKUI — only additions live here.
 *
 * Run after editing ICONS: `bun run generate:icons`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import * as PhosphorIcons from '@phosphor-icons/vue'

// felix icon name -> [Phosphor component, weight]
// Card glyphs use the "fill" weight (like the sibling site's cards); list and
// toggle glyphs use "regular".
const ICONS = {
    // ServicesPage — vårdtjänster. NOTE: the sibling site writes <PhChild> for
    // BVC, but @phosphor-icons/vue has no such icon (renders nothing there);
    // baby-carriage is the closest existing child glyph.
    stethoscope: ['PhStethoscope', 'fill'],
    baby: ['PhBaby', 'fill'],
    'baby-carriage': ['PhBabyCarriage', 'fill'],
    'test-tube': ['PhTestTube', 'fill'],
    brain: ['PhBrain', 'fill'],
    // MyPagesPage — tjänstekort
    'calendar-check': ['PhCalendarCheck', 'fill'],
    'file-text': ['PhFileText', 'fill'],
    prescription: ['PhPrescription', 'fill'],
    'chat-circle': ['PhChatCircle', 'fill'],
    // MyPagesPage — informationslista
    'shield-check': ['PhShieldCheck', 'regular'],
    eye: ['PhEye', 'regular'],
    'warning-circle': ['PhWarningCircle', 'regular'],
    'sign-out': ['PhSignOut', 'regular'],
    // HomeView — startssidans genvägskort
    'computer-tower': ['PhComputerTower', 'regular'],
    headset: ['PhHeadset', 'regular'],
    // BookAppointmentPage — bokningskort och bokningsinformation
    'warning-circle-fill': ['PhWarningCircle', 'fill'],
    syringe: ['PhSyringe', 'fill'],
    'identification-card': ['PhIdentificationCard', 'regular'],
    // ColorModeToggle
    sun: ['PhSun', 'regular'],
    moon: ['PhMoon', 'regular']
}

async function renderIconPaths(component, weight) {
    const html = await renderToString(createSSRApp({ render: () => h(component, { weight }) }))
    // SSR emits fragment anchor comments around the <g> wrapper; keep the
    // inner path markup only.
    const inner = html
        .replace(/<!--[\s\S]*?-->/g, '')
        .match(/<g>([\s\S]*)<\/g>/)[1]
        .trim()
    const unexpected = inner.match(/<(?!path[\s>])\w+/)
    if (unexpected) {
        throw new Error(`expected only <path> elements, found ${unexpected[0]}`)
    }
    // Phosphor relies on the fill inherited from the <svg> root; make it
    // explicit on each path so the symbol colors from CSS like FKUI glyphs.
    return inner.replaceAll('<path ', '<path fill="currentColor" ')
}

async function main() {
    const lines = []
    const names = Object.keys(ICONS)
    for (const name of names) {
        const [componentName, weight] = ICONS[name]
        const component = PhosphorIcons[componentName]
        if (!component) {
            throw new Error(`@phosphor-icons/vue has no export named ${componentName}`)
        }
        const paths = await renderIconPaths(component, weight)
        lines.push(
            `    '<symbol id="f-icon-${name}" viewBox="0 0 256 256" data-phosphor-weight="${weight}">${paths}</symbol>'`
        )
        console.log(`  ✓ ${name} (${weight})`)
    }

    const header = `// GENERATED FILE — do not edit. Regenerate with \`bun run generate:icons\`.
//
// Phosphor extension of FIcon's "f" icon library (see
// scripts/generate-phosphor-spritesheet.mjs). Phosphor Icons
// (https://phosphoricons.com) — MIT license, (c) Phosphor Icons — rendered
// from @phosphor-icons/vue at the weight noted per symbol. Icons present in
// the FKUI default library are NOT duplicated here; <f-icon> resolves this
// sheet the same way as the default one (symbol id lookup).
//
// Symbols: ${names.join(', ')}.

const SPRITESHEET =
    '<svg xmlns="http://www.w3.org/2000/svg" focusable="false">' +
`
    const closingSvg = `    '</svg>'`

    const footer = `
// Mirrors @fkui/icon-lib-default's injection: a hidden <div> appended to
// <body>, after DOMContentLoaded when the document is still loading.
function injectPhosphorSpritesheet() {
    const element = document.createElement('div')
    element.innerHTML = SPRITESHEET
    element.style.display = 'none'
    element.setAttribute('aria-hidden', 'true')
    element.setAttribute('data-icon-package', 'phosphor-icons (custom)')
    element.setAttribute('data-icon-library', 'f')
    document.body.append(element)
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectPhosphorSpritesheet()
        })
    } else {
        injectPhosphorSpritesheet()
    }
}
`

    const content =
        header + lines.map((line) => `${line} +`).join('\n') + '\n' + closingSvg + footer

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const target = path.resolve(__dirname, '../src/icons/phosphor-spritesheet.ts')
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content, 'utf-8')
    console.log(`wrote ${path.relative(process.cwd(), target)} (${names.length} symbols)`)
}

main().catch((err) => {
    console.error('[generate-phosphor-spritesheet] failed:', err)
    process.exit(1)
})
