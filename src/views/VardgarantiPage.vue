<script setup lang="ts">
import { FExpandableParagraph } from '@fkui/vue'
import InfoCard from '@/components/display/InfoCard.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'

const accordionItems = [
    {
        id: '1',
        title: 'Vad innebär vårdgarantin?',
        content:
            'Vårdgarantin är en lagstadgad rättighet som säkerställer att du får vård inom en viss tid. Den garanterar att du får kontakt med vårdcentral inom 7 dagar, får träffa specialist inom 90 dagar, och får behandling inom 90 dagar efter att diagnosen har ställts. Syftet är att säkerställa jämlik tillgång till vård oavsett var i landet du bor.'
    },
    {
        id: '2',
        title: 'Vad gäller för akuta besvär?',
        content:
            'Vårdgarantin gäller inte för akuta sjukdomar eller skador som kräver omedelbar vård. Om du har akuta besvär ska du alltid kontakta 1177 för rådgivning, söka vårdcentralens akutmottagning eller vid allvarliga tillstånd ringa 112. Akuta fall prioriteras alltid och ska få vård omedelbart.'
    },
    {
        id: '3',
        title: 'Vad händer om tiden överskrids?',
        content:
            'Om du inte får vård inom den garanterade tiden har du rätt att söka vård i ett annat landsting/region. Du kan också kontakta vården och fråga om varför väntetiden är längre än garanterat. I vissa fall kan du ha rätt till ersättning om du har fått bekosta vården själv på grund av att väntetiden överskreds.'
    },
    {
        id: '4',
        title: 'Gäller garantin för alla typer av vård?',
        content:
            'Vårdgarantin gäller för de flesta typer av specialiserad vård inom landstingets hälso- och sjukvård. Den omfattar bland annat läkarbesök, operationer och vissa undersökningar. Vissa specifika behandlingar kan ha egna väntetider som inte omfattas av garantin. Din vårdgivare kan ge dig mer information om vad som gäller för just ditt fall.'
    }
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="vardg__title">Vårdgaranti</h1>
            <p class="vardg__intro">
                Som patient i Sverige har du lagstadgad rätt till vård inom en viss tid. Här hittar
                du information om vad vårdgarantin innebär och vilka rättigheter du har.
            </p>
        </div>

        <div class="vardg__notice">
            <p>
                <strong>Viktigt:</strong>
                Vårdgarantin gäller från den dag du söker vård och fram till att du fått den vård
                du behöver. Spara alla remisser och journaler som bevis på när du sökte vård.
            </p>
        </div>

        <div class="grid grid--4 vardg__stats">
            <InfoCard title="Noll dagar" content="Kontakt med vårdcentral" />
            <InfoCard title="3 dagar" content="Medicinsk bedömning" />
            <InfoCard title="90 dagar" content="Specialistvård" />
            <InfoCard title="90 dagar" content="Behandling efter diagnos" />
        </div>

        <AppCard title="Vad innebär vårdgarantin för dig?" class="vardg__section">
            <p class="vardg__paragraph">
                Vårdgarantin är en del av hälso- och sjukvårdslagen och syftar till att säkerställa
                att alla patienter får vård i tid oavsett var i landet de bor. Garantin gäller från
                det att du söker vård tills du har fått behövlig behandling.
            </p>
            <p class="vardg__paragraph">
                Det är viktigt att veta att vårdgarantin inte gäller för alla typer av vård. Vissa
                planerade operationer och behandlingar kan ha längre väntetider. Din läkare eller
                vårdgivare kan ge dig mer information om vad som gäller för just ditt fall.
            </p>
        </AppCard>

        <AppCard title="Vanliga frågor om vårdgaranti" class="vardg__section">
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

        <AppCard title="Kontakt och mer information" class="vardg__section">
            <p class="vardg__paragraph">
                Om du har frågor om vårdgarantin eller om du tror att dina rättigheter har
                åsidosatts kan du kontakta:
            </p>
            <ul class="stack-list">
                <ListItem>Din vårdcentral för information om väntetider</ListItem>
                <ListItem>1177 Vårdguiden för generell rådgivning om vårdgarantin</ListItem>
                <ListItem>Patientnämnden i ditt landsting för att framföra klagomål</ListItem>
                <ListItem>
                    Inspektionen för vård och omsorg (IVO) för mer information om
                    patienträttigheter
                </ListItem>
            </ul>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.vardg__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.vardg__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.vardg__notice {
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

.vardg__stats {
    margin-bottom: 1.5rem;
}

.vardg__section {
    margin-bottom: 1.5rem;
}

.vardg__paragraph {
    margin: 0 0 1rem;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
