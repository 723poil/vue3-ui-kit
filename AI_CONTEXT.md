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

### AppSelect
*Note: Ensure to check implementation details if complex options are needed.*
Select component.

**Props:**
- `modelValue`: Selected value.
- `options`: Array of options.
- `label`, `error`, `disabled`: Standard form props.

### AppModal
Modal dialog component.

**Usage:**
```vue
<AppModal :isOpen="isOpen" title="Confirm" @close="isOpen = false">
  <p>Are you sure?</p>
  <template #footer>
    <AppButton @click="isOpen = false">Cancel</AppButton>
  </template>
</AppModal>
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
