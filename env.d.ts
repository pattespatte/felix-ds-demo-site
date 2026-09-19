/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly SSR?: boolean
    readonly BASE_URL?: string
    readonly MODE?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
