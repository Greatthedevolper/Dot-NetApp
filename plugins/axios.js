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
      console.log("Making request to", config.url); // Log the URL of the request
      // You can add more logic here if needed
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
        nuxtApp.$toast.error({
          title: error.message,
          content: "Please check your internet connection!",
          okText: "Ok",
        });
      } else if (
        code === 400 ||
        code === 411 ||
        code === 409 ||
        code === 500 ||
        code === 422 ||
        code === 429
      ) {
        nuxtApp.$toast.error({
          title: "Alert!",
          content: error.response?.data?.message || "An error occurred",
          okText: "Ok",
        });
      } else if (code === 401) {
        if (error.response?.data?.token_expired) {
          console.log("Token expired:", error.response.data.message);
        } else if (error.response?.data?.message === "Unauthenticated.") {
          nuxtApp.$toast.error({
            title: "Alert!",
            content:
              "You have checked out. Thank you for using our service. Have a nice day.",
            okText: "Ok",
          });
        } else if (
          !error.response?.data?.is_verified &&
          error.response?.data?.is_verified !== 0 &&
          error.response?.data?.is_verified !== 1
        ) {
          nuxtApp.$toast.error({
            title: "Alert!",
            content:
              error.response.data.message.charAt(0).toUpperCase() +
              error.response.data.message.slice(1).toLowerCase(),
            okText: "Ok",
          });
        }
      } else if (code === 404) {
        // Optional: Handle 404 error if needed
      }

      return Promise.reject(error);
    }
  );

  // Make the Axios instance available throughout the app
  nuxtApp.provide("axios", axiosInstance);
});
