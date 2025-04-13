import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore(
  "global",
  () => {
    const theme = ref("dark");
    const sidebarClosed=ref(false);

    function setTheme(newTheme: string) {
      theme.value = newTheme;
      if (process.client) {
        localStorage.setItem("theme", newTheme);
      }
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    function toggleSidebar() {
      sidebarClosed.value = !sidebarClosed.value;
    }

    return {
      theme,
      setTheme,
      sidebarClosed,
      toggleSidebar
    };
  },
  {
    persist: true,
  }
);
