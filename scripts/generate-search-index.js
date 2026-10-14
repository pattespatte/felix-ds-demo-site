import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { load } from 'js-yaml'
import { parse as parseSfc } from '@vue/compiler-sfc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Extract top-level route object blocks from the routes array. Brace-balanced
// so route records containing nested object literals (meta, props) stay in
// one piece — a naive split on `},{` would cut a record in two.
function extractRouteBlocks(routerContent) {
    const arrayStart = routerContent.indexOf('[', routerContent.indexOf('const routes'))
    if (arrayStart === -1) {
        return []
    }
    const blocks = []
    let depth = 0
    let blockStart = -1
    for (let i = arrayStart; i < routerContent.length; i++) {
        const char = routerContent[i]
        if (char === '{') {
            if (depth === 0) {
                blockStart = i
            }
            depth++
        } else if (char === '}') {
            depth--
            if (depth === 0) {
                blocks.push(routerContent.slice(blockStart, i + 1))
            }
        } else if (char === ']' && depth === 0) {
            break
        }
    }
    return blocks
}

// Collect every prose string value from a parsed content page so the whole
// editable text becomes searchable. Structural keys (layout, link targets)
// are skipped.
const STRUCTURAL_KEYS = new Set(['width', 'sidebar', 'to', 'tone', 'ctaCentered'])

function collectStrings(value, acc) {
    if (typeof value === 'string') {
        acc.push(value)
    } else if (Array.isArray(value)) {
        value.forEach((item) => collectStrings(item, acc))
    } else if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
            if (!STRUCTURAL_KEYS.has(key)) {
                collectStrings(item, acc)
            }
        }
    }
    return acc
}

// Extract searchable content from a CMS content page (src/content/pages)
function extractContentFromPage(key, routePath, title) {
    const filePath = path.join(__dirname, '../src/content/pages', `${key}.yml`)
    const page = load(fs.readFileSync(filePath, 'utf-8'))
    const strings = collectStrings(page, [])

    // Section bodies are markdown: reduce links to their text and drop
    // emphasis/bullet markers so snippets read as plain prose.
    const componentContent = strings
        .join(' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\s+[-*]\s+/g, ' ')
        .replace(/[*_#>|`]+/g, '')
        .replace(/\s+/g, ' ')
        .trim()

    const allText = `${title} ${componentContent}`
    const keywords = [
        ...new Set(
            allText
                .toLowerCase()
                .replace(/[^\w\såäö]/g, ' ')
                .split(/\s+/)
                .filter((word) => word.length > 3)
                .slice(0, 20)
        )
    ]

    return {
        id: routePath,
        title,
        url: routePath,
        content: componentContent.substring(0, 1000),
        description: '',
        keywords
    }
}

// Extract text content from Vue SFC template
function extractTextFromTemplate(template) {
    // Remove Vue directives and special syntax (FKUI custom elements end up
    // as plain tags and are stripped the same way the source site stripped
    // its Tailwind markup)
    const cleanTemplate = template
        .replace(/v-[a-zA-Z-]+="[^"]*"/g, '') // Remove v-* directives
        .replace(/@[a-zA-Z-]+="[^"]*"/g, '') // Remove @event handlers
        .replace(/:[a-zA-Z-]+="[^"]*"/g, '') // Remove :bindings
        .replace(/{{[^}]*}}/g, '') // Remove mustache expressions
        .replace(/<[^>]*>/g, ' ') // Replace tags with spaces
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()

    return cleanTemplate
}

// Extract meaningful content from a Vue component
function extractContentFromComponent(filePath, routePath, title) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parseSfc(content)

    let componentContent = ''
    let description = ''

    // Extract content from template
    if (descriptor.template) {
        componentContent = extractTextFromTemplate(descriptor.template.content)
    }

    // Extract description from script setup if available
    if (descriptor.scriptSetup) {
        const scriptContent = descriptor.scriptSetup.content
        const descriptionMatch = scriptContent.match(/description:\s*['"`]([^'"`]+)['"`]/)
        if (descriptionMatch) {
            description = descriptionMatch[1]
        }
    }

    // Generate keywords from title and content
    const allText = `${title} ${componentContent} ${description}`
    const keywords = [
        ...new Set(
            allText
                .toLowerCase()
                .replace(/[^\w\såäö]/g, ' ')
                .split(/\s+/)
                .filter((word) => word.length > 3)
                .slice(0, 20)
        )
    ]

    return {
        id: routePath,
        title,
        url: routePath,
        content: componentContent.substring(0, 1000), // Limit content length
        description,
        keywords
    }
}

// Main function to generate search index
function generateSearchIndex() {
    const viewsDir = path.join(__dirname, '../src/views')
    const routerFile = path.join(__dirname, '../src/router/index.ts')

    // Read router configuration to get page information
    const routerContent = fs.readFileSync(routerFile, 'utf-8')

    const searchIndex = []

    for (const block of extractRouteBlocks(routerContent)) {
        const pathMatch = block.match(/path:\s*['"`]([^'"`]+)['"`]/)
        if (!pathMatch || pathMatch[1].includes(':pathMatch')) {
            continue
        }
        const [, routePath] = pathMatch

        const titleMatch = block.match(/title:\s*['"`]([^'"`]+)['"`]/)
        const descriptionMatch = block.match(/description:\s*['"`]([^'"`]+)['"`]/)
        const title = titleMatch ? titleMatch[1] : routePath
        const description = descriptionMatch ? descriptionMatch[1] : ''

        // CMS-edited route: content comes from src/content/pages/<key>.yml
        const contentMatch = block.match(/props:\s*{\s*content:\s*['"`]([^'"`]+)['"`]\s*}/)
        if (contentMatch) {
            const searchItem = extractContentFromPage(contentMatch[1], routePath, title)
            searchItem.description = description
            searchIndex.push(searchItem)
            continue
        }

        const componentMatch = block.match(/import\(['"`]([^'"`]+)['"`]\)/)
        if (!componentMatch) {
            continue
        }
        const filePath = path.join(__dirname, '..', componentMatch[1].replace('@/', 'src/'))

        if (fs.existsSync(filePath)) {
            const searchItem = extractContentFromComponent(filePath, routePath, title)
            searchItem.description = description
            searchIndex.push(searchItem)
        }
    }

    // Also include the home page (unless the router already produced it)
    const homeAlreadyIndexed = searchIndex.some((item) => item.url === '/')
    if (!homeAlreadyIndexed) {
        const homePath = path.join(viewsDir, 'HomeView.vue')
        if (fs.existsSync(homePath)) {
            const homeItem = extractContentFromComponent(
                homePath,
                '/',
                'Vårdcentralen Vårdportalen - Start'
            )
            homeItem.description = 'Boka tid, kontakta vården och hantera dina vårdärenden'
            searchIndex.unshift(homeItem)
        }
    }

    // Write search index to public directory
    const publicDir = path.join(__dirname, '../public')
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true })
    }

    const indexPath = path.join(publicDir, 'search-index.json')
    fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2))

    console.log(`Generated search index with ${searchIndex.length} pages`)
    console.log(`Search index saved to: ${indexPath}`)
}

// Run the function
generateSearchIndex()
