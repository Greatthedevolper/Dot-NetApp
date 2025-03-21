import { useGlobalStore } from "@/stores/global";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const themeStore = useGlobalStore();
  if (process.client) {
    document.documentElement.setAttribute("data-theme", themeStore.theme);
  }

  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (!token && !to.path.startsWith("/guest")) {
    return navigateTo("/guest/sign-in");
  } else if (token && to.name === "guest-sign-in") {
    return navigateTo("/");
  }
});
