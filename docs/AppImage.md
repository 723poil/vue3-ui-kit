# AppImage

Enhanced image component with loading skeleton, error handling, and aspect ratio support.

## Props

- `src` (string | null): Image source URL.
- `alt` (string): Alt text.
- `fit` ("cover" | "contain" | "fill" | "none" | "scale-down"): Object fit style. Default: "cover".
- `aspectRatio` (number): Optional aspect ratio (width/height).
- `shape` ("square" | "circle" | "rounded" | "none"): Border radius shape. Default: "rounded".

## Slots

- `#empty`: Content to show when src is missing.
- `#error`: Content to show when image fails to load.

## Usage

```vue
<AppImage :src="imageUrl" :aspect-ratio="16/9" shape="rounded" />
```
