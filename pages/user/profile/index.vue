<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const user = useUserStore();
const router = useRouter();
const route = useRoute();
const profile = ref({});
onMounted(() => {
    ProfileGet();
});
const ProfileGet = async () => {
    const response = await user.getProfile();
    profile.value = response;
    console.log(response);
};

</script>
<template>
    <div class="bg-base-300 h-full">
        <pre>{{ profile }}</pre>
    </div>
</template>