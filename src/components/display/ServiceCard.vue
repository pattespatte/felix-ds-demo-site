<script setup lang="ts">
import { computed } from 'vue'
import { FCard, FIcon } from '@fkui/vue'

// Service card: FCard with an icon in a token-colored circle and a link to
// the service page. Same prop surface as the source site's ServiceCard.
interface Props {
    title: string
    description?: string
    image?: string
    link?: string
    tags?: string[]
    icon?: string
}

const props = defineProps<Props>()

// Hand-drawn glyphs for semantics the default icon library lacks (31 icons,
// none of them medical) – same precedent as the header's sun/moon toggle.
// Shapes follow the well-known Material Symbols outlines (Apache 2.0) so
// they sit comfortably next to the FKUI glyphs.
const HAND_DRAWN_ICONS: Record<string, string> = {
    envelope:
        'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-6h2v6z',
    heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    flask: 'M19.8 18.4L14 10.67V6.5l1.35-1.35c.2-.2.2-.51 0-.71-.1-.1-.22-.15-.35-.15H9c-.13 0-.25.05-.35.15-.2.2-.2.51 0 .71L10 6.5v4.17L4.2 18.4c-.49.74-.06 1.75.85 1.75h13.9c.91 0 1.34-1.01.85-1.75zM9.5 15l1.5-2.25L12.5 15h-3z',
    chat: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
    shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zM11 7h2v3h3v2h-3v3h-2v-3H8v-2h3V7z',
    receipt:
        'M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z'
}

const handDrawnPath = computed(() =>
    props.icon ? HAND_DRAWN_ICONS[props.icon] : undefined
)

// Internal routes get router links; external URLs stay plain anchors.
const isInternal = computed(() => Boolean(props.link && props.link.startsWith('/')))
</script>

<template>
    <f-card class="service-card">
        <template #default>
            <div class="service-card__body">
                <div v-if="icon || $slots.image" class="service-card__visual">
                    <slot name="image">
                        <span v-if="icon" class="service-card__icon-circle">
                            <svg
                                v-if="handDrawnPath"
                                class="service-card__glyph"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path :d="handDrawnPath" fill="currentColor" fill-rule="evenodd" />
                            </svg>
                            <f-icon v-else :name="icon" class="service-card__glyph" />
                        </span>
                    </slot>
                </div>

                <h3 class="service-card__title">
                    <component
                        :is="isInternal ? 'router-link' : 'a'"
                        v-if="link"
                        :to="isInternal ? link : undefined"
                        :href="isInternal ? undefined : link"
                        class="service-card__link"
                    >
                        {{ title }}
                    </component>
                    <template v-else>{{ title }}</template>
                </h3>

                <p v-if="description" class="service-card__description">
                    {{ description }}
                </p>

                <div v-if="$slots.default" class="service-card__extra">
                    <slot />
                </div>

                <div v-if="tags && tags.length > 0" class="service-card__tags">
                    <span v-for="(tag, index) in tags" :key="index" class="service-card__tag">
                        {{ tag }}
                    </span>
                </div>

                <div v-if="link" class="service-card__footer">
                    <component
                        :is="isInternal ? 'router-link' : 'a'"
                        :to="isInternal ? link : undefined"
                        :href="isInternal ? undefined : link"
                        class="service-card__more"
                        :aria-label="`Läs mer om ${title}`"
                    >
                        Läs mer
                        <f-icon name="arrow-right" class="service-card__more-icon" />
                    </component>
                </div>
            </div>
        </template>
    </f-card>
</template>

<style scoped lang="scss">
.service-card {
    display: block;
    height: 100%;
}

.service-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
}

.service-card__visual {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 6rem;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-background-secondary);
}

.service-card__icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 999px;
    background-color: var(--fkds-color-feedback-background-info);
    color: var(--fkds-color-text-primary);
}

.service-card__glyph {
    width: 2rem;
    height: 2rem;
}

.service-card__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.service-card__link {
    color: var(--fkds-color-text-primary);
    text-decoration: none;

    &:hover {
        color: var(--fkds-color-action-text-primary-default);
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.service-card__description {
    margin: 0;
    flex: 1;
    color: var(--fkds-color-text-secondary);
}

.service-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.service-card__tag {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.625rem;
    border-radius: 999px;
    background-color: var(--fkds-color-feedback-background-info);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fkds-color-text-primary);
}

.service-card__footer {
    margin-top: auto;
}

.service-card__more {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fkds-color-action-text-primary-default);
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.service-card__more-icon {
    width: 1rem;
    height: 1rem;
}
</style>
