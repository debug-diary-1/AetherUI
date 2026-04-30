export * from './ae-datatable';
export * from './ae-datatable-header';
export * from './ae-datatable-row';
export * from './ae-datatable-cell';
export * from './models/column-model';
export * from './models/sort-model';
export * from './models/filter-model';
export * from './models/pagination-model';
export * from './utils/sort-utils';
export * from './utils/filter-utils';
export * from './utils/common-utils';
export * from './controllers/datatable-controller';

// Export constants
export * from './constants';

// Import components for registration
import { AeDataTable } from './ae-datatable';
import { AeDatatableHeader } from './ae-datatable-header';
import { AeDatatableRow } from './ae-datatable-row';
import { AeDatatableCell } from './ae-datatable-cell';

// Import constants directly to avoid circular dependency
import {
  DATATABLE_ELEMENT_NAME,
  DATATABLE_HEADER_ELEMENT_NAME,
  DATATABLE_ROW_ELEMENT_NAME,
  DATATABLE_CELL_ELEMENT_NAME,
} from './constants';

// Register components to ensure they're available
// This is important for ensuring the components are available when the module is imported
try {
  if (!customElements.get(DATATABLE_ELEMENT_NAME)) {
    customElements.define(DATATABLE_ELEMENT_NAME, AeDataTable);
  }

  if (!customElements.get(DATATABLE_HEADER_ELEMENT_NAME)) {
    customElements.define(DATATABLE_HEADER_ELEMENT_NAME, AeDatatableHeader);
  }

  if (!customElements.get(DATATABLE_ROW_ELEMENT_NAME)) {
    customElements.define(DATATABLE_ROW_ELEMENT_NAME, AeDatatableRow);
  }

  if (!customElements.get(DATATABLE_CELL_ELEMENT_NAME)) {
    customElements.define(DATATABLE_CELL_ELEMENT_NAME, AeDatatableCell);
  }
} catch (error) {
  console.warn('Error registering datatable components:', error);
}

// Export function to explicitly define elements for users who need manual control
export function defineDataTableElements() {
  try {
    // Using imported constants to avoid circular dependencies
    if (!customElements.get(DATATABLE_ELEMENT_NAME)) {
      customElements.define(DATATABLE_ELEMENT_NAME, AeDataTable);
    }

    if (!customElements.get(DATATABLE_HEADER_ELEMENT_NAME)) {
      customElements.define(DATATABLE_HEADER_ELEMENT_NAME, AeDatatableHeader);
    }

    if (!customElements.get(DATATABLE_ROW_ELEMENT_NAME)) {
      customElements.define(DATATABLE_ROW_ELEMENT_NAME, AeDatatableRow);
    }

    if (!customElements.get(DATATABLE_CELL_ELEMENT_NAME)) {
      customElements.define(DATATABLE_CELL_ELEMENT_NAME, AeDatatableCell);
    }

    return true;
  } catch (error) {
    console.warn('Error defining datatable elements:', error);
    return false;
  }
}
