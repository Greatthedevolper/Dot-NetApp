import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore(
  "global",
  () => {
    const theme = ref("dark");

    function setTheme(newTheme: string) {
      theme.value = newTheme;
      if (process.client) {
        localStorage.setItem("theme", newTheme);
      }
      document.documentElement.setAttribute("data-theme", newTheme);
    }

    return {
      theme,
      setTheme,
    };
  },
  {
    persist: true,
  }
);
