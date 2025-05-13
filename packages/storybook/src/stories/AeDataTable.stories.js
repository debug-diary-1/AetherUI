import { html } from 'lit-html';

// Import the datatable directly
// This works now that we've added the package as a dependency
import { defineDataTableElements } from '@aetherui/datatable';

// This function will ensure the datatable components are defined
// before rendering the stories
const ensureDataTableComponents = () => {
  try {
    // Call the function to define datatable elements
    if (defineDataTableElements) {
      defineDataTableElements();
      console.log('DataTable components defined for story');
    } else {
      console.warn('defineDataTableElements function not available');
    }
  } catch (e) {
    console.warn('Error defining datatable components:', e);
  }
};

export default {
  title: 'Components/DataTable',
  component: 'ae-datatable',
  tags: ['autodocs'],
  argTypes: {
    sortable: { control: 'boolean' },
    filterable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    selectionMode: { control: { type: 'select', options: ['single', 'multiple'] } },
    paginated: { control: 'boolean' },
    pageSize: { control: 'number' },
    emptyMessage: { control: 'text' },
    virtualized: { control: 'boolean' },
    resizable: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
# DataTable

A powerful and flexible data table component for displaying and manipulating tabular data.

## Features

- Client and server-side data processing
- Sorting (including multi-column)
- Filtering (global and per-column)
- Pagination
- Row selection
- Customizable cells and headers
- Virtualization for large datasets
- Accessibility focused
        `
      }
    }
  }
};

// Sample data for the table
const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', status: 'Active', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', status: 'Active', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', status: 'Inactive', department: 'Sales' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com', status: 'Active', department: 'Engineering' },
  { id: 5, name: 'Charlie Brown', age: 28, email: 'charlie@example.com', status: 'Pending', department: 'Finance' },
  { id: 6, name: 'Diana Miller', age: 32, email: 'diana@example.com', status: 'Active', department: 'Marketing' },
  { id: 7, name: 'Edward Davis', age: 45, email: 'edward@example.com', status: 'Inactive', department: 'Engineering' },
  { id: 8, name: 'Fiona Wilson', age: 22, email: 'fiona@example.com', status: 'Pending', department: 'Sales' },
  { id: 9, name: 'George Martin', age: 38, email: 'george@example.com', status: 'Active', department: 'Finance' },
  { id: 10, name: 'Hannah Clark', age: 29, email: 'hannah@example.com', status: 'Active', department: 'Engineering' },
  { id: 11, name: 'Ian Roberts', age: 33, email: 'ian@example.com', status: 'Pending', department: 'Marketing' },
  { id: 12, name: 'Julia Taylor', age: 27, email: 'julia@example.com', status: 'Active', department: 'Sales' },
];

// Column definitions
const columns = [
  { 
    id: 'name', 
    field: 'name', 
    header: 'Name', 
    sortable: true, 
    filterable: true,
    width: '200px'
  },
  { 
    id: 'age', 
    field: 'age', 
    header: 'Age', 
    sortable: true, 
    align: 'right',
    width: '80px'
  },
  { 
    id: 'email', 
    field: 'email', 
    header: 'Email', 
    sortable: true,
    width: '200px'
  },
  {
    id: 'department',
    field: 'department',
    header: 'Department',
    sortable: true,
    width: '150px'
  },
  { 
    id: 'status', 
    field: 'status', 
    header: 'Status', 
    sortable: true,
    width: '120px',
    renderer: (value) => {
      const getStatusColor = (status) => {
        switch (status) {
          case 'Active': return '#10b981'; // green
          case 'Inactive': return '#ef4444'; // red
          case 'Pending': return '#f59e0b'; // amber
          default: return '#6b7280'; // gray
        }
      };
      
      const getStatusBg = (status) => {
        switch (status) {
          case 'Active': return '#d1fae5'; // light green
          case 'Inactive': return '#fee2e2'; // light red
          case 'Pending': return '#fef3c7'; // light amber
          default: return '#f3f4f6'; // light gray
        }
      };
      
      return html`
        <span style="
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.875rem;
          color: ${getStatusColor(value)};
          background-color: ${getStatusBg(value)};
        ">
          ${value}
        </span>
      `;
    }
  },
];

// Action handler functions
const handleSort = (e) => {
  console.log('Sort event:', e.detail);
};

const handleFilter = (e) => {
  console.log('Filter event:', e.detail);
};

const handleSelect = (e) => {
  console.log('Select event:', e.detail);
};

const handlePage = (e) => {
  console.log('Page event:', e.detail);
};

// Template for basic table - wrapped in container for proper handling
const createContainer = (content) => {
  return html`
    <div style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px;">
      ${content}
    </div>
  `;
};

// Basic table
export const Basic = (args) => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      ?sortable=${args.sortable}
      ?filterable=${args.filterable}
      ?selectable=${args.selectable}
      selection-mode=${args.selectionMode}
      ?paginated=${args.paginated}
      page-size=${args.pageSize}
      empty-message=${args.emptyMessage}
      ?virtualized=${args.virtualized}
      ?resizable=${args.resizable}
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
      @ae-datatable-select=${handleSelect}
      @ae-datatable-page=${handlePage}
    ></ae-datatable>
  `);
};

