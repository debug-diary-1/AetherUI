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
    --ae-datatable-cell-padding-dense: 0.375rem 0.75rem;
    --ae-datatable-row-height: 3rem;
    --ae-datatable-row-height-dense: 2.25rem;
    --ae-datatable-header-height: 3rem;
    --ae-datatable-header-height-dense: 2.5rem;
    --ae-datatable-border-radius: var(--ae-border-radius, 0.375rem);
    --ae-datatable-text-color: var(--ae-text-color, #111827);
    --ae-datatable-empty-text-color: var(--ae-text-color-secondary, #6b7280);
    --ae-datatable-header-text-color: var(--ae-text-color-emphasis, #000000);
    --ae-datatable-resize-handle-color: var(--ae-color-brand-600, #2563eb);
    --ae-datatable-row-alt-bg: var(--ae-surface-1-alt, rgba(0, 0, 0, 0.02));
    --ae-datatable-focus-ring: 0 0 0 2px var(--ae-color-focus, rgba(59, 130, 246, 0.5));
    --ae-datatable-pagination-button-radius: var(--ae-border-radius-sm, 0.25rem);
    --ae-datatable-badge-bg: var(--ae-color-brand-50, rgba(59, 130, 246, 0.1));
    --ae-datatable-badge-text: var(--ae-color-brand-600, #2563eb);
    --ae-datatable-selection-column-width: 56px;
  }

  /* Table container */
  .datatable__container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Table container for overflow handling */
  .datatable__table-container {
    overflow: auto;
    flex-grow: 1;
  }

  /* Core table styling */
  .datatable__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  /* Header styling */
  .datatable__header {
    background-color: var(--ae-datatable-header-bg);
    color: var(--ae-datatable-header-text-color);
    font-weight: 500;
    position: sticky;
    top: 0;
    z-index: 3;
  }

  /* Header row */
  .datatable__header-row {
    height: var(--ae-datatable-header-height);
  }

  /* Header cells */
  .datatable__header-cell {
    text-align: left;
    padding: var(--ae-datatable-cell-padding);
    border-bottom: 1px solid var(--ae-datatable-border-color);
    position: relative;
    font-weight: 500;
    background-color: var(--ae-datatable-header-bg);
    user-select: none;
    vertical-align: middle;
  }

  /* Sortable header cells */
  .datatable__header-cell--sortable {
    cursor: pointer;
  }

  /* Header cell alignment */
  .datatable__header-cell--align-center {
    text-align: center;
  }

  .datatable__header-cell--align-right {
    text-align: right;
  }

  /* Header content */
  .datatable__header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Sort icon */
  .datatable__sort-icon {
    font-size: 0.75em;
    transition: transform 0.2s;
  }

  .datatable__sort-icon--asc {
    transform: rotate(0deg);
  }

  .datatable__sort-icon--desc {
    transform: rotate(180deg);
  }

  /* Resize handle */
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

  /* Selection column */
  .datatable__selection-header,
  .datatable__selection-cell {
    width: var(--ae-datatable-selection-column-width, 56px);
    max-width: var(--ae-datatable-selection-column-width, 56px);
    min-width: var(--ae-datatable-selection-column-width, 56px);
    padding: 0;
    text-align: center;
    vertical-align: middle;
    position: sticky;
    left: 0;
    z-index: 2;
  }

  .datatable__selection-header {
    background-color: var(--ae-datatable-header-bg);
    z-index: 4;
  }

  /* Checkbox container */
  .datatable__selection-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  /* Table rows */
  .datatable__row {
    border-bottom: 1px solid var(--ae-datatable-border-color);
    height: var(--ae-datatable-row-height);
  }

  /* Row hover and selection */
  .datatable__row:hover {
    background-color: var(--ae-datatable-hover-bg);
  }

  .datatable__row--selected {
    background-color: var(--ae-datatable-selected-bg);
  }

  /* Cells */
  .datatable__cell {
    padding: var(--ae-datatable-cell-padding);
    border-bottom: 1px solid var(--ae-datatable-border-color);
    vertical-align: middle;
  }

  /* Cell alignment */
  .datatable__cell--align-center {
    text-align: center;
  }

  .datatable__cell--align-right {
    text-align: right;
  }

  /* Cell content */
  .datatable__cell-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  /* Striped rows */
  .datatable--striped .datatable__row:nth-child(even) {
    background-color: var(--ae-datatable-row-alt-bg);
  }

  /* Dense mode */
  .datatable--dense .datatable__header-cell,
  .datatable--dense .datatable__cell {
    padding: var(--ae-datatable-cell-padding-dense);
  }

  .datatable--dense .datatable__header-row {
    height: var(--ae-datatable-header-height-dense);
  }

  .datatable--dense .datatable__row {
    height: var(--ae-datatable-row-height-dense);
  }

  /* Bordered table */
  .datatable--bordered .datatable__header-cell,
  .datatable--bordered .datatable__cell {
    border-right: 1px solid var(--ae-datatable-border-color);
  }

  .datatable--bordered .datatable__header-cell:last-child,
  .datatable--bordered .datatable__cell:last-child {
    border-right: none;
  }

  /* Toolbar section */
  .datatable__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--ae-datatable-border-color);
    gap: 0.5rem;
  }

  .datatable__filter {
    position: relative;
    display: flex;
    align-items: center;
  }

  .datatable__filter-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
  }

  .datatable__clear-filters {
    padding: 0.25rem 0.5rem;
    background-color: transparent;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-pagination-button-radius);
    cursor: pointer;
    font-size: 12px;
    color: var(--ae-datatable-text-color);
  }

  .datatable__clear-filters:hover {
    background-color: var(--ae-datatable-hover-bg);
  }

  /* Empty state */
  .datatable__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    padding: 1rem;
    color: var(--ae-datatable-empty-text-color);
    width: 100%;
  }

  /* Footer and pagination */
  .datatable__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--ae-datatable-border-color);
  }

  .datatable__pagination {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .datatable__pagination-info {
    margin-right: 1rem;
  }

  .datatable__pagination-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .datatable__page-size-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .datatable__page-size-selector select {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-pagination-button-radius);
    background-color: white;
  }

  /* Button styles for pagination */
  .datatable__pagination button {
    padding: 0.375rem 0.75rem;
    background-color: white;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-pagination-button-radius);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .datatable__pagination button:hover:not(:disabled) {
    background-color: var(--ae-datatable-hover-bg);
  }

  .datatable__pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Alignment utilities */
  [align="center"] {
    text-align: center;
  }

  [align="right"] {
    text-align: right;
  }

  /* Focus utilities */
  .keyboard-focused {
    outline: var(--ae-datatable-focus-ring);
    z-index: 1;
    position: relative;
  }

  /* Focus styles for all focusable elements */
  ae-datatable-header:focus,
  ae-datatable-header-cell:focus,
  ae-datatable-cell:focus,
  .datatable:focus {
    outline: var(--ae-datatable-focus-ring);
  }

  /* Loading state */
  .datatable--loading {
    position: relative;
  }

  .datatable__loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .datatable__loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .datatable__loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--ae-datatable-border-color);
    border-top: 2px solid var(--ae-datatable-resize-handle-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .datatable__loading-text {
    font-weight: 500;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Virtualization support */
  .datatable__virtual-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .datatable__virtual-items {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
    display: table !important;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  /* Main datatable container */
  .datatable {
    display: block;
    width: 100%;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-border-radius);
    overflow: hidden;
    box-sizing: border-box;
  }
`;

export const headerCellStyles = css`
  :host {
    position: relative;
    display: table-cell;
    vertical-align: middle;
    padding: var(--ae-datatable-cell-padding, 0.75rem 1rem);
    background-color: var(--ae-datatable-header-bg, #f9fafb);
    font-weight: 500;
    border-bottom: 1px solid var(--ae-datatable-border-color, #e5e7eb);
    user-select: none;
    box-sizing: border-box;
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

  :host([align="center"]) {
    text-align: center;
  }

  :host([align="right"]) {
    text-align: right;
  }
`;

export const rowStyles = css`
  :host {
    display: table-row;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--ae-datatable-hover-bg, #f3f4f6);
  }

  :host([selected]) {
    background-color: var(--ae-datatable-selected-bg, rgba(94, 124, 226, 0.1));
  }
`;

export const cellStyles = css`
  :host {
    display: table-cell;
    padding: var(--ae-datatable-cell-padding, 0.75rem 1rem);
    border-bottom: 1px solid var(--ae-datatable-border-color, #e5e7eb);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    position: relative;
    box-sizing: border-box;
  }

  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  :host([align="center"]) {
    text-align: center;
  }

  :host([align="right"]) {
    text-align: right;
  }
`;