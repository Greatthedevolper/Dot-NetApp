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
    const count = ref(0);

    interface Hotel {
      name: string;
    }

    interface HotelData {
      hotels: Hotel[];
    }
    const dataHotel = ref<HotelData>({ hotels: [] });
    const dataChain = ref(null);
    function increment() {
      count.value++;
    }

    async function fetchHotelData() {
      try {
        const response = await $axios.get($url.ALL_HOTELS);
        dataHotel.value = response.data;
        const res = await $axios.get($url.CHAIN_URL);
        dataChain.value = res.data.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    async function loginAccess(data: object) {
      console.table(data);
      return data;
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
      count,
      increment,
      fetchHotelData,
      dataHotel,
      dataChain,
      loginAccess,
      searchHotel,
    };
  },
  {
    persist: true,
  }
);
