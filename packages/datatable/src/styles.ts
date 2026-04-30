import { css } from 'lit';

/**
 * DataTable component styles
 */
export const datatableStyles = css`
  :host {
    display: block;
    overflow: auto;
    --ae-datatable-border-color: var(--ae-border-color, #e5e7eb);
    --ae-datatable-header-bg: var(--ae-surface-2, #f9fafb);
    --ae-datatable-hover-bg: var(--ae-surface-1-hover, #f3f4f6);
    --ae-datatable-selected-bg: var(--ae-selected-bg, rgba(94, 124, 226, 0.1));
    --ae-datatable-cell-padding: 0.75rem 1rem;
    --ae-datatable-row-height: 3rem;
    --ae-datatable-header-height: 3rem;
    --ae-datatable-border-radius: var(--ae-border-radius, 0.375rem);
    --ae-datatable-text-color: var(--ae-text-color, #111827);
    --ae-datatable-empty-text-color: var(--ae-text-color-secondary, #6b7280);
    --ae-datatable-header-text-color: var(--ae-text-color-emphasis, #000000);
    --ae-datatable-resize-handle-color: var(--ae-color-brand-600, #2563eb);
  }

  .datatable {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    height: 100%;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-border-radius);
    overflow: hidden;
  }

  .datatable__header {
    display: grid;
    background-color: var(--ae-datatable-header-bg);
    color: var(--ae-datatable-header-text-color);
    font-weight: 500;
    border-bottom: 1px solid var(--ae-datatable-border-color);
    height: var(--ae-datatable-header-height);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .datatable__body {
    display: grid;
    overflow-y: auto;
    color: var(--ae-datatable-text-color);
  }

  .datatable__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--ae-datatable-border-color);
  }

  .datatable__row {
    display: contents;
  }

  .datatable__row:hover .datatable__cell {
    background-color: var(--ae-datatable-hover-bg);
  }

  .datatable__row--selected .datatable__cell {
    background-color: var(--ae-datatable-selected-bg);
  }

  .datatable__cell,
  .datatable__header-cell {
    padding: var(--ae-datatable-cell-padding);
    border-bottom: 1px solid var(--ae-datatable-border-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  .datatable__header-cell {
    position: relative;
    user-select: none;
  }

  .datatable__header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .datatable__sort-icon {
    width: 1em;
    height: 1em;
    transition: transform 0.2s;
  }

  .datatable__sort-icon--asc {
    transform: rotate(0deg);
  }

  .datatable__sort-icon--desc {
    transform: rotate(180deg);
  }

  .datatable__resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 4px;
    cursor: col-resize;
    z-index: 1;
  }

  .datatable__resize-handle:hover,
  .datatable__resize-handle--active {
    background-color: var(--ae-datatable-resize-handle-color);
  }

  .datatable__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    grid-column: 1 / -1;
    color: var(--ae-datatable-empty-text-color);
  }

  .datatable__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--ae-datatable-border-color);
  }

  .datatable__filter {
    position: relative;
    display: flex;
    align-items: center;
  }

  .datatable__pagination {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .datatable__pagination-info {
    margin-right: 1rem;
  }
`;

export const headerCellStyles = css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--ae-datatable-cell-padding, 0.75rem 1rem);
    background-color: var(--ae-datatable-header-bg, #f9fafb);
    font-weight: 500;
    border-bottom: 1px solid var(--ae-datatable-border-color, #e5e7eb);
    user-select: none;
  }

  .header-cell__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .header-cell__sort-icon {
    width: 1em;
    height: 1em;
    transition: transform 0.2s;
  }

  .header-cell__sort-icon--asc {
    transform: rotate(0deg);
  }

  .header-cell__sort-icon--desc {
    transform: rotate(180deg);
  }

  .header-cell__resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 4px;
    cursor: col-resize;
    z-index: 1;
  }

  .header-cell__resize-handle:hover,
  .header-cell__resize-handle--active {
    background-color: var(--ae-datatable-resize-handle-color, #2563eb);
  }

  :host([sortable]) {
    cursor: pointer;
  }

  :host([align='center']) {
    justify-content: center;
    text-align: center;
  }

  :host([align='right']) {
    justify-content: flex-end;
    text-align: right;
  }
`;

export const rowStyles = css`
  :host {
    display: contents;
  }

  :host(:hover) ::slotted(ae-datatable-cell) {
    background-color: var(--ae-datatable-hover-bg, #f3f4f6);
  }

  :host([selected]) ::slotted(ae-datatable-cell) {
    background-color: var(--ae-datatable-selected-bg, rgba(94, 124, 226, 0.1));
  }
`;

export const cellStyles = css`
  :host {
    display: flex;
    align-items: center;
    padding: var(--ae-datatable-cell-padding, 0.75rem 1rem);
    border-bottom: 1px solid var(--ae-datatable-border-color, #e5e7eb);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :host([align='center']) {
    justify-content: center;
    text-align: center;
  }

  :host([align='right']) {
    justify-content: flex-end;
    text-align: right;
  }
`;
