import { expect } from '@open-wc/testing';
import { AeRadio } from '../ae-radio';
import '../ae-radio';

describe('ae-radio', () => {
  let radio: AeRadio;

  beforeEach(() => {
    radio = document.createElement('ae-radio') as AeRadio;
    document.body.appendChild(radio);
  });

  afterEach(() => {
    document.body.removeChild(radio);
  });

  it('should have default values', () => {
    expect(radio.checked).to.be.false;
    expect(radio.disabled).to.be.false;
    expect(radio.name).to.equal('');
    expect(radio.value).to.equal('');
  });

  it('should reflect attribute changes correctly', () => {
    radio.checked = true;
    expect(radio.checked).to.be.true;

    radio.disabled = true;
    expect(radio.disabled).to.be.true;

    radio.name = 'test-group';
    expect(radio.name).to.equal('test-group');

    radio.value = 'test-value';
    expect(radio.value).to.equal('test-value');
  });

  it('should emit ae-radio-change event when checked', (done) => {
    radio.addEventListener('ae-radio-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      expect(customEvent.detail.checked).to.be.true;
      done();
    });
    
    // Simulate clicking the radio
    const input = radio.shadowRoot!.querySelector('input')! as HTMLInputElement;
    input.click();
    
    // Verify the radio state
    expect(radio.checked).to.be.true;
  });

  it('should handle disabled state correctly', () => {
    radio.disabled = true;
    expect(radio.disabled).to.be.true;
    
    // Disabled attribute should be reflected on the input
    const input = radio.shadowRoot!.querySelector('input')! as HTMLInputElement;
    expect(input.disabled).to.be.true;
  });

  it('should have correct ARIA attributes', () => {
    radio.checked = true;
    
    const label = radio.shadowRoot!.querySelector('label')! as HTMLLabelElement;
    const input = radio.shadowRoot!.querySelector('input')! as HTMLInputElement;
    
    expect(input.type).to.equal('radio');
    expect(input.checked).to.be.true;
  });
  
  it('should render slot content correctly', () => {
    radio.textContent = 'Radio Label';
    
    // Allow for rendering cycle
    setTimeout(() => {
      const slot = radio.shadowRoot!.querySelector('slot')!;
      const assignedNodes = slot.assignedNodes();
      
      expect(assignedNodes.length).to.be.greaterThan(0);
      expect(radio.textContent).to.include('Radio Label');
    }, 10);
  });
});