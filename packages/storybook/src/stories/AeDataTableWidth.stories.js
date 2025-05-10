import { html } from 'lit';

// Import just the constant
const DATATABLE_ELEMENT_NAME = 'ae-datatable';

// Dynamic registration through a script tag
const registerComponents = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import('@aetherui/datatable')
        .then(module => module.defineDataTableElements?.())
        .catch(err => console.error('Error loading datatable components', err));
    `;
    document.head.appendChild(script);
  }
};

// Try to register components
registerComponents();

export default {
  title: 'Components/DataTable/Width',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

// Simple data set
const data = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

// Minimal columns
const columns = [
  { id: 'name', field: 'name', header: 'Name' },
  { id: 'email', field: 'email', header: 'Email' }
];

// Functions to render tables at different widths
const renderWithWidth = (width) => {
  return html`
    <div style="padding: 20px;">
      <h3>DataTable with ${width}px width</h3>
      <div style="width: ${width}px; border: 1px solid #e5e7eb; padding: 8px; margin-bottom: 24px;">
        <ae-datatable
          .data=${data}
          .columns=${columns}
        ></ae-datatable>
      </div>
    </div>
  `;
};

const renderWithSelectionAndWidth = (width) => {
  return html`
    <div style="padding: 20px;">
      <h3>DataTable with Selection and ${width}px width</h3>
      <div style="width: ${width}px; border: 1px solid #e5e7eb; padding: 8px; margin-bottom: 24px;">
        <ae-datatable
          .data=${data}
          .columns=${columns}
          selectable
        ></ae-datatable>
      </div>
    </div>
  `;
};

// Width variations
export const Width300px = {
  render: () => renderWithWidth(300)
};

export const Width400px = {
  render: () => renderWithWidth(400)
};

export const Width500px = {
  render: () => renderWithWidth(500)
};

// Selection with width variations
export const SelectionWidth300px = {
  render: () => renderWithSelectionAndWidth(300)
};

export const SelectionWidth400px = {
  render: () => renderWithSelectionAndWidth(400)
};

export const SelectionWidth500px = {
  render: () => renderWithSelectionAndWidth(500)
};

// Test with minimal columns
export const Minimal = {
  render: () => {
    // Absolutely minimal setup
    const minimalData = [
      { id: 1, name: 'Test' }
    ];
    
    const minimalColumns = [
      { id: 'name', field: 'name', header: 'Name' }
    ];
    
    return html`
      <div style="padding: 20px;">
        <h3>Minimal DataTable</h3>
        <div style="width: 300px; border: 1px solid #e5e7eb; padding: 8px;">
          <ae-datatable
            .data=${minimalData}
            .columns=${minimalColumns}
          ></ae-datatable>
        </div>
        
        <h3 style="margin-top: 30px;">Minimal DataTable with Selection</h3>
        <div style="width: 300px; border: 1px solid #e5e7eb; padding: 8px;">
          <ae-datatable
            .data=${minimalData}
            .columns=${minimalColumns}
            selectable
          ></ae-datatable>
        </div>
      </div>
    `;
  }
};