<script setup lang="ts">
import { FButton } from '@fkui/vue'
import ServiceCard from '@/components/display/ServiceCard.vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'
</script>

<template>
    <div class="page">
        <page-intro
            title="Boka tid"
            intro="Här kan du boka tid för vårdbesök, vaccinationer och hälsokontroller. Välj den typ av tid du behöver boka."
        />

        <div class="grid grid--2 boka__cards">
            <ServiceCard
                title="Akut tid"
                description="För akuta besvär som inte kan vänta. Ring oss direkt på telefonnummer 08-123 456 78."
                icon="warning-circle-fill"
            >
                <!-- A real tel: anchor (FButton renders a button element),
                     dressed in FKUI's global button classes. -->
                <a href="tel:+46812345678" class="button button--secondary button--small boka__action">
                    Ring oss nu
                </a>
            </ServiceCard>

            <ServiceCard
                title="Planerat besök"
                description="Boka tid för planerat vårdbesök, hälsokontroll eller uppföljning."
                icon="calendar"
            >
                <router-link to="/boka-tid/form" custom v-slot="{ navigate }">
                    <f-button size="small" variant="primary" role="link" class="boka__action" @click="navigate">
                        Boka tid online
                    </f-button>
                </router-link>
            </ServiceCard>

            <ServiceCard
                title="Vaccination"
                description="Boka tid för vaccination, inklusive influensa- och COVID-19-vaccin."
                icon="syringe"
            >
                <f-button size="small" variant="secondary" class="boka__action">
                    Boka vaccinationstid
                </f-button>
            </ServiceCard>

            <ServiceCard
                title="Laboratorieprov"
                description="Boka tid för provtagning. Observera att vissa prover kräver faste."
                icon="test-tube"
            >
                <f-button size="small" variant="secondary" class="boka__action">
                    Boka provtagning
                </f-button>
            </ServiceCard>
        </div>

        <AppCard title="Information vid bokning" class="boka__info">
            <ul class="stack-list">
                <ListItem icon="identification-card">
                    Ha ditt personnummer och bankID tillgängligt vid bokning
                </ListItem>
                <ListItem icon="calendar">
                    Om du behöver avboka din tid, gör det senast 24 timmar innan
                </ListItem>
                <ListItem icon="warning-circle-fill">
                    Vid akuta besvär, ring oss istället för att boka online
                </ListItem>
                <ListItem icon="identification-card">
                    Medtag giltig legitimation vid ditt besök
                </ListItem>
            </ul>
        </AppCard>
    </div>
</template>

<style scoped>
.boka__cards {
  margin-bottom: 1.5rem;
}

/* Card actions sit on FKUI/FButton styling; only the placement stays custom.
   The tel: anchor reuses FKUI's global button classes for the same look. */
.boka__action {
  align-self: flex-start;
  margin-top: 0.5rem;
}

.boka__info {
  margin-top: 1.5rem;
}

</style>
