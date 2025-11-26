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
    background: var(--ae-menu-bg);
    border: var(--ae-menu-border);
    border-radius: var(--ae-menu-border-radius, 0.5rem);
    box-shadow: var(--ae-menu-shadow);
    min-width: var(--ae-menu-min-width, 200px);
  }
`;
