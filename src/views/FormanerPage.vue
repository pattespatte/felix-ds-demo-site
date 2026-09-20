<script setup lang="ts">
import RelatedLinksSidebar from '@/components/common/RelatedLinksSidebar.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import { FButton, FExpandableParagraph } from '@fkui/vue'
import { omOssSectionLinks } from '@/data/omOssSection'

const benefitGroups = [
    {
        title: 'Hälsa och välmående',
        variant: 'info' as const,
        items: [
            'Friskvårdsbidrag på 5000 kr/år',
            'Subventionerad träning på lokala gym',
            'Regelbundna hälsokontroller',
            'Tillgång till företagshälsovård',
            'Stresshanteringskurser',
            'Ergonomiska arbetsplatser'
        ]
    },
    {
        title: 'Ekonomiska förmåner',
        variant: 'positive' as const,
        items: [
            'Konkurrenskraftig lön',
            'Årsbonus baserad på prestation',
            'Pensionsavtal med ITP',
            'Försäkringar via kollektivavtal',
            'Råvarubidrag',
            'Subventionerad lunch'
        ]
    },
    {
        title: 'Arbetstid och ledighet',
        variant: 'warning' as const,
        items: [
            'Flextid',
            '30 dagars semester',
            'Extra semesterdagar efter 40 år',
            'Föräldralönstillägg',
            'VAB-ersättning',
            'Möjlighet till deltid'
        ]
    },
    {
        title: 'Utveckling och karriär',
        variant: 'neutral' as const,
        items: [
            'Interna utbildningsprogram',
            'Extern fortbildning',
            'Konferensdeltagande',
            'Mentorprogram',
            'Karriärvägar',
            'Forskningsmöjligheter'
        ]
    }
]

const otherBenefits = [
    {
        title: 'Föräldraförmåner',
        items: [
            'Föräldrapenningtillägg upp till 90% av lönen',
            'Tillfällig föräldrapenning (VAB)',
            'Rätt till deltidsarbete'
        ]
    },
    {
        title: 'Tjänsteresor',
        items: ['Fria parkeringsplatser', 'Subventionerad kollektivtrafik', 'Tjänstebil för vissa tjänster']
    },
    {
        title: 'Sociala förmåner',
        items: ['Personalaktiviteter', 'Årliga kickoff-dagar', 'Julbord och festligheter']
    },
    {
        title: 'Teknik och verktyg',
        items: ['Modern arbetsutrustning', 'Mobiltelefon och surfplatta', 'Hemarbetsplatser']
    }
]
</script>

<template>
    <div class="page page--sidebar">
        <div class="page__narrow">
            <h1 class="formaner__title">Förmåner</h1>

            <AppCard>
                <p class="formaner__intro">
                    Som medarbetare hos oss får du tillgång till ett omfattande förmånspaket som är
                    utformat för att ge dig trygghet och balans i livet.
                </p>

                <div class="grid grid--2 formaner__columns">
                    <div
                        v-for="group in benefitGroups"
                        :key="group.title"
                        class="formaner__panel"
                        :class="`formaner__panel--${group.variant}`"
                    >
                        <h2 class="formaner__panel-title">{{ group.title }}</h2>
                        <ul class="stack-list">
                            <ListItem v-for="item in group.items" :key="item">{{ item }}</ListItem>
                        </ul>
                    </div>
                </div>

                <div class="formaner__other">
                    <h2 class="formaner__other-title">Andra förmåner</h2>
                    <f-expandable-paragraph v-for="group in otherBenefits" :key="group.title">
                        <template #title>{{ group.title }}</template>
                        <template #default>
                            <ul class="stack-list">
                                <ListItem v-for="item in group.items" :key="item">
                                    {{ item }}
                                </ListItem>
                            </ul>
                        </template>
                    </f-expandable-paragraph>
                </div>

                <div class="formaner__handbook" id="formanshandbok">
                    <h2 class="formaner__handbook-title">Förmånshandbok</h2>
                    <p class="formaner__handbook-text">
                        Som ny medarbetare får du tillgång till vår förmånshandbok där alla
                        förmåner beskrivs i detalj. Handboken uppdateras regelbundet och innehåller
                        all information du behöver för att kunna nyttja dina förmåner på bästa
                        sätt.
                    </p>
                    <div class="formaner__handbook-actions">
                        <f-button size="medium" variant="primary">
                            Ladda ner förmånshandbok (PDF)
                        </f-button>
                        <f-button size="medium" variant="secondary"> Kontakta HR </f-button>
                    </div>
                </div>
            </AppCard>
        </div>

        <RelatedLinksSidebar :links="omOssSectionLinks" />
    </div>
</template>

<style scoped lang="scss">
.formaner__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.formaner__intro {
    margin: 0 0 1.5rem;
}

.formaner__columns {
    margin-bottom: 1.5rem;
}

.formaner__panel {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;

    &--info {
        background-color: var(--fkds-color-feedback-background-info);
    }

    &--positive {
        background-color: var(--fkds-color-feedback-background-positive);
    }

    &--warning {
        background-color: var(--fkds-color-feedback-background-warning);
    }

    &--neutral {
        background-color: var(--fkds-color-feedback-background-neutral);
    }
}

.formaner__panel-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.formaner__other {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background-color: var(--fkds-color-background-secondary);
}

.formaner__other-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.formaner__handbook {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
    background-color: var(--fkds-color-feedback-background-info);
}

.formaner__handbook-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.formaner__handbook-text {
    margin: 0 0 1rem;
}

.formaner__handbook-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
