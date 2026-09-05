# AetherUI DataTable

A flexible data table component for complex data visualization with sorting, filtering, pagination, and row selection capabilities.

## Features

- Client and server-side data processing
- Sorting (including multi-column)
- Filtering (global and per-column)
- Pagination
- Row selection
- Customizable cells and headers
- Keyboard sorting and column resizing, with table/row/cell semantics

## Registration and keyboard controls

Import the package before using its custom elements. Bundlers retain this registration import:

```js
import '@aetherui/datatable';
```

Tab to a column's sort button and press Enter or Space to cycle through ascending,
descending, and unsorted. Tab to its resize separator and use Left/Right to change
the width by 10 pixels, Shift+Left/Right for 50 pixels, or Home for the 50-pixel minimum.
Set `aria-label` on the table to give it a name appropriate to its data.

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
    sortable: true
  },
  {
    id: 'email',
    header: 'Email',
    field: 'email',
    sortable: true
  },
  {
    id: 'age',
    header: 'Age',
    field: 'age',
    sortable: true,
    align: 'right'
  }
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
