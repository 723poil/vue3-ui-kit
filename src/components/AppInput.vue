<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  readonly: false,
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-text-main">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="w-full px-3 py-2 bg-white border border-border rounded-lg shadow-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:bg-gray-100 disabled:text-text-muted"
      :class="{ 'border-danger focus:ring-danger focus:border-danger': error }"
      @input="onInput"
    />
    <p v-if="error" class="text-xs text-danger">{{ error }}</p>
  </div>
</template>
