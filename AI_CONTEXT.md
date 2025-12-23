# AI Context for @723poil/vue3-ui-kit

This document is designed to help AI agents (Cursor, Copilot, ChatGPT) understand how to use the `@723poil/vue3-ui-kit` library correctly.

## Core Principles
1.  **Tailwind CSS:** All components are built with Tailwind CSS.
2.  **Composition API:** Uses Vue 3 `<script setup>`.
3.  **Strict Typing:** All components have TypeScript interfaces.

---

## Components

### AppButton
Button component with multiple variants and loading state.

**Props:**
- `variant` ("primary" | "secondary" | "danger" | "outline" | "ghost" | "success" | "link-text"): Style variant. Default: "primary".
- `size` ("xs" | "sm" | "md" | "lg"): Button size. Default: "md".
- `type` ("button" | "submit" | "reset"): HTML button type. Default: "button".
- `disabled` (boolean): Disables interaction.
- `loading` (boolean): Shows spinner and disables interaction.
- `block` (boolean): Full width (w-full).
- `color` (string): Custom Tailwind color class key (e.g. "blue-500").
- `textColor` (string): Custom text color.

**Usage:**
```vue
<AppButton variant="primary" :loading="isLoading" @click="submit">
  Save Changes
</AppButton>
```

### AppIcon
Wrapper for SVG paths (typically from @mdi/js).

**Props:**
- `path` (string): SVG path data.
- `size` (number | string): Icon size in pixels. Default: 24.
- `color` (string): Icon color (fill). Default: "currentColor".
- `viewBox` (string): SVG viewBox. Default: "0 0 24 24".

**Usage:**
```vue
<AppIcon :path="mdiAccount" :size="20" />
```

### AppImage
Enhanced image component with loading skeleton, error handling, and aspect ratio support.

**Props:**
- `src` (string | null): Image source URL.
- `alt` (string): Alt text.
- `fit` ("cover" | "contain" | "fill" | "none" | "scale-down"): Object fit style. Default: "cover".
- `aspectRatio` (number): Optional aspect ratio (width/height).
- `shape` ("square" | "circle" | "rounded" | "none"): Border radius shape. Default: "rounded".

**Slots:**
- `#empty`: Content to show when src is missing.
- `#error`: Content to show when image fails to load.

**Usage:**
```vue
<AppImage :src="imageUrl" :aspect-ratio="16/9" shape="rounded" />
```

### AppImageUpload
Image upload component with preview, validation, and file selection.

**Props:**
- `modelValue` (File | null): Bound file object.
- `label` (string): Input label.
- `accept` (string): File type accept attribute. Default: "image/*".
- `maxSizeMB` (number): Max file size in MB. Default: 5.
- `checkDimensions` (boolean): Whether to enforce dimension checks.
- `targetWidth`, `targetHeight` (number): Expected dimensions.
- `aspectRatio` (number): Expected aspect ratio.
- `error` (string): Error message.
- `placeholder` (string): Placeholder text for preview area.
- `description` (string): Helper text below input.

**Usage:**
```vue
<AppImageUpload v-model="form.image" label="Profile Photo" :max-size-m-b="2" />
```

### AppInput
Text input with built-in label and error handling.

**Props:**
- `modelValue` (string | number): v-model binding.
- `label` (string): Top label text.
- `error` (string): Error message to display below input.
- `placeholder` (string): Placeholder text.
- `type` (string): HTML input type. Default "text".
- `disabled`, `readonly`, `required`: Standard HTML attributes.

**Usage:**
```vue
<AppInput 
  v-model="form.email" 
  label="Email Address" 
  placeholder="user@example.com" 
  :error="errors.email" 
/>
```

### AppModal
Modal dialog component.

**Props:**
- `isOpen` (boolean): Control visibility.
- `title` (string): Modal title.

**Slots:**
- `#default`: Main content.
- `#footer`: Footer buttons.

**Events:**
- `@close`: Triggered when close is requested.

**Usage:**
```vue
<AppModal :isOpen="isOpen" title="Confirm" @close="isOpen = false">
  <p>Are you sure?</p>
  <template #footer>
    <AppButton @click="isOpen = false">Cancel</AppButton>
  </template>
</AppModal>
```

### AppNotFound
Simple 404 page component.

**Usage:**
```vue
<AppNotFound />
```

### AppPageHeader
Standardized header for pages with title and actions.

**Props:**
- `title` (string): Page title.
- `description` (string): Optional description.

**Slots:**
- `#title-suffix`: Element next to title.
- `#actions`: Action buttons on the right.

**Usage:**
```vue
<AppPageHeader title="Users" description="Manage system users">
  <template #actions>
    <AppButton @click="createUser">Add User</AppButton>
  </template>
</AppPageHeader>
```

### AppSearch
Container for search filters and actions.

