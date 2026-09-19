<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    FBadge,
    FButton,
    FConfirmModal,
    FEmailTextField,
    FModal,
    FPhoneTextField,
    FSelectField,
    FTextField,
    FTextareaField,
    FValidationForm
} from '@fkui/vue'
import AlertMessage from '@/components/display/AlertMessage.vue'
import ServiceCard from '@/components/display/ServiceCard.vue'
import ContactCard from '@/components/display/ContactCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import AppTabs from '@/components/interactive/AppTabs.vue'

// Home healthcare services (verbatim from the source site)
const homeCareServices = [
    {
        name: 'Sjukvård i hemmet',
        description:
            'Medicinsk behandling och omvårdnad i hemmet för patienter som inte kan ta sig till mottagningen',
        category: 'Sjukvård',
        duration: 'Efter behov',
        staff: 'Sjuksköterskor, undersköterskor',
        price: 'Gratis med beslut',
        tags: ['Medicinering', 'Omvårdnad', 'Injektioner'],
        availability: 'Dygnet runt vid behov'
    },
    {
        name: 'Rehabilitering i hemmet',
        description:
            'Fysioterapi och arbetsterapi i hemmet för att förbättra funktion och självständighet',
        category: 'Rehabilitering',
        duration: 'Enligt behandlingsplan',
        staff: 'Fysioterapeuter, arbetsterapeuter',
        price: 'Gratis med remiss',
        tags: ['Fysioterapi', 'Arbetsterapi', 'Träning'],
        availability: 'Vardagar 8:00-17:00'
    },
    {
        name: 'Palliativ vård',
        description:
            'Lindrande vård i livets slutskede för att ge bästa möjliga livskvalitet',
        category: 'Palliativ vård',
        duration: 'Kontinuerligt',
        staff: 'Specialutbildad personal',
        price: 'Gratis med beslut',
        tags: ['Lindrande vård', 'Livskvalitet', 'Stöd'],
        availability: 'Dygnet runt'
    },
    {
        name: 'Hjälp med grundläggande behov',
        description: 'Hjälp med personlig hygien, måltider och andra grundläggande behov',
        category: 'Omsorg',
        duration: 'Efter behov',
        staff: 'Undersköterskor, vårdassistenter',
        price: 'Gratis med beslut',
        tags: ['Personlig hygien', 'Måltider', 'Trygghet'],
        availability: 'Dygnet runt vid behov'
    },
    {
        name: 'Medicinska bedömningar',
        description: 'Läkare gör hembesök för medicinska bedömningar och behandling',
        category: 'Medicinsk bedömning',
        duration: '30-60 minuter',
        staff: 'Läkare',
        price: 'Gratis med remiss',
        tags: ['Läkarbesök', 'Bedömning', 'Behandling'],
        availability: 'Vardagar 8:00-17:00'
    },
    {
        name: 'Teknisk hjälpmedel',
        description: 'Utlåning och anpassning av hjälpmedel för att underlätta vardagen',
        category: 'Hjälpmedel',
        duration: 'Efter behov',
        staff: 'Hjälpmedelskonsulenter',
        price: 'Gratis med beslut',
        tags: ['Rullator', 'Kryckor', 'Anpassning'],
        availability: 'Vardagar 8:00-16:00'
    }
]

// Eligibility criteria
const eligibilityCriteria = [
    {
        title: 'Medicinska behov',
        description: 'Du har medicinska behov som kräver professionell vård i hemmet',
        icon: 'cross'
    },
    {
        title: 'Svårt att ta sig till mottagning',
        description: 'Din hälsa gör det svårt eller omöjligt att besöka vårdcentralen',
        icon: 'arrow-in-circle'
    },
    {
        title: 'Läkarintyg',
        description: 'Du behöver ett läkarintyg som styrker ditt behov av hemsjukvård',
        icon: 'file'
    },
    {
        title: 'Kommunalt beslut',
        description: 'Vissa insatser kräver beslut från kommunens biståndshandläggare',
        icon: 'success'
    }
]

// Staff members
const staffMembers = [
    {
        name: 'Anna Lindberg',
        role: 'Distriktssköterska, hemsjukvård',
        phone: '08-123 456 70',
        email: 'anna.lindberg@vardcentralen.se',
        specialization: 'Medicinsk behandling i hemmet'
    },
    {
        name: 'Erik Johansson',
        role: 'Fysioterapeut',
        phone: '08-123 456 71',
        email: 'erik.johansson@vardcentralen.se',
        specialization: 'Rehabilitering i hemmet'
    },
    {
        name: 'Maria Andersson',
        role: 'Arbetsterapeut',
        phone: '08-123 456 72',
        email: 'maria.andersson@vardcentralen.se',
        specialization: 'Hjälpmedel och anpassning'
    },
    {
        name: 'Lars Nilsson',
        role: 'Läkare, hemsjukvård',
        phone: '08-123 456 73',
        email: 'lars.nilsson@vardcentralen.se',
        specialization: 'Medicinska bedömningar i hemmet'
    }
]

