<script setup lang="ts">
import { computed } from 'vue'
import { FProgressbar } from '@fkui/vue'

// Step progress on FProgressbar: the source site's ProgressIndicator showed
// a stepped track (steps + currentStep); here the same state drives an
// FKUI progressbar plus a visible step list.
interface Props {
    steps: string[]
    currentStep: number
    labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    currentStep: 0
})

const value = computed(() =>
    props.steps.length === 0
        ? 0
        : Math.round(((props.currentStep + 1) / props.steps.length) * 100)
)

const stepStatus = (index: number): 'done' | 'current' | 'todo' => {
    if (index < props.currentStep) {
        return 'done'
    }
    if (index === props.currentStep) {
        return 'current'
    }
    return 'todo'
}
</script>

<template>
    <div class="progress-indicator">
        <f-progressbar
            :value="value"
            :aria-label="`Steg ${currentStep + 1} av ${steps.length}`"
            class="progress-indicator__bar"
        />
        <ol class="progress-indicator__steps">
            <li
                v-for="(step, index) in steps"
                :key="index"
                class="progress-indicator__step"
                :class="`progress-indicator__step--${stepStatus(index)}`"
                :aria-current="index === currentStep ? 'step' : undefined"
            >
                {{ step }}
            </li>
        </ol>
    </div>
</template>

<style scoped lang="scss">
.progress-indicator__bar {
    display: block;
    margin-bottom: 0.75rem;
}

.progress-indicator__steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    font-size: 0.875rem;
}

.progress-indicator__step {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--fkds-color-text-secondary);

    &::before {
        content: '';
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 999px;
        border: 2px solid var(--fkds-color-border-strong);
        background-color: transparent;
    }

    &--done {
        color: var(--fkds-color-text-primary);

        &::before {
            border-color: var(--fkds-color-feedback-border-positive, currentColor);
            background-color: var(--fkds-color-feedback-background-positive);
        }
    }

    &--current {
        color: var(--fkds-color-text-primary);
        font-weight: 600;

        &::before {
            border-color: var(--fkds-color-action-border-primary-default);
            background-color: var(--fkds-color-action-background-primary-default);
        }
    }
}
</style>
