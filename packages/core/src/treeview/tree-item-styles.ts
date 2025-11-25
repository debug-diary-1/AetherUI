import { css } from 'lit';

export const treeItemStyles = css`
  :host {
    display: block;
    user-select: none;
    --indent-size: 1.5rem;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tree-item-base {
    position: relative;
  }

  .tree-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    padding-right: 0.75rem;
    cursor: pointer;
    position: relative;
    transition: background-color 0.15s ease-in-out;
    font-size: var(--ae-treeview-font-size, 0.875rem);
    line-height: var(--ae-treeview-line-height, 1.5);
  }

  .tree-item:hover:not(.disabled) {
    background-color: var(--ae-treeview-row-hover-bg, #f3f4f6);
  }

  .tree-item.selected {
    background-color: var(--ae-treeview-row-selected-bg, #e0e7ff);
    color: var(--ae-treeview-row-selected-fg, #3730a3);
  }

  .tree-item.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  .expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--ae-treeview-caret-color, #9ca3af);
    transition: transform 0.2s ease-in-out, color 0.15s ease-in-out;
    flex-shrink: 0;
  }

  .expand-button:hover {
    color: var(--ae-treeview-caret-open, #4b5563);
  }

  .expand-button.expanded {
    transform: rotate(90deg);
    color: var(--ae-treeview-caret-open, #4b5563);
  }

  .expand-button svg {
    width: var(--ae-treeview-caret-size, 14px);
    height: var(--ae-treeview-caret-size, 14px);
  }

  .expand-spacer {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .children {
    display: none;
  }

  .children.expanded {
    display: block;
  }

  /* Focus styles */
  .tree-item:focus-visible {
    outline: 2px solid var(--ae-treeview-focus-color, #4f46e5);
    outline-offset: -2px;
  }
`;
