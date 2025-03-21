import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    theme: useStorage("theme", ref("dark")), // Ensure reactivity
  }),
  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme;
      if (process.client) {
        localStorage.setItem("theme", newTheme);
      }
      document.documentElement.setAttribute("data-theme", newTheme);
    },
  },
});