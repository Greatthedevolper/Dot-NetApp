import { useGlobalStore } from "@/stores/global";
import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  const themeStore = useGlobalStore();
  const userStore = useUserStore();

  document.documentElement.setAttribute("data-theme", themeStore.theme);

  const token =
    process.client &&
    (useCookie("accessToken") ||
      sessionStorage.getItem("accessToken"));

  const isAuthenticated = userStore.authenticated;

  if ((!token || !isAuthenticated) && !to.path.startsWith("/guest")) {
    userStore.userLogout();
    return navigateTo("/guest/sign-in", { replace: true });
  }

  if (token && isAuthenticated && to.name === "guest-sign-in") {
    return navigateTo("/", { replace: true });
  }
});
