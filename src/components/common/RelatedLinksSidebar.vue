<script setup lang="ts">
import { useId } from 'vue'
import { useRoute } from 'vue-router'
import type { RelatedLink } from '@/data/omOssSection'

// Right-hand section sidebar: a small heading over a link list separated
// from the content by a vertical rule. Pairs with the .page--sidebar layout
// primitive. The current page keeps its normal text color (no underline,
// no emphasis) and gets a bar segment on the rule – aria-current="page"
// carries the state to assistive technology.
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
            <li
                v-for="link in props.links"
                :key="link.to"
                class="related-links__item"
                :class="{ 'related-links__item--active': route.path === link.to }"
            >
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
    transition: color 0.2s ease;

    &:hover,
    &[aria-current='page'] {
        color: var(--fkds-color-text-primary);
    }
}

// Marks the current page on the list rule, like the reference context nav:
// a bar segment in the primary border color over the weak grey rule,
// spanning the active item. Offsets repeat the list padding (1.25rem) and
// border (2px).
.related-links__item {
    position: relative;

    &--active::before {
        content: '';
        position: absolute;
        left: calc(-1.25rem - 2px);
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--fkds-color-border-primary);
    }
}
</style>
