# DataTable Component Technical Spec

## 1 · Purpose

A **flexible data table** component for complex data visualization with client and server‑side processing, providing sorting, filtering, pagination, and row selection capabilities without external dependencies.

## 2 · Public API

### 2.1 Core Properties

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `data` | `T[]` | `[]` | Array of data items to display in the table. |
| `columns` | `ColumnDef<T>[]` | `[]` | Column configuration array defining structure, headers, and cell rendering. |
| `width` | `string \| number` | `'100%'` | Width of the table (CSS value). |
| `maxHeight` | `string \| number` | `undefined` | Maximum height before scrolling (CSS value). |
| `dense` | `boolean` | `false` | Compact mode with reduced vertical padding. |
| `striped` | `boolean` | `false` | Apply alternating row styles. |
| `bordered` | `boolean` | `false` | Add borders to cells, rows, and columns. |
| `virtualized` | `boolean` | `false` | Enable virtualization for large datasets. |
| `loading` | `boolean` | `false` | Show loading state UI overlay. |
| `loadingText` | `string` | `'Loading...'` | Text to display during loading. |
| `emptyText` | `string` | `'No data available'` | Text when table has no rows. |
| `ariaLabel` | `string` | `'Data table'` | Accessibility label. |

### 2.2 Selection Properties

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `selected` | `Record<string, boolean>` | `{}` | Selected row IDs with `true` values. |
| `selectionChange` | `CustomEvent<{selection: Record<string, boolean>}>` | `undefined` | Event dispatched on selection change (use @ae-datatable-select). |
| `selectionType` | `'single' \| 'multiple' \| 'none'` | `'none'` | Row selection mode. |
| `selectionTrigger` | `'row' \| 'checkbox' \| 'both'` | `'checkbox'` | What triggers row selection. |

### 2.3 Sorting Properties

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `sorting` | `SortingState` | `[]` | Array of sort configurations `{id: string, desc: boolean}`. |
| `sortingChange` | `CustomEvent<{sorting: SortingState}>` | `undefined` | Event dispatched on sorting change (use @ae-datatable-sort). |
| `enableSorting` | `boolean` | `true` | Enable sorting globally. |
| `enableMultiSort` | `boolean` | `true` | Allow multi-column sorting. |
| `enableSortingRemoval` | `boolean` | `true` | Allow removing sort. |
| `manualSorting` | `boolean` | `false` | Enable server-side sorting. |

### 2.4 Filtering Properties

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `globalFilter` | `string` | `''` | Global filter string. |
| `globalFilterChange` | `CustomEvent<{filter: string}>` | `undefined` | Event dispatched on global filter change (use @ae-datatable-filter). |
| `columnFilters` | `ColumnFiltersState` | `[]` | Per-column filter configuration. |
| `columnFiltersChange` | `CustomEvent<{filters: ColumnFiltersState}>` | `undefined` | Event dispatched on column filters change (use @ae-datatable-filter). |
| `globalFilterSlot` | `boolean` | `false` | Enables slot for custom global filter input. |
| `enableFiltering` | `boolean` | `true` | Enable filtering globally. |
| `enableColumnFilters` | `boolean` | `true` | Enable per-column filtering. |
| `manualFiltering` | `boolean` | `false` | For server-side filtering implementation. |

### 2.5 Pagination Properties

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `pagination` | `{ pageIndex: number, pageSize: number }` | `{ pageIndex: 0, pageSize: 10 }` | Pagination state. |
| `paginationChange` | `CustomEvent<{pageIndex: number, pageSize: number}>` | `undefined` | Event dispatched on pagination change (use @ae-datatable-page). |
| `enablePagination` | `boolean` | `true` | Show pagination controls. |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Available page sizes. |
| `rowCount` | `number` | `undefined` | Total row count for server-side pagination. |
| `manualPagination` | `boolean` | `false` | Enable server-side pagination. |

### 2.6 Column Definition

