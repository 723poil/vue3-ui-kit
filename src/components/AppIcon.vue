<script setup lang="ts">
interface Props {
  path: string;
  size?: number | string;
  color?: string;
  viewBox?: string;
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: "currentColor",
  viewBox: "0 0 24 24",
});
</script>

<template>
  <svg :width="size" :height="size" :viewBox="viewBox" :style="{ fill: color }" xmlns="http://www.w3.org/2000/svg">
    <path :d="path" />
  </svg>
</template>
