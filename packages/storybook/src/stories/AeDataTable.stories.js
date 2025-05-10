import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Note: We avoid directly importing from the main index.js which has a circular dependency
// Instead, let's handle registration more carefully
// Define the element name constant manually to match what's in the library
const DATATABLE_ELEMENT_NAME = 'ae-datatable';

// Create a safe loading mechanism for the datatable component
const loadDataTableComponents = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Check if already registered
  if (customElements.get(DATATABLE_ELEMENT_NAME)) {
    console.log('DataTable already registered');
    return;
  }
  
  // Add a script element to dynamically import in the browser context
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    // Direct import from the constants file to avoid circular dependency
    import { AeDataTable } from '/Users/paull/projects/oss/aetherUi/packages/datatable/dist/index2.js';
    import { 
      DATATABLE_ELEMENT_NAME,
      DATATABLE_HEADER_ELEMENT_NAME,
      DATATABLE_ROW_ELEMENT_NAME,
      DATATABLE_CELL_ELEMENT_NAME 
    } from '/Users/paull/projects/oss/aetherUi/packages/datatable/dist/index13.js';
    import { AeDatatableHeader } from '/Users/paull/projects/oss/aetherUi/packages/datatable/dist/index3.js';
    import { AeDatatableRow } from '/Users/paull/projects/oss/aetherUi/packages/datatable/dist/index4.js';
    import { AeDatatableCell } from '/Users/paull/projects/oss/aetherUi/packages/datatable/dist/index5.js';
    
    // Register the components directly in a safe way
    try {
      // Manual registration to avoid circular dependency
      if (!customElements.get(DATATABLE_ELEMENT_NAME)) {
        customElements.define(DATATABLE_ELEMENT_NAME, AeDataTable);
        console.log('DataTable registered manually');
      }
      
      if (!customElements.get(DATATABLE_HEADER_ELEMENT_NAME)) {
        customElements.define(DATATABLE_HEADER_ELEMENT_NAME, AeDatatableHeader);
      }
      
      if (!customElements.get(DATATABLE_ROW_ELEMENT_NAME)) {
        customElements.define(DATATABLE_ROW_ELEMENT_NAME, AeDatatableRow);
      }
      
      if (!customElements.get(DATATABLE_CELL_ELEMENT_NAME)) {
        customElements.define(DATATABLE_CELL_ELEMENT_NAME, AeDatatableCell);
      }
    } catch (error) {
      console.error('Failed to register components manually:', error);
    }
  `;
  document.head.appendChild(script);
};

// Try to load the components if we're in a browser
if (typeof window !== 'undefined') {
  loadDataTableComponents();
}

export default {
  title: 'Components/DataTable',
  component: DATATABLE_ELEMENT_NAME,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## AetherUI DataTable Component

A powerful and flexible DataTable component for displaying tabular data with features like:

- Sorting (single or multi-column)
- Filtering (global or by column)
- Pagination
- Row selection
- Custom cell rendering
- Custom formatters
- Virtualization for large datasets

### Usage

\`\`\`js
import { defineDataTableElements } from '@aetherui/datatable';

// Register components
defineDataTableElements();

// Basic usage
const table = document.createElement('ae-datatable');
table.data = [{ id: 1, name: 'Example' }];
table.columns = [{ id: 'name', field: 'name', header: 'Name' }];
document.body.appendChild(table);
\`\`\`
        `
      }
    }
  },
  argTypes: {
    sortable: { control: 'boolean' },
    filterable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    paginated: { control: 'boolean' },
    pageSize: { control: 'number' }
  }
};

// Sample data for all stories
const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', status: 'Active', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', status: 'Active', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', status: 'Inactive', department: 'Finance' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com', status: 'Active', department: 'Product' },
  { id: 5, name: 'Charlie Brown', age: 28, email: 'charlie@example.com', status: 'Pending', department: 'HR' }
];

