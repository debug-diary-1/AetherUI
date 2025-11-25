import { css } from 'lit';

export const tabStyles = css`
  /* Host element - the main container */
  :host {
    display: flex;
    box-sizing: border-box;
    width: 100%;
  }
  
  /* Default horizontal orientation */
  :host(:not([orientation="vertical"])) {
    flex-direction: column;
  }
  
  /* Vertical orientation */
  :host([orientation="vertical"]) {
    flex-direction: row;
  }
  
  /* Tab list container - horizontal (default) */
  .tablist {
    display: flex;
    flex-direction: row;
    gap: var(--ae-tabs-gap, 0.5rem);
    border-bottom: var(--ae-tabs-active-border-width, 2px) solid var(--ae-tabs-border-color);
    margin-bottom: var(--ae-tabs-margin, 1rem);
    width: 100%;
  }

  /* Tab list container - vertical */
  :host([orientation="vertical"]) .tablist {
    flex-direction: column;
    border-bottom: none;
    border-right: var(--ae-tabs-active-border-width, 2px) solid var(--ae-tabs-border-color);
    margin-bottom: 0;
    margin-right: var(--ae-tabs-margin, 1rem);
    min-width: 150px;
    width: auto;
  }
  
  /* Panel container */
  .panels {
    flex: 1;
  }
  
  /* Tab slot styling */
  ::slotted(ae-tab) {
    display: inline-flex;
  }
  
  /* Horizontal tab indicator - using relative & absolute positioning for the indicator */
  :host(:not([orientation="vertical"])) ::slotted(ae-tab) {
    position: relative;
  }
  
  :host(:not([orientation="vertical"])) ::slotted(ae-tab[aria-selected="true"]) {
    color: var(--ae-tabs-active-color);
  }

  :host(:not([orientation="vertical"])) ::slotted(ae-tab[aria-selected="true"])::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: var(--ae-tabs-active-border-width, 2px);
    background-color: var(--ae-tabs-active-color);
  }

  /* Vertical tab indicator */
  :host([orientation="vertical"]) ::slotted(ae-tab) {
    position: relative;
  }

  :host([orientation="vertical"]) ::slotted(ae-tab[aria-selected="true"]) {
    color: var(--ae-tabs-active-color);
  }

  :host([orientation="vertical"]) ::slotted(ae-tab[aria-selected="true"])::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: var(--ae-tabs-active-border-width, 2px);
    height: 100%;
    background-color: var(--ae-tabs-active-color);
  }
  
  /* Panel styling */
  ::slotted(ae-tab-panel) {
    display: none;
  }
  
  ::slotted(ae-tab-panel:not([hidden])) {
    display: block;
  }
`;