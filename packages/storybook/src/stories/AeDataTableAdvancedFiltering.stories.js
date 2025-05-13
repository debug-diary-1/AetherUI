import { html } from 'lit-html';
import { ref } from 'lit/directives/ref.js';

// Dynamic imports to ensure components are registered
const ensureComponentsRegistered = async () => {
  if (typeof window !== 'undefined') {
    try {
      // Use a more reliable dynamic import approach
      const datatableModule = await import('@aetherui/datatable');

      if (datatableModule.defineDataTableElements) {
        datatableModule.defineDataTableElements();
        console.log('DataTable components registered via defineDataTableElements');
      } else {
        console.warn('defineDataTableElements not found in module');
      }
    } catch (err) {
      console.error('Error registering DataTable components:', err);

      // Fallback to direct script approach if needed
      const script = document.createElement('script');
      script.type = 'module';
      script.textContent = `
        import('@aetherui/datatable')
          .then(m => m.defineDataTableElements?.())
          .catch(e => console.error('Fallback registration failed:', e));
      `;
      document.head.appendChild(script);
    }
  }
};

// Try to register components
ensureComponentsRegistered();

// Backwards compatibility for story rendering
const ensureDataTableComponents = () => {
  try {
    if (typeof window !== 'undefined') {
      // Check if components are already defined
      if (!customElements.get('ae-datatable')) {
        console.log('Components not found, trying again to register...');
        ensureComponentsRegistered();
      }
    }
  } catch (e) {
    console.warn('Error in ensureDataTableComponents:', e);
  }
};

