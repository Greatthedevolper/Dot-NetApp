<script setup>
import { ref } from "vue";
import { watch } from "vue";
const user = useUserStore();
const listingSearch = ref('');
const listings = ref([]);
const tableView = ref(false);
const openListingModal = ref(false);
const pagination = ref({
    pageSize: 10,
    page: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
});

const fetchListings = async () => {
    try {
        const response = await user.fetchUserListings({
            page: pagination.value.page,
            pageSize: pagination.value.pageSize,
            search: listingSearch.value,
        });
        if (response?.data?.statusCode === 200) {
            const { data, currentPage, totalPages, totalCount, hasNext, hasPrevious } = response.data;
            listings.value = data.listings ?? [];

            Object.assign(pagination.value, { page: currentPage, totalPages, totalCount, hasNext, hasPrevious });
        } else {
            listings.value = [];
        }

    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}
await fetchListings();

let debounceTimer = null;
watch(
    listingSearch,
    () => {
        pagination.value.page = 1;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchListings();
        }, 500);
    }
);

const nextPage = () => {
    if (pagination.value.hasNext) {
        pagination.value.page++;
        fetchListings();
    }
}
const prevPage = () => {
    if (pagination.value.hasPrevious) {
        pagination.value.page--;
        fetchListings();
    }
}

const selectedTag = async (tag) => {
    listingSearch.value = tag;
}
const changeView = (view) => {
    tableView.value = view === 'table' ? true : false
}
const showListingModal = () => {
    openListingModal.value = !openListingModal.value
}
</script>

<template>
    <div class="h-full bg-base-100">
        <div class="flex items-center justify-between py-3 px-3 gap-2">
            <div class="flex items-center gap-2">
                <span role="button" class="text-3xl text-inherit" :class="{ 'text-primary text-3xl': tableView }"
                    @click="changeView('table')">
                    <IconsTableRows />
                </span>
                <span role="button" class="text-2xl text-inherit" :class="{ 'text-primary text-3xl': !tableView }"
                    @click="changeView('card')">
                    <IconsViewColumn />
                </span>
            </div>
            <div class="grow flex items-center gap-2">
                <input type="search" placeholder="Search listing" v-model="listingSearch"
                    class="bg-transparent border border-primary rounded-md h-10 grow px-2 focus-visible:ring-0 focus-visible:outline-none" />
                <button class="bg-primary px-3 py-1 h-10 rounded-md" @click="showListingModal">
                    Create New
                </button>
            </div>
        </div>

        <!-- Listings Grid -->
        <div class="h-[calc(100%-110px)] overflow-auto">
            <template v-if="listings?.length > 0">
                <template v-if="!tableView">
                    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 px-3">
                        <GlobalListingCard v-for="listing in listings" :key="listing.id" :item="listing"
                            :selectedTag="selectedTag" />
                    </div>
                </template>
                <template v-else>
                    <div class="px-3">
                        <GlobalListingTable :listings="listings" :selectedTag="selectedTag" />
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="flex flex-col items-center justify-center h-full gap-3">
                    <span class="text-5xl text-primary">
                        <IconsNoData />
                    </span>
                    <p class="capitalize"> no data found</p>
                </div>
            </template>
        </div>
        <!-- Pagination Controls -->
        <template v-if="listings?.length > 0">
            <GlobalPagination :pagination="pagination" :nextPage="nextPage" :prevPage="prevPage"
                :fetchListings="fetchListings" />
        </template>
        <Transition name="slide-fade">
            <GlobalDrawerModal v-if="openListingModal" classes="w-[450px]" @close="openListingModal = false" title="Create new listing">
            </GlobalDrawerModal>
        </Transition>
    </div>
</template>