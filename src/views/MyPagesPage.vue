<script setup lang="ts">
import { ref } from 'vue'
import { FButton, FPersonnummerTextField, FTextField, FValidationForm } from '@fkui/vue'
import AppCard from '@/components/display/AppCard.vue'
import ServiceCard from '@/components/display/ServiceCard.vue'
import ListItem from '@/components/display/ListItem.vue'

// Login state (demo – no real authentication)
const loginCode = ref('')
const personalNumber = ref('')

// Service icons: Phosphor glyphs (FIcon "f"-library extension, see
// src/icons/phosphor-spritesheet.ts), same choices as the sibling
// swedish-healthcare-demo-site makes for these cards.
const services = [
    {
        title: 'Mina bokningar',
        description: 'Se dina kommande och tidigare besök. Boka om eller avboka dina tider.',
        action: 'Se mina bokningar',
        icon: 'calendar-check'
    },
    {
        title: 'Mina journaler',
        description: 'Läs dina journalanteckningar och se dina provsvar.',
        action: 'Se mina journaler',
        icon: 'file-text'
    },
    {
        title: 'Mina recept',
        description: 'Se dina aktuella recept och förnya recept om det behövs.',
        action: 'Se mina recept',
        icon: 'prescription'
    },
    {
        title: 'Mina kontakter',
        description: 'Kontakta vården via e-tjänster och ställ frågor till vårdpersonal.',
        action: 'Kontakta vården',
        icon: 'chat-circle'
    }
]

// Phosphor glyphs (see services above) – more specific than the generic FKUI
// set for these statements (close for "logga ut" read as an error cross).
const infoItems = [
    { text: 'Alla dina uppgifter är skyddade och krypterade', icon: 'shield-check' },
    { text: 'Du kan när som helst se vilka som har läst din journal', icon: 'eye' },
    {
        text: 'Du kan anmäla om du upptäcker felaktigheter i dina journaluppgifter',
        icon: 'warning-circle'
    },
    { text: 'Logga ut när du är klar, särskilt om du använder en delad dator', icon: 'sign-out' }
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="mina__title">Mina Sidor</h1>
            <p class="mina__intro">
                På Mina Sidor kan du hantera dina vårdärenden, boka tid och se dina journaler. Logga
                in med BankID för att komma åt dina personuppgifter.
            </p>
        </div>

        <AppCard title="Logga in" class="mina__login">
            <p class="mina__login-text">
                För att komma åt Mina Sidor behöver du logga in med BankID.
            </p>
            <f-validation-form class="mina__login-form">
                <f-personnummer-text-field
                    id="mina-personnummer"
                    v-model="personalNumber"
                    v-validation.required
                >
                    Personnummer
                </f-personnummer-text-field>
                <f-text-field
                    id="mina-kod"
                    v-model="loginCode"
                    v-validation.required
                    :maxlength="20"
                >
                    Engångskod
                </f-text-field>
                <f-button type="submit" size="medium" variant="primary">
                    Logga in med BankID
                </f-button>
            </f-validation-form>
        </AppCard>

        <div class="grid grid--2 mina__services">
            <ServiceCard
                v-for="service in services"
                :key="service.title"
                :title="service.title"
                :description="service.description"
                :icon="service.icon"
            >
                <button type="button" class="mina__service-link">
                    {{ service.action }}
                    <span class="sr-only"> – {{ service.title }}</span>
                </button>
            </ServiceCard>
        </div>

        <AppCard title="Information om Mina Sidor" class="mina__info">
            <ul class="stack-list">
                <ListItem v-for="item in infoItems" :key="item.text" :icon="item.icon">
                    {{ item.text }}
                </ListItem>
            </ul>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.mina__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.mina__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.mina__login {
    margin-bottom: 1.5rem;
}

.mina__login-text {
    margin: 0 0 1rem;
}

.mina__login-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

.mina__services {
    margin-bottom: 1.5rem;
}

.mina__service-link {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    margin-top: 0.5rem;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fkds-color-action-text-primary-default);
    cursor: pointer;

    &::after {
        content: '→';
        margin-left: 0.25rem;
    }

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.mina__info {
    margin-top: 1.5rem;
}
</style>