Basic.args = {
  sortable: true,
  filterable: true,
  selectable: false,
  selectionMode: 'multiple',
  paginated: true,
  pageSize: 5,
  emptyMessage: 'No data available',
  virtualized: false,
  resizable: true,
};

// Empty state example
export const EmptyState = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${[]}
      .columns=${columns}
      empty-message="No data found. Please try different filters."
      filterable
    ></ae-datatable>
  `);
};

EmptyState.parameters = {
  docs: {
    description: {
      story: 'An example of how the data table appears when no data is available. The empty message is customizable.'
    }
  }
};

// Selectable rows example
export const SelectableRows = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      selectable
      selection-mode="multiple"
      @ae-datatable-select=${handleSelect}
    ></ae-datatable>
  `);
};

SelectableRows.parameters = {
  docs: {
    description: {
      story: 'Enable row selection with checkboxes. The selection mode can be "single" or "multiple".'
    }
  }
};

// Single row selection example
export const SingleRowSelection = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      selectable
      selection-mode="single"
      @ae-datatable-select=${handleSelect}
    ></ae-datatable>
  `);
};

SingleRowSelection.parameters = {
  docs: {
    description: {
      story: 'A table with single row selection mode, where only one row can be selected at a time.'
    }
  }
};

// Pagination example
export const Pagination = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      paginated
      page-size="5"
      @ae-datatable-page=${handlePage}
    ></ae-datatable>
  `);
};

Pagination.parameters = {
  docs: {
    description: {
      story: 'DataTable with pagination enabled. You can customize the page size as needed.'
    }
  }
};

// Sorting example
export const Sorting = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      sortable
      @ae-datatable-sort=${handleSort}
    ></ae-datatable>
  `);
};

Sorting.parameters = {
  docs: {
    description: {
      story: 'Click on column headers to sort the data. Click again to toggle between ascending and descending order.'
    }
  }
};

// Filtering example
export const Filtering = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      filterable
      @ae-datatable-filter=${handleFilter}
    ></ae-datatable>
  `);
};

Filtering.parameters = {
  docs: {
    description: {
      story: 'A search box at the top allows filtering across all columns.'
    }
  }
};

// Custom toolbar example
export const CustomToolbar = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      sortable
      paginated
      page-size="5"
    >
      <div slot="toolbar" style="display: flex; justify-content: space-between; width: 100%; padding: 8px 0;">
        <div>
          <button style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; margin-right: 8px;">
            Export
          </button>
          <button style="padding: 6px 12px; background-color: #f3f4f6; color: #374151; border: none; border-radius: 4px;">
            Print
          </button>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Custom Search..." 
            style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 4px;"
          />
        </div>
      </div>
    </ae-datatable>
  `);
};

CustomToolbar.parameters = {
  docs: {
    description: {
      story: 'Example of using the toolbar slot to provide custom content above the table.'
    }
  }
};

// Custom cell rendering example
export const CustomCellRendering = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  const customColumns = [
    ...columns.slice(0, 4),
    {
      id: 'actions',
      header: 'Actions',
      width: '150px',
      renderer: (_, row) => html`
        <div style="display: flex; gap: 8px;">
          <button style="padding: 4px 8px; background-color: #3b82f6; color: white; border: none; border-radius: 4px;">
            Edit
          </button>
          <button style="padding: 4px 8px; background-color: #ef4444; color: white; border: none; border-radius: 4px;">
            Delete
          </button>
        </div>
      `
    }
  ];

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${customColumns}
      sortable
    ></ae-datatable>
  `);
};

CustomCellRendering.parameters = {
  docs: {
    description: {
      story: 'Using custom cell renderers to display complex content like buttons or formatted data.'
    }
  }
};

// Complete example with all features
export const CompleteExample = () => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      sortable
      filterable
      selectable
      selection-mode="multiple"
      paginated
      page-size="5"
      resizable
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
      @ae-datatable-select=${handleSelect}
      @ae-datatable-page=${handlePage}
    ></ae-datatable>
  `);
};

CompleteExample.parameters = {
  docs: {
    description: {
      story: 'A fully-featured datatable with sorting, filtering, selection, and pagination enabled.'
    }
  }
};

// Dark theme example
export const DarkTheme = (args, { globals }) => {
  // Ensure datatable components are defined
  ensureDataTableComponents();

  // Handle theme toggle in Storybook
  const isDark = globals.theme === 'dark';
  const themeClass = isDark ? 'dark-theme' : 'light-theme';
  
  return html`
    <div class="${themeClass}">
      ${createContainer(html`
        <ae-datatable
          .data=${sampleData}
          .columns=${columns}
          sortable
          filterable
          selectable
          paginated
          page-size="5"
        ></ae-datatable>
      `)}
    </div>
  `;
};

DarkTheme.parameters = {
  docs: {
    description: {
      story: 'The DataTable responds to theme changes. Use the theme switcher in the toolbar to toggle between light and dark themes.'
    }
  }
};