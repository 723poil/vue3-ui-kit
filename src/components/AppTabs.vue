<script setup lang="ts">
import { computed } from "vue";

interface TabItem {
  id: string | number;
  label: string;
}

interface Props {
  modelValue: string | number;
  items: TabItem[];
  direction?: "horizontal" | "vertical";
}

const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const containerClasses = computed(() => {
  return props.direction === "vertical" ? "flex flex-col gap-2" : "flex flex-row gap-2 overflow-x-auto";
});

const buttonClasses = computed(() => {
  return props.direction === "vertical" ? "w-full text-left" : "whitespace-nowrap";
});
</script>

<template>
  <nav :class="containerClasses">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="px-4 py-3 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
      :class="[
        buttonClasses,
        modelValue === item.id
          ? 'bg-primary text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200',
      ]"
      @click="emit('update:modelValue', item.id)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>
