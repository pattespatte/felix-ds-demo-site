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

// Hand-drawn glyphs for semantics the default icon library lacks (it has no
// mail or phone icon) – same precedent as the header's sun/moon toggle.
const HAND_DRAWN_ICONS: Record<string, string> = {
    envelope:
        'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z'
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
