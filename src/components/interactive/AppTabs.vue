<script setup lang="ts">
import { ref, watch } from 'vue'

// FKUI 6.57 ships no tabs component, so this thin app-level replacement
// implements the WAI-ARIA tabs pattern (tablist/tab/tabpanel, arrow keys)
// styled only with felix/FKUI tokens.
export interface AppTabItem {
    id: string
    label: string
}

interface Props {
    tabs: AppTabItem[]
    modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const tablist = ref<HTMLElement | null>(null)
const focusIndex = ref(0)

watch(
    () => props.modelValue,
    (value) => {
        const index = props.tabs.findIndex((tab) => tab.id === value)
        if (index >= 0) {
            focusIndex.value = index
        }
    }
)

const select = (id: string) => {
    emit('update:modelValue', id)
}

const focusTab = (index: number) => {
    focusIndex.value = index
    const tabs = tablist.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[index]?.focus()
}

const onKeydown = (event: KeyboardEvent) => {
    const count = props.tabs.length
    switch (event.key) {
        case 'ArrowRight':
            event.preventDefault()
            focusTab((focusIndex.value + 1) % count)
            break
        case 'ArrowLeft':
            event.preventDefault()
            focusTab((focusIndex.value - 1 + count) % count)
            break
        case 'Home':
            event.preventDefault()
            focusTab(0)
            break
        case 'End':
            event.preventDefault()
            focusTab(count - 1)
            break
        case 'Enter':
        case ' ': {
            event.preventDefault()
            const tab = props.tabs[focusIndex.value]
            if (tab) {
                select(tab.id)
            }
            break
        }
    }
}
</script>

<template>
    <div class="app-tabs">
        <div
            ref="tablist"
            class="app-tabs__list"
            role="tablist"
            :aria-label="'Vyval'"
            @keydown="onKeydown"
        >
            <button
                v-for="(tab, index) in tabs"
                :key="tab.id"
                :id="`app-tab-${tab.id}`"
                type="button"
                role="tab"
                class="app-tabs__tab"
                :class="{ 'app-tabs__tab--active': modelValue === tab.id }"
                :aria-selected="modelValue === tab.id"
                :aria-controls="`app-tabpanel-${tab.id}`"
                :tabindex="modelValue === tab.id ? 0 : -1"
                @click="select(tab.id); focusIndex = index"
            >
                {{ tab.label }}
            </button>
        </div>
        <div
            :id="`app-tabpanel-${modelValue}`"
            role="tabpanel"
            :aria-labelledby="`app-tab-${modelValue}`"
            tabindex="0"
            class="app-tabs__panel"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-tabs__list {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--fkds-color-border-primary);
    overflow-x: auto;
}

.app-tabs__tab {
    padding: 0.75rem 1rem;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--fkds-color-text-secondary);
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        color: var(--fkds-color-text-primary);
        border-bottom-color: var(--fkds-color-border-strong);
    }

    &--active {
        color: var(--fkds-color-action-text-primary-default);
        border-bottom-color: var(--fkds-color-action-border-primary-default);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-tabs__panel {
    padding-top: 1.5rem;

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
