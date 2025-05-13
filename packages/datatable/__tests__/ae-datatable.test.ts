import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as htmlExpect } from '@open-wc/testing';
import '../src/ae-datatable';
import '../src/ae-datatable-header';
import '../src/ae-datatable-row';
import '../src/ae-datatable-cell';
import { AeDataTable } from '../src/ae-datatable';
import { ColumnDef } from '../src/models/column-model';

describe('AeDataTable', () => {
  // Test data
  const testData = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
  ];

  // Column definitions
  const columns: ColumnDef<any>[] = [
    { id: 'name', field: 'name', header: 'Name', sortable: true },
    { id: 'age', field: 'age', header: 'Age', sortable: true },
    { id: 'email', field: 'email', header: 'Email', sortable: false },
  ];

  let element: AeDataTable<any>;

  beforeEach(async () => {
    element = await fixture(html`
      <ae-datatable .data=${testData} .columns=${columns}></ae-datatable>
    `);
  });

  it('should render with data and columns', async () => {
    // Wait for component to initialize
    await element.updateComplete;

    // Check if table is rendered
    const table = element.shadowRoot!.querySelector('.datatable');
    expect(table).to.exist;

    // Check for correct number of header cells
    const headerCells = element.shadowRoot!.querySelectorAll('ae-datatable-header');
    expect(headerCells.length).to.equal(columns.length);

    // Check if data rows are rendered
    const rows = element.shadowRoot!.querySelectorAll('ae-datatable-row');
    expect(rows.length).to.equal(testData.length);
  });

  it('should handle sort events', async () => {
    await element.updateComplete;

    // Create a spy for the sort event
    const sortSpy = vi.fn();
    element.addEventListener('ae-datatable-sort', sortSpy);

    // Get the first sortable header
    const nameHeader = element.shadowRoot!.querySelector('ae-datatable-header[id="name"]') as HTMLElement;
    expect(nameHeader).to.exist;

    // Trigger a sort by clicking the header
    nameHeader.click();

    // Check if event was dispatched
    expect(sortSpy).toHaveBeenCalled();
  });

  it('should render the correct cell content', async () => {
    await element.updateComplete;

    // Get the cells for the first row
    const firstRow = element.shadowRoot!.querySelector('ae-datatable-row[id="1"]');
    expect(firstRow).to.exist;

    // Check cell content
    const cells = firstRow!.querySelectorAll('ae-datatable-cell');
    expect(cells.length).to.equal(columns.length);

    // Verify content in specific cells
    const nameCell = firstRow!.querySelector('ae-datatable-cell[data-column="name"]');
    expect(nameCell?.textContent?.trim()).to.equal('John Doe');
  });

  it('should show empty message when no data', async () => {
    // Create a table with no data
    const emptyTable = await fixture(html`
      <ae-datatable .data=${[]} .columns=${columns} empty-message="No data available"></ae-datatable>
    `);

    // For LitElement components
    if ('updateComplete' in emptyTable) {
      await (emptyTable as any).updateComplete;
    }

    // Check for empty message
    const emptyMessage = emptyTable.shadowRoot!.querySelector('.datatable__empty');
    expect(emptyMessage).to.exist;
    expect(emptyMessage?.textContent?.trim()).to.equal('No data available');
  });

  it('should handle selection when selectable is true', async () => {
    // Create a selectable table
    const selectableTable = await fixture(html`
      <ae-datatable
        .data=${testData}
        .columns=${columns}
        selectable
      ></ae-datatable>
    `);

    // For LitElement components
    if ('updateComplete' in selectableTable) {
      await (selectableTable as any).updateComplete;
    }

    // Check for selection checkbox in header
    const selectionHeader = selectableTable.shadowRoot!.querySelector('ae-datatable-header-cell[id="selection"]');
    expect(selectionHeader).to.exist;

    // Create a spy for the selection event
    const selectSpy = vi.fn();
    selectableTable.addEventListener('ae-datatable-select', selectSpy);

    // Click on the first row to select it
    const firstRow = selectableTable.shadowRoot!.querySelector('ae-datatable-row[id="1"]') as HTMLElement;
    firstRow.click();

    // Verify selection event was fired
    expect(selectSpy).toHaveBeenCalled();
  });

  it('should apply correct CSS classes and width to selection column', async () => {
    // Create a selectable table
    const selectableTable = await fixture(html`
      <ae-datatable
        .data=${testData}
        .columns=${columns}
        selectable
      ></ae-datatable>
    `);

    await (selectableTable as any).updateComplete;

    // Check that the datatable has selectable class
    const tableElement = selectableTable.shadowRoot!.querySelector('.datatable');
    expect(tableElement!.classList.contains('datatable--selectable')).to.be.true;

    // Check selection header
    const selectionHeader = selectableTable.shadowRoot!.querySelector('.datatable__selection-header');
    expect(selectionHeader).to.exist;

    // Check selection cells
    const selectionCells = selectableTable.shadowRoot!.querySelectorAll('.datatable__selection-cell');
    expect(selectionCells.length).to.equal(testData.length);

    // Verify that the selection column has the correct width via CSS
    // Get computed style for selection header
    if (selectionHeader) {
      const selectionHeaderStyles = getComputedStyle(selectionHeader as Element);

      // Check that width properties are applied
      expect(selectionHeaderStyles.width).not.to.be.empty;
      expect(selectionHeaderStyles.minWidth).not.to.be.empty;
      expect(selectionHeaderStyles.maxWidth).not.to.be.empty;

      // If possible, check the actual values (this may not work in all test environments)
      if (selectionHeaderStyles.width) {
        // The width should match our CSS variable (56px or equivalent)
        const width = selectionHeaderStyles.width;
        expect(width).to.match(/^(56px|var\(--ae-datatable-selection-column-width, 56px\))$/);
      }
    }

    // Ensure grid template columns is correctly set
    const header = selectableTable.shadowRoot!.querySelector('.datatable__header');
    if (header) {
      const headerStyles = getComputedStyle(header as Element);
      expect(headerStyles.gridTemplateColumns).not.to.be.empty;
    }
  });
});