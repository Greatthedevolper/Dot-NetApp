<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
    listings: Object,
    selectedTag: Function
});
const selectedItems = ref([]);

const selectAll = (event) => {
    if (event.target.checked) {
        selectedItems.value = props.listings.map(item => item.id);
    } else {
        selectedItems.value = [];
    }
    console.log(selectedItems.value)
};

const isAllSelected = computed(() => {
    return props.listings.length > 0 && selectedItems.value.length === props.listings.length;
});

const isIndeterminate = computed(() => {
    return selectedItems.value.length > 0 && selectedItems.value.length < props.listings.length;
});
const singleSelect = (event, id) => {
    if (event.target.checked) {
        if (!selectedItems.value.includes(id)) {
            selectedItems.value.push(id);
        }
    } else {
        selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)

    }
    console.log(selectedItems.value);
}

const listingStatus = (status) => {
    var classes = status == 1 ? 'bg-green-100 text-green-800'
        : status == 0 ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800';
    var label = status == 1 ? 'Approved'
        : status == 0 ? 'Pending'
            : 'Rejected';
    return { classes, label };
};
const listingImage = (img) => {
    var computedImage = img == null ? '/images/default_listing-image.jpeg' :
        !img.includes('.png' || '.jpeg' || '.webp' || '.svg' ||'.jpg') ? '/images/default_listing-image.jpeg' : 'http://localhost:5067/'+img;
    return computedImage;
};
</script>

<template>
    <div class="relative">
        <table class="table relative">
            <thead class="sticky top-0 z-10">
                <tr>
                    <th class="rounded-l-lg bg-base-200">
                        <label>
                            <input type="checkbox" class="checkbox" :checked="isAllSelected"
                                :indeterminate="isIndeterminate" @change="selectAll" />
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
                                <input type="checkbox" class="checkbox" :value="item.id" v-model="selectedItems"
                                    @change="(event) => singleSelect(event, item.id)" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
                                        <img :src="item.image" alt="Avatar Tailwind CSS Component" />

                                    </div>

                                </div>

                                <div>
                                    <div class="font-bold line-clamp-1">{{ item.title }}</div>
                                    <div class="text-sm opacity-50">{{ item.email }}</div>
                                    <div class="text-sm opacity-50">{{ item.image }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="line-clamp-2 mb-1">
                                {{ item.desc }}
                            </p>
                            <div v-if="item.tags" class="flex items-center gap-3">
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
                                <NuxtLink :to="`/listing/${item.id}`" class="btn btn-ghost btn-xs">View</NuxtLink>
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
