<script setup lang="ts">
import { ref } from 'vue'
import { FButton, FExpandableParagraph } from '@fkui/vue'
import AppCard from '@/components/display/AppCard.vue'
import InfoCard from '@/components/display/InfoCard.vue'
import ListItem from '@/components/display/ListItem.vue'
import RelatedLinksSidebar from '@/components/common/RelatedLinksSidebar.vue'
import { omOssSectionLinks } from '@/data/omOssSection'
import { getPage } from '@/content/pages'
import { mdInline } from '@/content/markdown'

// Generic view for CMS-edited pages: the route passes the content key as a
// prop (props: { content: 'faq' }) and the page structure renders from the
// matching YAML file in src/content/pages/. Layout and block styles are the
// common denominator of the original hand-written pages.
const props = defineProps<{ content: string }>()

const page = getPage(props.content)

const narrow = page.width === 'narrow' || page.sidebar

// One accordion item open at a time, page-wide (same behaviour as the
// original per-page accordions). Ids are generated from list positions.
const openId = ref<string | null>(null)

const toggle = (id: string) => {
    openId.value = openId.value === id ? null : id
}

const accordionId = (groupIndex: number, itemIndex: number) => `${groupIndex}-${itemIndex}`
</script>

<template>
    <div class="page" :class="{ 'page--sidebar': page.sidebar }">
        <div :class="{ page__narrow: narrow }">
            <h1 class="content-page__title">{{ page.title }}</h1>
            <p v-if="page.intro" class="content-page__intro" v-html="mdInline(page.intro)" />

            <div v-if="page.notice" class="content-page__notice">
                <p v-html="mdInline(page.notice)" />
            </div>

            <div v-if="page.infoCards?.length" class="grid grid--4 content-page__stats">
                <InfoCard
                    v-for="(card, index) in page.infoCards"
                    :key="index"
                    :title="card.title"
                    :content="card.content"
                />
            </div>

            <div v-if="page.accordion?.length" class="content-page__faq">
                <f-expandable-paragraph
                    v-for="(item, index) in page.accordion"
                    :key="index"
                    header-tag="h2"
                    :expanded="openId === accordionId(-1, index)"
                    @toggle="toggle(accordionId(-1, index))"
                >
                    <template #title>{{ item.title }}</template>
                    <template #default>
                        {{ item.content }}
                    </template>
                </f-expandable-paragraph>
            </div>

            <AppCard v-if="page.sectionsGrid">
                <p
                    v-if="page.sectionsGrid.intro"
                    class="content-page__paragraph content-page__grid-intro"
                    v-html="mdInline(page.sectionsGrid.intro)"
                />
                <div class="grid grid--2 content-page__grid-sections">
                    <div
                        v-for="(section, index) in page.sectionsGrid.sections"
                        :key="index"
                        class="content-page__grid-section"
                    >
                        <h2 class="content-page__grid-section-title">{{ section.title }}</h2>
                        <p
                            class="content-page__grid-section-text"
                            v-html="mdInline(section.text)"
                        />
                    </div>
                </div>
            </AppCard>

            <AppCard
                v-for="(section, sectionIndex) in page.sections"
                :key="sectionIndex"
                :title="section.title"
                class="content-page__section"
            >
                <p
                    v-for="(paragraph, index) in section.paragraphs"
                    :key="index"
                    class="content-page__paragraph"
                    v-html="mdInline(paragraph.text)"
                />

                <ul v-if="section.list?.length" class="stack-list">
                    <ListItem
                        v-for="(item, index) in section.list"
                        :key="index"
                        :title="item.title"
                        :description="item.description"
                    >
                        <template v-if="item.text && !item.title && !item.description">
                            <span v-html="mdInline(item.text)" />
                        </template>
                    </ListItem>
                </ul>

                <p
                    v-if="section.closing"
                    class="content-page__paragraph"
                    v-html="mdInline(section.closing)"
                />

                <div v-if="section.routes?.length" class="stack content-page__routes">
                    <div
                        v-for="(route, index) in section.routes"
                        :key="index"
                        class="content-page__route"
                        :class="route.tone ? `content-page__route--${route.tone}` : undefined"
                    >
                        <h3>{{ route.title }}</h3>
                        <p v-html="mdInline(route.text)" />
                    </div>
                </div>

                <div v-if="section.infoCards?.length" class="grid grid--3">
                    <InfoCard
                        v-for="(card, index) in section.infoCards"
                        :key="index"
                        :title="card.title"
                        :content="card.content"
                    />
                </div>

                <template v-if="section.accordion?.length">
                    <f-expandable-paragraph
                        v-for="(item, index) in section.accordion"
                        :key="index"
                        header-tag="h3"
                        :expanded="openId === accordionId(sectionIndex, index)"
                        @toggle="toggle(accordionId(sectionIndex, index))"
                    >
                        <template #title>{{ item.title }}</template>
                        <template #default>
                            {{ item.content }}
                        </template>
                    </f-expandable-paragraph>
                </template>

                <div v-if="section.cta" class="content-page__cta">
                    <router-link :to="section.cta.to" custom v-slot="{ navigate }">
                        <f-button size="medium" variant="primary" role="link" @click="navigate">
                            {{ section.cta.label }}
                        </f-button>
                    </router-link>
                </div>

                <p v-if="section.updated" class="content-page__updated">{{ section.updated }}</p>
            </AppCard>
        </div>

        <RelatedLinksSidebar v-if="page.sidebar" :links="omOssSectionLinks" />
    </div>
</template>

<style scoped lang="scss">
.content-page__title {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.875rem;
    font-weight: 600;
}

.content-page__intro {
    margin: 0 0 2rem;
    font-size: 1.125rem;
}

.content-page__notice {
    border-radius: var(--f-radius-border-radius-small, 0.5rem);
    border: 2px solid var(--fkds-color-feedback-border-info);
    background-color: var(--fkds-color-feedback-background-info);
    padding: 1rem;
    margin-bottom: 2rem;

    p {
        margin: 0;
        font-size: 0.875rem;
    }
}

.content-page__stats {
    margin-bottom: 1.5rem;
}

.content-page__faq {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.content-page__section {
    margin-bottom: 1.5rem;
}

.content-page__paragraph {
    margin: 0 0 1rem;

    &:last-child {
        margin-bottom: 0;
    }
}

.content-page__routes {
    margin-bottom: 1rem;
}

.content-page__route {
    border: 1px solid var(--fkds-color-border-primary);
    border-left-width: 4px;
    border-radius: var(--f-radius-border-radius-small, 0.25rem);
    padding: 1rem;

    h3 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
        font-weight: 600;
    }

    p {
        margin: 0;
    }

    &--clinic {
        border-left-color: var(--fkds-color-action-border-primary-default);
    }

    &--guide {
        border-left-color: var(--fkds-color-feedback-border-positive, currentColor);
    }

    &--acute {
        border-left-color: var(--fkds-color-feedback-border-negative, currentColor);
    }
}

.content-page__grid-intro {
    margin-bottom: 1.5rem;
}

.content-page__grid-section {
    border-left: 4px solid var(--fkds-color-action-border-primary-default);
    padding-left: 1rem;
}

.content-page__grid-section-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.content-page__grid-section-text {
    margin: 0;
    color: var(--fkds-color-text-secondary);
}

.content-page__cta {
    margin-top: 0.5rem;
}

.content-page__updated {
    margin: 1rem 0 0;
    color: var(--fkds-color-text-secondary);
}

// Content links are rendered with v-html, so scoped styles need :deep().
.content-page :deep(a) {
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
