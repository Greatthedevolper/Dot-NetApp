import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useGlobalStore = defineStore(
  "global",
  () => {
    const theme = ref(process.client ? localStorage.getItem("theme") || "dark" : "dark");

    function setTheme(newTheme: string) {
      theme.value = newTheme;
      if (process.client) {
        localStorage.setItem("theme", newTheme);
      }
      document.documentElement.setAttribute("data-theme", newTheme);
    }

    onMounted(() => {
      setTheme(theme.value);
    });

    return {
      theme,
      setTheme,
    };
  },
  {
    persist: true, 
  }
);
