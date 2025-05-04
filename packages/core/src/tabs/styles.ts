import { css } from 'lit';

export const tabStyles = css`
  /* Base styles for the host element - horizontal by default */
  :host {
    display: block !important;
    width: 100%;
  }

  /* Base tablist styles - horizontal by default */
  [part="tablist"] {
    display: flex;
    flex-direction: row;
    gap: var(--ae-tabs-gap, 1rem);
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
    border-right: none;
    margin-right: 0;
  }

  /* Flex layout for vertical orientation - only applied when orientation="vertical" */
  :host([orientation="vertical"]) {
    display: flex !important;
  }

  /* Vertical tablist styles - only applied when orientation="vertical" */
  :host([orientation="vertical"]) [part="tablist"] {
    flex-direction: column;
    min-width: 150px;
    border-right: 1px solid #ddd;
    margin-right: 1rem;
    border-bottom: none;
    margin-bottom: 0;
  }

  /* Button/tab styles */
  ::part(tab) {
    background: transparent;
    padding: var(--ae-tabs-padding-y, 0.25rem) var(--ae-tabs-padding-x, 0.75rem);
    border: none;
    cursor: pointer;
    font: inherit;
    position: relative;
  }

  /* Selected tab styles - horizontal by default */
  ::part(tab)[aria-selected="true"] {
    border-bottom: 2px solid var(--ae-tabs-indicator-color, currentColor);
    border-right: none;
    font-weight: bold;
    margin-bottom: -1px;
  }

  /* Selected tab styles - vertical */
  :host([orientation="vertical"]) ::part(tab)[aria-selected="true"] {
    border-right: 2px solid var(--ae-tabs-indicator-color, currentColor);
    border-bottom: none;
    font-weight: bold;
    margin-bottom: 0;
  }

  /* Panel container for vertical layout */
  :host([orientation="vertical"]) .panel-container {
    flex: 1;
  }

  /* Panel styles */
  ::part(panel) {
    padding: 1rem 0;
  }

  /* Specificity cascade for tabs without explicit orientation (treat as horizontal) */
  :host:not([orientation="vertical"]) {
    display: block !important;
  }

  :host:not([orientation="vertical"]) [part="tablist"] {
    flex-direction: row !important;
    border-bottom: 1px solid #ddd !important;
    border-right: none !important;
    margin-bottom: 1rem !important;
    margin-right: 0 !important;
  }

  /* Ensure horizontal tabs for compatibility */
  :host([orientation="horizontal"]) {
    display: block !important;
  }

  :host([orientation="horizontal"]) [part="tablist"] {
    flex-direction: row !important;
    border-bottom: 1px solid #ddd !important;
    border-right: none !important;
    margin-bottom: 1rem !important;
    margin-right: 0 !important;
  }
`; 