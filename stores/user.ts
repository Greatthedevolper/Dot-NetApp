import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";
import { useRouter } from "vue-router";
export const useUserStore = defineStore(
  "user",
  () => {
    const nuxtApp = useNuxtApp();
    const $axios = nuxtApp.$axios as any;
    const $url = nuxtApp.$url as any;
    const config = useRuntimeConfig();
    const authenticated = ref(false);
    const user = ref(null);
    const router = useRouter();
    const logoutModalShow=ref(false)

    interface Hotel {
      name: string;
    }

    interface HotelData {
      hotels: Hotel[];
    }
    const dataHotel = ref<HotelData>({ hotels: [] });
    const dataChain = ref(null);

    async function fetchListings(params: any) {
      try {
        const response = await $axios.get($url.AllListings, { params });
        return response;
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }

    async function VerifyEmail(data: { email: string; token: string }) {
      try {
        const response = await $axios.post($url.USER_VERIFY, data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data?.message;
      }
    }
    async function loginAccess(data: { email: string; password: string }) {
      try {
        const response = await $axios.post($url.USER_LOGIN, data);
        user.value = response.user;
        return response.data;
      } catch (error: any) {
        throw error?.response?.data?.message;
      }
    }
    async function registration(data: {
      name: string;
      email: string;
      password: string;
    }) {
      try {
        const response = await $axios.post($url.USER_REGISTER, data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data?.message;
      }
    }
    async function ForgotPassword(data: { email: string }) {
      try {
        const response = await $axios.post($url.USER_PASSWORD_FORGET, data);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    }
    async function ResetPassword(data: { email: string }) {
      try {
        const response = await $axios.post($url.USER_RESET_PASSWORD, data);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    }
    async function getProfile() {
      try {
        const token = useCookie("accessToken");

        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await $axios.get($url.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        user.value = response.data.user;
        return response.data;
      } catch (error: any) {
        throw error;
      }
    }

    async function fetchUserListings(params: any) {
      try {
        const token = useCookie("accessToken");
        const response = await $axios.get($url.USER_DASHBOARD, {
          params,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        return response;
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }
    async function setUserProfilePicture(formData: FormData) {
      try {
        const token = useCookie("accessToken");
        const response = await $axios.post($url.UPDATE_PROFILE_PIC, formData, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        });
        return response.data; // Make sure to return only response data
      } catch (error) {
        console.error("Error setting picture:", error);
        return null; // Return null on error to prevent breaking the UI
      }
    }
    async function userProfileUpdate(data: {
      Email: string;
      Name: string;
      Id: BigInteger;
    }) {
      try {
        const response = await $axios.post(
          $url.UPDATE_USER_PROFILE + "/" + data.Id,
          data
        );
        return response.data;
      } catch (error: any) {
        throw error;
      }
    }
    async function userLogout() {
      localStorage.removeItem("accessToken");
      const accessToken = useCookie("accessToken");
      accessToken.value = null;
      authenticated.value = false;
      user.value = null;
      router.push("/guest/sign-in");
    }

    return {
      authenticated,
      user,
      fetchListings,
      dataHotel,
      dataChain,
      loginAccess,
      registration,
      VerifyEmail,
      ForgotPassword,
      ResetPassword,
      getProfile,
      fetchUserListings,
      setUserProfilePicture,
      userProfileUpdate,
      userLogout,
    };
  },
  {
    persist: true,
  }
);
