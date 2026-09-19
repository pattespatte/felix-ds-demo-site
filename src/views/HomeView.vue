<script setup lang="ts">
import ServiceCard from '@/components/display/ServiceCard.vue'
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="home__title">Välkommen till Vårdportalen</h1>
            <p class="home__intro">
                Här kan du enkelt boka tider, kontakta vården och hantera dina vårdärenden.
            </p>
        </div>

        <div class="grid grid--3 home__cards">
            <router-link to="/boka-tid" class="home__card-link">
                <ServiceCard
                    title="Boka tid"
                    description="Boka tid hos läkare, sjuksköterska eller annan vårdpersonal."
                    icon="calendar"
                />
            </router-link>

            <router-link to="/tjanster" class="home__card-link">
                <ServiceCard
                    title="E-tjänster"
                    description="Få tillgång till dina journaler, provsvar och recept."
                    icon="file"
                />
            </router-link>

            <router-link to="/kontakt" class="home__card-link">
                <ServiceCard
                    title="Kontakta oss"
                    description="Ställ frågor eller kontakta vården via 1177 Vårdguiden."
                    icon="envelope"
                />
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.home__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.home__cards {
    margin-bottom: 2rem;
}

.home__card-link {
    display: block;
    text-decoration: none;
    color: inherit;
    height: 100%;

    &:focus-visible {
        outline: none;
    }

    &:focus-visible :deep(.card) {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
