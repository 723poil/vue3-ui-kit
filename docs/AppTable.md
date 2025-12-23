# AppTable

Data table with scoped slots for headers and rows. Handles scrolling and empty states.

## Props

- `items` (T[]): Array of data objects.
- `isLoading` (boolean): Shows loading state.
- `emptyText` (string): Text shown when items is empty.
- `maxHeight` (string): Tailwind class for height (e.g., "max-h-96", "h-full").
- `pagination` ({ hasNext: boolean }): Controls "Load More" button visibility.

## Slots

- `#head`: Table header content (`<th>`).
- `#row="{ item, index }"`: Table row content (`<tr>` containing `<td>`).

## Events

- `@loadMore`: Triggered when "Load More" button is clicked.

## Usage

```vue
<AppTable :items="users" :is-loading="loading">
  <template #head>
    <th>Name</th>
    <th>Role</th>
  </template>
  <template #row="{ item }">
    <tr>
      <td>{{ item.name }}</td>
      <td>{{ item.role }}</td>
    </tr>
  </template>
</AppTable>
```
