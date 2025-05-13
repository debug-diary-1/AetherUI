/**
 * AeDataTable Selection Column Layout Fix Demo
 * 
 * This story specifically demonstrates the fixed selection column layout
 * that properly maintains its width without disrupting the table structure.
 */
import { html } from 'lit';

export default {
  title: 'Components/AeDataTable/Selection Layout Fix',
  parameters: {
    docs: {
      description: {
        component: 'This example demonstrates the fixed selection column width that correctly maintains layout when checkboxes appear.'
      }
    }
  }
};

// Helper to create sample data
const createSampleData = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: i % 3 === 0 ? 'Electronics' : i % 3 === 1 ? 'Clothing' : 'Food',
    price: Math.floor(Math.random() * 1000) / 10,
    inStock: i % 5 !== 0,
    rating: Math.floor(Math.random() * 50) / 10
  }));
};

// Columns with different widths
const columns = [
  { id: 'name', header: 'Product Name', field: 'name', sortable: true },
  { id: 'category', header: 'Category', field: 'category', sortable: true },
  { id: 'price', header: 'Price ($)', field: 'price', sortable: true, align: 'right' },
  { id: 'inStock', header: 'In Stock', field: 'inStock', sortable: true, 
    renderer: (value) => html`<span>${value ? '✓' : '✗'}</span>` },
  { id: 'rating', header: 'Rating', field: 'rating', sortable: true,
    renderer: (value) => html`<span>${'★'.repeat(Math.floor(value))}</span>` }
];

// Sample data
const data = createSampleData(20);

/**
 * Default example demonstrating fixed selection column layout
 */
export const FixedSelectionColumn = () => {
  return html`
    <h3>Table with Fixed Selection Column Width (40px)</h3>
    <ae-datatable
      .data=${data}
      .columns=${columns}
      selectable
      selection-mode="multiple"
      style="--ae-datatable-selection-column-width: 40px"
    ></ae-datatable>
  `;
};

/**
 * Toggleable Selection
 * 
 * Shows the table with a button to toggle selection on/off to 
 * demonstrate that the layout remains stable during the transition
 */
export const ToggleSelection = () => {
  return html`
    <div>
      <button 
        id="toggle-selection"
        @click=${(e) => {
          const table = e.target.parentElement.querySelector('ae-datatable');
          table.selectable = !table.selectable;
          e.target.textContent = table.selectable ? 'Disable Selection' : 'Enable Selection';
        }}
      >
        Disable Selection
      </button>
      <div style="margin-top: 16px;">
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
 * Custom Width Selection Column
 */
export const CustomWidthSelectionColumn = () => {
  return html`
    <div>
      <div style="margin-bottom: 16px;">
        <label>
          Selection Column Width:
          <input 
            type="range" 
            min="30" 
            max="80" 
            value="40"
            @input=${(e) => {
              const width = e.target.value;
              e.target.nextElementSibling.textContent = `${width}px`;
              const table = e.target.parentElement.parentElement.nextElementSibling.querySelector('ae-datatable');
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
 * Responsive Layout Test
 * 
 * Tests how the selection column behaves in narrow containers
 * while maintaining its fixed width
 */
export const ResponsiveLayoutTest = () => {
  return html`
    <div>
      <div style="margin-bottom: 16px;">
        <label>
          Container Width:
          <input 
            type="range" 
            min="300" 
            max="1000" 
            value="800"
            @input=${(e) => {
              const width = e.target.value;
              e.target.nextElementSibling.textContent = `${width}px`;
              const container = e.target.parentElement.parentElement.nextElementSibling;
              container.style.width = `${width}px`;
            }}
          />
          <span>800px</span>
        </label>
      </div>
      <div style="width: 800px; border: 1px dashed #ccc; padding: 1px; transition: width 0.3s;">
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