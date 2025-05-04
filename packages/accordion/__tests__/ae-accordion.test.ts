import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AeAccordion, AeAccordionPanel } from '../src/ae-accordion';

describe('AeAccordion', () => {
  let accordion: AeAccordion;
  let panel1: AeAccordionPanel;
  let panel2: AeAccordionPanel;

  beforeEach(() => {
    accordion = document.createElement('ae-accordion') as AeAccordion;
    panel1 = document.createElement('ae-accordion-panel') as AeAccordionPanel;
    panel2 = document.createElement('ae-accordion-panel') as AeAccordionPanel;
    document.body.appendChild(accordion);
    accordion.appendChild(panel1);
    accordion.appendChild(panel2);
  });

  afterEach(() => {
    document.body.removeChild(accordion);
  });

  it('should initialize with no panels open by default', () => {
    expect(panel1.open).toBe(false);
    expect(panel2.open).toBe(false);
  });

  it('should open a panel when clicked', () => {
    panel1.click();
    expect(panel1.open).toBe(true);
    expect(panel2.open).toBe(false);
  });

  it('should close a panel when clicked again in single mode', () => {
    panel1.click();
    panel1.click();
    expect(panel1.open).toBe(false);
  });

  it('should allow multiple panels open in multiselectable mode', () => {
    accordion.multiselectable = true;
    panel1.click();
    panel2.click();
    expect(panel1.open).toBe(true);
    expect(panel2.open).toBe(true);
  });

  it('should dispatch change event when panels are toggled', () => {
    let eventDetail: any;
    accordion.addEventListener('ae-change', (e: any) => {
      eventDetail = e.detail;
    });

    panel1.click();
    expect(eventDetail).toEqual({ open: ['panel1'] });
  });
}); 