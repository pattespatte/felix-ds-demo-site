<script setup lang="ts">
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'

const websiteFeatures = [
    'Använda skärmläsare för att navigera',
    'Zooma in och ut på sidorna utan att innehållet försvinner',
    'Navigera med tangentbordet',
    'Få god kontrast mellan text och bakgrund'
]

const knownIssues = [
    'Vissa PDF-dokument saknar text som kan läsas av skärmläsare',
    'Vissa bilder saknar alt-texter',
    'Vissa formulär kan vara svåra att navigera med tangentbordet'
]

const reportChannels = [
    'E-post: tillganglighet@vardcentralen.se',
    'Telefon: 08-123 456 78',
    'Post: Vårdportalen, Storgatan 12, 123 45 Stockholm'
]

const premisesFeatures = [
    { title: 'Entré:', description: 'Rullstolsanpassad ingång utan trappor' },
    { title: 'Parkering:', description: 'Handikapparkering finns nära ingången' },
    { title: 'Toaletter:', description: 'Handikappanpassad toalett finns i bottenvåningen' },
    { title: 'Hiss:', description: 'Hiss finns mellan våningarna' },
    { title: 'Rullstol:', description: 'Vi har rullstolar att låna ut vid behov' },
    {
        title: 'Hörselslinga:',
        description: 'Hörselslinga finns i receptionen och i några av våra mottagningsrum'
    }
]

const aids = [
    'Tolk (teckenspråk eller andra språk)',
    'Texttelefon',
    'Material i punktskrift eller med förstorad text'
]
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="tfgh__title">Tillgänglighet</h1>
            <p class="tfgh__intro">
                Vi strävar efter att vår webbplats och vår vårdcentral ska vara tillgänglig för
                alla. Här hittar du information om tillgängligheten på vår webbplats och i våra
                lokaler.
            </p>

            <AppCard title="Tillgänglighet på webbplatsen" class="tfgh__section">
                <p class="tfgh__paragraph">
                    Vi arbetar kontinuerligt för att förbättra tillgängligheten på vår webbplats
                    och följer riktlinjerna för Web Content Accessibility Guidelines (WCAG) 2.1 på
                    nivå AA.
                </p>
                <p class="tfgh__paragraph">På vår webbplats kan du:</p>
                <ul class="stack-list">
                    <ListItem v-for="item in websiteFeatures" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>

            <AppCard title="Bristande tillgänglighet" class="tfgh__section">
                <p class="tfgh__paragraph">
                    Vi är medvetna om att det finns delar av vår webbplats som inte är fullt
                    tillgängliga för alla användare. Vi arbetar för att åtgärda dessa brister.
                </p>
                <p class="tfgh__paragraph">Kända brister:</p>
                <ul class="stack-list">
                    <ListItem v-for="item in knownIssues" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>

            <AppCard title="Rapportera brister i tillgänglighet" class="tfgh__section">
                <p class="tfgh__paragraph">
                    Om du upptäcker brister i webbplatsens tillgänglighet är vi tacksamma om du
                    rapporterar det till oss. Beskriv så detaljerat som möjligt vilket innehåll det
                    gäller och vilket problem du har upptäckt.
                </p>
                <p class="tfgh__paragraph">Du kan kontakta oss via:</p>
                <ul class="stack-list">
                    <ListItem v-for="item in reportChannels" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>

            <AppCard title="Tillgänglighet i våra lokaler" class="tfgh__section">
                <p class="tfgh__paragraph">
                    Vår vårdcentral är anpassad för att vara tillgänglig för personer med
                    funktionsnedsättning.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in premisesFeatures"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Tolk och hjälpmedel" class="tfgh__section">
                <p class="tfgh__paragraph">
                    Om du behöver tolk eller har behov av andra hjälpmedel vid ditt besök, meddela
                    oss när du bokar tid så att vi kan förbereda detta.
                </p>
                <p class="tfgh__paragraph">Vi kan hjälpa till med:</p>
                <ul class="stack-list">
                    <ListItem v-for="item in aids" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>

            <AppCard title="Tillsynsmyndighet" class="tfgh__section">
                <p class="tfgh__paragraph">
                    Om du inte är nöjd med hur vi hanterar dina synpunkter på tillgänglighet kan du
                    kontakta Myndigheten för digital förvaltning (DIGG) och påtala bristen.
                </p>
                <p class="tfgh__paragraph">Myndigheten för digital förvaltning (DIGG)</p>
                <ul class="stack-list">
                    <ListItem>Box 12345</ListItem>
                    <ListItem>123 45 Stockholm</ListItem>
                    <ListItem>Telefon: 08-578 287 00</ListItem>
                    <ListItem>
                        Webbplats:
                        <a
                            href="https://digg.se"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="tfgh__link"
                        >
                            digg.se</a
                        >
                        <span class="sr-only">(öppnas i nytt fönster)</span>
                    </ListItem>
                </ul>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tfgh__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.tfgh__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.tfgh__section {
    margin-bottom: 1.5rem;
}

.tfgh__paragraph {
    margin: 0 0 1rem;
}

.tfgh__link {
    color: var(--fkds-color-action-text-primary-default);

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
