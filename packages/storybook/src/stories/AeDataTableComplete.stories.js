import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Import just the constant
const _DATATABLE_ELEMENT_NAME = 'ae-datatable';

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

export default {
  title: 'Components/DataTable/FullPage',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Full-Featured DataTable Example

This demonstrates the DataTable component with all features enabled, including:
- Row selection with checkboxes
- Pagination with configurable page size
- Global filtering (search box at top)
- Column sorting (click column headers)
- Custom cell rendering with avatars and badges

## Layout Solution

The key to maintaining a proper layout when selection mode is enabled:
\`\`\`html
<div style="width: 100%; overflow-x: auto;">
  <ae-datatable selectable ...></ae-datatable>
</div>
\`\`\`

This approach:
1. Uses a full-width responsive container with horizontal overflow
2. Ensures the table doesn't break when the selection checkbox column is added
3. Adapts to any container size while allowing horizontal scrolling when needed
4. Maintains visual integrity of all cells and columns
5. Utilizes the entire available space on the page
`,
      },
    },
  },
};

// Sample data
const data = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    status: 'Active',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    email: 'jane@example.com',
    status: 'Active',
    department: 'Design',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 42,
    email: 'bob@example.com',
    status: 'Inactive',
    department: 'Finance',
  },
  {
    id: 4,
    name: 'Alice Brown',
    age: 36,
    email: 'alice@example.com',
    status: 'Active',
    department: 'Product',
  },
  {
    id: 5,
    name: 'Charlie Davis',
    age: 28,
    email: 'charlie@example.com',
    status: 'Pending',
    department: 'Marketing',
  },
];

// Full-featured example that fixes the layout issues
export const FullFeatured = {
  render: () => {
    // Columns that work well with selection
    const columns = [
      {
        id: 'name',
        field: 'name',
        header: 'Name',
        // Avatar and name renderer
        renderer: (value) =>
          unsafeHTML(`
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="min-width: 24px; height: 24px; border-radius: 50%; 
                        background: #4f46e5; color: white; display: flex; 
                        align-items: center; justify-content: center; font-weight: 500;">
              ${value.charAt(0)}
            </div>
            <span>${value}</span>
          </div>
        `),
      },
      {
        id: 'status',
        field: 'status',
        header: 'Status',
        // Status badges
        renderer: (value) => {
          const statusConfig = {
            Active: { color: '#16a34a', bgColor: '#d1fae5', icon: '✅' },
            Inactive: { color: '#dc2626', bgColor: '#fee2e2', icon: '❌' },
            Pending: { color: '#ca8a04', bgColor: '#fef3c7', icon: '⏳' },
          };

          const config = statusConfig[value] || {
            color: '#6b7280',
            bgColor: '#f3f4f6',
            icon: '❓',
          };

          return unsafeHTML(`
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>${config.icon}</span>
              <span style="background-color: ${config.bgColor}; color: ${config.color}; 
                          padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem;">
                ${value}
              </span>
            </div>
          `);
        },
      },
      {
        id: 'department',
        field: 'department',
        header: 'Department',
        // Department badges
        renderer: (value) => {
          const deptColors = {
            Engineering: '#3b82f6',
            Design: '#8b5cf6',
            Finance: '#10b981',
            Product: '#6366f1',
            Marketing: '#ec4899',
          };

          const color = deptColors[value] || '#6b7280';

          return unsafeHTML(`
            <span style="background-color: ${color}20; color: ${color}; 
                        padding: 3px 8px; border-radius: 4px; font-weight: 500;">
              ${value}
            </span>
          `);
        },
      },
    ];

    return html`
      <div style="padding: 20px;">
        <h3>Full-Featured DataTable</h3>

        <div
          style="margin-bottom: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 4px;"
        >
          <p style="margin: 0; color: #0369a1;">
            <strong>Note:</strong> This example combines selection, pagination, filtering, and
            custom rendering. The checkbox column is added automatically when selection is enabled.
          </p>
        </div>

        <!-- Full-width responsive container with overflow control -->
        <div
          style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px; padding: 1px;"
        >
          <ae-datatable
            .data=${data}
            .columns=${columns}
            sortable
            filterable
            selectable
            paginated
            page-size="3"
          ></ae-datatable>
        </div>

        <div style="margin-top: 16px; font-size: 14px; color: #666;">
          <p><strong>Features demonstrated:</strong></p>
          <ul>
            <li>Row selection with checkboxes</li>
            <li>Pagination with configurable page size</li>
            <li>Global filtering (search box at top)</li>
            <li>Column sorting (click column headers)</li>
            <li>Custom cell rendering with avatars and badges</li>
          </ul>
        </div>
      </div>
    `;
  },
};

