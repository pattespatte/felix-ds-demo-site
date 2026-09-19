<script setup lang="ts">
import { ref } from 'vue'
import { FButton, FMessageBox } from '@fkui/vue'

// State to manage notification visibility
const isVisible = ref(true)

// Function to dismiss the notification
const dismiss = () => {
    isVisible.value = false
}
</script>

<template>
    <f-message-box v-if="isVisible" type="info" class="demo-notification">
        <template #default="{ headingSlotClass }">
            <div class="demo-notification__body">
                <p :class="headingSlotClass" class="demo-notification__text">
                    <strong>Detta är en demowebbplats</strong>
                    och inte en faktisk vårdcentral. Ingen information på denna
                    sida är verklig och ingen medicinsk rådgivning erbjuds.
                </p>
                <f-button
                    class="demo-notification__dismiss"
                    variant="tertiary"
                    size="small"
                    @click="dismiss"
                >
                    Stäng meddelande
                </f-button>
            </div>
        </template>
    </f-message-box>
</template>

<style scoped lang="scss">
.demo-notification {
    display: block;
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
