import { html } from 'lit';

// Directly import just the element name
const DATATABLE_ELEMENT_NAME = 'ae-datatable';

export default {
  title: 'Components/DataTable/Fixed',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple']
    }
  }
};

// Simple data with minimal fields
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// Very minimal columns
const simpleColumns = [
  { id: 'name', field: 'name', header: 'Name' },
  { id: 'email', field: 'email', header: 'Email' }
];

// Define a custom element that wraps the DataTable
// This lets us control the initialization completely
class DataTableWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Create a container
    this.container = document.createElement('div');
    this.container.style.width = '100%';
    this.container.style.maxWidth = '600px';
    this.shadowRoot.appendChild(this.container);
    
    // Add setup scripts
    const setupScript = document.createElement('script');
    setupScript.type = 'module';
    setupScript.textContent = `
      import('@aetherui/datatable').then(module => {
        if (module.defineDataTableElements) {
          module.defineDataTableElements();
          console.log('DataTable registered in wrapper');
          
          // Create table after registration
          createTable();
        }
      }).catch(err => console.error('Error loading DataTable:', err));
      
      function createTable() {
        const dataTable = document.createElement('ae-datatable');
        
        // Set properties from attributes
        dataTable.data = ${JSON.stringify(sampleData)};
        dataTable.columns = ${JSON.stringify(simpleColumns)};
        
        // Boolean attributes
        if (this.hasAttribute('sortable')) dataTable.sortable = true;
        if (this.hasAttribute('filterable')) dataTable.filterable = true;
        if (this.hasAttribute('selectable')) dataTable.selectable = true;
        if (this.hasAttribute('paginated')) dataTable.paginated = true;
        
        // String attributes
        if (this.hasAttribute('selection-mode')) {
          dataTable.selectionMode = this.getAttribute('selection-mode');
        }
        
        // Event listeners
        dataTable.addEventListener('ae-datatable-select', (e) => {
          console.log('Selection changed:', e.detail.selectedRows);
          
          // Update selection display if it exists
          const selectionDisplay = this.shadowRoot.querySelector('#selection-display');
          if (selectionDisplay) {
            selectionDisplay.textContent = JSON.stringify(e.detail.selectedRows, null, 2);
          }
        });
        
        this.shadowRoot.querySelector('.container').appendChild(dataTable);
      }
    `;
    this.shadowRoot.appendChild(setupScript);
    
    // Set up container and styles
    this.shadowRoot.innerHTML += `
      <style>
        :host {
          display: block;
          padding: 20px;
          font-family: sans-serif;
        }
        
        .container {
          width: 100%;
          max-width: 600px;
        }
        
        .info-box {
          margin-bottom: 16px;
          padding: 12px;
          background-color: #f0f9ff;
          border-radius: 4px;
          color: #0369a1;
        }
        
        .selection-box {
          margin-top: 20px;
          padding: 12px;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
        }
        
        .selection-box h4 {
          margin-top: 0;
          margin-bottom: 8px;
        }
        
        #selection-display {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 4px;
          overflow: auto;
          max-height: 100px;
          font-family: monospace;
        }
      </style>
      
      <h3>${this.getAttribute('title') || 'DataTable'}</h3>
      
      <div class="info-box">
        <p>The datatable component is loaded in a custom element to ensure proper initialization.</p>
      </div>
      
      <div class="container"></div>
      
      ${this.hasAttribute('selectable') ? `
        <div class="selection-box">
          <h4>Selected Items:</h4>
          <pre id="selection-display">[]</pre>
        </div>
      ` : ''}
    `;
  }
  
  // Handle attribute changes
  static get observedAttributes() {
    return ['selectable', 'selection-mode', 'sortable', 'filterable', 'paginated'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    // You could handle attribute changes here if needed
    // For now we just set them up during initialization
  }
}

// Register the wrapper component
if (typeof window !== 'undefined') {
  if (!customElements.get('datatable-wrapper')) {
    customElements.define('datatable-wrapper', DataTableWrapper);
  }
}

// Basic example without selection
export const Basic = {
  render: () => {
    return html`
      <datatable-wrapper 
        title="Basic DataTable" 
        sortable
        filterable
      ></datatable-wrapper>
    `;
  }
};

// Example with selection
export const WithSelection = {
  args: {
    selectionMode: 'multiple'
  },
  render: (args) => {
    return html`
      <datatable-wrapper 
        title="DataTable with Selection"
        selectable 
        selection-mode=${args.selectionMode}
        sortable
      ></datatable-wrapper>
    `;
  }
};