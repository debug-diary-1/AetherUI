import { expect } from '@open-wc/testing';
import { AeCheckbox } from '../ae-checkbox';
import '../ae-checkbox';

describe('ae-checkbox', () => {
  let checkbox: AeCheckbox;

  beforeEach(() => {
    checkbox = document.createElement('ae-checkbox') as AeCheckbox;
    document.body.appendChild(checkbox);
  });

  afterEach(() => {
    document.body.removeChild(checkbox);
  });

  it('should have default values', () => {
    expect(checkbox.checked).to.be.false;
    expect(checkbox.indeterminate).to.be.false;
    expect(checkbox.disabled).to.be.false;
    expect(checkbox.required).to.be.false;
    expect(checkbox.name).to.equal('');
    expect(checkbox.value).to.equal('');
  });

  it('should reflect checked attribute changes', () => {
    checkbox.checked = true;
    expect(checkbox.checked).to.be.true;

    checkbox.checked = false;
    expect(checkbox.checked).to.be.false;
  });

  it('should emit ae-checkbox-change event when clicked', async () => {
    const changeHandler = (e: Event) => {
      const customEvent = e as CustomEvent;
      expect(customEvent.detail.checked).to.be.true;
      expect(customEvent.detail.indeterminate).to.be.false;
    };

    checkbox.addEventListener('ae-checkbox-change', changeHandler as EventListener);
    
    // Simulate clicking the checkbox
    const input = checkbox.shadowRoot!.querySelector('input')!;
    input.click();
    
    // Verify the checkbox state
    expect(checkbox.checked).to.be.true;
    expect(checkbox.indeterminate).to.be.false;
  });

  it('should handle indeterminate state correctly', () => {
    checkbox.indeterminate = true;
    expect(checkbox.indeterminate).to.be.true;
    
    // Accessing the input element
    const input = checkbox.shadowRoot!.querySelector('input')!;
    
    // Clicking should clear the indeterminate state
    input.click();
    expect(checkbox.indeterminate).to.be.false;
    expect(checkbox.checked).to.be.true;
  });

  it('should handle disabled state correctly', () => {
    checkbox.disabled = true;
    expect(checkbox.disabled).to.be.true;
    
    // Attempt to change the checked state
    checkbox.checked = true;
    expect(checkbox.checked).to.be.true; // Property should still change

    // But the disabled attribute should be reflected on the input
    const input = checkbox.shadowRoot!.querySelector('input')! as HTMLInputElement;
    expect(input.disabled).to.be.true;
  });
  
  it('should handle required state correctly', () => {
    checkbox.required = true;
    expect(checkbox.required).to.be.true;
    
    const input = checkbox.shadowRoot!.querySelector('input')! as HTMLInputElement;
    expect(input.required).to.be.true;
  });
  
  it('should set the value attribute correctly', () => {
    checkbox.value = 'test-value';
    expect(checkbox.value).to.equal('test-value');
    
    const input = checkbox.shadowRoot!.querySelector('input')! as HTMLInputElement;
    expect(input.value).to.equal('test-value');
  });
  
  it('should set aria-checked to "mixed" when indeterminate', () => {
    checkbox.indeterminate = true;
    
    const input = checkbox.shadowRoot!.querySelector('input')! as HTMLInputElement;
    expect(input.getAttribute('aria-checked')).to.equal('mixed');
  });
});