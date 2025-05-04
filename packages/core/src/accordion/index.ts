export * from './ae-accordion';
export * from './ae-accordion-item';

import { AeAccordion } from './ae-accordion';
import { AeAccordionItem } from './ae-accordion-item';

export const defineAeAccordion = () => {
  if (!customElements.get('ae-accordion')) {
    customElements.define('ae-accordion', AeAccordion);
  }
  if (!customElements.get('ae-accordion-item')) {
    customElements.define('ae-accordion-item', AeAccordionItem);
  }
}; 