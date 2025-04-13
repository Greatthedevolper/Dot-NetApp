<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <svg
    v-if="active"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    role="img"
    aria-label="Expand sidebar"
  >
    <title>Expand</title>
    <path fill="currentColor" d="M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18l6-6z" />
    <path
      fill="currentColor"
      d="m13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"
    />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    role="img"
    aria-label="Collapse sidebar"
  >
    <title>Collapse</title>
    <path
      fill="currentColor"
      d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"
    ></path>
    <path
      fill="currentColor"
      d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"
    ></path>
  </svg>
</template>
