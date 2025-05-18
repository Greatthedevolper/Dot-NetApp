<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { NuxtLink } from "#components";
import { watch } from "vue";
const nuxtApp = useNuxtApp();
const $columns = nuxtApp.$columns.listingColumns;
const user = useUserStore();
const listingSearch = ref('');
const listings = ref([]);
const tableView = ref(false);
const listingOrder = ref('asc');
const listingColumn = ref('');
const pagination = ref({
  pageSize: 10,
  page: 1,
  totalPages: 1,
  totalCount: 0,
  hasNext: false,
  hasPrevious: false,
});

const fetchListings = async () => {
  if(!user?.authenticated) return
  try {
    const response = await user.fetchListings({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      search: listingSearch.value,
      order:listingOrder.value,
      orderBy:'id'
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
const descTable = (val,key) => {
    console.log(val,"---",key)
    listingColumn.value = val.name
    listingOrder.value = key
    fetchListings();
}
</script>

<template>
  <div class="h-full bg-base-100">
    <div class="flex items-center justify-between py-3 px-3">
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
      <input type="search" placeholder="Search listing" v-model="listingSearch"
        class="bg-transparent border border-primary rounded-md h-10 basis-[250px] px-2 focus-visible:ring-0 focus-visible:outline-none" />
    </div>

    <!-- Listings Grid -->
    <div class="h-[calc(100%-110px)] overflow-auto">
      <template v-if="listings?.length > 0">
        <template v-if="!tableView">
          <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-3">
            <GlobalListingCard v-for="listing in listings" :key="listing.id" :item="listing"
              :selectedTag="selectedTag" />
          </div>
        </template>
        <template v-else>
          <div class="px-3">
            <GlobalListingTable :listings="listings" :columns="$columns" :selectedTag="selectedTag"
              :descTable="descTable" :order="listingOrder" :orderColumn="listingColumn"/>
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
  </div>
</template>
