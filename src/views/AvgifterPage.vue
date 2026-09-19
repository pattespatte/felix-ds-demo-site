<script setup lang="ts">
import {
    FDataTable,
    FSortFilterDataset,
    FTableColumn,
    FTableColumnType
} from '@fkui/vue'
import InfoCard from '@/components/display/InfoCard.vue'
import AppCard from '@/components/display/AppCard.vue'
import AlertMessage from '@/components/display/AlertMessage.vue'
import ListItem from '@/components/display/ListItem.vue'

// Fee data (verbatim from the source site)
const feeData = [
    {
        id: '1',
        service: 'Läkarbesök på vårdcentral',
        price: '200 kr',
        highCostProtection: 'Ja'
    },
    { id: '2', service: 'Sjuksköterskebesök', price: '150 kr', highCostProtection: 'Ja' },
    { id: '3', service: 'Barn under 20 år', price: '0 kr', highCostProtection: 'Ja' },
    { id: '4', service: 'Telefonkonsultation', price: '100 kr', highCostProtection: 'Ja' },
    { id: '5', service: 'Laboratorieprov', price: '50 kr', highCostProtection: 'Ja' },
    { id: '6', service: 'EKG', price: '100 kr', highCostProtection: 'Ja' },
    { id: '7', service: 'Återbesök inom 7 dagar', price: '50 kr', highCostProtection: 'Ja' },
    { id: '8', service: 'Hemsjukvård (per tillfälle)', price: '250 kr', highCostProtection: 'Ja' }
]

// High cost protection data
const highCostData = [
    {
        id: '1',
        period: '12 månader',
        limit: '1 250 kr',
        description: 'Egenavgifter för vård inom landstinget'
    },
    {
        id: '2',
        period: '12 månader',
        limit: '2 400 kr',
        description: 'Egenavgifter för läkemedel (apotek)'
    },
    {
        id: '3',
        period: '12 månader',
        limit: '1 150 kr',
        description: 'Resor till och från vård'
    }
]

// Specialist care data
const specialistData = [
    { id: '1', service: 'Specialistläkarbesök', price: '400 kr', highCostProtection: 'Ja' },
    { id: '2', service: 'Sjukhusvistelse (per dag)', price: '100 kr', highCostProtection: 'Ja' },
    { id: '3', service: 'Operation', price: '100 kr', highCostProtection: 'Ja' },
    { id: '4', service: 'Akutbesök', price: '400 kr', highCostProtection: 'Ja' },
    { id: '5', service: 'Röntgenundersökning', price: '250 kr', highCostProtection: 'Ja' }
]

const importantNotes = [
    'Barn och ungdomar under 20 år har gratis vård inom landstinget',
    'Om du har frikort, ta med det vid varje besök',
    'Vissa tjänster kan ha andra avgifter än de som anges ovan',
    'Privat vård har andra priser och omfattas inte av högkostnadsskyddet',
    'För mer information om avgifter och frikort, kontakta vår reception'
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="avg__title">Avgifter</h1>
            <p class="avg__intro">
                Här hittar du information om kostnader för vård och behandling. Sverige har ett
                högkostnadsskydd som innebär att du betalar högst en viss summa per år.
            </p>
        </div>

        <AlertMessage
            type="success"
            heading-level="h2"
            class="avg__frikort"
        >
            <p>
                <strong>Frikort:</strong>
                När du har nått högkostnadsskyddet får du frikort som ger fri vård under
                resterande del av perioden. Kortet skickas automatiskt till din
                folkbokföringsadress.
            </p>
        </AlertMessage>

        <div class="grid grid--3 avg__stats">
            <InfoCard title="1 450 kr" content="Högkostnadsskydd för vård" />
            <InfoCard title="3 800 kr" content="Högkostnadsskydd för läkemedel" />
            <InfoCard title="2 000 kr" content="Högkostnadsskydd för resor" />
        </div>

        <AppCard title="Vårdcentral - Priser" class="avg__section">
            <p class="avg__table-intro">
                Nedan ser du gällande avgifter för besök på vår vårdcentral. Alla priser är angivna
                i svenska kronor.
            </p>
            <f-sort-filter-dataset
                :data="feeData"
                :sortable-attributes="{ service: 'Tjänst', price: 'Kostnad' }"
            >
                <template #default="{ sortFilterResult }">
                <f-data-table :rows="sortFilterResult" key-attribute="id">
                    <template #caption> Avgifter vårdcentral </template>
                    <template #default="{ row }">
                        <f-table-column title="Tjänst" row-header :type="FTableColumnType.TEXT">
                            {{ row.service }}
                        </f-table-column>
                        <f-table-column title="Kostnad" :type="FTableColumnType.TEXT" numeric>
                            {{ row.price }}
                        </f-table-column>
                        <f-table-column title="Högkostnadsskydd" :type="FTableColumnType.TEXT">
                            {{ row.highCostProtection }}
                        </f-table-column>
                    </template>
                </f-data-table>
                </template>
            </f-sort-filter-dataset>
        </AppCard>

        <AppCard title="Specialistvård - Priser" class="avg__section">
            <p class="avg__table-intro">
                Nedan ser du gällande avgifter för specialistvård. Alla priser är angivna i svenska
                kronor.
            </p>
            <f-sort-filter-dataset
                :data="specialistData"
                :sortable-attributes="{ service: 'Tjänst', price: 'Kostnad' }"
            >
                <template #default="{ sortFilterResult }">
                <f-data-table :rows="sortFilterResult" key-attribute="id">
                    <template #caption> Avgifter specialistvård </template>
                    <template #default="{ row }">
                        <f-table-column title="Tjänst" row-header :type="FTableColumnType.TEXT">
                            {{ row.service }}
                        </f-table-column>
                        <f-table-column title="Kostnad" :type="FTableColumnType.TEXT" numeric>
                            {{ row.price }}
                        </f-table-column>
                        <f-table-column title="Högkostnadsskydd" :type="FTableColumnType.TEXT">
                            {{ row.highCostProtection }}
                        </f-table-column>
                    </template>
                </f-data-table>
                </template>
            </f-sort-filter-dataset>
        </AppCard>

        <AppCard title="Högkostnadsskydd" class="avg__section">
            <p class="avg__table-intro">
                Högkostnadsskyddet innebär att du betalar högst en viss summa under en
                12-månadersperiod. När du har nått gränsen får du frikort som ger fri vård under
                resterande del av perioden.
            </p>
            <f-data-table :rows="highCostData" key-attribute="id">
                <template #caption> Beloppsgränser högkostnadsskydd </template>
                <template #default="{ row }">
                    <f-table-column title="Period" row-header :type="FTableColumnType.TEXT">
                        {{ row.period }}
                    </f-table-column>
                    <f-table-column title="Beloppsgräns" :type="FTableColumnType.TEXT" numeric>
                        {{ row.limit }}
                    </f-table-column>
                    <f-table-column title="Beskrivning" :type="FTableColumnType.TEXT" expand>
                        {{ row.description }}
                    </f-table-column>
                </template>
            </f-data-table>
        </AppCard>

        <AppCard title="Viktigt att veta" class="avg__section">
            <ul class="stack-list">
                <ListItem v-for="note in importantNotes" :key="note">{{ note }}</ListItem>
            </ul>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.avg__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.avg__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.avg__frikort {
    margin-bottom: 1.5rem;
}

.avg__stats {
    margin-bottom: 1.5rem;
}

.avg__section {
    margin-bottom: 1.5rem;
}

.avg__table-intro {
    margin: 0 0 1rem;
}
</style>
