import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { paginationStyles } from './styles';

/**
 * A pagination component for navigating through pages of content.
 *
 * @element ae-pagination
 *
 * @property {number} currentPage - The current active page (1-indexed)
 * @property {number} totalPages - The total number of pages
 * @property {number} siblingCount - Number of page buttons to show on each side of current page
 * @property {boolean} showFirstLast - Whether to show first/last page buttons
 * @property {boolean} showPrevNext - Whether to show previous/next buttons
 * @property {string} size - The size of the pagination (sm, md, lg)
 *
 * @fires {CustomEvent<{page: number}>} ae-page-change - Fired when page changes
 *
 * @csspart base - The component's base wrapper
 * @csspart list - The pagination list element
 * @csspart item - Each pagination item
 * @csspart button - Each pagination button
 * @csspart ellipsis - The ellipsis element
 *
 * @example
 * ```html
 * <ae-pagination current-page="5" total-pages="10"></ae-pagination>
 * <ae-pagination current-page="1" total-pages="20" show-first-last></ae-pagination>
 * ```
 */
@customElement('ae-pagination')
export class AePagination extends LitElement {
  static styles = paginationStyles;

  @property({ type: Number, attribute: 'current-page' })
  accessor currentPage = 1;

  @property({ type: Number, attribute: 'total-pages' })
  accessor totalPages = 1;

  @property({ type: Number, attribute: 'sibling-count' })
  accessor siblingCount = 1;

  @property({ type: Boolean, attribute: 'show-first-last' })
  accessor showFirstLast = false;

  @property({ type: Boolean, attribute: 'show-prev-next' })
  accessor showPrevNext = true;

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  @state()
  private accessor pages: (number | 'ellipsis')[] = [];

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('currentPage') || changedProperties.has('totalPages') ||
        changedProperties.has('siblingCount')) {
      this.pages = this.generatePages();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.pages = this.generatePages();
  }

  private generatePages(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis')[] = [];
    const totalNumbers = this.siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // + 2 ellipsis

    if (this.totalPages <= totalBlocks) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
      const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);

      const showLeftEllipsis = leftSiblingIndex > 2;
      const showRightEllipsis = rightSiblingIndex < this.totalPages - 1;

      if (!showLeftEllipsis && showRightEllipsis) {
        const leftItemCount = 3 + 2 * this.siblingCount;
        for (let i = 1; i <= leftItemCount; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(this.totalPages);
      } else if (showLeftEllipsis && !showRightEllipsis) {
        pages.push(1);
        pages.push('ellipsis');
        const rightItemCount = 3 + 2 * this.siblingCount;
        for (let i = this.totalPages - rightItemCount + 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  private handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.dispatchEvent(new CustomEvent('ae-page-change', {
      detail: { page },
      bubbles: true,
      composed: true,
    }));
  }

  private handlePrevious() {
    this.handlePageChange(this.currentPage - 1);
  }

  private handleNext() {
    this.handlePageChange(this.currentPage + 1);
  }

  private handleFirst() {
    this.handlePageChange(1);
  }

  private handleLast() {
    this.handlePageChange(this.totalPages);
  }

  render() {
    const isFirstPage = this.currentPage === 1;
    const isLastPage = this.currentPage === this.totalPages;

    return html`
      <nav part="base" class="pagination-base" role="navigation" aria-label="Pagination">
        <ul part="list" class="pagination-list">
          ${this.showFirstLast ? html`
            <li part="item" class="pagination-item">
              <button
                part="button"
                class="pagination-button"
                ?disabled="${isFirstPage}"
                @click="${this.handleFirst}"
                aria-label="First page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11 12L7 8L11 4M5 12V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </li>
          ` : ''}

          ${this.showPrevNext ? html`
            <li part="item" class="pagination-item">
              <button
                part="button"
                class="pagination-button"
                ?disabled="${isFirstPage}"
                @click="${this.handlePrevious}"
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </li>
          ` : ''}

          ${this.pages.map((page) =>
            page === 'ellipsis'
              ? html`
                  <li part="item" class="pagination-item">
                    <span part="ellipsis" class="pagination-ellipsis">...</span>
                  </li>
                `
              : html`
                  <li part="item" class="pagination-item">
                    <button
                      part="button"
                      class="pagination-button ${page === this.currentPage ? 'active' : ''}"
                      ?aria-current="${page === this.currentPage}"
                      @click="${() => this.handlePageChange(page)}"
                      aria-label="Page ${page}"
                    >
                      ${page}
                    </button>
                  </li>
                `
          )}

          ${this.showPrevNext ? html`
            <li part="item" class="pagination-item">
              <button
                part="button"
                class="pagination-button"
                ?disabled="${isLastPage}"
                @click="${this.handleNext}"
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </li>
          ` : ''}

          ${this.showFirstLast ? html`
            <li part="item" class="pagination-item">
              <button
                part="button"
                class="pagination-button"
                ?disabled="${isLastPage}"
                @click="${this.handleLast}"
                aria-label="Last page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 4L9 8L5 12M11 4V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </li>
          ` : ''}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-pagination': AePagination;
  }
}
