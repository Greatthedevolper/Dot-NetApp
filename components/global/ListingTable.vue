<script setup>
import { ref, computed } from "vue";
defineProps({
    listings: Object,
    selectedTag: Function
})
const listingStatus = (status) => {
    var classes = status == 1 ? 'bg-green-100 text-green-800' : status == 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
    var label = status == 1 ? 'Approved' : status == 0 ? 'Pending' : 'Rejected'
    return { classes, label }
}
</script>
<template>
    <div class=" relative">
        <table class="table relative">
            <!-- head -->
            <thead class="sticky top-0  z-10">
                <tr>
                    <th class="rounded-l-lg bg-base-200">
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <th class="bg-base-200">Title</th>
                    <th class="bg-base-200">Description</th>
                    <th class="bg-base-200">Status</th>
                    <th class="bg-base-200 rounded-r-lg">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="item in listings" :key="item.id">
                    <tr class="hover:bg-base-200 border-primary">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
                                        <img src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold line-clamp-1">{{ item.title }}</div>
                                    <div class="text-sm opacity-50">{{ item.email }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="line-clamp-2 mb-1">
                                {{ item.desc }}
                            </p>
                            <div v-if="item.tags" class="flex items-center gap-3 ">
                                <div v-for="tag in item.tags.split(',')" :key="tag">
                                    <button @click="selectedTag(tag)"
                                        class="text-inherit px-3 py-px rounded-full hover:bg-transparent hover:text-primary border border-primary flex items-center gap-1 h-[30px]">
                                        <span class="capitalize text-[14px] leading-[14px]">{{ tag }}</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span role="button" :class="listingStatus(item.approved).classes"
                                class="rounded-full px-3 py-1 inline-flex items-center justify-center">
                                <span>{{ listingStatus(item.approved).label }}</span>
                            </span>
                        </td>

                        <th>
                            <div class="flex items-center gap-2">

                                <button class="btn btn-ghost btn-xs">View</button>
                                <button class="btn btn-ghost btn-xs">Edit</button>
                                <button class="btn btn-ghost btn-xs">Delete</button>
                            </div>
                        </th>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>