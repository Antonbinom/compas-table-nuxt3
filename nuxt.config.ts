// import Draggable from 'vuedraggable';
// import Vue from 'vue';
// Vue.component('draggable', Draggable);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue"],
  primevue: {
    options: {
      unstyled: false,
      ripple: true,
    },
    components: {
      // prefix: "Prime",
      include: [
        "Column",
        "DataTable",
        "Toast",
        "Dropdown",
        "Button",
        "Menu",
        "Checkbox",
      ],
    },
    // directives: {
    //   include: ["Ripple", "Tooltip"],
    // },
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
