import { css } from 'lit';

/**
 * Breadcrumb item component styles
 */
export const breadcrumbItemStyles = css`
  :host {
    display: inline;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    gap: var(--ae-breadcrumb-item-gap, 0.5rem);
    font-size: var(--ae-breadcrumb-font-size, 0.875rem);
    line-height: 1.25rem;
  }

  .breadcrumb-link {
    color: var(--ae-breadcrumb-link-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .breadcrumb-link:hover {
    color: var(--ae-breadcrumb-link-hover);
    text-decoration: underline;
  }

  .breadcrumb-link:focus-visible {
    outline: 2px solid var(--ae-breadcrumb-focus-ring);
    outline-offset: 2px;
    border-radius: 0.125rem;
  }

  .breadcrumb-text {
    color: var(--ae-breadcrumb-current-color);
  }

  :host([current]) .breadcrumb-text {
    font-weight: var(--ae-breadcrumb-current-font-weight, 500);
  }

  .breadcrumb-separator {
    color: var(--ae-breadcrumb-separator-color);
    user-select: none;
  }
`;
