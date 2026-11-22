<script setup lang="ts">
import { FCard, FIcon } from '@fkui/vue'

// Start page modelled on the reference portal design: a dark hero band with
// a "Kom igång" card grid, a service list-card beside a light info panel and
// a bottom row of light cards. All content is fictional (DEMOWEBB).
interface QuickStartCard {
    title: string
    description: string
    icon: string
    to: string
}

const quickStartCards: QuickStartCard[] = [
    {
        title: 'Boka tid',
        description: 'Boka tid hos läkare, sjuksköterska eller annan vårdpersonal.',
        icon: 'calendar',
        to: '/boka-tid'
    },
    {
        title: 'Journaler och provsvar',
        description: 'Se dina journaler, provsvar och recept i Mina sidor.',
        icon: 'file-text',
        to: '/mina-sidor'
    },
    {
        title: 'Våra tjänster',
        description: 'Översikt över mottagningar, specialistvård och hemsjukvård.',
        icon: 'stethoscope',
        to: '/tjanster'
    },
    {
        title: 'Kontakta oss',
        description: 'Ställ frågor eller kontakta vården via e-tjänster och telefon.',
        icon: 'headset',
        to: '/kontakt'
    }
]

interface ServiceLink {
    label: string
    to: string
}

const serviceLinks: ServiceLink[] = [
    { label: 'Mottagningar', to: '/mottagningar' },
    { label: 'Specialistmottagningar', to: '/tjanster/specialistmottagningar' },
    { label: 'Labbprov', to: '/tjanster/labbprov' },
    { label: 'Hemsjukvård', to: '/tjanster/hemsjukvard' },
    { label: 'Boka tid', to: '/boka-tid' }
]
</script>

<template>
    <div class="home">
        <!-- Hero band: full-bleed dark surface with the quick-start grid. -->
        <section class="home__hero">
            <div class="home__hero-inner">
                <h1 class="home__title">Vårdportalen DEMOWEBB – din vård samlad på ett ställe</h1>
                <p class="home__intro">
                    Här kan du enkelt boka tider, kontakta vården och hantera dina
                    vårdärenden. Innehållet uppdateras löpande i takt med att nya
                    tjänster och funktioner läggs till.
                </p>

                <h2 class="home__quick-heading">Kom igång</h2>
                <!-- Service entries use felix's entrypoint pattern: a full-width
                     row that reads as the primary call to action, with the
                     theme's own chevron at the far end. -->
                <ul class="home__quick-grid">
                    <li v-for="card in quickStartCards" :key="card.to">
                        <router-link :to="card.to" class="entrypoint home__quick-entry">
                            <f-icon :name="card.icon" class="home__quick-icon" />
                            <span class="home__quick-body">
                                <span class="home__quick-title">{{ card.title }}</span>
                                <span class="home__quick-text">{{ card.description }}</span>
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>

        <!-- Service list-card beside the light info panel. -->
        <div class="page home__sections">
            <section class="home__row" aria-label="Tjänster och information">
                <f-card class="home__services">
                    <template #header="{ headingSlotClass }">
                        <h2 :class="headingSlotClass">Våra tjänster</h2>
                    </template>
                    <template #default>
                        <!-- One entrypoint per service: felix's row pattern with
                             the chevron pointing along the reading direction. -->
                        <ul class="home__services-list">
                            <li v-for="link in serviceLinks" :key="link.to">
                                <router-link :to="link.to" class="entrypoint home__services-link">
                                    {{ link.label }}
                                    <f-icon name="arrow-right" class="entrypoint__icon" />
                                </router-link>
                            </li>
                        </ul>
                        <router-link to="/tjanster" class="home__services-all">
                            Visa alla tjänster
                            <f-icon name="arrow-right" class="home__services-arrow" />
                        </router-link>
                    </template>
                </f-card>

                <div class="home__about">
                    <div class="home__about-text">
                        <h2 class="home__about-title">Vad är Vårdportalen?</h2>
                        <p>
                            Vårdportalen är din digitala vårdcentral. Här samlas dina
                            vårdkontakter, tidsbokningar och hälsinformation på ett och
                            samma ställe – oavsett om du besöker oss på en mottagning,
                            hos en specialist eller i hemmet.
                        </p>
                        <router-link to="/om-oss" class="home__about-link">
                            Läs mer om Vårdportalen
                            <f-icon name="arrow-right" class="home__about-arrow" />
                        </router-link>
                    </div>
                    <!-- Decorative icon collage standing in for the reference's
                         image card: aria-hidden, no information content. -->
                    <div class="home__about-visual" aria-hidden="true">
                        <f-icon name="cross" class="home__about-visual-cross" />
                        <div class="home__about-visual-icons">
                            <f-icon name="calendar" />
                            <f-icon name="headset" />
                            <f-icon name="file-text" />
                            <f-icon name="stethoscope" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Bottom row of cards on the warm surface. -->
            <section class="grid grid--2 home__bottom" aria-label="Aktuellt och kontakt">
                <f-card class="home__bottom-card">
                    <template #header="{ headingSlotClass }">
                        <h2 :class="headingSlotClass">
                            <router-link to="/patientinformation">Patientinformation</router-link>
                        </h2>
                    </template>
                    <template #default>
                        <p class="home__bottom-text">
                            Håll dig uppdaterad på vårdgarantier, avgifter och din vårdkontakt.
                        </p>
                    </template>
                </f-card>
                <f-card class="home__bottom-card">
                    <template #header="{ headingSlotClass }">
                        <h2 :class="headingSlotClass">
                            <router-link to="/kontakt">Kontakt och felanmälan</router-link>
                        </h2>
                    </template>
                    <template #default>
                        <p class="home__bottom-text">
                            Ställ frågor eller skicka in en felanmälan till vården.
                        </p>
                    </template>
                </f-card>
            </section>
        </div>
    </div>
