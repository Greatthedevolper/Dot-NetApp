<script setup>
import { useRouter } from "vue-router";
const user = useUserStore();
const router = useRouter();
const logout = async () => {
  localStorage.removeItem("accessToken");
  router.push("/guest/sign-in");
  user.authenticated = false;
  user.user = null;
};
</script>

<template>
  <header class="h-15 bg-base-200 shadow-lg py-3">
    <div class="px-4 flex items-center justify-between h-full">
      <div class="flex items-center gap-2">
        <NuxtLink to="/">
          <IconsLogo />
        </NuxtLink>
        <template v-if="user.user">
          <span>Welcome {{ user.user?.name ?? "Guest" }}</span>
        </template>
      </div>
      <div class="flex items-center gap-5">
        <template v-if="user?.authenticated">
          <NuxtLink to="/user/profile" class="capitalize">Profile</NuxtLink>
          <NuxtLink to="/user/dashboard" class="capitalize">dashboard</NuxtLink>
          <button @click.stop="logout" class="inline-flex items-center gap-2 rounded px-2 border border-primary py-1">
            <span>Logout</span>
            <IconsLogoutIcon />
          </button>
        </template>
        <template v-else>
          <router-link to="/guest/sign-in" class="text-base">Login</router-link>
        </template>
        <GlobalThemeSwitcher />
      </div>
    </div>
  </header>
</template>
