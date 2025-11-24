import { css } from 'lit';

/**
 * Breadcrumb component styles
 */
export const breadcrumbStyles = css`
  :host {
    display: block;
  }

  .breadcrumb-base {
    display: block;
  }

  .breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ae-breadcrumb-gap, 0.5rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
