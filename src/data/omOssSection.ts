export interface RelatedLink {
    label: string
    to: string
}

// The om-oss section in menu order. Rendered by RelatedLinksSidebar on every
// page in the section; the current page is marked with aria-current="page".
export const omOssSectionLinks: RelatedLink[] = [
    { label: 'Om oss', to: '/om-oss' },
    { label: 'Jobba hos oss', to: '/om-oss/jobba-hos-oss' },
    { label: 'Lediga tjänster', to: '/om-oss/lediga-tjanster' },
    { label: 'Karriärvägar', to: '/om-oss/karriarvagar' },
    { label: 'Förmåner', to: '/om-oss/formaner' }
]
