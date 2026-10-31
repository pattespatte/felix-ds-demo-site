<script setup lang="ts">
import { FIcon } from '@fkui/vue'

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
                <ul class="home__quick-grid">
                    <li v-for="card in quickStartCards" :key="card.to">
                        <router-link :to="card.to" class="home__quick-card">
                            <f-icon :name="card.icon" class="home__quick-icon" />
                            <span class="home__quick-title">{{ card.title }}</span>
                            <span class="home__quick-text">{{ card.description }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>

        <!-- Service list-card beside the light info panel. -->
        <div class="page home__sections">
            <section class="home__row" aria-label="Tjänster och information">
                <aside class="home__services">
                    <h2 class="home__services-title">Våra tjänster</h2>
                    <ul class="home__services-list">
                        <li v-for="link in serviceLinks" :key="link.to">
                            <router-link :to="link.to" class="home__services-link">
                                {{ link.label }}
                                <f-icon name="arrow-right" class="home__services-arrow" />
                            </router-link>
                        </li>
                    </ul>
                    <router-link to="/tjanster" class="home__services-all">
                        Visa alla tjänster
                        <f-icon name="arrow-right" class="home__services-arrow" />
                    </router-link>
                </aside>

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

            <!-- Bottom row of light cards. -->
            <section class="grid grid--2 home__bottom" aria-label="Aktuellt och kontakt">
                <router-link to="/patientinformation" class="home__bottom-card">
                    <span class="home__bottom-title">Patientinformation</span>
                    <span class="home__bottom-text">
                        Håll dig uppdaterad på vårdgarantier, avgifter och din vårdkontakt.
                    </span>
                </router-link>
                <router-link to="/kontakt" class="home__bottom-card">
                    <span class="home__bottom-title">Kontakt och felanmälan</span>
                    <span class="home__bottom-text">
                        Ställ frågor eller skicka in en felanmälan till vården.
                    </span>
                </router-link>
            </section>
        </div>
    </div>
</template>

<style scoped>
/* The hero band spans the primary column's full width (the shell gives the
   routed views the viewport), while the inner row keeps the shared page
   column. */
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

/* Quick-start grid: flat light cards with an outline icon, an underlined
   link title and a short description. */
.home__quick-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
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

.home__quick-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-background-primary);
  color: var(--fkds-color-text-primary);
  text-decoration: none;
}

.home__quick-card:hover {
  text-decoration: none;
  box-shadow: var(--f-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.2));
}

.home__quick-card:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

.home__quick-icon {
  width: 2rem;
  height: 2rem;
  color: var(--fkds-color-action-text-primary-default);
}

/* Titles are links inside a link card; keep them underlined like the
   reference and let the hover colour come from the theme's anchor rule. */
.home__quick-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--fkds-color-action-text-primary-default);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
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

/* Dark list-card with stacked link rows. */
.home__services {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-action-background-primary-default);
  color: var(--fkds-color-action-text-inverted-default);
}

.home__services-title {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: inherit;
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

.home__services-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--f-radius-border-radius-small, 0.375rem);
  background-color: var(--fkds-color-action-background-primary-hover);
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

/* Restate the light colour on hover: the theme's `:root a:hover` (0,2,1)
   outranks this scoped rule (0,2,0) and would paint the dark link colour on
   the dark fill. */
.home__services-link:hover {
  color: var(--fkds-color-action-text-inverted-default);
  background-color: var(--fkds-color-action-background-primary-active);
}

.home__services-link:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

.home__services-arrow {
  flex: none;
  width: 1rem;
  height: 1rem;
}

.home__services-all {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;
  color: inherit;
  font-weight: 600;
}
.home__services-all:hover {
  color: var(--fkds-color-action-text-inverted-default);
}

.home__services-all:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

/* Light blue info panel with a dark visual card. */
.home__about {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-background-info, var(--fkds-color-feedback-background-info));
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

.home__about-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 11rem;
  height: 11rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-action-background-primary-default);
  color: var(--fkds-color-action-text-inverted-default);
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

/* Bottom row: light cards with underlined link titles. */
.home__bottom-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  border-radius: var(--f-radius-border-radius-large, 0.75rem);
  background-color: var(--fkds-color-background-secondary);
  color: var(--fkds-color-text-primary);
  text-decoration: none;
}

.home__bottom-card:hover {
  text-decoration: none;
  box-shadow: var(--f-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.2));
}

.home__bottom-card:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

.home__bottom-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--fkds-color-action-text-primary-default);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}

.home__bottom-text {
  font-size: 0.875rem;
}
</style>