// Extended data for pagination example
const extendedData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', status: 'Active', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', status: 'Active', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', status: 'Inactive', department: 'Finance' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com', status: 'Active', department: 'Product' },
  { id: 5, name: 'Charlie Brown', age: 28, email: 'charlie@example.com', status: 'Pending', department: 'HR' },
  { id: 6, name: 'David Miller', age: 42, email: 'david@example.com', status: 'Active', department: 'Engineering' },
  { id: 7, name: 'Emma Davis', age: 33, email: 'emma@example.com', status: 'Active', department: 'Design' },
  { id: 8, name: 'Frank Wilson', age: 45, email: 'frank@example.com', status: 'Inactive', department: 'Sales' },
  { id: 9, name: 'Grace Taylor', age: 29, email: 'grace@example.com', status: 'Active', department: 'Marketing' },
  { id: 10, name: 'Henry Martin', age: 37, email: 'henry@example.com', status: 'Pending', department: 'Customer Support' },
  { id: 11, name: 'Ivy Clark', age: 31, email: 'ivy@example.com', status: 'Active', department: 'Design' },
  { id: 12, name: 'Jack Lee', age: 26, email: 'jack@example.com', status: 'Active', department: 'Engineering' },
  { id: 13, name: 'Kelly Chen', age: 34, email: 'kelly@example.com', status: 'Inactive', department: 'Finance' },
  { id: 14, name: 'Leo Moore', age: 39, email: 'leo@example.com', status: 'Active', department: 'Product' },
  { id: 15, name: 'Mia Rodriguez', age: 27, email: 'mia@example.com', status: 'Pending', department: 'HR' },
  { id: 16, name: 'Noah Garcia', age: 32, email: 'noah@example.com', status: 'Active', department: 'Engineering' },
  { id: 17, name: 'Olivia Mitchell', age: 36, email: 'olivia@example.com', status: 'Active', department: 'Design' },
  { id: 18, name: 'Peter Baker', age: 41, email: 'peter@example.com', status: 'Inactive', department: 'Sales' },
  { id: 19, name: 'Quinn Foster', age: 30, email: 'quinn@example.com', status: 'Active', department: 'Marketing' },
  { id: 20, name: 'Rachel Cooper', age: 38, email: 'rachel@example.com', status: 'Pending', department: 'Customer Support' }
];

// Columns with flexible layout - using fr units for some columns to allow them to expand
const basicColumns = [
  { id: 'name', field: 'name', header: 'Name', sortable: true, width: '180px' },
  { id: 'age', field: 'age', header: 'Age', sortable: true, align: 'right', width: '80px' },
  { id: 'email', field: 'email', header: 'Email', sortable: true, width: '1fr' }, // Flexible width
  { id: 'status', field: 'status', header: 'Status', sortable: true, width: '120px' }
];

// Status columns with formatters and flexible layout
const statusColumns = [
  { id: 'name', field: 'name', header: 'Name', sortable: true, width: '180px' },
  { id: 'age', field: 'age', header: 'Age', sortable: true, align: 'right', width: '80px' },
  { id: 'email', field: 'email', header: 'Email', sortable: true, width: '1fr' }, // Flexible width
  { 
    id: 'status', 
    field: 'status', 
    header: 'Status', 
    sortable: true,
    width: '120px',
    // Format with HTML for status badges
    format: (value) => {
      const statusClass = value.toLowerCase();
      return `<span class="status-${statusClass}">${value}</span>`;
    }
  }
];

// Basic example with all features
export const Basic = {
  args: {
    sortable: true,
    filterable: true,
    selectable: false,
    paginated: false
  },
  render: (args) => {
    // Ensure components are loaded
    if (typeof window !== 'undefined' && !customElements.get(DATATABLE_ELEMENT_NAME)) {
      loadDataTableComponents();
    }
    
    return html`
      <style>
        .status-active {
          display: inline-block;
          background-color: #d1fae5;
          color: #065f46;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-inactive {
          display: inline-block;
          background-color: #fee2e2;
          color: #991b1b;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-pending {
          display: inline-block;
          background-color: #fef3c7;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
      </style>
      
      <div style="height: 400px;">
        <ae-datatable
          .data=${sampleData}
          .columns=${basicColumns}
          ?sortable=${args.sortable}
          ?filterable=${args.filterable}
          ?selectable=${args.selectable}
          ?paginated=${args.paginated}
        ></ae-datatable>
      </div>
    `;
  }
};

// Pagination example
export const WithPagination = {
  args: {
    pageSize: 5
  },
  render: (args) => {
    return html`
      <style>
        .status-active {
          display: inline-block;
          background-color: #d1fae5;
          color: #065f46;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-inactive {
          display: inline-block;
          background-color: #fee2e2;
          color: #991b1b;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-pending {
          display: inline-block;
          background-color: #fef3c7;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
      </style>
      
      <div style="height: 500px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">DataTable with ${extendedData.length} records and pagination</h3>
        
        <ae-datatable
          .data=${extendedData}
          .columns=${statusColumns}
          paginated
          page-size=${args.pageSize}
          sortable
          filterable
          @ae-datatable-page=${(e) => console.log('Page changed:', e.detail)}
        ></ae-datatable>
        
        <div style="margin-top: 12px; font-size: 14px; color: #666;">
          Try changing pages using the pagination controls or modify the page size in the controls panel.
        </div>
      </div>
    `;
  }
};