export default {
  title: 'Components/DataTable/AdvancedFiltering',
  component: 'ae-datatable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# DataTable Advanced Filtering

This section demonstrates the advanced filtering capabilities of the DataTable component.

## Advanced Filtering Features

- Column-specific filtering with multiple filter operators
- Different filter operators based on data type:
  - **String**: equals, not equals, contains, not contains, starts with, ends with
  - **Number**: equals, not equals, less than, less than or equal, greater than, greater than or equal, between
  - **Date**: equals, not equals, before, before or on, after, after or on, between
  - **Boolean**: equals, not equals
  - **Special**: is empty, is not empty
- Filter badge indicators for active filters
- Multiple active filters across different columns
- Combined global and column filters
        `
      }
    }
  }
};

// Sample data with different data types
const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', birthdate: '1993-05-15', active: true, rating: 4.5, salary: 85000, department: 'Engineering' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', birthdate: '1998-12-03', active: true, rating: 4.8, salary: 92000, department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', birthdate: '1983-08-21', active: false, rating: 3.2, salary: 62000, department: 'Sales' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com', birthdate: '1988-04-12', active: true, rating: 4.1, salary: 78000, department: 'Engineering' },
  { id: 5, name: 'Charlie Brown', age: 28, email: 'charlie@example.com', birthdate: '1995-10-30', active: false, rating: 3.9, salary: 67000, department: 'Finance' },
  { id: 6, name: 'Diana Miller', age: 32, email: 'diana@example.com', birthdate: '1991-07-18', active: true, rating: 4.7, salary: 88000, department: 'Marketing' },
  { id: 7, name: 'Edward Davis', age: 45, email: 'edward@example.com', birthdate: '1978-09-05', active: false, rating: 3.5, salary: 72000, department: 'Engineering' },
  { id: 8, name: 'Fiona Wilson', age: 22, email: 'fiona@example.com', birthdate: '2001-03-25', active: true, rating: 4.2, salary: 58000, department: 'Sales' },
  { id: 9, name: 'George Martin', age: 38, email: 'george@example.com', birthdate: '1985-11-14', active: true, rating: 4.0, salary: 81000, department: 'Finance' },
  { id: 10, name: 'Hannah Clark', age: 29, email: 'hannah@example.com', birthdate: '1994-02-28', active: true, rating: 4.4, salary: 74000, department: 'Engineering' },
  { id: 11, name: 'Ian Roberts', age: 33, email: 'ian@example.com', birthdate: '1990-06-08', active: false, rating: 3.7, salary: 69000, department: 'Marketing' },
  { id: 12, name: 'Julia Taylor', age: 27, email: 'julia@example.com', birthdate: '1996-01-19', active: true, rating: 4.6, salary: 76000, department: 'Sales' },
];

// Column definitions with data types for appropriate filtering
const columns = [
  { 
    id: 'name', 
    field: 'name', 
    header: 'Name', 
    sortable: true, 
    filterable: true,
    dataType: 'string',
    width: '180px'
  },
  { 
    id: 'age', 
    field: 'age', 
    header: 'Age', 
    sortable: true, 
    filterable: true,
    dataType: 'number',
    align: 'right',
    width: '80px'
  },
  { 
    id: 'email', 
    field: 'email', 
    header: 'Email', 
    sortable: true,
    filterable: true,
    dataType: 'string',
    width: '220px'
  },
  {
    id: 'birthdate',
    field: 'birthdate',
    header: 'Birth Date',
    sortable: true,
    filterable: true,
    dataType: 'date',
    width: '120px',
    format: (value) => {
      // Format date for display
      const date = new Date(value);
      return date.toLocaleDateString();
    }
  },
  {
    id: 'active',
    field: 'active',
    header: 'Active',
    sortable: true,
    filterable: true,
    dataType: 'boolean',
    width: '80px',
    renderer: (value) => {
      const bgColor = value ? '#d1fae5' : '#fee2e2';
      const color = value ? '#10b981' : '#ef4444';
      const text = value ? 'Yes' : 'No';
      
      return html`
        <span style="
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.875rem;
          color: ${color};
          background-color: ${bgColor};
        ">
          ${text}
        </span>
      `;
    }
  },
  {
    id: 'rating',
    field: 'rating',
    header: 'Rating',
    sortable: true,
    filterable: true,
    dataType: 'number',
    width: '100px',
    align: 'center',
    renderer: (value) => {
      // Create star rating display
      const fullStars = Math.floor(value);
      const halfStar = value % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      
      return html`
        <div style="display: inline-flex; color: #f59e0b;">
          ${Array(fullStars).fill('★').join('')}${halfStar ? '½' : ''}${Array(emptyStars).fill('☆').join('')}
        </div>
      `;
    }
  },
  {
    id: 'salary',
    field: 'salary',
    header: 'Salary',
    sortable: true,
    filterable: true,
    dataType: 'number',
    width: '120px',
    align: 'right',
    format: (value) => {
      // Format currency for display
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value);
    }
  },
  {
    id: 'department',
    field: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
    dataType: 'string',
    width: '150px'
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

// Create a container for the datatable
const createContainer = (content) => {
  return html`
    <div style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px;">
      ${content}
    </div>
  `;
};

// Basic advanced filtering example
export const BasicAdvancedFiltering = () => {
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      sortable
      filterable
      enable-column-filters
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
    ></ae-datatable>
  `);
};

BasicAdvancedFiltering.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates the advanced filtering capabilities of the DataTable component. 
Click on the filter icon in each column header to open the filter panel. Choose different 
operators based on the column's data type and apply filters.

Different columns offer specific filter operations:
- Text columns: contains, equals, starts with, etc.
- Numeric columns: equals, greater than, less than, between, etc.
- Date columns: before, after, between, etc.
- Boolean columns: equals, not equals

