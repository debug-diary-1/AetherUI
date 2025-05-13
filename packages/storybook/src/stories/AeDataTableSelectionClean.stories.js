/**
 * AeDataTable Selection Clean Implementation
 * 
 * This story demonstrates the clean implementation of selection column layout
 * without using !important flags, proper Shadow DOM encapsulation
 * and standardized slot usage.
 */
import { html } from 'lit';

export default {
  title: 'Components/AeDataTable/Clean Selection',
  parameters: {
    docs: {
      description: {
        component: 'This story demonstrates the clean implementation of selection column layout without using !important flags.'
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
export const BasicTableWithSelection = () => {
  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Basic Table with Selection</h3>
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
 * Side by side comparison
 */
export const SideBySideComparison = () => {
  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      h3, h4 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Side by Side Comparison</h3>
      <div class="comparison">
        <div>
          <h4>With Selection</h4>
          <ae-datatable
            .data=${data}
            .columns=${columns}
            selectable
            selection-mode="multiple"
          ></ae-datatable>
        </div>
        <div>
          <h4>Without Selection</h4>
          <ae-datatable
            .data=${data}
            .columns=${columns}
          ></ae-datatable>
        </div>
      </div>
    </div>
  `;
};

/**
 * Custom width selection column
 */
export const CustomSelectionWidth = () => {
  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .controls {
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .width-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .tables {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
      }
      h3, h4 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Custom Selection Column Width</h3>
      <div class="controls">
        <div class="width-control">
          <label>
            Selection Column Width:
            <input 
              type="range" 
              min="30" 
              max="100" 
              value="56"
              @input=${(e) => {
                const width = e.target.value;
                const widthDisplay = e.target.nextElementSibling;
                widthDisplay.textContent = `${width}px`;
                document.querySelectorAll('.custom-width-table').forEach(table => {
                  table.style.setProperty('--ae-datatable-selection-column-width', `${width}px`);
                });
              }}
            />
            <span>56px</span>
          </label>
        </div>
      </div>
      <div class="tables">
        <div>
          <h4>Narrow (40px)</h4>
          <ae-datatable
            .data=${data}
            .columns=${columns}
            selectable
            selection-mode="multiple"
            style="--ae-datatable-selection-column-width: 40px"
          ></ae-datatable>
        </div>
        <div>
          <h4>Standard (56px)</h4>
          <ae-datatable
            .data=${data}
            .columns=${columns}
            selectable
            selection-mode="multiple"
            style="--ae-datatable-selection-column-width: 56px"
            class="custom-width-table"
          ></ae-datatable>
        </div>
        <div>
          <h4>Wide (80px)</h4>
          <ae-datatable
            .data=${data}
            .columns=${columns}
            selectable
            selection-mode="multiple"
            style="--ae-datatable-selection-column-width: 80px"
          ></ae-datatable>
        </div>
      </div>
    </div>
  `;
};

/**
 * Responsive layout with selection
 */
export const ResponsiveLayout = () => {
  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .controls {
        margin-bottom: 1rem;
      }
      .container {
        width: 600px;
        border: 2px solid #aaa;
        padding: 2px;
        transition: width 0.3s ease;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Responsive Layout with Selection</h3>
      <div class="controls">
        <label>
          Container Width:
          <input 
            type="range" 
            min="300" 
            max="1000" 
            value="600"
            @input=${(e) => {
              const width = e.target.value;
              const container = e.target.closest('.section').querySelector('.container');
              container.style.width = `${width}px`;
              const widthDisplay = e.target.nextElementSibling;
              widthDisplay.textContent = `${width}px`;
            }}
          />
          <span>600px</span>
        </label>
      </div>
      <div class="container">
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
 * Fixed width columns with selection
 */
export const FixedWidthColumns = () => {
  const fixedColumns = [
    { id: 'name', field: 'name', header: 'Product Name', sortable: true, width: '200px' },
    { id: 'price', field: 'price', header: 'Price ($)', sortable: true, align: 'right', width: '100px' },
    { id: 'stock', field: 'stock', header: 'In Stock', sortable: true, align: 'right', width: '100px' },
    { id: 'rating', field: 'rating', header: 'Rating', sortable: true, width: '100px',
      renderer: (value) => html`${value} ★` },
    { id: 'status', field: 'status', header: 'Status', sortable: true, width: '150px' }
  ];

  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Fixed Width Columns with Selection</h3>
      <ae-datatable
        .data=${data}
        .columns=${fixedColumns}
        selectable
        selection-mode="multiple"
      ></ae-datatable>
    </div>
  `;
};

/**
 * Extremely narrow table
 */
export const ExtremelyNarrowTable = () => {
  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .narrow-container {
        width: 350px;
        border: 2px solid #e00;
        padding: 2px;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Extremely Narrow Table with Selection</h3>
      <div class="narrow-container">
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
 * Single selection mode
 */
export const SingleSelectionMode = () => {
  return html`
    <style>
      .section {
        border: 1px dashed #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin-top: 0;
      }
    </style>
    <div class="section">
      <h3>Single Selection Mode</h3>
      <ae-datatable
        .data=${data}
        .columns=${columns}
        selectable
        selection-mode="single"
      ></ae-datatable>
    </div>
  `;
};