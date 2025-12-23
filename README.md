# vue3 UI Kit

Vue 3, Vite, Tailwind CSS 기반의 모던 디자인 시스템 라이브러리입니다.
빠르고 일관된 UI 개발을 위해 다양한 컴포넌트와 유틸리티를 제공합니다.

## 특징

- 🎨 **Tailwind CSS 기반**: 유연하고 커스터마이징 가능한 스타일링
- 🧩 **Vue 3 Composition API**: 최신 Vue 3 패턴 적용
- 📱 **반응형 디자인**: 모바일 및 데스크탑 환경 지원
- 🛠 **TypeScript 지원**: 완벽한 타입 정의 제공

## 설치 (Installation)

```bash
npm install @723poil/vue3-ui-kit
```

## 설정 (Configuration)

### 1. Tailwind CSS 설정

소비 프로젝트의 `tailwind.config.js` 파일에 `vue3-ui-kit`의 Preset을 추가해야 합니다. 이를 통해 라이브러리의 색상, 폰트 등의 디자인 토큰을 상속받을 수 있습니다.

```javascript
// tailwind.config.js
import uiKitPreset from "@723poil/vue3-ui-kit/tailwind.preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiKitPreset],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // 라이브러리 내부 컴포넌트의 스타일 적용을 위해 경로 추가
    "./node_modules/@723poil/vue3-ui-kit/dist/**/*.{js,vue,ts}",
  ],
  safelist: [
    // 동적 클래스 사용 시 필요한 패턴 (옵션)
    {
      pattern: /(bg|text|border)-(primary|secondary)(-(50|100|200|300|400|500|600|700|800|900|950))?/,
      variants: ["hover", "focus", "active"],
    },
  ],
  theme: {
    extend: {
      // 필요 시 디자인 토큰 오버라이드 가능
      // colors: {
      //   primary: { DEFAULT: '#0000FF' }
      // }
    },
  },
  plugins: [],
}
```

### 2. 스타일시트 Import

프로젝트의 진입점(예: `main.ts` 또는 `main.js`)에서 라이브러리의 스타일을 import 해주세요.

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// UI Kit 스타일 (Tailwind 유틸리티 포함)
import "@723poil/vue3-ui-kit/style.css";
import './style.css' // 프로젝트 자체 스타일

createApp(App).mount('#app')
```

## 사용법 (Usage)

### 기본 컴포넌트 사용

필요한 컴포넌트를 import 하여 사용합니다.

```vue
<script setup>
import { AppButton, AppInput, AppIcon, AppSelect } from '@723poil/vue3-ui-kit';
import { mdiHeart } from '@mdi/js';
import { ref } from 'vue';

const username = ref('');
const role = ref('');
const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' }
];
</script>

<template>
  <div class="p-4 space-y-4">
    <AppButton variant="primary">Click Me</AppButton>
    
    <AppInput 
      v-model="username" 
      label="User Name" 
      placeholder="Enter your name" 
    />

    <AppSelect
      v-model="role"
      :options="roles"
      label="Role"
      placeholder="Select a role"
    />
    
    <AppIcon :path="mdiHeart" color="red" />
  </div>
</template>
```

### 디자인 시스템 뷰어 페이지

라이브러리에 포함된 모든 컴포넌트의 예제와 스타일 가이드를 확인할 수 있는 페이지를 제공합니다. 개발 중에 참고하기 좋습니다.

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { DesignSystemPage } from '@723poil/vue3-ui-kit'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ... 기존 라우트
    {
      path: '/design-system',
      name: 'DesignSystem',
      component: DesignSystemPage
    }
  ]
})
```

## 컴포넌트 목록 (Components)

### Forms (입력 폼)
*   **AppInput**: 라벨, 에러 메시지, 다양한 상태를 지원하는 텍스트 입력 필드
*   **AppSelect**: 드롭다운 선택 컴포넌트
*   **AppTextarea**: 글자 수 제한 및 자동 높이 조절이 가능한 텍스트 영역
*   **AppSearch**: 검색 아이콘이 포함된 검색 전용 입력 필드
*   **AppImageUpload**: 이미지 파일 업로드, 미리보기, 유효성 검사 기능 제공

### UI Elements (UI 요소)
*   **AppButton**: 다양한 변형(Primary, Secondary, Outline 등)과 크기를 지원하는 버튼
*   **AppIcon**: SVG path(MDI 등)를 렌더링하는 아이콘 컴포넌트 (크기, 색상 조절 가능)
*   **AppImage**: 로딩 상태, 에러 처리, 스켈레톤 UI를 내장한 이미지 컴포넌트
*   **AppTable**: 데이터 테이블, 로딩 상태, 무한 스크롤(더보기) 지원. `head`와 `row` 슬롯 사용.

### Feedback (피드백)
*   **AppToast**: 사용자에게 일시적인 메시지를 보여주는 토스트 알림
*   **AppModal**: 모달 다이얼로그 (헤더, 바디, 푸터 슬롯 지원)
*   **AppNotFound**: 404 페이지나 데이터 없음을 나타내는 컴포넌트

### Layout & Navigation (레이아웃 및 네비게이션)
*   **AppPageHeader**: 페이지 제목, 설명, 액션 버튼을 포함하는 표준 헤더
*   **AppSection**: 콘텐츠를 구분하는 섹션 래퍼
*   **AppTabs**: 탭 네비게이션 컴포넌트
*   **AppToc**: 목차(Table of Contents) 네비게이션

## Composables (유틸리티 훅)

### `useForm`
강력한 폼 상태 관리 및 유효성 검사 훅입니다.

```typescript
import { useForm, Validators } from '@723poil/vue3-ui-kit';
const { required, email } = Validators;

const { form, errors, validate, reset } = useForm(
  {
    email: '',
    password: ''
  },
  {
    email: [required('이메일을 입력하세요'), email('유효하지 않은 이메일입니다')],
    password: [required('비밀번호를 입력하세요')]
  }
);

const submit = () => {
  if (validate()) {
    // 성공 로직
  }
};
```

### `useScrollRestoration`
스크롤 위치를 저장하고 복원하는 기능을 제공합니다 (주로 리스트 뷰에서 상세 페이지 이동 시 사용).

## 🤖 AI-Assisted Development (Vibe Coding)

이 라이브러리는 AI 에이전트(Cursor, Copilot, ChatGPT 등)가 코드를 더 정확하게 생성할 수 있도록 **AI 전용 컨텍스트 문서**를 제공합니다.

### Cursor / AI IDE 설정 방법

프로젝트의 `.cursorrules` 또는 AI 프롬프트에 다음 내용을 추가하여 AI에게 라이브러리 사용법을 학습시키세요:

```markdown
# AI Rules for UI Kit
이 프로젝트는 `@723poil/vue3-ui-kit`을 사용합니다.
자세한 컴포넌트 스펙과 사용법은 `node_modules/@723poil/vue3-ui-kit/AI_CONTEXT.md` 파일을 참고하세요.
```

또는 직접 파일을 참조하도록 지시할 수 있습니다.

- **Context File Path:** `node_modules/@723poil/vue3-ui-kit/AI_CONTEXT.md`