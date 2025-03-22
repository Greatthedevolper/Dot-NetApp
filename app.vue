<script setup lang="ts"></script>

<template>
  <GlobalHeader />
  <NuxtLayout class="layouts">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --primaryColor: #000;
}

.layouts {
  padding: 0;
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

.custom-active {
  box-shadow: inset 2px 2px 5px var(--fallback-bc, oklch(var(--bc)/0.2)), inset -2px -2px 5px var(--fallback-bc, oklch(var(--bc)/0.2));
}
</style>
