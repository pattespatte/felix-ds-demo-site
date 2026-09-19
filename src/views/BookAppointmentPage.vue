<script setup lang="ts">
import ServiceCard from '@/components/display/ServiceCard.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="boka__title">Boka tid</h1>
            <p class="boka__intro">
                Här kan du boka tid för vårdbesök, vaccinationer och hälsokontroller. Välj den typ
                av tid du behöver boka.
            </p>
        </div>

        <div class="grid grid--2 boka__cards">
            <ServiceCard
                title="Akut tid"
                description="För akuta besvär som inte kan vänta. Ring oss direkt på telefonnummer 08-123 456 78."
                icon="alert"
            >
                <a href="tel:+46812345678" class="boka__action boka__action--alert">
                    Ring oss nu
                </a>
            </ServiceCard>

            <ServiceCard
                title="Planerat besök"
                description="Boka tid för planerat vårdbesök, hälsokontroll eller uppföljning."
                icon="calendar"
            >
                <router-link to="/boka-tid/form" class="boka__action boka__action--primary">
                    Boka tid online
                </router-link>
            </ServiceCard>

            <ServiceCard
                title="Vaccination"
                description="Boka tid för vaccination, inklusive influensa- och COVID-19-vaccin."
                icon="plus"
            >
                <button type="button" class="boka__action boka__action--primary">
                    Boka vaccinationstid
                </button>
            </ServiceCard>

            <ServiceCard
                title="Laboratorieprov"
                description="Boka tid för provtagning. Observera att vissa prover kräver faste."
                icon="file"
            >
                <button type="button" class="boka__action boka__action--primary">
                    Boka provtagning
                </button>
            </ServiceCard>
        </div>

        <AppCard title="Information vid bokning" class="boka__info">
            <ul class="stack-list">
                <ListItem icon="doc">
                    Ha ditt personnummer och bankID tillgängligt vid bokning
                </ListItem>
                <ListItem icon="calendar">
                    Om du behöver avboka din tid, gör det senast 24 timmar innan
                </ListItem>
                <ListItem icon="alert"> Vid akuta besvär, ring oss istället för att boka online </ListItem>
                <ListItem icon="doc"> Medtag giltig legitimation vid ditt besök </ListItem>
            </ul>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.boka__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.boka__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.boka__cards {
    margin-bottom: 1.5rem;
}

// The source used colored action buttons per card; FKUI buttons are themed,
// so the actions render as theme buttons with the alert variant standing in
// for the red phone action.
.boka__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-action-text-inverted-default);

    &:hover {
        background-color: var(--fkds-color-action-background-primary-hover);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }

    &--alert {
        background-color: var(--fkds-color-feedback-background-negative-strong);
        color: var(--fkds-color-text-inverted, #ffffff);

        &:hover {
            background-color: var(--fkds-color-feedback-background-negative-strong);
            filter: brightness(1.1);
        }
    }
}

.boka__info {
    margin-top: 1.5rem;
}
</style>
