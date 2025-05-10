import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../src/test/setup';
import { registerCustomElements } from '../src/test/test-helper';

// Ensure all custom elements are registered for testing
registerCustomElements();
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

  it('should be defined', () => {
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(AeDataTable);
  });

  it('should have correct properties', () => {
    expect(element.data).toEqual(testData);
    expect(element.columns).toEqual(columns);
    expect(element.sortable).toBe(true);
    expect(element.filterable).toBe(true);
    expect(element.selectable).toBe(false);
    expect(element.emptyMessage).toBe('No data to display');
  });

  it('should render empty message when no data', async () => {
    const emptyTable = await fixture(html`
      <ae-datatable .data=${[]} .columns=${columns} empty-message="No data available"></ae-datatable>
    `);
    
    await emptyTable.updateComplete;
    
    const emptyMessage = emptyTable.shadowRoot!.querySelector('.datatable__empty');
    expect(emptyMessage).toBeDefined();
    expect(emptyMessage?.textContent?.trim()).toContain('No data available');
  });
});