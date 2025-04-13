<template>
    <div class="bg-base-300 h-full py-5">
        <div class="max-w-[1100px] mx-auto">
            <Suspense>
                <template #default>
                    <GlobalListingForm />
                </template>
                <template #fallback>
                    <div class="text-center py-10">Loading Listing Form...</div>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
</script>