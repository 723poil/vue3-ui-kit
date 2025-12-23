# AppModal

Modal dialog component.

## Props

- `isOpen` (boolean): Control visibility.
- `title` (string): Modal title.

## Slots

- `#default`: Main content.
- `#footer`: Footer buttons.

## Events

- `@close`: Triggered when close is requested.

## Usage

```vue
<AppModal :isOpen="isOpen" title="Confirm" @close="isOpen = false">
  <p>Are you sure?</p>
  <template #footer>
    <AppButton @click="isOpen = false">Cancel</AppButton>
  </template>
</AppModal>
```
