import { css } from 'lit';

export const treeviewStyles = css`
  :host {
    display: block;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* Tree container */
  [role="tree"] {
    display: block;
    padding: 4px;
    outline: none;
  }

  /* Basic node container */
  .tree-node-container {
    display: block;
    width: 100%;
  }

  /* Node styling */
  .tree-node {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    border-radius: 4px;
    cursor: pointer;
    min-height: 30px;
    outline: none;
  }

  .tree-node:hover {
    background-color: var(--ae-treeview-hover-bg, rgba(0, 0, 0, 0.05));
  }

  .tree-node[aria-selected="true"] {
    background-color: var(--ae-treeview-selected-bg, rgba(79, 70, 229, 0.1));
    color: var(--ae-treeview-selected-color, #4f46e5);
  }

  .tree-node:focus-visible {
    outline: 2px solid var(--ae-treeview-focus-color, #4f46e5);
    outline-offset: -2px;
  }

  .tree-node[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Caret icon */
  .tree-caret {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    min-width: 18px;
    height: 18px;
    margin-right: 4px;
    transition: transform 150ms ease;
    color: var(--ae-treeview-caret-color, #6b7280);
  }

  .tree-caret[aria-expanded="true"] {
    transform: rotate(90deg);
  }

  .tree-caret-spacer {
    width: 18px;
    min-width: 18px;
    height: 18px;
    margin-right: 4px;
  }

  /* Icon styling */
  .tree-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    min-width: 18px;
    height: 18px;
    margin-right: 4px;
    color: var(--ae-treeview-icon-color, #6b7280);
  }

  /* Checkbox styling */
  .tree-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    min-width: 16px;
    height: 16px;
    margin-right: 6px;
    border: 2px solid var(--ae-treeview-checkbox-border-color, #d1d5db);
    border-radius: 3px;
    background-color: var(--ae-treeview-checkbox-bg, transparent);
  }

  .tree-checkbox[aria-checked="true"] {
    background-color: var(--ae-treeview-checkbox-checked-bg, #4f46e5);
    border-color: var(--ae-treeview-checkbox-checked-border-color, #4f46e5);
  }

  .tree-checkbox[aria-checked="true"]::after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: var(--ae-treeview-checkbox-checked-icon-color, white);
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  /* Label styling */
  .tree-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    font-size: var(--ae-treeview-font-size, 14px);
  }

  /* Children container (indentation) */
  .tree-children {
    display: block;
    padding-left: var(--ae-treeview-indent, 20px);
  }

  /* Empty state */
  .tree-empty {
    padding: 16px;
    text-align: center;
    color: var(--ae-treeview-empty-color, #6b7280);
    font-style: italic;
  }

  /* Loading state */
  .tree-loading {
    padding: 16px;
    text-align: center;
    color: var(--ae-treeview-loading-color, #6b7280);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .tree-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--ae-treeview-spinner-color, #4f46e5);
    border-right-color: transparent;
    border-radius: 50%;
    animation: tree-spin 1s linear infinite;
  }

  @keyframes tree-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`; 