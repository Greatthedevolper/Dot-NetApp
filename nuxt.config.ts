// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  devServer: {
    port: 4000,
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [{ src: "" }],
      link: [{ rel: "stylesheet", href: "" }],
      style: [{ children: ":root { color: #000 }" }],
      noscript: [{ children: "JavaScript is required" }],
    },
  },
  css: ["assets/scss/main.css"],
  build: {},
  components: {
    dirs: ["~/components"],
  },
  vue: {
    compilerOptions: {},
  },
  vite: {
    plugins: [
      Components({
        resolvers: [],
      }),
    ],
  },
  plugins: [
    "@/plugins/axios.js",
    "@/plugins/global-css-vars.js"
  ],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    'pinia-plugin-persistedstate/nuxt',
    "@vueuse/nuxt",
    "@nuxt/icon",
  ],
  pinia: {
    storesDirs: ['./stores/**', './stores'],
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "https://staging-api.servrhotels.com",
    },
  },
});