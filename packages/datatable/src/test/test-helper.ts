// Register custom elements for testing
import { AeDataTable } from '../ae-datatable';
import { AeDatatableHeader } from '../ae-datatable-header';
import { AeDatatableRow } from '../ae-datatable-row';
import { AeDatatableCell } from '../ae-datatable-cell';

// Import the constants from index.ts to ensure consistent naming
import { 
  DATATABLE_ELEMENT_NAME,
  DATATABLE_HEADER_ELEMENT_NAME,
  DATATABLE_ROW_ELEMENT_NAME,
  DATATABLE_CELL_ELEMENT_NAME 
} from '../index';

// Function to register all custom elements
export function registerCustomElements() {
  try {
    // Try to undefine first in case they are already defined
    // (this would throw in a real browser but works in some test environments)
    try {
      customElements.define(DATATABLE_ELEMENT_NAME, AeDataTable);
    } catch (e) {
      // Already defined, which is fine
    }
    
    try {
      customElements.define(DATATABLE_HEADER_ELEMENT_NAME, AeDatatableHeader);
    } catch (e) {
      // Already defined, which is fine
    }
    
    try {
      customElements.define(DATATABLE_ROW_ELEMENT_NAME, AeDatatableRow);
    } catch (e) {
      // Already defined, which is fine
    }
    
    try {
      customElements.define(DATATABLE_CELL_ELEMENT_NAME, AeDatatableCell);
    } catch (e) {
      // Already defined, which is fine
    }
    
    return true;
  } catch (e) {
    console.error('Error registering custom elements:', e);
    return false;
  }
}