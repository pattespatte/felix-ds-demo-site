<script setup lang="ts">
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'

const collectedInfo = [
    {
        title: 'Personuppgifter:',
        description: 'Namn, personnummer, kontaktuppgifter (telefonnummer, e-postadress, adress)'
    },
    {
        title: 'Hälsoinformation:',
        description: 'Meddelande till vården, bokningar, besökshistorik, medicinsk information'
    },
    {
        title: 'Användardata:',
        description: 'IP-adress, webbläsartyp, enhetsinformation, tid och datum för användning'
    },
    {
        title: 'Kommunikation:',
        description: 'Korrespondens med oss, samtycken, feedback och klagomål'
    }
]

const usagePurposes = [
    'För att kunna diagnostisera, behandla och vårda dig',
    'För att boka och administrera dina besök hos oss',
    'För att kommunicera med dig om din vård',
    'För att utveckla och förbättra våra tjänster',
    'För att uppfylla lagkrav inom hälso- och sjukvården',
    'För att hantera fakturering och betalningar'
]

const legalBases = [
    {
        title: 'Rättslig förpliktelse:',
        description: 'Vissa uppgifter måste vi hantera enligt lag (t.ex. patientjournal-lagen)'
    },
    {
        title: 'Allmänt intresse:',
        description: 'För att kunna bedriva hälso- och sjukvård'
    },
    {
        title: 'Samtycke:',
        description: 'När du aktivt har gett ditt samtycke till viss behandling'
    },
    {
        title: 'Avtal:',
        description: 'När behandlingen är nödvändig för att fullgöra ett avtal med dig'
    }
]

const sharing = [
    {
        title: 'Vårdpersonal:',
        description: 'Dina uppgifter delas med den vårdpersonal som är involverad i din behandling'
    },
    {
        title: 'Regionens journalsystem:',
        description: 'Din journal lagras i regionens gemensamma journalsystem'
    },
    {
        title: 'Myndigheter:',
        description: 'Vi delar information när vi är skyldiga enligt lag (t.ex. till Socialstyrelsen)'
    },
    {
        title: 'Vårdgivare:',
        description: 'Information kan delas med andra vårdgivare vid remisser eller samverkan'
    }
]

const securityMeasures = [
    'Alla system är skyddade med kryptering',
    'Endast behörig personal har tillgång till dina uppgifter',
    'Vi genomför regelbundna säkerhetskontroller',
    'All personal är bunden av tystnadsplikt'
]

const rights = [
    {
        title: 'Rätt att få information:',
        description: 'Du har rätt att veta vilka uppgifter vi behandlar om dig'
    },
    {
        title: 'Rätt till registerutdrag:',
        description: 'Du kan begära en kopia av dina personuppgifter'
    },
    {
        title: 'Rätt till rättelse:',
        description: 'Du kan begära att vi korrigerar felaktiga uppgifter'
    },
    {
        title: 'Rätt till radering:',
        description: 'I vissa fall kan du begära att dina uppgifter raderas'
    },
    {
        title: 'Rätt till dataportabilitet:',
        description: 'Du kan begära att få dina uppgifter i ett maskinläsbart format'
    },
    {
        title: 'Rätt att invända:',
        description: 'Du kan invända mot viss behandling av dina personuppgifter'
    }
]

const cookiesInfo = [
    {
        title: 'Nödvändiga kakor:',
        description: 'Grundläggande funktioner på webbplatsen kräver vissa kakor'
    },
    {
        title: 'Analyskakor:',
        description: 'Vi använder analysverktyg för att förstå hur webbplatsen används'
    },
    {
        title: 'Valfrihet:',
        description: 'Du kan välja att inte acceptera kakor via dina webbläsarinställningar'
    }
]

const contactDetails = [
    { title: 'Dataskyddsombud:', description: 'Anna Andersson' },
    { title: 'E-post:', description: 'dataskydd@vardcentralen.se' },
    { title: 'Telefon:', description: '08-123 456 78' },
    { title: 'Adress:', description: 'Vårdportalen, Storgatan 12, 123 45 Stockholm' }
]
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="ip__title">Integritetspolicy</h1>
            <p class="ip__intro">
                Den här integritetspolicyn beskriver hur vi samlar in, använder och skyddar dina
                personuppgifter när du använder vår webbplats och våra tjänster.
            </p>

            <AppCard title="Vilken information samlar vi in?" class="ip__section">
                <p class="ip__paragraph">
                    Vi samlar in olika typer av personuppgifter för att kunna erbjuda dig bästa
                    möjliga vård och service.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in collectedInfo"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Hur använder vi din information?" class="ip__section">
                <p class="ip__paragraph">
                    Vi använder dina personuppgifter för olika ändamål som är nödvändiga för att
                    kunna erbjuda vårdtjänster.
                </p>
                <ul class="stack-list">
                    <ListItem v-for="item in usagePurposes" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>

            <AppCard title="Rättslig grund för behandling" class="ip__section">
                <p class="ip__paragraph">
                    Vår behandling av dina personuppgifter baseras på olika rättsliga grunder enligt
                    GDPR.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in legalBases"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Delning av information" class="ip__section">
                <p class="ip__paragraph">
                    Vi delar dina personuppgifter endast när det är nödvändigt för att kunna
                    erbjuda vård och service.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in sharing"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Säkerhet" class="ip__section">
                <p class="ip__paragraph">
                    Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina
                    personuppgifter.
                </p>
                <ul class="stack-list">
                    <ListItem v-for="item in securityMeasures" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>

            <AppCard title="Dina rättigheter" class="ip__section">
                <p class="ip__paragraph">
                    Som registrerad har du flera rättigheter enligt GDPR.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in rights"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Kakor (Cookies)" class="ip__section">
                <p class="ip__paragraph">
                    Vår webbplats använder kakor för att förbättra användarupplevelsen och för
                    webbanalys.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in cookiesInfo"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Kontaktinformation" class="ip__section">
                <p class="ip__paragraph">
                    Om du har frågor om vår integritetspolicy eller hur vi behandlar dina
                    personuppgifter är du välkommen att kontakta oss.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in contactDetails"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
                <p class="ip__updated">Senast uppdaterad: 2023-11-15</p>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ip__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.ip__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.ip__section {
    margin-bottom: 1.5rem;
}

.ip__paragraph {
    margin: 0 0 1rem;
}

.ip__updated {
    margin: 1rem 0 0;
    color: var(--fkds-color-text-secondary);
}
</style>
