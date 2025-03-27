<script setup>
definePageMeta({
  layout: "protected",
});
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const isPasswordVisible = ref(false);

const authdata = ref({
  name: '',
  email: '',
  password: '',
})

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
}

const selectedTab = computed(() => route.query.type === 'register' ? 1 : 0);
const switchAuthType = (newType) => {
  router.replace({ query: { ...route.query, type: newType } });
  // router.push({ query: { ...route.query, type: newType } });
}

const handleAuthAction = async () => {
  try {
    const isRegistering = selectedTab.value === 1;
    const response = isRegistering ? await user.registration(authdata.value) : await user.loginAccess(authdata.value);
    if (response.status === true) {
      if (isRegistering) {
        toast.success(response.message);
        switchAuthType('login');
        authdata.value = { name: '', email: '', password: '' };
      } else {
        localStorage.setItem('accessToken', response.token);
        user.authenticated = true;
        toast.success(response.message);
        // router.push('/');
        router.replace({ path: "/", query: {} }).then(() => {
          location.reload();
        });

      }
    }
  } catch (error) {
    console.error("Authentication failed:", error);
  }
}
watch(() => route.query.type, (newType) => {
  if (!newType) {
    switchAuthType('login');
    return;
  }
  if (newType) switchAuthType(newType);
}, { immediate: true });

</script>

<template>
  <div class="auth-page bg-base-200">
    <h2 class="auth-pge-heading mb-6">{{ selectedTab === 1 ? 'Account Create' : 'Account Login' }}</h2>
    <div class="auth-wrapper custom-active">


      <div class="tab-button-wrapper">
        <button class="tab-button" :class="{ 'active custom-active': selectedTab === 0 }"
          @click="switchAuthType('login')">
          <span>Sign In</span>
        </button>
        <button class="tab-button" :class="{ 'active custom-active': selectedTab === 1 }"
          @click="switchAuthType('register')">
          <span>Register</span>
        </button>
      </div>


      <Transition name="fade">
        <form class="w-full h-full" @submit.prevent="handleAuthAction">
          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3" tabindex="0"
            v-if="selectedTab === 1">
            <input type="text" class="grow" placeholder="Name" v-model="authdata.name" />
          </label>
          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
            <IconsEmailIcon />
            <input type="email" class="grow" placeholder="Email" v-model="authdata.email" required />
          </label>
          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
            <IconsEmailLockIcon />
            <input :type="isPasswordVisible ? 'text' : 'password'" class="grow" placeholder="password"
              v-model="authdata.password" required />
            <IconsCLoseEyeIcon v-if="isPasswordVisible" @click="togglePasswordVisibility" class="cursor-pointer" />
            <IconsOpenEyeIcon v-if="!isPasswordVisible" @click="togglePasswordVisibility" class="cursor-pointer" />
          </label>
          <div class="flex items-end justify-between mb-3 h-12 px-3" v-if="selectedTab === 0">
            <label class="inline-flex items-center">
              <input type="checkbox" class="checkbox" />
              <span class="ml-2">Remember me</span>
            </label>
            <NuxtLink to="/guest/forgot-password" class="text-inherit">Forgot password?</NuxtLink>
          </div>
          <button class="btn w-full bg-[var(--primaryColor)] text-white" type="submit">
            {{ selectedTab === 0 ? 'Login' : 'Register' }}
          </button>
        </form>
      </Transition>
    </div>
  </div>
</template>
