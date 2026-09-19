<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
    FButton,
    FCheckboxField,
    FDatepickerField,
    FEmailTextField,
    FFieldset,
    FFileItem,
    FFileSelector,
    FMessageBox,
    FPersonnummerTextField,
    FPhoneTextField,
    FRadioField,
    FSelectField,
    FTextField,
    FTextareaField,
    FValidationForm
} from '@fkui/vue'
import AlertMessage from '@/components/display/AlertMessage.vue'

const router = useRouter()

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showSummary = ref(false)
const formError = ref('')

interface UploadedFile {
    name: string
    mime: string
}

// Form data
const formData = reactive({
    personalInfo: {
        firstName: '',
        lastName: '',
        personalNumber: '',
        phone: '',
        email: ''
    },
    appointmentDetails: {
        visitType: '',
        preferredDate: '',
        preferredTime: '',
        clinic: '',
        priority: ''
    },
    medicalInfo: {
        reason: '',
        symptoms: '',
        medications: '',
        allergies: [] as string[],
        otherAllergy: '',
        previousConditions: [] as string[],
        otherCondition: ''
    },
    preferences: {
        language: '',
        needsInterpreter: '',
        specialNeeds: [] as string[],
        prefersDigital: '',
        message: ''
    },
    consent: {
        privacyPolicy: '',
        dataProcessing: '',
        smsReminder: ''
    }
})

const documents = ref<UploadedFile[]>([])
const fileError = ref('')

// Options for select inputs (verbatim from the source site)
const visitTypeOptions = [
    { value: 'general', label: 'Allmän konsultation' },
    { value: 'followup', label: 'Uppföljningsbesök' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'lab', label: 'Laboratorieprovtagning' },
    { value: 'specialist', label: 'Specialistmottagning' },
    { value: 'physio', label: 'Fysioterapi/sjukgymnastik' },
    { value: 'psychology', label: 'Psykolog/psykoterapeut' },
    { value: 'other', label: 'Annat' }
]

const timeOptions = [
    { value: 'morning', label: 'Förmiddag (08:00-12:00)' },
    { value: 'lunch', label: 'Lunchtid (12:00-13:00)' },
    { value: 'afternoon', label: 'Eftermiddag (13:00-17:00)' },
    { value: 'evening', label: 'Kväll (17:00-19:00)' },
    { value: 'any', label: 'Spelar ingen roll' }
]

const clinicOptions = [
    { value: 'central', label: 'Vårdcentralen Centrum' },
    { value: 'nord', label: 'Vårdcentralen Nord' },
    { value: 'syd', label: 'Vårdcentralen Syd' },
    { value: 'ost', label: 'Vårdcentralen Öst' },
    { value: 'vast', label: 'Vårdcentralen Väst' },
    { value: 'specialist', label: 'Specialistmottagningen' }
]

const priorityOptions = [
    { value: 'routine', label: 'Rutinbesök' },
    { value: 'urgent', label: 'Brådskande (ej akut)' },
    { value: 'followup', label: 'Uppföljning' }
]

const allergyOptions = [
    { value: 'penicillin', label: 'Penicillin' },
    { value: 'nuts', label: 'Nötter' },
    { value: 'pollen', label: 'Pollen' },
    { value: 'animals', label: 'Djur' },
    { value: 'latex', label: 'Latex' },
    { value: 'food', label: 'Matallergier' },
    { value: 'none', label: 'Inga kända allergier' },
    { value: 'other', label: 'Annan' }
]

const conditionOptions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Högt blodtryck' },
    { value: 'heart', label: 'Hjärtsjukdom' },
    { value: 'asthma', label: 'Astma/KOL' },
    { value: 'thyroid', label: 'Sköldkörtelsjukdom' },
    { value: 'autoimmune', label: 'Autoimmun sjukdom' },
    { value: 'none', label: 'Inga kända sjukdomar' },
    { value: 'other', label: 'Annan' }
]

const languageOptions = [
    { value: 'swedish', label: 'Svenska' },
    { value: 'english', label: 'Engelska' },
    { value: 'arabic', label: 'Arabiska' },
    { value: 'somali', label: 'Somaliska' },
    { value: 'farsi', label: 'Farsi/Dari' },
    { value: 'spanish', label: 'Spanska' },
    { value: 'other', label: 'Annat språk' }
]

