<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { mdiImageOff } from "@mdi/js";
import AppIcon from "./AppIcon.vue";

interface Props {
  src?: string | null;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  aspectRatio?: number;
  shape?: "square" | "circle" | "rounded" | "none";
}

const props = withDefaults(defineProps<Props>(), {
  src: null,
  alt: "Image",
  fit: "cover",
  aspectRatio: undefined,
  shape: "rounded",
});

const isLoading = ref(true);
const hasError = ref(false);

const handleLoad = () => {
  isLoading.value = false;
  hasError.value = false;
};

const handleError = () => {
  isLoading.value = false;
  hasError.value = true;
};

// src가 변경되면 상태 초기화
watch(
  () => props.src,
  () => {
    isLoading.value = !!props.src;
    hasError.value = !props.src;
  },
  { immediate: true },
);

const containerStyle = computed(() => {
  const style: any = {};
  if (props.aspectRatio) {
    style.aspectRatio = props.aspectRatio;
  }
  return style;
});

const shapeClass = computed(() => {
  switch (props.shape) {
    case "circle":
      return "rounded-full";
    case "rounded":
      return "rounded-lg";
    case "square":
    case "none":
    default:
      return "rounded-none";
  }
});
</script>

<template>
  <div
    class="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200"
    :class="shapeClass"
    :style="containerStyle"
  >
    <!-- 실제 이미지 -->
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      class="w-full h-full transition-opacity duration-300"
      :class="[isLoading ? 'opacity-0' : 'opacity-100', `object-${fit}`]"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- 로딩 중 (스켈레톤) -->
    <div v-if="isLoading && src" class="absolute inset-0 bg-gray-200 animate-pulse"></div>

    <!-- 이미지 없음 (URL Empty) -->
    <div v-if="!src" class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
      <slot name="empty">
        <AppIcon :path="mdiImageOff" :size="32" class="mb-2 opacity-50" />
        <span class="text-xs text-gray-400 font-medium">No Image</span>
      </slot>
    </div>

    <!-- 에러 (Load Error) -->
    <div
      v-else-if="hasError"
      class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50"
    >
      <slot name="error">
        <AppIcon :path="mdiImageOff" :size="32" class="mb-2 opacity-50" />
        <span class="text-xs text-gray-400 font-medium">Error</span>
      </slot>
    </div>
  </div>
</template>
