<script setup lang="ts">
import { useId } from 'vue'
import { useRoute } from 'vue-router'
import type { RelatedLink } from '@/data/omOssSection'

// Right-hand section sidebar in the style of e-halsomyndigheten.se: a small
// heading over a link list separated from the content by a vertical rule.
// Pairs with the .page--sidebar layout primitive; the current page is
// highlighted and excluded from the accessible link purpose via aria-current.
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
const headingId = useId()
</script>

<template>
    <nav class="related-links" :aria-labelledby="headingId">
        <h2 :id="headingId" class="related-links__title">{{ props.title }}</h2>
        <ul class="related-links__list">
            <li v-for="link in props.links" :key="link.to">
                <router-link
                    :to="link.to"
                    class="related-links__link"
                    :aria-current="route.path === link.to ? 'page' : undefined"
                >
                    {{ link.label }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
// Deliberately sits 1rem below the page h1 (2.5rem top margin) so the
// sidebar starts just under the title line.
.related-links {
    margin-top: 3.5rem;
}

.related-links__title {
    margin: 0 0 1.25rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--fkds-color-text-primary);
}

.related-links__list {
    margin: 0;
    padding: 0 0 0 1.25rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-left: 2px solid var(--fkds-color-border-weak);
}

.related-links__link {
    color: var(--fkds-color-text-secondary);
    text-decoration: none;

    &:hover {
        color: var(--fkds-color-text-primary);
        text-decoration: underline;
    }

    &[aria-current='page'] {
        color: var(--fkds-color-text-primary);
        font-weight: 600;
    }
}
</style>
