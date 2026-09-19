import { computed } from 'vue'
import { useRoute, type Router } from 'vue-router'

interface PageTitle {
    title: string
    description?: string
}

/**
 * Reactive access to the current route's page title metadata. The document
 * title and meta tags are kept in sync by `installPageTitleSync`, which the
 * app entry calls once with the router instance.
 */
export function usePageTitle() {
    const route = useRoute()
    const pageTitle = computed<PageTitle>(() => ({
        title: (route.meta.title as string) ?? '',
        description: route.meta.description as string | undefined
    }))
    return { pageTitle }
}

function upsertMetaTag(name: string, content: string): void {
    if (typeof document === 'undefined') {
        return
    }
    let tag = document.querySelector(`meta[name="${name}"]`)
    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
}

/**
 * Wires route metadata to the document head: title, description and the
 * noindex robots tags. Runs client-side on every navigation; during
 * prerender the snapshot is taken after these have executed, so the static
 * HTML inherits the right head per route.
 */
export function installPageTitleSync(router: Router): void {
    router.beforeEach((to, _from, next) => {
        if (to.meta.title) {
            document.title = to.meta.title as string
        }
        if (to.meta.description) {
            upsertMetaTag('description', to.meta.description as string)
        }
        // The site is intentionally blocked from indexing (demo/prototype).
        upsertMetaTag('robots', 'noindex, nofollow')
        upsertMetaTag('googlebot', 'noindex, nofollow')
        next()
    })
}
