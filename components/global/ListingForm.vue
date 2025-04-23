<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
const user = useUserStore();
const listing = useListingStore()
const props = defineProps({
    classes: {
        type: String,
        default: ''
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    listingId: {
        type: Number,
        default: null
    },
})


const selectedCategory = ref(null)
const singleListing = ref(null)
const singleUser = ref(null)
const isEdit = ref(false)
const openCategoryModal = ref(false)
const imageFile = ref(null)
const userId = ref(user?.user?.id)
const formListing = ref({
    title: '',
    description: '',
    tags: '',
    email: '',
    link: '',
    category: '',
    image: '',
    approved: 1
})


const fetchSingleListing = async (id) => {
    const response = await listing.fetchSingleListing({ id })
    if (response?.data?.status) {
        isEdit.value = true
        singleListing.value = response.data.data.listing
        singleUser.value = response.data.data.user
        formListing.value.category = response.data.data.category.id
        selectedCategory.value = response.data.data.category.name
        formListing.value = {
            title: singleListing.value.title || '',
            description: singleListing.value.desc || '',
            tags: singleListing.value.tags || '',
            email: singleListing.value.email || '',
            link: singleListing.value.link || '',
            category: singleListing.value.category || '',
            image: singleListing.value.image || '',
            approved: singleListing.value.approved,
        }
    }
}


onMounted(() => {
    if (props.listingId) {
        fetchSingleListing(props.listingId)
    }
});
const assignImage = (event) => {
    const file = event.target.files[0]
    if (file) {
        imageFile.value = file
        formListing.value.image = URL.createObjectURL(file)
    }
}

const submitListing = () => {
    const formData = new FormData()
    formData.append('userId', userId.value || singleUser.value.id)
    formData.append('Id', props.listingId || 0)
    formData.append('title', formListing.value.title)
    formData.append('Desc', formListing.value.description)
    formData.append('tags', formListing.value.tags)
    formData.append('email', formListing.value.email)
    formData.append('link', formListing.value.link)
    formData.append('link', formListing.value.link)
    formData.append('CategoryId', formListing.value.category)
    formData.append('approved', formListing.value.approved)

    let relativeImagePath = ''

    if (imageFile.value) {
        formData.append('imageFile', imageFile.value)
    } else if (isEdit.value && singleListing.value.image && !imageFile.value) {
        const url = new URL(formListing.value.image)
        relativeImagePath = url.pathname
        if (relativeImagePath.startsWith('/')) {
            relativeImagePath = relativeImagePath.substring(1)
        }
        formData.append('existingImage', relativeImagePath)
    }

    listing.saveListing(formData)
        .then((response) => {
            if (response.data.status) {
                toast.success(response?.data?.message);
                successFunction();
            } else {
                toast.error(response?.data?.message);
            }
        })
        .catch((error) => {
            console.error('Error submitting listing:', error)
        })
}
const emit = defineEmits(['closeFormed', 'refresh'])
const handleClose = () => {
    emit('closeFormed')
}
const successFunction = () => {
    emit('closeFormed')
    emit('refresh')
}
const openCateModal = () => {
    openCategoryModal.value = true
}
const selectCategory = (cat) => {
    formListing.value.category = cat.id
    selectedCategory.value = cat.name
    openCategoryModal.value = false
}

</script>

<template>
    <div class="h-full">

        <form @submit.prevent="submitListing" class="h-full">
            <div class="h-[calc(100%-52px)] overflow-y-auto px-4 py-2">
                <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                    <IconsEmailIcon />
                    <input type="text" class="grow" placeholder="Title" v-model="formListing.title" required />
                </label>
                <textarea placeholder="Description" class="textarea w-full input-bordered mb-2" rows="4"
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
                <button type="button" role="button" @click="openCateModal">Select category</button>
                <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                    <IconsEmailIcon />
                    <input type="text" class="grow" placeholder="link" v-model="selectedCategory" required />
                </label>
                <div class="flex items-center justify-between gap-4">

                    <label
                        class="input bg-transparent input-bordered flex items-center justify-center gap-2 mb-3 grow h-[100px]  cursor-pointer">
                        <div class="flex items-center justify-center w-full   grow flex-col">
                            <IconsEmailIcon />
                            <span>Upload an photo</span>
                            <input type="file" class="grow invisible w-0 h-0" placeholder="link"
                                @change="assignImage" />
                        </div>
                    </label>
                    <img :src="formListing.image" class="w-24 h-24 object-cover rounded mb-4"
                        v-if="formListing.image" />
                </div>
            </div>
            <div class="px-4 flex items-center gap-3">
                <button type="submit" class="btn btn-primary">
                    {{ isEdit ? 'Update Listing' : 'Create Listing' }}
                </button>
                <button type="reset" class="btn btn-primary" @click="handleClose">
                    Cancel
                </button>
            </div>
        </form>
        <Transition name="slide-fade">
            <GlobalCategorySelection v-if="openCategoryModal" classes="w-[450px]" @close="openCategoryModal = false"
                title="Select Category" @categorySelect="selectCategory">
            </GlobalCategorySelection>
        </Transition>
    </div>
</template>
