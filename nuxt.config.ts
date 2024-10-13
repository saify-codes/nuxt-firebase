import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "~/assets/css/global.css",
    'primeicons/primeicons.css',
  ],
  modules: [
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
});