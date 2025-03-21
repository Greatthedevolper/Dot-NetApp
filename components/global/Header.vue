<script setup>

import { useRouter } from 'vue-router';
const user = useUserStore();
const router = useRouter();
const logout = async () => {
    localStorage.removeItem("accessToken");
    router.push('/guest/sign-in')
    user.authenticated = false;
    user.user = null;
}
</script>

<template>
    <header class="h-15 bg-base-200 shadow-lg py-3">
        <div class="px-4 flex items-center justify-between h-full">
            <div class="flex items-center gap-2">
                <NuxtLink to="/">
                    <IconsLogo />
                </NuxtLink>
                <span v-if="user.user">Welcome {{ user.user?.name ?? 'Guest' }}</span>
            </div>
            <div class="flex items-center gap-3">

                <template v-if="user?.authenticated">
                    <button @click.stop="logout"
                        class="inline-flex items-center gap-2 rounded px-2 border border-dark py-1">
                        <span>Logout</span>
                        <Icon name="solar:skateboarding-round-outline" style="color: white" />
                    </button>
                </template>
                <template v-else>
                    <router-link to="/guest/sign-in" class="text-lg">Login</router-link>

                </template>
                <GlobalThemeSwitcher />
            </div>
        </div>
    </header>
</template>
