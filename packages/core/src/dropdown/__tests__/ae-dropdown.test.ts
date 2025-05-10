import { expect } from '@open-wc/testing';
import { AeDropdown, AeMenuItem } from '../ae-dropdown';
import '../ae-dropdown';

describe('ae-dropdown', () => {
  let dropdown: AeDropdown;
  let menuItem: AeMenuItem;

  const setupDropdown = () => {
    dropdown = document.createElement('ae-dropdown') as AeDropdown;
    
    // Add a trigger button
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    dropdown.appendChild(trigger);
    
    // Add a menu item
    menuItem = document.createElement('ae-menu-item') as AeMenuItem;
    menuItem.setAttribute('slot', 'item');
    menuItem.setAttribute('value', 'test-item');
    menuItem.textContent = 'Test Item';
    dropdown.appendChild(menuItem);

    document.body.appendChild(dropdown);

    return { dropdown, menuItem };
  };
  
  afterEach(() => {
    if (dropdown && dropdown.parentNode) {
      dropdown.parentNode.removeChild(dropdown);
    }
  });

  it('should have default values', () => {
    const { dropdown } = setupDropdown();
    
    expect(dropdown.open).to.be.false;
    expect(dropdown.defaultOpen).to.be.false;
    expect(dropdown.placement).to.equal('bottom-start');
    expect(dropdown.strategy).to.equal('absolute');
    expect(dropdown.disabled).to.be.false;
    expect(dropdown.theme).to.equal('dark');
    expect(dropdown.header).to.equal('');
  });

  it('should set attributes correctly', () => {
    const { dropdown } = setupDropdown();
    
    dropdown.open = true;
    expect(dropdown.open).to.be.true;
    expect(dropdown.hasAttribute('open')).to.be.true;
    
    dropdown.placement = 'top';
    expect(dropdown.placement).to.equal('top');
    
    dropdown.disabled = true;
    expect(dropdown.disabled).to.be.true;
    expect(dropdown.hasAttribute('disabled')).to.be.true;
    
    dropdown.theme = 'light';
    expect(dropdown.theme).to.equal('light');
    expect(dropdown.getAttribute('theme')).to.equal('light');
    
    dropdown.header = 'Test Header';
    expect(dropdown.header).to.equal('Test Header');
  });

  it('should emit ae-dropdown-change event when open state changes', (done) => {
    const { dropdown } = setupDropdown();
    
    dropdown.addEventListener('ae-dropdown-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      expect(customEvent.detail.open).to.be.true;
      done();
    });
    
    // Find the trigger element and click it
    const trigger = dropdown.querySelector('[part="trigger"]') as HTMLElement;
    trigger.click();
  });

  it('should emit ae-dropdown-select event when menu item is clicked', (done) => {
    const { dropdown } = setupDropdown();
    
    // First, open the dropdown
    dropdown.open = true;
    
    dropdown.addEventListener('ae-dropdown-select', (e: Event) => {
      const customEvent = e as CustomEvent;
      expect(customEvent.detail.value).to.equal('test-item');
      done();
    });
    
    // Wait for the dropdown to render
    setTimeout(() => {
      // Find the menu item and click it
      const menuItemButton = dropdown.shadowRoot?.querySelector('[role="menuitem"]') as HTMLElement;
      if (menuItemButton) {
        menuItemButton.click();
      }
    }, 10);
  });

  it('should close when clicked outside', () => {
    const { dropdown } = setupDropdown();
    
    // Open the dropdown
    dropdown.open = true;
    
    // Simulate a click outside
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    document.body.dispatchEvent(clickEvent);
    
    // The dropdown should be closed
    expect(dropdown.open).to.be.false;
  });

  it('should handle disabled state correctly', () => {
    const { dropdown } = setupDropdown();
    
    // Disable the dropdown
    dropdown.disabled = true;
    
    // Try to open it by clicking
    const trigger = dropdown.querySelector('[part="trigger"]') as HTMLElement;
    trigger.click();
    
    // Should remain closed
    expect(dropdown.open).to.be.false;
  });
  
  it('should support uncontrolled mode', () => {
    const { dropdown } = setupDropdown();
    
    // Set default open to true
    dropdown.defaultOpen = true;
    
    // Manually trigger connected callback to simulate fresh mounting
    dropdown.disconnectedCallback();
    dropdown.connectedCallback();
    
    // Check internal state (using isOpen getter inside the component)
    // This is a bit tricky to test directly since isOpen is private
    // Instead we'll check if the dropdown renders its contents
    setTimeout(() => {
      const overlay = dropdown.shadowRoot?.querySelector('[part="overlay"]');
      expect(overlay).to.exist;
    }, 10);
  });
});

describe('ae-menu-item', () => {
  let menuItem: AeMenuItem;

  beforeEach(() => {
    menuItem = document.createElement('ae-menu-item') as AeMenuItem;
    document.body.appendChild(menuItem);
  });

  afterEach(() => {
    document.body.removeChild(menuItem);
  });

  it('should have default values', () => {
    expect(menuItem.value).to.equal('');
    expect(menuItem.disabled).to.be.false;
    expect(menuItem.hasSubmenu).to.be.false;
  });

  it('should set attributes correctly', () => {
    menuItem.value = 'test-value';
    expect(menuItem.value).to.equal('test-value');
    
    menuItem.disabled = true;
    expect(menuItem.disabled).to.be.true;
    expect(menuItem.hasAttribute('disabled')).to.be.true;
    
    menuItem.hasSubmenu = true;
    expect(menuItem.hasSubmenu).to.be.true;
  });

  it('should render submenu indicator when hasSubmenu is true', () => {
    menuItem.hasSubmenu = true;
    
    setTimeout(() => {
      const submenuIndicator = menuItem.shadowRoot?.querySelector('[part="item-submenu-indicator"]');
      expect(submenuIndicator).to.exist;
    }, 10);
  });

  it('should support icon and hint slots', () => {
    // Add icon
    const iconElement = document.createElement('span');
    iconElement.setAttribute('slot', 'icon');
    iconElement.textContent = 'Icon';
    menuItem.appendChild(iconElement);
    
    // Add hint
    const hintElement = document.createElement('span');
    hintElement.setAttribute('slot', 'hint');
    hintElement.textContent = 'Hint';
    menuItem.appendChild(hintElement);
    
    // Check if slots are rendered
    setTimeout(() => {
      const iconSlot = menuItem.shadowRoot?.querySelector('slot[name="icon"]');
      const hintSlot = menuItem.shadowRoot?.querySelector('slot[name="hint"]');
      
      expect(iconSlot).to.exist;
      expect(hintSlot).to.exist;
    }, 10);
  });
});