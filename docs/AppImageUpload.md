# AppImageUpload

Image upload component with preview, validation, and file selection.

## Props

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

## Usage

```vue
<AppImageUpload v-model="form.image" label="Profile Photo" :max-size-m-b="2" />
```
