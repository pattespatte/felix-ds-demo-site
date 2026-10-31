<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import {
    FIcon,
    FLayoutApplicationTemplate,
    FLayoutLeftPanel,
    FPageHeader
} from '@fkui/vue'
import AppFooter from './components/common/AppFooter.vue'
import AppNavTree from './components/common/AppNavTree.vue'
import AppBreadcrumbs from './components/common/AppBreadcrumbs.vue'
import DemoNotification from './components/common/DemoNotification.vue'
import ComponentNote from './components/common/ComponentNote.vue'
import SearchBox from './components/interactive/SearchBox.vue'
import ColorModeToggle from './components/common/ColorModeToggle.vue'

// FLayoutLeftPanel keeps its open state internal (no prop upstream) and
// mounts open; the menu starts closed at every viewport (the header's Meny
// button is the only visible toggle), so the state is flipped before first
// paint.
const leftPanel = ref<InstanceType<typeof FLayoutLeftPanel> | null>(null)

const isNavOpen = computed(() => leftPanel.value?.isOpen ?? false)

function toggleNav(): void {
    leftPanel.value?.toggleSideNavigation()
}

function closeNav(): void {
    if (leftPanel.value?.isOpen) {
        leftPanel.value.isOpen = false
    }
}

onMounted(closeNav)

// Shared close callback: AppNavTree calls it after a navigation and the
// scrim on tap.
provide('close-mobile-nav', closeNav)
</script>

<template>
    <!-- FLayoutApplicationTemplate renders the header/footer landmarks around
         its slots, so FPageHeader and AppFooter need no wrapper elements of
         their own. The skip link rides on FPageHeader's built-in feature. -->
    <f-layout-application-template>
        <template #header>
            <f-page-header skip-link="main-content">
                <template #skip-link-text>Hoppa till innehåll</template>
                <template #logo>
                    <router-link to="/" class="app-brand">
                        <span class="app-brand__mark">
                            <f-icon name="cross" class="app-brand__glyph" />
                        </span>
                        <span class="app-brand__name">Vårdportalen DEMOWEBB</span>
                    </router-link>
                </template>
                <template #right>
                    <div class="app-header-controls">
                        <SearchBox
                            class="app-header-search"
                            size="small"
                            :hide-label="true"
                            aria-label="Sök på webbplatsen"
                        />
                        <ColorModeToggle class="app-header-mode-toggle" />
                        <button
                            type="button"
                            class="app-menu-button"
                            :aria-expanded="isNavOpen"
                            aria-controls="layout-navigation__navigation"
                            @click="toggleNav"
                        >
                            <f-icon :name="isNavOpen ? 'close' : 'bars'" class="app-menu-button__icon" />
                            {{ isNavOpen ? 'Stäng' : 'Meny' }}
                        </button>
                    </div>
                </template>
            </f-page-header>
        </template>

        <f-layout-left-panel ref="leftPanel" nav-label="Huvudnavigering" initial-width="320">
            <template #heading>
                <p class="shell-nav-title">Meny</p>
            </template>
            <template #content>
                <app-nav-tree />
            </template>
            <template #default>
                <div id="main-content" tabindex="-1" class="app-main">
                    <app-breadcrumbs />
                    <router-view />
                </div>
            </template>
        </f-layout-left-panel>

        <template #footer>
            <app-footer />
        </template>
    </f-layout-application-template>

    <!-- Backdrop behind the open navigation drawer; kept inert by CSS
         (shell.css) everywhere else. -->
    <div class="nav-scrim" aria-hidden="true" @click="closeNav()"></div>

    <demo-notification />
    <component-note />
</template>

<style scoped>
/* Brand link in the header's logo slot: the round navy mark plus the site
   name, styled as plain text with a keyboard focus ring. */
.app-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: inherit;
    text-decoration: none;
}

.app-brand:focus-visible {
    outline: none;
    box-shadow: var(--f-focus-box-shadow);
}

.app-brand__mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--f-radius-border-radius-small, 0.375rem);
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-action-text-inverted-default);
}

.app-brand__glyph {
    width: 1.25rem;
    height: 1.25rem;
}

.app-brand__name {
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
}

/* Header controls row: search field, color-mode toggle and the Meny button.
   Block-level flex: as an inline-flex the row would sit on a text line
   inside the shrink-wrapped slot, and the line box's strut adds phantom
   space below the controls that pushes them off the header's shared centre
   line. */
.app-header-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
}

/* FKUI's page header is a single non-wrapping flex row with overflow hidden;
   the small search field keeps the controls row compact. The width class
   lands on the SearchBox root itself (class fallthrough). */
.app-header-search {
    width: 13rem;
}

.app-header-mode-toggle {
    color: var(--fkds-color-text-primary);
}

/* The header's menu toggle: plain icon + label button like the reference
   utility bar. */
.app-menu-button {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.5rem;
    border: none;
    background: transparent;
    font: inherit;
    font-weight: 600;
    color: var(--fkds-color-text-primary);
    cursor: pointer;
}

.app-menu-button:hover {
    color: var(--fkds-color-action-text-primary-default);
}

.app-menu-button:focus-visible {
    outline: none;
    box-shadow: var(--f-focus-box-shadow);
}

.app-menu-button__icon {
    width: 1.25rem;
    height: 1.25rem;
}

/* The routed views render inside the primary column; the wrapper is the
   skip link's focus target. */
.app-main:focus {
    outline: none;
}
</style>
