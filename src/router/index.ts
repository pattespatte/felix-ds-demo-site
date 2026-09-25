import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title: string
        description: string
        /** FKUI components rendered by the view (see ComponentNote.vue). */
        components?: string[]
    }
}

// Routes and meta copied verbatim from the source site; the four internal
// styleguide routes (/components, /colors, /phosphor-icons, /health-icons)
// are dropped – the felix-ds playground fills that role. The `components`
// meta lists the FKUI components each page renders, including those inside
// the shared display components (AppCard → FCard and so on); it drives the
// per-page component note.
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            title: 'Vårdcentralen Vårdportalen DEMOWEBB - Start',
            description: 'Boka tid, kontakta vården och hantera dina vårdärenden',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/om-oss',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: {
            title: 'Om Oss - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om Vårdcentralen Vårdportalen och vår verksamhet',
            components: ['FCard']
        }
    },
    {
        path: '/om-oss/jobba-hos-oss',
        name: 'JobbaHosOss',
        component: () => import('@/views/JobbaHosOssPage.vue'),
        meta: {
            title: 'Jobba Hos Oss - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Lediga tjänster och karriärmöjligheter inom vården',
            components: ['FButton', 'FCard', 'FIcon']
        }
    },
    {
        path: '/om-oss/lediga-tjanster',
        name: 'LedigaTjanster',
        component: () => import('@/views/LedigaTjansterPage.vue'),
        meta: {
            title: 'Lediga Tjänster - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Se alla lediga tjänster inom svensk vård',
            components: ['FButton', 'FCard', 'FIcon']
        }
    },
    {
        path: '/om-oss/formaner',
        name: 'Formaner',
        component: () => import('@/views/FormanerPage.vue'),
        meta: {
            title: 'Formaner - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Ansök till utbildningar och tjänster inom vården',
            components: ['FButton', 'FCard', 'FExpandableParagraph', 'FIcon']
        }
    },
    {
        path: '/om-oss/karriarvagar',
        name: 'Karriarvagar',
        component: () => import('@/views/KarriarvagarPage.vue'),
        meta: {
            title: 'Karriär - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Karriärmöjligheter och utvecklingsmöjligheter',
            components: ['FButton', 'FCard', 'FIcon']
        }
    },
    {
        path: '/tjanster',
        name: 'Services',
        component: () => import('@/views/ServicesPage.vue'),
        meta: {
            title: 'Tjänster - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Våra tjänster och behandlingar',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/tjanster/specialistmottagningar',
        name: 'Specialistmottagningar',
        component: () => import('@/views/SpecialistmottagningarPage.vue'),
        meta: {
            title: 'Specialistmottagningar - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Specialiserad vård och mottagning',
            components: [
                'FBadge',
                'FButton',
                'FCard',
                'FConfirmModal',
                'FDataTable',
                'FIcon',
                'FModal',
                'FProgressbar',
                'FSelectField',
                'FTextField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/tjanster/labbprov',
        name: 'Labbprov',
        component: () => import('@/views/LabbprovPage.vue'),
        meta: {
            title: 'Labbprov - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om laboratorieprov och analyser',
            components: [
                'FBadge',
                'FButton',
                'FCard',
                'FConfirmModal',
                'FDatepickerField',
                'FIcon',
                'FModal',
                'FPaginator',
                'FSelectField',
                'FTextField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/tjanster/hemsjukvard',
        name: 'Hemsjukvard',
        component: () => import('@/views/HemsjukvardPage.vue'),
        meta: {
            title: 'Hemsjukvård - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Vård och behandling i hemmet',
            components: [
                'FBadge',
                'FButton',
                'FCard',
                'FConfirmModal',
                'FEmailTextField',
                'FIcon',
                'FModal',
                'FPhoneTextField',
                'FSelectField',
                'FTextField',
                'FTextareaField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/kontakt',
        name: 'Contact',
        component: () => import('@/views/ContactPage.vue'),
        meta: {
            title: 'Kontakt - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Kontaktuppgifter och kontaktinformation',
            components: [
                'FButton',
                'FCard',
                'FEmailTextField',
                'FMessageBox',
                'FPhoneTextField',
                'FTextField',
                'FTextareaField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/fragor-och-svar',
        name: 'FAQ',
        component: () => import('@/views/FaqPage.vue'),
        meta: {
            title: 'FAQ - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Vanliga frågor och svar om vården',
            components: ['FButton', 'FCard', 'FExpandableParagraph']
        }
    },
    {
        path: '/vardguide',
        name: 'HealthcareGuide',
        component: () => import('@/views/HealthcareGuidePage.vue'),
        meta: {
            title: 'Vårdguide - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Guide till svensk vård',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/boka-tid',
        name: 'BookAppointment',
        component: () => import('@/views/BookAppointmentPage.vue'),
        meta: {
            title: 'Boka Tid - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Boka tid hos läkare och mottagningar',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/boka-tid/form',
        name: 'BookingForm',
        component: () => import('@/views/BookingFormPage.vue'),
        meta: {
            title: 'Boka tid - Planerat besök - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Formulär för att boka en tid för ett planerat vårdbesök',
            components: [
                'FButton',
                'FCheckboxField',
                'FDatepickerField',
                'FEmailTextField',
                'FFieldset',
                'FFileItem',
                'FFileSelector',
                'FMessageBox',
                'FPersonnummerTextField',
                'FPhoneTextField',
                'FRadioField',
                'FSelectField',
                'FTextField',
                'FTextareaField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/mina-sidor',
        name: 'MyPages',
        component: () => import('@/views/MyPagesPage.vue'),
        meta: {
            title: 'Mina Sidor - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Personlig vårdinformation och journaler',
            components: [
                'FButton',
                'FCard',
                'FIcon',
                'FPersonnummerTextField',
                'FTextField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/tillganglighet',
        name: 'Accessibility',
        component: () => import('@/views/AccessibilityPage.vue'),
        meta: {
            title: 'Tillgänglighet - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om tillgänglighet och rättigheter',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/mottagningar',
        name: 'Mottagningar',
        component: () => import('@/views/MottagningarPage.vue'),
        meta: {
            title: 'Mottagningar - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Våra mottagningar och specialistkliniker',
            components: [
                'FBadge',
                'FButton',
                'FCard',
                'FConfirmModal',
                'FDataTable',
                'FIcon',
                'FModal',
                'FPhoneTextField',
                'FSelectField',
                'FTextField',
                'FValidationForm'
            ]
        }
    },
    {
        path: '/patientinformation',
        name: 'Patientinformation',
        component: () => import('@/views/PatientinformationPage.vue'),
        meta: {
            title: 'Patientinformation - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om patientdata och journaler',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/patientinformation/vardgaranti',
        name: 'Vardgaranti',
        component: () => import('@/views/VardgarantiPage.vue'),
        meta: {
            title: 'Vårdgaranti - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om vårdgaranti och dina rättigheter',
            components: ['FCard', 'FExpandableParagraph', 'FIcon']
        }
    },
    {
        path: '/patientinformation/avgifter',
        name: 'Avgifter',
        component: () => import('@/views/AvgifterPage.vue'),
        meta: {
            title: 'Avgifter - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om avgifter och kostnader',
            components: [
                'FButton',
                'FCard',
                'FDataTable',
                'FIcon',
                'FMessageBox',
                'FSortFilterDataset'
            ]
        }
    },
    {
        path: '/patientinformation/din-vardkontakt',
        name: 'DinVardkontakt',
        component: () => import('@/views/DinVardkontaktPage.vue'),
        meta: {
            title: 'Din Vårdkontakt - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Dina personliga vårdkontakter och journaler',
            components: ['FCard', 'FExpandableParagraph', 'FIcon']
        }
    },
    {
        path: '/integritetspolicy',
        name: 'Integritetspolicy',
        component: () => import('@/views/IntegritetspolicyPage.vue'),
        meta: {
            title: 'Integritetspolicy - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Policy för hantering av personuppgifter och integritet',
            components: ['FCard', 'FIcon']
        }
    },
    {
        path: '/cookies',
        name: 'Cookies',
        component: () => import('@/views/CookiesPage.vue'),
        meta: {
            title: 'Cookies - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Information om cookies och användarvillkor',
            components: ['FCard', 'FDataTable', 'FIcon']
        }
    },
    {
        path: '/sok',
        name: 'SearchResults',
        component: () => import('@/views/SearchResultsPage.vue'),
        meta: {
            title: 'Sökresultat - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Sökresultat för din sökning',
            components: ['FSearchTextField']
        }
    },
    {
        // Catch all 404 routes
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundPage.vue'),
        meta: {
            title: 'Sidan hittades inte - Vårdcentralen Vårdportalen DEMOWEBB',
            description: 'Sidan du letar efter kunde inte hittas',
            components: ['FButton', 'FCard', 'FIcon', 'FSearchTextField']
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
