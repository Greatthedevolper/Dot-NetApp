// const baseurl = process.env.BASE_URL
const url = {
  name: "Base Url",
  AllUsers: "/api/users",
  AllListings: "/api/listings",
  USER_REGISTER: "/api/users/register",
  USER_LOGIN: "/api/users/login",
  USER_VERIFY: "/api/users/verify-account",
  USER_PASSWORD_FORGET: "/api/users/forgot-password",
  USER_RESET_PASSWORD: "/api/users/reset-password",
  USER_PROFILE: "/api/users/profile",
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("url", url);
});
