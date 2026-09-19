<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FNavigationMenu, type NavigationMenuItem } from '@fkui/vue'

// Vertical section navigation shared by the "Om oss" careers pages, rebuilt
// on FNavigationMenu. Items carry no href: the component emits
// `selectedRoute` and the consumer routes through Vue Router (FKUI's
// documented pattern), so navigation stays SPA-internal.
const route = useRoute()
const router = useRouter()

const navItems = [
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Jobba hos oss', path: '/om-oss/jobba-hos-oss' },
    { name: 'Lediga tjänster', path: '/om-oss/lediga-tjanster' },
    { name: 'Karriärvägar', path: '/om-oss/karriarvagar' },
    { name: 'Förmåner', path: '/om-oss/formaner' }
]

const items = computed<NavigationMenuItem[]>(() =>
    navItems.map((item) => ({ label: item.name, route: item.path }))
)

const currentRoute = computed(() => route.path)

const onSelectedRoute = (path: string) => {
    router.push(path)
}
</script>

<template>
    <nav class="secondary-navigation" aria-label="Sekundär navigering">
        <f-navigation-menu
            :routes="items"
            :route="currentRoute"
            vertical
            @selected-route="onSelectedRoute"
        />
    </nav>
</template>

<style scoped lang="scss">
.secondary-navigation {
    background-color: var(--fkds-color-background-secondary);
    border-bottom: 1px solid var(--fkds-color-border-weak);
    padding: 0.75rem 1rem;
}
</style>
