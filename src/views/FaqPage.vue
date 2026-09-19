<script setup lang="ts">
import { ref } from 'vue'
import { FExpandableParagraph } from '@fkui/vue'
import AppCard from '@/components/display/AppCard.vue'

// FAQ items (verbatim from the source site) – rendered as an accordion with
// one item open at a time.
const faqItems = [
    {
        id: '1',
        title: 'Hur bokar jag en tid?',
        content:
            'Du kan boka tid på flera sätt: via vår webbplats under "Boka tid", genom att ringa oss på 08-123 456 78, eller genom att besöka oss direkt under våra öppettider. För akuta ärenden, ring oss alltid direkt.'
    },
    {
        id: '2',
        title: 'Vad kostar ett besök?',
        content:
            'Priset för ett vårdbesök varierar beroende på typ av besök och din ålder. För vuxna (18 år och äldre) är det högkostnadsskydd som gäller. Barn och ungdomar under 18 år har fri vård. För mer detaljerad prisinformation, kontakta vår reception.'
    },
    {
        id: '3',
        title: 'Hur avbokar jag en tid?',
        content:
            'Du kan avboka din tid via Mina Sidor på vår webbplats, genom att ringa oss, eller genom att besöka oss. Observera att du måste avboka senast 24 timmar innan ditt besök för att undvika en avgift.'
    },
    {
        id: '4',
        title: 'Kan jag få mina recept förnyade?',
        content:
            'Ja, du kan förnya dina recept via Mina Sidor på vår webbplats. Vissa recept kräver dock ett nytt besök hos läkare. Om du är osäker, kontakta oss via telefon eller e-post.'
    },
    {
        id: '5',
        title: 'Hur får jag tillgång till mina journaler?',
        content:
            'Du kan logga in på Mina Sidor med BankID för att läsa dina journaler. Du kan också beställa en utskrift av din journal genom att kontakta oss. Observera att det kan ta upp till 7 dagar att få en utskrift.'
    },
    {
        id: '6',
        title: 'Erbjuder ni vaccinationer?',
        content:
            'Ja, vi erbjuder vaccinationer mot influensa, COVID-19 och andra sjukdomar enligt nationella vaccinationsprogrammet. Vissa vaccinationer är gratis medan andra kostar. Kontakta oss för mer information och för att boka tid.'
    },
    {
        id: '7',
        title: 'Vad gör jag om jag blir sjuk på kvällen eller helgen?',
        content:
            'Om du blir akut sjuk utanför våra öppettider, kontakta 1177 Vårdguiden för rådgivning. För livshotande tillstånd, ring 112. Du kan också besöka en akutmottagning eller jourcentral.'
    },
    {
        id: '8',
        title: 'Kan jag byta vårdcentral?',
        content:
            'Ja, du har rätt att byta vårdcentral när du vill. Du kan göra det direkt via 1177 Vårdguidens e-tjänster eller genom att kontakta din nya vårdcentral. Observera att det kan ta några dagar innan bytet är registrerat i systemet.'
    }
]

// One item open at a time (accordion behaviour).
const openId = ref<string | null>(null)

const toggle = (id: string) => {
    openId.value = openId.value === id ? null : id
}
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="faq__title">Frågor och Svar</h1>
            <p class="faq__intro">
                Här har vi samlat vanliga frågor och svar om vår verksamhet. Hittar du inte svar
                på din fråga är du välkommen att kontakta oss.
            </p>

            <div class="faq__items">
                <f-expandable-paragraph
                    v-for="item in faqItems"
                    :key="item.id"
                    header-tag="h2"
                    :expanded="openId === item.id"
                    @toggle="toggle(item.id)"
                >
                    <template #title>{{ item.title }}</template>
                    <template #default>
                        {{ item.content }}
                    </template>
                </f-expandable-paragraph>
            </div>

            <AppCard title="Har du fler frågor?" class="faq__more">
                <p class="faq__more-text">Kontakta oss så hjälper vi dig.</p>
                <router-link to="/kontakt" custom v-slot="{ navigate }">
                    <f-button size="medium" variant="primary" role="link" @click="navigate">
                        Kontakta oss
                    </f-button>
                </router-link>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.faq__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.faq__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.faq__items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.faq__more-text {
    margin: 0 0 1rem;
}
</style>
