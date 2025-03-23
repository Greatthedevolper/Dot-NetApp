<script setup>
defineProps({
    item: Object,
    selectedTag: Function
})
</script>
<template>
    <div class="border border-primary rounded-md shadow shadow-white">
        <div class="border-b border-primary px-3 py-2">
            <h3 class="line-clamp-2 mb-0 font-medium">{{ item.title }}</h3>
        </div>
        <div class="p-3">
            <p class="line-clamp-4">{{ item.desc }}</p>
            <div v-if="item.tags" class="flex items-center gap-3 my-4">
                <div v-for="tag in item.tags.split(',')" :key="tag">
                    <button @click="selectedTag(tag)"
                        class="text-inherit px-3 py-px rounded-full hover:bg-transparent hover:text-primary border border-primary flex items-center gap-1 h-[30px]">
                        <span class="capitalize text-[14px] leading-[14px]">{{ tag }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>