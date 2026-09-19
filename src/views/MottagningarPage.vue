<script setup lang="ts">
import { ref } from 'vue'
import {
    FBadge,
    FButton,
    FDataTable,
    FModal,
    FPhoneTextField,
    FSelectField,
    FTableColumn,
    FTableColumnType,
    FTextField,
    FValidationForm
} from '@fkui/vue'
import AlertMessage from '@/components/display/AlertMessage.vue'
import ServiceCard from '@/components/display/ServiceCard.vue'
import ContactCard from '@/components/display/ContactCard.vue'
import AppTabs from '@/components/interactive/AppTabs.vue'

// Clinic data (verbatim from the source site)
const clinics = [
    {
        name: 'Allmänmedicin',
        description: 'Vårdcentral för allmän sjukvård',
        hours: 'Mån-fre: 8:00-17:00',
        phone: '08-123 456 78',
        details: 'Allmän medicinsk vård för vuxna och barn',
        tags: ['Vårdcentral', 'Vuxna', 'Barn'],
        status: 'Öppet',
        waitTime: '15 min'
    },
    {
        name: 'Barnmottagning',
        description: 'Specialiserad vård för barn',
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 79',
        details: 'Medicinsk vård för barn 0-18 år',
        tags: ['Barnvård', 'BVC'],
        status: 'Öppet',
        waitTime: '20 min'
    },
    {
        name: 'Akutmottagning',
        description: 'Akut vård dygnet runt',
        hours: 'Dygnet runt',
        phone: '08-123 456 80',
        details: 'Akut medicinsk vård vid allvarliga sjukdomar och skador',
        tags: ['Akut', 'Dygnet runt'],
        status: 'Öppet',
        waitTime: '45 min'
    },
    {
        name: 'Specialistmottagningar',
        description: 'Specialiserad vård inom olika områden',
        hours: 'Mån-fre: 8:00-17:00',
        phone: '08-123 456 81',
        details: 'Specialiserad vård inom olika medicinska områden',
        tags: ['Specialistvård'],
        status: 'Öppet',
        waitTime: '30 min'
    },
    {
        name: 'Kirurgmottagning',
        description: 'Kirurgisk vård och behandling',
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 82',
        details: 'Utredning och behandling av kirurgiska tillstånd',
        tags: ['Kirurgi'],
        status: 'Stängt',
        waitTime: '-'
    },
    {
        name: 'Medicinmottagning',
        description: 'Internmedicinsk specialistvård',
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 83',
        details: 'Specialiserad vård inom internmedicin',
        tags: ['Internmedicin'],
        status: 'Öppet',
        waitTime: '25 min'
    },
    {
        name: 'Ortopedmottagning',
        description: 'Vård för rörelseorganens sjukdomar',
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 84',
        details: 'Utredning och behandling av ortopediska tillstånd',
        tags: ['Ortopedi'],
        status: 'Öppet',
        waitTime: '40 min'
    },
    {
        name: 'Gynmottagning',
        description: 'Kvinnosjukvård och förlossning',
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 85',
        details: 'Gynekologisk vård och mödrahälsovård',
        tags: ['Gynekologi', 'Mödrahälsovård'],
        status: 'Öppet',
        waitTime: '35 min'
    },
    {
        name: 'Öron-näsa-hals',
        description: 'Specialiserad vård för öron, näsa och hals',
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 86',
        details: 'Utredning och behandling av öron-, näs- och halssjukdomar',
        tags: ['ÖNH'],
        status: 'Öppet',
        waitTime: '30 min'
    },
    {
        name: 'Ögonmottagning',
        description: 'Ögonsjukvård och synundersökningar',
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 87',
        details: 'Utredning och behandling av ögonsjukdomar',
        tags: ['Oftalmologi'],
        status: 'Öppet',
        waitTime: '50 min'
    },
    {
        name: 'Hudmottagning',
        description: 'Dermatologisk vård och behandling',
        hours: 'Mån-fre: 8:00-16:00',
        phone: '08-123 456 88',
        details: 'Utredning och behandling av hudsjukdomar',
        tags: ['Dermatologi'],
        status: 'Öppet',
        waitTime: '60 min'
    },
    {
        name: 'Neurologmottagning',
        description: 'Nervsystemets sjukdomar',
        hours: 'Mån-fre: 8:00-16:30',
        phone: '08-123 456 89',
        details: 'Utredning och behandling av neurologiska sjukdomar',
        tags: ['Neurologi'],
        status: 'Öppet',
        waitTime: '45 min'
    }
]

