<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    FBadge,
    FButton,
    FConfirmModal,
    FDataTable,
    FModal,
    FSelectField,
    FTableColumn,
    FTableColumnType,
    FTextField,
    FValidationForm
} from '@fkui/vue'
import AlertMessage from '@/components/display/AlertMessage.vue'
import ServiceCard from '@/components/display/ServiceCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import ProgressIndicator from '@/components/display/ProgressIndicator.vue'
import AppTabs from '@/components/interactive/AppTabs.vue'

// Specialist clinic data (verbatim from the source site)
const specialistClinics = [
    {
        name: 'Kardiologimottagning',
        description: 'Hjärt- och kärlsjukdomar',
        specialists: ['Dr. Anna Andersson', 'Dr. Erik Bergman'],
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 90',
        waitTime: '3 veckor',
        tags: ['Hjärta', 'Kärl', 'EKG'],
        status: 'Tar emot nya patienter',
        requiresReferral: true
    },
    {
        name: 'Endokrinologimottagning',
        description: 'Hormon- och ämnesomsättningsjukdomar',
        specialists: ['Dr. Maria Larsson', 'Dr. Johan Nilsson'],
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 91',
        waitTime: '4 veckor',
        tags: ['Diabetes', 'Sköldkörtel', 'Hormoner'],
        status: 'Tar emot nya patienter',
        requiresReferral: true
    },
    {
        name: 'Gastroenterologimottagning',
        description: 'Mag- och tarmsjukdomar',
        specialists: ['Dr. Sofia Pettersson', 'Dr. Magnus Johansson'],
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 92',
        waitTime: '5 veckor',
        tags: ['Magsjukdomar', 'Tarmsjukdomar', 'Endoskopi'],
        status: 'Fullbokad',
        requiresReferral: true
    },
    {
        name: 'Reumatologimottagning',
        description: 'Led- och bindvävssjukdomar',
        specialists: ['Dr. Lisa Svensson', 'Dr. Peter Karlsson'],
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 93',
        waitTime: '6 veckor',
        tags: ['Reumatism', 'Ledvärk', 'Autoimmuna sjukdomar'],
        status: 'Tar emot nya patienter',
        requiresReferral: true
    },
    {
        name: 'Pulmonologimottagning',
        description: 'Lungsjukdomar och andningsproblem',
        specialists: ['Dr. Emma Gustafsson', 'Dr. Robert Lindberg'],
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 94',
        waitTime: '3 veckor',
        tags: ['Astma', 'KOL', 'Allergi'],
        status: 'Tar emot nya patienter',
        requiresReferral: true
    },
    {
        name: 'Nefrologimottagning',
        description: 'Njur- och urinvägssjukdomar',
        specialists: ['Dr. Helena Hedberg', 'Dr. Fredrik Sandberg'],
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 95',
        waitTime: '4 veckor',
        tags: ['Njurar', 'Dialys', 'Högt blodtryck'],
        status: 'Tar emot nya patienter',
        requiresReferral: true
    }
]

// Table rows for the specialists view
const specialistRows = specialistClinics.map((clinic) => ({
    id: clinic.name,
    name: clinic.name,
    specialist: clinic.specialists.join(', '),
    area: clinic.description,
    hours: clinic.hours,
    phone: clinic.phone,
    tags: clinic.tags.join(', ')
}))

// Tabs
const activeTab = ref('overview')
const tabs = [
    { id: 'overview', label: 'Översikt' },
    { id: 'specialists', label: 'Specialister' },
    { id: 'referral', label: 'Remiss' }
]

// Search and filter state
const searchQuery = ref('')
const selectedSpecialty = ref('')

const specialtyOptions = [
    { value: '', label: 'Alla specialiteter' },
    { value: 'kardiologi', label: 'Kardiologi' },
    { value: 'endokrinologi', label: 'Endokrinologi' },
    { value: 'gastroenterologi', label: 'Gastroenterologi' },
    { value: 'reumatologi', label: 'Reumatologi' },
    { value: 'pulmonologi', label: 'Pulmonologi' },
    { value: 'nefrologi', label: 'Nefrologi' }
]

// Filter clinics based on search and specialty
const filteredClinics = computed(() => {
    return specialistClinics.filter((clinic) => {
        const matchesSearch =
            clinic.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            clinic.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesSpecialty =
            !selectedSpecialty.value ||
            clinic.name.toLowerCase().includes(selectedSpecialty.value.toLowerCase())
        return matchesSearch && matchesSpecialty
    })
})

