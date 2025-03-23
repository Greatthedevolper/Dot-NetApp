import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";
import ForgotPassword from "~/pages/guest/forgot-password.vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const nuxtApp = useNuxtApp();
    const $axios = nuxtApp.$axios as any;
    const $url = nuxtApp.$url as any;
    const config = useRuntimeConfig();
    const authenticated = ref(false);
    const user = ref(null);

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
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await $axios.get($url.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error: any) {
        throw error;
      }
    }

    async function fetchUserListings(params: any) {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await $axios.get($url.USER_DASHBOARD, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
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
    };
  },
  {
    persist: true,
  }
);
