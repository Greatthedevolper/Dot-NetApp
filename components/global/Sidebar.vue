<script setup>
import { NuxtLink } from "#components";
import { useRouter } from "vue-router";
import { ref, markRaw } from 'vue';
import IconsHomeIcon from "~/components/icons/HomeIcon.vue";
import IconsDashboardIcon from "~/components/icons/DashboardIcon.vue";
import IconsProfileIcon from "~/components/icons/ProfileIcon.vue";

const user = useUserStore();
const globalStore = useGlobalStore();
const router = useRouter();

const isSidebarCollapsed = computed(() => globalStore.sidebarClosed);

// Assign actual component references
const allRoutes = ref([
  { path: "/", name: "Home", icon: markRaw(IconsHomeIcon) },
  { path: "/user/dashboard", name: "Dashboard", icon: markRaw(IconsDashboardIcon) },
  { path: "/user/profile", name: "Profile", icon: markRaw(IconsProfileIcon) },
]);
</script>

<template>
  <aside class="h-full shrink-0 bg-base-200 shadow-lg relative"
    :class="isSidebarCollapsed ? 'basis-[70px]' : 'basis-[250px]'">
    <div class="flex items-center gap-2 py-4 px-2 border-b border-base-300 relative">
      <NuxtLink to="/">
        <IconsLogo :class="{ 'w-8': isSidebarCollapsed }" />
      </NuxtLink>
      <span class="font-bold text-xl" v-if="!isSidebarCollapsed">Best Listing app</span>
      <span role="button" class="toggle-button" @click="globalStore.toggleSidebar">
        <IconsSidebarToggleIcon :active="isSidebarCollapsed" />
      </span>
    </div>
    <div class="h-[calc(100%-256px)] overflow-y-auto">
      <div class="sidebar-menu">
        <template v-for="(link, index) in allRoutes" :key="index">
          <NuxtLink :to="link.path" class="sidebar-menu-item"
            :class="{ 'small-item': isSidebarCollapsed }">
            <component :is="link.icon" :class="{ 'w-8': isSidebarCollapsed }" class="capitalize" />
            <span v-if="!isSidebarCollapsed">{{ link.name }}</span>
          </NuxtLink>

        </template>
      </div>
    </div>
    <div class="px-2 absolute bottom-2 left-0 right-0">
      <GlobalLogoutCard :active="isSidebarCollapsed" />
    </div>
  </aside>
</template>
