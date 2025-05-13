/**
 * AeDataTable Selection Layout Improved
 * 
 * This story demonstrates the improved selection column layout 
 * with proper table cell styling and width control.
 */
import { html } from 'lit';

export default {
  title: 'Components/AeDataTable/Improved Selection Layout',
  parameters: {
    docs: {
      description: {
        component: 'This story demonstrates the fixed selection column layout with proper width control.'
      }
    }
  }
};

// Sample data
const generateData = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 10000) / 100,
    stock: Math.floor(Math.random() * 100),
    rating: Math.floor(Math.random() * 5) + 1,
    status: i % 3 === 0 ? 'Available' : i % 3 === 1 ? 'Limited' : 'Sold Out'
  }));
};

// Columns configuration
const columns = [
  { id: 'name', field: 'name', header: 'Product Name', sortable: true },
  { id: 'price', field: 'price', header: 'Price ($)', sortable: true, align: 'right' },
  { id: 'stock', field: 'stock', header: 'In Stock', sortable: true, align: 'right' },
  { id: 'rating', field: 'rating', header: 'Rating', sortable: true,
    renderer: (value) => html`${value} ★` },
  { id: 'status', field: 'status', header: 'Status', sortable: true }
];

const data = generateData(10);

/**
 * Basic table with selection enabled
 */
export const BasicTable = () => {
  return html`
    <style>
      .storybook-container {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="storybook-container">
      <h3>Basic Table with Selection (40px column width)</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        selectable
        selection-mode="multiple"
        style="--ae-datatable-selection-column-width: 40px"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Custom width selection column
 */
export const CustomWidthSelection = () => {
  return html`
    <style>
      .storybook-container {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .control-panel {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="storybook-container">
      <h3>Custom Width Selection Column</h3>
      <div class="control-panel">
        <label>
          Selection Column Width:
          <input 
            type="range" 
            min="30" 
            max="100" 
            value="40"
            @input=${(e) => {
              const width = e.target.value;
              const widthDisplay = e.target.nextElementSibling;
              widthDisplay.textContent = `${width}px`;
              const table = e.target.closest('.storybook-container').querySelector('ae-datatable');
              table.style.setProperty('--ae-datatable-selection-column-width', `${width}px`);
            }}
          />
          <span>40px</span>
        </label>
      </div>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        selectable
        selection-mode="multiple"
        style="--ae-datatable-selection-column-width: 40px"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Toggle selection on/off
 */
export const ToggleSelectionOnOff = () => {
  return html`
    <style>
      .storybook-container {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .control-panel {
        margin-bottom: 1rem;
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #e0e0e0;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="storybook-container">
      <h3>Toggle Selection On/Off</h3>
      <div class="control-panel">
        <button
          @click=${(e) => {
            const table = e.target.closest('.storybook-container').querySelector('ae-datatable');
            table.selectable = !table.selectable;
            e.target.textContent = table.selectable ? 'Disable Selection' : 'Enable Selection';
          }}
        >
          Disable Selection
        </button>
      </div>
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
 * Narrow container test
 */
export const NarrowContainerTest = () => {
  return html`
    <style>
      .storybook-container {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .control-panel {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .table-container {
        width: 600px;
        transition: width 0.3s ease;
        border: 1px solid #ddd;
        padding: 1px;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="storybook-container">
      <h3>Narrow Container Test</h3>
      <div class="control-panel">
        <label>
          Container Width:
          <input 
            type="range" 
            min="300" 
            max="1000" 
            value="600"
            @input=${(e) => {
              const width = e.target.value;
              const widthDisplay = e.target.nextElementSibling;
              widthDisplay.textContent = `${width}px`;
              const container = e.target.closest('.storybook-container').querySelector('.table-container');
              container.style.width = `${width}px`;
            }}
          />
          <span>600px</span>
        </label>
      </div>
      <div class="table-container">
        <ae-datatable
          .data=${data}
          .columns=${columns}
          selectable
          selection-mode="multiple"
          style="--ae-datatable-selection-column-width: 40px"
        ></ae-datatable>
      </div>
    </div>
  `;
};

/**
 * Many selections test
 */
export const ManySelectionsTest = () => {
  const manyData = generateData(100);
  
  return html`
    <style>
      .storybook-container {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="storybook-container">
      <h3>Many Rows With Selection (100 rows)</h3>
      <ae-datatable
        .data=${manyData}
        .columns=${columns}
        selectable
        selection-mode="multiple"
        paginated
        page-size="10"
      ></ae-datatable>
    </div>
  `;
};