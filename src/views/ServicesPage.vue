<script setup lang="ts">
import ServiceCard from '@/components/display/ServiceCard.vue'
import PageIntro from '@/components/common/PageIntro.vue'

// Icons: same Phosphor glyphs the sibling swedish-healthcare-demo-site uses
// for these cards, injected as an extension of FIcon's "f" library (see
// src/icons/phosphor-spritesheet.ts and the README's Icons section).
const services = [
    {
        title: 'Allmänmedicin',
        description:
            'Vi erbjuder allmänmedicinsk vård för vuxna och barn. Hos oss kan du få hjälp med vanliga sjukdomar, hälsokontroller och rådgivning.',
        icon: 'stethoscope'
    },
    {
        title: 'Barnmorskemottagning',
        description:
            'Vår barnmorskemottagning erbjuder mödrahälsovård, preventivmedelsrådgivning och cellprovtagning.',
        icon: 'baby'
    },
    {
        title: 'BVC (Barnavårdscentral)',
        description:
            'Vi erbjuder barnhälsovård för barn från födseln tills de börjar skolan. Hos oss får ditt barn regelbundna hälsokontroller och vaccinationer.',
        icon: 'baby-carriage'
    },
    {
        title: 'Laboratorium',
        description:
            'Vi har ett eget laboratorium där vi tar de vanligaste proverna. Du behöver inte boka tid för provtagning om du har remiss.',
        icon: 'test-tube'
    },
    {
        title: 'Psykiatri',
        description:
            'Vi erbjuder psykiatrisk vård för vuxna. Hos oss kan du få hjälp med depression, ångest och andra psykiska besvär.',
        icon: 'brain'
    }
]
</script>

<template>
    <div class="page">
        <page-intro
            title="Våra Tjänster"
            intro="Här hittar du information om alla de tjänster och vårdinsatser som vi erbjuder på vår vårdcentral."
        />

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

<style scoped>
.tjanster__cards {
  margin-bottom: 2rem;
}

</style>