// Tabs
const activeTab = ref('overview')
const tabs = [
    { id: 'overview', label: 'Översikt' },
    { id: 'eligibility', label: 'Behov & rättigheter' },
    { id: 'contact', label: 'Kontakta oss' }
]

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('')

const categoryOptions = [
    { value: '', label: 'Alla kategorier' },
    { value: 'sjukvard', label: 'Sjukvård' },
    { value: 'rehabilitering', label: 'Rehabilitering' },
    { value: 'omsorg', label: 'Omsorg' },
    { value: 'hjalpmedel', label: 'Hjälpmedel' }
]

const filteredServices = computed(() => {
    return homeCareServices.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory =
            !selectedCategory.value ||
            service.category.toLowerCase().includes(selectedCategory.value.toLowerCase())
        return matchesSearch && matchesCategory
    })
})

// Contact modal state
const showContactModal = ref(false)
const confirmOpen = ref(false)
const successMessage = ref('')
const selectedService = ref('')
const contactForm = ref({
    name: '',
    phone: '',
    email: '',
    message: '',
    service: ''
})

const handleContact = (serviceName: string) => {
    selectedService.value = serviceName
    contactForm.value.service = serviceName
    showContactModal.value = true
}

const closeModal = () => {
    showContactModal.value = false
    selectedService.value = ''
}

// The contact modal hands over to a confirm dialog before anything is sent;
// a success message replaces the source site's native alert.
const requestSend = () => {
    showContactModal.value = false
    confirmOpen.value = true
}

