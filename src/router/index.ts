import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Routes and meta copied verbatim from the source site; the four internal
// styleguide routes (/components, /colors, /phosphor-icons, /health-icons)
// are dropped – the felix-ds playground fills that role.
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            title: 'Vårdcentralen Vårdportalen DEMOWEBB - Start',
            description: 'Boka tid, kontakta vården och hantera dina vårdärenden'
        }
    },
    {
        path: '/om-oss',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: {
            title: 'Om Oss - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om Vårdcentralen Vårdportalen och vår verksamhet'
        }
    },
    {
        path: '/om-oss/jobba-hos-oss',
        name: 'JobbaHosOss',
        component: () => import('@/views/JobbaHosOssPage.vue'),
        meta: {
            title: 'Jobba Hos Oss - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Lediga tjänster och karriärmöjligheter inom vården'
        }
    },
    {
        path: '/om-oss/lediga-tjanster',
        name: 'LedigaTjanster',
        component: () => import('@/views/LedigaTjansterPage.vue'),
        meta: {
            title: 'Lediga Tjänster - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Se alla lediga tjänster inom svensk vård'
        }
    },
    {
        path: '/om-oss/formaner',
        name: 'Formaner',
        component: () => import('@/views/FormanerPage.vue'),
        meta: {
            title: 'Formaner - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Ansök till utbildningar och tjänster inom vården'
        }
    },
    {
        path: '/om-oss/karriarvagar',
        name: 'Karriarvagar',
        component: () => import('@/views/KarriarvagarPage.vue'),
        meta: {
            title: 'Karriär - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Karriärmöjligheter och utvecklingsmöjligheter'
        }
    },
    {
        path: '/tjanster',
        name: 'Services',
        component: () => import('@/views/ServicesPage.vue'),
        meta: {
            title: 'Tjänster - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Våra tjänster och behandlingar'
        }
    },
    {
        path: '/tjanster/specialistmottagningar',
        name: 'Specialistmottagningar',
        component: () => import('@/views/SpecialistmottagningarPage.vue'),
        meta: {
            title: 'Specialistmottagningar - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Specialiserad vård och mottagning'
        }
    },
    {
        path: '/tjanster/labbprov',
        name: 'Labbprov',
        component: () => import('@/views/LabbprovPage.vue'),
        meta: {
            title: 'Labbprov - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om laboratorieprov och analyser'
        }
    },
    {
        path: '/tjanster/hemsjukvard',
        name: 'Hemsjukvard',
        component: () => import('@/views/HemsjukvardPage.vue'),
        meta: {
            title: 'Hemsjukvård - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Vård och behandling i hemmet'
        }
    },
    {
        path: '/kontakt',
        name: 'Contact',
        component: () => import('@/views/ContactPage.vue'),
        meta: {
            title: 'Kontakt - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Kontaktuppgifter och kontaktinformation'
        }
    },
    {
        path: '/fragor-och-svar',
        name: 'FAQ',
        component: () => import('@/views/FaqPage.vue'),
        meta: {
            title: 'FAQ - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Vanliga frågor och svar om vården'
        }
    },
    {
        path: '/vardguide',
        name: 'HealthcareGuide',
        component: () => import('@/views/HealthcareGuidePage.vue'),
        meta: {
            title: 'Vårdguide - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Guide till svensk vård'
        }
    },
    {
        path: '/boka-tid',
        name: 'BookAppointment',
        component: () => import('@/views/BookAppointmentPage.vue'),
        meta: {
            title: 'Boka Tid - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Boka tid hos läkare och mottagningar'
        }
    },
    {
        path: '/boka-tid/form',
        name: 'BookingForm',
        component: () => import('@/views/BookingFormPage.vue'),
        meta: {
            title: 'Boka tid - Planerat besök - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Formulär för att boka en tid för ett planerat vårdbesök'
        }
    },
    {
        path: '/mina-sidor',
        name: 'MyPages',
        component: () => import('@/views/MyPagesPage.vue'),
        meta: {
            title: 'Mina Sidor - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Personlig vårdinformation och journaler'
        }
    },
    {
        path: '/tillganglighet',
        name: 'Accessibility',
        component: () => import('@/views/AccessibilityPage.vue'),
        meta: {
            title: 'Tillgänglighet - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om tillgänglighet och rättigheter'
        }
    },
    {
        path: '/mottagningar',
        name: 'Mottagningar',
        component: () => import('@/views/MottagningarPage.vue'),
        meta: {
            title: 'Mottagningar - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Våra mottagningar och specialistkliniker'
        }
    },
    {
        path: '/patientinformation',
        name: 'Patientinformation',
        component: () => import('@/views/PatientinformationPage.vue'),
        meta: {
            title: 'Patientinformation - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om patientdata och journaler'
        }
    },
    {
        path: '/patientinformation/vardgaranti',
        name: 'Vardgaranti',
        component: () => import('@/views/VardgarantiPage.vue'),
        meta: {
            title: 'Vårdgaranti - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om vårdgaranti och dina rättigheter'
        }
    },
    {
        path: '/patientinformation/avgifter',
        name: 'Avgifter',
        component: () => import('@/views/AvgifterPage.vue'),
        meta: {
            title: 'Avgifter - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om avgifter och kostnader'
        }
    },
    {
        path: '/patientinformation/din-vardkontakt',
        name: 'DinVardkontakt',
        component: () => import('@/views/DinVardkontaktPage.vue'),
        meta: {
            title: 'Din Vårdkontakt - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Dina personliga vårdkontakter och journaler'
        }
    },
    {
        path: '/integritetspolicy',
        name: 'Integritetspolicy',
        component: () => import('@/views/IntegritetspolicyPage.vue'),
        meta: {
            title: 'Integritetspolicy - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Policy för hantering av personuppgifter och integritet'
        }
    },
    {
        path: '/cookies',
        name: 'Cookies',
        component: () => import('@/views/CookiesPage.vue'),
        meta: {
            title: 'Cookies - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om cookies och användarvillkor'
        }
    },
    {
        path: '/sok',
        name: 'SearchResults',
        component: () => import('@/views/SearchResultsPage.vue'),
        meta: {
            title: 'Sökresultat - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Sökresultat för din sökning'
        }
    },
    {
        // Catch all 404 routes
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundPage.vue'),
        meta: {
            title: 'Sidan hittades inte - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Sidan du letar efter kunde inte hittas'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL || '/'),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition ?? { top: 0 }
    }
})

export { routes }
export default router
