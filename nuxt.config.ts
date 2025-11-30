// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-04-25',
    future: { compatibilityVersion: 4 },
    modules: [
        '@nuxthub/core',
        '@nuxt/eslint',
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/color-mode'
    ],
    ui: {
        fonts: false
    },
    css: ['~/assets/css/main.css'],
    hub: {
        database: true,
        kv: true,
        blob: true,
        cache: true,
    },
    nitro: {
        experimental: {
            // Enable Server API documentation within NuxtHub
            openAPI: true
        }
    },
    // Nuxt Auth configuration
    auth: {
        baseURL: process.env.AUTH_ORIGIN,
        provider: {
            type: 'local',
            endpoints: {
                signIn: { path: '/login', method: 'post' },
                signOut: { path: '/logout', method: 'post' },
                signUp: { path: '/register', method: 'post' },
                getSession: { path: '/me', method: 'get' }
            },
            pages: {
                login: '/login'
            },
            token: {
                headerName: 'Authorization',
                type: 'Bearer',
                signInResponseTokenPointer: '/data/token',
                maxAgeInSeconds: 60 * 60 * 24 * 7, // 7 days
                sameSite: 'lax'
            },
            session: {
                maxAgeInSeconds: 60 * 60 * 24 * 7 // 7 days
            }
        },
        globalAppMiddleware: true
    },
    devtools: { enabled: true },
})