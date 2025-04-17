<script setup>
defineProps({
    classes: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: true
    }

})
</script>
<template>
    <div class="h-screen fixed right-0 top-0 bottom-0 z-50 bg-base-100 border border-base-300" :class="classes">
        <div class="flex items-center justify-between  px-3 border-b border-base-300 py-3">
            <div class="grow flex items-center justify-between ">
                <h3 class="text-xl">{{ title }}</h3>
                <span role="button" class="inline-flex items-center justify-center rounded-full bg-base-300 w-6 h-6"
                    @click="$emit('close')">X</span>
            </div>
        </div>
        <div class="h-[calc(100vh-54px)]">
            <GlobalListingForm :isEdit="isEdit" @closeFormed="$emit('close')" @refresh="$emit('refresh')" />
        </div>
    </div>
</template>