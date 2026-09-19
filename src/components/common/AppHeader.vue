<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FContextMenu, FIcon, type ContextMenuItem } from '@fkui/vue'
import SearchBox from '@/components/interactive/SearchBox.vue'
import ColorModeToggle from '@/components/common/ColorModeToggle.vue'

const route = useRoute()
const router = useRouter()

interface NavItem {
    name: string
    path: string
    hasDropdown: boolean
    dropdownItems: { name: string; path: string }[]
}

// Navigation links with dropdowns, copied verbatim from the source site's
// header (same labels and destinations).
const navLinks: NavItem[] = [
    {
        name: 'Om oss',
        path: '/om-oss',
        hasDropdown: true,
        dropdownItems: [
            { name: 'Om oss', path: '/om-oss' },
            { name: 'Jobba hos oss', path: '/om-oss/jobba-hos-oss' },
            { name: 'Lediga tjänster', path: '/om-oss/lediga-tjanster' },
            { name: 'Karriärvägar', path: '/om-oss/karriarvagar' },
            { name: 'Förmåner', path: '/om-oss/formaner' }
        ]
    },
    {
        name: 'Tjänster',
        path: '/tjanster',
        hasDropdown: true,
        dropdownItems: [
            { name: 'Översikt', path: '/tjanster' },
            { name: 'Mottagningar', path: '/mottagningar' },
            { name: 'Specialistmottagningar', path: '/tjanster/specialistmottagningar' },
            { name: 'Labbprov', path: '/tjanster/labbprov' },
            { name: 'Hemsjukvård', path: '/tjanster/hemsjukvard' }
        ]
    },
    {
        name: 'Patientinformation',
        path: '/patientinformation',
        hasDropdown: true,
        dropdownItems: [
            { name: 'Översikt', path: '/patientinformation' },
            { name: 'Vårdgaranti', path: '/patientinformation/vardgaranti' },
            { name: 'Avgifter', path: '/patientinformation/avgifter' },
            { name: 'Din vårdkontakt', path: '/patientinformation/din-vardkontakt' }
        ]
    },
    {
        name: 'Boka tid',
        path: '/boka-tid',
        hasDropdown: false,
        dropdownItems: []
    },
    {
        name: 'Mina sidor',
        path: '/mina-sidor',
        hasDropdown: false,
        dropdownItems: []
    },
    {
        name: 'Kontakt',
        path: '/kontakt',
        hasDropdown: false,
        dropdownItems: []
    }
]

// Desktop dropdown state: one FContextMenu per section, keyed by name.
const openDropdown = ref<string | null>(null)
const dropdownAnchors = new Map<string, HTMLElement>()

const setAnchor = (name: string) => (element: unknown) => {
    if (element instanceof HTMLElement) {
        dropdownAnchors.set(name, element)
    }
}

const anchorFor = (name: string): HTMLElement | undefined => dropdownAnchors.get(name)

const menuItemsFor = (item: NavItem): ContextMenuItem[] =>
    item.dropdownItems.map((child) => ({ label: child.name, key: child.path }))

const toggleDropdown = (name: string) => {
    openDropdown.value = openDropdown.value === name ? null : name
}

const onMenuSelect = (path: string) => {
    openDropdown.value = null
    router.push(path)
}

const onMenuClose = () => {
    openDropdown.value = null
}

// Mobile menu state
const isMenuOpen = ref(false)
const menuButtonLabel = computed(() => (isMenuOpen.value ? 'Stäng meny' : 'Öppna meny'))

// Check if a dropdown section contains the current route
const isDropdownActive = (item: NavItem) =>
    item.dropdownItems.some((child) => route.path === child.path)
</script>

