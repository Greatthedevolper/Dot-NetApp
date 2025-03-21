import axios from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // Access runtime configuration
  const config = useRuntimeConfig();

  // Create an Axios instance with default configurations
  const axiosInstance = axios.create({
    baseURL: config.public.BASE_URL,
  });

  // Add request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // console.log("Making request to", config.url);
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const code = parseInt(error.response?.status);
      console.log("Response error code:", code);

      if (error && error.request && error.request.status === 0) {
        nuxtApp.$toast.error(error?.response?.data?.message);
      } else if (
        code === 400 ||
        code === 411 ||
        code === 409 ||
        code === 500 ||
        code === 422 ||
        code === 429
      ) {
        nuxtApp.$toast.error(error.response?.data?.message);
      } else if (code === 401) {
        if (error.response?.data?.token_expired) {
          console.log("Token expired:", error.response.data.message);
        } else if (error.response?.data?.message === "Unauthenticated.") {
          nuxtApp.$toast.error(error.response?.data?.message);
        } else if (
          !error.response?.data?.is_verified &&
          error.response?.data?.is_verified !== 0 &&
          error.response?.data?.is_verified !== 1
        ) {
          nuxtApp.$toast.error(error.response?.data?.message);
        }
      } else if (code === 404) {
        console.error("unauthorized error");
      }

      return Promise.reject(error);
    }
  );
  nuxtApp.provide("axios", axiosInstance);
});
