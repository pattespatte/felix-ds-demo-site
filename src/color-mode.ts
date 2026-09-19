import { ref } from 'vue'

export const COLOR_MODE_STORAGE_KEY = 'felix-demo-color-mode'

export type ColorMode = 'light' | 'dark'

function storedMode(): ColorMode | null {
    const stored = localStorage.getItem(COLOR_MODE_STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : null
}

// Color mode follows the system preference until the user makes an explicit
// choice (the toggle persists one); with no stored choice, system changes
// keep driving the page. The dark scope is attribute-based on <html> exactly
// as the felix-ds README documents.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function systemMode(): ColorMode {
    return prefersDark.matches ? 'dark' : 'light'
}

function setColorMode(mode: ColorMode): void {
    currentColorMode.value = mode
    if (mode === 'dark') {
        document.documentElement.setAttribute('data-color-mode', 'dark')
    } else {
        document.documentElement.removeAttribute('data-color-mode')
    }
}

export const currentColorMode = ref<ColorMode>(storedMode() ?? systemMode())

export function applyColorMode(mode: ColorMode): void {
    setColorMode(mode)
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode)
}

export function toggleColorMode(): void {
    applyColorMode(currentColorMode.value === 'dark' ? 'light' : 'dark')
}

/** Restores the stored choice (or the system preference) before mount. */
export function restoreColorMode(): void {
    setColorMode(storedMode() ?? systemMode())
}

prefersDark.addEventListener('change', (event) => {
    // Only follow the system while the user has not made an explicit choice.
    if (storedMode() === null) {
        setColorMode(event.matches ? 'dark' : 'light')
    }
})
