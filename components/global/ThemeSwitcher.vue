<script setup>
import { ref, onMounted, watch } from "vue";
const globalStore = useGlobalStore();
const themes = ref([
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween",
    "garden", "forest", "aqua", "lofi", "pastel", "fantasy",
    "wireframe", "black", "luxury", "dracula", "cmyk", "autumn",
    "business", "acid", "lemonade", "night", "coffee", "winter",
    "dim", "nord", "sunset"
]);

onMounted(() => {
    globalStore.setTheme(globalStore.theme);
});

watch(() => globalStore.theme, (newTheme) => {
    globalStore.setTheme(newTheme);
});;
</script>

<template>
    <div class="flex items-center gap-2">
        <select v-model="globalStore.theme" class="select min-h-8 h-8 select-bordered w-full">
            <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
        </select>
    </div>
</template>
