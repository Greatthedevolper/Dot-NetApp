<script setup>
defineProps({
    classes: {
        type: String,
        default: ''
    },
    isClosed: {
        type: Boolean,
        default: true
    },
})
</script>
<template>
    <div class="fixed inset-0 z-20 bg-black/30" :class="classes" v-if="isClosed" @click="$emit('close')"></div>
</template>