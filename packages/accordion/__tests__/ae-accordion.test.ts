import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AeAccordion } from '../src/ae-accordion';
import { AeAccordionItem } from '../src/ae-accordion-item';

// Register custom elements for testing
if (!customElements.get('ae-accordion')) {
  customElements.define('ae-accordion', AeAccordion);
}
if (!customElements.get('ae-accordion-item')) {
  customElements.define('ae-accordion-item', AeAccordionItem);
}

// Helper function to wait for element updates
async function waitForElementUpdates() {
  await new Promise(resolve => setTimeout(resolve, 0));
}

describe('AeAccordion', () => {
  let accordion: AeAccordion;
  let panel1: AeAccordionItem;
  let panel2: AeAccordionItem;

  beforeEach(async () => {
    accordion = document.createElement('ae-accordion') as AeAccordion;
    panel1 = document.createElement('ae-accordion-item') as AeAccordionItem;
    panel2 = document.createElement('ae-accordion-item') as AeAccordionItem;
    
    // Set unique IDs for testing
    panel1.headerId = 'panel1';
    panel2.headerId = 'panel2';
    
    document.body.appendChild(accordion);
    accordion.appendChild(panel1);
    accordion.appendChild(panel2);
    
    // Wait for custom elements to be upgraded
    await Promise.all([
      customElements.whenDefined('ae-accordion'),
      customElements.whenDefined('ae-accordion-item')
    ]);
    
    // Wait for next microtask to ensure elements are fully initialized
    await Promise.resolve();
  });

  afterEach(() => {
    document.body.removeChild(accordion);
  });

  it('should initialize with no panels open by default', async () => {
    expect(panel1.open).toBe(false);
    expect(panel2.open).toBe(false);
  });

  it('should open a panel when its header is clicked', async () => {
    // Simulate clicking the header
    const header1 = panel1.shadowRoot?.querySelector('.header') as HTMLElement;
    header1?.click();
    await waitForElementUpdates();
    
    expect(panel1.open).toBe(true);
    expect(panel2.open).toBe(false);
  });

  it('should close a panel when clicked again in single mode', async () => {
    const header1 = panel1.shadowRoot?.querySelector('.header') as HTMLElement;
    header1?.click();
    await waitForElementUpdates();
    header1?.click();
    await waitForElementUpdates();
    
    expect(panel1.open).toBe(false);
  });

  it('should allow multiple panels open in multiselectable mode', async () => {
    accordion.multiselectable = true;
    
    const header1 = panel1.shadowRoot?.querySelector('.header') as HTMLElement;
    const header2 = panel2.shadowRoot?.querySelector('.header') as HTMLElement;
    
    header1?.click();
    await waitForElementUpdates();
    header2?.click();
    await waitForElementUpdates();
    
    expect(panel1.open).toBe(true);
    expect(panel2.open).toBe(true);
  });

  it('should dispatch expand-change event when panels are toggled', async () => {
    let eventDetail: any;
    accordion.addEventListener('ae-expand-change', (e: any) => {
      eventDetail = e.detail;
    });

    const header1 = panel1.shadowRoot?.querySelector('.header') as HTMLElement;
    header1?.click();
    await waitForElementUpdates();
    
    expect(eventDetail.expanded).toContain('panel1');
  });
});
