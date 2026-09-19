<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
    FBadge,
    FButton,
    FConfirmModal,
    FDatepickerField,
    FModal,
    FPaginator,
    FSelectField,
    FTextField,
    FValidationForm
} from '@fkui/vue'
import AlertMessage from '@/components/display/AlertMessage.vue'
import ServiceCard from '@/components/display/ServiceCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import AppTabs from '@/components/interactive/AppTabs.vue'

// Lab test data (verbatim from the source site)
const labTests = [
    {
        name: 'Blodprov',
        description: 'Allmänna blodprover för att kontrollera hälsostatus',
        category: 'Blod',
        preparation: 'Fastaräkommendationer kan gälla',
        duration: '10-15 minuter',
        fasting: true,
        price: 'Gratis med remiss',
        tags: ['Hälsokontroll', 'Blodvärden'],
        availability: 'Mån-fre: 7:00-16:00'
    },
    {
        name: 'Urinvägsprov',
        description: 'Analys av urin för att upptäcka infektioner eller sjukdomar',
        category: 'Urin',
        preparation: 'Morgonurin föredras',
        duration: '5 minuter',
        fasting: false,
        price: 'Gratis med remiss',
        tags: ['Infektion', 'Blodprov'],
        availability: 'Mån-fre: 7:00-16:00'
    },
    {
        name: 'Svampprov',
        description: 'Provtagning för att identifiera svampinfektioner',
        category: 'Svamp',
        preparation: 'Ingen särskild förberedelse',
        duration: '10 minuter',
        fasting: false,
        price: 'Gratis med remiss',
        tags: ['Svampinfektion', 'Hud'],
        availability: 'Mån-fre: 8:00-16:00'
    },
    {
        name: 'Cellprov',
        description: 'Gynekologiskt cellprov för tidig upptäckt av cellförändringar',
        category: 'Cellprov',
        preparation: 'Bokas inte under menstruation',
        duration: '15 minuter',
        fasting: false,
        price: 'Gratis',
        tags: ['Gynekologi', 'Prevention'],
        availability: 'Mån-fre: 8:00-16:00'
    },
    {
        name: 'Allergitest',
        description: 'Test för att identifiera allergener',
        category: 'Allergi',
        preparation: 'Undvik antihistaminer 3 dagar före test',
        duration: '30-45 minuter',
        fasting: false,
        price: '300-800 kr',
        tags: ['Allergi', 'Hudtest'],
        availability: 'Efter tidsbokning'
    },
    {
        name: 'EKG',
        description: 'Elektrokardiogram för att undersöka hjärtats aktivitet',
        category: 'Hjärt',
        preparation: 'Bära löst sittande kläder',
        duration: '15 minuter',
        fasting: false,
        price: 'Gratis med remiss',
        tags: ['Hjärta', 'Diagnos'],
        availability: 'Mån-fre: 8:00-16:00'
    },
    {
        name: 'Spirometri',
        description: 'Lungfunktionsprov för att mäta lungkapacitet',
        category: 'Lungor',
        preparation: 'Undvik ansträngande aktivitet 2 timmar före',
        duration: '30 minuter',
        fasting: false,
        price: 'Gratis med remiss',
        tags: ['Lungor', 'Andning'],
        availability: 'Efter tidsbokning'
    },
    {
        name: 'Glukostoleranstest',
        description: 'Test för att undersöka kroppens sockeromsättning',
        category: 'Metabolism',
        preparation: '12 timmars fasta krävs',
        duration: '2 timmar',
        fasting: true,
        price: 'Gratis med remiss',
        tags: ['Diabetes', 'Blodsocker'],
        availability: 'Mån-fre: 7:00-10:00'
    }
]

// Preparation instructions
const preparationInstructions = [
    {
        title: 'Inför blodprov',
        description:
            'De flesta blodprov kräver att du fastar i 8-12 timmar. Du kan dricka vatten.',
        icon: 'i'
    },
    {
        title: 'Inför urinprov',
        description:
            'Använd medelstrålen när du kissar i provburken för att undvika bakterier.',
        icon: 'file'
    },
    {
        title: 'Mediciner',
        description:
            'Meddela alltid vilka mediciner du tar. Vissa mediciner kan påverka provsvaren.',
        icon: 'file'
    },
    {
        title: 'Tidpunkt',
        description:
            'Kom i tid till din bokade tid. Sen ankomst kan innebära att du behöver boka om.',
        icon: 'calendar'
    }
]

// Tabs
const activeTab = ref('overview')
const tabs = [
    { id: 'overview', label: 'Översikt' },
    { id: 'preparation', label: 'Förberedelser' },
    { id: 'results', label: 'Provsvar' }
]

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

const categoryOptions = [
    { value: '', label: 'Alla kategorier' },
    { value: 'blod', label: 'Blodprov' },
    { value: 'urin', label: 'Urinvägsprov' },
    { value: 'cellprov', label: 'Cellprov' },
    { value: 'allergi', label: 'Allergitest' },
    { value: 'hjärt', label: 'Hjärt- och lungprov' }
]

