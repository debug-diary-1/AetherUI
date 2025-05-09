import { AeAccordion } from './ae-accordion';
import { AeAccordionItem } from './ae-accordion-item';

export { AeAccordion } from './ae-accordion';
export { AeAccordionItem } from './ae-accordion-item';

export function defineAeAccordion() {
  if (!customElements.get('ae-accordion')) {
    customElements.define('ae-accordion', AeAccordion);
  }
  if (!customElements.get('ae-accordion-item')) {
    customElements.define('ae-accordion-item', AeAccordionItem);
  }
}
