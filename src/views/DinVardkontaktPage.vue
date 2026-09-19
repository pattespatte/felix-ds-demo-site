<script setup lang="ts">
import { FExpandableParagraph } from '@fkui/vue'
import InfoCard from '@/components/display/InfoCard.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'

const accordionItems = [
    {
        id: '1',
        title: 'Hur förbereder jag mig inför mitt besök?',
        content:
            'Inför ditt besök är det bra att tänka igenom dina frågor och symtom. Skriv gärna ner dem i förväg så du inte glömmer något viktigt. Ta med dig giltig legitimation, eventuella mediciner du använder och tidigare journaler om det är relevant för besöket. Om du har en remiss, ta med den också.'
    },
    {
        id: '2',
        title: 'När ska jag kontakta 1177 och när vårdcentralen?',
        content:
            'Kontakta 1177 för sjukvårdsrådgivning när du är osäker på var du ska söka vård, behöver råd om symtom eller har frågor om mediciner. Kontakta din vårdcentral för att boka tid, få vård för kända sjukdomar eller för uppföljning. Vid livshotande tillstånd, ring alltid 112.'
    },
    {
        id: '3',
        title: 'Vad ingår i ett läkarbesök?',
        content:
            'Ett läkarbesök innefattar vanligtvis en samtal om dina besvär, en undersökning, diagnos och behandlingsplan. Läkaren kan skriva ut recept, remittera till specialist eller boka återbesök. Besöket varar vanligtvis 15-30 minuter beroende på ärende.'
    },
    {
        id: '4',
        title: 'Hur fungerar e-tjänster och digital vårdkontakt?',
        content:
            'Genom 1177.se kan du logga in med BankID för att boka och avboka tider, förnya recept, se dina provsvar och läsa din journal. Vissa vårdcentraler erbjuder även digitala besök via videosamtal. Kontakta din vårdcentral för att veta vilka e-tjänster som erbjuds.'
    }
]

const digitalServices = [
    'Boka och avboka tider',
    'Förnya recept',
    'Se dina provsvar',
    'Läsa din journal',
    'Kommunicera säkert med din vårdgivare'
]

const patientRights = [
    'Du har rätt att få information om din hälsa och vård',
    'Du har rätt att välja vårdcentral i hela landet',
    'Du har rätt till en fast läkarkontakt',
    'Du har rätt att få en andra medicinsk bedömning',
    'Du har rätt att ta med dig en anhörig vid besöket',
    'Du har rätt att få information på ett språk du förstår'
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="dvk__title">Din vårdkontakt</h1>
            <p class="dvk__intro">
                Här hittar du information om hur du bäst förbereder dig för ditt besök och vilka
                olika vägar du kan ha för kontakt med vården.
            </p>
        </div>

        <div class="dvk__notice">
            <p>
                <strong>Viktigt:</strong>
                Kom alltid i tid till ditt besök. Om du behöver avboka, gör det minst 24 timmar i
                förväg så att någon annan kan få din tid.
            </p>
        </div>

        <AppCard title="Direktkontakt" class="dvk__section">
            <div class="grid grid--3 dvk__direct">
                <InfoCard title="Telefon" content="08-123 456 78" />
                <InfoCard title="1177" content="Sjukvårdsrådgivning" />
                <InfoCard title="112" content="Akuta situationer" />
            </div>
        </AppCard>

        <AppCard title="Kontaktvägar" class="dvk__section">
            <div class="stack dvk__routes">
                <div class="dvk__route dvk__route--clinic">
                    <h3>Vårdcentralen</h3>
                    <p>
                        Kontakta din vårdcentral för att boka tid, få rådgivning för kända
                        sjukdomar, förnya recept eller för uppföljning av tidigare behandlingar.
                    </p>
                </div>
                <div class="dvk__route dvk__route--guide">
                    <h3>1177 Vårdguiden</h3>
                    <p>
                        Ring 1177 för sjukvårdsrådgivning dygnet runt. Du kan få råd om symtom,
                        hjälp att hitta rätt vårdmottagning och svar på medicinska frågor.
                    </p>
                </div>
                <div class="dvk__route dvk__route--acute">
                    <h3>Akutvård</h3>
                    <p>
                        Vid livshotande tillstånd eller allvarliga skador, ring 112 direkt. För
                        andra akuta besvär som inte kan vänta, kontakta närmaste akutmottagning.
                    </p>
                </div>
            </div>
        </AppCard>

        <AppCard title="Digitala tjänster" class="dvk__section">
            <p class="dvk__paragraph">Med BankID kan du logga in på 1177.se för att:</p>
            <ul class="stack-list dvk__digital-list">
                <ListItem v-for="item in digitalServices" :key="item">{{ item }}</ListItem>
            </ul>
            <p class="dvk__paragraph">
                Många vårdcentraler erbjuder även digitala besök via videosamtal. Fråga din
                vårdcentral om detta är ett alternativ för ditt ärende.
            </p>
        </AppCard>

        <AppCard title="Vanliga frågor om din vårdkontakt" class="dvk__section">
            <f-expandable-paragraph
                v-for="item in accordionItems"
                :key="item.id"
                header-tag="h3"
            >
                <template #title>{{ item.title }}</template>
                <template #default>
                    {{ item.content }}
                </template>
            </f-expandable-paragraph>
        </AppCard>

        <AppCard title="Dina rättigheter som patient" class="dvk__section">
            <ul class="stack-list">
                <ListItem v-for="right in patientRights" :key="right">{{ right }}</ListItem>
            </ul>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.dvk__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.dvk__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.dvk__notice {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    border: 2px solid var(--fkds-color-feedback-border-info);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;
    margin-bottom: 2rem;

    p {
        margin: 0;
        font-size: 0.875rem;
    }
}

.dvk__section {
    margin-bottom: 1.5rem;
}

.dvk__direct {
    margin-bottom: 0;
}

.dvk__route {
    border: 1px solid var(--fkds-color-border-primary);
    border-left-width: 4px;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    padding: 1rem;

    h3 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
        font-weight: 600;
    }

    p {
        margin: 0;
    }

    &--clinic {
        border-left-color: var(--fkds-color-action-border-primary-default);
    }

    &--guide {
        border-left-color: var(--fkds-color-feedback-border-positive, currentColor);
    }

    &--acute {
        border-left-color: var(--fkds-color-feedback-border-negative, currentColor);
    }
}

.dvk__paragraph {
    margin: 0 0 1rem;
}

.dvk__digital-list {
    margin-bottom: 1rem;
}
</style>
