<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  items: TocItem[];
  rootMargin?: string;
  title?: string; // Add optional title prop
}

const props = withDefaults(defineProps<Props>(), {
  rootMargin: "0px 0px -80% 0px",
});

const activeId = ref<string>("");
let observer: IntersectionObserver | null = null;

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    { rootMargin: props.rootMargin },
  );

  props.items.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) {
      observer?.observe(element);
    }
  });

  // 초기 activeId 설정 (첫 번째 항목)
  if (!activeId.value && props.items.length > 0) {
    activeId.value = props.items[0]!.id;
  }
};

// items가 변경되거나 컴포넌트가 마운트될 때 옵저버 설정
watch(
  () => props.items,
  async () => {
    await nextTick();
    setupObserver();
  },
  { deep: true },
);

onMounted(async () => {
  await nextTick();
  setupObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <nav class="w-48 hidden lg:block sticky top-6 self-start">
    <h2 v-if="title" class="font-bold text-lg mb-4 text-primary">{{ title }}</h2>
    <ul class="space-y-1">
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="block text-sm px-3 py-2 rounded transition-colors"
          :class="
            activeId === item.id
              ? 'text-primary font-bold bg-primary-50'
              : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          "
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
