import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

// Define the search result interface
export interface SearchResult {
    id: string
    title: string
    url: string
    content: string
    description?: string
    keywords?: string[]
    score?: number
    snippet?: string
}

// Define the search index interface
interface SearchIndexItem {
    id: string
    title: string
    url: string
    content: string
    description?: string
    keywords?: string[]
}

export function useSearch() {
    const router = useRouter()
    const searchQuery = ref('')
    const searchResults = ref<SearchResult[]>([])
    const isLoading = ref(false)
    const searchIndex = ref<SearchIndexItem[]>([])
    const isIndexLoaded = ref(false)

    const loadSearchIndex = async () => {
        if (isIndexLoaded.value) {
            return
        }
        try {
            isLoading.value = true

            // Only load on client-side
            if (typeof window === 'undefined') {
                // During SSR, we'll skip loading but mark as loaded to prevent retries
                isIndexLoaded.value = true
                isLoading.value = false
                return
            }

            const baseUrl = import.meta.env?.BASE_URL || '/'
            const searchIndexUrl = `${baseUrl}search-index.json`

            const response = await fetch(searchIndexUrl)
            if (!response.ok) {
                throw new Error('Failed to load search index')
            }
            const data = await response.json()

            searchIndex.value = data
            isIndexLoaded.value = true
        } catch (error) {
            if (typeof window !== 'undefined') {
                console.error('Error loading search index:', error)
            }
        } finally {
            isLoading.value = false
        }
    }

    // Calculate relevance score for a search result
    const calculateScore = (item: SearchIndexItem, query: string): number => {
        const queryLower = query.toLowerCase()
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

        return score
    }

    // Generate snippet from content
    const generateSnippet = (content: string, query: string, maxLength: number = 150): string => {
        const queryLower = query.toLowerCase()
        const contentLower = content.toLowerCase()

        // Find the best match position
        const index = contentLower.indexOf(queryLower)
        if (index === -1) {
            // If no exact match, return the beginning of content
            return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '')
        }

        // Calculate snippet start and end positions
        const start = Math.max(0, index - 50)
        const end = Math.min(content.length, index + query.length + 100)

        let snippet = content.substring(start, end)

        // Add ellipsis if needed
        if (start > 0) {
            snippet = `...${snippet}`
        }
        if (end < content.length) {
            snippet = `${snippet}...`
        }

        return snippet
    }

    // Debounced search to improve performance
    let searchTimeout: ReturnType<typeof setTimeout> | null = null

    // Perform search
    const performSearch = (query: string) => {
        if (!query.trim() || !isIndexLoaded.value) {
            searchResults.value = []
            return
        }

        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }

        // Debounce search with 300ms delay
        searchTimeout = setTimeout(() => {
            const queryLower = query.toLowerCase().trim()
            const results: SearchResult[] = []

            // Early exit for very short queries
            if (queryLower.length < 2) {
                searchResults.value = []
                return
            }

            // Search through all items in the index
            for (const item of searchIndex.value) {
                const score = calculateScore(item, queryLower)

                if (score > 0) {
                    const snippet = generateSnippet(item.content, queryLower)
                    results.push({
                        ...item,
                        score,
                        snippet
                    })
                }
            }

            // Sort by score (descending) and limit results
            searchResults.value = results
                .sort((a, b) => (b.score || 0) - (a.score || 0))
                .slice(0, 8) // Limit to 8 results
        }, 300)
    }

    // Navigate to a search result
    const navigateToResult = (result: SearchResult) => {
        router.push(result.url)
        searchResults.value = []
        searchQuery.value = ''
    }

    // Clear search
    const clearSearch = () => {
        searchQuery.value = ''
        searchResults.value = []
    }

    // Watch for query changes and perform search
    watch(searchQuery, (newQuery) => {
        performSearch(newQuery)
    })

    // Initialize search index
    loadSearchIndex()

    // Computed property to check if there are results
    const hasResults = computed(() => searchResults.value.length > 0)

    return {
        searchQuery,
        searchResults,
        isLoading,
        isIndexLoaded,
        hasResults,
        searchIndex,
        performSearch,
        navigateToResult,
        clearSearch,
        loadSearchIndex
    }
}
