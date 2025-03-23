<script setup>
defineProps({
    pagination: Object,
    nextPage: Function,
    prevPage: Function,
    fetchListings: Function,

})
</script>
<template>
    <div class="max-w-full w-full px-3">
        <div class="flex justify-center gap-3 my-2 items-center">
            <button @click="prevPage" :disabled="!pagination.hasPrevious"
                class="px-3 h-8 inline-flex items-center justify-center gap-2  border border-primary rounded bg-transparent text-inherit disabled:opacity-50">
                <IconsArrowCircleLeftIcon />
                <span>
                    Previous
                </span>
            </button>
            <ul class="flex items-center gap-2">
                <li v-for="page in pagination.totalPages" :key="page">
                    <button @click="fetchListings(pagination.page = page)"
                        :class="{ 'bg-primary text-inherit': pagination.page === page }"
                        class="px-3 h-8 inline-flex items-center justify-center gap-2  border border-primary rounded">
                        <span>{{ page }}</span>
                    </button>
                </li>
            </ul>
            <button @click="nextPage" :disabled="!pagination.hasNext"
                class="px-3 h-8 inline-flex items-center justify-center gap-2  border border-primary rounded bg-transparent text-inherit disabled:opacity-50">
                <span>Next</span>
                <IconsArrowCircleRightIcon />
            </button>
        </div>
    </div>
</template>