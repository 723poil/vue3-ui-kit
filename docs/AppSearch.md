# AppSearch

Container for search filters and actions.

## Slots

- `#default`: Search input fields (Grid layout).
- `#actions`: Action buttons (Right aligned).

## Usage

```vue
<AppSearch>
  <AppInput v-model="filters.keyword" placeholder="Search..." />
  <template #actions>
    <AppButton @click="search">Search</AppButton>
  </template>
</AppSearch>
```
