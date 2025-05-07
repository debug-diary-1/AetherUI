import { css } from 'lit';

export const tabStyles = css`
  :host {
    display: block;
  }

  .tabs {
    display: flex;
    flex-direction: column;
  }

  .tabs[data-orientation="vertical"] {
    flex-direction: row;
  }

  .tablist {
    display: flex;
    gap: var(--ae-tabs-gap, 0.5rem);
    border-bottom: var(--ae-tabs-border, 1px solid #e5e7eb);
  }

  .tabs[data-orientation="vertical"] .tablist {
    flex-direction: column;
    border-bottom: none;
    border-right: var(--ae-tabs-border, 1px solid #e5e7eb);
  }

  ::slotted([role="tab"]) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--ae-tabs-padding, 0.75rem 1rem);
    color: var(--ae-tabs-color, #6b7280);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: var(--ae-tabs-radius, 4px 4px 0 0);
    font-size: var(--ae-tabs-font-size, inherit);
    font-weight: var(--ae-tabs-font-weight, 500);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tabs[data-orientation="vertical"] ::slotted([role="tab"]) {
    border-bottom: none;
    border-right: 2px solid transparent;
    border-radius: var(--ae-tabs-radius, 4px 0 0 4px);
  }

  ::slotted([role="tab"]:hover) {
    color: var(--ae-tabs-hover-color, #4b5563);
    background: var(--ae-tabs-hover-bg, #f3f4f6);
  }

  ::slotted([role="tab"][aria-selected="true"]) {
    color: var(--ae-tabs-active-color, #4f46e5);
    border-bottom-color: var(--ae-tabs-active-border-color, #4f46e5);
  }

  .tabs[data-orientation="vertical"] ::slotted([role="tab"][aria-selected="true"]) {
    border-bottom-color: transparent;
    border-right-color: var(--ae-tabs-active-border-color, #4f46e5);
  }

  ::slotted([role="tab"]:focus-visible) {
    outline: 2px solid var(--ae-tabs-focus-color, #4f46e5);
    outline-offset: -2px;
  }

  .panels {
    flex: 1;
    padding: var(--ae-tabs-panel-padding, 1rem);
  }

  ::slotted([role="tabpanel"]) {
    display: none;
  }

  ::slotted([role="tabpanel"]:not([hidden])) {
    display: block;
  }
`; 