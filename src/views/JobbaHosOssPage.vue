<script setup lang="ts">
import SecondaryNavigation from '@/components/common/SecondaryNavigation.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import { FButton } from '@fkui/vue'
</script>

<template>
    <SecondaryNavigation />
    <div class="page">
        <div class="page__narrow">
            <h1 class="jobba__title">Jobba hos oss</h1>
            <AppCard>
                <p class="jobba__intro">
                    Vill du bli en del av vårt team? Här hittar du information om lediga tjänster
                    och vad det innebär att arbeta hos oss.
                </p>

                <div class="grid grid--2 jobba__columns">
                    <div class="jobba__panel jobba__panel--why">
                        <h2 class="jobba__panel-title">Varför välja oss?</h2>
                        <ul class="stack-list">
                            <ListItem>Utvecklande arbetsmiljö</ListItem>
                            <ListItem>Konkurrenskraftiga villkor</ListItem>
                            <ListItem>Möjlighet till fortbildning</ListItem>
                            <ListItem>Moderna lokaler och utrustning</ListItem>
                        </ul>
                    </div>
                    <div class="jobba__panel jobba__panel--jobs">
                        <h2 class="jobba__panel-title">Lediga tjänster</h2>
                        <p class="jobba__panel-text">Just nu söker vi:</p>
                        <ul class="stack-list">
                            <ListItem>Specialistsjuksköterskor</ListItem>
                            <ListItem>Läkare inom olika specialiteter</ListItem>
                            <ListItem>Undersköterskor</ListItem>
                            <ListItem>Administrativ personal</ListItem>
                        </ul>
                    </div>
                </div>

                <div class="jobba__cta">
                    <router-link to="/om-oss/lediga-tjanster" custom v-slot="{ navigate }">
                        <f-button
                            size="medium"
                            variant="primary"
                            tag="a"
                            role="link"
                            @click="navigate"
                        >
                            Se alla lediga jobb
                        </f-button>
                    </router-link>
                </div>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.jobba__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.jobba__intro {
    margin: 0 0 2rem;
}

.jobba__columns {
    margin-bottom: 2rem;
}

.jobba__panel {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    padding: 1.5rem;
}

.jobba__panel--why {
    background-color: var(--fkds-color-feedback-background-info);
}

.jobba__panel--jobs {
    background-color: var(--fkds-color-feedback-background-positive);
}

.jobba__panel-title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.jobba__panel-text {
    margin: 0 0 0.75rem;
}

.jobba__cta {
    text-align: center;
}
</style>
