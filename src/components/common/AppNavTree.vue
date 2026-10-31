<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { FIcon } from '@fkui/vue'

// Two-level main navigation rendered inside FLayoutLeftPanel: level 1 as
// toggle buttons, level 2 as links. Same sections and destinations as the
// former top-navigation dropdowns.
interface NavLeaf {
    label: string
    to: string
}

interface NavSection {
    label: string
    to: string
    children: NavLeaf[]
}

const sections: NavSection[] = [
    {
        label: 'Om oss',
        to: '/om-oss',
        children: [
            { label: 'Om oss', to: '/om-oss' },
            { label: 'Jobba hos oss', to: '/om-oss/jobba-hos-oss' },
            { label: 'Lediga tjänster', to: '/om-oss/lediga-tjanster' },
            { label: 'Karriärvägar', to: '/om-oss/karriarvagar' },
            { label: 'Förmåner', to: '/om-oss/formaner' }
        ]
    },
    {
        label: 'Tjänster',
        to: '/tjanster',
        children: [
            { label: 'Översikt', to: '/tjanster' },
            { label: 'Mottagningar', to: '/mottagningar' },
            { label: 'Specialistmottagningar', to: '/tjanster/specialistmottagningar' },
            { label: 'Labbprov', to: '/tjanster/labbprov' },
            { label: 'Hemsjukvård', to: '/tjanster/hemsjukvard' }
        ]
    },
    {
        label: 'Patientinformation',
        to: '/patientinformation',
        children: [
            { label: 'Översikt', to: '/patientinformation' },
            { label: 'Vårdgaranti', to: '/patientinformation/vardgaranti' },
            { label: 'Avgifter', to: '/patientinformation/avgifter' },
            { label: 'Din vårdkontakt', to: '/patientinformation/din-vardkontakt' }
        ]
    },
    { label: 'Boka tid', to: '/boka-tid', children: [] },
    { label: 'Mina sidor', to: '/mina-sidor', children: [] },
    { label: 'Kontakt', to: '/kontakt', children: [] }
]

const route = useRoute()

// App-level callback: the panel is a drawer at every viewport, so a
// navigation should close it (the injected default keeps this component
// usable standalone).
const closeNav = inject<() => void>('close-mobile-nav', () => {})

// Explicit user toggles; a section without an entry follows the default rule
// "expanded while it is the active section".
const toggled = ref<Record<string, boolean>>({})

function isActiveSection(section: NavSection): boolean {
    return route.path === section.to || route.path.startsWith(`${section.to}/`)
}

function isExpanded(section: NavSection): boolean {
    if (section.to in toggled.value) {
        return toggled.value[section.to]
    }
    return isActiveSection(section)
}

function toggle(section: NavSection): void {
    toggled.value[section.to] = !isExpanded(section)
}

function isCurrent(to: string): boolean {
    return route.path === to
}

// DOM id / aria-controls partner for a section's group (paths are not valid
// ids).
const slug = (to: string): string => to.split('/').join('')
</script>

<template>
    <ul class="nav-tree">
        <li v-for="section in sections" :key="section.to" class="nav-tree__section">
            <button
                v-if="section.children.length > 0"
                class="nav-tree__toggle"
                type="button"
                :aria-expanded="isExpanded(section)"
                :aria-controls="`nav-tree-group-${slug(section.to)}`"
                @click="toggle(section)"
            >
                <span class="nav-tree__toggle-label">{{ section.label }}</span>
                <span
                    class="nav-tree__chevron"
                    :class="{ 'nav-tree__chevron--open': isExpanded(section) }"
                >
                    <f-icon name="caret-down" />
                </span>
            </button>
            <router-link
                v-else
                :to="section.to"
                class="nav-tree__toggle nav-tree__toggle--leaf"
                :aria-current="isCurrent(section.to) ? 'page' : undefined"
                @click="closeNav()"
            >
                <span class="nav-tree__toggle-label">{{ section.label }}</span>
            </router-link>

            <ul
                v-show="section.children.length > 0 && isExpanded(section)"
                :id="`nav-tree-group-${slug(section.to)}`"
                class="nav-tree__group"
            >
                <li v-for="child in section.children" :key="child.to" class="nav-tree__item">
                    <router-link
                        :to="child.to"
                        class="nav-tree__link"
                        :aria-current="isCurrent(child.to) ? 'page' : undefined"
                        @click="closeNav()"
                    >
                        {{ child.label }}
                    </router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<style scoped>
/* Full-width rows with hairline separators between sections, fill on hover,
   rounded chevron chip on the row's far end, inset bar on the current link;
   colours stay on theme tokens. */
.nav-tree {
    margin: 0;
    padding: 0;
    list-style: none;
}

.nav-tree__section + .nav-tree__section {
    border-top: 1px solid var(--fkds-color-border-weak);
}

.nav-tree__toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    border: 0;
    background: none;
    font: inherit;
    font-weight: var(--f-font-weight-bold, 600);
    color: var(--fkds-color-text-primary);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
}

.nav-tree__toggle:hover {
    background-color: var(--fkds-color-navigation-background-hover);
    text-decoration: none;
}

.nav-tree__toggle:focus-visible {
    outline: none;
    box-shadow: var(--f-focus-box-shadow);
}

/* Rounded expand chip at the row's far end. Collapsed: light surface,
   chevron pointing down; expanded: dark surface, light chevron rotated to
   point up. */
.nav-tree__chevron {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    background-color: var(--fkds-color-navigation-background-hover);
    color: var(--fkds-color-text-primary);
}

.nav-tree__chevron :deep(.icon) {
    transition: transform var(--f-animation-duration-fast, 150ms) ease-out;
}

.nav-tree__chevron--open {
    background-color: var(--fkds-color-navigation-background-selected);
    color: var(--fkds-color-text-inverted);
}

.nav-tree__chevron--open :deep(.icon) {
    transform: rotate(180deg);
}

.nav-tree__toggle-label {
    /* Keep labels on one line; the panel scrolls if a title is longer than
       the column. */
    white-space: nowrap;
}

/* Sub-level guide bar. */
.nav-tree__group {
    margin: 0;
    padding: 0.25rem 0;
    list-style: none;
    border-left: 12px solid var(--fkds-color-navigation-background-hover);
}

.nav-tree__link {
    display: block;
    padding: 0.375rem 1rem;
    color: var(--fkds-color-text-primary);
    /* The felix theme underlines content anchors globally; the menu keeps
       its items plain. */
    text-decoration: none;
}

.nav-tree__link:hover {
    background-color: var(--fkds-color-navigation-background-hover);
    text-decoration: none;
}

.nav-tree__link:focus-visible {
    outline: none;
    box-shadow: var(--f-focus-box-shadow);
}

.nav-tree__link[aria-current='page'] {
    font-weight: var(--f-font-weight-bold, 600);
    box-shadow: inset 4px 0 0 var(--fkds-color-text-primary);
}

.nav-tree__link[aria-current='page']:focus-visible {
    box-shadow:
        var(--f-focus-box-shadow),
        inset 4px 0 0 var(--fkds-color-text-primary);
}
</style>
