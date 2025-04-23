import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";
export const useCategoryStore = defineStore(
  "category",
  () => {
    const nuxtApp = useNuxtApp();
    const $axios = nuxtApp.$axios as any;
    const $url = nuxtApp.$url as any;

    async function fetchCategories(params: any) {
      try {
        const response = await $axios.get($url.AllCategories, { params });
        return response;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    // async function fetchUserListings(params: any) {
    //   try {
    //     const token = useCookie("accessToken");
    //     const response = await $axios.get($url.USER_DASHBOARD, {
    //       params,
    //       headers: {
    //         Authorization: `Bearer ${token.value}`,
    //       },
    //     });
    //     return response;
    //   } catch (error) {
    //     console.error("Error fetching listings:", error);
    //   }
    // }

    // async function fetchSingleListing(params: { id: BigInteger }) {
    //   try {
    //     const response = await $axios.get(
    //       `${$url.GET_SINGLE_LISTING}/${params.id}`
    //     );
    //     return response;
    //   } catch (error) {
    //     console.error("Error fetching listing:", error);
    //   }
    // }

    // //create or edit a listing

    async function saveCategory(name: string) {
      try {
        const response = await $axios.post(
          $url.AllCategories + "?name=" + name
        );
        return response;
      } catch (error) {
        console.error("Error saving listing:", error);
      }
    }

    // async function listingDelete( id: BigInteger ) {
    //   try {
    //     const response = await $axios.delete(`${$url.DELETE_LISTING}/${id}`);
    //     return response;
    //   } catch (error) {
    //     console.error("Error saving listing:", error);
    //   }
    // }

    return {
      fetchCategories,
      saveCategory,
    };
  },
  {
    persist: true,
  }
);
