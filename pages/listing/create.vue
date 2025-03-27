<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const listing = useListingStore();
const route = useRoute();
const singleListing = ref(null);
const singleUser = ref(null);
const isEdit = ref(false)
const formListing = ref({
    title: "",
    description: "",
    tags: '',
    category: "",
});

const getSingleListingOnPageLoad = async () => {
    try {
        if (!route.query.id) {
            console.error("Listing ID is missing in route params.");
            isEdit.value = false
            return;
        }
        const response = await listing.fetchSingleListing({ id: route.query.id });
        if (response?.data?.status) {
            isEdit.value = true;
            singleListing.value = response.data?.data?.listing;
            singleUser.value = response.data?.data?.user;

            // ✅ Populate form fields without modifying singleListing
            formListing.value = {
                title: singleListing.value.title || "",
                description: singleListing.value.desc || "",
                tags: singleListing.value.tags || '',
                category: singleListing.value.category || "",
            };
        }
    } catch (error) {
        console.error("Error fetching listing:", error);
        isEdit.value = false
    }
};

onMounted(getSingleListingOnPageLoad);
const listingImage = (img) => {
    if (!img) return "/images/default_listing-image.jpeg";

    const validExtensions = [".png", ".jpeg", ".webp", ".svg"];
    const hasValidExtension = validExtensions.some(ext => img.includes(ext));

    return hasValidExtension ? img : "/images/default_listing-image.jpeg";
};

</script>
<template>
    <div class="bg-base-300 h-full py-5">
        <div class="px-3 max-w-[1100px]">
            {{ singleListing }}
        </div>
        <h2>{{ isEdit ? 'Edit your listing' : 'Create a listing' }}</h2>

        <form @submit.prevent="submitListing">
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="text" class="grow" placeholder="title" v-model="formListing.title" required />
            </label>
            <textarea placeholder="Description" class="textarea textarea-md w-full" rows="4"
                v-model="formListing.description"></textarea>
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="text" class="grow" placeholder="title" v-model="formListing.tags" required />
            </label>
        </form>
    </div>
</template>