import { html } from 'lit';
import '@aetherui/datatable';

export default {
  title: 'Components/AeDataTable',
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
};

// Sample data for the table
const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', status: 'Active' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com', status: 'Active' },
  { id: 5, name: 'Charlie Brown', age: 28, email: 'charlie@example.com', status: 'Pending' },
  { id: 6, name: 'Diana Miller', age: 32, email: 'diana@example.com', status: 'Active' },
  { id: 7, name: 'Edward Davis', age: 45, email: 'edward@example.com', status: 'Inactive' },
  { id: 8, name: 'Fiona Wilson', age: 22, email: 'fiona@example.com', status: 'Pending' },
  { id: 9, name: 'George Martin', age: 38, email: 'george@example.com', status: 'Active' },
  { id: 10, name: 'Hannah Clark', age: 29, email: 'hannah@example.com', status: 'Active' },
];

// Column definitions
const columns = [
  { 
    id: 'name', 
    field: 'name', 
    header: 'Name', 
    sortable: true, 
    filterable: true 
  },
  { 
    id: 'age', 
    field: 'age', 
    header: 'Age', 
    sortable: true, 
    align: 'right' 
  },
  { 
    id: 'email', 
    field: 'email', 
    header: 'Email', 
    sortable: true 
  },
  { 
    id: 'status', 
    field: 'status', 
    header: 'Status', 
    sortable: true,
    renderer: (value) => {
      const getStatusColor = (status) => {
        switch (status) {
          case 'Active': return 'green';
          case 'Inactive': return 'red';
          case 'Pending': return 'orange';
          default: return 'gray';
        }
      };
      
      return html`
        <span style="color: ${getStatusColor(value)}; font-weight: 500;">${value}</span>
      `;
    }
  },
];

// Template for basic table
export const Basic = (args) => {
  return html`
    <div style="height: 400px;">
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
        @ae-datatable-sort=${(e) => console.log('Sort event', e.detail)}
        @ae-datatable-filter=${(e) => console.log('Filter event', e.detail)}
        @ae-datatable-select=${(e) => console.log('Select event', e.detail)}
        @ae-datatable-page=${(e) => console.log('Page event', e.detail)}
        @ae-datatable-resize=${(e) => console.log('Resize event', e.detail)}
      ></ae-datatable>
    </div>
  `;
};

Basic.args = {
  sortable: true,
  filterable: true,
  selectable: true,
  selectionMode: 'multiple',
  paginated: true,
  pageSize: 5,
  emptyMessage: 'No data available',
  virtualized: false,
  resizable: true,
};

// Empty state example
export const Empty = () => {
  return html`
    <div style="height: 400px;">
      <ae-datatable
        .data=${[]}
        .columns=${columns}
        empty-message="No data found. Please try different filters."
        filterable
      ></ae-datatable>
    </div>
  `;
};

// Custom toolbar example
export const CustomToolbar = () => {
  return html`
    <div style="height: 400px;">
      <ae-datatable
        .data=${sampleData}
        .columns=${columns}
        sortable
        paginated
        page-size="5"
      >
        <div slot="toolbar" style="display: flex; justify-content: space-between; width: 100%;">
          <div>
            <button style="margin-right: 10px;">Export</button>
            <button>Print</button>
          </div>
          <div>
            <input type="text" placeholder="Custom Search..." />
          </div>
        </div>
      </ae-datatable>
    </div>
  `;
};

// Selectable rows example
export const SelectableRows = () => {
  return html`
    <div style="height: 400px;">
      <ae-datatable
        .data=${sampleData}
        .columns=${columns}
        selectable
        selection-mode="multiple"
        @ae-datatable-select=${(e) => {
          console.log('Selected rows:', e.detail.selectedRows);
        }}
      ></ae-datatable>
    </div>
  `;
};

// Pagination example
export const Pagination = () => {
  return html`
    <div style="height: 400px;">
      <ae-datatable
        .data=${sampleData}
        .columns=${columns}
        paginated
        page-size="3"
      ></ae-datatable>
    </div>
  `;
};

// Custom cell rendering example
export const CustomCellRendering = () => {
  const customColumns = [
    ...columns.slice(0, 3),
    {
      id: 'actions',
      header: 'Actions',
      renderer: (_, _row) => html`
        <div style="display: flex; gap: 8px;">
          <button style="padding: 4px 8px;">Edit</button>
          <button style="padding: 4px 8px;">Delete</button>
        </div>
      `
    }
  ];

  return html`
    <div style="height: 400px;">
      <ae-datatable
        .data=${sampleData}
        .columns=${customColumns}
        sortable
      ></ae-datatable>
    </div>
  `;
};