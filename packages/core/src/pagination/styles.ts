import { css } from 'lit';

/**
 * Pagination component styles
 */
export const paginationStyles = css`
  :host {
    display: block;
  }

  .pagination-base {
    display: flex;
    justify-content: center;
  }

  .pagination-list {
    display: flex;
    align-items: center;
    gap: var(--ae-pagination-gap, 0.25rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pagination-item {
    display: inline-flex;
  }

  .pagination-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: var(--ae-pagination-border, 1px solid #d1d5db);
    background: var(--ae-pagination-bg);
    color: var(--ae-pagination-color);
    font-size: var(--ae-pagination-font-size, 0.875rem);
    font-weight: var(--ae-pagination-font-weight, 500);
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: var(--ae-pagination-border-radius, 0.375rem);
  }

  /* Sizes */
  :host([size="sm"]) .pagination-button {
    min-width: var(--ae-pagination-button-size-sm, 32px);
    height: var(--ae-pagination-button-size-sm, 32px);
    padding: var(--ae-pagination-padding-sm, 0.25rem 0.5rem);
    font-size: var(--ae-pagination-font-size-sm, 0.75rem);
  }

  :host([size="md"]) .pagination-button {
    min-width: var(--ae-pagination-button-size-md, 40px);
    height: var(--ae-pagination-button-size-md, 40px);
    padding: var(--ae-pagination-padding-md, 0.5rem 0.75rem);
    font-size: var(--ae-pagination-font-size-md, 0.875rem);
  }

  :host([size="lg"]) .pagination-button {
    min-width: var(--ae-pagination-button-size-lg, 48px);
    height: var(--ae-pagination-button-size-lg, 48px);
    padding: var(--ae-pagination-padding-lg, 0.625rem 1rem);
    font-size: var(--ae-pagination-font-size-lg, 1rem);
  }

  .pagination-button:hover:not(:disabled):not(.active) {
    background: var(--ae-pagination-bg-hover);
    border-color: var(--ae-pagination-border-hover);
  }

  .pagination-button:focus-visible {
    outline: 2px solid var(--ae-pagination-focus-ring);
    outline-offset: 0;
  }

  .pagination-button.active {
    background: var(--ae-pagination-bg-active);
    color: var(--ae-pagination-color-active);
    border-color: var(--ae-pagination-border-active);
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--ae-pagination-button-size-md, 40px);
    height: var(--ae-pagination-button-size-md, 40px);
    color: var(--ae-pagination-ellipsis-color);
    font-weight: 500;
  }

  :host([size="sm"]) .pagination-ellipsis {
    min-width: var(--ae-pagination-button-size-sm, 32px);
    height: var(--ae-pagination-button-size-sm, 32px);
  }

  :host([size="lg"]) .pagination-ellipsis {
    min-width: var(--ae-pagination-button-size-lg, 48px);
    height: var(--ae-pagination-button-size-lg, 48px);
  }
`;
