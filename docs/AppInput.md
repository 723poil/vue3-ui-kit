# AppInput

Text input with built-in label and error handling.

## Props

- `modelValue` (string | number): v-model binding.
- `label` (string): Top label text.
- `error` (string): Error message to display below input.
- `placeholder` (string): Placeholder text.
- `type` (string): HTML input type. Default "text".
- `disabled`, `readonly`, `required`: Standard HTML attributes.

## Usage

```vue
<AppInput 
  v-model="form.email" 
  label="Email Address" 
  placeholder="user@example.com" 
  :error="errors.email" 
/>
```
