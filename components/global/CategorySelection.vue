<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
const category = useCategoryStore();
const allCategories = ref(null)
const isAddNewCategory = ref(false)
const categoryName = ref('')
const emit = defineEmits(['categorySelect', 'refresh', 'close'])
const fetchCategories = async () => {
    const response = await category.fetchCategories();
    allCategories.value = response.data
}
onMounted(() => {
    fetchCategories();
});
defineProps({
    classes: {
        type: String,
        default: ''
    },
    isClosed: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        required: true
    },
})
const selectCategory = (category) => {
    emit('categorySelect', category)
}
const close = () => {
    emit('close')
}
const addedNewCategory = () => {
    isAddNewCategory.value = true
}
const addNewCategoryFunction = async () => {
    const response = await category.saveCategory(categoryName.value)

    if (response.data.status) {
        toast.success(response?.data?.message);
        fetchCategories();
        isAddNewCategory.value = false
        categoryName.value = ''
    } else {
        toast.error(response?.data?.message);
    }
}
</script>
<template>
    <div class="h-screen fixed right-0 top-0 bottom-0 z-20 bg-base-100 border border-base-300" :class="classes">
        <div class="flex items-center justify-between  px-3 border-b border-base-300 py-3">
            <div class="grow flex items-center justify-between ">
                <h3 class="text-xl">{{ title }}</h3>
                <span role="button" class="inline-flex items-center justify-center rounded-full bg-base-300 w-6 h-6"
                    @click="close">X</span>
            </div>
        </div>
        <div class=" px-3 border-b border-base-300 py-3">

            <ul class="flex flex-col gap-2">
                <li v-for="category in allCategories" @click="selectCategory(category)" class="cursor-pointer">
                    <span class="capitalize">{{ category.name }}</span>
                </li>
            </ul>
            <button @click="addedNewCategory" class="mt-4 btn btn-primary w-full !min-h-8 !h-10">Add new
                category+</button>
        </div>
        <template v-if="isAddNewCategory">

            <div class=" px-3 border-b border-base-300 py-3">
                <label class="input bg-transparent input-bordered flex items-center gap-2 mb-3">
                    <IconsEmailIcon />
                    <input type="text" class="grow" placeholder="link" v-model="categoryName"
                        @keyup.enter="addNewCategoryFunction" required />
                </label>
            </div>
        </template>
    </div>
</template>