import { expect } from '@open-wc/testing';
import { AeModal } from '../ae-modal';
import '../ae-modal';

describe('ae-modal', () => {
  let modal: AeModal;

  beforeEach(() => {
    modal = document.createElement('ae-modal') as AeModal;
    document.body.appendChild(modal);
  });

  afterEach(() => {
    document.body.removeChild(modal);
  });

  it('should have default values', () => {
    expect(modal.open).to.be.false;
    expect(modal.closable).to.be.true;
    expect(modal.backdrop).to.be.true;
    expect(modal.size).to.equal('medium');
  });

  it('should emit ae-modal-open event when opened', (done) => {
    modal.addEventListener('ae-modal-open', () => {
      expect(modal.open).to.be.true;
      done();
    });
    
    // Trigger the modal to open
    modal.open = true;
  });

  it('should emit ae-modal-close event when closed', (done) => {
    modal.addEventListener('ae-modal-close', () => {
      expect(modal.open).to.be.false;
      done();
    });
    
    // Open then close the modal
    modal.open = true;
    setTimeout(() => {
      modal.open = false;
    }, 10);
  });

  it('should not render anything when closed', () => {
    modal.open = false;
    
    // Allow for rendering cycle
    setTimeout(() => {
      const backdrop = modal.shadowRoot?.querySelector('[part="backdrop"]');
      expect(backdrop).to.be.null;
    }, 10);
  });

  it('should render the correct size variant', () => {
    // Test each size variant
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      modal.size = size;
      modal.open = true;
      
      // Allow for rendering cycle
      setTimeout(() => {
        const panel = modal.shadowRoot?.querySelector('[part="panel"]') as HTMLElement;
        expect(panel?.getAttribute('data-size')).to.equal(size);
      }, 10);
      
      modal.open = false;
    });
  });
});