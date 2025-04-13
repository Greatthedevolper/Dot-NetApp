// const baseurl = process.env.BASE_URL
const url = {
  name: "Base Url",
  AllUsers: "/api/users",
  USER_REGISTER: "/api/users/register",
  USER_LOGIN: "/api/users/login",
  USER_VERIFY: "/api/users/verify-account",
  USER_PASSWORD_FORGET: "/api/users/forgot-password",
  USER_RESET_PASSWORD: "/api/users/reset-password",
  USER_PROFILE: "/api/users/profile",
  UPDATE_PROFILE_PIC: "/api/users/profile/update-picture",
  UPDATE_USER_PROFILE: "/api/users/profile/update",

  //listings
  AllListings: "/api/listings",
  USER_DASHBOARD: "/api/users/dashboard",

  GET_SINGLE_LISTING: "/api/listing", //give id in function
  APPROVAL_LISTING: "/api/listing/approval", //give id and approved in function
  DELETE_LISTING: "/api/listing", //give id in function
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("url", url);
});
