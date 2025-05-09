<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
const listing = useListingStore();
const route = useRoute();
const router = useRouter();
const singleListing = ref(null);
const singleUser = ref(null);
const openListingModal = ref(false);

const getSingleListingOnPageLoad = async () => {
    try {
        if (!route.params._id) {
            console.error("Listing ID is missing in route params.");
            return;
        }
        const response = await listing.fetchSingleListing({ id: route.params._id });
        singleListing.value = response.data?.data?.listing;
        singleUser.value = response.data?.data?.user;
    } catch (error) {
        console.error("Error fetching listing:", error);
    }
};

onMounted(getSingleListingOnPageLoad);

const listingApproval = async (id, approved) => {
    try {
        let data = {
            id: id,
            approved: approved == 1 ? 0 : 1
        }
        const response = await listing.listingApproved(data)
        if (response.data.status) {
            toast.success(response?.data?.message);
            getSingleListingOnPageLoad();
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        console.error("Error fetching listing:", error);
    }
}
const deleteListing = async (id) => {
    try {
        const response = await listing.listingDelete(id)
        if (response.data.status) {
            toast.success(response?.data?.message);
            router.push('/user/dashboard')
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        console.error("Error fetching listing:", error);
    }
}
const showListingModal = () => {
    openListingModal.value = !openListingModal.value
}
</script>

<template>
    <div class="bg-base-300 h-full py-5">
        <div class="px-3 max-w-[1100px] mx-auto">
            <div
                class="flex items-center justify-between mb-6 bg-primaryText  text-primaryBg hover:bg-primaryBg hover:text-primaryText border border-primaryText p-6 rounded-md font-medium">
                <p>This listing is {{ singleListing?.approved == 1 ? 'Approved' : 'Disapproved' }}</p>
                <button type="button" @click="listingApproval(singleListing?.id, singleListing?.approved)"
                    class="btn btn-primary">
                    {{ singleListing?.approved == 1 ? 'Disapprove it' : 'Approve it' }}
                </button>
            </div>
            <div class="flex gap-4 md:flex-row flex-col">
                <div class="md:w-1/4 md:h-auto w-full h-[150px] shrink-0">
                    <img :src="singleListing?.image" alt="listing image" loading="lazy"
                        class="w-full h-full object-cover rounded">
                </div>
                <div class="grow">
                    <!-- listing-info -->
                    <div class="mb-6">

                        <div class="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
                            <p class="capitalize"> Listing details </p>
                            <div class="flex items-center gap-2">
                                <button @click="showListingModal" class="btn btn-primary ">
                                    Edit
                                </button>
                                <button class="btn btn-danger" @click="deleteListing(singleListing?.id)">
                                    <span class="capitalize text-[12px] leading-[12px]">Delete</span>
                                </button>
                            </div>
                        </div>
                        <h3 class="capitalize font-bold text-2xl mb-4">{{ singleListing?.title }}</h3>
                        <p>{{ singleListing?.desc }}</p>
                    </div>
                    <!-- contact-info -->
                    <div class="mb-6">
                        <p class="capitalize border-b mb--2"> Contact Info</p>
                        <div v-if="singleListing?.email" class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-at"></i>
                            <p>Email :</p>
                            <a href="mailto:{{singleListing?.email}}" class="text-link">{{ singleListing?.email }}</a>

                        </div>
                        <div v-if="listing?.link" class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-up-right-from-square"></i>
                            <p>External Link :</p>
                            <a :href="singleListing?.link" class="text-link" target="_blank">{{ singleListing?.link
                            }}</a>

                        </div>
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-user"></i>
                            <p>Listed By :</p>
                            <a href="{{'/user/' . $user->id}}" class="text-link">{{ singleUser?.name }}</a>

                        </div>
                        <div class="mb-6">
                            <p class="capitalize border-b mb-2">tags</p>
                            <div v-if="singleListing?.tags" class="flex items-center gap-3 my-4">
                                <div v-for="tag in singleListing.tags.split(',')" :key="tag">
                                    <button
                                        class="text-inherit px-3 py-px rounded-full hover:bg-transparent hover:text-primary border border-primary flex items-center gap-1 h-[30px]">
                                        <span class="capitalize text-[14px] leading-[14px]">{{ tag }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Transition name="slide-fade">
            <GlobalDrawerLayer :isClosed="openListingModal" @close="openListingModal = false" />
        </Transition>
        <Transition name="slide-fade">
            <GlobalDrawerModal v-if="openListingModal" classes="w-[450px]" @close="openListingModal = false"
                :id="singleListing?.id" title="Edit listing" :isEdit="true" @refresh="getSingleListingOnPageLoad">
            </GlobalDrawerModal>
        </Transition>
    </div>

</template>