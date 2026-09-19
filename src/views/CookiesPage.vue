<script setup lang="ts">
import { FDataTable, FTableColumn, FTableColumnType } from '@fkui/vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'

const cookieTypes = [
    {
        title: 'Nödvändiga cookies:',
        description:
            'Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De möjliggör grundläggande funktioner som sidnavigering, åtkomst till säkra områden och hantering av dina bokningar.'
    },
    {
        title: 'Funktionella cookies:',
        description:
            'Dessa cookies hjälper webbplatsen att komma ihåg dina val och preferenser, såsom språkinställningar eller inloggningsinformation, för att ge dig en mer personlig upplevelse.'
    },
    {
        title: 'Analyscookies:',
        description:
            'Dessa cookies hjälper oss att förstå hur besökare använder vår webbplats genom att samla in och rapportera information anonymt. Detta hjälper oss att förbättra webbplatsens prestanda och användbarhet.'
    },
    {
        title: 'Marknadsföringscookies:',
        description:
            'Dessa cookies används för att leverera annonser som är relevanta för dig och dina intressen. De kan också användas för att mäta effektiviteten av reklamkampanjer.'
    }
]

// Cookie table (verbatim from the source site)
const cookieRows = [
    {
        id: 'session_id',
        name: 'session_id',
        type: 'Nödvändig',
        duration: 'Session',
        purpose: 'Hanterar din inloggningssession'
    },
    {
        id: 'csrf_token',
        name: 'csrf_token',
        type: 'Nödvändig',
        duration: 'Session',
        purpose: 'Skyddar mot CSRF-attacker'
    },
    {
        id: 'language_preference',
        name: 'language_preference',
        type: 'Funktionell',
        duration: '1 år',
        purpose: 'Kommer ihåg ditt språkval'
    },
    {
        id: '_ga',
        name: '_ga',
        type: 'Analys',
        duration: '2 år',
        purpose: 'Google Analytics för statistik'
    },
    {
        id: '_gid',
        name: '_gid',
        type: 'Analys',
        duration: '24 timmar',
        purpose: 'Google Analytics för statistik'
    }
]

const choices = [
    {
        title: 'Acceptera alla cookies:',
        description:
            'Du kan välja att acceptera alla cookies för den bästa upplevelsen på vår webbplats.'
    },
    {
        title: 'Avvisa icke-nödvändiga cookies:',
        description:
            'Du kan välja att endast acceptera nödvändiga cookies och avvisa alla andra.'
    },
    {
        title: 'Anpassa dina inställningar:',
        description: 'Du kan välja vilka typer av cookies du vill acceptera eller avvisa.'
    },
    {
        title: 'Hantera cookies i din webbläsare:',
        description:
            'Du kan när som helst radera eller blockera cookies genom att ändra inställningarna i din webbläsare.'
    }
]

const browserInstructions = [
    {
        title: 'Chrome:',
        description: 'Gå till Inställningar → Sekretess och säkerhet → Cookies och andra webbplatsdata'
    },
    {
        title: 'Firefox:',
        description: 'Gå till Inställningar → Sekretess och säkerhet → Cookies och webbplatsdata'
    },
    {
        title: 'Safari:',
        description: 'Gå till Inställningar → Sekretess → Hantera webbplatsdata'
    },
    {
        title: 'Edge:',
        description:
            'Gå till Inställningar → Sekretess, sökning och tjänster → Cookies och webbplatsbehörigheter'
    }
]

const contactDetails = [
    { title: 'E-post:', description: 'dataskydd@vardcentralen.se' },
    { title: 'Telefon:', description: '08-123 456 78' },
    { title: 'Adress:', description: 'Vårdportalen, Storgatan 12, 123 45 Stockholm' }
]
</script>