// Status formatting example
export const WithCustomFormatting = {
  render: () => {
    return html`
      <style>
        .status-active {
          display: inline-block;
          background-color: #d1fae5;
          color: #065f46;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-inactive {
          display: inline-block;
          background-color: #fee2e2;
          color: #991b1b;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-pending {
          display: inline-block;
          background-color: #fef3c7;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
      </style>
      
      <div style="height: 400px;">
        <ae-datatable
          .data=${sampleData}
          .columns=${statusColumns}
          sortable
          filterable
        ></ae-datatable>
      </div>
    `;
  }
};

// Full-featured example with all capabilities
export const CompleteExample = {
  render: () => {
    // Custom columns with compact width settings for better fit with selection checkbox
    const customColumns = [
      // Selection checkbox column is automatically added when selectable=true
      // It's approximately 40px wide, so we need compact column widths
      { 
        id: 'name', 
        field: 'name', 
        header: 'Name',
        sortable: true,
        width: '130px', // Quite compact width for name column
        // Custom name renderer with first letter highlight
        renderer: (value) => unsafeHTML(`
          <div style="display: flex; align-items: center;">
            <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #4f46e5; color: white; 
                        display: flex; align-items: center; justify-content: center; margin-right: 8px; font-weight: bold;">
              ${value.charAt(0)}
            </div>
            <span style="overflow: hidden; text-overflow: ellipsis;">${value}</span>
          </div>
        `)
      },
      { 
        id: 'age', 
        field: 'age', 
        header: 'Age', 
        sortable: true,
        align: 'right',
        width: '60px', // More compact width for numeric column
        // Format age with a color scale
        renderer: (value) => {
          const getAgeColor = (age) => {
            if (age < 30) return '#16a34a'; // Green for younger
            if (age < 40) return '#ca8a04'; // Yellow for middle
            return '#dc2626';               // Red for older
          };
          
          return unsafeHTML(`
            <span style="color: ${getAgeColor(value)}; font-weight: 500;">${value}</span>
          `);
        }
      },
      { 
        id: 'email', 
        field: 'email', 
        header: 'Email',
        sortable: true,
        width: '180px', // Fixed width instead of flexible to ensure tight fit
        // Make email clickable
        renderer: (value) => unsafeHTML(`
          <a href="mailto:${value}" style="color: #3b82f6; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${value}</a>
        `)
      },
      { 
        id: 'status', 
        field: 'status', 
        header: 'Status', 
        sortable: true,
        width: '100px', // Reduced width for status
        // Status with badges and icons
        renderer: (value) => {
          const statusConfig = {
            'Active': { color: '#16a34a', bgColor: '#d1fae5', icon: '✅' },
            'Inactive': { color: '#dc2626', bgColor: '#fee2e2', icon: '❌' },
            'Pending': { color: '#ca8a04', bgColor: '#fef3c7', icon: '⏳' }
          };
          
          const config = statusConfig[value] || { color: '#6b7280', bgColor: '#f3f4f6', icon: '❓' };
          
          return unsafeHTML(`
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>${config.icon}</span>
              <span style="background-color: ${config.bgColor}; color: ${config.color}; 
                          padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem;">
                ${value}
              </span>
            </div>
          `);
        }
      },
      {
        id: 'department',
        field: 'department',
        header: 'Department',
        sortable: true,
        width: '120px', // Fixed width for more predictable layout
        // Department with color-coded badges
        renderer: (value) => {
          const deptColors = {
            'Engineering': '#3b82f6',
            'Design': '#8b5cf6',
            'Marketing': '#ec4899',
            'Finance': '#10b981',
            'HR': '#f97316',
            'Product': '#6366f1',
            'Sales': '#f59e0b',
            'Customer Support': '#0ea5e9'
          };
          
          const color = deptColors[value] || '#6b7280';
          
          return unsafeHTML(`
            <span style="background-color: ${color}33; color: ${color}; 
                        padding: 3px 8px; border-radius: 4px; font-weight: 500;">
              ${value}
            </span>
          `);
        }
      },
      {
        id: 'actions',
        header: 'Actions',
        sortable: false,
        width: '100px', // Reduced width for actions
        // Action buttons
        renderer: () => unsafeHTML(`
          <div style="display: flex; gap: 2px;">
            <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; 
                          padding: 1px 4px; font-size: 11px; cursor: pointer;">
              Edit
            </button>
            <button style="background: #fee2e2; border: 1px solid #fecaca; border-radius: 4px; 
                          padding: 1px 4px; font-size: 11px; color: #b91c1c; cursor: pointer;">
              Del
            </button>
          </div>
        `)
      }
    ];
    
    return html`
      <div style="height: 600px; width: 100%; max-width: 800px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">Full-Featured DataTable Example</h3>
        
        <div style="margin-bottom: 8px; padding: 8px; background-color: #f0f9ff; border-radius: 4px; color: #0369a1; font-size: 14px;">
          <strong>Tip:</strong> The first column is a selection checkbox column added automatically when <code>selectable=true</code>. 
          Click on rows or checkboxes to select them.
        </div>
        
        <ae-datatable
          .data=${extendedData}
          .columns=${customColumns}
          sortable
          filterable
          selectable
          selection-mode="multiple"
          paginated
          page-size="5"
          @ae-datatable-sort=${(e) => console.log('Sort:', e.detail)}
          @ae-datatable-filter=${(e) => console.log('Filter:', e.detail)}
          @ae-datatable-select=${(e) => console.log('Selection:', e.detail)}
          @ae-datatable-page=${(e) => console.log('Page:', e.detail)}
        ></ae-datatable>
        
        <div style="margin-top: 12px; font-size: 14px; color: #666;">
          This example showcases all major features of the DataTable component: custom rendering,
          sorting, filtering, pagination, and row selection.
        </div>
      </div>
    `;
  }
};

