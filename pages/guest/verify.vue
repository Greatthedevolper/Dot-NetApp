<script setup>
definePageMeta({
    layout: "protected",
});

import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
const user = useUserStore();
const route = useRoute();
const token = ref("");
const verifyData = ref({ email: "", token: "" });

onMounted(() => {
    verifyData.value.token = route.query.token;
    verifyData.value.email = route.query.email;
    console.log("Token from URL:", route);
    userEmailVerified();
});

async function userEmailVerified() {
    try {
        const response = await user.VerifyEmail(verifyData.value);

        if (response.status === true) {
            toast.success(response.message);
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
}
</script>

<template>
    <div class="auth-page bg-red-100">
        <div class="auth-wrapper">
            {{ token }}
        </div>
    </div>
</template>
<style>
.auth-page {
    @apply w-screen h-screen flex items-center justify-center flex-col;

    .auth-pge-heading {
        @apply text-white font-bold text-[60px];
    }

    .auth-wrapper {
        @apply bg-white border border-white p-3 rounded-[10px] md:max-w-[400px] sm:max-w-[90%] max-w-full w-full;

        .tab-button-wrapper {
            @apply grid grid-cols-2;

            button {
                &.tab-button {
                    @apply appearance-none border border-transparent rounded-t-xl px-2 h-12 w-full flex items-center justify-center;

                    &.active {
                        @apply bg-[var(--primaryColor)] text-white;
                    }
                }
            }
        }
    }
}
</style>
