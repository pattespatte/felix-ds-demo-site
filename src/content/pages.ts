import { load } from 'js-yaml'
import type { PageContent } from './types'

// Content pages are parsed once at build/startup; the files are small and
// this keeps the generic ContentPage view synchronous. The map key is the
// file basename and matches the `content` prop on the route.
const rawPages = import.meta.glob('./pages/*.yml', {
    query: '?raw',
    import: 'default',
    eager: true
}) as Record<string, string>

export const pages = new Map<string, PageContent>(
    Object.entries(rawPages).map(([path, raw]) => [
        path.slice(path.lastIndexOf('/') + 1).replace(/\.yml$/, ''),
        load(raw) as PageContent
    ])
)

export function getPage(key: string): PageContent {
    const page = pages.get(key)
    if (!page) {
        throw new Error(
            `No content page found for key "${key}" (expected src/content/pages/${key}.yml)`
        )
    }
    return page
}