// Version without selection for comparison
export const WithoutSelection = {
  render: () => {
    // Same columns as the full featured example
    const columns = [
      {
        id: 'name',
        field: 'name',
        header: 'Name',
        renderer: (value) =>
          unsafeHTML(`
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="min-width: 24px; height: 24px; border-radius: 50%; 
                        background: #4f46e5; color: white; display: flex; 
                        align-items: center; justify-content: center; font-weight: 500;">
              ${value.charAt(0)}
            </div>
            <span>${value}</span>
          </div>
        `),
      },
      {
        id: 'status',
        field: 'status',
        header: 'Status',
        renderer: (value) => {
          const statusConfig = {
            Active: { color: '#16a34a', bgColor: '#d1fae5', icon: '✅' },
            Inactive: { color: '#dc2626', bgColor: '#fee2e2', icon: '❌' },
            Pending: { color: '#ca8a04', bgColor: '#fef3c7', icon: '⏳' },
          };

          const config = statusConfig[value] || {
            color: '#6b7280',
            bgColor: '#f3f4f6',
            icon: '❓',
          };

          return unsafeHTML(`
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>${config.icon}</span>
              <span style="background-color: ${config.bgColor}; color: ${config.color}; 
                          padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem;">
                ${value}
              </span>
            </div>
          `);
        },
      },
      {
        id: 'department',
        field: 'department',
        header: 'Department',
        renderer: (value) => {
          const deptColors = {
            Engineering: '#3b82f6',
            Design: '#8b5cf6',
            Finance: '#10b981',
            Product: '#6366f1',
            Marketing: '#ec4899',
          };

          const color = deptColors[value] || '#6b7280';

          return unsafeHTML(`
            <span style="background-color: ${color}20; color: ${color}; 
                        padding: 3px 8px; border-radius: 4px; font-weight: 500;">
              ${value}
            </span>
          `);
        },
      },
    ];

    return html`
      <div style="padding: 20px;">
        <h3>DataTable Without Selection</h3>

        <div
          style="margin-bottom: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 4px;"
        >
          <p style="margin: 0; color: #0369a1;">
            <strong>Note:</strong> This example is identical to the Full-Featured example but
            without selection enabled. Compare to see how the selection column affects layout.
          </p>
        </div>

        <!-- Same full-width container for consistent comparison -->
        <div
          style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px; padding: 1px;"
        >
          <ae-datatable
            .data=${data}
            .columns=${columns}
            sortable
            filterable
            paginated
            page-size="3"
          ></ae-datatable>
        </div>
      </div>
    `;
  },
};

// Example with responsive container
export const ResponsiveContainer = {
  render: () => {
    // Same columns as the other examples
    const columns = [
      {
        id: 'name',
        field: 'name',
        header: 'Name',
        renderer: (value) =>
          unsafeHTML(`
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="min-width: 24px; height: 24px; border-radius: 50%; 
                        background: #4f46e5; color: white; display: flex; 
                        align-items: center; justify-content: center; font-weight: 500;">
              ${value.charAt(0)}
            </div>
            <span>${value}</span>
          </div>
        `),
      },
      {
        id: 'status',
        field: 'status',
        header: 'Status',
        renderer: (value) => {
          const statusConfig = {
            Active: { color: '#16a34a', bgColor: '#d1fae5', icon: '✅' },
            Inactive: { color: '#dc2626', bgColor: '#fee2e2', icon: '❌' },
            Pending: { color: '#ca8a04', bgColor: '#fef3c7', icon: '⏳' },
          };

          const config = statusConfig[value] || {
            color: '#6b7280',
            bgColor: '#f3f4f6',
            icon: '❓',
          };

          return unsafeHTML(`
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>${config.icon}</span>
              <span style="background-color: ${config.bgColor}; color: ${config.color}; 
                          padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem;">
                ${value}
              </span>
            </div>
          `);
        },
      },
      {
        id: 'department',
        field: 'department',
        header: 'Department',
        renderer: (value) => {
          const deptColors = {
            Engineering: '#3b82f6',
            Design: '#8b5cf6',
            Finance: '#10b981',
            Product: '#6366f1',
            Marketing: '#ec4899',
          };

          const color = deptColors[value] || '#6b7280';

          return unsafeHTML(`
            <span style="background-color: ${color}20; color: ${color}; 
                        padding: 3px 8px; border-radius: 4px; font-weight: 500;">
              ${value}
            </span>
          `);
        },
      },
    ];

    return html`
      <div style="padding: 20px; max-width: 100%;">
        <h3>Full Page Responsive Example</h3>

        <div
          style="margin-bottom: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 4px;"
        >
          <p style="margin: 0; color: #0369a1;">
            <strong>Note:</strong> This example demonstrates a truly responsive DataTable that uses
            the full available width of its container. Resize the browser window to see how it
            adapts to different screen sizes.
          </p>
        </div>

        <!-- Full-page responsive container with clean styling -->
        <div
          style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
        >
          <ae-datatable
            .data=${data}
            .columns=${columns}
            sortable
            filterable
            selectable
            paginated
            page-size="5"
          ></ae-datatable>
        </div>

        <div
          style="margin-top: 16px; padding: 12px; background-color: #f8fafc; border-radius: 4px;"
        >
          <p style="margin: 0; color: #475569;">
            <strong>Implementation Notes:</strong>
          </p>
          <ul style="color: #475569; margin-top: 8px;">
            <li>The container uses <code>width: 100%</code> to fill the available space</li>
            <li>
              Horizontal scrolling (<code>overflow-x: auto</code>) is essential for table integrity
              on small screens
            </li>
            <li>
              This approach works across any screen size while maintaining all column functionality
            </li>
            <li>Light styling (border, border-radius, shadow) improves the visual presentation</li>
          </ul>
        </div>
      </div>
    `;
  },
};
