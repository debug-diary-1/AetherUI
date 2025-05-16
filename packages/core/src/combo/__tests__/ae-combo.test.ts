/**
 * Web component test for ae-combo using @open-wc/testing
 */
import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../ae-combo.js';
import { AeCombo, defineAeCombo } from '../ae-combo.js';

// Register the custom element
defineAeCombo();

describe('ae-combo', () => {
  let combo: AeCombo;

  beforeEach(async () => {
    // Create a fresh component before each test
    combo = await fixture<AeCombo>(html`
      <ae-combo .items=${['Option 1', 'Option 2', 'Option 3']} placeholder="Select an option"></ae-combo>
    `);
  });

  it('should be defined', () => {
    expect(combo).to.exist;
    expect(combo.shadowRoot).to.exist;
  });

  it('should render with correct default properties', () => {
    expect(combo.value).to.equal('');
    expect(combo.placeholder).to.equal('Select an option');
    expect(combo.disabled).to.be.false;
    expect(combo.freeInput).to.be.true;
  });

  it('should render the input with correct attributes', () => {
    const input = combo.shadowRoot?.querySelector('input');
    expect(input).to.exist;
    expect(input?.getAttribute('placeholder')).to.equal('Select an option');
    expect(input?.getAttribute('role')).to.equal('combobox');
  });

  it('should show options when clicked', async () => {
    // Initially dropdown should be closed
    const overlay = combo.shadowRoot?.querySelector('.overlay');
    expect(overlay?.hasAttribute('data-open')).to.be.false;
    
    // Click the caret to open
    const caret = combo.shadowRoot?.querySelector('.caret') as HTMLElement;
    caret.click();
    await elementUpdated(combo);
    
    // Should be open now
    const overlayAfter = combo.shadowRoot?.querySelector('.overlay');
    expect(overlayAfter?.hasAttribute('data-open')).to.be.true;
    
    // Options should be rendered
    const options = combo.shadowRoot?.querySelectorAll('.option');
    expect(options?.length).to.equal(3);
  });

  it('should open on input focus', async () => {
    const input = combo.shadowRoot?.querySelector('input') as HTMLInputElement;
    const overlay = combo.shadowRoot?.querySelector('.overlay');
    
    // Initially closed
    expect(overlay?.hasAttribute('data-open')).to.be.false;
    
    // Focus the input
    input.focus();
    input.dispatchEvent(new FocusEvent('focus'));
    await elementUpdated(combo);
    
    // Should be open
    const overlayAfter = combo.shadowRoot?.querySelector('.overlay');
    expect(overlayAfter?.hasAttribute('data-open')).to.be.true;
  });
  
  it('should select an option when clicked', async () => {
    // Open dropdown
    const caret = combo.shadowRoot?.querySelector('.caret') as HTMLElement;
    caret.click();
    await elementUpdated(combo);
    
    // Find and click the first option
    const firstOption = combo.shadowRoot?.querySelector('.option') as HTMLElement;
    
    setTimeout(() => firstOption.click());
    
    const event = await oneEvent(combo, 'ae-combo-select');
    
    expect(event).to.exist;
    expect(event.detail.value).to.equal('Option 1');
    expect(combo.value).to.equal('Option 1');
  });
  
  it('should support setting value programmatically', async () => {
    // Set value
    combo.value = 'Option 2';
    await elementUpdated(combo);
    
    // Input value should be updated
    const input = combo.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.value).to.equal('Option 2');
  });
  
  it('should disable the component when disabled is set', async () => {
    combo.disabled = true;
    await elementUpdated(combo);
    
    // Input should be disabled
    const input = combo.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.disabled).to.be.true;
    
    // Clicking caret shouldn't open dropdown
    const caret = combo.shadowRoot?.querySelector('.caret') as HTMLElement;
    caret.click();
    await elementUpdated(combo);
    
    const overlay = combo.shadowRoot?.querySelector('.overlay');
    expect(overlay?.hasAttribute('data-open')).to.be.false;
  });
  
  it('should emit input event on typing', async () => {
    const input = combo.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    setTimeout(() => {
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    const event = await oneEvent(combo, 'ae-combo-input');
    
    expect(event).to.exist;
    expect(event.detail.value).to.equal('test');
  });
  
  it('should filter items based on input', async () => {
    // Type in the input
    const input = combo.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'Option 2';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    
    await elementUpdated(combo);
    
    // Give the controller time to filter (debounce is 50ms)
    await new Promise(resolve => setTimeout(resolve, 300));
    await elementUpdated(combo);
    
    // Should show filtered results
    const options = combo.shadowRoot?.querySelectorAll('.option');
    expect(options?.length).to.equal(1);
    expect(options?.[0].textContent?.trim()).to.equal('Option 2');
  });
});