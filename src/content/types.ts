// Content model for CMS-edited pages. One YAML file per page under
// src/content/pages/, edited with Sveltia CMS (public/admin). The generic
// ContentPage view renders this structure; field names mirror the Sveltia
// field names in public/admin/config.yml.

/** Item in a section's bullet list: either plain text or title + description. */
export interface ContentListItem {
    title?: string
    description?: string
    text?: string
}

/** Accordion (FExpandableParagraph) item. */
export interface ContentAccordionItem {
    title: string
    content: string
}

/** InfoCard (FCard with title + text) in a card grid. */
export interface ContentInfoCard {
    title: string
    content: string
}

/** Coloured contact-route box (Din vårdkontakt style). */
export interface ContentRoute {
    tone?: 'clinic' | 'guide' | 'acute'
    title: string
    text: string
}

/** Button link rendered at the end of a section. */
export interface ContentCta {
    label: string
    to: string
}

/** One AppCard section (or grid tile when the page uses sectionsGrid). */
export interface ContentSection {
    title?: string
    paragraphs?: { text: string }[]
    list?: ContentListItem[]
    closing?: string
    routes?: ContentRoute[]
    infoCards?: ContentInfoCard[]
    accordion?: ContentAccordionItem[]
    cta?: ContentCta
    ctaCentered?: boolean
    updated?: string
}

/** Page-level variant: all sections inside one card as a two-column grid. */
export interface ContentSectionsGrid {
    intro?: string
    sections: { title: string; text: string }[]
}

export interface PageContent {
    title: string
    /** 'narrow' wraps content in .page__narrow; 'wide' (default) does not. */
    width?: 'wide' | 'narrow'
    /** Renders the om-oss related-links sidebar beside the content. */
    sidebar?: boolean
    intro?: string
    notice?: string
    infoCards?: ContentInfoCard[]
    accordion?: ContentAccordionItem[]
    sectionsGrid?: ContentSectionsGrid
    sections?: ContentSection[]
}
