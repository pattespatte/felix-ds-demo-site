import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// Faces rendered above the fold on every page (hero heading + body text).
// The italic faces are only used in scattered places and stay un-preloaded
// so pages that never show italics don't pay for them.
const ABOVE_THE_FOLD_FONTS = [
    'noto-sans-v42-latin-regular',
    'noto-sans-v42-latin-600',
    'roboto-slab-v36-latin-600'
]

// Fonts referenced from CSS are only discovered after the stylesheet has
// downloaded and parsed, serializing the font fetch behind it (a full extra
// round trip on slow connections). Preloading the above-the-fold faces lets
// them download in parallel with the CSS. The filenames are content-hashed,
// so they are read from the bundle at build time instead of hardcoded.
function preloadAboveTheFoldFonts(): Plugin {
    let base = '/'
    return {
        name: 'preload-above-the-fold-fonts',
        apply: 'build',
        enforce: 'post',
        configResolved(config) {
            base = config.base
        },
        generateBundle(_, bundle) {
            const html = bundle['index.html']
            if (!html || html.type !== 'asset') {
                this.warn('no index.html asset found, skipping font preloads')
                return
            }
            const preloads = Object.keys(bundle)
                .filter(
                    (name) =>
                        name.endsWith('.woff2') &&
                        // match the pre-hash segment: a bare includes() would
                        // also hit 600italic for the 600 face
                        ABOVE_THE_FOLD_FONTS.some((font) => name.includes(`${font}-`))
                )
                .sort(
                    (a, b) =>
                        ABOVE_THE_FOLD_FONTS.findIndex((font) => a.includes(font)) -
                        ABOVE_THE_FOLD_FONTS.findIndex((font) => b.includes(font))
                )
            if (preloads.length !== ABOVE_THE_FOLD_FONTS.length) {
                this.warn(
                    `expected ${ABOVE_THE_FOLD_FONTS.length} above-the-fold font assets, ` +
                        `found ${preloads.length}; check the font filenames from the theme`
                )
            }
            const links = preloads
                .map(
                    (name) =>
                        `<link rel="preload" href="${base}${name}" as="font" type="font/woff2" crossorigin>`
                )
                .join('')
            html.source = String(html.source).replace('<head>', `<head>${links}`)
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preloadAboveTheFoldFonts(),
        vue({
            template: {
                compilerOptions: {
                    // FKUI registers its custom elements (ce-page-layout,
                    // ce-resize-pane, ...) at runtime; only those tags are
                    // native custom elements, everything hyphenated is not.
                    isCustomElement: (tag) => tag.startsWith('ce-')
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: process.env.NODE_ENV === 'production' ? '/felix-ds-demo-site/' : '/'
})