<template>
    <div class="page">
        <div class="page__narrow">
            <h1 class="ck__title">Cookies</h1>
            <p class="ck__intro">
                Denna sida förklarar hur vår webbplats använder cookies (kakor) och vilka val du
                har gällande dem.
            </p>

            <AppCard title="Vad är cookies?" class="ck__section">
                <p class="ck__paragraph">
                    Cookies är små textfiler som lagras på din enhet (dator, mobil eller surfplatta)
                    när du besöker en webbplats. De hjälper webbplatsen att komma ihåg information
                    om ditt besök och kan förbättra din användarupplevelse.
                </p>
                <p class="ck__paragraph">
                    Cookies används av de flesta webbplatser idag och är vanligtvis ofarliga. De
                    kan inte innehålla virus eller skadlig kod och kan inte användas för att
                    identifiera dig personligen.
                </p>
            </AppCard>

            <AppCard title="Hur vi använder cookies" class="ck__section">
                <p class="ck__paragraph">
                    Vi använder olika typer av cookies för olika ändamål på vår webbplats:
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in cookieTypes"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Specifika cookies vi använder" class="ck__section">
                <p class="ck__paragraph">
                    Nedan listas de specifika cookies som används på vår webbplats och deras syfte:
                </p>
                <f-data-table :rows="cookieRows" key-attribute="id">
                    <template #caption> Cookies på webbplatsen </template>
                    <template #default="{ row }">
                        <f-table-column title="Cookie-namn" row-header :type="FTableColumnType.TEXT">
                            {{ row.name }}
                        </f-table-column>
                        <f-table-column title="Typ" :type="FTableColumnType.TEXT">
                            {{ row.type }}
                        </f-table-column>
                        <f-table-column title="Lagringstid" :type="FTableColumnType.TEXT">
                            {{ row.duration }}
                        </f-table-column>
                        <f-table-column title="Syfte" :type="FTableColumnType.TEXT" expand>
                            {{ row.purpose }}
                        </f-table-column>
                    </template>
                </f-data-table>
            </AppCard>

            <AppCard title="Dina val och rättigheter" class="ck__section">
                <p class="ck__paragraph">
                    Du har flera alternativ när det gäller cookies på vår webbplats:
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in choices"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
            </AppCard>

            <AppCard title="Hur du hanterar cookies i din webbläsare" class="ck__section">
                <p class="ck__paragraph">
                    Most web browsers allow you to control cookies through their settings. Here's
                    how you can manage cookies in the most common browsers:
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in browserInstructions"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
                <p class="ck__note">
                    Observera att om du blockerar eller raderar cookies kan vissa funktioner på vår
                    webbplatis sluta fungera korrekt.
                </p>
            </AppCard>

            <AppCard title="Uppdateringar av vår cookie-policy" class="ck__section">
                <p class="ck__paragraph">
                    Vi kan komma att uppdatera denna cookie-policy från tid till annan för att
                    återspegla ändringar i vår användning av cookies eller av juridiska skäl.
                    Eventuella ändringar kommer att publiceras på denna sida med uppdaterat datum.
                </p>
                <p class="ck__paragraph">
                    Vi rekommenderar att du regelbundet granskar denna sida för att hålla dig
                    informerad om vår användning av cookies.
                </p>
            </AppCard>

            <AppCard title="Kontaktinformation" class="ck__section">
                <p class="ck__paragraph">
                    Om du har frågor om vår användning av cookies eller denna policy är du välkommen
                    att kontakta oss.
                </p>
                <ul class="stack-list">
                    <ListItem
                        v-for="item in contactDetails"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                    />
                </ul>
                <p class="ck__updated">Senast uppdaterad: 2023-11-15</p>
            </AppCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ck__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.ck__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.ck__section {
    margin-bottom: 1.5rem;
}

.ck__paragraph {
    margin: 0 0 1rem;
}

.ck__note {
    margin: 1rem 0 0;
}

.ck__updated {
    margin: 1rem 0 0;
    color: var(--fkds-color-text-secondary);
}
</style>