const specialNeedsOptions = [
    { value: 'wheelchair', label: 'Rullstolsanpassning' },
    { value: 'hearing', label: 'Hörselslinga' },
    { value: 'vision', label: 'Synhjälpmedel' },
    { value: 'mobility', label: 'Hjälp med förflyttning' },
    { value: 'none', label: 'Inga specialbehov' }
]

const interpreterOptions = [
    { value: 'yes', label: 'Ja, jag behöver tolk' },
    { value: 'no', label: 'Nej, jag behöver ingen tolk' }
]

const digitalMeetingOptions = [
    { value: 'yes', label: 'Ja, om möjligt' },
    { value: 'no', label: 'Nej, jag vill komma till mottagningen' },
    { value: 'either', label: 'Spelar ingen roll' }
]

const consentLabels = [
    'Jag har läst och godkänner integritetspolicyn för hantering av mina personuppgifter',
    'Jag samtycker till att mina uppgifter sparas och används för vårdändamål enligt gällande lagstiftning',
    'Ja, skicka gärna en påminnelse via SMS dagen innan besöket'
]

// Computed properties
const showOtherAllergy = computed(() => formData.medicalInfo.allergies.includes('other'))

const showOtherCondition = computed(() =>
    formData.medicalInfo.previousConditions.includes('other')
)

const languageRequired = computed(() => formData.preferences.needsInterpreter === 'yes')

const minDate = computed(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
})

const maxDate = computed(() => {
    const date = new Date()
    date.setMonth(date.getMonth() + 6)
    return date.toISOString().split('T')[0]
})

// File upload handlers (max 3 files, 10 MB each – as the source site)
const onFileChange = (event: FileList) => {
    fileError.value = ''
    for (const file of Array.from(event)) {
        if (documents.value.length >= 3) {
            fileError.value = 'Max 3 filer kan laddas upp.'
            continue
        }
        if (file.size > 10 * 1024 * 1024) {
            fileError.value = `${file.name} är för stor (max 10 MB).`
            continue
        }
        documents.value.push({ name: file.name, mime: file.type || 'application/octet-stream' })
    }
}

const removeFile = (index: number) => {
    documents.value.splice(index, 1)
}

// Label lookups for the summary
const labelFor = (options: { value: string; label: string }[], value: string): string =>
    options.find((option) => option.value === value)?.label || value

const labelsFor = (options: { value: string; label: string }[], values: string[]): string =>
    values.map((value) => labelFor(options, value)).join(', ')

// Form submission – the FValidationForm submit event only fires when the
// form is valid (FKUI runs the validators and blocks invalid submits).
const handleSubmit = async () => {
    formError.value = ''
    isSubmitting.value = true

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        showSuccess.value = true
        showSummary.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
        formError.value = 'Något gick fel. Vänligen försök igen senare.'
        console.error('Form submission error:', error)
    } finally {
        isSubmitting.value = false
    }
}

const handleCancel = () => {
    router.push('/boka-tid')
}

const closeSummary = () => {
    showSummary.value = false
}

