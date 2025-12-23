# @723poil/vue3-ui-kit

![Version](https://img.shields.io/npm/v/@723poil/vue3-ui-kit)
![License](https://img.shields.io/npm/l/@723poil/vue3-ui-kit)

Vue 3, Vite, Tailwind CSS 기반의 모던 디자인 시스템 라이브러리입니다.
빠르고 일관된 UI 개발을 위해 생산성 높은 컴포넌트와 유틸리티를 제공합니다.

## ✨ 주요 특징

- 🎨 **Tailwind CSS 기반**: Tailwind의 유틸리티 클래스를 활용한 유연한 스타일링 시스템.
- 🧩 **Vue 3 Composition API**: `<script setup>` 문법과 Composition API를 완벽하게 지원.
- 📱 **반응형 디자인 (Responsive)**: 모바일 퍼스트 접근 방식으로 모든 디바이스 대응.
- 🛠 **TypeScript 지원**: 모든 컴포넌트와 유틸리티에 대한 엄격한 타입 정의 포함.
- 🤖 **AI-Ready**: AI 에이전트(Cursor, Copilot 등)를 위한 전용 컨텍스트 문서 제공.

## 📦 설치 (Installation)

```bash
npm install @723poil/vue3-ui-kit
```

## ⚙️ 설정 (Configuration)

### 1. Tailwind CSS 설정

프로젝트의 `tailwind.config.js` 파일에 라이브러리의 프리셋을 추가하세요. 이를 통해 UI Kit의 색상 팔레트와 디자인 토큰을 사용할 수 있습니다.

```javascript
// tailwind.config.js
import uiKitPreset from "@723poil/vue3-ui-kit/tailwind.preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiKitPreset],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // UI Kit 내부 컴포넌트 스타일 적용을 위해 필수 추가
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
}
```

### 2. 스타일시트 Import

애플리케이션의 진입점(예: `main.ts` 또는 `main.js`)에서 스타일 파일을 import 하세요.

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// UI Kit 스타일 (Tailwind 유틸리티 포함)
import "@723poil/vue3-ui-kit/style.css";
import './style.css' // 프로젝트 전용 스타일

createApp(App).mount('#app')
```

## 🚀 사용법 (Usage)

### 컴포넌트 사용 예시

```vue
<script setup>
import { AppButton, AppInput, useForm } from '@723poil/vue3-ui-kit';

const { form } = useForm({ email: '' });
</script>

<template>
  <div class="p-8">
    <AppInput v-model="form.email" label="이메일" placeholder="example@test.com" />
    <AppButton variant="primary" class="mt-4">전송</AppButton>
  </div>
</template>
```

### 디자인 시스템 페이지

개발 중 컴포넌트 목록과 스타일을 확인하려면 `DesignSystemPage`를 라우터에 추가하세요.

```typescript
// router/index.ts
import { DesignSystemPage } from '@723poil/vue3-ui-kit'

// ... routes 배열 내에 추가
{
  path: '/_design',
  component: DesignSystemPage
}
```

## 📚 컴포넌트 목록 (Components)

| 카테고리 | 컴포넌트 | 설명 | 문서 |
|--- |--- |--- |:---:|
| **Forms** | `AppInput` | 라벨/에러 처리가 포함된 텍스트 입력 필드 | [Docs](./docs/AppInput.md) |
| | `AppSelect` | 드롭다운 선택 컴포넌트 | [Docs](./docs/AppSelect.md) |
| | `AppTextarea` | 글자 수 카운터가 있는 텍스트 영역 | [Docs](./docs/AppTextarea.md) |
| | `AppSearch` | 검색 전용 입력 필드 (아이콘/액션 슬롯) | [Docs](./docs/AppSearch.md) |
| | `AppImageUpload` | 이미지 업로드, 미리보기, 규격 검증 | [Docs](./docs/AppImageUpload.md) |
| **UI Elements** | `AppButton` | 다양한 스타일(Primary, Ghost 등)의 버튼 | [Docs](./docs/AppButton.md) |
| | `AppIcon` | SVG Path 기반 아이콘 래퍼 | [Docs](./docs/AppIcon.md) |
| | `AppImage` | 스켈레톤 로딩, 에러 UI, 비율 고정 지원 이미지 | [Docs](./docs/AppImage.md) |
| | `AppTable` | 헤더/행 커스텀 슬롯, 로딩/데이터 없음 상태 지원 테이블 | [Docs](./docs/AppTable.md) |
| **Feedback** | `AppToast` | 성공/에러/경고 알림 메시지 | [Docs](./docs/AppToast.md) |
| | `AppModal` | 헤더/바디/푸터 슬롯을 지원하는 모달 | [Docs](./docs/AppModal.md) |
| | `AppNotFound` | 404 에러 페이지 템플릿 | [Docs](./docs/AppNotFound.md) |
| **Layout** | `AppPageHeader` | 페이지 제목 및 우측 액션 버튼 영역 | [Docs](./docs/AppPageHeader.md) |
| | `AppSection` | 콘텐츠 섹션 구분 컨테이너 | [Docs](./docs/AppSection.md) |
| | `AppTabs` | 탭 네비게이션 (가로/세로 모드) | [Docs](./docs/AppTabs.md) |
| | `AppToc` | 스크롤 스파이 기능이 있는 목차(Table of Contents) | [Docs](./docs/AppToc.md) |

## 🧰 Composables & Utils

### `useForm`
강력한 폼 상태 관리 및 유효성 검사 훅입니다.

```typescript
import { useForm, Validators } from '@723poil/vue3-ui-kit';

const { form, errors, validate } = useForm(
  { email: '', password: '' }, // 초기값
  {
    email: [Validators.required(), Validators.email()], // 검증 규칙
    password: [Validators.required(), Validators.minLength(8)]
  }
);
```

### `useScrollRestoration`
KeepAlive된 컴포넌트(리스트 등)의 스크롤 위치를 자동으로 저장하고 복원합니다.

```typescript
import { ref } from 'vue';
import { useScrollRestoration } from '@723poil/vue3-ui-kit';

const listContainer = ref(null);
useScrollRestoration(listContainer);

// 템플릿의 스크롤 컨테이너에 ref="listContainer" 연결
```

## 🤖 AI-Assisted Development

이 프로젝트는 AI 코딩 어시스턴트가 라이브러리를 정확하게 이해하고 코드를 작성할 수 있도록 돕는 **Context 파일**을 제공합니다.

Cursor나 Copilot을 사용할 때, 아래 문구를 `.cursorrules`나 프롬프트에 추가하세요:

> "이 프로젝트는 `@723poil/vue3-ui-kit`을 사용합니다. 컴포넌트의 정확한 Props와 사용법은 `node_modules/@723poil/vue3-ui-kit/AI_CONTEXT.md`를 참고하여 코드를 작성해주세요."

---

## License

MIT
