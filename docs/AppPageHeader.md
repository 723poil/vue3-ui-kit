# AppPageHeader

Standardized header for pages with title and actions.

## Props

- `title` (string): Page title.
- `description` (string): Optional description.

## Slots

- `#title-suffix`: Element next to title.
- `#actions`: Action buttons on the right.

## Usage

```vue
<AppPageHeader title="Users" description="Manage system users">
  <template #actions>
    <AppButton @click="createUser">Add User</AppButton>
  </template>
</AppPageHeader>
```