```typescript
interface ColumnDef<T> {
  id: string;                     // Unique column identifier
  field?: keyof T;                // Data field name to display
  header: string | TemplateResult; // Column header content
  accessor?: (item: T) => any;    // Function to extract cell value
  renderer?: (value: any, row: T) => TemplateResult; // Custom cell renderer
  footer?: string | TemplateResult; // Column footer content
  sortable?: boolean;            // Enable sorting (true by default)
  filterable?: boolean;          // Enable filtering (true by default)
  sortFn?: (a: any, b: any) => number; // Custom sort comparator 
  filterFn?: (value: any, filter: string) => boolean; // Custom filter function
  width?: string;                // Column width (CSS value)
  minWidth?: string;             // Minimum width (CSS value)
  maxWidth?: string;             // Maximum width (CSS value)
  align?: 'left' | 'center' | 'right'; // Content alignment
  class?: string;                // Additional CSS class
  hidden?: boolean;              // Initially hidden
  resizable?: boolean;           // Allow column resizing (true by default)
  frozen?: boolean;              // Pin column to left or right
  format?: (value: any) => string; // Simple text formatter
}
```

### 2.7 Events

| Event | Payload Type | Description |
| ----- | ------------ | ----------- |
| `ae-datatable-select` | `{ selection: Record<string, boolean> }` | Fired when selection changes. |
| `ae-datatable-sort` | `{ sorting: SortingState }` | Fired when sort changes. |
| `ae-datatable-filter` | `{ columnFilters?: ColumnFiltersState, globalFilter?: string }` | Fired when filters change. |
| `ae-datatable-page` | `{ pageIndex: number, pageSize: number }` | Fired when page changes. |
| `ae-datatable-resize` | `{ columnId: string, width: number }` | Fired when column resized. |

## 3 · Slots & Composition

| Slot | Purpose |
| ---- | ------- |
| `filter` | Custom global filter UI |
| `empty` | Content to show when no data is available |
| `loading` | Custom loading indicator |
| `pagination` | Custom pagination controls |
| `actions` | Area for table actions (export, view toggles, etc.) |
| `header-cell-${columnId}` | Custom header cell content for specific column |
| `cell-${columnId}` | Custom cell renderer for specific column |
| `row-expand` | Content for expandable rows |
| `footer` | Custom footer content |

## 4 · Accessibility

* All tables use semantic HTML: `<table>`, `<thead>`, `<tbody>`, `<tr>`, etc.
* Proper ARIA attributes for sorting, selection, and expanded states.
* Keyboard navigation support:
  * Tab: Navigate between focusable elements
  * Arrow keys: Navigate between cells (when enabled)
  * Space/Enter: Toggle selection, sort, expand row
  * Home/End: Move to first/last cell in row
* Support for high contrast modes and reduced motion preferences.
* Clear focus indication and keyboard accessible controls.
* Screen reader announcements for sort and filter changes.

## 5 · Styling & Theming

### 5.1 Shadow Parts

| Part Name | Element | Notes |
| --------- | ------- | ----- |
| `table` | `<table>` | Main table element. |
| `header` | `<thead>` | Table header section. |
| `body` | `<tbody>` | Table body section. |
| `row` | `<tr>` | Row container element. | 
| `cell` | `<td>` | Data cell element. |
| `header-cell` | `<th>` | Header cell element. |
| `header-content` | `<div>` | Content inside header. |
| `cell-content` | `<div>` | Content inside cell. |
| `sort-icon` | `<span>` | Sort direction indicator. |
| `selection-checkbox` | `<span>` | Selection indicator wrapper. |
| `pagination` | `<div>` | Pagination controls container. |
| `footer` | `<div>` | Table footer section. |
| `loading-overlay` | `<div>` | Loading state UI. |
| `empty-message` | `<div>` | No data message. |

### 5.2 Design Tokens