// Wait-time table rows (live wait-times view)
const waitTimeRows = clinics.map((clinic) => ({
    id: clinic.name,
    name: clinic.name,
    waitTime: clinic.waitTime,
    status: clinic.status,
    hours: clinic.hours
}))

// Tabs
const activeTab = ref('overview')
const tabs = [
    { id: 'overview', label: 'Översikt' },
    { id: 'waiting-times', label: 'Väntetider' },
    { id: 'contact', label: 'Kontakt' }
]

// Booking modal state
const showBookingModal = ref(false)
const selectedClinic = ref('')
const patientName = ref('')
const patientPhone = ref('')
const appointmentType = ref('')

const handleBooking = (clinicName: string) => {
    selectedClinic.value = clinicName
    showBookingModal.value = true
}

const closeModal = () => {
    showBookingModal.value = false
    selectedClinic.value = ''
}

const submitBooking = () => {
    // In a real app, this would submit to a backend
    window.alert(`Bokning skickad för ${selectedClinic.value}`)
    closeModal()
}
</script>

<template>
    <div class="page">
        <h1 class="mott__title">Mottagningar</h1>

        <!-- Alert for important information -->
        <AlertMessage
            type="info"
            title="Viktig information"
            heading-level="h2"
            message="För akuta livshotande tillstånd, ring alltid 112. För akut men inte livshotande sjukdomar eller skador, kontakta vår akutmottagning eller ring 1177 för sjukvårdsrådgivning."
            class="mott__alert"
        />

        <!-- Tabs for different views -->
        <AppTabs v-model="activeTab" :tabs="tabs" class="mott__tabs">
            <!-- Overview -->
            <div v-if="activeTab === 'overview'">
                <p class="mott__intro">
                    Här hittar du information om våra olika mottagningar och kliniker. Vi erbjuder
                    specialistvård inom de flesta medicinska områden med erfarna läkare och
                    sjuksköterskor.
                </p>

                <div class="grid grid--3 mott__cards">
                    <ServiceCard
                        v-for="clinic in clinics"
                        :key="clinic.name"
                        :title="clinic.name"
                        :description="clinic.description"
                        :tags="clinic.tags"
                    >
                        <div class="mott__clinic-meta">
                            <div class="mott__meta-row">
                                <span>Status:</span>
                                <f-badge :status="clinic.status === 'Öppet' ? 'success' : undefined">
                                    {{ clinic.status }}
                                </f-badge>
                            </div>
                            <div class="mott__meta-row">
                                <span>Väntetid:</span>
                                <span class="mott__meta-value">{{ clinic.waitTime }}</span>
                            </div>
                            <div class="mott__meta-line">
                                <span class="mott__meta-label">Öppettider:</span>
                                {{ clinic.hours }}
                            </div>
                            <div class="mott__meta-line">
                                <span class="mott__meta-label">Telefon:</span>
                                {{ clinic.phone }}
                            </div>
                            <f-button
                                size="small"
                                variant="primary"
                                class="mott__book"
                                @click="handleBooking(clinic.name)"
                            >
                                Boka tid
                            </f-button>
                        </div>
                    </ServiceCard>
                </div>
            </div>

            <!-- Waiting times view -->
            <div v-else-if="activeTab === 'waiting-times'">
                <h2 class="mott__heading">Aktuella väntetider</h2>
                <f-data-table :rows="waitTimeRows" key-attribute="id">
                    <template #caption> Väntetider per mottagning </template>
                    <template #default="{ row }">
                        <f-table-column title="Mottagning" row-header :type="FTableColumnType.TEXT">
                            {{ row.name }}
                        </f-table-column>
                        <f-table-column title="Väntetid" :type="FTableColumnType.TEXT">
                            {{ row.waitTime }}
                        </f-table-column>
                        <f-table-column title="Status" :type="FTableColumnType.TEXT">
                            {{ row.status }}
                        </f-table-column>
                        <f-table-column title="Öppettider" :type="FTableColumnType.TEXT" expand>
                            {{ row.hours }}
                        </f-table-column>
                    </template>
                </f-data-table>
            </div>

            <!-- Contact view -->
            <div v-else-if="activeTab === 'contact'">
                <h2 class="mott__heading">Kontaktinformation</h2>
                <p class="mott__table-note">Alla mottagningar ligger på adressen Vårdcentralen, 123 45 Stockholm.</p>
                <div class="grid grid--3 mott__contacts">
                    <ContactCard
                        v-for="clinic in clinics.slice(0, 6)"
                        :key="clinic.name"
                        :title="clinic.name"
                        :phone="clinic.phone"
                        address="Vårdcentralen, 123 45 Stockholm"
                    >
                        <p class="mott__contact-details">{{ clinic.details }}</p>
                        <p class="mott__contact-hours">
                            <span class="mott__meta-label">Öppettider:</span>
                            {{ clinic.hours }}
                        </p>
                    </ContactCard>
                </div>
            </div>
        </AppTabs>

        <!-- Booking modal -->
        <f-modal :is-open="showBookingModal" size="medium" @close="closeModal">
            <template #header> Boka tid </template>
            <template #content>
                <div class="mott__modal-notice">
                    <p>
                        Du bokar tid för:
                        <strong>{{ selectedClinic }}</strong>
                    </p>
                </div>

                <f-validation-form class="mott__form">
                    <f-text-field id="mott-patient-name" v-model="patientName" v-validation.required :maxlength="100">
                        Namn
                    </f-text-field>

                    <f-phone-text-field id="mott-patient-phone" v-model="patientPhone" v-validation.required>
                        Telefonnummer
                    </f-phone-text-field>

                    <f-select-field id="mott-appointment-type" v-model="appointmentType" required>
                        <template #label> Typ av besök </template>
                        <option value="regular">Vanligt besök</option>
                        <option value="follow-up">Uppföljning</option>
                        <option value="urgent">Akut</option>
                    </f-select-field>
                </f-validation-form>
            </template>
            <template #footer>
                <div class="mott__modal-actions">
                    <f-button size="medium" variant="secondary" @click="closeModal"> Avbryt </f-button>
                    <f-button size="medium" variant="primary" @click="submitBooking"> Boka tid </f-button>
                </div>
            </template>
        </f-modal>
    </div>
</template>

<style scoped lang="scss">
.mott__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.mott__alert {
    margin-bottom: 1.5rem;
}

.mott__intro {
    margin: 0 0 1.5rem;
}

.mott__cards {
    margin-bottom: 2rem;
}

.mott__clinic-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.mott__meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.mott__meta-value {
    font-weight: 600;
}

.mott__meta-line {
    color: var(--fkds-color-text-secondary);
}

.mott__meta-label {
    font-weight: 600;
}

.mott__book {
    margin-top: 0.5rem;
    align-self: flex-start;
}

.mott__heading {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.mott__table-note {
    margin: 0 0 1rem;
    color: var(--fkds-color-text-secondary);
}

.mott__contacts {
    margin-bottom: 2rem;
}

.mott__contact-details {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
}

.mott__contact-hours {
    margin: 0;
    font-size: 0.875rem;
}

.mott__modal-notice {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;
    margin-bottom: 1rem;

    p {
        margin: 0;
    }
}

.mott__modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}
</style>
