import { html } from 'lit';

// Import constants only from datatable
import { DATATABLE_ELEMENT_NAME } from '@aetherui/datatable';

// Register the component via dynamic import to avoid circular dependency issues
if (typeof window !== 'undefined') {
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import('@aetherui/datatable')
      .then(module => {
        if (module.defineDataTableElements) {
          module.defineDataTableElements();
        }
      })
      .catch(err => console.error('Failed to load DataTable:', err));
  `;
  document.head.appendChild(script);
}

export default {
  title: 'Components/DataTable/Selection',
  component: DATATABLE_ELEMENT_NAME,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'DataTable with row selection functionality'
      }
    }
  },
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple']
    }
  }
};

// Simple data set for this story
const people = [
  { id: 1, name: 'John Doe', role: 'Developer' },
  { id: 2, name: 'Jane Smith', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', role: 'Manager' },
  { id: 4, name: 'Alice Brown', role: 'Developer' },
  { id: 5, name: 'Charlie Davis', role: 'Designer' }
];

// Simple columns - very minimal to focus on selection
const columns = [
  { id: 'name', field: 'name', header: 'Name' },
  { id: 'role', field: 'role', header: 'Role' }
];

// Track selection
let selectedItems = [];

export const RowSelection = {
  args: {
    selectionMode: 'multiple'
  },
  render: (args) => {
    const handleSelectionChange = (e) => {
      selectedItems = e.detail.selectedRows;
      
      // Update display box with selection
      const selectionDisplay = document.getElementById('selection-display');
      if (selectionDisplay) {
        selectionDisplay.textContent = JSON.stringify(selectedItems, null, 2);
      }
    };

    return html`
      <div style="padding: 20px; max-width: 600px;">
        <h3>Row Selection (${args.selectionMode} Mode)</h3>
        
        <div style="margin-bottom: 16px; padding: 8px; background-color: #f0f9ff; border-radius: 4px;">
          <p style="margin: 0; color: #0369a1;">
            <strong>Note:</strong> The checkbox column is automatically added when selection is enabled.
            Try selecting rows by clicking on them or the checkboxes.
          </p>
        </div>
        
        <ae-datatable
          .data=${people}
          .columns=${columns}
          selectable
          selection-mode=${args.selectionMode}
          @ae-datatable-select=${handleSelectionChange}
        ></ae-datatable>
        
        <div style="margin-top: 20px; padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
          <h4 style="margin-top: 0; margin-bottom: 8px;">Selected Items:</h4>
          <pre id="selection-display" style="margin: 0; background-color: #f1f5f9; padding: 10px; border-radius: 4px; overflow: auto; max-height: 100px;">[]</pre>
        </div>
      </div>
    `;
  }
};