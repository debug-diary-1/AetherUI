import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { DATATABLE_HEADER_ELEMENT_NAME } from './index';
import { headerCellStyles } from './styles';
import type { SortDirection } from './models/sort-model';
import './components/column-filter';
import type { ColumnFilterValue } from './components/column-filter';

/**
 * Header cell component for the datatable
 * @element ae-datatable-header
 * 
 * @property {boolean} sortable - Whether the column is sortable
 * @property {SortDirection} direction - Current sort direction ('asc', 'desc', 'none')
 * @property {boolean} resizable - Whether the column is resizable
 * @property {string} align - Text alignment ('left', 'center', 'right')
 * 
 * @fires {CustomEvent} ae-datatable-header-sort - Fired when sort is changed
 * @fires {CustomEvent} ae-datatable-header-resize - Fired when column is resized
 * 
 * @slot - Default content for the header cell
 * @slot content - Named slot for header content
 * 
 * @csspart content - The header cell content
 * @csspart sort-icon - The sort indicator icon
 * @csspart resize-handle - The resize handle
 */
export class AeDatatableHeader extends LitElement {
  static styles = headerCellStyles;

  /**
   * Whether the column is sortable
   */
  @property({ type: Boolean, reflect: true })
  accessor sortable = true;

  /**
   * Current sort direction
   */
  @property({ type: String, reflect: true })
  accessor direction: SortDirection = 'none';

  /**
   * Whether the column is resizable
   */
  @property({ type: Boolean, reflect: true })
  accessor resizable = true;

  /**
   * Text alignment
   */
  @property({ type: String, reflect: true })
  accessor align: 'left' | 'center' | 'right' = 'left';

  /**
   * Whether the column is filterable
   */
  @property({ type: Boolean, reflect: true })
  accessor filterable = true;

  /**
   * Current filter value
   */
  @property({ type: Object })
  accessor filter: ColumnFilterValue | null = null;

  /**
   * Column data type
   */
  @property({ type: String })
  accessor dataType: 'string' | 'number' | 'boolean' | 'date' = 'string';

  /**
   * Column index for positioning (1-based, set via attribute)
   * This is handled through HTML attribute data-col-index
   */
  @property({ type: String, reflect: true, attribute: 'data-col-index' })
  accessor dataColIndex: string = '0';

  /**
   * Filter panel state
   */
  @state()
  private filterPanelOpen = false;

  /**
   * Track resize state
   */
  private isResizing = false;
  private startX = 0;
  private startWidth = 0;
  private currentWidth = 0;

