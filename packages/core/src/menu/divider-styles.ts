import { css } from 'lit';

/**
 * Menu divider component styles
 */
export const menuDividerStyles = css`
  :host {
    display: block;
  }

  .menu-divider {
    height: 1px;
    margin: var(--ae-menu-divider-margin, 0.5rem 0);
    background: var(--ae-menu-divider-color);
  }
`;
