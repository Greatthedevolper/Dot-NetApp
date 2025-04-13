<script setup>
const user = useUserStore();
const logout = async () => {
  user.userLogout();
  user.logoutModalShow = false;
};
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const logoutModal = computed(() => user.logoutModalShow);
const closeLogoutModal = () => {
  user.logoutModalShow = false;
};
</script>
<template>
  <div class="default h-[calc(100vh-1px)] overflow-hidden">
    <div class="flex items-center h-full">
      <GlobalSidebar></GlobalSidebar>
      <div class="grow">
        <GlobalHeader />
        <div class="h-[calc(100vh-58px)] overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
    <GlobalModal :showModal="logoutModal">
      <template #title>
        <h3 class="text-xl font-semibold text-center mb-6">Logout</h3>
      </template>
      <template #description>
        <div class="text-center">
          <IconsLogoutIcon class="text-[100px] mx-auto" />
          <p class="py-4">Are you sure you want to logout?</p>
        </div>
      </template>
      <template #action>
        <div class="flex items-center justify-center gap-2">
          <button
            @click="logout"
            class="border border-base-100 bg-base-300 px-2 py-2 rounded-lg min-w-[100px]"
          >
            Yes
          </button>
          <button
            class="border border-base-100 bg-base-300 px-2 py-2 rounded-lg min-w-[100px]"
            @click="closeLogoutModal"
          >
            cancel
          </button>
        </div>
      </template>
    </GlobalModal>
  </div>
</template>
