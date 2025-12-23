# AppTabs

Tab navigation component.

## Props

- `modelValue` (string | number): Active tab ID.
- `items` ({ id: string | number, label: string }[]): Tab items.
- `direction` ("horizontal" | "vertical"): Layout direction. Default: "horizontal".

## Usage

```vue
<AppTabs v-model="activeTab" :items="[{id: 'tab1', label: 'Tab 1'}]" />
```
