<script setup>
defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div v-show="showModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <slot name="title" />
      <slot name="description" />
      <slot name="action" />
    </div>
  </div>
</template>
