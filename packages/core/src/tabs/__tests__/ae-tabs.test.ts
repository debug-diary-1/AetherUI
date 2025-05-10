import { expect } from '@open-wc/testing';
import { AeTabs } from '../ae-tabs';
import { AeTab } from '../ae-tab';
import { AeTabPanel } from '../ae-tab-panel';
import '../ae-tabs';
import '../ae-tab';
import '../ae-tab-panel';

describe('ae-tabs', () => {
  let tabs: AeTabs;
  let tab1: AeTab;
  let tab2: AeTab;
  let panel1: AeTabPanel;
  let panel2: AeTabPanel;

  beforeEach(() => {
    // Create tabs container
    tabs = document.createElement('ae-tabs') as AeTabs;
    
    // Create tabs
    tab1 = document.createElement('ae-tab') as AeTab;
    tab1.id = 'tab1';
    tab1.slot = 'tab';
    tab1.textContent = 'Tab 1';
    
    tab2 = document.createElement('ae-tab') as AeTab;
    tab2.id = 'tab2';
    tab2.slot = 'tab';
    tab2.textContent = 'Tab 2';
    
    // Create panels
    panel1 = document.createElement('ae-tab-panel') as AeTabPanel;
    panel1.id = 'panel1';
    panel1.slot = 'panel';
    panel1.textContent = 'Panel 1 Content';
    
    panel2 = document.createElement('ae-tab-panel') as AeTabPanel;
    panel2.id = 'panel2';
    panel2.slot = 'panel';
    panel2.textContent = 'Panel 2 Content';
    
    // Add everything to tabs
    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    tabs.appendChild(panel1);
    tabs.appendChild(panel2);
    
    // Add to document
    document.body.appendChild(tabs);
  });

  afterEach(() => {
    document.body.removeChild(tabs);
  });

  it('should have default values', () => {
    expect(tabs.value).to.equal(''); // Default to empty string
    expect(tabs.orientation).to.equal('horizontal');
    expect(tabs.activation).to.equal('auto');
  });

  it('should select the first tab by default', (done) => {
    // We need a small timeout here because tab selection happens after firstUpdated
    setTimeout(() => {
      expect(tabs.value).to.equal('tab1');
      expect(tab1.ariaSelected).to.equal('true');
      expect(tab2.ariaSelected).to.equal('false');
      done();
    }, 10);
  });

  it('should emit ae-tabs-change event when tab changes', (done) => {
    tabs.addEventListener('ae-tabs-change', (e: Event) => {
      const event = e as CustomEvent;
      expect(event.detail.value).to.equal('tab2');
      done();
    });
    
    // Set initial value first
    tabs.value = 'tab1';
    
    // Then change to tab2
    setTimeout(() => {
      tab2.click();
    }, 10);
  });

  it('should set aria attributes correctly', (done) => {
    setTimeout(() => {
      // Check tab attributes
      expect(tab1.getAttribute('aria-controls')).to.equal('panel1');
      expect(tab2.getAttribute('aria-controls')).to.equal('panel2');
      
      // Check panel attributes
      expect(panel1.getAttribute('aria-labelledby')).to.equal('tab1');
      expect(panel2.getAttribute('aria-labelledby')).to.equal('tab2');
      
      // Check visibility
      expect(panel1.hidden).to.be.false;
      expect(panel2.hidden).to.be.true;
      
      done();
    }, 10);
  });

  it('should update tab selection when value changes', (done) => {
    setTimeout(() => {
      tabs.value = 'tab2';
      
      // Need another timeout for the update to propagate
      setTimeout(() => {
        expect(tab1.ariaSelected).to.equal('false');
        expect(tab2.ariaSelected).to.equal('true');
        expect(panel1.hidden).to.be.true;
        expect(panel2.hidden).to.be.false;
        done();
      }, 10);
    }, 10);
  });

  it('should set tabindex correctly for tabs', (done) => {
    setTimeout(() => {
      expect(tab1.tabIndex).to.equal(0);
      expect(tab2.tabIndex).to.equal(-1);
      
      // Switch to the second tab
      tabs.value = 'tab2';
      
      setTimeout(() => {
        expect(tab1.tabIndex).to.equal(-1);
        expect(tab2.tabIndex).to.equal(0);
        done();
      }, 10);
    }, 10);
  });

  it('should handle vertical orientation', (done) => {
    tabs.orientation = 'vertical';
    
    setTimeout(() => {
      expect(tabs.getAttribute('orientation')).to.equal('vertical');
      expect(tab1.hasAttribute('data-vertical-tab')).to.be.true;
      expect(tab2.hasAttribute('data-vertical-tab')).to.be.true;
      done();
    }, 10);
  });
});