<script setup lang="ts">
import AppCard from '@/components/display/AppCard.vue'
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="about__title">Om oss</h1>
            <p class="about__intro">Detta är en exempelsida för svensk vårdportal.</p>

            <AppCard title="Vårt uppdrag">
                <p class="about__paragraph">
                    Vi strävar efter att göra svensk vård mer tillgänglig och effektiv för alla
                    medborgare.
                </p>
                <p class="about__paragraph">
                    Genom vår digitala plattform kan du enkelt hantera dina vårdkontakter och få
                    tillgång till viktig information när du behöver den.
                </p>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.about__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.about__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.about__paragraph {
    margin: 0 0 1rem;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
