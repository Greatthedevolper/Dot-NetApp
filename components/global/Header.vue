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
    <div class="px-4 flex items-center justify-between h-full  ">
      <div class="flex items-center gap-2">
        <template v-if="user.user">
          <span class="capitalize">Welcome {{ user.user?.name ?? "Guest" }}</span>
        </template>
      </div>
      <div class="flex items-center gap-5">
        <GlobalThemeSwitcher />
      </div>
    </div>
  </header>
</template>
