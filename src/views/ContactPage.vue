<script setup lang="ts">
import { ref } from 'vue'
import {
    FButton,
    FEmailTextField,
    FPhoneTextField,
    FTextareaField,
    FTextField,
    FValidationForm,
    FMessageBox
} from '@fkui/vue'
import AppCard from '@/components/display/AppCard.vue'
import AlertMessage from '@/components/display/AlertMessage.vue'

// Contact form state
const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const submitted = ref(false)

const handleSubmit = () => {
    // In a real app, this would submit to a backend
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const contactRows = [
    { label: 'Adress:', value: 'Storgatan 12, 123 45 Stockholm' },
    { label: 'Telefon:', value: '08-123 456 78' },
    { label: 'E-post:', value: 'info@vardcentralen.se' },
    { label: 'Öppettider:', value: 'måndag-fredag 08:00-17:00' }
]

const acuteRows = [
    { label: '1177 Vårdguiden:', value: '1177' },
    // Neutrality rule: the source named a real hospital here; replaced with a
    // fictional clinic name (the only content deviation, noted in the report).
    { label: 'Akutmottagning:', value: 'Akutmottagningen Södra, Stockholm' },
    { label: 'Nödnummer:', value: '112' }
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="kontakt__title">Kontakt</h1>
            <p class="kontakt__intro">
                Här hittar du kontaktinformation till vår vårdcentral. Välkommen att kontakta oss
                för frågor eller för att boka tid.
            </p>
        </div>

        <f-message-box v-if="submitted" type="success" class="kontakt__success">
            <template #default="{ headingSlotClass }">
                <h2 :class="headingSlotClass">Meddelandet har skickats</h2>
                <p>Tack för ditt meddelande. Vi återkommer så snart vi kan.</p>
            </template>
        </f-message-box>

        <div class="grid grid--2 kontakt__columns">
            <AppCard title="Kontaktinformation">
                <dl class="kontakt__details">
                    <template v-for="row in contactRows" :key="row.label">
                        <dt class="kontakt__term">{{ row.label }}</dt>
                        <dd class="kontakt__value">{{ row.value }}</dd>
                    </template>
                </dl>
            </AppCard>

            <AppCard title="Akuta ärenden">
                <p class="kontakt__acute-intro">
                    För akuta ärenden utanför vår öppettid, kontakta:
                </p>
                <dl class="kontakt__details">
                    <template v-for="row in acuteRows" :key="row.label">
                        <dt class="kontakt__term">{{ row.label }}</dt>
                        <dd class="kontakt__value">{{ row.value }}</dd>
                    </template>
                </dl>
            </AppCard>
        </div>

        <AppCard title="Kontakta oss via formulär" class="kontakt__section">
            <p class="kontakt__form-intro">
                Fyll i formuläret nedan så kontaktar vi dig. Observera att detta formulär inte är
                för akuta ärenden.
            </p>

            <f-validation-form class="kontakt__form" @submit="handleSubmit">
                <template #error-message> Fel i följande fält: </template>

                <f-text-field id="kontakt-name" v-model="name" v-validation.required :maxlength="100">
                    Namn
                </f-text-field>

                <f-email-text-field id="kontakt-email" v-model="email" v-validation.required.email>
                    E-post
                </f-email-text-field>

                <f-phone-text-field id="kontakt-phone" v-model="phone">
                    Telefonnummer
                </f-phone-text-field>

                <f-textarea-field id="kontakt-message" v-model="message" v-validation.required :maxlength="1000">
                    Meddelande
                </f-textarea-field>

                <div class="kontakt__form-actions">
                    <f-button type="submit" size="medium" variant="primary">
                        Skicka meddelande
                    </f-button>
                </div>
            </f-validation-form>
        </AppCard>

        <AppCard title="Hitta hit" class="kontakt__section">
            <p class="kontakt__form-intro">
                Vår vårdcentral ligger centralt i Stockholm med goda kommunikationer.
            </p>
            <div class="kontakt__map">
                <p class="kontakt__map-label">Karta över vår vårdcentral</p>
            </div>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.kontakt__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.kontakt__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.kontakt__success {
    display: block;
    margin-bottom: 1.5rem;
}

.kontakt__columns {
    margin-bottom: 1.5rem;
}

.kontakt__details {
    margin: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem 0.75rem;
}

.kontakt__term {
    font-weight: 600;
}

.kontakt__value {
    margin: 0;
}

.kontakt__acute-intro {
    margin: 0 0 0.75rem;
}

.kontakt__section {
    margin-top: 1.5rem;
}

.kontakt__form-intro {
    margin: 0 0 1rem;
}

.kontakt__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
}

.kontakt__form-actions {
    margin-top: 0.5rem;
}

.kontakt__map {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16rem;
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    background-color: var(--fkds-color-background-secondary);
    border: 1px solid var(--fkds-color-border-weak);
}

.kontakt__map-label {
    margin: 0;
    font-weight: 600;
    color: var(--fkds-color-text-secondary);
}
</style>