<template>
    <header class="app-header" role="banner">
        <!-- Row 1: logo, search and color-mode toggle -->
        <div class="app-header__brand">
            <div class="app-header__inner">
                <router-link to="/" class="app-header__logo">
                    <span class="app-header__logo-mark">
                        <f-icon name="cross" class="app-header__logo-icon" />
                        <span class="sr-only">Vårdportalen, till startsidan</span>
                    </span>
                    <span class="app-header__logo-text">Vårdportalen</span>
                </router-link>

                <!-- Right side: search and color mode -->
                <div class="app-header__tools">
                    <SearchBox
                        class="app-header__search"
                        size="medium"
                        :hide-label="true"
                        aria-label="Sök på webbplatsen"
                    />
                    <ColorModeToggle class="app-header__mode-toggle" />
                </div>

                <!-- Mobile menu button -->
                <button
                    type="button"
                    class="app-header__menu-button"
                    :aria-label="menuButtonLabel"
                    :aria-expanded="isMenuOpen"
                    aria-controls="app-header-mobile-menu"
                    @click="isMenuOpen = !isMenuOpen"
                >
                    <f-icon :name="isMenuOpen ? 'close' : 'bars'" class="app-header__menu-icon" />
                </button>
            </div>
        </div>

        <!-- Row 2: navigation links (desktop) -->
        <nav class="app-header__nav" aria-label="Huvudnavigering">
            <ul class="app-header__nav-list">
                <li v-for="link in navLinks" :key="link.path" class="app-header__nav-item">
                    <template v-if="link.hasDropdown">
                        <router-link
                            :to="link.path"
                            class="app-header__nav-link"
                            :class="{ 'app-header__nav-link--active': isDropdownActive(link) }"
                        >
                            {{ link.name }}
                        </router-link>
                        <button
                            :ref="setAnchor(link.name)"
                            type="button"
                            class="app-header__dropdown-toggle"
                            :aria-expanded="openDropdown === link.name"
                            :aria-label="`Visa undermeny för ${link.name}`"
                            @click="toggleDropdown(link.name)"
                        >
                            <f-icon
                                name="caret-down"
                                class="app-header__dropdown-icon"
                                :class="{
                                    'app-header__dropdown-icon--open':
                                        openDropdown === link.name
                                }"
                            />
                        </button>
                        <f-context-menu
                            :is-open="openDropdown === link.name"
                            :items="menuItemsFor(link)"
                            :anchor="anchorFor(link.name)"
                            :aria-label="`Undermeny ${link.name}`"
                            @select="onMenuSelect"
                            @close="onMenuClose"
                        />
                    </template>
                    <router-link v-else :to="link.path" class="app-header__nav-link">
                        {{ link.name }}
                    </router-link>
                </li>
            </ul>
        </nav>

        <!-- Mobile navigation -->
        <div
            v-if="isMenuOpen"
            id="app-header-mobile-menu"
            class="app-header__mobile"
        >
            <nav aria-label="Mobilnavigering">
                <ul class="app-header__mobile-list">
                    <li v-for="link in navLinks" :key="link.path">
                        <router-link
                            :to="link.path"
                            class="app-header__mobile-link"
                            @click="isMenuOpen = false"
                        >
                            {{ link.name }}
                        </router-link>
                        <ul v-if="link.hasDropdown" class="app-header__mobile-sublist">
                            <li v-for="child in link.dropdownItems" :key="child.path">
                                <router-link
                                    :to="child.path"
                                    class="app-header__mobile-sublink"
                                    @click="isMenuOpen = false"
                                >
                                    {{ child.name }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <!-- Mobile search -->
            <div class="app-header__mobile-tools">
                <SearchBox
                    size="large"
                    aria-label="Sök på webbplatsen"
                    @keydown.esc.stop
                />
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.app-header {
    position: sticky;
    top: 0;
    z-index: 50;
}

//
// Brand row
//
.app-header__brand {
    background-color: var(--fkds-color-header-background-primary);
    color: var(--fkds-color-header-text-primary);
    border-bottom: 1px solid var(--fkds-color-border-primary);
}

.app-header__inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.app-header__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
}

.app-header__logo-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--f-radius-border-radius-small, 0.375rem);
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-action-text-inverted-default);
}

.app-header__logo-mark:hover {
    background-color: var(--fkds-color-action-background-primary-hover);
}

.app-header__logo-icon {
    width: 1.75rem;
    height: 1.75rem;
}

.app-header__logo-text {
    font-family: var(--fkds-typography-font-family-heading, inherit);
    font-size: 1.25rem;
    font-weight: 600;
}

.app-header__tools {
    display: none;
    align-items: center;
    gap: 1rem;

    @media (min-width: 48rem) {
        display: flex;
    }
}

.app-header__mode-toggle {
    color: var(--fkds-color-header-text-primary);
}

.app-header__menu-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background: transparent;
    color: var(--fkds-color-header-text-primary);
    cursor: pointer;

    @media (min-width: 48rem) {
        display: none;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-header__menu-icon {
    width: 1.5rem;
    height: 1.5rem;
}

//
// Nav row – light blue band under the white brand row (reference look).
// The feedback-info token is the theme's pale blue in light mode and a dark
// navy surface in dark mode, so text-primary keeps contrast in both.
//
.app-header__nav {
    display: none;
    background-color: var(--fkds-color-feedback-background-info);
    color: var(--fkds-color-text-primary);

    @media (min-width: 48rem) {
        display: block;
    }
}

.app-header__nav-list {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: stretch;
    gap: 1.5rem;
    list-style: none;
}

.app-header__nav-item {
    display: flex;
    align-items: center;
}

.app-header__nav-link {
    display: block;
    padding: 0.75rem 0.25rem;
    font-weight: 600;
    text-decoration: none;
    color: inherit;

    &:hover {
        color: var(--fkds-color-action-text-primary-default);
        text-decoration: underline;
    }

    &--active,
    &:is(.router-link-active) {
        color: var(--fkds-color-action-text-primary-default);
        text-decoration: underline;
        text-decoration-thickness: 0.2rem;
        text-underline-offset: 0.4rem;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-header__dropdown-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;

    &:hover {
        color: var(--fkds-color-action-text-primary-default);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-header__dropdown-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 200ms ease;

    &--open {
        transform: rotate(180deg);
    }
}

//
// Mobile menu – same light blue band as the desktop nav row.
//
.app-header__mobile {
    background-color: var(--fkds-color-feedback-background-info);
    color: var(--fkds-color-text-primary);
    border-bottom: 1px solid var(--fkds-color-border-primary);
    padding: 1rem;

    @media (min-width: 48rem) {
        display: none;
    }
}

.app-header__mobile-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.app-header__mobile-link {
    display: block;
    padding: 0.75rem 0.5rem;
    font-weight: 600;
    text-decoration: none;
    color: inherit;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);

    &:hover {
        background-color: var(--fkds-color-background-secondary);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-header__mobile-sublist {
    list-style: none;
    margin: 0 0 0.5rem;
    padding: 0 0 0 1.5rem;
    display: flex;
    flex-direction: column;
}

.app-header__mobile-sublink {
    display: block;
    padding: 0.5rem;
    text-decoration: none;
    color: inherit;
    opacity: 0.85;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);

    &:hover {
        background-color: var(--fkds-color-background-secondary);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-header__mobile-tools {
    margin-top: 1rem;
}
</style>