// Referral application wizard
const showBookingModal = ref(false)
const confirmOpen = ref(false)
const successMessage = ref('')
const selectedClinic = ref('')
const bookingStep = ref(1)
const bookingSteps = ['Välj mottagning', 'Personuppgifter', 'Symptom', 'Bekräfta']

const referralReason = ref('')
const patientName = ref('')
const patientPersonnummer = ref('')
const patientPhone = ref('')
const symptoms = ref('')
const medications = ref('')
const allergies = ref('')

const handleBooking = (clinicName: string) => {
    selectedClinic.value = clinicName
    bookingStep.value = 1
    showBookingModal.value = true
}

const closeModal = () => {
    showBookingModal.value = false
    selectedClinic.value = ''
    bookingStep.value = 1
}

// The wizard hands over to a confirm dialog before anything is sent; a
// success message replaces the source site's native alert.
const requestSend = () => {
    showBookingModal.value = false
    confirmOpen.value = true
}

const onConfirmSend = () => {
    confirmOpen.value = false
    successMessage.value = `Remissansökan skickad för ${selectedClinic.value}`
    closeModal()
    referralReason.value = ''
    patientName.value = ''
    patientPersonnummer.value = ''
    patientPhone.value = ''
    symptoms.value = ''
    medications.value = ''
    allergies.value = ''
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
            class="specialist__success"
        />

        <f-confirm-modal
            :is-open="confirmOpen"
            :buttons="[
                { label: 'Ja, skicka ansökan', type: 'primary', event: 'confirm' },
                { label: 'Avbryt', type: 'secondary', event: 'dismiss' }
            ]"
            @confirm="onConfirmSend"
            @close="confirmOpen = false"
        >
            <template #heading> Skicka ansökan? </template>
            <template #content>
                <p>Du skickar en remissansökan för {{ selectedClinic }}.</p>
            </template>
        </f-confirm-modal>

        <h1 class="specialist__title">Specialistmottagningar</h1>

        <!-- Alert for referral information -->
        <AlertMessage
            type="info"
            title="Remiss krävs"
            heading-level="h2"
            message="För att besöka våra specialistmottagningar krävs i de flesta fall remiss från din vårdcentral eller annan läkare. Vissa akuta fall kan undantas."
            class="specialist__alert"
        />

        <!-- Tabs for different views -->
        <AppTabs v-model="activeTab" :tabs="tabs" class="specialist__tabs">
            <!-- Overview -->
            <div v-if="activeTab === 'overview'" class="specialist__pane">
                <p class="specialist__intro">
                    Våra specialistmottagningar erbjuder avancerad medicinsk vård inom olika
                    områden. Alla våra specialister är erfarna och uppdaterade med den senaste
                    kunskapen inom sina fält.
                </p>

                <!-- Search and filter section -->
                <f-validation-form class="specialist__filter">
                    <div class="grid grid--2">
                        <f-text-field
                            id="specialist-search"
                            v-model="searchQuery"
                            :maxlength="100"
                        >
                            Sök specialistmottagning
                        </f-text-field>
                        <f-select-field id="specialist-specialty" v-model="selectedSpecialty">
                            <template #label> Filtrera specialitet </template>
                            <option
                                v-for="option in specialtyOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </f-select-field>
                    </div>
                </f-validation-form>

                <!-- Clinic cards -->
                <div class="grid grid--3 specialist__cards">
                    <ServiceCard
                        v-for="clinic in filteredClinics"
                        :key="clinic.name"
                        :title="clinic.name"
                        :description="clinic.description"
                        :tags="clinic.tags"
                    >
                        <div class="specialist__clinic-meta">
                            <div class="specialist__meta-row">
                                <span>Status:</span>
                                <f-badge
                                    :status="
                                        clinic.status.includes('Tar emot') ? 'success' : undefined
                                    "
                                >
                                    {{ clinic.status }}
                                </f-badge>
                            </div>
                            <div class="specialist__meta-row">
                                <span>Väntetid:</span>
                                <span class="specialist__meta-value">{{ clinic.waitTime }}</span>
                            </div>
                            <div class="specialist__meta-line">
                                <span class="specialist__meta-label">Öppettider:</span>
                                {{ clinic.hours }}
                            </div>
                            <div class="specialist__meta-line">
                                <span class="specialist__meta-label">Telefon:</span>
                                {{ clinic.phone }}
                            </div>
                            <div class="specialist__meta-line">
                                <span class="specialist__meta-label">Specialister:</span>
                                <div class="specialist__meta-specialists">
                                    <f-badge
                                        v-for="specialist in clinic.specialists"
                                        :key="specialist"
                                        status="info"
                                        class="specialist__specialist-badge"
                                    >
                                        {{ specialist }}
                                    </f-badge>
                                </div>
                            </div>
                            <div v-if="clinic.requiresReferral" class="specialist__meta-row">
                                <f-badge status="warning"> Remiss krävs </f-badge>
                            </div>
                            <f-button
                                size="small"
                                variant="primary"
                                class="specialist__apply"
                                @click="handleBooking(clinic.name)"
                            >
                                Ansök om remiss
                            </f-button>
                        </div>
                    </ServiceCard>
                </div>
            </div>

            <!-- Specialists view -->
            <div v-else-if="activeTab === 'specialists'" class="specialist__pane">
                <h2 class="specialist__heading">Våra specialister</h2>
                <p class="specialist__table-note">
                    Alla mottagningar ligger på adressen Specialistmottagningen, 123 45 Stockholm.
                </p>
                <f-data-table :rows="specialistRows" key-attribute="id">
                    <template #caption>
                        Specialister per specialistmottagning
                    </template>
                    <template #default="{ row }">
                        <f-table-column title="Mottagning" row-header :type="FTableColumnType.TEXT">
                            {{ row.name }}
                        </f-table-column>
                        <f-table-column title="Specialist" :type="FTableColumnType.TEXT">
                            {{ row.specialist }}
                        </f-table-column>
                        <f-table-column title="Område" :type="FTableColumnType.TEXT" expand>
                            {{ row.area }}
                        </f-table-column>
                        <f-table-column title="Fokusområden" :type="FTableColumnType.TEXT">
                            {{ row.tags }}
                        </f-table-column>
                        <f-table-column title="Öppettider" :type="FTableColumnType.TEXT">
                            {{ row.hours }}
                        </f-table-column>
                        <f-table-column title="Telefon" :type="FTableColumnType.TEXT">
                            {{ row.phone }}
                        </f-table-column>
                    </template>
                </f-data-table>
            </div>

            <!-- Referral view -->
            <div v-else-if="activeTab === 'referral'" class="specialist__pane">
                <h2 class="specialist__heading">Remissinformation</h2>
                <ul class="stack specialist__referral-list">
                    <ListItem
                        title="Hur får jag en remiss?"
                        description="Kontakta din vårdcentral för att få en remiss till specialistmottagning. Din läkare bedömer om du behöver specialistvård."
                    />
                    <ListItem
                        title="Vad kostar en remiss?"
                        description="Remissen själv kostar ingenting, men besöket hos specialisten omfattas av vanlig patientavgift."
                    />
                    <ListItem
                        title="Hur lång tid tar det?"
                        description="Väntetiden varierar mellan olika specialiteter. Se översikten för aktuell väntetid."
                    />
                    <ListItem
                        title="Akuta fall"
                        description="Vid akuta tillstånd kan du kontakta 1177 för rådgivning om du behöver söka akut specialistvård."
                    />
                </ul>

                <AlertMessage
                    type="warning"
                    title="Viktigt att veta"
                    message="En remiss är giltig i 6 månader från utfärdandedatum. Kontakta mottagningen om din remiss närmar sig utgångsdatum."
                />
            </div>
        </AppTabs>

        <!-- Referral modal -->
        <f-modal :is-open="showBookingModal" size="large" @close="closeModal">
            <template #header> Ansök om remiss </template>
            <template #content>
                <ProgressIndicator :steps="bookingSteps" :current-step="bookingStep - 1" />

                <f-validation-form class="specialist__wizard">
                    <div v-if="bookingStep === 1" class="stack--tight specialist__wizard-step">
                        <div class="specialist__wizard-notice">
                            <p>
                                Du ansöker om remiss till:
                                <strong>{{ selectedClinic }}</strong>
                            </p>
                        </div>

                        <f-select-field id="referral-reason" v-model="referralReason" required>
                            <template #label> Anledning till remiss </template>
                            <option value="new-symptoms">Nya symptom</option>
                            <option value="follow-up">Uppföljning av tidigare behandling</option>
                            <option value="second-opinion">Andrahandsutlåtande</option>
                            <option value="other">Annat</option>
                        </f-select-field>
                    </div>

                    <div v-else-if="bookingStep === 2" class="stack--tight specialist__wizard-step">
                        <f-text-field id="patient-name" v-model="patientName" v-validation.required :maxlength="100">
                            Fullständigt namn
                        </f-text-field>

                        <f-text-field
                            id="patient-personnummer"
                            v-model="patientPersonnummer"
                            v-validation.required
                            :maxlength="13"
                        >
                            Personnummer
                        </f-text-field>

                        <f-text-field
                            id="patient-phone"
                            v-model="patientPhone"
                            v-validation.required
                            :maxlength="20"
                        >
                            Telefonnummer
                        </f-text-field>
                    </div>

                    <div v-else-if="bookingStep === 3" class="stack--tight specialist__wizard-step">
                        <f-text-field id="symptoms" v-model="symptoms" v-validation.required :maxlength="500">
                            Beskriv dina symptom
                        </f-text-field>

                        <f-text-field id="medications" v-model="medications" :maxlength="500">
                            Nuvarande medicinering
                        </f-text-field>

                        <f-text-field id="allergies" v-model="allergies" :maxlength="500">
                            Kända allergier
                        </f-text-field>
                    </div>

                    <div v-else-if="bookingStep === 4" class="stack--tight specialist__wizard-step">
                        <div class="specialist__wizard-review">
                            <h3>Granska din ansökan</h3>
                            <p>
                                Kontrollera att all information är korrekt innan du skickar din
                                ansökan.
                            </p>
                        </div>

                        <div class="specialist__wizard-summary">
                            <p>
                                <strong>Mottagning:</strong>
                                {{ selectedClinic }}
                                <br />
                                <strong>Anledning:</strong>
                                Remiss för specialistvård
                                <br />
                                <strong>Personuppgifter:</strong>
                                [Dina uppgifter]
                                <br />
                                <strong>Symptom:</strong>
                                [Dina symptom]
                            </p>
                        </div>
                    </div>
                </f-validation-form>
            </template>
            <template #footer>
                <div class="specialist__wizard-actions">
                    <div>
                        <f-button
                            v-if="bookingStep > 1"
                            size="medium"
                            variant="secondary"
                            @click="bookingStep--"
                        >
                            Föregående
                        </f-button>
                    </div>
                    <div class="specialist__wizard-actions-right">
                        <f-button size="medium" variant="secondary" @click="closeModal">
                            Avbryt
                        </f-button>
                        <f-button
                            v-if="bookingStep < 4"
                            size="medium"
                            variant="primary"
                            @click="bookingStep++"
                        >
                            Nästa
                        </f-button>
                        <f-button v-else size="medium" variant="primary" @click="requestSend">
                            Skicka ansökan
                        </f-button>
                    </div>
                </div>
            </template>
        </f-modal>
    </div>
