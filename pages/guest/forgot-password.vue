<script setup>
definePageMeta({
    layout: "protected",
});
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
const router = useRouter();
const user = useUserStore();
const userEmail = ref("")


async function sendResetPasswordLink() {
    try {
        const response = await user.ForgotPassword({ email: userEmail.value });

        if (response.status === true) {
            toast.success(response.message);
        }
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div class="auth-page bg-base-200">
        <h2 class="auth-pge-heading mb-3">Send reset password link</h2>
        <div class="auth-wrapper custom-active">

            <form class="w-full h-full flex items-end justify-center flex-col" @submit.prevent="sendResetPasswordLink">

                <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3 w-full">
                    <IconsEmailIcon />
                    <input type="email" class="grow" placeholder="Email" v-model="userEmail" />
                </label>
                <button class="btn w-full bg-[var(--primaryColor)] text-white" type="submit">Send reset password
                    link</button>
            </form>
        </div>
    </div>
</template>
<style></style>
