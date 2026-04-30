# AetherUI DataTable

A flexible data table component for complex data visualization with sorting, filtering, pagination, and row selection capabilities.

## Features

- Client and server-side data processing
- Sorting (including multi-column)
- Filtering (global and per-column)
- Pagination
- Row selection
- Customizable cells and headers
- Virtualization for large datasets
- Accessibility focused

## Usage

```html
<ae-datatable
  .data="${tableData}"
  .columns="${columns}"
  striped
  bordered
  @ae-datatable-select="${handleSelection}"
  @ae-datatable-sort="${handleSort}"
>
</ae-datatable>
```

```js
// Define column configuration
const columns = [
  {
    id: 'name',
    header: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    id: 'age',
    header: 'Age',
    field: 'age',
    sortable: true,
    align: 'right',
  },
];

// Sample data
const tableData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  // ...more rows
];

// Handle events
function handleSelection(e) {
  console.log('Selected rows:', e.detail.selection);
}

function handleSort(e) {
  console.log('Sort state:', e.detail.sorting);
}
```

## Documentation

For detailed documentation, see the [DataTable documentation](../../context-doc/components/datatable.md).
