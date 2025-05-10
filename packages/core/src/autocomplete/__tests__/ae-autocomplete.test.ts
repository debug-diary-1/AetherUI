import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { beforeEach, describe, it } from 'vitest';
import '../ae-autocomplete';
import { AeAutocomplete } from '../ae-autocomplete';
import { AutoItem } from '../types';

describe('ae-autocomplete', () => {
  let element: AeAutocomplete;
  
  beforeEach(async () => {
    element = await fixture<AeAutocomplete>(html`
      <ae-autocomplete></ae-autocomplete>
    `);
  });

  it('has default properties', () => {
    expect(element.value).to.equal('');
    expect(element.placeholder).to.equal('');
    expect(element.throttle).to.equal(200);
    expect(element.disabled).to.be.false;
  });

  it('renders input element with correct attributes', () => {
    const input = element.shadowRoot!.querySelector('input');
    expect(input).to.exist;
    expect(input?.getAttribute('role')).to.equal('combobox');
    expect(input?.getAttribute('aria-autocomplete')).to.equal('list');
    expect(input?.getAttribute('aria-expanded')).to.equal('false');
  });
  
  it('updates input value when property changes', async () => {
    element.value = 'test value';
    await element.updateComplete;
    
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.value).to.equal('test value');
  });
  
  it('applies placeholder to input', async () => {
    element.placeholder = 'Type to search...';
    await element.updateComplete;
    
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.placeholder).to.equal('Type to search...');
  });
  
  it('disables the input when disabled property is true', async () => {
    element.disabled = true;
    await element.updateComplete;
    
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.disabled).to.be.true;
  });
  
  it('filters options based on input', async () => {
    // Set up static options
    element.options = [
      'Apple',
      'Banana',
      'Cherry',
      'Date'
    ];
    
    // Enter text to filter
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.value = 'a';
    input.dispatchEvent(new Event('input'));
    
    // Wait for filtering to complete
    await element.updateComplete;
    
    // Get the filtered options
    const options = element.shadowRoot!.querySelectorAll('[part="option"]');
    expect(options.length).to.be.greaterThan(0);
    
    // Verify that options contain "a"
    let containsA = false;
    options.forEach(option => {
      if (option.textContent?.toLowerCase().includes('a')) {
        containsA = true;
      }
    });
    expect(containsA).to.be.true;
  });
  
  it('emits ae-autocomplete-input event on input', async () => {
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    
    // Set up listener
    setTimeout(() => {
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
    });
    
    const { detail } = await oneEvent(element, 'ae-autocomplete-input');
    expect(detail.value).to.equal('test');
  });
  
  it('emits ae-autocomplete-select event when option is selected', async () => {
    // Set up options
    element.options = [
      { id: 'apple', label: 'Apple' },
      { id: 'banana', label: 'Banana' }
    ];
    
    // Open dropdown and wait for render
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await element.updateComplete;
    
    // Find and click an option
    setTimeout(() => {
      const option = element.shadowRoot!.querySelector('[part="option"]') as HTMLElement;
      option.click();
    });
    
    // Wait for select event
    const { detail } = await oneEvent(element, 'ae-autocomplete-select');
    expect(detail.value).to.equal('apple');
    expect(detail.item).to.exist;
    expect(detail.item.label).to.equal('Apple');
  });
  
  it('shows loading spinner when loading async options', async () => {
    // Mock async load function
    element.loadOptions = async (query: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return [
        { id: 'result1', label: 'Result 1' },
        { id: 'result2', label: 'Result 2' }
      ];
    };
    
    // Trigger loading
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    
    // Wait for update
    await element.updateComplete;
    
    // Check if spinner is visible
    const spinner = element.shadowRoot!.querySelector('[part="spinner"][data-loading]');
    expect(spinner).to.exist;
  });
  
  it('emits ae-autocomplete-load event before loading options', async () => {
    // Mock async load function
    element.loadOptions = async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return [{ id: 'test', label: 'Test Result' }];
    };
    
    // Set up listener
    setTimeout(() => {
      const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
    });
    
    // Wait for the load event
    const { detail } = await oneEvent(element, 'ae-autocomplete-load');
    expect(detail.query).to.exist;
  });
  
  it('emits ae-autocomplete-load-end event after options are loaded', async () => {
    // Mock async load function
    element.loadOptions = async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return [{ id: 'test', label: 'Test Result' }];
    };
    
    // Set up listener
    setTimeout(() => {
      const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
    });
    
    // Wait for the load-end event
    const { detail } = await oneEvent(element, 'ae-autocomplete-load-end');
    expect(detail.query).to.exist;
    expect(detail.items).to.be.an('array');
    expect(detail.items.length).to.equal(1);
  });
  
  it('handles keyboard navigation through options', async () => {
    // Set up options
    element.options = [
      { id: 'a', label: 'Apple' },
      { id: 'b', label: 'Banana' },
      { id: 'c', label: 'Cherry' }
    ];
    
    // Open dropdown
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await element.updateComplete;
    
    // Press down arrow to navigate
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await element.updateComplete;
    
    // Verify that an option is highlighted
    const highlightedOption = element.shadowRoot!.querySelector('[data-highlighted]');
    expect(highlightedOption).to.exist;
  });
  
  it('closes dropdown on Escape key', async () => {
    // Set up options and open dropdown
    element.options = ['Apple', 'Banana'];
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await element.updateComplete;
    
    // Verify dropdown is open
    const overlayOpen = element.shadowRoot!.querySelector('[part="overlay"][data-open]');
    expect(overlayOpen).to.exist;
    
    // Press Escape key
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await element.updateComplete;
    
    // Verify dropdown is closed
    const overlayClosed = element.shadowRoot!.querySelector('[part="overlay"][data-open]');
    expect(overlayClosed).to.be.null;
  });
});