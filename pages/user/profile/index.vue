<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useUserStore } from "@/stores/user"; // Ensure correct store import

const user = useUserStore();
const router = useRouter();
const route = useRoute();

const isEdit = ref(false);
const editProfile = ref({
    name: '',
    email: '',
    picture: null // Set to null instead of an empty string for better handling
});
const profile = ref({});

onMounted(() => {
    ProfileGet();
});

// Fetch user profile data
const ProfileGet = async () => {
    const response = await user.getProfile();
    if (response?.user) {
        profile.value = response?.user
        editProfile.value.name = response.user.name;
        editProfile.value.email = response.user.email;
        editProfile.value.picture = response.user.profilePicture ?? "/images/default_listing-image.jpeg";
    }
};

// Toggle edit mode
const editForm = () => {
    isEdit.value = !isEdit.value;
};

// Handle profile update
const ProfileUpdate = async () => {
    const payload = {
        Id: profile.value.id,
        Name: editProfile.value.name,
        Email: editProfile.value.email,
    }
    const response = await user.userProfileUpdate(payload);
    if (response.status) {
        toast.success(response.message);
        isEdit.value = false;
        ProfileGet();
    } else {
        toast.error(response.message || "Failed to update profile.");
    }
};

// Handle profile picture upload
const ProfileUpdatePicture = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("File", file);
    console.log(event.target.files[0], 'jkjkj')

    const response = await user.setUserProfilePicture(formData);
    console.log(response, 'jkjkj')
    if (response.status) {
        toast.success(response.message);
        ProfileGet();
    } else {
        toast.error(response.message || "Failed to update profile.");
    }
};
</script>

<template>
    <div class="bg-base-300 h-full">
        <div class="container mx-auto pt-4">
            <div class="flex items-center gap-4">
                <div class="flex-1 custom-active rounded-lg bg-base-200 p-4 relative">
                    <div class="flex items-center gap-2 mb-4">
                        <h1 class="text-2xl font-semibold">Profile</h1>
                        <button @click="editForm" class="btn btn-sm">
                            <IconsEditIcon />
                        </button>
                    </div>

                    <div class="flex items-center">
                        <form @submit.prevent="ProfileUpdate">
                            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3 w-full">
                                <IconsEditIcon />
                                <input type="text" class="grow" placeholder="Name" v-model="editProfile.name"
                                    :disabled="!isEdit" />
                            </label>
                            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3 w-full">
                                <IconsEmailIcon />
                                <input type="email" class="grow" placeholder="Email" v-model="editProfile.email"
                                    :disabled="!isEdit" />
                            </label>
                            <button type="submit" class="btn btn-primary h-8 min-h-8" v-if="isEdit">Update</button>
                        </form>
                    </div>
                </div>

                <div class="custom-active rounded-lg bg-base-200 p-4 relative">
                    <div class="flex flex-col items-center justify-center max-w-min mx-auto relative">
                        <div class="bg-base-200 rounded-t-full top-[2px] inline-block z-20 size-32 p-3">
                            <label
                                class="size-28 rounded-full border group p-px absolute top-3 -translate-x-1/2 left-1/2"
                                role="button" for="profile-pic">
                                <input type="file" accept="image/*" id="profile-pic"
                                    class="invisible w-0 h-0 absolute top-0" @change="ProfileUpdatePicture" />
                                <img class="rounded-full bg-cover w-full h-full" :src="editProfile.picture"
                                    alt="Profile Picture" />
                                <span
                                    class="absolute bottom-[2px] right-2 z-20 rounded-full bg-base-300 border-3 border-base-300 p-px text-base inline-flex items-center justify-center size-6">

                                    <IconsUploadIcon class="text-inherit " />
                                </span>
                                <div
                                    class="absolute w-full h-full bg-dark/60 top-0 left-0 z-10 invisible group-hover:visible">
                                </div>
                            </label>
                        </div>
                        <div>
                            <p class="font-medium text-center capitalize">{{ editProfile.name }}</p>
                            <a :href="`mailto:${editProfile.email}`" class="text-inherit">{{ editProfile.email }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
