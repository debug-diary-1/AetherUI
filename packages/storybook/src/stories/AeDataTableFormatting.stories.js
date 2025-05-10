import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

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
  title: 'Components/DataTable/Formatting',
  component: DATATABLE_ELEMENT_NAME,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'DataTable with custom cell formatting and rendering'
      }
    }
  }
};

// Sample data for formatting
const employees = [
  { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', performance: 92 },
  { id: 2, name: 'Jane Smith', department: 'Design', status: 'Active', performance: 88 },
  { id: 3, name: 'Bob Johnson', department: 'Marketing', status: 'Inactive', performance: 76 },
  { id: 4, name: 'Alice Brown', department: 'Engineering', status: 'Active', performance: 95 },
  { id: 5, name: 'Charlie Davis', department: 'Sales', status: 'Pending', performance: 82 }
];

// Status formatting
export const StatusBadges = {
  render: () => {
    // Columns with custom status formatter
    const statusColumns = [
      { id: 'name', field: 'name', header: 'Employee' },
      { id: 'department', field: 'department', header: 'Department' },
      { 
        id: 'status', 
        field: 'status', 
        header: 'Status',
        format: (value) => {
          const statusClass = value.toLowerCase();
          return `<span class="status-${statusClass}">${value}</span>`;
        }
      }
    ];

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
      
      <div style="padding: 20px; max-width: 600px;">
        <h3>Status Badge Formatting</h3>
        
        <ae-datatable
          .data=${employees}
          .columns=${statusColumns}
          sortable
        ></ae-datatable>
      </div>
    `;
  }
};

// Custom cell rendering
export const CustomRendering = {
  render: () => {
    // Columns with custom renderers
    const renderColumns = [
      { 
        id: 'name', 
        field: 'name', 
        header: 'Employee',
        // Name with avatar
        renderer: (value) => unsafeHTML(`
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #4f46e5; 
                      color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
              ${value.charAt(0)}
            </div>
            <div>${value}</div>
          </div>
        `)
      },
      { 
        id: 'department', 
        field: 'department', 
        header: 'Department',
        // Department with color coding
        renderer: (value) => {
          const deptColors = {
            'Engineering': '#3b82f6',
            'Design': '#8b5cf6',
            'Marketing': '#ec4899',
            'Sales': '#f59e0b'
          };
          
          const color = deptColors[value] || '#6b7280';
          
          return unsafeHTML(`
            <span style="background-color: ${color}20; color: ${color}; 
                        padding: 3px 8px; border-radius: 4px; font-weight: 500;">
              ${value}
            </span>
          `);
        }
      },
      { 
        id: 'performance', 
        field: 'performance', 
        header: 'Performance',
        // Performance with progress bar
        renderer: (value) => {
          // Color based on value
          let color = '#ef4444'; // Red for low
          if (value >= 80) color = '#22c55e'; // Green for high
          else if (value >= 70) color = '#eab308'; // Yellow for medium
          
          return unsafeHTML(`
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="flex-grow: 1; background-color: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="width: ${value}%; background-color: ${color}; height: 100%;"></div>
              </div>
              <div style="min-width: 36px; text-align: right; font-weight: 500; color: ${color};">${value}%</div>
            </div>
          `);
        }
      }
    ];

    return html`
      <div style="padding: 20px; max-width: 600px;">
        <h3>Custom Cell Rendering</h3>
        
        <ae-datatable
          .data=${employees}
          .columns=${renderColumns}
          sortable
        ></ae-datatable>
      </div>
    `;
  }
};