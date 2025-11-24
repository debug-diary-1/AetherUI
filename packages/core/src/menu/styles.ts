import { css } from 'lit';

/**
 * Menu component styles
 */
export const menuStyles = css`
  :host {
    display: block;
  }

  .menu-base {
    display: flex;
    flex-direction: column;
    padding: var(--ae-menu-padding, 0.5rem);
    background: var(--ae-menu-bg, white);
    border: var(--ae-menu-border, 1px solid #e5e7eb);
    border-radius: var(--ae-menu-border-radius, 0.5rem);
    box-shadow: var(--ae-menu-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    min-width: var(--ae-menu-min-width, 200px);
  }
`;
