<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FButton, FMessageBox } from '@fkui/vue'
import { componentLinks, type ComponentLink } from '@/data/componentLinks'

const route = useRoute()
const isVisible = ref(true)

// New page, new components: a dismissal applies to the current page only, so
// the note reappears when the visitor moves on.
watch(
    () => route.fullPath,
    () => {
        isVisible.value = true
    }
)

const components = computed<ComponentLink[]>(() =>
    ((route.meta.components as string[] | undefined) ?? [])
        .map((name) => componentLinks[name])
        .filter((component): component is ComponentLink => Boolean(component))
)

const dismiss = () => {
    isVisible.value = false
}
</script>

<template>
    <f-message-box v-if="isVisible && components.length > 0" type="info" class="component-note">
        <template #default="{ headingSlotClass }">
            <div class="component-note__body">
                <p :class="headingSlotClass" class="component-note__heading">
                    Den här sidan använder följande komponenter:
                </p>
                <ul class="component-note__list">
                    <li v-for="component in components" :key="component.name">
                        <a :href="component.url" class="component-note__link">
                            {{ component.name }}
                        </a>
                        <span class="component-note__title">{{ component.title }}</span>
                    </li>
                </ul>
                <f-button
                    class="component-note__dismiss"
                    variant="primary"
                    size="small"
                    icon-left="close"
                    @click="dismiss"
                >
                    Stäng
                </f-button>
            </div>
        </template>
    </f-message-box>
</template>

<style scoped lang="scss">
/* Floating per-page note. Sits above the decorative watermark (z-index
   10000) so the opaque message-box background keeps the text readable. */
.component-note {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 10001;
    max-width: min(20rem, calc(100vw - 2rem));
    border-radius: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.component-note__body {
    position: relative;
}

.component-note__heading {
    margin: 0 0 0.5rem;
    /* Keep the first lines clear of the dismiss button docked top-right. */
    padding-right: 6rem;
}

/* Long lists (the booking form uses 15 components) stay inside the note. */
.component-note__list {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.875rem;
    max-height: 40vh;
    overflow-y: auto;
}

.component-note__title {
    padding-left: 0.5rem;
    font-weight: 600;
    color: var(--fkds-color-text-secondary);
}

.component-note__dismiss {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
