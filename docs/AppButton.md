# AppButton

Button component with multiple variants and loading state.

## Props

- `variant` ("primary" | "secondary" | "danger" | "outline" | "ghost" | "success" | "link-text"): Style variant. Default: "primary".
- `size` ("xs" | "sm" | "md" | "lg"): Button size. Default: "md".
- `type` ("button" | "submit" | "reset"): HTML button type. Default: "button".
- `disabled` (boolean): Disables interaction.
- `loading` (boolean): Shows spinner and disables interaction.
- `block` (boolean): Full width (w-full).
- `color` (string): Custom Tailwind color class key (e.g. "blue-500").
- `textColor` (string): Custom text color.

## Usage

```vue
<AppButton variant="primary" :loading="isLoading" @click="submit">
  Save Changes
</AppButton>
```