</template>

<style scoped lang="scss">
.specialist__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.specialist__alert {
    margin-bottom: 1.5rem;
}

.specialist__success {
    margin-bottom: 1.5rem;
}

.specialist__intro {
    margin: 0 0 1.5rem;
}

.specialist__filter {
    margin-bottom: 1.5rem;
}

.specialist__cards {
    margin-bottom: 2rem;
}

.specialist__clinic-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.specialist__meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.specialist__meta-value {
    font-weight: 600;
}

.specialist__meta-line {
    color: var(--fkds-color-text-secondary);
}

.specialist__meta-label {
    font-weight: 600;
}

.specialist__meta-specialists {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: 0.25rem;
}

.specialist__apply {
    margin-top: 0.5rem;
    align-self: flex-start;
}

.specialist__heading {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.specialist__table-note {
    margin: 0 0 1rem;
    color: var(--fkds-color-text-secondary);
}

.specialist__referral-list {
    margin-bottom: 1.5rem;
}

.specialist__wizard-notice {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;

    p {
        margin: 0;
    }
}

.specialist__wizard-review {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-feedback-background-positive);
    padding: 1rem;

    h3 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
    }

    p {
        margin: 0;
    }
}

.specialist__wizard-summary {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-background-secondary);
    padding: 1rem;

    p {
        margin: 0;
    }
}

.specialist__wizard-actions {
    display: flex;
    justify-content: space-between;
}

.specialist__wizard-actions-right {
    display: flex;
    gap: 0.75rem;
}
</style>
