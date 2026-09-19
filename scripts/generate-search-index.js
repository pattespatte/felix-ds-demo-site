import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parse } from '@vue/compiler-sfc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
    const { descriptor } = parse(content)

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

    // Extract route information using regex
    const routeMatches = routerContent.matchAll(
        /path:\s*['"`]([^'"`]+)['"`][\s\S]*?component:\s*\(\)\s*=>\s*import\(['"`]([^'"`]+)['"`]\)[\s\S]*?meta:\s*{[\s\S]*?title:\s*['"`]([^'"`]+)['"`][\s\S]*?description:\s*['"`]([^'"`]+)['"`]/g
    )

    const searchIndex = []

    for (const match of routeMatches) {
        const [, routePath, componentPath, title, description] = match

        // Skip the catch-all 404 route: its URL pattern is not a real page
        if (routePath.includes(':pathMatch')) {
            continue
        }

        // Convert component path to file path
        const filePath = path.join(__dirname, '..', componentPath.replace('@/', 'src/'))

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
