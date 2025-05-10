import { describe, it, expect } from 'vitest';
import { AeDataTable } from '../src/ae-datatable';
import { ColumnDef } from '../src/models/column-model';
import { DataTableController } from '../src/controllers/datatable-controller';

// Import test setup
import '../src/test/setup';
import { registerCustomElements } from '../src/test/test-helper';

// Ensure all custom elements are registered for testing
registerCustomElements();

describe('DataTable Basics', () => {
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

  it('AeDataTable class should be defined', () => {
    expect(AeDataTable).toBeDefined();
  });

  it('ColumnDef interface should work with valid data', () => {
    const column: ColumnDef<any> = { 
      id: 'test', 
      header: 'Test',
      field: 'test',
      sortable: true
    };
    expect(column.id).toBe('test');
    expect(column.header).toBe('Test');
    expect(column.sortable).toBe(true);
  });

  it('DataTableController should be properly initialized', () => {
    // Mock a ReactiveControllerHost
    const mockHost = {
      addController: vitest.fn(),
      removeController: vitest.fn(),
      requestUpdate: vitest.fn(),
      updateComplete: Promise.resolve(true)
    };
    
    const controller = new DataTableController(mockHost as any);
    controller.initialize(testData, columns);
    
    // Test controller methods
    expect(controller.getData()).toEqual(testData);
    expect(controller.getAllColumns()).toEqual(columns);
    expect(controller.getVisibleColumns().length).toBe(columns.length);
    
    // Test sorting
    controller.setSortState('name', 'asc');
    const sortState = controller.getSortState();
    expect(sortState.length).toBe(1);
    expect(sortState[0].id).toBe('name');
    
    // Test filtering
    controller.setGlobalFilter('John');
    const filteredData = controller.getProcessedData();
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].name).toBe('John Doe');
  });
});