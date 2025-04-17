<script setup>
defineProps({
    item: Object,
    selectedTag: Function
})
const listingStatus = (status) => {
    var classes = status == 1 ? 'bg-green-100 text-green-800'
        : status == 0 ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800';
    var label = status == 1 ? 'Approved'
        : status == 0 ? 'Pending'
            : 'Rejected';
    return { classes, label };
};
</script>
<template>
    <div class=" bg-primary/10 rounded-md shadow-xl relative p-1">
        <div class="relative w-full h-[200px]">
            <span role="button" :class="listingStatus(item.approved).classes"
                class="rounded-l-full px-2 py-1 inline-flex items-center justify-center absolute  right-0 top-0">
                <span class="text-sm">{{ listingStatus(item.approved).label }}</span>
            </span>

            <img v-if="item.image" :src="item.image" alt="Listing Image" loading="lazy"
                class="w-full h-full object-cover rounded-t-md" />
        </div>
        <div class="border-b border-primary px-3 py-2 h-[70px]">
            <h3 class="line-clamp-2 mb-0 font-semibold">{{ item.title }}</h3>
        </div>
        <div class="p-3 relative">
            <p class="line-clamp-3 text-pretty font-regular h-[70px]">{{ item.desc }}</p>

            <div v-if="item.tags" class="flex items-center gap-3 mt-2">
                <div v-for="tag in item.tags.split(',')" :key="tag">
                    <button @click="selectedTag(tag)"
                        class="text-inherit px-3 py-px rounded-full hover:bg-transparent hover:text-primary border border-primary flex items-center gap-1 h-[30px]">
                        <span class="capitalize text-[14px] leading-[14px]">{{ tag }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="block ">
            <NuxtLink :to="`/listing/${item.id}`" class="w-full rounded-full bg-primary flex px-2 py-2 justify-center ">
                View</NuxtLink>
        </div>
    </div>
</template>