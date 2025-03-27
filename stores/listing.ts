import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";
export const useListingStore = defineStore(
  "listing",
  () => {
    const nuxtApp = useNuxtApp();
    const $axios = nuxtApp.$axios as any;
    const $url = nuxtApp.$url as any;

    async function fetchListings(params: any) {
      try {
        const response = await $axios.get($url.AllListings, { params });
        return response;
      } catch (error) {
        console.error("Error fetching listings:", error);
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

    async function fetchSingleListing(params: { id: BigInteger }) {
      try {
        const response = await $axios.get(`${$url.GET_SINGLE_LISTING}/${params.id}`);
        return response;
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    }
    return {
      fetchListings,
      fetchUserListings,
      fetchSingleListing,
    };
  },
  {
    persist: true,
  }
);
