<script setup lang="ts"></script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 md:flex md:items-end md:gap-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end flex-1">
      <slot />
    </div>
    <div v-if="$slots.actions" class="mt-4 md:mt-0 flex items-center justify-end gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
