# AppIcon

Wrapper for SVG paths (typically from @mdi/js).

## Props

- `path` (string): SVG path data.
- `size` (number | string): Icon size in pixels. Default: 24.
- `color` (string): Icon color (fill). Default: "currentColor".
- `viewBox` (string): SVG viewBox. Default: "0 0 24 24".

## Usage

```vue
<AppIcon :path="mdiAccount" :size="20" />
```
