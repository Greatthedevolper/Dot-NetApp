<script setup>
const user = useUserStore();
defineProps({
    active: {
        type: Boolean,
        default: false,
    },
});

const showLogoutModal = () => {
    user.logoutModalShow = true;
};
</script>

<template>
    <div class="rounded-lg p-2 relative flex items-center justify-center flex-col custom-active">
        <NuxtLink to="/user/profile">
            <div :class="active?'w-8 h-8 -mt-4':'w-16 h-16 -mt-8'"
                class=" mb-2 flex items-center justify-center shrink-0 bg-base-200 rounded-full border border-base-300 mx-auto ">
                <img :src="user?.user?.profilePicture" alt="profile pic"
                    class="w-full h-full object-cover rounded-full" />
            </div>
            <template v-if="!active">
                <div class="text-center mb-3">
                    <strong>{{ user?.user?.name }}</strong>
                    <p>{{ user?.user?.email }}</p>
                </div>
            </template>
        </NuxtLink>
        <button @click="showLogoutModal"
            class="flex items-center justify-center gap-2 rounded-lg px-2 border border-base-300 bg-base-100 py-2 w-full">
            <span v-if="!active">Logout</span>
            <IconsLogoutIcon />
        </button>
    </div>
</template>
