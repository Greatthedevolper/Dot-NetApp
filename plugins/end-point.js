// const baseurl = process.env.BASE_URL
const url = {
  name: "Base Url",
  AllUsers: "/api/users",
  AllListings: "/api/listings",
  USER_REGISTER: "/api/users/register",
  USER_LOGIN: "/api/users/login",
  USER_VERIFY: "/api/users/verify",
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("url", url);
});
