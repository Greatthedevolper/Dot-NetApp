<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const user = useUserStore();
const category = useCategoryStore();


const allCategories = ref({});

onMounted(() => {
    getAllCategories();
});

// Fetch user profile data
const getAllCategories = async () => {
    const response = await category.fetchCategories();
    allCategories.value = response?.data

};

const columns = [

    {
        name: 'name',
        label: 'Name',
        field: 'name',
        sortable: true,
        align: 'left',
        width: '100',
    },
    {
        name: 'description',
        label: 'Description',
        field: 'description',
        sortable: true,
        align: 'left',
        width: '350',
    },
    {
        name: 'createdAt',
        label: 'Created At',
        field: 'createdAt',
        sortable: true,
        align: 'left',
        width: '100',
    },
    {
        name: 'action',
        label: 'Action',
        field: 'action',
        sortable: false,
        align: 'center',
        width: '100',
    }
]




</script>

<template>
    <div class="bg-base-300 h-full">
        <div class="container mx-auto pt-4 px-4">
            <!-- <pre>{{ allCategories }}</pre> -->
            <GlobalTable :data="allCategories" :columns="columns">
                <template #action="{ item, index }">
                    <td class="max-w-[100px]">

                        <div class="flex items-center gap-2 justify-end ">
                            <div class="inline-flex items-center gap-1 justify-start grow">
                                <NuxtLink :to="`/listing/${item.id}`" class="btn btn-ghost btn-xs">View</NuxtLink>
                                <button class="btn btn-ghost btn-xs">Edit</button>
                                <button class="btn btn-ghost btn-xs">Delete</button>
                            </div>
                        </div>
                    </td>
                </template>
            </GlobalTable>
        </div>
    </div>
</template>
