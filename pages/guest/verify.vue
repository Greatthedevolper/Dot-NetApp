<script setup>
definePageMeta({
    layout: "protected",
});

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const user = useUserStore();
const router = useRouter();
const route = useRoute();
const token = ref("");
const verifyData = ref({ email: "", token: "" });
const isVerified = ref(false);
onMounted(() => {
    verifyData.value.token = route.query.token;
    verifyData.value.email = route.query.email;
    userEmailVerified();
});

async function userEmailVerified() {
    try {
        const response = await user.VerifyEmail(verifyData.value);

        if (response.status === true) {
            toast.success(response.message);
            isVerified.value = true;
            // router.push('/guest/sign-in');
        }
    } catch (error) {
        console.error("Login failed:", error);
        isVerified.value = false;
    }
}
</script>

<template>
    <div class="auth-page bg-base-200">
        <h2 class="auth-pge-heading mb-4">Account Verification</h2>
        <div class="auth-wrapper custom-active">
            <template v-if="isVerified">
                <div class="flex flex-col items-center justify-normal gap-3 w-full">
                    <p>Your account is verified</p>
                    <IconsVerifiedUser class="text-[60px] text-green-400" />

                    <NuxtLink to="/guest/sign-in?type=login"
                        class="bg-base-200 custom-active flex items-center justify-center rounded-lg px-2 py-3 grow shrink-0 w-full">
                        Go to login</NuxtLink>

                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center justify-normal gap-3 w-full">
                    <p>Your account is unverified</p>
                    <IconsUnVerifiedUser class="text-[60px] text-red-400" />

                    <NuxtLink to="/guest/sign-in?type=register"
                        class="bg-base-200 custom-active flex items-center justify-center rounded-lg px-2 py-3 grow shrink-0 w-full">
                        Go to Register</NuxtLink>

                </div>
            </template>

        </div>
    </div>
</template>
<style></style>
