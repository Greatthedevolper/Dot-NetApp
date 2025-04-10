<script setup>
import { NuxtLink } from "#components";
import { useRouter } from "vue-router";
const user = useUserStore();
const router = useRouter();
const logout = async () => {
  user.userLogout();
};
</script>

<template>
  <header class="h-15 bg-base-200 shadow-lg py-3 ">
    <div class="px-4 flex items-center justify-between h-full  max-w-[1100px] mx-auto">
      <div class="flex items-center gap-2">
        <NuxtLink to="/">
          <IconsLogo />
        </NuxtLink>
        <template v-if="user.user">
          <span class="capitalize">Welcome {{ user.user?.name ?? "Guest" }}</span>
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
          <NuxtLink to="/guest/sign-in">Login</NuxtLink>
        </template>
        <GlobalThemeSwitcher />
      </div>
    </div>
  </header>
</template>
