import { AeAccordion } from './ae-accordion';
import { AeAccordionItem } from './ae-accordion-item';
import { accordionStyles, accordionItemStyles } from './styles';

export { AeAccordion, AeAccordionItem, accordionStyles, accordionItemStyles };

/**
 * Register all accordion components with the CustomElements registry
 * 
 * @example
 * ```ts
 * import { defineAeAccordion } from '@aetherui/core';
 * 
 * defineAeAccordion(); // Now <ae-accordion> and <ae-accordion-item> are available
 * ```
 */
export function defineAeAccordion(): void {
  if (!customElements.get('ae-accordion')) {
    customElements.define('ae-accordion', AeAccordion);
  }
  if (!customElements.get('ae-accordion-item')) {
    customElements.define('ae-accordion-item', AeAccordionItem);
  }
}

// Export types
export type { AeAccordion as AeAccordionElement };
export type { AeAccordionItem as AeAccordionItemElement };

// Define event types for TypeScript users
export interface AeAccordionChangeEvent extends CustomEvent {
  detail: {
    value: string[];
  }
}

export interface AeAccordionItemChangeEvent extends CustomEvent {
  detail: {
    headerId: string;
    open: boolean;
  }
}

// Legacy event types (for backward compatibility)
export interface AeExpandChangeEvent extends CustomEvent {
  detail: {
    expanded: string[];
  }
}

export interface AePanelChangeEvent extends CustomEvent {
  detail: {
    headerId: string;
    open: boolean;
  }
}