<script setup>
import { ref, onMounted } from "vue";
const user = useUserStore();

const selectedHotel = ref("");
const selectedHotelId = ref("");
const loginData = ref({ hotel: "", emailUser: "", passwordUser: "" });
const dropdownOpen = ref(false);
onMounted(async () => {
  user.fetchHotelData();
  filteredHotels.value = user.dataHotel.hotels;
});

function selectHotel(id, name) {
  selectedHotel.value = name;
  selectedHotelId.value = id;
  loginData.value.hotel = id;
  dropdownOpen.value = false;
}
function loginAccessHandler() {
  user
    .loginAccess(loginData.value)
    .then((data) => {
      console.log("Login successful", data);
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}

const filteredHotels = computed(() => {
  const hotels = user.dataHotel?.hotels || [];
  if (!selectedHotel.value) {
    return hotels;
  }
  return hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(selectedHotel.value.toLowerCase())
  );
});
</script>

<template>
  <div
    class="w-screen h-screen flex items-center justify-center flex-col"
    :style="{
      backgroundImage: `url(${user.dataChain?.signin_bg})`,
      backgroundSize: '100%',
    }"
  >
    <h2 class="text-white font-bold text-[60px]">{{ user.dataChain?.name }}</h2>
    <form
      class="bg-white border border-white p-3 rounded-[10px] md:max-w-[400px] sm:max-w-[90%] max-w-full w-full"
      @submit.prevent="loginAccessHandler"
    >
      <div class="dropdown w-full">
        <label
          class="input bg-transparent input-bordered flex items-center gap-2 mb-3"
          tabindex="0"
        >
          <input
            type="search"
            class="grow"
            placeholder="Search"
            v-model="selectedHotel"
            role="button"
            @click="dropdownOpen = !dropdownOpen"
          />
        </label>
        <ul
          v-if="dropdownOpen"
          tabindex="0"
          :style="{ background: `${user.dataChain?.login_color}` }"
          class="dropdown-content menu flex-nowrap !bg-white rounded-[8px] z-[1] w-full px-2 py-4 shadow max-h-[180px] overflow-auto flex-col text-black"
        >
          <template v-if="filteredHotels.length > 0">
            <li
              v-for="(item, index) in filteredHotels"
              :key="index"
              :value="item.id"
              :class="`hover:${user.dataChain?.login_color}`"
              @click="selectHotel(item.id, item.name)"
            >
              <span>{{ item.name }}</span>
            </li>
          </template>
          <template v-else>
            <li>
              <span>No data found</span>
            </li>
          </template>
        </ul>
      </div>

      <label
        class="input bg-transparent input-bordered flex items-center gap-2 mb-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
          />
          <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
          />
        </svg>
        <input
          type="text"
          class="grow"
          placeholder="Email"
          v-model="loginData.emailUser"
          required
        />
      </label>
      <label
        class="input bg-transparent input-bordered flex items-center gap-2 mb-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="password"
          class="grow"
          placeholder="password"
          v-model="loginData.passwordUser"
          required
        />
      </label>
      <button class="btn w-full bg-blue-200" type="submit">Login</button>
    </form>
  </div>
</template>
<style>
/* General autofill style */

</style>
