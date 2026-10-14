import MarkdownIt from 'markdown-it'

// Content strings come from this repository's own content files (edited in
// Sveltia CMS by authenticated editors), so inline markdown — links, emphasis —
// is trusted. Raw HTML is disabled and escaped instead of rendered. External
// links open in a new tab with a screen-reader note, matching the source
// site's hand-written link markup.
const md = new MarkdownIt({ html: false, breaks: false, linkify: false })

const SR_ONLY_NOTE = '<span class="sr-only"> (öppnas i nytt fönster)</span>'

// External links open in a new tab with a screen-reader note.
function externalizeLinks(html: string): string {
    return html.replace(
        /<a href="(https?:[^"]*)"([^>]*)>(.*?)<\/a>/g,
        (_match, href: string, attrs: string, inner: string) =>
            `<a href="${href}"${attrs} target="_blank" rel="noopener noreferrer">${inner}${SR_ONLY_NOTE}</a>`
    )
}

/** Renders inline markdown (emphasis, links) without wrapping block tags. */
export function mdInline(text: string | undefined): string {
    if (!text) {
        return ''
    }
    return externalizeLinks(md.renderInline(text))
}

/** Renders block markdown — paragraphs, bullet lists, links — for a section body. */
export function mdBlock(text: string | undefined): string {
    if (!text) {
        return ''
    }
    return externalizeLinks(md.render(text))
}