// Row selection example
export const WithRowSelection = {
  args: {
    selectionMode: 'multiple'
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple']
    }
  },
  render: (args) => {
    // Track selected rows for display
    const selectedRowsRef = {current: []};
    
    const handleSelectionChange = (e) => {
      selectedRowsRef.current = e.detail.selectedRows;
      // Update selection display
      const selectionDisplay = document.getElementById('selection-display');
      if (selectionDisplay) {
        selectionDisplay.textContent = JSON.stringify(selectedRowsRef.current, null, 2);
      }
      console.log('Selection changed:', e.detail.selectedRows);
    };
    
    // Columns specifically designed for the selection example with aggressive space optimization
    const selectionColumns = [
      // Note: When selectable=true, a ~40px checkbox column is automatically added to the left
      { id: 'name', field: 'name', header: 'Name', sortable: true, width: '140px' }, // Further reduced
      { id: 'age', field: 'age', header: 'Age', sortable: true, align: 'right', width: '60px' }, // Minimized
      { id: 'email', field: 'email', header: 'Email', sortable: true, width: '180px' }, // Fixed instead of flexible
      { id: 'status', field: 'status', header: 'Status', sortable: true, width: '100px', // Further reduced
        format: (value) => {
          const statusClass = value.toLowerCase();
          return `<span class="status-${statusClass}">${value}</span>`;
        }
      },
      { id: 'department', field: 'department', header: 'Department', sortable: true, width: '120px' } // Further reduced
    ];
    
    return html`
      <style>
        .selection-info {
          margin-top: 16px;
          padding: 12px;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
        }
        
        .selection-info h4 {
          margin-top: 0;
          margin-bottom: 8px;
        }
        
        .selection-display {
          font-family: monospace;
          white-space: pre;
          background-color: #f1f5f9;
          padding: 8px;
          border-radius: 4px;
          overflow: auto;
          max-height: 120px;
        }
        
        .status-active {
          display: inline-block;
          background-color: #d1fae5;
          color: #065f46;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-inactive {
          display: inline-block;
          background-color: #fee2e2;
          color: #991b1b;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .status-pending {
          display: inline-block;
          background-color: #fef3c7;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
      </style>
      
      <div style="height: 500px; width: 100%; max-width: 800px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">Row Selection (${args.selectionMode} mode)</h3>
        
        <div style="margin-bottom: 8px; padding: 8px; background-color: #f0f9ff; border-radius: 4px; color: #0369a1; font-size: 14px;">
          <strong>Note:</strong> The leftmost column with checkboxes is automatically added when <code>selectable=true</code>.
          In ${args.selectionMode} mode, you can ${args.selectionMode === 'single' ? 'select only one row at a time' : 'select multiple rows'}. 
        </div>
        
        <ae-datatable
          .data=${extendedData.slice(0, 10)}
          .columns=${selectionColumns}
          selectable
          selection-mode=${args.selectionMode}
          sortable
          @ae-datatable-select=${handleSelectionChange}
        ></ae-datatable>
        
        <div class="selection-info">
          <h4>Selected Rows:</h4>
          <div id="selection-display" class="selection-display">[]</div>
        </div>
        
        <div style="margin-top: 12px; font-size: 14px; color: #666;">
          Try selecting rows by clicking on them or using the checkboxes. Selection information 
          will be displayed in the box above.
        </div>
      </div>
    `;
  }
};