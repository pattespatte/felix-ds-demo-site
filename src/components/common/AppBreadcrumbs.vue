<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// FKUI has no breadcrumb component – this thin app-level replacement derives
// the crumb trail from the current route exactly like the source site's
// Breadcrumbs component did.
const route = useRoute()

interface BreadcrumbItem {
    name: string
    path: string
    isCurrent: boolean
}

// URL segment → Swedish readable name for the known routes (superset of the
// source site's mapping; covers every segment the router can produce).
const swedishMappings: Record<string, string> = {
    'om-oss': 'Om oss',
    'jobba-hos-oss': 'Jobba hos oss',
    'lediga-tjanster': 'Lediga tjänster',
    formaner: 'Förmåner',
    karriarvagar: 'Karriärvägar',
    tjanster: 'Tjänster',
    specialistmottagningar: 'Specialistmottagningar',
    labbprov: 'Labbprov',
    hemsjukvard: 'Hemsjukvård',
    kontakt: 'Kontakt',
    'fragor-och-svar': 'Frågor och svar',
    vardguide: 'Vårdguide',
    'boka-tid': 'Boka tid',
    form: 'Formulär',
    'mina-sidor': 'Mina sidor',
    tillganglighet: 'Tillgänglighet',
    mottagningar: 'Mottagningar',
    patientinformation: 'Patientinformation',
    vardgaranti: 'Vårdgaranti',
    avgifter: 'Avgifter',
    'din-vardkontakt': 'Din vårdkontakt',
    integritetspolicy: 'Integritetspolicy',
    cookies: 'Cookies',
    sok: 'Sök'
}

// Generate breadcrumbs from the current route
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const pathArray = route.path.split('/').filter((p) => p)

    // Start with home
    const crumbs: BreadcrumbItem[] = [
        { name: 'Start', path: '/', isCurrent: pathArray.length === 0 }
    ]

    // Build path for each segment
    let currentPath = ''

    pathArray.forEach((segment, index) => {
        currentPath += `/${segment}`

        const readableName =
            swedishMappings[segment] ??
            segment
                .split('-')
                .map((word, wordIndex) =>
                    wordIndex === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
                )
                .join(' ')

        crumbs.push({
            name: readableName,
            path: currentPath,
            isCurrent: index === pathArray.length - 1
        })
    })

    return crumbs
})
</script>

<template>
    <nav class="app-breadcrumbs" aria-label="Brödsmula">
        <ol class="app-breadcrumbs__list">
            <li
                v-for="(crumb, index) in breadcrumbs"
                :key="crumb.path"
                class="app-breadcrumbs__item"
            >
                <router-link
                    v-if="!crumb.isCurrent"
                    :to="crumb.path"
                    class="app-breadcrumbs__link"
                >
                    {{ crumb.name }}
                </router-link>
                <span v-else class="app-breadcrumbs__current" aria-current="page">
                    {{ crumb.name }}
                </span>

                <!-- Separator (not shown after last item) -->
                <span
                    v-if="index < breadcrumbs.length - 1"
                    class="app-breadcrumbs__separator"
                    aria-hidden="true"
                >
                    /
                </span>
            </li>
        </ol>
    </nav>
</template>

<style scoped lang="scss">
.app-breadcrumbs {
    // Same light blue band as the main navigation row above – together they
    // form one navigation surface, like the reference design.
    background-color: var(--fkds-color-feedback-background-info);
    border-bottom: 1px solid var(--fkds-color-border-primary);
    padding: 0.5rem 1rem;

    // The 404 route has no trail beyond Start; hide the band there.
    &:has(.app-breadcrumbs__current:only-child) {
        display: none;
    }
}

.app-breadcrumbs__list {
    max-width: 72rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    font-size: 0.875rem;
}

.app-breadcrumbs__item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.app-breadcrumbs__link {
    color: var(--fkds-color-action-text-primary-default);
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-breadcrumbs__current {
    color: var(--fkds-color-text-primary);
    font-weight: 600;
}

.app-breadcrumbs__separator {
    color: var(--fkds-color-text-secondary);
}
</style>
