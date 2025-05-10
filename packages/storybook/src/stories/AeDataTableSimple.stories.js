import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Import just the DATATABLE_ELEMENT_NAME constant to avoid circular dependency issues
import { DATATABLE_ELEMENT_NAME } from '@aetherui/datatable';

// Register the datatable component if not already registered
const registerDataTable = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import('@aetherui/datatable')
        .then(module => {
          if (module.defineDataTableElements) {
            module.defineDataTableElements();
            console.log('DataTable defined successfully');
          }
        })
        .catch(err => console.error('Error loading DataTable:', err));
    `;
    document.head.appendChild(script);
  }
};

if (typeof window !== 'undefined') {
  registerDataTable();
}

export default {
  title: 'Components/SimpleDataTable',
  component: DATATABLE_ELEMENT_NAME,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A simplified version of the DataTable component with basic functionality.'
      }
    }
  },
  argTypes: {
    showSelection: { control: 'boolean' },
    pageSize: { control: 'number' }
  }
};

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com' },
  { id: 5, name: 'Charlie Brown', age: 28, email: 'charlie@example.com' }
];

// Very simple column definition for basic example
const simpleColumns = [
  { id: 'name', field: 'name', header: 'Name' },
  { id: 'age', field: 'age', header: 'Age' },
  { id: 'email', field: 'email', header: 'Email' }
];

// Basic example - minimal features
export const Basic = {
  render: () => {
    return html`
      <div style="padding: 20px;">
        <h3>Basic DataTable</h3>
        <ae-datatable
          .data=${sampleData}
          .columns=${simpleColumns}
        ></ae-datatable>
      </div>
    `;
  }
};

// Selection example - just with checkbox feature
export const WithSelection = {
  render: () => {
    return html`
      <div style="padding: 20px;">
        <h3>DataTable with Selection</h3>
        <p style="margin-bottom: 10px;">Click on rows or checkboxes to select them.</p>
        <ae-datatable
          .data=${sampleData}
          .columns=${simpleColumns}
          selectable
          @ae-datatable-select=${(e) => console.log('Selection:', e.detail.selectedRows)}
        ></ae-datatable>
      </div>
    `;
  }
};