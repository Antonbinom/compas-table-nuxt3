// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@vueuse/nuxt"],
  primevue: {
    options: {
      unstyled: false,
      ripple: true,
    },
    components: {
      include: [
        "Column",
        "DataTable",
        "Toast",
        "Dropdown",
        "Button",
        "Menu",
        "Checkbox",
        "InputNumber",
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/global.scss";',
        },
      },
    },
  },
});
