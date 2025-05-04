import { AeAccordion } from './ae-accordion';
import { AeAccordionPanel } from './ae-accordion-panel';

export { AeAccordion } from './ae-accordion';
export { AeAccordionPanel } from './ae-accordion-panel';

export function defineAeAccordion() {
  customElements.define('ae-accordion', AeAccordion);
  customElements.define('ae-accordion-panel', AeAccordionPanel);
}
