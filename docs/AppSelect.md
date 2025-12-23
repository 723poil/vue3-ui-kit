# AppSelect

Select dropdown component.

## Props

- `modelValue` (string | number | null): Selected value.
- `options` ({ label: string, value: any }[]): Options array.
- `label` (string): Label text.
- `placeholder` (string): Placeholder text.
- `disabled` (boolean): Disable input.
- `required` (boolean): Show required asterisk.
- `error` (string): Error message.

## Usage

```vue
<AppSelect v-model="selectedRole" :options="roles" label="Role" />
```
