import { defineNuxtConfig } from 'nuxt/config'

function createNuxtConfig() {
  return defineNuxtConfig({
    // TypeScript configuration
    typescript: {
      typeCheck: true,
      strict: true
    },

    // CSS framework (optional)
    css: ['~/assets/css/main.css'],

    // Modules
    modules: [
      // Add any modules you need
      // '@nuxtjs/tailwindcss', // example
      // '@pinia/nuxt', // for state management
    ],

    // Runtime config
    runtimeConfig: {
      // Private keys (only available on server-side)
      apiSecret: '123',
      // Public keys (exposed to client-side)
      public: {
        apiBase: '/api'
      }
    },

    // Server-side rendering
    ssr: true,

    // Nitro config for server
    nitro: {
      experimental: {
        wasm: true
      }
    },

    // Build configuration
    build: {
      transpile: ['handlebars']
    },

    // Vite configuration
    vite: {
      server: {
        fs: {
          allow: ['..']
        }
      },
      optimizeDeps: {
        include: ['handlebars']
      }
    },

    // Auto-imports
    imports: {
      dirs: [
        'composables',
        'utils',
        'lib'
      ]
    },

    // Development tools
    devtools: { enabled: true }
  })
}

export default createNuxtConfig()
