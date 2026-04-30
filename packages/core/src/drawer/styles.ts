import { css } from 'lit';

/**
 * Drawer component styles
 */
export const drawerStyles = css`
  :host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--ae-drawer-z-index, 1000);
    pointer-events: none;
  }

  :host([open]) {
    pointer-events: auto;
  }

  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--ae-drawer-backdrop-bg, rgba(0, 0, 0, 0.5));
    backdrop-filter: var(--ae-drawer-backdrop-blur, blur(4px));
    animation: fadeIn 0.2s ease;
  }

  .drawer-panel {
    position: fixed;
    display: flex;
    flex-direction: column;
    background: var(--ae-drawer-bg, var(--ae-bg-primary));
    box-shadow: var(--ae-drawer-shadow, -4px 0 20px rgba(0, 0, 0, 0.15));
    overflow: hidden;
    color: var(--ae-drawer-text-color, var(--ae-text-primary));
  }

  /* Placement: Right (default) */
  :host([placement='right']) .drawer-panel {
    top: 0;
    right: 0;
    height: 100%;
    animation: slideInRight 0.3s ease;
  }

  :host([placement='right'][size='sm']) .drawer-panel {
    width: var(--ae-drawer-width-sm, 300px);
  }

  :host([placement='right'][size='md']) .drawer-panel {
    width: var(--ae-drawer-width-md, 400px);
  }

  :host([placement='right'][size='lg']) .drawer-panel {
    width: var(--ae-drawer-width-lg, 600px);
  }

  :host([placement='right'][size='full']) .drawer-panel {
    width: 100%;
  }

  /* Placement: Left */
  :host([placement='left']) .drawer-panel {
    top: 0;
    left: 0;
    height: 100%;
    animation: slideInLeft 0.3s ease;
  }

  :host([placement='left'][size='sm']) .drawer-panel {
    width: var(--ae-drawer-width-sm, 300px);
  }

  :host([placement='left'][size='md']) .drawer-panel {
    width: var(--ae-drawer-width-md, 400px);
  }

  :host([placement='left'][size='lg']) .drawer-panel {
    width: var(--ae-drawer-width-lg, 600px);
  }

  :host([placement='left'][size='full']) .drawer-panel {
    width: 100%;
  }

  /* Placement: Top */
  :host([placement='top']) .drawer-panel {
    top: 0;
    left: 0;
    width: 100%;
    animation: slideInTop 0.3s ease;
  }

  :host([placement='top'][size='sm']) .drawer-panel {
    height: var(--ae-drawer-height-sm, 200px);
  }

  :host([placement='top'][size='md']) .drawer-panel {
    height: var(--ae-drawer-height-md, 300px);
  }

  :host([placement='top'][size='lg']) .drawer-panel {
    height: var(--ae-drawer-height-lg, 500px);
  }

  :host([placement='top'][size='full']) .drawer-panel {
    height: 100%;
  }

  /* Placement: Bottom */
  :host([placement='bottom']) .drawer-panel {
    bottom: 0;
    left: 0;
    width: 100%;
    animation: slideInBottom 0.3s ease;
  }

  :host([placement='bottom'][size='sm']) .drawer-panel {
    height: var(--ae-drawer-height-sm, 200px);
  }

  :host([placement='bottom'][size='md']) .drawer-panel {
    height: var(--ae-drawer-height-md, 300px);
  }

  :host([placement='bottom'][size='lg']) .drawer-panel {
    height: var(--ae-drawer-height-lg, 500px);
  }

  :host([placement='bottom'][size='full']) .drawer-panel {
    height: 100%;
  }

  .drawer-close {
    position: absolute;
    top: var(--ae-drawer-close-top, 1rem);
    right: var(--ae-drawer-close-right, 1rem);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: none;
    background: transparent;
    color: var(--ae-drawer-close-color, var(--ae-text-tertiary));
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    z-index: 1;
  }

  .drawer-close:hover {
    background: var(--ae-drawer-close-bg-hover, var(--ae-bg-secondary));
    color: var(--ae-drawer-close-color-hover, var(--ae-text-primary));
  }

  .drawer-close:focus-visible {
    outline: 2px solid var(--ae-drawer-focus-ring, var(--ae-border-focus));
    outline-offset: 2px;
  }

  ::slotted([slot='header']) {
    padding: var(--ae-drawer-header-padding, 1.5rem);
    border-bottom: var(--ae-drawer-header-border, 1px solid var(--ae-border-primary));
    font-size: var(--ae-drawer-header-font-size, 1.25rem);
    font-weight: var(--ae-drawer-header-font-weight, 600);
    color: var(--ae-drawer-header-color, var(--ae-text-primary));
  }

  .drawer-body {
    flex: 1;
    padding: var(--ae-drawer-body-padding, 1.5rem);
    overflow-y: auto;
    color: var(--ae-drawer-body-color, var(--ae-text-secondary));
  }

  ::slotted([slot='footer']) {
    padding: var(--ae-drawer-footer-padding, 1rem 1.5rem);
    border-top: var(--ae-drawer-footer-border, 1px solid var(--ae-border-primary));
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInTop {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInBottom {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
