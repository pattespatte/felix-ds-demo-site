<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { FIcon, FSearchTextField } from '@fkui/vue'
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
            <!-- FSearchTextField carries the label, clear button and the
                 input-left/input-right slots this look is built on; v-model
                 drives the composable's live search. -->
            <f-search-text-field v-model="searchQuery" :placeholder="placeholder">
                {{ ariaLabel }}
                <template #input-left>
                    <f-icon name="search" class="search-box__magnifier" />
                </template>
                <template #input-right>
                    <button
                        v-if="showSearchButton"
                        type="button"
                        class="search-box__submit"
                        @click="handleSearch"
                    >
                        Sök
                    </button>
                </template>
            </f-search-text-field>
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

.search-box--medium {
    width: 21rem;
}

.search-box--large {
    width: 100%;
}

.search-box--small {
    width: 15rem;
}

.search-box__field :deep(.text-field) {
    width: 100%;
    // FKUI spaces stacked form fields with a 24px bottom margin; inside the
    // header composite it is dead weight below the field that made the tools
    // row center the box instead of the visible field, so the field rode
    // high against the logo and the color-mode toggle.
    margin-bottom: 0;
}

// Header variant: the label stays in the accessibility tree but not in the
// tight header band.
.search-box__field--hide-label :deep(label.label) {
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

// The field container: one white rounded surface holding magnifier, input,
// clear button and the Sök button – the reference look. Tokens only, so the
// surface flips with the color mode.
.search-box__field :deep(.text-field__input-wrapper) {
    align-items: center;
    background-color: var(--fkds-color-background-primary);
    border: 1px solid var(--fkds-color-border-primary);
    border-radius: 0.5rem;
    padding: 0.25rem;

    &:focus-within {
        border-color: var(--fkds-color-action-border-primary-default);
        box-shadow: var(--f-focus-box-shadow);
    }
}

.search-box__field :deep(.text-field__icon-wrapper) {
    flex: 1 1 auto;
    min-width: 0;
}

.search-box__field :deep(.text-field__input) {
    border: none;
    background: transparent;
    border-radius: 0.375rem;
    height: auto;
    padding-block: 0.5rem;
    padding-right: 2.5rem;
    font-size: 1rem;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &::placeholder {
        color: var(--fkds-color-text-secondary);
        opacity: 1;
    }
}

.search-box__magnifier {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.75rem;
    color: var(--fkds-color-text-secondary);
}

.search-box__submit {
    flex-shrink: 0;
    border: none;
    border-radius: 0.375rem;
    padding: 0.5rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 600;
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-action-text-inverted-default);
    cursor: pointer;

    // Always navy like the reference; an empty query simply does nothing.
    &:hover {
        background-color: var(--fkds-color-action-background-primary-hover);
    }

    &:active {
        background-color: var(--fkds-color-action-background-primary-active);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
