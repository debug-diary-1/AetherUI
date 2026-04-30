import { css } from 'lit';

/**
 * Menu item component styles
 */
export const menuItemStyles = css`
  :host {
    display: block;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--ae-menu-item-gap, 0.75rem);
    padding: var(--ae-menu-item-padding, 0.5rem 0.75rem);
    border-radius: var(--ae-menu-item-border-radius, 0.375rem);
    font-size: var(--ae-menu-item-font-size, 0.875rem);
    color: var(--ae-menu-item-color);
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    outline: none;
  }

  .menu-item:hover:not([aria-disabled='true']) {
    background: var(--ae-menu-item-bg-hover);
    color: var(--ae-menu-item-color-hover);
  }

  .menu-item:focus-visible {
    background: var(--ae-menu-item-bg-focus);
    outline: 2px solid var(--ae-menu-item-focus-ring);
    outline-offset: -2px;
  }

  .menu-item[aria-disabled='true'] {
    color: var(--ae-menu-item-color-disabled);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .menu-item-label {
    flex: 1;
  }

  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
`;
