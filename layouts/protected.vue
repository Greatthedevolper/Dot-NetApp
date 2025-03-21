<script setup>
import { onMounted } from "vue";
const user = useUserStore();

// Client-side only (important for Nuxt/SSR)
const updateRootColor = () => {
  if (process.client) {
    // Only run in browser
    document.documentElement.style.setProperty(
      "--primaryColor",
      user.dataChain?.login_color || "#5ab8eb"
    );
  }
};

onMounted(async () => {
  user.fetchHotelData();
  updateRootColor
});
onMounted(updateRootColor);
watchEffect(() => user.dataChain);
</script>
<template>
  <div class="auth">
    <slot />
  </div>
</template>

<style>
:root {
  --primaryColor: #000;
}
* {
  scrollbar-color: unset !important;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primaryColor);
    border-radius: 10px;
  }
}
.default {
  border: unset;
  padding: 0;
  position: relative;
}
input:-webkit-autofill,
input:-moz-autofill {
  background-color: transparent !important;
  color: #000;
}
</style>

  