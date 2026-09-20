<script setup lang="ts">
// Footer content copied verbatim from the source site. Icons that had no
// semantic equivalent in the default FKUI icon library are rendered as plain
// text labels instead (look-and-feel only).
const footerNavLinks = [
    { name: 'Start', path: '/' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Tjänster', path: '/tjanster' },
    { name: 'Mottagningar', path: '/mottagningar' },
    { name: 'Patientinformation', path: '/patientinformation' },
    { name: 'Boka tid', path: '/boka-tid' },
    { name: 'Kontakt', path: '/kontakt' },
    { name: 'Jobba hos oss', path: '/om-oss/jobba-hos-oss' }
]

// Contact information
const contactInfo = {
    address: 'Storgatan 12, 123 45 Stockholm',
    phone: '08-123 456 78',
    email: 'info@vardcentralen.se'
}

// Opening hours
const openingHours = [
    { day: 'Måndag-Fredag', hours: '08:00 - 17:00' },
    { day: 'Lördag', hours: '09:00 - 13:00' },
    { day: 'Söndag', hours: 'Stängt' }
]

// Social media links (labels only – no brand glyphs in the icon library)
const socialLinks = [
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' }
]

// Current year for copyright
const currentYear = new Date().getFullYear()

// Format phone number for tel: link
const formatPhoneLink = (phone: string): string => {
    if (!phone) {
        return ''
    }

    // Remove all non-digit characters
    let digits = phone.replace(/\D/g, '')

    // If the number starts with 0 (Swedish domestic format), replace with +46
    if (digits.startsWith('0')) {
        digits = `46${digits.substring(1)}`
    }
    // If the number doesn't start with country code, assume Swedish number
    else if (!digits.startsWith('46')) {
        digits = `46${digits}`
    }

    return `tel:+${digits}`
}
</script>

<template>
    <footer class="app-footer" role="contentinfo">
        <div class="app-footer__inner">
            <div class="app-footer__grid">
                <!-- Site Navigation -->
                <div>
                    <h3 class="app-footer__heading">Navigering</h3>
                    <nav class="app-footer__nav" aria-label="Sidfotsnavigering">
                        <router-link
                            v-for="link in footerNavLinks"
                            :key="link.path"
                            :to="link.path"
                            class="app-footer__nav-link"
                        >
                            {{ link.name }}
                        </router-link>
                    </nav>
                </div>

                <!-- Contact Information -->
                <div>
                    <h3 class="app-footer__heading">Kontakt</h3>
                    <address class="app-footer__address">
                        <p class="app-footer__contact-row">{{ contactInfo.address }}</p>
                        <p class="app-footer__contact-row">
                            <a
                                :href="formatPhoneLink(contactInfo.phone)"
                                class="app-footer__contact-link"
                            >
                                {{ contactInfo.phone }}
                            </a>
                        </p>
                        <p class="app-footer__contact-row">
                            <a :href="`mailto:${contactInfo.email}`" class="app-footer__contact-link">
                                {{ contactInfo.email }}
                            </a>
                        </p>
                    </address>
                </div>

                <!-- Opening Hours -->
                <div>
                    <h3 class="app-footer__heading">Öppettider</h3>
                    <p class="app-footer__hours-title">Våra öppettider</p>
                    <dl class="app-footer__hours">
                        <template v-for="(item, index) in openingHours" :key="index">
                            <dt class="app-footer__hours-day">{{ item.day }}</dt>
                            <dd class="app-footer__hours-time">{{ item.hours }}</dd>
                        </template>
                    </dl>
                </div>

                <!-- Social Media -->
                <div>
                    <h3 class="app-footer__heading app-footer__heading--right">Följ oss</h3>
                    <ul class="app-footer__social">
                        <li v-for="link in socialLinks" :key="link.name">
                            <a
                                :href="link.url"
                                class="app-footer__social-link"
                                :aria-label="`Följ oss på ${link.name}`"
                            >
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="app-footer__bottom">
                <div class="app-footer__copyright">
                    &copy; {{ currentYear }} Vårdportalen. Alla rättigheter förbehålls.
                </div>
                <ul class="app-footer__legal">
                    <li>
                        <a
                            href="https://github.com/pattespatte/felix-ds-demo-site"
                            class="app-footer__legal-link"
                        >
                            Källkod
                        </a>
                    </li>
                    <li>
                        <router-link to="/integritetspolicy" class="app-footer__legal-link">
                            Integritetspolicy
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cookies" class="app-footer__legal-link">
                            Cookies
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/tillganglighet" class="app-footer__legal-link">
                            Tillgänglighet
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
// Dark navy footer on the theme's primary action surface (near-identical to
// the reference navy). Text and links use the inverted tokens, so the footer
// keeps its dark look in both color modes while every value stays a token.
//
// Every link restates its colour on hover: the theme's `:root a:hover`
// (0,2,1) outranks the scoped base rule (0,2,0) and would otherwise paint
// the dark link colour on this dark surface. The scoped hover rule ties on
// specificity and wins by load order (component styles come after the
// entry stylesheet in dev and production alike).
.app-footer {
    background-color: var(--fkds-color-action-background-primary-default);
    color: var(--fkds-color-text-inverted);
    margin-top: auto;
}

.app-footer__inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 1.5rem 1rem;
}

.app-footer__grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;

    @media (min-width: 48rem) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 64rem) {
        grid-template-columns: repeat(4, 1fr);
    }
}

.app-footer__heading {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    font-weight: 600;

    &--right {
        @media (min-width: 64rem) {
            text-align: right;
        }
    }
}

.app-footer__nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 64rem) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem 1rem;
    }
}

.app-footer__nav-link {
    font-size: 0.875rem;
    text-decoration: none;
    color: var(--fkds-color-text-inverted);

    &:hover {
        color: var(--fkds-color-text-inverted);
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-footer__address {
    font-style: normal;
    margin: 0;
}

.app-footer__contact-row {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
}

.app-footer__contact-link {
    color: var(--fkds-color-text-inverted);

    &:hover {
        color: var(--fkds-color-text-inverted);
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-footer__hours-title {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
}

.app-footer__hours {
    margin: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 1rem;
    font-size: 0.875rem;
}

.app-footer__hours-day {
    margin: 0;
}

.app-footer__hours-time {
    margin: 0;
    text-align: right;
}

.app-footer__social {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;

    @media (min-width: 64rem) {
        justify-content: flex-end;
    }
}

.app-footer__social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--fkds-color-border-inverted);
    font-size: 0.75rem;
    text-decoration: none;
    color: var(--fkds-color-text-inverted);

    &:hover {
        color: var(--fkds-color-text-inverted);
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}

.app-footer__bottom {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--fkds-color-border-inverted);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    @media (min-width: 48rem) {
        flex-direction: row;
        justify-content: space-between;
    }
}

.app-footer__copyright {
    font-size: 0.75rem;
    color: var(--fkds-color-text-inverted);
}

.app-footer__legal {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1.5rem;
}

.app-footer__legal-link {
    font-size: 0.75rem;
    color: var(--fkds-color-text-inverted);
    text-decoration: none;

    &:hover {
        color: var(--fkds-color-text-inverted);
        text-decoration: underline;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--f-focus-box-shadow);
    }
}
</style>