onMounted(() => {
    // Set default date to 3 days from now
    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 3)
    formData.appointmentDetails.preferredDate = defaultDate.toISOString().split('T')[0]
})
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="form__title">Boka tid &ndash; planerat besök</h1>
            <p class="form__intro">
                Fyll i formuläret nedan för att boka en tid för ett planerat vårdbesök.
            </p>
        </div>

        <!-- Success alert -->
        <f-message-box v-if="showSuccess" type="success" class="form__message">
            <template #default="{ headingSlotClass }">
                <h2 :class="headingSlotClass">Din tid har bokats!</h2>
                <p>Du kommer att få en bekräftelse via e-post.</p>
            </template>
        </f-message-box>

        <!-- Form data summary -->
        <f-message-box v-if="showSummary" type="info" class="form__message">
            <template #default="{ headingSlotClass }">
                <div class="form__summary">
                    <h2 :class="headingSlotClass">Formulärdata som skulle skickas</h2>

                    <h3>Personuppgifter:</h3>
                    <ul>
                        <li>Namn: {{ formData.personalInfo.firstName }} {{ formData.personalInfo.lastName }}</li>
                        <li>Personnummer: {{ formData.personalInfo.personalNumber }}</li>
                        <li>Telefon: {{ formData.personalInfo.phone }}</li>
                        <li>E-post: {{ formData.personalInfo.email }}</li>
                    </ul>

                    <h3>Bokningsdetaljer:</h3>
                    <ul>
                        <li>Typ av besök: {{ labelFor(visitTypeOptions, formData.appointmentDetails.visitType) }}</li>
                        <li>Önskat datum: {{ formData.appointmentDetails.preferredDate }}</li>
                        <li>Önskad tid: {{ labelFor(timeOptions, formData.appointmentDetails.preferredTime) }}</li>
                        <li>Vårdcentral/mottagning: {{ labelFor(clinicOptions, formData.appointmentDetails.clinic) }}</li>
                        <li>Prioritet: {{ labelFor(priorityOptions, formData.appointmentDetails.priority) }}</li>
                    </ul>

                    <h3>Medicinsk information:</h3>
                    <ul>
                        <li>Anledning till besök: {{ formData.medicalInfo.reason }}</li>
                        <li>Symtom: {{ formData.medicalInfo.symptoms || 'Ej angivna' }}</li>
                        <li>Nuvarande mediciner: {{ formData.medicalInfo.medications || 'Ej angivna' }}</li>
                        <li>Kända allergier: {{ labelsFor(allergyOptions, formData.medicalInfo.allergies) || 'Inga kända allergier' }}</li>
                        <li>Tidigare sjukdomar: {{ labelsFor(conditionOptions, formData.medicalInfo.previousConditions) || 'Inga kända sjukdomar' }}</li>
                    </ul>

                    <h3>Preferenser och särskilda behov:</h3>
                    <ul>
                        <li>Språkpreferens: {{ labelFor(languageOptions, formData.preferences.language) || 'Ej angivet' }}</li>
                        <li>Behöver tolk: {{ labelFor(interpreterOptions, formData.preferences.needsInterpreter) }}</li>
                        <li>Specialbehov: {{ labelsFor(specialNeedsOptions, formData.preferences.specialNeeds) || 'Inga specialbehov' }}</li>
                        <li>Önskar digitalt möte: {{ labelFor(digitalMeetingOptions, formData.preferences.prefersDigital) }}</li>
                        <li>Meddelande: {{ formData.preferences.message || 'Ej angivet' }}</li>
                    </ul>

                    <h3>Samtycken:</h3>
                    <ul>
                        <li>Integritetspolicy: {{ formData.consent.privacyPolicy ? 'Godkänd' : 'Ej godkänd' }}</li>
                        <li>Datahantering: {{ formData.consent.dataProcessing ? 'Godkänd' : 'Ej godkänd' }}</li>
                        <li>SMS-påminnelse: {{ formData.consent.smsReminder ? 'Ja' : 'Nej' }}</li>
                        <li>Dokument: {{ documents.length > 0 ? `${documents.length} fil(er) uppladdade` : 'Inga dokument uppladdade' }}</li>
                    </ul>

                    <f-button size="small" variant="secondary" class="form__summary-close" @click="closeSummary">
                        Stäng sammanfattningen
                    </f-button>
                </div>
            </template>
        </f-message-box>

        <!-- Error alert -->
        <AlertMessage v-if="formError" type="error" :message="formError" class="form__message" />

        <f-validation-form class="form__card" @submit="handleSubmit">
            <template #error-message> Fel i följande fält: </template>

            <!-- Section 1: Personal Information -->
            <section class="form__section">
                <h2 class="form__section-title">Personuppgifter</h2>
                <div class="grid grid--2">
                    <f-text-field
                        id="firstName"
                        v-model="formData.personalInfo.firstName"
                        v-validation.required
                        :maxlength="100"
                    >
                        Förnamn
                    </f-text-field>

                    <f-text-field
                        id="lastName"
                        v-model="formData.personalInfo.lastName"
                        v-validation.required
                        :maxlength="100"
                    >
                        Efternamn
                    </f-text-field>

                    <f-personnummer-text-field
                        id="personalNumber"
                        v-model="formData.personalInfo.personalNumber"
                        v-validation.required
                    >
                        Personnummer
                    </f-personnummer-text-field>

                    <f-phone-text-field
                        id="phone"
                        v-model="formData.personalInfo.phone"
                        v-validation.required
                    >
                        Telefonnummer
                    </f-phone-text-field>

                    <f-email-text-field
                        id="email"
                        v-model="formData.personalInfo.email"
                        v-validation.required.email
                    >
                        E-postadress
                    </f-email-text-field>
                </div>
            </section>

            <!-- Section 2: Appointment Details -->
            <section class="form__section">
                <h2 class="form__section-title">Bokningsdetaljer</h2>
                <div class="grid grid--2">
                    <f-select-field id="visitType" v-model="formData.appointmentDetails.visitType" required>
                        <template #label> Typ av besök </template>
                        <option v-for="option in visitTypeOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </f-select-field>

                    <f-datepicker-field
                        id="preferredDate"
                        v-model="formData.appointmentDetails.preferredDate"
                        v-validation.required.minDate.maxDate="{
                            minDate: { limit: minDate },
                            maxDate: { limit: maxDate }
                        }"
                    >
                        Önskat datum
                    </f-datepicker-field>

                    <f-select-field id="preferredTime" v-model="formData.appointmentDetails.preferredTime" required>
                        <template #label> Önskad tid </template>
                        <option v-for="option in timeOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </f-select-field>

                    <f-select-field id="clinic" v-model="formData.appointmentDetails.clinic" required>
                        <template #label> Vårdcentral/mottagning </template>
                        <option v-for="option in clinicOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </f-select-field>
                </div>

                <f-fieldset name="priority" v-validation.required class="form__fieldset">
                    <template #label> Prioritet </template>
                    <f-radio-field
                        v-for="option in priorityOptions"
                        :key="option.value"
                        v-model="formData.appointmentDetails.priority"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </f-radio-field>
                </f-fieldset>
            </section>

            <!-- Section 3: Medical Information -->
            <section class="form__section">
                <h2 class="form__section-title">Medicinsk information</h2>
                <div class="stack--tight">
                    <f-textarea-field
                        id="reason"
                        v-model="formData.medicalInfo.reason"
                        v-validation.required
                        :maxlength="300"
                    >
                        Anledning till besök
                    </f-textarea-field>

                    <f-textarea-field
                        id="symptoms"
                        v-model="formData.medicalInfo.symptoms"
                        :maxlength="500"
                    >
                        Symtom
                    </f-textarea-field>

                    <f-textarea-field
                        id="medications"
                        v-model="formData.medicalInfo.medications"
                        :maxlength="500"
                    >
                        Nuvarande mediciner
                    </f-textarea-field>

                    <f-fieldset name="allergies" class="form__fieldset">
                        <template #label> Kända allergier </template>
                        <f-checkbox-field
                            v-for="option in allergyOptions"
                            :key="option.value"
                            v-model="formData.medicalInfo.allergies"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </f-checkbox-field>
                    </f-fieldset>

                    <!-- Other allergy text field -->
                    <f-text-field
                        v-if="showOtherAllergy"
                        id="otherAllergy"
                        v-model="formData.medicalInfo.otherAllergy"
                        :maxlength="100"
                        class="form__conditional"
                    >
                        Annan allergi
                    </f-text-field>

                    <f-fieldset name="previousConditions" class="form__fieldset">
                        <template #label> Tidigare sjukdomar/kroniska tillstånd </template>
                        <f-checkbox-field
                            v-for="option in conditionOptions"
                            :key="option.value"
                            v-model="formData.medicalInfo.previousConditions"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </f-checkbox-field>
                    </f-fieldset>

                    <!-- Other condition text field -->
                    <f-text-field
                        v-if="showOtherCondition"
                        id="otherCondition"
                        v-model="formData.medicalInfo.otherCondition"
                        :maxlength="100"
                        class="form__conditional"
                    >
                        Annan sjukdom
                    </f-text-field>
                </div>
            </section>

            <!-- Section 4: Preferences and Special Requirements -->
            <section class="form__section">
                <h2 class="form__section-title">Preferenser och särskilda behov</h2>
                <div class="grid grid--2">
                    <f-select-field
                        id="language"
                        v-model="formData.preferences.language"
                        :required="languageRequired"
                    >
                        <template #label> Språkpreferens vid konsultation </template>
                        <option v-for="option in languageOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </f-select-field>

                    <f-fieldset name="needsInterpreter" v-validation.required class="form__fieldset">
                        <template #label> Behöver du tolk? </template>
                        <f-radio-field
                            v-for="option in interpreterOptions"
                            :key="option.value"
                            v-model="formData.preferences.needsInterpreter"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </f-radio-field>
                    </f-fieldset>

                    <f-fieldset name="specialNeeds" class="form__fieldset form__fieldset--wide">
                        <template #label> Specialbehov </template>
                        <f-checkbox-field
                            v-for="option in specialNeedsOptions"
                            :key="option.value"
                            v-model="formData.preferences.specialNeeds"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </f-checkbox-field>
                    </f-fieldset>

                    <f-fieldset name="prefersDigital" v-validation.required class="form__fieldset form__fieldset--wide">
                        <template #label> Önskar du digitalt möte (videosamtal)? </template>
                        <f-radio-field
                            v-for="option in digitalMeetingOptions"
                            :key="option.value"
                            v-model="formData.preferences.prefersDigital"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </f-radio-field>
                    </f-fieldset>

                    <f-textarea-field
                        id="message"
                        v-model="formData.preferences.message"
                        :maxlength="300"
                        class="form__fieldset--wide"
                    >
                        Meddelande till personalen
                    </f-textarea-field>
                </div>
            </section>

            <!-- Section 5: Consent and Confirmation -->
            <section class="form__section">
                <h2 class="form__section-title">Samtycke och bekräftelse</h2>
                <div class="stack--tight">
                    <f-fieldset name="privacyPolicy" v-validation.required class="form__fieldset">
                        <template #label> Integritetspolicy </template>
                        <f-checkbox-field id="privacyPolicy" v-model="formData.consent.privacyPolicy" value="yes">
                            {{ consentLabels[0] }}
                        </f-checkbox-field>
                    </f-fieldset>

                    <f-fieldset name="dataProcessing" v-validation.required class="form__fieldset">
                        <template #label> Datahantering </template>
                        <f-checkbox-field id="dataProcessing" v-model="formData.consent.dataProcessing" value="yes">
                            {{ consentLabels[1] }}
                        </f-checkbox-field>
                    </f-fieldset>

                    <f-fieldset name="smsReminder" class="form__fieldset">
                        <template #label> SMS-påminnelse </template>
                        <f-checkbox-field id="smsReminder" v-model="formData.consent.smsReminder" value="yes">
                            {{ consentLabels[2] }}
                        </f-checkbox-field>
                    </f-fieldset>

                    <div class="file-uploader form__upload">
                        <f-file-selector
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            multiple
                            @change="onFileChange"
                        >
                            Ladda upp relevanta dokument (valfritt)
                        </f-file-selector>

                        <f-message-box v-if="fileError" type="error" class="file-uploader__message-box">
                            <template #default="{ headingSlotClass }">
                                <h3 :class="headingSlotClass">Filen kunde inte laddas upp</h3>
                                <p>{{ fileError }}</p>
                            </template>
                        </f-message-box>

                        <f-file-item
                            v-for="(file, index) in documents"
                            :key="file.name"
                            :file-name="file.name"
                            :mime-type="file.mime"
                        >
                            <template #row>
                                <button type="button" class="form__remove-file" @click="removeFile(index)">
                                    Ta bort {{ file.name }}
                                </button>
                            </template>
                        </f-file-item>
                    </div>
                    <p class="form__upload-note">
                        Du kan ladda upp remisser, tidigare journalutdrag eller andra relevanta
                        dokument. Max storlek: 10MB per fil, max 3 filer.
                    </p>
                </div>
            </section>

            <!-- Form buttons -->
            <div class="form__actions">
                <f-button size="medium" variant="secondary" @click="handleCancel"> Avbryt </f-button>
                <f-button type="submit" size="medium" variant="primary" :loading="isSubmitting">
                    Skicka bokning
                </f-button>
            </div>
        </f-validation-form>
    </div>
</template>

<style scoped lang="scss">
.form__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.form__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.form__message {
    display: block;
    margin-bottom: 1.5rem;
}

.form__summary {
    h3 {
        margin: 1rem 0 0.25rem;
        font-size: 1rem;
    }

    ul {
        margin: 0 0 0.5rem;
        padding-left: 1.25rem;
    }
}

.form__summary-close {
    margin-top: 0.75rem;
}

.form__section {
    margin-bottom: 2.5rem;
}

.form__section-title {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.form__fieldset {
    margin-bottom: 1rem;
}

.form__fieldset--wide {
    grid-column: 1 / -1;
}

.form__conditional {
    margin-left: 1.5rem;
}

.form__upload {
    margin-top: 0.5rem;
}

.form__upload-note {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: var(--fkds-color-text-secondary);
}

.form__remove-file {
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    color: var(--fkds-color-action-text-primary-default);
    text-decoration: underline;
    cursor: pointer;

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.form__actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
</style>
