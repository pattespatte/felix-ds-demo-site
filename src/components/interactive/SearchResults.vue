<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SearchResult } from '@/composables/useSearch'

interface Props {
    showResults: boolean
    searchResults: SearchResult[]
    searchQuery: string
    isLoading: boolean
    hasResults: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'result-select': [result: SearchResult | null]
    'view-all-results': []
}>()

const selectedIndex = ref(0)

// Reset selected index when results change
watch(
    () => props.searchResults,
    () => {
        selectedIndex.value = 0
    }
)

// Handle keyboard navigation (invoked by the parent SearchBox)
const handleKeydown = (event: KeyboardEvent) => {
    if (!props.showResults || !props.hasResults) {
        return
    }

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault()
            selectedIndex.value = (selectedIndex.value + 1) % props.searchResults.length
            break
        case 'ArrowUp':
            event.preventDefault()
            selectedIndex.value =
                selectedIndex.value <= 0 ? props.searchResults.length - 1 : selectedIndex.value - 1
            break
        case 'Enter':
            event.preventDefault()
            if (props.searchResults[selectedIndex.value]) {
                selectResult(props.searchResults[selectedIndex.value])
            }
            break
        case 'Escape':
            event.preventDefault()
            emit('result-select', null) // Close results
            break
    }
}

// Select a result
const selectResult = (result: SearchResult) => {
    emit('result-select', result)
}

// View all results
const viewAllResults = () => {
    emit('view-all-results')
}

// Highlight matching text in results. The text comes from the local search
// index (site content), never user input, and the query is regex-escaped.
const highlightText = (text: string, query: string): string => {
    if (!query.trim()) {
        return text
    }

    // Decode HTML entities if we're on the client side
    let decodedText = text
    if (typeof window !== 'undefined' && document) {
        const tempElement = document.createElement('textarea')
        tempElement.innerHTML = text
        decodedText = tempElement.value
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()()|[\]\\]/g, '\\$&')})`, 'gi')
    return decodedText.replace(regex, '<mark>$1</mark>')
}

// Expose keyboard navigation method
defineExpose({
    handleKeydown
})
</script>

<template>
    <div
        v-if="showResults"
        class="search-results"
        role="listbox"
        aria-label="Sökresultat"
    >
        <div class="search-results__heading">Sökresultat</div>

        <!-- Loading state -->
        <div v-if="isLoading" class="search-results__state">Söker...</div>

        <!-- No results state -->
        <div v-else-if="!hasResults && searchQuery" class="search-results__state">
            Inga sökresultat för "{{ searchQuery }}"
        </div>

        <!-- Results list -->
        <ul v-else-if="hasResults" class="search-results__list">
            <li
                v-for="(result, index) in searchResults"
                :key="result.id"
                class="search-results__item"
                :class="{ 'search-results__item--active': selectedIndex === index }"
                role="option"
                :aria-selected="selectedIndex === index"
                @click="selectResult(result)"
                @mouseenter="selectedIndex = index"
            >
                <div class="search-results__item-body">
                    <!-- Result title -->
                    <div
                        class="search-results__item-title"
                        v-html="highlightText(result.title, searchQuery)"
                    />

                    <!-- Result snippet -->
                    <div
                        class="search-results__item-snippet"
                        v-html="highlightText(result.snippet || result.description || '', searchQuery)"
                    />

                    <!-- Result URL -->
                    <div class="search-results__item-url">
                        {{ result.url }}
                    </div>
                </div>
            </li>
        </ul>

        <!-- View all results link -->
        <div v-if="hasResults" class="search-results__footer">
            <button type="button" class="search-results__all" @click="viewAllResults">
                Visa alla resultat
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.search-results {
    position: absolute;
    z-index: 60;
    margin-top: 0.25rem;
    max-height: 24rem;
    width: 100%;
    overflow: auto;
    border: 1px solid var(--fkds-color-border-primary);
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-background-primary);
    box-shadow: var(--f-card-box-shadow, 0 2px 8px rgb(0 0 0 / 20%));
}

.search-results__heading {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--fkds-color-border-weak);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fkds-color-text-secondary);
}

.search-results__state {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: var(--fkds-color-text-secondary);
}

.search-results__list {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;
}

.search-results__item {
    position: relative;
    padding: 0.5rem 0.75rem;
    cursor: default;
    user-select: none;
    color: var(--fkds-color-text-primary);

    &:hover,
    &--active {
        background-color: var(--fkds-color-background-secondary);
    }
}

.search-results__item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fkds-color-text-primary);
}

.search-results__item-snippet {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--fkds-color-text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.search-results__item-url {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--fkds-color-text-secondary);
}

.search-results__footer {
    padding: 0.5rem 0.75rem;
    border-top: 1px solid var(--fkds-color-border-weak);
    text-align: center;
}

.search-results__all {
    padding: 0;
    border: none;
    background: none;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fkds-color-text-primary);
    text-decoration: underline;
    cursor: pointer;

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

:deep(mark) {
    padding: 0 1px;
    border-radius: 2px;
    background-color: var(--fkds-color-feedback-background-info);
    color: var(--fkds-color-text-primary);
}
</style>
