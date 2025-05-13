import { LitElement, html, css } from 'lit';
import { property, state, query } from 'lit/decorators.js';

/**
 * Filter operator types
 */
export type FilterOperator = 'equals' | 'notEquals' | 'contains' | 'notContains' | 'startsWith' | 'endsWith' | 
  'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'between' | 'isNull' | 'isNotNull';

/**
 * Column filter values with optional operator
 */
export interface ColumnFilterValue {
  value: string;
  operator?: FilterOperator;
  valueTo?: string; // For "between" operator
}

/**
 * Column filter component
 * @element ae-datatable-column-filter
 */
export class AeDatatableColumnFilter extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 200px;
      background-color: white;
      border-radius: var(--ae-datatable-border-radius, 4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 8px;
      font-family: inherit;
      font-size: 14px;
      z-index: 100;
    }
    
    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .filter-title {
      font-size: 14px;
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      font-size: 16px;
      line-height: 1;
    }
    
    .filter-operator {
      width: 100%;
      margin-bottom: 8px;
      padding: 6px;
      border: 1px solid var(--ae-datatable-border-color, #e5e7eb);
      border-radius: 4px;
    }
    
    .filter-input {
      width: 100%;
      padding: 6px;
      border: 1px solid var(--ae-datatable-border-color, #e5e7eb);
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 8px;
    }
    
    .filter-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    
    .filter-button {
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }
    
    .apply-button {
      background-color: var(--ae-datatable-primary-color, #3b82f6);
      color: white;
    }
    
    .clear-button {
      background-color: transparent;
      border: 1px solid var(--ae-datatable-border-color, #e5e7eb);
    }
    
    .range-inputs {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .range-inputs .filter-input {
      margin-bottom: 0;
    }
  `;
  
  /**
   * Column ID
   */
  @property({ type: String })
  accessor columnId = '';
  
  /**
   * Column label
   */
  @property({ type: String })
  accessor columnLabel = '';
  
  /**
   * Current filter value
   */
  @property({ type: Object })
  accessor filterValue: ColumnFilterValue = {
    value: '',
    operator: 'contains'
  };
  
  /**
   * Column data type
   */
  @property({ type: String })
  accessor dataType: 'string' | 'number' | 'boolean' | 'date' = 'string';
  
  /**
   * Available operators based on type
   */
  @state()
  private operators: FilterOperator[] = [];
  
  /**
   * Input element reference
   */
  @query('.filter-input')
  private inputElement?: HTMLInputElement;
  
  /**
   * Secondary input for range operators
   */
  @query('.filter-input-to')
  private inputToElement?: HTMLInputElement;
  
  /**
   * Operator select element
   */
  @query('.filter-operator')
  private operatorElement?: HTMLSelectElement;
  
  connectedCallback() {
    super.connectedCallback();
    this.setOperatorsForType();
  }
  
  /**
   * Set available operators based on data type
   */
  private setOperatorsForType() {
    switch (this.dataType) {
      case 'string':
        this.operators = ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith', 'isNull', 'isNotNull'];
        break;
      case 'number':
        this.operators = ['equals', 'notEquals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'between', 'isNull', 'isNotNull'];
        break;
      case 'date':
        this.operators = ['equals', 'notEquals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'between', 'isNull', 'isNotNull'];
        break;
      case 'boolean':
        this.operators = ['equals', 'notEquals'];
        break;
      default:
        this.operators = ['equals', 'notEquals', 'contains', 'notContains'];
    }
    
    // If the current operator is not valid for this type, reset to the first one
    if (!this.operators.includes(this.filterValue.operator as FilterOperator)) {
      this.filterValue = {
        ...this.filterValue,
        operator: this.operators[0]
      };
    }
  }
  
  /**
   * Get operator label for display
   */
  private getOperatorLabel(operator: FilterOperator): string {
    switch (operator) {
      case 'equals': return 'Equals';
      case 'notEquals': return 'Not Equals';
      case 'contains': return 'Contains';
      case 'notContains': return 'Does Not Contain';
      case 'startsWith': return 'Starts With';
      case 'endsWith': return 'Ends With';
      case 'lessThan': return 'Less Than';
      case 'lessThanOrEqual': return 'Less Than or Equal';
      case 'greaterThan': return 'Greater Than';
      case 'greaterThanOrEqual': return 'Greater Than or Equal';
      case 'between': return 'Between';
      case 'isNull': return 'Is Empty';
      case 'isNotNull': return 'Is Not Empty';
      default: return 'Unknown';
    }
  }
  
  /**
   * Handle operator change
   */
  private handleOperatorChange() {
    if (!this.operatorElement) return;
    
    const newOperator = this.operatorElement.value as FilterOperator;
    this.filterValue = {
      ...this.filterValue,
      operator: newOperator
    };
    this.requestUpdate();
  }
  
  /**
   * Apply the filter
   */
  private applyFilter() {
    // Get values from inputs
    const value = this.inputElement?.value || '';
    const operator = this.operatorElement?.value as FilterOperator || 'contains';
    const valueTo = this.inputToElement?.value;
    
    // Create filter value
    const filterValue: ColumnFilterValue = {
      value,
      operator
    };
    
    // Add second value for between operator
    if (operator === 'between' && valueTo) {
      filterValue.valueTo = valueTo;
    }
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: {
        columnId: this.columnId,
        filter: filterValue
      },
      bubbles: true,
      composed: true
    }));
    
    // Close the filter panel
    this.dispatchEvent(new CustomEvent('filter-close', {
      bubbles: true,
      composed: true
    }));
  }
  
  /**
   * Clear the filter
   */
  private clearFilter() {
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: {
        columnId: this.columnId,
        filter: null
      },
      bubbles: true,
      composed: true
    }));
    
    // Close the filter panel
    this.dispatchEvent(new CustomEvent('filter-close', {
      bubbles: true,
      composed: true
    }));
  }
  
  /**
   * Close the filter panel
   */
  private closeFilter() {
    this.dispatchEvent(new CustomEvent('filter-close', {
      bubbles: true,
      composed: true
    }));
  }
  
  /**
   * Check if the current operator is a range operator
   */
  private isRangeOperator(): boolean {
    return this.filterValue.operator === 'between';
  }
  
  /**
   * Check if the current operator requires input
   */
  private requiresInput(): boolean {
    return !['isNull', 'isNotNull'].includes(this.filterValue.operator || '');
  }
  
  render() {
    return html`
      <div class="filter-header">
        <div class="filter-title">${this.columnLabel || this.columnId} Filter</div>
        <button class="close-button" @click=${this.closeFilter} aria-label="Close filter panel">×</button>
      </div>
      
      <select 
        class="filter-operator" 
        @change=${this.handleOperatorChange}
        aria-label="Filter operator"
      >
        ${this.operators.map(op => html`
          <option 
            value=${op} 
            ?selected=${op === this.filterValue.operator}
          >
            ${this.getOperatorLabel(op)}
          </option>
        `)}
      </select>
      
      ${this.requiresInput() ? html`
        ${this.isRangeOperator() ? html`
          <div class="range-inputs">
            <input 
              class="filter-input" 
              type=${this.dataType === 'date' ? 'date' : this.dataType === 'number' ? 'number' : 'text'}
              .value=${this.filterValue.value || ''}
              placeholder="From"
              aria-label="From value"
            />
            <input 
              class="filter-input filter-input-to" 
              type=${this.dataType === 'date' ? 'date' : this.dataType === 'number' ? 'number' : 'text'}
              .value=${this.filterValue.valueTo || ''}
              placeholder="To"
              aria-label="To value"
            />
          </div>
        ` : html`
          <input 
            class="filter-input" 
            type=${this.dataType === 'date' ? 'date' : this.dataType === 'number' ? 'number' : 'text'}
            .value=${this.filterValue.value || ''}
            placeholder="Filter value"
            aria-label="Filter value"
          />
        `}
      ` : ''}
      
      <div class="filter-buttons">
        <button class="filter-button clear-button" @click=${this.clearFilter}>Clear</button>
        <button class="filter-button apply-button" @click=${this.applyFilter}>Apply</button>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('ae-datatable-column-filter', AeDatatableColumnFilter);