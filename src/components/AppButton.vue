<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "success" | "link-text";
  size?: "xs" | "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean; // w-full 여부
  color?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
  block: false,
  color: undefined,
  textColor: undefined,
});

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses = computed(() => {
  if (props.color) {
    const textClass = props.textColor ? `text-${props.textColor}` : "text-white";
    return `bg-${props.color} ${textClass} hover:opacity-80 focus:ring-${props.color}`;
  }

  switch (props.variant) {
    case "primary":
      return "bg-primary text-white hover:bg-primary-700 focus:ring-primary";
    case "secondary":
      return "bg-white text-text-main border border-border hover:bg-gray-50 focus:ring-gray-200";
    case "danger":
      return "bg-danger text-white hover:bg-red-600 focus:ring-danger";
    case "outline":
      return "border-2 border-primary text-primary hover:bg-primary-50 focus:ring-primary";
    case "ghost":
      return "text-text-muted hover:text-text-main hover:bg-gray-100";
    case "success":
      return "bg-success text-white hover:bg-green-600 focus:ring-success";
    case "link-text":
      return "text-gray-400 hover:text-primary";
    default:
      return "bg-primary text-white hover:bg-primary-700";
  }
});

const sizeClasses = computed(() => {
  if (props.variant === "link-text") {
    switch (props.size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  }

  switch (props.size) {
    case "xs":
      return "px-2.5 py-1.5 text-xs";
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-4 py-2 text-base";
  }
});
</script>

<template>
  <button
    :type="type"
    :class="[baseClasses, variantClasses, sizeClasses, { 'w-full': block }]"
    :disabled="disabled || loading"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </button>
</template>
