# AppToast

Toast notification component (usually used via a store or service, but can be used directly).

## Props

- `show` (boolean): Visibility.
- `message` (string): Notification text.
- `type` ("success" | "error" | "warning" | "info"): Alert type.

## Usage

```vue
<AppToast :show="showToast" message="Saved successfully" type="success" @close="showToast = false" />
```