  /**
   * Handle click to toggle sort
   */
  private handleSortClick(e: MouseEvent) {
    if (!this.sortable) return;

    // Don't trigger sort if clicking on resize handle
    if (this.isResizing) {
      e.stopPropagation();
      return;
    }

    // Cycle through sort directions: none -> asc -> desc -> none
    let newDirection: SortDirection = 'asc';
    if (this.direction === 'asc') {
      newDirection = 'desc';
    } else if (this.direction === 'desc') {
      newDirection = 'none';
    }

    // Dispatch sort event
    this.dispatchEvent(new CustomEvent('ae-datatable-header-sort', {
      detail: {
        direction: newDirection,
        multiSort: e.ctrlKey || e.metaKey // Allow multi-sort with Ctrl/Cmd key
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Initialize column resize
   */
  private handleResizeStart(e: MouseEvent) {
    if (!this.resizable) return;

    // Prevent click event from being triggered
    e.stopPropagation();
    e.preventDefault();

    this.isResizing = true;
    this.startX = e.clientX;
    this.startWidth = this.clientWidth;
    this.currentWidth = this.startWidth;

    // Add event listeners for drag and end events
    document.addEventListener('mousemove', this.handleResizeMove);
    document.addEventListener('mouseup', this.handleResizeEnd);

    // Add active class to resize handle
    const handle = this.shadowRoot?.querySelector('.header-cell__resize-handle') as HTMLElement;
    if (handle) {
      handle.classList.add('header-cell__resize-handle--active');
    }
  }

  /**
   * Handle resize movement
   */
  private handleResizeMove = (e: MouseEvent) => {
    if (!this.isResizing) return;

    // Calculate new width based on mouse movement
    const diff = e.clientX - this.startX;
    this.currentWidth = Math.max(50, this.startWidth + diff); // Minimum width of 50px

    // Update current width during resize for visual feedback
    this.style.width = `${this.currentWidth}px`;
  };

  /**
   * End column resize
   */
  private handleResizeEnd = () => {
    if (!this.isResizing) return;

    this.isResizing = false;

    // Remove event listeners
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);

    // Remove active class from resize handle
    const handle = this.shadowRoot?.querySelector('.header-cell__resize-handle') as HTMLElement;
    if (handle) {
      handle.classList.remove('header-cell__resize-handle--active');
    }

    // Dispatch resize event with final width
    this.dispatchEvent(new CustomEvent('ae-datatable-header-resize', {
      detail: {
        width: this.currentWidth
      },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Render sort icon based on current direction
   */
  private renderSortIcon() {
    if (!this.sortable || this.direction === 'none') {
      return '';
    }

    const iconClass = `header-cell__sort-icon header-cell__sort-icon--${this.direction}`;

    return html`
      <div class=${iconClass} part="sort-icon">
        ▲
      </div>
    `;
  }

  /**
   * Handle filter button click
   */
  private handleFilterClick(e: Event) {
    e.stopPropagation(); // Don't trigger sort
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  /**
   * Handle filter change
   */
  private handleFilterChange(e: CustomEvent) {
    const { columnId, filter } = e.detail;

    // Dispatch filter event
    this.dispatchEvent(new CustomEvent('ae-datatable-header-filter', {
      detail: {
        columnId: this.id,
        filter
      },
      bubbles: true,
      composed: true
    }));

    // Update internal state
    this.filter = filter;
    this.filterPanelOpen = false;
  }

  /**
   * Close filter panel
   */
  private handleFilterClose() {
    this.filterPanelOpen = false;
  }

  /**
   * Render filter button and panel
   */
  private renderFilter() {
    if (!this.filterable) {
      return '';
    }

    // Determine if there's an active filter
    const hasActiveFilter = !!this.filter && this.filter.value !== '';

    // Class for the filter icon based on active status
    const filterIconClass = hasActiveFilter
      ? 'header-cell__filter-icon header-cell__filter-icon--active'
      : 'header-cell__filter-icon';

    // Get operator label for the tooltip
    const operatorLabel = hasActiveFilter ? this.getOperatorLabel(this.filter.operator) : '';

    // Build the tooltip text that shows the active filter
    const tooltipText = hasActiveFilter
      ? `Filter: ${operatorLabel} "${this.filter.value}${this.filter.valueTo ? ' to ' + this.filter.valueTo : ''}"`
      : 'Filter';

    return html`
      <div class="header-cell__filter" @click=${this.handleFilterClick}>
        <div class=${filterIconClass} part="filter-icon" title=${tooltipText}>
          ${hasActiveFilter ? '🔍' : '◇'}
        </div>

        ${this.filterPanelOpen ? html`
          <div class="header-cell__filter-panel">
            <ae-datatable-column-filter
              .columnId=${this.id}
              .columnLabel=${this.textContent?.trim() || this.id}
              .filterValue=${this.filter || { value: '', operator: 'contains' }}
              .dataType=${this.dataType}
              @filter-change=${this.handleFilterChange}
              @filter-close=${this.handleFilterClose}
            ></ae-datatable-column-filter>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Get operator label for tooltip display
   */
  private getOperatorLabel(operator?: string): string {
    if (!operator) return '';

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
      default: return operator;
    }
  }

  /**
   * Clean up event listeners when disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
  }

  render() {
    return html`
      <div
        class="header-cell__content"
        part="content"
        @click=${this.handleSortClick}
      >
        <slot name="content"><slot></slot></slot>
        ${this.renderSortIcon()}
        ${this.renderFilter()}
      </div>

      ${this.resizable ? html`
        <div
          class="header-cell__resize-handle"
          part="resize-handle"
          @mousedown=${this.handleResizeStart}
        ></div>
      ` : ''}
    `;
  }
}

customElements.define(DATATABLE_HEADER_ELEMENT_NAME, AeDatatableHeader);