<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify';
const user = useUserStore();
const listing = useListingStore()
const route = useRoute()

const singleListing = ref(null)
const singleUser = ref(null)
const isEdit = ref(false)
const imageFile = ref(null)
const userId = ref(user?.user?.id)
const formListing = ref({
    title: '',
    description: '',
    tags: '',
    email: '',
    link: '',
    image: '',
    approved: 1
})

// Async logic runs before rendering due to <Suspense>
await (async () => {
    if (!route.query.id) {
        isEdit.value = false
        return
    }
    const response = await listing.fetchSingleListing({ id: route.query.id })
    if (response?.data?.status) {
        isEdit.value = true
        singleListing.value = response.data.data.listing
        singleUser.value = response.data.data.user
        // userId.value= response.data?.data?.user?.id
        formListing.value = {
            title: singleListing.value.title || '',
            description: singleListing.value.desc || '',
            tags: singleListing.value.tags || '',
            email: singleListing.value.email || '',
            link: singleListing.value.link || '',
            image: singleListing.value.image || '',
            approved: singleListing.value.approved,
        }
    }
})()
const assignImage = (event) => {
    const file = event.target.files[0]
    if (file) {
        imageFile.value = file // ✅ save actual file
        formListing.value.image = URL.createObjectURL(file) // ✅ for preview
    }
}

const submitListing = () => {
    const formData = new FormData()
    formData.append('userId', userId.value || singleUser.value.id)
    formData.append('Id', route.query.id || 0)
    formData.append('title', formListing.value.title)
    formData.append('Desc', formListing.value.description)
    formData.append('tags', formListing.value.tags)
    formData.append('email', formListing.value.email)
    formData.append('link', formListing.value.link)
    formData.append('approved', formListing.value.approved)

    if (imageFile.value) {
        formData.append('imageFile', imageFile.value) // ✅ real file, not blob URL
    }

    // ✅ Debug properly
    for (const pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1])
    }

    listing.saveListing(formData)
        .then((response) => {
            if (response.data.status) {
                toast.success(response?.data?.message);
            } else {
                toast.error(response?.data?.message);
            }
        })
        .catch((error) => {
            console.error('Error submitting listing:', error)
        })
}


</script>

<template>
    <div>
        <h2 class="text-xl mb-4">
            {{ isEdit ? 'Edit your listing' : 'Create a listing' }} {{ user?.user?.id }}
        </h2>
        <form @submit.prevent="submitListing">
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="text" class="grow" placeholder="Title" v-model="formListing.title" required />
            </label>
            <textarea placeholder="Description" class="textarea textarea-md w-full" rows="4"
                v-model="formListing.description"></textarea>
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="text" class="grow" placeholder="Tags" v-model="formListing.tags" required />
            </label>
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="text" class="grow" placeholder="Email" v-model="formListing.email" required />
            </label>
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="text" class="grow" placeholder="link" v-model="formListing.link" required />
            </label>
            <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                <IconsEmailIcon />
                <input type="file" class="grow" placeholder="link" @change="assignImage" />
            </label>
            <img :src="formListing.image" class="w-full h-auto object-cover rounded mb-4" v-if="formListing.image" />

            <button type="submit" class="btn btn-primary">
                {{ isEdit ? 'Update Listing' : 'Create Listing' }}
            </button>
        </form>
    </div>
</template>
