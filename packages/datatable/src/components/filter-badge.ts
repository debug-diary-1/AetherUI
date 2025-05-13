import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ColumnFilterValue } from './column-filter';

/**
 * Filter badge component that displays active filter information
 * @element ae-datatable-filter-badge
 */
export class AeDatatableFilterBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      border-radius: 16px;
      background-color: var(--ae-datatable-badge-bg, rgba(59, 130, 246, 0.1));
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1;
      color: var(--ae-datatable-badge-text, #3b82f6);
      margin: 2px;
      max-width: 250px;
    }
    
    .badge {
      display: flex;
      align-items: center;
      gap: 4px;
      user-select: none;
    }
    
    .badge__column {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .badge__value {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .badge__remove {
      margin-left: 4px;
      cursor: pointer;
      border: none;
      background: none;
      padding: 2px;
      color: inherit;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 1;
    }
    
    .badge__remove:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `;
  
  /**
   * Column ID
   */
  @property({ type: String })
  accessor columnId = '';
  
  /**
   * Column display name
   */
  @property({ type: String })
  accessor columnName = '';
  
  /**
   * Filter value
   */
  @property({ type: Object })
  accessor filter?: ColumnFilterValue;
  
  /**
   * Handle remove button click
   */
  private handleRemove() {
    this.dispatchEvent(new CustomEvent('filter-remove', {
      detail: {
        columnId: this.columnId
      },
      bubbles: true,
      composed: true
    }));
  }
  
  /**
   * Format filter value for display
   */
  private getFilterDisplayValue(): string {
    if (!this.filter) return '';
    
    const operator = this.getOperatorSymbol(this.filter.operator);
    const value = this.filter.value;
    const valueTo = this.filter.valueTo;
    
    if (this.filter.operator === 'isNull') {
      return 'is empty';
    } else if (this.filter.operator === 'isNotNull') {
      return 'is not empty';
    } else if (this.filter.operator === 'between' && valueTo) {
      return `${operator} ${value} - ${valueTo}`;
    } else {
      return `${operator} ${value}`;
    }
  }
  
  /**
   * Get symbol for filter operator
   */
  private getOperatorSymbol(operator?: string): string {
    if (!operator) return '';
    
    switch (operator) {
      case 'equals': return '=';
      case 'notEquals': return '≠';
      case 'contains': return '∋';
      case 'notContains': return '∌';
      case 'startsWith': return '^';
      case 'endsWith': return '$';
      case 'lessThan': return '<';
      case 'lessThanOrEqual': return '≤';
      case 'greaterThan': return '>';
      case 'greaterThanOrEqual': return '≥';
      case 'between': return '';
      default: return '';
    }
  }
  
  render() {
    if (!this.filter || !this.filter.value) {
      return '';
    }
    
    const displayValue = this.getFilterDisplayValue();
    
    return html`
      <div class="badge">
        <span class="badge__column">${this.columnName || this.columnId}:</span>
        <span class="badge__value">${displayValue}</span>
        <button 
          class="badge__remove"
          @click=${this.handleRemove}
          title="Remove filter"
          aria-label="Remove filter for ${this.columnName || this.columnId}"
        >×</button>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('ae-datatable-filter-badge', AeDatatableFilterBadge);