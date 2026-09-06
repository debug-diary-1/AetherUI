import { LitElement, html, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { DATATABLE_HEADER_ELEMENT_NAME } from './constants';
import { headerCellStyles } from './styles';
import type { SortDirection } from './models/sort-model';

/**
 * Header cell component for the datatable
 * Sort with Enter or Space on the header button. Resize with Left/Right
 * (10 pixels, or 50 with Shift); Home resets to the 50-pixel minimum.
 * Exposes columnheader/aria-sort and a labelled vertical resize separator.
 * Resize values track layout in pixels, with a 50–10000 pixel interaction range.
 * Header and resize names track slotted text changes; author ARIA overrides are preserved.
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
  sortable = true;

  /**
   * Current sort direction
   */
  @property({ type: String, reflect: true })
  direction: SortDirection = 'none';

  /**
   * Whether the column is resizable
   */
  @property({ type: Boolean, reflect: true })
  resizable = true;

  /**
   * Text alignment
   */
  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' = 'left';

  /**
   * Track resize state
   */
  private isResizing = false;
  private startX = 0;
  private startWidth = 0;
  @state()
  private currentWidth = 50;
  @state()
  private contentLabel = 'Column';
  private automaticLabel: string | null = null;
  private textObserver = new MutationObserver(() => this.updateLabel());
  private sizeObserver = new ResizeObserver((entries) => {
    const width = entries[0]?.borderBoxSize[0]?.inlineSize;
    if (width && Math.round(width) !== this.currentWidth) this.currentWidth = Math.round(width);
  });
  private automaticSort: string | null = null;

  private updateLabel() {
    const named = [...this.children].filter((child) => child.getAttribute('slot') === 'content');
    const nodes = named.length
      ? named
      : [...this.childNodes].filter(
          (node) =>
            node.nodeType === Node.TEXT_NODE ||
            (node instanceof Element && !node.hasAttribute('slot')),
        );
    this.contentLabel =
      nodes
        .map((node) => node.textContent)
        .join('')
        .trim() ||
      this.id ||
      'Column';
    const existing = this.getAttribute('aria-label');
    if (existing === null || existing === this.automaticLabel) {
      this.automaticLabel = this.contentLabel;
      this.setAttribute('aria-label', this.contentLabel);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'columnheader');
    this.updateLabel();
    this.textObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['slot', 'id'],
    });
    this.sizeObserver.observe(this);
  }

  updated(changed: PropertyValues) {
    if (!changed.has('direction') && !changed.has('sortable')) return;
    const existing = this.getAttribute('aria-sort');
    if (existing !== null && existing !== this.automaticSort) return;
    this.automaticSort = this.sortable
      ? this.direction === 'asc'
        ? 'ascending'
        : this.direction === 'desc'
          ? 'descending'
          : 'none'
      : null;
    if (this.automaticSort === null) this.removeAttribute('aria-sort');
    else this.setAttribute('aria-sort', this.automaticSort);
  }

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
    this.dispatchEvent(
      new CustomEvent('ae-datatable-header-sort', {
        detail: {
          direction: newDirection,
          multiSort: e.ctrlKey || e.metaKey, // Allow multi-sort with Ctrl/Cmd key
        },
        bubbles: true,
        composed: true,
      }),
    );
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
    this.currentWidth = Math.min(10000, Math.max(50, this.startWidth + diff)); // Minimum width of 50px

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

    this.dispatchResize();
  };

  private handleResizeKeydown(event: KeyboardEvent) {
    if (!this.resizable || !['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const width = Math.round(this.getBoundingClientRect().width);
    const step = event.shiftKey ? 50 : 10;
    this.currentWidth =
      event.key === 'Home'
        ? 50
        : Math.min(10000, Math.max(50, width + (event.key === 'ArrowRight' ? step : -step)));
    this.style.width = `${this.currentWidth}px`;
    this.dispatchResize();
  }

  private dispatchResize() {
    this.dispatchEvent(
      new CustomEvent('ae-datatable-header-resize', {
        detail: {
          width: this.currentWidth,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Render sort icon based on current direction
   */
  private renderSortIcon() {
    if (!this.sortable || this.direction === 'none') {
      return '';
    }

    const iconClass = `header-cell__sort-icon header-cell__sort-icon--${this.direction}`;

    return html` <div class=${iconClass} part="sort-icon" aria-hidden="true">▲</div> `;
  }

  /**
   * Clean up event listeners when disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.textObserver.disconnect();
    this.sizeObserver.disconnect();
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
  }

  render() {
    const label = this.contentLabel;
    const content = html`
      <slot name="content" @slotchange=${this.updateLabel}
        ><slot @slotchange=${this.updateLabel}></slot
      ></slot>
      ${this.renderSortIcon()}
    `;
    return html`
      ${this.sortable
        ? html`<button
            type="button"
            class="header-cell__content"
            part="content"
            @click=${this.handleSortClick}
          >
            ${content}
          </button>`
        : html`<div class="header-cell__content" part="content">${content}</div>`}
      ${this.resizable
        ? html`
            <div
              class="header-cell__resize-handle"
              part="resize-handle"
              role="separator"
              tabindex="0"
              aria-label=${`Resize ${label} column`}
              aria-orientation="vertical"
              aria-valuemin="50"
              aria-valuemax=${String(Math.max(10000, this.currentWidth))}
              aria-valuenow=${String(this.currentWidth)}
              aria-valuetext=${`${this.currentWidth} pixels`}
              @keydown=${this.handleResizeKeydown}
              @mousedown=${this.handleResizeStart}
            ></div>
          `
        : ''}
    `;
  }
}

if (!customElements.get(DATATABLE_HEADER_ELEMENT_NAME)) {
  customElements.define(DATATABLE_HEADER_ELEMENT_NAME, AeDatatableHeader);
}
