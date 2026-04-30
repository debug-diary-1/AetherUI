import { css } from 'lit';

export const dropdownStyles = css`
  :host {
    display: contents;
    position: relative;
  }

  /* Trigger styling */
  [part='trigger'] {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  [part='trigger']:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Overlay styling */
  [part='overlay'] {
    background: var(--ae-dropdown-bg);
    color: var(--ae-dropdown-fg);
    border-radius: var(--ae-dropdown-radius, 8px);
    box-shadow: var(
      --ae-dropdown-shadow,
      0 6px 16px var(--ae-dropdown-shadow-color, rgba(0, 0, 0, 0.3))
    );
    padding: 0;
    z-index: 9999;
    min-width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border: var(--ae-dropdown-border, none);
  }

  /* Header styling */
  [part='header'] {
    padding: 12px 16px;
    font-weight: 600;
    background: var(--ae-dropdown-header-bg, inherit);
    color: var(--ae-dropdown-header-fg, inherit);
    border-bottom: var(
      --ae-dropdown-header-border,
      1px solid var(--ae-dropdown-header-border-color, rgba(255, 255, 255, 0.1))
    );
    display: flex;
    align-items: center;
  }

  /* Menu styling */
  [part='menu'] {
    display: flex;
    flex-direction: column;
    outline: none;
    padding: 0;
    margin: 0;
    max-height: var(--ae-dropdown-max-height, 400px);
    overflow-y: auto;
  }

  /* Section styling */
  [part='section'] {
    border-bottom: var(
      --ae-dropdown-section-border,
      1px solid var(--ae-dropdown-section-border-color, rgba(255, 255, 255, 0.1))
    );
    padding: 8px 0;
  }

  [part='section']:last-child {
    border-bottom: none;
  }

  /* Menu item styling */
  [part='item'] {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    color: inherit;
    font: inherit;
    width: 100%;
    justify-content: space-between;
    font-size: var(--ae-dropdown-item-font-size, 0.9rem);
  }

  [part='item-content'] {
    display: flex;
    align-items: center;
    flex: 1;
  }

  [part='item']:hover {
    background: var(--ae-dropdown-item-hover-bg);
  }

  [part='item'][data-active] {
    background: var(--ae-dropdown-item-active-bg);
  }

  [part='item'][disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part='item'][disabled]:hover {
    background: transparent;
  }

  /* Separator styling */
  [part='separator'] {
    height: 1px;
    background-color: var(--ae-dropdown-separator-color);
    margin: 8px 0;
    border: none;
  }

  /* Icon support for menu items */
  [part='item-icon'] {
    display: inline-flex;
    margin-right: 12px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* Support for right-aligned text (like shortcut hints) */
  [part='item-hint'] {
    display: inline-flex;
    margin-left: 16px;
    font-size: 0.8em;
    opacity: 0.7;
    flex-shrink: 0;
    color: var(--ae-dropdown-hint-color);
    background: var(--ae-dropdown-hint-bg, transparent);
    padding: var(--ae-dropdown-hint-padding, 2px 4px);
    border-radius: var(--ae-dropdown-hint-radius, 3px);
  }

  /* Support for submenu indicators */
  [part='item-submenu-indicator'] {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
  }
`;
