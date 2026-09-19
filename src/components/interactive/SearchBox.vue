<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { FSearchTextField } from '@fkui/vue'
import { useSearch } from '@/composables/useSearch'
import SearchResults from './SearchResults.vue'
import type { SearchResult } from '@/composables/useSearch'

// Props
interface Props {
    placeholder?: string
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    clearable?: boolean
    showSearchButton?: boolean
    ariaLabel?: string
    hideLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Sök...',
    size: 'medium',
    disabled: false,
    clearable: true,
    showSearchButton: true,
    ariaLabel: 'Sök',
    hideLabel: false
})

const router = useRouter()
const { searchQuery, searchResults, isLoading, hasResults, navigateToResult, clearSearch } =
    useSearch()

// Refs
const root = ref<HTMLElement | null>(null)
const searchResultsComponent = ref<InstanceType<typeof SearchResults> | null>(null)
const isFocused = ref(false)

// Show the live dropdown only while the field has focus and a query – the
// header must not float a stale list over the page after tabbing away.
const showDropdown = computed(() => isFocused.value && searchQuery.value.length > 0)

const handleFocus = () => {
    isFocused.value = true
}

const handleBlur = () => {
    // Delay so a mousedown on a result still registers before the list hides.
    setTimeout(() => {
        isFocused.value = false
    }, 150)
}

// Handle search action (submit)
const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push({ name: 'SearchResults', query: { q: searchQuery.value.trim() } })
        searchResults.value = []
    }
}

// Handle result selection
const handleResultSelect = (result: SearchResult | null) => {
    if (result) {
        navigateToResult(result)
    } else {
        clearSearch()
    }
}

// Handle view all results
const handleViewAllResults = () => {
    handleSearch()
}

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
    if (searchResultsComponent.value && showDropdown.value) {
        searchResultsComponent.value.handleKeydown(event)
    }
}

// Close the dropdown on outside clicks (complements the blur delay for
// clicks that never focus another focusable element).
const handleClickOutside = (event: MouseEvent) => {
    if (root.value && !root.value.contains(event.target as Node)) {
        isFocused.value = false
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
})

// Expose methods for external control
defineExpose({
    focus: () => {
        const input = root.value?.querySelector('input')
        if (input) {
            ;(input as HTMLInputElement).focus()
        }
    },
    clear: () => {
        clearSearch()
        nextTick(() => {
            const input = root.value?.querySelector('input')
            if (input) {
                ;(input as HTMLInputElement).focus()
            }
        })
    },
    search: handleSearch
})
</script>

<template>
    <div ref="root" class="search-box" :class="`search-box--${size}`">
        <div
            class="search-box__field"
            :class="{ 'search-box__field--hide-label': hideLabel }"
            @keydown="handleKeydown"
            @focusin="handleFocus"
            @focusout="handleBlur"
        >
            <!-- FSearchTextField carries its own magnifier and clear button;
                 v-model drives the composable's live search. -->
            <f-search-text-field v-model="searchQuery" :placeholder="placeholder">
                {{ ariaLabel }}
            </f-search-text-field>

            <button
                v-if="showSearchButton"
                type="button"
                class="search-box__submit"
                :disabled="disabled || !searchQuery"
                @click="handleSearch"
            >
                Sök
            </button>
        </div>

        <!-- Search results dropdown -->
        <SearchResults
            v-if="searchQuery"
            :show-results="showDropdown"
            :search-results="searchResults"
            :search-query="searchQuery"
            :is-loading="isLoading"
            :has-results="hasResults"
            @result-select="handleResultSelect"
            @view-all-results="handleViewAllResults"
            ref="searchResultsComponent"
        />
    </div>
</template>

<style scoped lang="scss">
.search-box {
    position: relative;
}

.search-box__field {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
}

// The FKUI field wants to grow to its container width; in the header it sits
// in a fixed-width slot instead.
.search-box--medium {
    width: 18rem;
}

.search-box--large {
    width: 100%;
}

.search-box--small {
    width: 14rem;
}

.search-box__field :deep(.text-field--search) {
    width: 100%;
}

// Header variant: the label stays in the accessibility tree but not in the
// tight header band.
.search-box__field--hide-label :deep(.text-field__label) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
    padding: 0;
    border: 0;
}

.search-box__submit {
    flex-shrink: 0;
    border: none;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    padding: 0 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-action-text-inverted-default);
    cursor: pointer;

    &:hover:not(:disabled) {
        background-color: var(--fkds-color-action-background-primary-hover);
    }

    &:active:not(:disabled) {
        background-color: var(--fkds-color-action-background-primary-active);
    }

    &:disabled {
        background-color: var(--fkds-color-background-disabled);
        color: var(--fkds-color-text-secondary);
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
