<script setup lang="ts">
// Slim navy intro band at the top of routed views: the page title (rendered
// in the theme's heading typeface through the h1 default) and an optional
// lead paragraph. The band keeps the full-bleed hero language of the start
// page in a slimmer, in-column form.
defineProps<{
    title: string
    intro?: string
}>()
</script>

<template>
    <header class="page-intro">
        <h1 class="page-intro__title">{{ title }}</h1>
        <p v-if="intro || $slots.default" class="page-intro__text">
            <slot>{{ intro }}</slot>
        </p>
    </header>
</template>

<style scoped>
.page-intro {
  margin: 1.5rem 0 2rem;
  padding: 1.5rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-action-background-primary-default);
  color: var(--fkds-color-action-text-inverted-default);
}

/* The felix theme styles h1 with the display typeface; the band only tunes
   size and colour. */
.page-intro__title {
  margin: 0;
  font-size: 1.75rem;
  color: inherit;
}

.page-intro__title:not(:last-child) {
  margin-bottom: 0.5rem;
}

.page-intro__text {
  margin: 0;
  max-width: 46rem;
  font-size: 1.0625rem;
}

/* Lead text sits on the dark fill: keep content links light. */
.page-intro__text :deep(a) {
  color: inherit;
}
</style>
