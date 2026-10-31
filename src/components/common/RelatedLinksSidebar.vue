<script setup lang="ts">
import { useId } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FNavigationMenu } from '@fkui/vue'
import type { RelatedLink } from '@/data/omOssSection'

// Right-hand section sidebar: a small heading over FKUI's vertical
// navigation menu. FNavigationMenu owns the link list and the selected
// state; the SPA pattern (routes without href + router.push on
// selectedRoute) comes from the felix-ds consumer guide, since a plain
// anchor would reload the whole history-routed site.
const props = withDefaults(
    defineProps<{
        links: RelatedLink[]
        title?: string
    }>(),
    {
        title: 'Relaterad information'
    }
)

const route = useRoute()
const router = useRouter()
const headingId = useId()

const menuRoutes = props.links.map((link) => ({ label: link.label, route: link.to }))

const onSelect = (path: string) => {
    void router.push(path)
}
</script>

<template>
    <nav class="related-links" :aria-labelledby="headingId">
        <h2 :id="headingId" class="related-links__title">{{ props.title }}</h2>
        <f-navigation-menu
            vertical
            :routes="menuRoutes"
            :route="route.path"
            menu-aria-label="Relaterad information"
            @selected-route="onSelect"
        />
    </nav>
</template>

<style scoped>
/* Deliberately sits 1rem below the page h1 (2.5rem top margin) so the
   sidebar starts just under the title line. */
.related-links {
  margin-top: 3.5rem;
}

.related-links__title {
  margin: 0 0 1.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--fkds-color-text-primary);
}

/* The vertical menu inside an 18rem sidebar column: keep FKUI's own list
   look but let long labels wrap instead of ellipsizing. */
.related-links :deep(.imenu__list__item) {
  white-space: normal;
}
</style>
