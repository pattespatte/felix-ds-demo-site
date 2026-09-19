<script setup lang="ts">
import SecondaryNavigation from '@/components/common/SecondaryNavigation.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import { FButton } from '@fkui/vue'

const physicianSteps = [
    {
        title: 'AT-läkare',
        description:
            'Börja din karriär hos oss med din allmäntjänstgöring. Vi erbjuder en strukturerad AT-tjänstgöring med rotation mellan olika specialiteter.'
    },
    {
        title: 'ST-läkare',
        description:
            'Specialisera dig inom ditt intresseområde. Vi har ST-tjänster inom de flesta specialiteter med erfarna handledare.'
    },
    {
        title: 'Specialistläkare',
        description:
            'Arbeta som specialist hos oss med möjlighet till vidareutbildning och sub-specialisering.'
    },
    {
        title: 'Överläkare',
        description:
            'Ta ett större ansvar för verksamhetsutveckling och ledarskap inom din specialitet.'
    },
    {
        title: 'Klinikchef',
        description:
            'Ledare för en hel klinik med ansvar för personal, ekonomi och verksamhetsutveckling.'
    }
]

const nurseSteps = [
    {
        title: 'Nyutexaminerad sjuksköterska',
        description:
            'Börja din karriär med vårt introduktionsprogram som ger dig en trygg start i professionen.'
    },
    {
        title: 'Sjuksköterska',
        description:
            'Utveckla din kompetens inom olika områden med regelbunden fortbildning och handledning.'
    },
    {
        title: 'Specialistsjuksköterska',
        description:
            'Specialisera dig inom ditt intresseområde med stöd för vidareutbildning.'
    },
    {
        title: 'Avdelningsföreståndare',
        description: 'Ta ledarskap för en avdelning med ansvar för personal och verksamhet.'
    }
]

const testimonials = [
    {
        name: 'Anna, överläkare',
        quote:
            '"Jag började som AT-läkare här för 10 år sedan och har kunnat växa inom organisationen. Stödet för min utveckling har varit fantastiskt."'
    },
    {
        name: 'Erik, specialistsjuksköterska',
        quote:
            '"Efter min examen fick jag gå ett introduktionsprogram som gav mig trygghet. Nu har jag specialiserat mig inom intensivvård."'
    }
]
</script>

<template>
    <SecondaryNavigation />
    <div class="page">
        <div class="page__narrow">
            <h1 class="karriar__title">Karriärvägar</h1>

            <AppCard>
                <p class="karriar__intro">
                    Hos oss finns det många möjligheter att utvecklas och växa i din karriär. Vi
                    erbjuder tydliga karriärvägar och stöd för din professionella utveckling.
                </p>

                <div class="karriar__ladder karriar__ladder--physician">
                    <h2 class="karriar__ladder-title">Karriärsteg för läkare</h2>
                    <ol class="karriar__steps">
                        <li v-for="step in physicianSteps" :key="step.title" class="karriar__step">
                            <h3 class="karriar__step-title">{{ step.title }}</h3>
                            <p class="karriar__step-description">{{ step.description }}</p>
                        </li>
                    </ol>
                </div>

                <div class="karriar__ladder karriar__ladder--nurse">
                    <h2 class="karriar__ladder-title">Karriärsteg för sjuksköterskor</h2>
                    <ol class="karriar__steps">
                        <li v-for="step in nurseSteps" :key="step.title" class="karriar__step">
                            <h3 class="karriar__step-title">{{ step.title }}</h3>
                            <p class="karriar__step-description">{{ step.description }}</p>
                        </li>
                    </ol>
                </div>

                <div class="grid grid--2 karriar__columns">
                    <div class="karriar__panel karriar__panel--competence">
                        <h2 class="karriar__panel-title">Kompetensutveckling</h2>
                        <ul class="stack-list">
                            <ListItem>Individuell utvecklingsplan</ListItem>
                            <ListItem>Regelbundna utvecklingssamtal</ListItem>
                            <ListItem>Internutbildningar</ListItem>
                            <ListItem>Externa kurser och konferenser</ListItem>
                            <ListItem>Mentorprogram</ListItem>
                            <ListItem>Forskningsmöjligheter</ListItem>
                        </ul>
                    </div>
                    <div class="karriar__panel karriar__panel--leadership">
                        <h2 class="karriar__panel-title">Ledarskapsutveckling</h2>
                        <ul class="stack-list">
                            <ListItem>Grundläggande ledarskapsutbildning</ListItem>
                            <ListItem>Avancerad ledarskapsutbildning</ListItem>
                            <ListItem>Coaching och handledning</ListItem>
                            <ListItem>Nätverksträffar för chefer</ListItem>
                            <ListItem>Internationella utbyten</ListItem>
                            <ListItem>Projektledarutbildning</ListItem>
                        </ul>
                    </div>
                </div>

                <div class="karriar__stories">
                    <h2 class="karriar__stories-title">Karriärberättelser</h2>
                    <div class="grid grid--2">
                        <AppCard v-for="story in testimonials" :key="story.name" :title="story.name">
                            <p class="karriar__story-quote">{{ story.quote }}</p>
                        </AppCard>
                    </div>
                </div>

                <div class="karriar__actions">
                    <f-button class="karriar__action" size="medium" variant="primary">
                        Kontakta karriärrådgivare
                    </f-button>
                    <f-button class="karriar__action" size="medium" variant="secondary">
                        Läs mer om våra utbildningar
                    </f-button>
                </div>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.karriar__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.karriar__intro {
    margin: 0 0 1.5rem;
}

.karriar__ladder {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
    margin-bottom: 1.5rem;

    &--physician {
        background-color: var(--fkds-color-feedback-background-info);
    }

    &--nurse {
        background-color: var(--fkds-color-feedback-background-positive);
    }
}

.karriar__ladder-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.karriar__steps {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: karriar-step;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.karriar__step {
    counter-increment: karriar-step;
    border-left: 4px solid var(--fkds-color-action-border-primary-default);
    padding-left: 1rem;
    position: relative;

    &::before {
        content: counter(karriar-step);
        position: absolute;
        left: -1.625rem;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 999px;
        background-color: var(--fkds-color-action-background-primary-default);
        color: var(--fkds-color-action-text-inverted-default);
        font-size: 0.75rem;
        font-weight: 600;
    }
}

.karriar__step-title {
    margin: 0 0 0.25rem;
    font-weight: 600;
}

.karriar__step-description {
    margin: 0;
}

.karriar__columns {
    margin-bottom: 1.5rem;
}

.karriar__panel {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;

    &--competence {
        background-color: var(--fkds-color-feedback-background-warning);
    }

    &--leadership {
        background-color: var(--fkds-color-feedback-background-neutral);
    }
}

.karriar__panel-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.karriar__stories {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background-color: var(--fkds-color-background-secondary);
}

.karriar__stories-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.karriar__story-quote {
    margin: 0;
    font-style: italic;
}

.karriar__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
