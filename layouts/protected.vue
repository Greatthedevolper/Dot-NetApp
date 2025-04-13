<template>
  <div class="auth h-[calc(100vh-1px)]">
    <slot />
  </div>
</template>

<style>
.auth-page {
  @apply w-screen h-full flex items-center justify-center flex-col;

  .auth-pge-heading {
    @apply text-inherit font-bold text-3xl;
  }

  .auth-wrapper {
    @apply border p-3 rounded-[10px] md:max-w-[400px] sm:max-w-[90%] max-w-full w-full min-h-max;

    .tab-button-wrapper {
      @apply grid grid-cols-2;

      button {
        &.tab-button {
          @apply appearance-none border border-transparent rounded-t-xl px-2 h-12 w-full flex items-center justify-center;

          &.active {
            @apply bg-base-200 text-inherit border border-inherit;
          }
        }
      }
    }
  }
}
</style>