You can also use the global filter field at the top to search across all columns.
      `
    }
  }
};

// Pre-applied filters example
export const PreAppliedFilters = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // Function to apply filters after the component is rendered
  const applyFilters = () => {
    if (datatableRef) {
      // Apply advanced filters programmatically
      
      // Filter 1: Age greater than 30
      datatableRef.controller.setAdvancedColumnFilter('age', { 
        value: '30', 
        operator: 'greaterThan' 
      });
      
      // Filter 2: Active = true
      datatableRef.controller.setAdvancedColumnFilter('active', { 
        value: 'true', 
        operator: 'equals' 
      });
      
      // Filter 3: Department contains "ing"
      datatableRef.controller.setAdvancedColumnFilter('department', { 
        value: 'ing', 
        operator: 'contains' 
      });
    }
  };
  
  // Apply filters after render
  setTimeout(applyFilters, 100);
  
  return createContainer(html`
    <ae-datatable
      ${ref(r => datatableRef = r)}
      .data=${sampleData}
      .columns=${columns}
      sortable
      filterable
      enable-column-filters
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
    ></ae-datatable>
  `);
};

PreAppliedFilters.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates how to programmatically apply advanced filters to the DataTable.
The following filters are applied when the component loads:
- Age greater than 30
- Active equals true
- Department contains "ing"

Notice the filter badges displayed at the top of the table showing the active filters.
You can click the X button on any filter badge to remove that filter.
      `
    }
  }
};

// Range filter example
export const RangeFilters = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // Function to apply filters after the component is rendered
  const applyFilters = () => {
    if (datatableRef) {
      // Apply a range filter for salary
      datatableRef.controller.setAdvancedColumnFilter('salary', { 
        value: '70000', 
        valueTo: '90000', 
        operator: 'between' 
      });
      
      // Apply a date range filter
      datatableRef.controller.setAdvancedColumnFilter('birthdate', { 
        value: '1990-01-01', 
        valueTo: '2000-01-01', 
        operator: 'between' 
      });
    }
  };
  
  // Apply filters after render
  setTimeout(applyFilters, 100);
  
  return createContainer(html`
    <ae-datatable
      ${ref(r => datatableRef = r)}
      .data=${sampleData}
      .columns=${columns}
      sortable
      filterable
      enable-column-filters
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
    ></ae-datatable>
  `);
};

RangeFilters.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates range filtering with the 'between' operator.
The following range filters are applied:
- Salary between $70,000 and $90,000
- Birth date between Jan 1, 1990 and Jan 1, 2000

Range filters are particularly useful for numeric and date columns when you want to find values within a specific range.
      `
    }
  }
};

// Custom filter functions example
export const CustomFilterFunctions = () => {
  ensureDataTableComponents();
  
  // Custom columns with special filter functions
  const customColumns = [
    ...columns.slice(0, 7),
    {
      id: 'department',
      field: 'department',
      header: 'Department',
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '150px',
      // Custom filter function that does exact case-insensitive matching
      filterFn: (value, filter) => {
        if (!filter) return true;
        if (!value) return false;
        
        // Try to parse as JSON for advanced filtering
        try {
          const filterObj = JSON.parse(filter);
          if (filterObj && typeof filterObj === 'object' && filterObj.value) {
            const operator = filterObj.operator || 'contains';
            const filterValue = String(filterObj.value).toLowerCase();
            const strValue = String(value).toLowerCase();
            
            switch (operator) {
              case 'equals':
                return strValue === filterValue;
              case 'notEquals':
                return strValue !== filterValue;
              case 'contains':
                return strValue.includes(filterValue);
              case 'notContains':
                return !strValue.includes(filterValue);
              case 'startsWith':
                return strValue.startsWith(filterValue);
              case 'endsWith':
                return strValue.endsWith(filterValue);
              default:
                return strValue.includes(filterValue);
            }
          }
        } catch (e) {
          // For simple string filter, do exact match
          return String(value).toLowerCase() === String(filter).toLowerCase();
        }
        
        return false;
      }
    }
  ];
  
  return createContainer(html`
    <div>
      <p style="margin-bottom: 10px; font-style: italic;">
        Try filtering on the Department column - it uses a custom filter function that does exact case-insensitive matching for simple filters
      </p>
      <ae-datatable
        .data=${sampleData}
        .columns=${customColumns}
        sortable
        filterable
        enable-column-filters
        @ae-datatable-sort=${handleSort}
        @ae-datatable-filter=${handleFilter}
      ></ae-datatable>
    </div>
  `);
};

CustomFilterFunctions.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates how to use custom filter functions for specific columns.
The Department column uses a custom filter function that performs:
- Exact case-insensitive matching for simple filters
- Standard operator handling for advanced filters

Custom filter functions give you complete control over the filtering logic for specific columns.
      `
    }
  }
};

