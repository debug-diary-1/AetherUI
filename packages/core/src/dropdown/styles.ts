import { css } from 'lit';

export const dropdownStyles = css`
  :host { 
    display: contents; 
  }

  /* Trigger styling */
  ::part(trigger) {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  ::part(trigger):disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Overlay styling */
  ::part(overlay) {
    background: var(--ae-dropdown-bg, #fff);
    color: var(--ae-dropdown-fg, #111);
    border-radius: var(--ae-dropdown-radius, 6px);
    box-shadow: var(--ae-dropdown-shadow, 0 4px 12px rgba(0,0,0,.1));
    padding: 0.25rem 0;
    z-index: 1000;
    min-width: 160px;
  }

  /* Menu styling */
  ::part(menu) {
    display: flex;
    flex-direction: column;
    gap: var(--ae-dropdown-gap, 0.25rem);
    outline: none;
    padding: 0;
    margin: 0;
    max-height: var(--ae-dropdown-max-height, 300px);
    overflow-y: auto;
  }

  /* Menu item styling */
  ::part(item) {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    color: inherit;
    font: inherit;
    width: 100%;
    justify-content: flex-start;
  }

  ::part(item):hover {
    background: var(--ae-dropdown-item-hover-bg, #f3f4f6);
  }

  ::part(item)[data-active] {
    background: var(--ae-dropdown-item-active-bg, #e5e7eb);
  }

  /* Separator styling */
  ::part(separator) {
    height: 1px;
    background-color: var(--ae-dropdown-separator-color, #e5e7eb);
    margin: 0.25rem 0;
    border: none;
  }

  /* Icon support for menu items */
  ::part(item-icon) {
    display: inline-flex;
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
  }

  /* Support for right-aligned text (like shortcut hints) */
  ::part(item-hint) {
    display: inline-block;
    margin-left: auto;
    font-size: 0.85em;
    opacity: 0.7;
  }
`; 