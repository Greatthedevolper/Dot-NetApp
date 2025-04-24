<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
    listings: Object,
    selectedTag: Function,
    columns: {
        type: Array,
        default: () => []
    },
    data: {
        type: Object,
        default: () => { }
    }
});
const selectedItems = ref([]);

const selectAll = (event) => {
    if (event.target.checked) {
        selectedItems.value = props.data.map(item => item.id);
    } else {
        selectedItems.value = [];
    }
    console.log(selectedItems.value)
};

const isAllSelected = computed(() => {
    return props.data.length > 0 && selectedItems.value.length === props.data.length;
});

const isIndeterminate = computed(() => {
    return selectedItems.value.length > 0 && selectedItems.value.length < props.data.length;
});
const singleSelect = (event, id) => {
    if (event.target.checked) {
        if (!selectedItems.value.includes(id)) {
            selectedItems.value.push(id);
        }
    } else {
        selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)

    }
    console.log(selectedItems.value);
}


</script>

<template>
    <div class="relative">
        <table class="table relative">
            <thead class="sticky top-0 z-10">
                <tr>
                    <th class="rounded-l-lg bg-base-200" :style="{ width: '30px !important' }">
                        <label>
                            <input type="checkbox" class="checkbox" :checked="isAllSelected"
                                :indeterminate="isIndeterminate" @change="selectAll" />
                        </label>
                    </th>
                    <th v-for="(column, index) in columns" :key="column.name" class="bg-base-200"
                        :style="{ width: column.width + 'px !important' }" :class="[
                            {
                                'rounded-r-lg': index === columns?.length - 1,
                                'cursor-pointer': column.sortable,
                            },
                        ]">
                        <div class="flex items-center gap-2"
                            :class="column.align == 'center' ? 'justify-start' : 'justify-start'">
                            <slot :name="'header-' + column.name">
                                <span class="capitalize">{{ column.label }}</span>
                            </slot>
                        </div>
                    </th>
                </tr>
            </thead>
            <!-- <pre>{{ data }}</pre> -->
            <tbody>
                <template v-for="(item, index) in data" :key="item.id">
                    <tr class="hover:bg-base-200 border-primary">
                        <td>
                            <label>
                                <input type="checkbox" class="checkbox" :value="item.id" v-model="selectedItems"
                                    @change="(event) => singleSelect(event, item.id)" />
                            </label>
                        </td>
                        <template v-for="column in columns" :key="column.name">
                            <slot :name="column.name" v-bind="{ item, index }">

                                <td class="px-2  max-w-max" :style="{ width: column.width + 'px !important' }">
                                    <p class="inline-block whitespace-nowrap">{{ item[column.name] }}</p>
                                </td>
                            </slot>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
