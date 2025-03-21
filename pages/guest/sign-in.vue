<script setup>
definePageMeta({
  layout: "protected",
});
import { ref, onMounted } from "vue";
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
const router = useRouter();
const user = useUserStore();
const selectedTab = ref(0);
const tabs = ["Sign In", "Register"];
const loginData = ref({ email: "", password: "" });
const registerData = ref({ name: "", email: "", password: "" });
const dropdownOpen = ref(false);
onMounted(async () => {
});


async function loginAccessHandler() {
  try {
    const response = await user.loginAccess(loginData.value);

    if (response.status === true) {
      localStorage.setItem('accessToken', response.token);
      user.authenticated = true;
      user.user = response.user;
      router.push('/');
      toast.success(response.message);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}
async function registerUser() {
  try {
    const response = await user.registration(registerData.value);

    if (response.status === true) {
      toast.success(response.message);
      selectedTab.value = 0;
    }
  } catch (error) {
  }
}

</script>

<template>
  <div class="auth-page bg-base-200">
    <h2 class="auth-pge-heading">{{ user.dataChain?.name }}</h2>
    <div class="auth-wrapper">
      <div class="tab-button-wrapper">
        <button class="tab-button" :class="{ 'active': selectedTab === 0 }" @click="selectedTab = 0">
          <span>Sign In</span>
        </button>
        <button class="tab-button" :class="{ 'active': selectedTab === 1 }" @click="selectedTab = 1">
          <span>Register</span>
        </button>
      </div>
      <Transition name="fade" v-if="selectedTab === 0">
        <form class="w-full h-full" @submit.prevent="loginAccessHandler">

          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" class="grow" placeholder="Email" v-model="loginData.email" required />
          </label>
          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
              <path fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
            </svg>
            <input type="password" class="grow" placeholder="password" v-model="loginData.password" required />
          </label>
          <button class="btn w-full bg-[var(--primaryColor)] text-white" type="submit">Login</button>
        </form>
      </Transition>
      <Transition name="fade" v-if="selectedTab === 1">
        <form class="w-full h-full" @submit.prevent="registerUser">
          <div class="dropdown w-full">
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3" tabindex="0">
              <input type="text" class="grow" placeholder="Name" v-model="registerData.name" />
            </label>
          </div>

          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" class="grow" placeholder="Email" v-model="registerData.email" required />
          </label>
          <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
              <path fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
            </svg>
            <input type="password" class="grow" placeholder="password" v-model="registerData.password" required />
          </label>
          <button class="btn w-full bg-[var(--primaryColor)] text-white" type="submit">Register</button>
        </form>
      </Transition>
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
