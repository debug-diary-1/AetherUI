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
  title: 'Components/DataTable/Pagination',
  component: DATATABLE_ELEMENT_NAME,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'DataTable with pagination functionality'
      }
    }
  },
  argTypes: {
    pageSize: {
      control: { type: 'number', min: 3, max: 10, step: 1 },
      defaultValue: 5
    }
  }
};

// Extended data for pagination
const extendedData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  department: ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'][i % 5]
}));

// Simple columns
const columns = [
  { id: 'id', field: 'id', header: 'ID' },
  { id: 'name', field: 'name', header: 'Name' },
  { id: 'email', field: 'email', header: 'Email' },
  { id: 'department', field: 'department', header: 'Department' }
];

export const BasicPagination = {
  args: {
    pageSize: 5
  },
  render: (args) => {
    return html`
      <div style="padding: 20px; max-width: 800px;">
        <h3>DataTable with Pagination</h3>
        
        <div style="margin-bottom: 16px; padding: 8px; background-color: #f0f9ff; border-radius: 4px;">
          <p style="margin: 0; color: #0369a1;">
            <strong>Tip:</strong> The table is showing page ${args.pageIndex || 1} with ${args.pageSize} items per page.
            Try navigating between pages using the controls below the table.
          </p>
        </div>
        
        <ae-datatable
          .data=${extendedData}
          .columns=${columns}
          paginated
          page-size=${args.pageSize}
          sortable
          @ae-datatable-page=${(e) => console.log('Page changed:', e.detail)}
        ></ae-datatable>
        
        <div style="margin-top: 20px; color: #666; font-size: 14px;">
          Total items: ${extendedData.length}, showing ${args.pageSize} per page
        </div>
      </div>
    `;
  }
};