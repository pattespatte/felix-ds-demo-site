<script setup lang="ts">
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import { FButton } from '@fkui/vue'

const jobs = [
    {
        title: 'Specialistläkare i allmänmedicin',
        description:
            'Vi söker en driven specialistläkare till vår vårdcentral. Tillsvidareanställning med start enligt överenskommelse.',
        deadline: 'Sista ansökningsdag: 2025-12-15'
    },
    {
        title: 'Specialistläkare i kirurgi',
        description:
            'Till vår kirurgiska mottagning söker vi en specialistläkare med intresse för både planerad och akut kirurgi.',
        deadline: 'Sista ansökningsdag: 2025-12-20'
    },
    {
        title: 'Specialistläkare i psykiatri',
        description:
            'Vi utökar vår psykiatriska verksamhet och söker nu specialistläkare till vår öppenvårdsmottagning.',
        deadline: 'Sista ansökningsdag: 2026-01-10'
    },
    {
        title: 'Specialistläkare i radiologi',
        description:
            'Till vår moderna röntgenavdelning söker vi en specialistläkare med bred kompetens inom diagnostisk radiologi.',
        deadline: 'Sista ansökningsdag: 2025-12-31'
    }
]
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="lediga__title">Lediga tjänster</h1>

            <AppCard>
                <p class="lediga__intro">
                    Vi söker ständig nya medarbetare som vill vara med och utveckla vården. Här
                    hittar du våra lediga tjänster för specialistläkare och annan vårdpersonal.
                </p>

                <div class="lediga__section lediga__section--accent">
                    <h2 class="lediga__section-title">Aktuella tjänster</h2>
                    <div class="stack">
                        <article
                            v-for="job in jobs"
                            :key="job.title"
                            class="lediga__job"
                        >
                            <h3 class="lediga__job-title">{{ job.title }}</h3>
                            <p class="lediga__job-description">{{ job.description }}</p>
                            <p class="lediga__job-deadline">{{ job.deadline }}</p>
                        </article>
                    </div>
                </div>

                <div class="grid grid--2 lediga__columns">
                    <div class="lediga__panel lediga__panel--offer">
                        <h2 class="lediga__panel-title">Vi erbjuder</h2>
                        <ul class="stack-list">
                            <ListItem>Konkurrenskraftig lön</ListItem>
                            <ListItem>Förmånlig arbetstid</ListItem>
                            <ListItem>Möjlighet till forskning</ListItem>
                            <ListItem>Intern fortbildning</ListItem>
                            <ListItem>Moderne arbetslokaler</ListItem>
                            <ListItem>Subventionerad lunch</ListItem>
                        </ul>
                    </div>
                    <div class="lediga__panel lediga__panel--qualifications">
                        <h2 class="lediga__panel-title">Kvalifikationer</h2>
                        <ul class="stack-list">
                            <ListItem>Legitimerad läkare</ListItem>
                            <ListItem>Specialistkompetens</ListItem>
                            <ListItem>Svenska språket flytande</ListItem>
                            <ListItem>Engelska språket goda kunskaper</ListItem>
                            <ListItem>Samarbetförmåga</ListItem>
                            <ListItem>Patientfokus</ListItem>
                        </ul>
                    </div>
                </div>

                <div class="lediga__section lediga__section--muted">
                    <h2 class="lediga__section-title">Ansökan</h2>
                    <p class="lediga__paragraph">
                        Välkommen att skicka in din ansökan via vår e-post:
                        rekrytering@vardcentral.se. Ange vilken tjänst du söker i ämnesraden.
                    </p>
                    <p class="lediga__paragraph">
                        Din ansökan ska innehålla CV, personligt brev och kopior på relevanta intyg
                        och legitimationer.
                    </p>
                    <p class="lediga__paragraph">
                        Vi tillämpar löpande urval och kan komma att kalla till intervju innan sista
                        ansökningsdag.
                    </p>
                </div>

                <div class="lediga__actions">
                    <router-link to="/kontakt" custom v-slot="{ navigate }">
                        <f-button
                            class="lediga__action"
                            size="medium"
                            variant="primary"
                            role="link"
                            @click="navigate"
                        >
                            Kontakta oss
                        </f-button>
                    </router-link>
                    <f-button class="lediga__action" size="medium" variant="secondary">
                        Prenumerera på lediga jobb
                    </f-button>
                </div>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.lediga__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.lediga__intro {
    margin: 0 0 1.5rem;
}

.lediga__section {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
    margin-bottom: 1.5rem;

    &--accent {
        background-color: var(--fkds-color-feedback-background-info);
    }

    &--muted {
        background-color: var(--fkds-color-background-secondary);
    }
}

.lediga__section-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.lediga__job {
    border-left: 4px solid var(--fkds-color-action-border-primary-default);
    padding-left: 1rem;
}

.lediga__job-title {
    margin: 0 0 0.25rem;
    font-weight: 600;
}

.lediga__job-description {
    margin: 0;
}

.lediga__job-deadline {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: var(--fkds-color-text-secondary);
}

.lediga__columns {
    margin-bottom: 1.5rem;
}

.lediga__panel {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;

    &--offer {
        background-color: var(--fkds-color-feedback-background-positive);
    }

    &--qualifications {
        background-color: var(--fkds-color-feedback-background-warning);
    }
}

.lediga__panel-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.lediga__paragraph {
    margin: 0 0 1rem;

    &:last-child {
        margin-bottom: 0;
    }
}

.lediga__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
