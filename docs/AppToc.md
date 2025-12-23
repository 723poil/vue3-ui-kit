# AppToc

Table of Contents side navigation that highlights active section on scroll.

## Props

- `items` ({ id: string, label: string }[]): TOC items linking to element IDs.
- `rootMargin` (string): Intersection observer margin.
- `title` (string): Optional title.

## Usage

```vue
<AppToc :items="tocItems" title="Contents" />
```