**Slots:**
- `#default`: Search input fields (Grid layout).
- `#actions`: Action buttons (Right aligned).

**Usage:**
```vue
<AppSearch>
  <AppInput v-model="filters.keyword" placeholder="Search..." />
  <template #actions>
    <AppButton @click="search">Search</AppButton>
  </template>
</AppSearch>
```

### AppSection
Container section with optional title.

**Props:**
- `title` (string): Section title.

**Usage:**
```vue
<AppSection title="Personal Info">
  <!-- Content -->
</AppSection>
```

### AppSelect
Select dropdown component.

**Props:**
- `modelValue` (string | number | null): Selected value.
- `options` ({ label: string, value: any }[]): Options array.
- `label` (string): Label text.
- `placeholder` (string): Placeholder text.
- `disabled` (boolean): Disable input.
- `required` (boolean): Show required asterisk.
- `error` (string): Error message.

**Usage:**
```vue
<AppSelect v-model="selectedRole" :options="roles" label="Role" />
```

### AppTable
Data table with scoped slots for headers and rows. Handles scrolling and empty states.

**Props:**
- `items` (T[]): Array of data objects.
- `isLoading` (boolean): Shows loading state.
- `emptyText` (string): Text shown when items is empty.
- `maxHeight` (string): Tailwind class for height (e.g., "max-h-96", "h-full").
- `pagination` ({ hasNext: boolean }): Controls "Load More" button visibility.

**Slots:**
- `#head`: Table header content (`<th>`).
- `#row="{ item, index }"`: Table row content (`<tr>` containing `<td>`).

**Events:**
- `@loadMore`: Triggered when "Load More" button is clicked.

**Usage:**
```vue
<AppTable :items="users" :is-loading="loading">
  <template #head>
    <th>Name</th>
    <th>Role</th>
  </template>
  <template #row="{ item }">
    <tr>
      <td>{{ item.name }}</td>
      <td>{{ item.role }}</td>
    </tr>
  </template>
</AppTable>
```

### AppTabs
Tab navigation component.

**Props:**
- `modelValue` (string | number): Active tab ID.
- `items` ({ id: string | number, label: string }[]): Tab items.
- `direction` ("horizontal" | "vertical"): Layout direction. Default: "horizontal".

**Usage:**
```vue
<AppTabs v-model="activeTab" :items="[{id: 'tab1', label: 'Tab 1'}]" />
```

### AppTextarea
Textarea component with character count and auto-resize options (via rows).

**Props:**
- `modelValue` (string): Bound text.
- `label` (string): Label text.
- `placeholder` (string): Placeholder.
- `rows` (number | string): Number of rows. Default: 3.
- `maxLength` (number): Maximum character count.
- `disabled` (boolean): Disable input.
- `error` (string): Error message.

**Usage:**
```vue
<AppTextarea v-model="description" label="Description" :max-length="200" />
```

### AppToast
Toast notification component (usually used via a store or service, but can be used directly).

**Props:**
- `show` (boolean): Visibility.
- `message` (string): Notification text.
- `type` ("success" | "error" | "warning" | "info"): Alert type.

**Usage:**
```vue
<AppToast :show="showToast" message="Saved successfully" type="success" @close="showToast = false" />
```

### AppToc
Table of Contents side navigation that highlights active section on scroll.

**Props:**
- `items` ({ id: string, label: string }[]): TOC items linking to element IDs.
- `rootMargin` (string): Intersection observer margin.
- `title` (string): Optional title.

**Usage:**
```vue
<AppToc :items="tocItems" title="Contents" />
```

---

## Composables

### useForm
Form state management with validation.

**Signature:**
`useForm<T>(initialValues: T, rules?: Rules<T>)`

**Returns:**
- `form` (reactive T): The form data.
- `errors` (reactive Partial<Record<keyof T, string>>): Error messages.
- `validate()` (boolean): Validates all fields.
- `validateField(field)` (boolean): Validates specific field.
- `reset(newValues?)`: Resets form to initial or new values.

**Usage:**
```ts
import { useForm } from '@723poil/vue3-ui-kit';
import { Validators } from '@723poil/vue3-ui-kit';

const { form, errors, validate } = useForm({
  email: ''
}, {
  email: [Validators.required('Email is required')]
});
```

### useScrollRestoration
Restores scroll position for elements within `KeepAlive` components.

**Signature:**
`useScrollRestoration(elementRef: Ref<HTMLElement | null>)`

**Params:**
- `elementRef`: Reference to the scrollable container element.

**Usage:**
```vue
<script setup>
import { ref } from 'vue';
import { useScrollRestoration } from '@723poil/vue3-ui-kit';

const scrollContainer = ref(null);
useScrollRestoration(scrollContainer);
</script>

<template>
  <div ref="scrollContainer" class="overflow-y-auto h-screen">
    <!-- List content -->
  </div>
</template>
```