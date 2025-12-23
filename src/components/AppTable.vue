<script setup lang="ts" generic="T">
import { ref } from "vue";
import { useScrollRestoration } from "../composables/useScrollRestoration";

withDefaults(
  defineProps<{
    items: T[];
    isLoading?: boolean;
    pagination?: {
      hasNext: boolean;
    };
    emptyText?: string;
    maxHeight?: string;
  }>(),
  {
    isLoading: false,
    emptyText: "데이터가 없습니다.",
    maxHeight: "max-h-96",
  },
);

defineEmits<{
  (e: "loadMore"): void;
}>();

const scrollContainer = ref<HTMLElement | null>(null);
useScrollRestoration(scrollContainer);

const resetScroll = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
    scrollContainer.value.scrollLeft = 0;
  }
};

defineExpose({
  resetScroll,
});
</script>

<template>
  <div
    class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
    :class="{ 'h-full': maxHeight === 'h-full' }"
  >
    <div
      ref="scrollContainer"
      class="overflow-x-auto overflow-y-auto min-w-0"
      :class="[maxHeight, { 'flex-1 min-h-0': !maxHeight }]"
    >
      <table
        class="min-w-full text-sm text-left [&_th]:min-w-[120px] [&_th]:whitespace-nowrap [&_th]:px-4 [&_th]:py-3 [&_th]:text-xs [&_th]:font-medium [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wider md:[&_th]:px-6 [&_td]:px-4 [&_td]:py-3 [&_td]:whitespace-nowrap md:[&_td]:px-6 md:[&_td]:py-4"
      >
        <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 sticky top-0 z-10">
          <slot name="head" />
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="isLoading && items.length === 0">
            <td colspan="100%" class="px-4 py-3 text-center text-gray-500">로딩 중...</td>
          </tr>
          <tr v-else-if="items.length === 0">
            <td colspan="100%" class="px-4 py-3 text-center text-gray-500">
              {{ emptyText }}
            </td>
          </tr>
          <template v-else>
            <slot name="row" v-for="(item, index) in items" :key="index" :item="item" :index="index" />
          </template>
        </tbody>
      </table>
      <!-- Pagination (Load More) -->
      <div v-if="pagination?.hasNext" class="px-4 py-3 border-t border-gray-200 flex justify-center">
        <button
          @click="$emit('loadMore')"
          :disabled="isLoading"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "로딩 중..." : "더 보기" }}
        </button>
      </div>
    </div>
  </div>
</template>
