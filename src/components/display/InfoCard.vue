<script setup lang="ts">
import { FCard, FIcon } from '@fkui/vue'

// Information card on FCard: optional icon, title and content. Same prop
// surface as the source site's InfoCard.
interface Props {
    title?: string
    content?: string
    icon?: string
    variant?: 'default' | 'primary' | 'secondary'
}

withDefaults(defineProps<Props>(), {
    variant: 'default'
})
</script>

<template>
    <f-card class="info-card">
        <template #default>
            <div class="info-card__body">
                <div v-if="icon || $slots.icon" class="info-card__icon">
                    <slot name="icon">
                        <f-icon v-if="icon" :name="icon" class="info-card__glyph" />
                    </slot>
                </div>
                <div class="info-card__content">
                    <h3 v-if="title" class="info-card__title">{{ title }}</h3>
                    <div v-if="content || $slots.default" class="info-card__text">
                        <slot>
                            <p>{{ content }}</p>
                        </slot>
                    </div>
                </div>
            </div>
        </template>
    </f-card>
</template>

<style scoped lang="scss">
.info-card {
    display: block;
    height: 100%;
}

.info-card__body {
    display: flex;
    gap: 1rem;
}

.info-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    background-color: var(--fkds-color-feedback-background-info);
    color: var(--fkds-color-text-primary);
}

.info-card__glyph {
    width: 1.5rem;
    height: 1.5rem;
}

.info-card__content {
    flex: 1;
    min-width: 0;
}

.info-card__title {
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
}

.info-card__text {
    font-size: 0.9375rem;

    p {
        margin: 0;
    }
}
</style>
