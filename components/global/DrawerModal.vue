<script setup>
defineProps({
    classes: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true
    }

})
</script>
<template>
    <div class="h-screen fixed right-0 top-0 bottom-0 z-50 bg-red-100" :class="classes">
        <div class="flex items-center justify-between">
            <h3>{{ title }}</h3>
            <span role="button" class="inline-flex items-center justify-center rounded-full bg-red-500"
                @click="$emit('close')">X</span>
        </div>
    </div>
</template>