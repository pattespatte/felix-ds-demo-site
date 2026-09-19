<script setup lang="ts">
import ServiceCard from '@/components/display/ServiceCard.vue'
import AppCard from '@/components/display/AppCard.vue'

const sections = [
    {
        title: 'Inför ditt besök',
        description: 'Vad du behöver tänka på innan din vårdkontakt'
    },
    {
        title: 'Dina rättigheter',
        description: 'Information om patientlagstiftning och dina rättigheter'
    },
    {
        title: 'Journal och information',
        description: 'Hur du får tillgång till din journal och hälsodata'
    },
    {
        title: 'Priser och avgifter',
        description: 'Information om kostnader för vård och behandling'
    }
]
</script>

<template>
    <div class="page">
        <h1 class="patinfo__title">Patientinformation</h1>
        <AppCard>
            <p class="patinfo__intro">Här hittar du viktig information för dig som patient hos oss.</p>

            <div class="grid grid--2 patinfo__sections">
                <div v-for="section in sections" :key="section.title" class="patinfo__section">
                    <h2 class="patinfo__section-title">{{ section.title }}</h2>
                    <p class="patinfo__section-text">{{ section.description }}</p>
                </div>
            </div>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.patinfo__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.patinfo__intro {
    margin: 0 0 1.5rem;
}

.patinfo__section {
    border-left: 4px solid var(--fkds-color-action-border-primary-default);
    padding-left: 1rem;
}

.patinfo__section-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.patinfo__section-text {
    margin: 0;
    color: var(--fkds-color-text-secondary);
}
</style>
