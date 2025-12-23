<script setup lang="ts">
import { computed } from "vue";
import { mdiCheckCircle, mdiAlertCircle, mdiAlert, mdiInformation, mdiClose } from "@mdi/js";
import AppIcon from "./AppIcon.vue";

interface Props {
  show: boolean;
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const iconPath = computed(() => {
  switch (props.type) {
    case "success":
      return mdiCheckCircle;
    case "error":
      return mdiAlertCircle;
    case "warning":
      return mdiAlert;
    case "info":
    default:
      return mdiInformation;
  }
});

const typeClasses = computed(() => {
  switch (props.type) {
    case "success":
      return "border-l-4 border-success text-success";
    case "error":
      return "border-l-4 border-danger text-danger";
    case "warning":
      return "border-l-4 border-warning text-warning";
    case "info":
    default:
      return "border-l-4 border-primary text-primary";
  }
});

const iconColor = computed(() => {
  switch (props.type) {
    case "success":
      return "text-success";
    case "error":
      return "text-danger";
    case "warning":
      return "text-warning";
    case "info":
    default:
      return "text-primary";
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-[-1rem]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-1rem]"
    >
      <div
        v-if="show"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg w-[90vw] md:w-auto md:min-w-[320px] max-w-md"
        :class="typeClasses"
      >
        <!-- Icon -->
        <div :class="iconColor">
          <AppIcon :path="iconPath" :size="24" />
        </div>

        <!-- Message -->
        <p class="flex-1 text-sm font-medium text-gray-800">{{ message }}</p>

        <!-- Close Button -->
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <AppIcon :path="mdiClose" :size="18" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
