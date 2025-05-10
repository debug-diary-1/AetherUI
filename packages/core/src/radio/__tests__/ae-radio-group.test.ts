import { expect } from '@open-wc/testing';
import { AeRadioGroup } from '../ae-radio-group';
import { AeRadio } from '../ae-radio';
import '../ae-radio-group';
import '../ae-radio';

describe('ae-radio-group', () => {
  let radioGroup: AeRadioGroup;
  let radio1: AeRadio;
  let radio2: AeRadio;

  beforeEach(() => {
    radioGroup = document.createElement('ae-radio-group') as AeRadioGroup;
    radio1 = document.createElement('ae-radio') as AeRadio;
    radio2 = document.createElement('ae-radio') as AeRadio;
    
    // Setup radios
    radio1.value = 'option1';
    radio1.textContent = 'Option 1';
    radio2.value = 'option2';
    radio2.textContent = 'Option 2';
    
    // Add to group
    radioGroup.appendChild(radio1);
    radioGroup.appendChild(radio2);
    
    document.body.appendChild(radioGroup);
  });

  afterEach(() => {
    document.body.removeChild(radioGroup);
  });

  it('should have default values', () => {
    expect(radioGroup.name).to.equal('');
    expect(radioGroup.value).to.equal('');
    expect(radioGroup.disabled).to.be.false;
    expect(radioGroup.orientation).to.equal('vertical');
  });

  it('should sync attributes to child radios', () => {
    radioGroup.name = 'test-group';
    radioGroup.disabled = true;
    
    // Wait for update cycle
    setTimeout(() => {
      expect(radio1.name).to.equal('test-group');
      expect(radio2.name).to.equal('test-group');
      expect(radio1.disabled).to.be.true;
      expect(radio2.disabled).to.be.true;
    }, 10);
  });

  it('should select radio when value matches', () => {
    radioGroup.value = 'option1';
    
    // Wait for update cycle
    setTimeout(() => {
      expect(radio1.checked).to.be.true;
      expect(radio2.checked).to.be.false;
      
      // Change to option2
      radioGroup.value = 'option2';
      
      setTimeout(() => {
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.true;
      }, 10);
    }, 10);
  });

  it('should emit ae-radio-group-change event when selection changes', (done) => {
    radioGroup.addEventListener('ae-radio-group-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      expect(customEvent.detail.value).to.equal('option1');
      done();
    });
    
    // Simulate selecting a radio
    const input = radio1.shadowRoot!.querySelector('input')! as HTMLInputElement;
    input.click();
    
    // Verify the group state
    setTimeout(() => {
      expect(radioGroup.value).to.equal('option1');
      expect(radio1.checked).to.be.true;
      expect(radio2.checked).to.be.false;
    }, 10);
  });

  it('should update when orientation changes', () => {
    expect(radioGroup.orientation).to.equal('vertical');
    
    radioGroup.orientation = 'horizontal';
    expect(radioGroup.orientation).to.equal('horizontal');
    
    const base = radioGroup.shadowRoot!.querySelector('[part="base"]')! as HTMLElement;
    expect(base.getAttribute('role')).to.equal('radiogroup');
  });
  
  it('should update radios when children change', () => {
    // Add a new radio
    const radio3 = document.createElement('ae-radio') as AeRadio;
    radio3.value = 'option3';
    
    radioGroup.appendChild(radio3);
    
    // Verify the new radio is properly set up
    setTimeout(() => {
      expect(radio3.name).to.equal(radioGroup.name);
      expect(radio3.disabled).to.equal(radioGroup.disabled);
    }, 10);
  });
});