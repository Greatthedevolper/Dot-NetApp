<script setup>
definePageMeta({ layout: "protected", });

import { ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const user = useUserStore();
const route = useRoute();

const resetPasswordData = ref({
    email: route.query.email || "",
    token: route.query.token || "",
    newPassword: '',
    confirmPassword: ''
});
const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const passwordMatched = computed(() => resetPasswordData.value.newPassword !== resetPasswordData.value.confirmPassword)
const toggleNewPasswordVisibility = () => {
    isNewPasswordVisible.value = !isNewPasswordVisible.value;
}
const toggleConfirmPasswordVisibility = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
}

async function resetPasswordFunction() {
    try {
        const response = await user.ResetPassword(resetPasswordData.value);

        if (response.status === true) {
            toast.success(response.message);
        }
        router.push('/guest/sign-in');
    } catch (error) {
        console.error("password update failed:", error);
    }
}

</script>

<template>
    <div class="auth-page bg-base-200">
        <h2 class="auth-pge-heading mb-4">Password Update</h2>
        <div class="auth-wrapper custom-active">
            <form class="w-full h-full" @submit.prevent="resetPasswordFunction">


                <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                    <IconsEmailLockIcon />
                    <input :type="isNewPasswordVisible ? 'text' : 'password'" class="grow" placeholder="New Password"
                        v-model="resetPasswordData.newPassword" />
                    <IconsCLoseEyeIcon v-if="isNewPasswordVisible" @click="toggleNewPasswordVisibility"
                        class="cursor-pointer" />
                    <IconsOpenEyeIcon v-if="!isNewPasswordVisible" @click="toggleNewPasswordVisibility"
                        class="cursor-pointer" />
                </label>
                <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                    <IconsEmailLockIcon />
                    <input :type="isConfirmPasswordVisible ? 'text' : 'password'" class="grow"
                        placeholder="Confirm Password" v-model="resetPasswordData.confirmPassword" />
                    <IconsCLoseEyeIcon v-if="isConfirmPasswordVisible" @click="toggleConfirmPasswordVisibility"
                        class="cursor-pointer" />
                    <IconsOpenEyeIcon v-if="!isConfirmPasswordVisible" @click="toggleConfirmPasswordVisibility"
                        class="cursor-pointer" />
                </label>
                <button class="btn w-full bg-[var(--primaryColor)] text-white" type="submit"
                    :disabled="passwordMatched">Update Password</button>
            </form>
        </div>
    </div>
</template>
<style></style>
