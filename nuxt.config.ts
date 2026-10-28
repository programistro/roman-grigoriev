// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    'motion-v/nuxt'
  ],
  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    baseURL: '/roman-grigoriev/'
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  devServer: {
    port: 3003
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
