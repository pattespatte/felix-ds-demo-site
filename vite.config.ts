import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
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
