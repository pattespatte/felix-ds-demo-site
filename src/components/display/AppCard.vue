<script setup lang="ts">
import { FCard } from '@fkui/vue'

// Thin wrapper over FCard giving the app a stable card surface: header
// (rendered as h3), default body and an optional footer for actions.
interface Props {
    title?: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
    <f-card class="app-card">
        <template v-if="title" #header="{ headingSlotClass }">
            <h3 :class="headingSlotClass">{{ title }}</h3>
        </template>
        <template #default>
            <slot />
        </template>
        <template v-if="$slots.footer" #footer>
            <slot name="footer" />
        </template>
    </f-card>
</template>

<style scoped lang="scss">
.app-card {
    display: block;
    height: 100%;
}
</style>
