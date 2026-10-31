<script setup lang="ts">
import { ref } from 'vue'
import { FConfirmModal } from '@fkui/vue'

// State to manage notification visibility. Not persisted: the notice shows
// on every full page load.
const isVisible = ref(true)

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
    <f-confirm-modal
        :is-open="isVisible"
        aria-close-text="Stäng"
        :buttons="[{ label: 'Jag förstår', type: 'primary', event: 'confirm' }]"
        @confirm="isVisible = false"
        @close="isVisible = false"
    >
        <template #heading>Demowebbplats</template>
        <template #content>
            <p>
                Detta är en demowebbplats och inte en faktisk vårdcentral.
                Ingen information på denna sida är verklig och ingen medicinsk
                rådgivning erbjuds. Syftet med webbplatsen är istället att testa
                <a href="https://github.com/pattespatte/felix-ds">designsystemet felix-ds</a>.
            </p>
        </template>
    </f-confirm-modal>
</template>

<style scoped>
/* Full-page decorative watermark, tied to the notice's visibility state.
   Purely visual: aria-hidden, non-interactive and exempt from contrast rules
   (WCAG 1.4.3 pure decoration). */
.demo-watermark {
  position: fixed;
  inset: 0;
  z-index: 10000; /* above FKUI's overlay layers, pointer-events keeps it inert */
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
  font-family: "Roboto Slab", serif; /* display text – the theme ships no heading-family token */
  font-size: 2.2vmax;
  font-weight: 600;
  letter-spacing: 0.15em;
  white-space: nowrap;
  color: var(--fkds-color-text-primary);
}
</style>
