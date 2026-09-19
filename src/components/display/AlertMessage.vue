<script setup lang="ts">
import { ref } from 'vue'
import { FButton, FMessageBox } from '@fkui/vue'

// Alert messages on FMessageBox, exposing the source Alert's variants.
interface Props {
    type?: 'info' | 'success' | 'warning' | 'error'
    title?: string
    message?: string
    dismissible?: boolean
    headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'info',
    dismissible: false,
    headingLevel: 'h3'
})

const isVisible = ref(true)

const dismiss = () => {
    isVisible.value = false
}
</script>

<template>
    <f-message-box v-if="isVisible" :type="type" class="alert-message" role="alert">
        <template #default="{ headingSlotClass }">
            <div class="alert-message__body">
                <div class="alert-message__content">
                    <component :is="headingLevel" v-if="title" :class="headingSlotClass">
                        {{ title }}
                    </component>
                    <div class="alert-message__text">
                        <slot>
                            <p v-if="message">{{ message }}</p>
                        </slot>
                    </div>
                </div>
                <f-button
                    v-if="dismissible"
                    class="alert-message__dismiss"
                    variant="tertiary"
                    size="small"
                    aria-label="Stäng meddelande"
                    @click="dismiss"
                >
                    Stäng
                </f-button>
            </div>
        </template>
    </f-message-box>
</template>

<style scoped lang="scss">
.alert-message {
    display: block;
}

.alert-message__body {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.alert-message__content {
    flex: 1;
}

.alert-message__text {
    p {
        margin: 0;
    }
}

.alert-message__dismiss {
    flex-shrink: 0;
}
</style>