| Token | Default | Purpose |
| ----- | ------- | ------- |
| `--ae-datatable-font` | `var(--ae-font-sans)` | Table text font family. |
| `--ae-datatable-border-color` | `#e2e8f0` | Border color for cells. |
| `--ae-datatable-header-bg` | `#f8fafc` | Header row background. |
| `--ae-datatable-header-fg` | `#1e293b` | Header text color. |
| `--ae-datatable-header-font-weight` | `600` | Header font weight. |
| `--ae-datatable-row-hover-bg` | `rgba(0,0,0,0.02)` | Row hover background. |
| `--ae-datatable-row-selected-bg` | `var(--ae-color-brand-50)` | Selected row background. |
| `--ae-datatable-row-alt-bg` | `rgba(0,0,0,0.02)` | Alternate row background (striped). |
| `--ae-datatable-cell-padding` | `0.75rem 1rem` | Cell padding normal mode. |
| `--ae-datatable-cell-padding-dense` | `0.375rem 0.75rem` | Cell padding dense mode. |
| `--ae-datatable-focus-ring` | `0 0 0 2px var(--ae-color-focus)` | Focus outline. |
| `--ae-datatable-pagination-button-radius` | `var(--ae-radius-sm)` | Pagination button radius. |

### 5.3 CSS Classes

Consumers can use these classes for more targeted styling:

```css
/* Selected row styling */
.ae-datatable-row[data-selected="true"] {
  font-weight: 500;
}

/* Active sort column */
.ae-datatable-header-cell[data-sorted="true"] {
  background-color: var(--ae-color-brand-50);
}
```

## 6 · Folder Structure

```text
packages/datatable/
├── src/
│   ├── ae-datatable.ts                # Main component
│   ├── ae-data-row.ts                 # Table row component
│   ├── ae-header-cell.ts              # Header cell component
│   ├── ae-data-cell.ts                # Data cell component
│   ├── ae-pagination.ts               # Pagination controls component
│   ├── core/
│   │   ├── column-manager.ts          # Column management
│   │   ├── filter-manager.ts          # Filtering logic
│   │   ├── sort-manager.ts            # Sorting logic
│   │   ├── selection-manager.ts       # Selection handling
│   │   └── pagination-manager.ts      # Pagination logic
│   ├── models/
│   │   ├── column-model.ts            # Column definition interfaces
│   │   ├── sort-model.ts              # Sorting state models
│   │   ├── filter-model.ts            # Filter configuration models
│   │   └── pagination-model.ts        # Pagination state interfaces
│   ├── utils/
│   │   ├── sort-utils.ts              # Sort comparison functions
│   │   ├── filter-utils.ts            # Filter predicate functions
│   │   └── virtualization-utils.ts    # Virtualization helpers
│   ├── styles.ts                      # Component styles
│   └── controllers/                   # Reactive controllers
│       ├── resize-controller.ts       # Column resizing
│       ├── keyboard-controller.ts     # Keyboard navigation
│       ├── focus-controller.ts        # Focus management
│       └── virtualization-controller.ts # Virtualized rendering
├── index.ts                           # Public exports
└── README.md                          # Documentation
```

## 7 · Architecture & State Management

The component is built with a focus on declarative state management and extensible rendering:

* Reactive controller pattern for managing complex state changes
* Clean separation between data models and view rendering
* Fully encapsulated internal state management with controlled/uncontrolled modes
* Observable state pattern enables custom extensions and plugins
* Built-in UI for common features like pagination, loading states
* Seamless integration with Aether UI theming system

## 8 · Progressive Rendering & Performance

**Data loading strategies:**

* Client-side processing for data sets < 10k rows
* Server-side processing with pagination, filtering, and sorting
* Virtual scrolling for large data sets

**Performance considerations:**

* Built-in virtualization when enabled
* Memoization of table instance, columns and sorting/filtering functions
* Custom cells are wrapped in controllers to minimize render cycles
* On-demand rendering of filter panels and menus
* Incremental rendering of large tables with animation frames

## 9 · Roadmap

**Phase 1** *(MVP)*

- Basic table rendering
- Sorting
- Pagination
- Row selection
- Custom cell rendering

**Phase 2** *(Enhanced)*
- Column filtering
- Column resizing
- Row expansion
- Virtualization
- Custom header rendering

**Phase 3** *(Advanced)*

- Row grouping
- Cell editing
- Column reordering/drag-drop
- Export options (CSV/Excel)
- Nested header groups

## 10 · Testing Strategy

* **Unit Tests**: Core utilities, state management
* **Component Tests**: Sorting, filtering, pagination
* **E2E Tests**: Complex interactions, server-side operations
* **Accessibility**: Full a11y audit including keyboard navigation
* **Performance**: Load testing with large datasets

---

*Updated: 2025-05-09*