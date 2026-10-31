<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FButton, FMessageBox } from '@fkui/vue'
import SearchBox from '@/components/interactive/SearchBox.vue'
import AppCard from '@/components/display/AppCard.vue'
import PageIntro from '@/components/common/PageIntro.vue'

const router = useRouter()

// Popular pages/services that users might be looking for
const popularPages = [
    {
        name: 'Boka tid',
        path: '/boka-tid',
        description: 'Boka tid hos läkare eller sjuksköterska'
    },
    {
        name: 'Mottagningar',
        path: '/mottagningar',
        description: 'Hitta rätt mottagning för ditt behov'
    },
    {
        name: 'Vårdguide',
        path: '/vardguide',
        description: 'Information om sjukdomar och behandlingar'
    },
    {
        name: 'Kontakt',
        path: '/kontakt',
        description: 'Kontaktuppgifter och öppettider'
    },
    {
        name: 'Mina sidor',
        path: '/mina-sidor',
        description: 'Logga in för att se dina vårdärenden'
    },
    {
        name: 'Frågor och svar',
        path: '/fragor-och-svar',
        description: 'Vanliga frågor om vården'
    }
]

// Navigate to home page
const goToHome = () => {
    router.push('/')
}

// Navigate to a specific page
const navigateToPage = (path: string) => {
    router.push(path)
}
</script>

<template>
    <div class="page">
        <div class="page__narrow nf__narrow">
            <!-- 404 message -->
            <page-intro
                title="Sidan kunde inte hittas"
                intro="Tyvärr, sidan du letar efter finns inte. Sidan kan ha flyttats, tagits bort eller så har du angett felaktig webbadress. Du kan använda sökfunktionen nedan eller välja en av våra populära sidor."
            />

            <!-- Search Box (submits to the search results page) -->
            <div class="nf__search">
                <SearchBox
                    placeholder="Leta vidare..."
                    size="large"
                    :show-search-button="true"
                    aria-label="Sök på webbplatsen"
                />
            </div>

            <!-- Back to Home Button -->
            <div class="nf__home">
                <f-button size="medium" variant="primary" @click="goToHome">
                    Till startsidan
                </f-button>
            </div>

            <!-- Popular Pages Section -->
            <AppCard class="nf__popular">
                <h2 class="nf__popular-title">Populära sidor</h2>

                <div class="grid grid--2">
                    <router-link
                        v-for="page in popularPages"
                        :key="page.path"
                        :to="page.path"
                        class="nf__page"
                        @click="navigateToPage(page.path)"
                    >
                        <h3 class="nf__page-name">{{ page.name }}</h3>
                        <p class="nf__page-description">{{ page.description }}</p>
                    </router-link>
                </div>
            </AppCard>

            <!-- Contact Information -->
            <f-message-box type="info" class="nf__help">
                <template #default="{ headingSlotClass }">
                    <h2 :class="headingSlotClass" class="nf__help-title">Behöver du hjälp?</h2>
                    <p class="nf__help-text">
                        Om du inte hittar det du söker kan du kontakta oss:
                    </p>
                    <div class="nf__help-links">
                        <a href="tel:+46812345678" class="nf__help-link"> 08-123 456 78 </a>
                        <a href="mailto:info@vardcentralen.se" class="nf__help-link">
                            info@vardcentralen.se
                        </a>
                    </div>
                </template>
            </f-message-box>
        </div>
    </div>
</template>

<style scoped>
.nf__narrow {
  text-align: center;
}

.nf__search {
  margin: 0 auto 2rem;
  text-align: left;
}

.nf__home {
  margin-bottom: 3rem;
}

.nf__popular {
  text-align: left;
}

.nf__popular-title {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.nf__page {
  display: block;
  border: 1px solid var(--fkds-color-border-primary);
  border-radius: var(--f-radius-border-radius-small, 0.5rem);
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}
.nf__page:hover {
  border-color: var(--fkds-color-action-border-primary-hover);
  box-shadow: var(--f-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.2));
}
.nf__page:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

.nf__page-name {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--fkds-color-action-text-primary-default);
}

.nf__page-description {
  margin: 0;
  font-size: 0.875rem;
  color: var(--fkds-color-text-secondary);
}

.nf__help {
  margin-top: 2.5rem;
}

.nf__help-title {
  margin: 0 0 0.75rem;
}

.nf__help-text {
  margin: 0 0 1rem;
}

.nf__help-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.nf__help-link {
  font-weight: 600;
  color: var(--fkds-color-action-text-primary-default);
}
.nf__help-link:hover {
  text-decoration: underline;
}
.nf__help-link:focus-visible {
  outline: none;
  box-shadow: var(--f-focus-box-shadow);
}

</style>
