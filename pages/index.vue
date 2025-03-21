<script setup>
import { ref } from "vue";
import { NuxtLink } from "#components";
import { watch } from "vue";
const user = useUserStore();
const listingSearch = ref('');
const listings = ref([]);
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
    const response = await user.fetchListings({
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

</script>

<template>
  <div class="h-[calc(100vh-56px)] bg-base-100">
    <!-- Search Input -->
    <div class="flex items-center justify-end py-3 px-3">
      <input type="search" placeholder="Search listing" v-model="listingSearch"
        class="border border-primary rounded-md h-10 basis-[250px] px-2 focus-visible:ring-0 focus-visible:outline-none" />
    </div>

    <!-- Listings Grid -->
    <div
      class="h-[calc(100%-130px)] overflow-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-3">
      <template v-if="listings?.length > 0">
        <div v-for="listing in listings" :key="listing.id" class="border border-primary rounded-md shadow shadow-white">
          <NuxtLink to="/guest/sign-in">
            <div class="border-b border-primary px-3 py-2">
              <h3 class="line-clamp-2 mb-0 font-medium">{{ listing.title }}</h3>
            </div>
            <div class="p-3">
              <p class="line-clamp-4">{{ listing.desc }}</p>
              <div v-if="listing.tags" class="flex items-center gap-3 my-4">
                <div v-for="tag in listing.tags.split(',')" :key="tag">
                  <button @click="selectedTag(tag)"
                    class="bg-primary text-white px-3 py-px rounded-full hover:bg-primaryText hover:text-primaryBg border border-primaryBg flex items-center gap-1 h-[30px]">
                    <span class="capitalize text-[14px] leading-[14px]">{{ tag }}</span>
                  </button>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </template>
    </div>

    <!-- Pagination Controls -->
    <template v-if="listings?.length > 0">
      <div class="max-w-full w-full px-3">
        <div class="flex justify-center gap-3 my-2 items-center">
          <button @click="prevPage" :disabled="!pagination.hasPrevious"
            class="px-4 py-2 border rounded bg-primary text-white disabled:opacity-50">
            Previous
          </button>
          <span>Page {{ pagination.page }} of {{ pagination.totalPages }}</span>
          <button @click="nextPage" :disabled="!pagination.hasNext"
            class="px-4 py-2 border rounded bg-primary text-white disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
