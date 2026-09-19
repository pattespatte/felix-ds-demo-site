<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSearch, type SearchResult } from '@/composables/useSearch'

const route = useRoute()
const { searchQuery, searchResults, isLoading, hasResults, performSearch, searchIndex, loadSearchIndex } =
    useSearch()

// Initialize search query from route parameter
onMounted(async () => {
    const query = route.query.q as string
    if (query) {
        searchQuery.value = query
        // Wait for search index to load before performing search
        await loadSearchIndex()
        // Perform a full search without limiting results for the dedicated results page
        performFullSearch(query)
    }
})

// Watch for route changes
watch(
    () => route.query.q,
    async (newQuery) => {
        if (newQuery) {
            searchQuery.value = newQuery as string
            await loadSearchIndex()
            performFullSearch(newQuery as string)
        }
    }
)

// Perform a full search without limiting results (same scoring as useSearch)
const performFullSearch = (query: string) => {
    if (!query.trim()) {
        searchResults.value = []
        return
    }

    const queryLower = query.toLowerCase().trim()
    const results: SearchResult[] = []

    // Early exit for very short queries
    if (queryLower.length < 2) {
        searchResults.value = []
        return
    }

    // Search through all items in the index
    for (const item of searchIndex.value) {
        const titleLower = item.title.toLowerCase()
        const contentLower = item.content.toLowerCase()
        const descriptionLower = (item.description || '').toLowerCase()

        let score = 0

        // Title matches are most important
        if (titleLower.includes(queryLower)) {
            score += 10
        }

        // Exact phrase matches in title
        if (titleLower === queryLower) {
            score += 20
        }

        // Description matches
        if (descriptionLower.includes(queryLower)) {
            score += 5
        }

        // Content matches
        if (contentLower.includes(queryLower)) {
            score += 3
        }

        // Keyword matches
        if (item.keywords) {
            const queryWords = queryLower.split(/\s+/)
            for (const word of queryWords) {
                if (item.keywords.includes(word)) {
                    score += 2
                }
            }
        }

        // Boost score for shorter titles (likely more specific)
        score += Math.max(0, 5 - item.title.length / 10)

        if (score > 0) {
            // Generate snippet
            const index = contentLower.indexOf(queryLower)
            let snippet = ''
            if (index === -1) {
                snippet = item.content.substring(0, 150) + (item.content.length > 150 ? '...' : '')
            } else {
                const start = Math.max(0, index - 50)
                const end = Math.min(item.content.length, index + query.length + 100)
                snippet = item.content.substring(start, end)
                if (start > 0) {
                    snippet = `...${snippet}`
                }
                if (end < item.content.length) {
                    snippet = `${snippet}...`
                }
            }

            results.push({
                ...item,
                score,
                snippet
            })
        }
    }

    // Sort by score (descending) but don't limit results for the dedicated results page
    searchResults.value = results.sort((a, b) => (b.score || 0) - (a.score || 0))
}
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="sok__title">Sökresultat för "{{ searchQuery }}"</h1>

            <div v-if="isLoading" class="sok__state">
                <p>Söker...</p>
            </div>

            <div v-else-if="!hasResults" class="sok__state">
                <p>Inga sökresultat för "{{ searchQuery }}"</p>
            </div>

            <div v-else>
                <p class="sok__count">Hittade {{ searchResults.length }} resultat</p>

                <div class="stack sok__results">
                    <article v-for="result in searchResults" :key="result.id" class="sok__result">
                        <h2 class="sok__result-title">
                            <router-link :to="result.url" class="sok__result-link">
                                {{ result.title }}
                            </router-link>
                        </h2>

                        <p class="sok__result-snippet">
                            {{ result.snippet || result.description }}
                        </p>

                        <div class="sok__result-url">
                            {{ result.url }}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sok__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.sok__state {
    padding: 2rem 0;
    text-align: center;
    color: var(--fkds-color-text-secondary);

    p {
        margin: 0;
    }
}

.sok__count {
    margin: 0 0 1.5rem;
    color: var(--fkds-color-text-secondary);
}

.sok__result {
    border: 1px solid var(--fkds-color-border-primary);
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
    background-color: var(--fkds-color-background-primary);
}

.sok__result-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.sok__result-link {
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

.sok__result-snippet {
    margin: 0 0 0.75rem;
    color: var(--fkds-color-text-secondary);
}

.sok__result-url {
    font-size: 0.875rem;
    color: var(--fkds-color-text-secondary);
}
</style>
