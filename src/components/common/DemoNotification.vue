<script setup lang="ts">
import { ref } from 'vue'
import { FButton, FMessageBox } from '@fkui/vue'

// State to manage notification visibility
const isVisible = ref(true)

// Function to dismiss the notification
const dismiss = () => {
    isVisible.value = false
}

// Number of repeated watermark strings. The tile grid scales with vmax, so a
// fixed count covers any viewport; surplus tiles are clipped outside the view.
const watermarkCount = 200
</script>

<template>
    <div v-if="isVisible" class="demo-watermark" aria-hidden="true">
        <div class="demo-watermark__grid">
            <span
                v-for="n in watermarkCount"
                :key="n"
                class="demo-watermark__item"
            >
                DEMO SITE
            </span>
        </div>
    </div>
    <f-message-box v-if="isVisible" type="info" class="demo-notification">
        <template #default="{ headingSlotClass }">
            <div class="demo-notification__body">
                <p :class="headingSlotClass" class="demo-notification__text">
                    <strong>Detta är en demowebbplats</strong>
                    och inte en faktisk vårdcentral. Ingen information på denna
                    sida är verklig och ingen medicinsk rådgivning erbjuds.
                    Syftet med webbplatsen är istället att testa
                    <a href="https://github.com/pattespatte/felix-ds">designsystemet felix-ds</a>.
                </p>
                <f-button
                    class="demo-notification__dismiss"
                    variant="primary"
                    size="medium"
                    icon-left="close"
                    @click="dismiss"
                >
                    Stäng meddelande
                </f-button>
            </div>
        </template>
    </f-message-box>
</template>

<style scoped lang="scss">
/* Full-page decorative watermark, tied to the banner's visibility state.
   Purely visual: aria-hidden, non-interactive and exempt from contrast rules
   (WCAG 1.4.3 pure decoration). */
.demo-watermark {
    position: fixed;
    inset: 0;
    z-index: 10000; // above FKUI's overlay layers, pointer-events keeps it inert
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    opacity: 0.18;
}

/* Oversized rotated tile grid: the viewport maps onto its center band, so
   rotating cannot reveal uncovered corners. */
.demo-watermark__grid {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 240vmax;
    height: 240vmax;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 6vmax 5vmax;
    transform: translate(-50%, -50%) rotate(-30deg);
}

.demo-watermark__item {
    font-family: "Roboto Slab", serif; // display text – the theme ships no heading-family token
    font-size: 2.2vmax;
    font-weight: 600;
    letter-spacing: 0.15em;
    white-space: nowrap;
    color: var(--fkds-color-text-primary);
}

.demo-notification {
    display: block;
    position: relative;
    /* Must stay above .demo-watermark (z-index 10000) so the opaque
       message-box background hides the watermark strings behind the banner. */
    z-index: 10001;
    border-radius: 0;
}

.demo-notification__body {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.demo-notification__text {
    flex: 1;
    margin: 0;
}

.demo-notification__dismiss {
    flex-shrink: 0;
    white-space: nowrap;
}
</style>
