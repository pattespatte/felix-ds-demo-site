<script setup lang="ts">
import { FCard } from '@fkui/vue'

// Contact card: FCard with a definition list of contact details. Same prop
// surface as the source site's ContactCard.
interface Props {
    title?: string
    name?: string
    role?: string
    email?: string
    phone?: string
    address?: string
    image?: string
}

defineProps<Props>()

// Format phone number for tel: link
const formatPhoneLink = (phone: string): string => {
    if (!phone) {
        return ''
    }

    let digits = phone.replace(/\D/g, '')

    if (digits.startsWith('0')) {
        digits = `46${digits.substring(1)}`
    } else if (!digits.startsWith('46')) {
        digits = `46${digits}`
    }

    return `tel:+${digits}`
}
</script>

<template>
    <f-card class="contact-card">
        <template v-if="title" #header="{ headingSlotClass }">
            <h3 :class="headingSlotClass">{{ title }}</h3>
        </template>
        <template #default>
            <div class="contact-card__body">
                <p v-if="name" class="contact-card__name">{{ name }}</p>
                <p v-if="role" class="contact-card__role">{{ role }}</p>
                <dl class="contact-card__details">
                    <template v-if="address">
                        <dt class="contact-card__term">Adress</dt>
                        <dd class="contact-card__value">{{ address }}</dd>
                    </template>
                    <template v-if="phone">
                        <dt class="contact-card__term">Telefon</dt>
                        <dd class="contact-card__value">
                            <a :href="formatPhoneLink(phone)" class="contact-card__link">
                                {{ phone }}
                            </a>
                        </dd>
                    </template>
                    <template v-if="email">
                        <dt class="contact-card__term">E-post</dt>
                        <dd class="contact-card__value">
                            <a :href="`mailto:${email}`" class="contact-card__link">
                                {{ email }}
                            </a>
                        </dd>
                    </template>
                </dl>
                <div v-if="$slots.default" class="contact-card__extra">
                    <slot />
                </div>
            </div>
        </template>
    </f-card>
</template>

<style scoped lang="scss">
.contact-card {
    display: block;
    height: 100%;
}

.contact-card__name {
    margin: 0;
    font-weight: 600;
}

.contact-card__role {
    margin: 0 0 0.75rem;
    color: var(--fkds-color-text-secondary);
}

.contact-card__details {
    margin: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 0.75rem;
}

.contact-card__term {
    font-weight: 600;
    color: var(--fkds-color-text-secondary);
}

.contact-card__value {
    margin: 0;
}

.contact-card__link {
    color: var(--fkds-color-action-text-primary-default);

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
