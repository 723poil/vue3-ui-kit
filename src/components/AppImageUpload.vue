<script setup lang="ts">
import { ref, watch, computed } from "vue";
import AppButton from "./AppButton.vue";

interface Props {
  modelValue: File | null;
  label?: string;
  accept?: string;
  maxSizeMB?: number; // MB 단위
  checkDimensions?: boolean; // 이미지 크기/비율 검사 여부
  targetWidth?: number;
  targetHeight?: number;
  aspectRatio?: number; // width / height
  error?: string;
  placeholder?: string;
  description?: string; // 추가 안내 문구
}

const props = withDefaults(defineProps<Props>(), {
  accept: "image/*",
  maxSizeMB: 5,
  checkDimensions: false,
  placeholder: "이미지 없음",
});

const emit = defineEmits<{
  (e: "update:modelValue", file: File | null): void;
  (e: "error", message: string): void;
}>();

const preview = ref<string>("");
const fileInput = ref<HTMLInputElement | null>(null);
const internalError = ref<string>("");

// 초기 modelValue가 있거나 변경되면 처리
watch(
  () => props.modelValue,
  (newFile) => {
    if (!newFile) {
      preview.value = "";
      if (fileInput.value) fileInput.value.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target?.result as string;
    };
    reader.readAsDataURL(newFile);
  },
);

const validateImageDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!props.checkDimensions) return resolve(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);

      // 검증할 비율 계산 (우선순위: props.aspectRatio > targetWidth/targetHeight 기반 계산)
      const requiredRatio =
        props.aspectRatio || (props.targetWidth && props.targetHeight ? props.targetWidth / props.targetHeight : null);

      if (requiredRatio) {
        const currentRatio = img.width / img.height;
        // 비율 체크 (오차 범위 0.01 허용)
        if (Math.abs(currentRatio - requiredRatio) > 0.01) {
          internalError.value = `이미지 비율이 맞지 않습니다. (권장 비율 ${requiredRatio.toFixed(2)}:1)`;
          resolve(false);
          return;
        }
      }

      resolve(true);
    };
    img.onerror = () => {
      internalError.value = "이미지 파일을 읽을 수 없습니다.";
      resolve(false);
    };
  });
};

const handleFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  internalError.value = "";

  if (input.files && input.files[0]) {
    const file = input.files[0];

    // 1. 용량 체크
    if (file.size > props.maxSizeMB * 1024 * 1024) {
      internalError.value = `파일 크기는 ${props.maxSizeMB}MB 이하여야 합니다.`;
      emit("error", internalError.value);
      input.value = ""; // 초기화
      return;
    }

    // 2. 이미지 규격 체크 (비동기)
    const isValid = await validateImageDimensions(file);
    if (!isValid) {
      emit("error", internalError.value);
      input.value = "";
      return;
    }

    // 성공
    emit("update:modelValue", file);

    // 프리뷰
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    emit("update:modelValue", null);
    preview.value = "";
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const clearImage = () => {
  emit("update:modelValue", null);
  preview.value = "";
  internalError.value = "";
  if (fileInput.value) fileInput.value.value = "";
};

// 안내 문구 생성
const dimensionText = computed(() => {
  if (props.targetWidth && props.targetHeight) {
    return `${props.checkDimensions ? "필수" : "권장"} 크기: ${props.targetWidth}px x ${props.targetHeight}px`;
  }
  if (props.aspectRatio) {
    return `${props.checkDimensions ? "필수" : "권장"} 비율: 가로 ${props.aspectRatio} : 세로 1`;
  }
  return "";
});

// 프리뷰 컨테이너 스타일 (비율 적용)
const previewContainerStyle = computed(() => {
  const ratio =
    props.aspectRatio || (props.targetWidth && props.targetHeight ? props.targetWidth / props.targetHeight : 1);

  return {
    aspectRatio: `${ratio}`,
    width: ratio > 1 ? "160px" : "128px", // 가로가 길면 조금 더 크게 표시
    height: "auto",
  };
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <div class="flex items-start gap-4">
      <!-- Preview Area -->
      <div
        class="border rounded-lg overflow-hidden bg-white flex items-center justify-center shrink-0 relative group"
        :class="internalError ? 'border-red-300' : 'border-gray-300'"
        :style="previewContainerStyle"
      >
        <img v-if="preview" :src="preview" alt="Preview" class="w-full h-full object-cover" />
        <span v-else class="text-gray-400 text-xs text-center px-2">{{ placeholder }}</span>

        <!-- Hover Overlay for Remove (only if image exists) -->
        <div
          v-if="preview"
          class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          @click="clearImage"
        >
          <span class="text-white text-xs font-medium">삭제</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex-1 flex flex-col gap-2">
        <input ref="fileInput" type="file" :accept="accept" class="hidden" @change="handleFileChange" />

        <div class="flex gap-2">
          <AppButton variant="secondary" size="sm" @click="triggerFileInput"> 파일 선택 </AppButton>
        </div>

        <div class="text-xs text-gray-500 space-y-1">
          <p>최대 {{ maxSizeMB }}MB, {{ accept }} 형식</p>
          <p v-if="dimensionText">{{ dimensionText }}</p>
          <p v-if="description" class="text-gray-600">{{ description }}</p>
        </div>

        <p v-if="internalError || error" class="text-xs text-red-500 font-medium">
          {{ internalError || error }}
        </p>
      </div>
    </div>
  </div>
</template>
