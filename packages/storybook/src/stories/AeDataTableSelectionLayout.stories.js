/**
 * AeDataTable Selection Layout Story
 * 
 * This story demonstrates the fixed layout for selection checkboxes
 * in the AeDataTable component, ensuring they have the correct width
 * and don't cause layout issues.
 */
import { html } from 'lit';

export default {
  title: 'Components/AeDataTable/Selection Layout',
  argTypes: {
    selectable: { 
      control: 'boolean',
      defaultValue: true,
      description: 'Enables row selection'
    },
    selectionColumnWidth: {
      control: 'text',
      defaultValue: '56px',
      description: 'Width of the selection column (CSS value)'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'This example demonstrates the fixed layout for selection checkboxes.'
      }
    }
  }
};

// Helper function to create sample data
const createSampleData = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
    created: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
  }));
};

// Basic column definitions
const columns = [
  { id: 'name', header: 'Name', field: 'name', sortable: true },
  { id: 'description', header: 'Description', field: 'description' },
  { id: 'status', header: 'Status', field: 'status', sortable: true },
  { id: 'created', header: 'Created Date', field: 'created', sortable: true }
];

// Basic sample data
const data = createSampleData(10);

/**
 * Basic Selection Example
 * 
 * This template shows a datatable with selection enabled,
 * demonstrating the fixed selection column width.
 */
export const BasicSelection = (args) => {
  // Set CSS variable for selection column width
  const style = args.selectionColumnWidth !== '56px' ? 
    `--ae-datatable-selection-column-width: ${args.selectionColumnWidth};` : '';
  
  return html`
    <div style="width: 100%; ${style}">
      <h3>Selection Column Layout</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        ?selectable=${args.selectable}
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Narrow Selection Column
 * 
 * This template demonstrates the ability to customize the
 * selection column width using CSS variables.
 */
export const NarrowSelectionColumn = () => {
  const style = `--ae-datatable-selection-column-width: 40px;`;
  
  return html`
    <div style="width: 100%; ${style}">
      <h3>Narrow Selection Column (40px)</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        selectable
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Wide Selection Column
 * 
 * This template demonstrates a wider selection column.
 */
export const WideSelectionColumn = () => {
  const style = `--ae-datatable-selection-column-width: 80px;`;
  
  return html`
    <div style="width: 100%; ${style}">
      <h3>Wide Selection Column (80px)</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        selectable
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Selection Column with Narrow Table
 *
 * This template demonstrates the selection column in a narrow table,
 * showing that it maintains its fixed width even when table space is limited.
 */
export const NarrowTable = () => {
  return html`
    <div style="width: 400px;">
      <h3>Narrow Table (400px)</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        selectable
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Extremely Narrow Table
 *
 * This example tests the selection column in an extremely narrow table
 * to verify that it still maintains its proper width without breaking layout.
 */
export const ExtremelyNarrowTable = () => {
  // Create a minimal set of columns for the narrow test
  const minimalColumns = [
    { id: 'name', header: 'Name', field: 'name' },
    { id: 'status', header: 'Status', field: 'status' }
  ];

  return html`
    <div style="width: 220px;">
      <h3>Extremely Narrow Table (220px)</h3>
      <ae-datatable
        .data=${data}
        .columns=${minimalColumns}
        selectable
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Toggle Selection On/Off
 *
 * This template allows toggling the selection to verify that
 * the layout adjusts correctly when selection is enabled/disabled.
 */
export const ToggleSelection = (args) => {
  return html`
    <div style="width: 100%;">
      <h3>Toggle Selection ${args.selectable ? 'On' : 'Off'}</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        ?selectable=${args.selectable}
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};
ToggleSelection.args = {
  selectable: true
};

/**
 * Layout comparison with and without selection
 *
 * This example shows two tables side by side, one with selection enabled and one without,
 * to demonstrate that the layout doesn't break when selection is enabled.
 */
export const SideBySideComparison = () => {
  return html`
    <div style="display: flex; gap: 20px; width: 100%;">
      <div style="flex: 1;">
        <h3>Without Selection</h3>
        <ae-datatable
          .data=${data}
          .columns=${columns}
        ></ae-datatable>
      </div>
      <div style="flex: 1;">
        <h3>With Selection</h3>
        <ae-datatable
          .data=${data}
          .columns=${columns}
          selectable
          selection-mode="multiple"
        ></ae-datatable>
      </div>
    </div>
  `;
};

/**
 * Fixed Width Columns with Selection
 *
 * This example demonstrates the table with fixed width columns and
 * selection enabled, to show that the selection column maintains its
 * width and doesn't cause layout issues.
 */
export const FixedWidthColumnsWithSelection = () => {
  // Define columns with explicit widths
  const fixedWidthColumns = [
    { id: 'name', header: 'Name', field: 'name', sortable: true, width: 150 },
    { id: 'description', header: 'Description', field: 'description', width: 250 },
    { id: 'status', header: 'Status', field: 'status', sortable: true, width: 100 },
    { id: 'created', header: 'Created Date', field: 'created', sortable: true, width: 120 }
  ];

  return html`
    <div style="width: 100%;">
      <h3>Fixed Width Columns With Selection</h3>
      <ae-datatable
        .data=${data}
        .columns=${fixedWidthColumns}
        selectable
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};