<script setup lang="ts">
import { computed } from 'vue'
import { FIcon } from '@fkui/vue'
import { currentColorMode, toggleColorMode } from '@/color-mode'

const isDark = computed(() => currentColorMode.value === 'dark')
const label = computed(() => (isDark.value ? 'Växla till ljust läge' : 'Växla till mörkt läge'))
</script>

<template>
    <!-- Phosphor sun/moon (f-library extension, src/icons/phosphor-spritesheet.ts).
         The visible icon shows the mode a click would leave (sun while light). -->
    <button
        type="button"
        class="color-mode-toggle"
        :aria-label="label"
        :title="label"
        @click="toggleColorMode()"
    >
        <f-icon :name="isDark ? 'moon' : 'sun'" class="color-mode-toggle__icon" />
    </button>
</template>

<style scoped lang="scss">
.color-mode-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid currentColor;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    cursor: pointer;
}

.color-mode-toggle:hover {
    background: var(--fkds-color-background-secondary);
}

.color-mode-toggle:focus-visible {
    outline: none;
    box-shadow: var(--f-focus-box-shadow);
}

.color-mode-toggle__icon {
    width: 1.25rem;
    height: 1.25rem;
}
</style>
