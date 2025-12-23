# AppTextarea

Textarea component with character count and auto-resize options (via rows).

## Props

- `modelValue` (string): Bound text.
- `label` (string): Label text.
- `placeholder` (string): Placeholder.
- `rows` (number | string): Number of rows. Default: 3.
- `maxLength` (number): Maximum character count.
- `disabled` (boolean): Disable input.
- `error` (string): Error message.

## Usage

```vue
<AppTextarea v-model="description" label="Description" :max-length="200" />
```
