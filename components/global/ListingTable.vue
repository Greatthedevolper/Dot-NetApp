<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
    listings: Object,
    selectedTag: Function,
    descTable: Function,
    columns:{
        type: Array,
        default: () => []
    },
    order: {
        type: String,
        default: 'asc'
    },
    orderColumn: {
        type: String,
        default: 'asc'
    }
});
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
    <div class="relative overflow-auto max-w-[calc(100vw - 2rem)] mx-auto bg-base-300 h-full">
        <GlobalTable :data="listings" :columns="columns" :descTable="descTable" :order="order" :orderColumn="orderColumn">
            <template #title="{ item, index }">
                <td class="max-w-[200px]">
                    <div class="flex items-center gap-2">
                        <div class="avatar">
                            <div class="mask mask-squircle h-12 w-12">
                                <img :src="item.image" alt="image" loading="lazy" />

                            </div>

                        </div>
                        <p class="truncate">{{ item.title }}</p>
                    </div>
                </td>
            </template>
            <template #desc="{ item, index }">


                <td class="max-w-[100px]">
                    <p class="truncate">{{ item.desc }}</p>
                </td>
            </template>
            <template #approved="{ item, index }">
                <td class="max-w-[100px]">
                    <span role="button" :class="listingStatus(item.approved).classes"
                        class="rounded-full px-3 py-1 inline-flex items-center justify-center">
                        <span>{{ listingStatus(item.approved).label }}</span>
                    </span>
                </td>
            </template>
            <template #tags="{ item, index }">
                <td class="max-w-[100px]">
                    <div v-if="item.tags" class="flex items-center gap-3">
                        <div v-for="tag in item.tags.split(',')" :key="tag">
                            <button @click="selectedTag(tag)"
                                class="text-inherit px-3 py-px rounded-full hover:bg-transparent hover:text-primary border border-primary flex items-center gap-1 h-[30px]">
                                <span class="capitalize text-[14px] leading-[14px]">{{ tag }}</span>
                            </button>
                        </div>
                    </div>
                </td>
            </template>
            <template #action="{ item, index }">
                <td class="max-w-[100px]">

                    <div class="flex items-center gap-2 justify-start ">
                        <div class="flex items-center gap-2">
                            <NuxtLink :to="`/listing/${item.id}`" class="btn btn-ghost btn-xs">View</NuxtLink>
                            <button class="btn btn-ghost btn-xs">Edit</button>
                            <button class="btn btn-ghost btn-xs">Delete</button>
                        </div>
                    </div>
                </td>
            </template>
        </GlobalTable>
    </div>
</template>
