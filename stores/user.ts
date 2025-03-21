import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";

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

    async function searchHotel(search: string) {
      if (!dataHotel.value) {
        return { hotels: [] };
      }
      if (!search) {
        return dataHotel.value;
      }
      alert(search);
      return {
        hotels: dataHotel.value.hotels.filter((hotel: { name: string }) =>
          hotel.name.toLowerCase().includes(search.toLowerCase())
        ),
      };
    }

    return {
      authenticated,
      user,
      fetchListings,
      dataHotel,
      dataChain,
      loginAccess,
      registration,
      searchHotel,
      VerifyEmail,
    };
  },
  {
    persist: true,
  }
);
