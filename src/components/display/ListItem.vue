<script setup lang="ts">
import { FIcon } from '@fkui/vue'

// List item for token-styled content lists (the source site's ListItem).
// Intended as an <li> inside a `.stack-list` <ul>; the icon prop takes an
// FKUI icon name.
interface Props {
    title?: string
    description?: string
    icon?: string
}

defineProps<Props>()
</script>

<template>
    <li class="list-item">
        <f-icon v-if="icon" :name="icon" class="list-item__icon" />
        <div class="list-item__body">
            <span v-if="title" class="list-item__title">{{ title }}</span>
            <span v-if="description" class="list-item__description">{{ description }}</span>
            <div v-if="$slots.default" class="list-item__extra">
                <slot />
            </div>
        </div>
    </li>
</template>

<style scoped lang="scss">
.list-item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
}

.list-item__icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.125rem;
    color: var(--fkds-color-action-text-primary-default);
}

.list-item__body {
    flex: 1;
    min-width: 0;
}

.list-item__title {
    display: block;
    font-weight: 600;
}

.list-item__description {
    display: block;
    color: var(--fkds-color-text-secondary);
}

.list-item__extra {
    margin-top: 0.25rem;
}
</style>
