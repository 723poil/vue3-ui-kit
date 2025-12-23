<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import AppIcon from "./AppIcon.vue";
import { mdiClose } from "@mdi/js";

interface Props {
  modelValue: boolean;
  title?: string;
  width?: string; // max-width class (e.g., 'max-w-lg', 'max-w-2xl')
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: "",
  width: "max-w-lg",
  persistent: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}>();

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleBackdropClick = () => {
  if (!props.persistent) {
    close();
  }
};

// ESC key to close
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.modelValue && !props.persistent) {
    close();
  }
};

onMounted(() => document.addEventListener("keydown", handleKeydown));
onUnmounted(() => document.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="handleBackdropClick"></div>

        <!-- Modal Panel -->
        <div
          class="relative w-full bg-white rounded-xl shadow-xl ring-1 ring-gray-200 flex flex-col max-h-[90vh] sm:max-h-[85vh]"
          :class="[width]"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <button
              @click="close"
              class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <AppIcon :path="mdiClose" size="20" />
            </button>
          </div>

          <!-- Content (Scrollable) -->
          <div class="p-6 overflow-y-auto overscroll-contain">
            <slot></slot>
          </div>

          <!-- Footer (Optional) -->
          <div
            v-if="$slots.footer"
            class="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100 flex justify-end gap-3 shrink-0"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
