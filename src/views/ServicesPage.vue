<script setup lang="ts">
import ServiceCard from '@/components/display/ServiceCard.vue'

// Icons mapped semantically to the FKUI default library from the source's
// Phosphor icons (stethoscope/baby/child/test-tube/brain have no direct
// equivalents; the closest semantic glyphs are used).
const services = [
    {
        title: 'Allmänmedicin',
        description:
            'Vi erbjuder allmänmedicinsk vård för vuxna och barn. Hos oss kan du få hjälp med vanliga sjukdomar, hälsokontroller och rådgivning.',
        icon: 'cross'
    },
    {
        title: 'Barnmorskemottagning',
        description:
            'Vår barnmorskemottagning erbjuder mödrahälsovård, preventivmedelsrådgivning och cellprovtagning.',
        icon: 'circle'
    },
    {
        title: 'BVC (Barnavårdscentral)',
        description:
            'Vi erbjuder barnhälsovård för barn från födseln tills de börjar skolan. Hos oss får ditt barn regelbundna hälsokontroller och vaccinationer.',
        icon: 'plus'
    },
    {
        title: 'Laboratorium',
        description:
            'Vi har ett eget laboratorium där vi tar de vanligaste proverna. Du behöver inte boka tid för provtagning om du har remiss.',
        icon: 'file'
    },
    {
        title: 'Psykiatri',
        description:
            'Vi erbjuder psykiatrisk vård för vuxna. Hos oss kan du få hjälp med depression, ångest och andra psykiska besvär.',
        icon: 'i'
    }
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="tjanster__title">Våra Tjänster</h1>
            <p class="tjanster__intro">
                Här hittar du information om alla de tjänster och vårdinsatser som vi erbjuder på
                vår vårdcentral.
            </p>
        </div>

        <div class="grid grid--2 tjanster__cards">
            <ServiceCard
                v-for="service in services"
                :key="service.title"
                :title="service.title"
                :description="service.description"
                :icon="service.icon"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.tjanster__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.tjanster__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.tjanster__cards {
    margin-bottom: 2rem;
}
</style>
