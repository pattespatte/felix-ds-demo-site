<script setup lang="ts">
import { FButton, FIcon } from '@fkui/vue'
import AppCard from '@/components/display/AppCard.vue'
import ListItem from '@/components/display/ListItem.vue'

const guidelines = [
    {
        title: 'Akut livshotande tillstånd:',
        description: 'Ring 112 direkt'
    },
    {
        title: 'Akuta besvär som inte kan vänta:',
        description: 'Kontakta 1177 eller akutmottagning'
    },
    {
        title: 'Besvär som kan vänta till nästa dag:',
        description: 'Kontakta vår vårdcentral'
    },
    {
        title: 'Egen vård:',
        description: 'Många vanliga besvär kan du behandla själv'
    }
]

const conditions = [
    {
        title: 'Förkylning och influensa',
        description:
            'Förkylning och influensa orsakas av virus och går oftast över av sig själv. Vila och mycket vätska är den bästa behandlingen.',
        seekCareIf: [
            'Du får hög feber som inte sjunker',
            'Du har andningsbesvär',
            'Du blir mycket sämre efter några dagar'
        ]
    },
    {
        title: 'Mag- och tarminfektioner',
        description:
            'Mag- och tarminfektioner (magsjuka) orsakas oftast av virus eller bakterier. Det är viktigt att dricka mycket vätska för att undvika uttorkning.',
        seekCareIf: [
            'Du har tecken på uttorkning (torr i munnen, mindre urin)',
            'Du har blod i avföringen',
            'Du har hög feber'
        ]
    },
    {
        title: 'Hudproblem',
        description:
            'Eksem, psoriasis och andra hudproblem kan ofta behandlas med receptfria produkter. Undvik att använda starka tvålparfymer.',
        seekCareIf: [
            'Hudproblemet inte förbättras med egenvård',
            'Du har infektionssymptom (rodnad, svullnad, värme)',
            'Du har sår som inte läker'
        ]
    },
    {
        title: 'Smärta i leder och muskler',
        description:
            'Led- och muskelsmärta kan bero på många orsaker, till exempel överbelastning, inflammation eller ålder.',
        seekCareIf: [
            'Smärtan är mycket kraftig eller plötslig',
            'Du har feber samtidigt',
            'Leden är svullen, röd och varm'
        ]
    }
]

const selfCareAdvice = [
    { title: 'Vila:', description: 'Ge kroppen tid att läka' },
    { title: 'Vätska:', description: 'Drick mycket vatten, särskilt vid feber' },
    {
        title: 'Receptfria läkemedel:',
        description: 'Använd enligt anvisning på förpackningen'
    },
    { title: 'Kyla eller värme:', description: 'Kyla vid svullnad, värme vid muskelsmärta' },
    { title: 'Elevera:', description: 'Lägg benen i högläge vid svullnad' }
]
</script>

<template>
    <div class="page">
        <div class="page__intro">
            <h1 class="guide__title">Vårdguide</h1>
            <p class="guide__intro">
                I vår vårdguide hittar du information om vanliga sjukdomar och besvär, samt råd om
                när du ska söka vård. Informationen är ett komplement till 1177 Vårdguiden.
            </p>
        </div>

        <AppCard title="När ska jag söka vård?" class="guide__section">
            <p class="guide__paragraph">
                Det kan vara svårt att veta när man ska söka vård och var man ska vända sig. Här är
                några riktlinjer:
            </p>
            <ul class="stack-list">
                <ListItem
                    v-for="item in guidelines"
                    :key="item.title"
                    :title="item.title"
                    :description="item.description"
                />
            </ul>
        </AppCard>

        <div class="grid grid--2 guide__conditions">
            <AppCard v-for="condition in conditions" :key="condition.title" :title="condition.title">
                <p class="guide__paragraph">{{ condition.description }}</p>
                <p class="guide__seek-care-label">Sök vård om:</p>
                <ul class="stack-list">
                    <ListItem v-for="item in condition.seekCareIf" :key="item">{{ item }}</ListItem>
                </ul>
            </AppCard>
        </div>

        <AppCard title="Egenvårdsråd" class="guide__section">
            <p class="guide__paragraph">
                För många vanliga besvär kan du själv göra mycket för att lindra symtomen:
            </p>
            <ul class="stack-list">
                <ListItem
                    v-for="item in selfCareAdvice"
                    :key="item.title"
                    :title="item.title"
                    :description="item.description"
                />
            </ul>
        </AppCard>

        <AppCard title="Mer information" class="guide__section">
            <p class="guide__paragraph">
                För mer detaljerad information om sjukdomar och besvär, besök 1177 Vårdguidens
                webbplats.
            </p>
            <a
                href="https://www.1177.se"
                target="_blank"
                rel="noopener noreferrer"
                class="guide__link"
            >
                Besök 1177 Vårdguiden
                <f-icon name="new-window" class="guide__link-icon" />
                <span class="sr-only">(öppnas i nytt fönster)</span>
            </a>
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
.guide__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.guide__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.guide__section {
    margin-bottom: 1.5rem;
}

.guide__conditions {
    margin-bottom: 1.5rem;
}

.guide__paragraph {
    margin: 0 0 1rem;
}

.guide__seek-care-label {
    margin: 0 0 0.5rem;
    font-weight: 600;
}

.guide__link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-action-text-inverted-default);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;

    // Restate the colour on hover: the theme's `:root a:hover` outranks the
    // base rule and would paint the dark link colour on this dark fill.
    &:hover {
        color: var(--fkds-color-action-text-inverted-default);
        background-color: var(--fkds-color-action-background-primary-hover);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.guide__link-icon {
    width: 1rem;
    height: 1rem;
}
</style>