const onConfirmSend = () => {
    confirmOpen.value = false
    successMessage.value = `Kontaktformulär skickat för ${contactForm.value.service}`
    closeModal()
    contactForm.value = {
        name: '',
        phone: '',
        email: '',
        message: '',
        service: ''
    }
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
            class="hem__success"
        />

        <f-confirm-modal
            :is-open="confirmOpen"
            :buttons="[
                { label: 'Ja, skicka meddelandet', type: 'primary', event: 'confirm' },
                { label: 'Avbryt', type: 'secondary', event: 'dismiss' }
            ]"
            @confirm="onConfirmSend"
            @close="confirmOpen = false"
        >
            <template #heading> Skicka meddelande? </template>
            <template #content>
                <p>Du skickar ett kontaktformulär gällande {{ contactForm.service }}.</p>
            </template>
        </f-confirm-modal>

        <h1 class="hem__title">Hemsjukvård</h1>

        <!-- Alert for important information -->
        <AlertMessage
            type="info"
            title="Professionell vård i ditt hem"
            heading-level="h2"
            message="Vi erbjuder medicinskt och omvårdnadande insatser i hemmet för dig som har svårt att ta dig till vår mottagning. All personal är utbildad och har tystnadsplikt."
            class="hem__alert"
        />

        <!-- Tabs for different views -->
        <AppTabs v-model="activeTab" :tabs="tabs" class="hem__tabs">
            <!-- Overview -->
            <div v-if="activeTab === 'overview'">
                <!-- Search and filter section -->
                <f-validation-form class="hem__filter">
                    <div class="grid grid--2">
                        <f-text-field id="hem-search" v-model="searchQuery" :maxlength="100">
                            Sök tjänst
                        </f-text-field>
                        <f-select-field id="hem-category" v-model="selectedCategory">
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

                <p class="hem__intro">
                    Vår hemsjukvård erbjuder professionell vård och behandling i ditt hem. Vi
                    arbetar för att du ska kunna få den vård du behöver med bibehållen
                    självständighet och livskvalitet.
                </p>

                <!-- Service cards -->
                <div class="grid grid--3 hem__cards">
                    <ServiceCard
                        v-for="service in filteredServices"
                        :key="service.name"
                        :title="service.name"
                        :description="service.description"
                        :tags="service.tags"
                    >
                        <div class="hem__service-meta">
                            <div class="hem__meta-row">
                                <span>Kategori:</span>
                                <f-badge>{{ service.category }}</f-badge>
                            </div>
                            <div class="hem__meta-line">
                                <span class="hem__meta-label">Personal:</span>
                                {{ service.staff }}
                            </div>
                            <div class="hem__meta-row">
                                <span>Pris:</span>
                                <span class="hem__meta-value">{{ service.price }}</span>
                            </div>
                            <div class="hem__meta-line">
                                <span class="hem__meta-label">Tillgänglighet:</span>
                                {{ service.availability }}
                            </div>
                            <f-button
                                size="small"
                                variant="primary"
                                class="hem__contact"
                                @click="handleContact(service.name)"
                            >
                                Kontakta oss
                            </f-button>
                        </div>
                    </ServiceCard>
                </div>
            </div>

            <!-- Eligibility view -->
            <div v-else-if="activeTab === 'eligibility'">
                <h2 class="hem__heading">Behov & rättigheter</h2>
                <ul class="grid grid--2 stack-list hem__criteria">
                    <ListItem
                        v-for="criteria in eligibilityCriteria"
                        :key="criteria.title"
                        :title="criteria.title"
                        :description="criteria.description"
                        :icon="criteria.icon"
                    />
                </ul>

                <AlertMessage
                    type="warning"
                    title="Så ansöker du"
                    message="Kontakta din distriktssköterska eller läkare för att göra en behovsbedömning. Vissa insatser kräver även beslut från kommunen."
                    class="hem__section"
                />

                <div class="hem__cost">
                    <h3>Vad kostar hemsjukvård?</h3>
                    <p>
                        För de flesta medicinska insatser gäller högkostnadsskyddet precis som vid
                        besök på vårdcentralen. Vissa omsorgsinsatser kan vara avgiftsbelagda
                        baserat på inkomst.
                    </p>
                    <p>
                        <strong>Maxavgift:</strong>
                        För medicinsk hemsjukvård gäller samma maxavgift som för övrig sjukvård,
                        för närvarande 1 150 kr per år.
                    </p>
                </div>
            </div>

            <!-- Contact view -->
            <div v-else-if="activeTab === 'contact'">
                <h2 class="hem__heading">Kontakta oss</h2>
                <div class="grid grid--2 hem__staff">
                    <ContactCard
                        v-for="staff in staffMembers"
                        :key="staff.name"
                        :name="staff.name"
                        :role="staff.role"
                        :phone="staff.phone"
                        :email="staff.email"
                    >
                        <p class="hem__specialization">
                            <span class="hem__meta-label">Specialisering:</span>
                            {{ staff.specialization }}
                        </p>
                    </ContactCard>
                </div>

                <div class="hem__acute">
                    <h3>Akut hemsjukvård</h3>
                    <p>
                        För akut hemsjukvård utanför ordinarie arbetstid, ring vår akutmottagning
                        på 08-123 456 80.
                    </p>
                    <p>Vid livshotande tillstånd, ring alltid 112.</p>
                </div>
            </div>
        </AppTabs>

        <!-- Contact modal -->
        <f-modal :is-open="showContactModal" size="medium" @close="closeModal">
            <template #header> Kontakta oss om hemsjukvård </template>
            <template #content>
                <div class="hem__modal-notice">
                    <p>
                        Du kontaktar oss gällande:
                        <strong>{{ selectedService }}</strong>
                    </p>
                </div>

                <f-validation-form class="hem__form">
                    <f-text-field
                        id="hem-contact-name"
                        v-model="contactForm.name"
                        v-validation.required
                        :maxlength="100"
                    >
                        Ditt namn
                    </f-text-field>

                    <f-phone-text-field
                        id="hem-contact-phone"
                        v-model="contactForm.phone"
                        v-validation.required
                    >
                        Telefonnummer
                    </f-phone-text-field>

                    <f-email-text-field id="hem-contact-email" v-model="contactForm.email">
                        E-postadress
                    </f-email-text-field>

                    <f-select-field id="hem-contact-service" v-model="contactForm.service" required>
                        <template #label> Tjänst </template>
                        <option v-for="service in homeCareServices" :key="service.name" :value="service.name">
                            {{ service.name }}
                        </option>
                    </f-select-field>

                    <f-textarea-field id="hem-contact-message" v-model="contactForm.message" :maxlength="1000">
                        Meddelande
                    </f-textarea-field>
                </f-validation-form>
            </template>
            <template #footer>
                <div class="hem__modal-actions">
                    <f-button size="medium" variant="secondary" @click="closeModal">
                        Avbryt
                    </f-button>
                    <f-button size="medium" variant="primary" @click="requestSend">
                        Skicka meddelande
                    </f-button>
                </div>
            </template>
        </f-modal>
    </div>
</template>

<style scoped lang="scss">
.hem__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.hem__alert {
    margin-bottom: 1.5rem;
}

.hem__success {
    margin-bottom: 1.5rem;
}

.hem__filter {
    margin-bottom: 1.5rem;
}

.hem__intro {
    margin: 0 0 1.5rem;
}

.hem__cards {
    margin-bottom: 2rem;
}

.hem__service-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.hem__meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.hem__meta-value {
    font-weight: 600;
}

.hem__meta-line {
    color: var(--fkds-color-text-secondary);
}

.hem__meta-label {
    font-weight: 600;
}

.hem__contact {
    margin-top: 0.5rem;
    align-self: flex-start;
}

.hem__heading {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.hem__criteria {
    margin-bottom: 1.5rem;
}

.hem__section {
    margin-bottom: 1.5rem;
}

.hem__cost {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-background-secondary);
    padding: 1rem;

    h3 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
    }

    p {
        margin: 0 0 0.75rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.hem__staff {
    margin-bottom: 1.5rem;
}

.hem__specialization {
    margin: 0;
    font-size: 0.875rem;
}

.hem__acute {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;

    h3 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
    }

    p {
        margin: 0 0 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.hem__modal-notice {
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;
    margin-bottom: 1rem;

    p {
        margin: 0;
    }
}

.hem__modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}
</style>
