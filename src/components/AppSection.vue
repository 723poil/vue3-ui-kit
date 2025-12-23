<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <section class="bg-gray-50 p-5 rounded-xl border border-gray-200">
    <h4 v-if="title" class="text-base font-bold text-gray-900 mb-4">
      {{ title }}
    </h4>
    <slot></slot>
  </section>
</template>