// Global search with column filters
export const CombinedFiltering = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // Function to apply filters after the component is rendered
  const applyFilters = () => {
    if (datatableRef) {
      // Apply global filter
      datatableRef.controller.setGlobalFilter('e');
      
      // Apply column filter
      datatableRef.controller.setAdvancedColumnFilter('age', { 
        value: '30', 
        operator: 'greaterThan' 
      });
    }
  };
  
  // Apply filters after render
  setTimeout(applyFilters, 100);
  
  return createContainer(html`
    <ae-datatable
      ${ref(r => datatableRef = r)}
      .data=${sampleData}
      .columns=${columns}
      sortable
      filterable
      enable-column-filters
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
    ></ae-datatable>
  `);
};

CombinedFiltering.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates combining global search with column-specific filters.
The following filters are applied:
- Global search for "e" (matches any column)
- Age greater than 30

When combining filters, rows must match ALL active filters (both global and column-specific).
      `
    }
  }
};

// Complete example with all filtering features
export const CompleteFilteringExample = () => {
  ensureDataTableComponents();

  return createContainer(html`
    <ae-datatable
      .data=${sampleData}
      .columns=${columns}
      sortable
      filterable
      enable-column-filters
      selectable
      paginated
      page-size="5"
      @ae-datatable-sort=${handleSort}
      @ae-datatable-filter=${handleFilter}
      @ae-datatable-select=${handleSelect}
      @ae-datatable-page=${handlePage}
    ></ae-datatable>
  `);
};

// Selection checkbox layout test
export const SelectionCheckboxLayoutTest = () => {
  ensureDataTableComponents();

  // Narrow column widths to test selection checkbox layout
  const narrowColumns = [
    {
      id: 'name',
      field: 'name',
      header: 'Name',
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '120px'
    },
    {
      id: 'age',
      field: 'age',
      header: 'Age',
      sortable: true,
      filterable: true,
      dataType: 'number',
      align: 'right',
      width: '70px'
    },
    {
      id: 'email',
      field: 'email',
      header: 'Email',
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '140px'
    },
    {
      id: 'department',
      field: 'department',
      header: 'Department',
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '100px'
    }
  ];

  return html`
    <div style="width: 100%;">
      <h3>Selection Checkbox Layout Test</h3>
      <p>This example tests the layout of the selection checkbox column in a table with narrow columns.</p>

      <div style="width: 600px; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 4px;">
        <ae-datatable
          .data=${sampleData.slice(0, 5)}
          .columns=${narrowColumns}
          sortable
          filterable
          selectable
          selection-mode="multiple"
          dense
          @ae-datatable-select=${handleSelect}
        ></ae-datatable>
      </div>
    </div>
  `;
};

SelectionCheckboxLayoutTest.parameters = {
  docs: {
    description: {
      story: `
This example specifically tests the selection checkbox column layout in a datatable with narrow columns.

It demonstrates:
- Fixed-width selection checkbox column that doesn't get squeezed by other columns
- Properly centered checkboxes in header and rows
- Correct spacing even with dense mode enabled
- Responsive layout in limited width container

This test case helps ensure the selection column doesn't cause layout issues like pushing header
columns to the next row or getting compressed too narrow.
      `
    }
  }
};

CompleteFilteringExample.parameters = {
  docs: {
    description: {
      story: `
A comprehensive example demonstrating all DataTable features together:
- Advanced column filtering with type-specific operators
- Global search functionality
- Filter badges for active filters
- Combined with sorting, pagination, and row selection
      `
    }
  }
};