</template>

<style scoped>
/* The warm surface token ships with the next theme release. On the current
   pin these local fallbacks keep both color modes readable until then; once
   the token exists every branch resolves to it. */
.home {
  --home-warm: var(--fkds-color-background-warm, #dfd7c8);
}

html[data-color-mode="dark"] .home {
  --home-warm: var(--fkds-color-background-warm, #252932);
}

/* The hero band spans the primary column's full width (the shell gives the
   routed views the viewport), while the inner row keeps the shared page
   column. The band is the deep navy action surface, so its text uses the
   inverted tokens. */
.home__hero {
  background-color: var(--fkds-color-action-background-primary-default);
  color: var(--fkds-color-action-text-inverted-default);
}

.home__hero-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1rem 3.5rem;
  box-sizing: border-box;
}

.home__title {
  margin: 0 0 1rem;
  max-width: 46rem;
  font-size: 2.25rem;
  color: inherit;
  /* Display heading: wrap at word boundaries, never mid-word. */
  hyphens: none;
}

.home__intro {
  margin: 0 0 2.5rem;
  max-width: 40rem;
  font-size: 1.0625rem;
}

.home__quick-heading {
  margin: 0 0 1.25rem;
  font-size: 1.5rem;
  color: inherit;
}

/* Quick-start grid: one entrypoint per service, two columns from the medium
   breakpoint so the hero keeps its height down. The entrypoint class carries
   felix's own layout (full-width row, arrow at the far end); this rule only
   adds the icon-and-text body inside it. */
.home__quick-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: minmax(0, 1fr);
}
@media (min-width: 48rem) {
  .home__quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.home__quick-grid > * {
  min-width: 0;
}

/* Quick-start cards. Upstream's entrypoint ships a 1px transparent border and
   paints its fill in the same navy as the hero band behind it, so without an
   edge the four cards dissolve into the band. The border restates the width
   (felix narrows --f-border-width-medium to 1px) with the hero navy one step
   lighter, which reads as a tonal edge rather than a drawn outline; hover
   lifts it to the action blue, since upstream would otherwise fade the border
   to transparent on hover. */
.home__quick-entry {
  margin: 0;
  gap: 1rem;
  height: 100%;
  box-sizing: border-box;
  padding: 1.25rem 1.5rem;
  border-width: 2px;
  border-style: solid;
  border-color: var(--fkds-color-action-background-primary-hover, #334075);
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  text-decoration: none;
}

.entrypoint.home__quick-entry:hover,
.entrypoint.home__quick-entry:active {
  border-color: var(--fkds-color-action-text-primary-hover, #0865ae);
}

/* The label and description stack; the row itself centres them. */
.home__quick-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.home__quick-icon {
  flex: none;
  width: 1.75rem;
  height: 1.75rem;
  color: inherit;
}

.home__quick-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
}

.home__quick-text {
  font-size: 0.875rem;
}

/* Services + info row. */
.home__sections {
  padding-top: 2.5rem;
}

.home__row {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1fr);
  margin-bottom: 1.5rem;
}
@media (min-width: 60rem) {
  .home__row {
    grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
    align-items: stretch;
  }
}

/* The service card sits on the warm tertiary band, and each row is an
   entrypoint whose pill fill carries the deeper sand. Compound selectors keep
   the overrides ahead of the theme's `:root a.entrypoint` state rules. The
   hover/active fill mixes a little primary ink into the sand: tokens only, no
   raw palette value. The card's own upstream margin is dropped so the two
   side-by-side panels start on the same line (the grid gap owns the spacing). */
.home__services {
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: var(--fkds-color-background-tertiary, #f6f3ef);
  border-color: var(--fkds-color-background-tertiary, #f6f3ef);
  color: var(--fkds-color-text-primary);
}

.entrypoint.home__services-link,
.entrypoint.home__services-link:hover,
.entrypoint.home__services-link:active,
.entrypoint.home__services-link:focus-visible {
  color: var(--fkds-color-text-primary);
  text-decoration: none;
}

.entrypoint.home__services-link {
  margin: 0;
  /* Tighter than the upstream button padding, density-scaled like it. */
  padding: calc(0.5rem * var(--f-density-factor, 1)) 1.25rem;
  border-radius: var(--f-radius-border-radius-small, 0.375rem);
  background-color: var(--home-warm);
}

.entrypoint.home__services-link:hover,
.entrypoint.home__services-link:active {
  background-color: color-mix(in srgb, var(--home-warm) 92%, var(--fkds-color-text-primary));
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}

.entrypoint.home__services-link:focus-visible {
  background-color: var(--home-warm);
}

.home__services-list {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.home__services-arrow {
  flex: none;
  width: 1rem;
  height: 1rem;
}

/* The theme draws every bare arrow-right glyph with the downward chevron
   (the dropdown artwork); the "see all" link is not an entrypoint, so it gets
   the entrypoint's reading-direction chevron here. */
.home__services-all :deep(.f-icon-arrow-right) {
  background-color: currentColor;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9.5 6l6 6-6 6' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
}

.home__services-all :deep(.f-icon-arrow-right > use) {
  visibility: hidden;
}

.home__services-all {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;
  color: var(--fkds-color-action-text-primary-default);
  font-weight: 600;
}
.home__services-all:hover {
  color: var(--fkds-color-action-text-primary-hover);
}

.home__services-all:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

/* Info panel on the soft warm band, with a sand visual card beside it. */
.home__about {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-background-tertiary);
  color: var(--fkds-color-text-primary);
}
@media (min-width: 48rem) {
  .home__about {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

.home__about-title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.home__about-text p {
  margin: 0 0 1rem;
}

.home__about-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--fkds-color-action-text-primary-default);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}
.home__about-link:hover {
  color: var(--fkds-color-action-text-primary-hover);
}

.home__about-link:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

.home__about-arrow {
  width: 1rem;
  height: 1rem;
}

/* Decorative icon collage standing in for the reference's image card:
   aria-hidden, no information content, on the deep sand surface. */
.home__about-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 11rem;
  height: 11rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--home-warm);
  color: var(--fkds-color-text-primary);
}

.home__about-visual-cross {
  width: 3rem;
  height: 3rem;
}

.home__about-visual-icons {
  display: flex;
  gap: 1rem;
}

.home__about-visual-icons :deep(.icon),
.home__about-visual-icons :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

/* Bottom row: cards whose header is a link to the page. Margin dropped for
   the same reason as the service card: the grid gap owns the spacing. */
.home__bottom-card {
  display: block;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}

.home__bottom-card :deep(.card__header-label) {
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
}

.home__bottom-card :deep(.card__header-label a) {
  color: var(--fkds-color-action-text-primary-default);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}

.home__bottom-text {
  margin: 0;
  font-size: 0.875rem;
}
</style>