const matchesFilters = (test: (typeof labTests)[number]) => {
    const matchesSearch =
        test.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
        !selectedCategory.value ||
        test.category.toLowerCase().includes(selectedCategory.value.toLowerCase())
    return matchesSearch && matchesCategory
}

// Filtered tests with pagination
const filteredTests = computed(() => {
    const filtered = labTests.filter(matchesFilters)
    const startIndex = (currentPage.value - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(labTests.filter(matchesFilters).length / itemsPerPage))

// Reset pagination when the filters change
watch([searchQuery, selectedCategory], () => {
    currentPage.value = 1
})

// Booking modal state
const showBookingModal = ref(false)
const confirmOpen = ref(false)
const successMessage = ref('')
const selectedTest = ref('')
const patientName = ref('')
const patientPersonnummer = ref('')
const patientPhone = ref('')
const timeSlot = ref('')
const preferredDate = ref('')

const today = new Date().toISOString().split('T')[0]

const handleBooking = (testName: string) => {
    selectedTest.value = testName
    showBookingModal.value = true
}

const closeModal = () => {
    showBookingModal.value = false
    selectedTest.value = ''
}

// The booking modal hands over to a confirm dialog before anything is sent;
// a success message replaces the source site's native alert.
const requestSend = () => {
    showBookingModal.value = false
    confirmOpen.value = true
}

const onConfirmSend = () => {
    confirmOpen.value = false
    successMessage.value = `Tid bokad för ${selectedTest.value}`
    closeModal()
    patientName.value = ''
    patientPersonnummer.value = ''
    patientPhone.value = ''
    timeSlot.value = ''
    preferredDate.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <div class="page">
        <AlertMessage
            v-if="successMessage"
            :key="successMessage"
            type="success"
            :message="successMessage"
            :dismissible="true"
            class="labb__success"
        />

        <f-confirm-modal
            :is-open="confirmOpen"
            :buttons="[
                { label: 'Ja, boka tiden', type: 'primary', event: 'confirm' },
                { label: 'Avbryt', type: 'secondary', event: 'dismiss' }
            ]"
            @confirm="onConfirmSend"
            @close="confirmOpen = false"
        >
            <template #heading> Bekräfta bokning </template>
            <template #content>
                <p>Vill du boka tid för {{ selectedTest }}?</p>
            </template>
        </f-confirm-modal>

        <h1 class="labb__title">Labbprov</h1>

        <!-- Alert for important information -->
        <AlertMessage
            type="info"
            title="Remiss krävs för de flesta prover"
            heading-level="h2"
            message="För de flesta laboratorieprover krävs remiss från läkare. Kontakta din vårdcentral om du är osäker."
            class="labb__alert"
        />

        <!-- Tabs for different views -->
        <AppTabs v-model="activeTab" :tabs="tabs" class="labb__tabs">
            <!-- Overview -->
            <div v-if="activeTab === 'overview'">
                <p class="labb__intro">
                    På vår laboratorieavdelning erbjuder vi ett brett utbud av
                    provtagningstjänster. All personal är utbildad för att ta prover på ett säkert
                    och professionellt sätt.
                </p>

                <!-- Search and filter section -->
                <f-validation-form class="labb__filter">
                    <div class="grid grid--2">
                        <f-text-field id="labb-search" v-model="searchQuery" :maxlength="100">
                            Sök provtyp
                        </f-text-field>
                        <f-select-field id="labb-category" v-model="selectedCategory">
                            <template #label> Filtrera kategori </template>
                            <option
                                v-for="option in categoryOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </f-select-field>
                    </div>
                </f-validation-form>

                <!-- Test cards -->
                <div class="grid grid--3 labb__cards">
                    <ServiceCard
                        v-for="test in filteredTests"
                        :key="test.name"
                        :title="test.name"
                        :description="test.description"
                        :tags="test.tags"
                    >
                        <div class="labb__test-meta">
                            <div class="labb__meta-row">
                                <span>Kategori:</span>
                                <f-badge>{{ test.category }}</f-badge>
                            </div>
                            <div class="labb__meta-row">
                                <span>Tid:</span>
                                <span class="labb__meta-value">{{ test.duration }}</span>
                            </div>
                            <div class="labb__meta-row">
                                <span>Pris:</span>
                                <span class="labb__meta-value">{{ test.price }}</span>
                            </div>
                            <div class="labb__meta-line">
                                <span class="labb__meta-label">Förberedelse:</span>
                                {{ test.preparation }}
                            </div>
                            <div v-if="test.fasting">
                                <f-badge status="warning"> Fasta krävs </f-badge>
                            </div>
                            <div class="labb__meta-line">
                                <span class="labb__meta-label">Tillgänglighet:</span>
                                {{ test.availability }}
                            </div>
                            <f-button
                                size="small"
                                variant="primary"
                                class="labb__book"
                                @click="handleBooking(test.name)"
                            >
                                Boka tid
                            </f-button>
                        </div>
                    </ServiceCard>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="labb__pagination">
                    <f-paginator v-model:current-page="currentPage" :number-of-pages="totalPages" />
                </div>
            </div>

            <!-- Preparation view -->
            <div v-else-if="activeTab === 'preparation'">
                <h2 class="labb__heading">Förberedelser inför provtagning</h2>
                <ul class="grid grid--2 stack-list labb__preparations">
                    <ListItem
                        v-for="instruction in preparationInstructions"
                        :key="instruction.title"
                        :title="instruction.title"
                        :description="instruction.description"
                        :icon="instruction.icon"
                    />
                </ul>

                <AlertMessage
                    type="warning"
                    title="Viktigt att tänka på"
                    message="Om du tar blodförtunnande medicin ska du alltid meddela detta innan provtagning. Vissa prover kan kräva att du pausar din medicinering."
                />
            </div>

            <!-- Results view -->
            <div v-else-if="activeTab === 'results'">
                <h2 class="labb__heading">Hämta dina provsvar</h2>
                <ul class="stack labb__results">
                    <li class="labb__result">
                        <ListItem
                            title="1177 Vårdguiden"
                            description="Logga in på 1177.se för att se dina provsvar. De flesta provsvar publiceras där inom 1-7 dagar."
                        >
                            <f-button size="small" variant="primary"> Gå till 1177 </f-button>
                        </ListItem>
                    </li>
                    <li class="labb__result">
                        <ListItem
                            title="Telefon"
                            description="Ring oss på 08-123 456 00 för att få dina provsvar per telefon. Ha ditt personnummer redo."
                        >
                            <f-badge status="info"> 08-123 456 00 </f-badge>
                        </ListItem>
                    </li>
                    <li class="labb__result">
                        <ListItem
                            title="Besök på mottagningen"
                            description="Du kan alltid hämta dina provsvar direkt på vår mottagning under öppettiderna."
                        >
                            <f-badge> Mån-fre: 8:00-16:00 </f-badge>
                        </ListItem>
                    </li>
                </ul>

                <AlertMessage
                    type="info"
                    title="Tid för provsvar"
                    message="Vanliga blodprover är klara inom 1-3 dagar. Mer komplexa prover kan ta upp till 2 veckor. Du får ett meddelande när dina provsvar är klara."
                />
            </div>
        </AppTabs>

        <!-- Booking modal -->
        <f-modal :is-open="showBookingModal" size="medium" @close="closeModal">
            <template #header> Boka tid för provtagning </template>
            <template #content>
                <div class="labb__wizard-notice">
                    <p>
                        Du bokar tid för:
                        <strong>{{ selectedTest }}</strong>
                    </p>
                </div>

                <f-validation-form class="labb__form">
                    <f-text-field
                        id="labb-patient-name"
                        v-model="patientName"
                        v-validation.required
                        :maxlength="100"
                    >
                        Fullständigt namn
                    </f-text-field>

                    <f-text-field
                        id="labb-patient-personnummer"
                        v-model="patientPersonnummer"
                        v-validation.required
                        :maxlength="13"
                    >
                        Personnummer
                    </f-text-field>

                    <f-text-field
                        id="labb-patient-phone"
                        v-model="patientPhone"
                        v-validation.required
                        :maxlength="20"
                    >
                        Telefonnummer
                    </f-text-field>

                    <f-select-field id="labb-time-slot" v-model="timeSlot" required>
                        <template #label> Önskad tid </template>
                        <option value="morning">Förmiddag (8:00-12:00)</option>
                        <option value="afternoon">Eftermiddag (12:00-16:00)</option>
                    </f-select-field>

                    <f-datepicker-field
                        v-model="preferredDate"
                        v-validation.minDate="{ minDate: { limit: today } }"
                    >
                        Önskat datum
                    </f-datepicker-field>
                </f-validation-form>
            </template>
            <template #footer>
                <div class="labb__modal-actions">
                    <f-button size="medium" variant="secondary" @click="closeModal">
                        Avbryt
                    </f-button>
                    <f-button size="medium" variant="primary" @click="requestSend">
                        Boka tid
                    </f-button>
                </div>
            </template>
        </f-modal>
    </div>
</template>

<style scoped lang="scss">
.labb__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.labb__alert {
    margin-bottom: 1.5rem;
}

.labb__success {
    margin-bottom: 1.5rem;
}

.labb__intro {
    margin: 0 0 1.5rem;
}

.labb__filter {
    margin-bottom: 1.5rem;
}

.labb__cards {
    margin-bottom: 2rem;
}

.labb__test-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.labb__meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.labb__meta-value {
    font-weight: 600;
}

.labb__meta-line {
    color: var(--fkds-color-text-secondary);
}

.labb__meta-label {
    font-weight: 600;
}

.labb__book {
    margin-top: 0.5rem;
    align-self: flex-start;
}

.labb__pagination {
    margin-top: 2rem;
}

.labb__heading {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.labb__preparations {
    margin-bottom: 1.5rem;
}

.labb__results {
    list-style: none;
    margin: 0 0 1.5rem;
    padding: 0;
}

.labb__result {
    :deep(.list-item__extra) {
        margin-top: 0.5rem;
    }
}

.labb__wizard-notice {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;
    margin-bottom: 1rem;

    p {
        margin: 0;
    }
}

.labb__modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}
</style>
