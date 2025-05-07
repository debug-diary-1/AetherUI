/**
 * Accordion utility functions
 */

/**
 * Generates a unique ID for accordion items
 * @returns A unique string ID
 */
export function generateId(): string {
  return `ae-accordion-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Converts a value to an array
 * Used for open/defaultOpen props that can accept boolean or string[]
 * @param value - The value to convert
 * @returns An array of strings or an empty array
 */
export function toArray(value: boolean | string | string[] | undefined): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    return [value];
  }
  if (value === true) {
    return ['true']; // Single panel always open
  }
  return [];
}

/**
 * Updates the accordion's multiselectable state
 * @param accordion - Accordion element
 * @param multiselectable - Whether multiple panels can be open
 */
export function updateMultiselectable(accordion: HTMLElement, multiselectable: boolean): void {
  if (multiselectable) {
    accordion.setAttribute('aria-multiselectable', 'true');
  } else {
    accordion.removeAttribute('aria-multiselectable');
  }
}

/**
 * Checks if a panel should be open based on the openPanels array
 * @param panelId - The ID of the panel to check
 * @param openPanels - Array of open panel IDs
 * @returns True if the panel should be open
 */
export function isPanelOpen(panelId: string, openPanels: string[]): boolean {
  return openPanels.includes(panelId);
}

/**
 * Updates the open panels based on the current state and multiselectable mode
 * @param openPanels - Current open panels
 * @param panelId - Panel ID to toggle
 * @param multiselectable - Whether multiple panels can be open
 * @returns Updated array of open panel IDs
 */
export function updateOpenPanels(
  openPanels: string[],
  panelId: string,
  multiselectable: boolean
): string[] {
  const isOpen = openPanels.includes(panelId);
  
  if (isOpen) {
    // Close the panel
    return openPanels.filter(id => id !== panelId);
  } else if (multiselectable) {
    // Open the panel in multiselectable mode
    return [...openPanels, panelId];
  } else {
    // Open only this panel in single-panel mode
    return [panelId];
  }
} 