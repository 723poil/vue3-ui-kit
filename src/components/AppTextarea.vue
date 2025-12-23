<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  rows?: number | string;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  let value = target.value;

  if (props.maxLength && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength);
    target.value = value;
  }

  emit("update:modelValue", value);
};

const currentLength = computed(() => props.modelValue?.length || 0);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex justify-between items-center">
      <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
        {{ label }}
      </label>
    </div>

    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none disabled:bg-gray-100 disabled:text-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error }"
        @input="onInput"
      ></textarea>

      <div
        v-if="maxLength"
        class="absolute bottom-2 right-2 text-xs text-gray-400 pointer-events-none bg-white/80 px-1 rounded"
      >
        {{ currentLength }} / {{ maxLength }}
      </div>
    </div>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
