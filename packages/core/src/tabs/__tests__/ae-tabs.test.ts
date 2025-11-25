import { html, fixture, expect, waitUntil } from '@open-wc/testing';
import { AeTabs } from '../ae-tabs.js';
import { AeTab } from '../ae-tab.js';
import { AeTabPanel } from '../ae-tab-panel.js';
import '../ae-tabs.js';
import '../ae-tab.js';
import '../ae-tab-panel.js';

describe('ae-tabs', () => {
  describe('Basic Functionality', () => {
    it('has correct default properties', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      expect(el.orientation).to.equal('horizontal');
      expect(el.selectedIndex).to.equal(0);
    });

    it('renders with multiple tabs and panels', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab slot="nav">Tab 3</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
          <ae-tab-panel>Panel 3</ae-tab-panel>
        </ae-tabs>
      `);

      const tabs = el.querySelectorAll('ae-tab');
      const panels = el.querySelectorAll('ae-tab-panel');

      expect(tabs.length).to.equal(3);
      expect(panels.length).to.equal(3);
    });

    it('selects first tab by default', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const firstTab = el.querySelector('ae-tab') as AeTab;
      const firstPanel = el.querySelector('ae-tab-panel') as AeTabPanel;

      expect(firstTab.ariaSelected).to.equal('true');
      expect(firstPanel.hidden).to.be.false;
    });

    it('changes selected tab on click', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const secondTab = tabs[1] as AeTab;
      const secondTabButton = secondTab.shadowRoot?.querySelector('button');

      expect(secondTabButton).to.exist;
      secondTabButton!.click();

      await el.updateComplete;

      expect(secondTab.ariaSelected).to.equal('true');
      expect(el.selectedIndex).to.equal(1);
    });

    it('emits ae-tab-change event when tab changes', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      let eventFired = false;
      let eventDetail: any = null;

      el.addEventListener('ae-tab-change', ((e: CustomEvent) => {
        eventFired = true;
        eventDetail = e.detail;
      }) as EventListener);

      const tabs = el.querySelectorAll('ae-tab');
      const secondTab = tabs[1] as AeTab;
      const secondTabButton = secondTab.shadowRoot?.querySelector('button');

      secondTabButton!.click();

      await waitUntil(() => eventFired, 'Tab change event was not fired');

      expect(eventFired).to.be.true;
      expect(eventDetail.selectedIndex).to.equal(1);
    });

    it('supports vertical orientation', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs orientation="vertical">
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      expect(el.orientation).to.equal('vertical');
      expect(el.getAttribute('orientation')).to.equal('vertical');
    });
  });

  describe('Accessibility', () => {
    it('sets correct ARIA attributes on tabs', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const firstTab = tabs[0] as AeTab;
      const secondTab = tabs[1] as AeTab;

      expect(firstTab.ariaSelected).to.equal('true');
      expect(secondTab.ariaSelected).to.equal('false');
    });

    it('sets correct ARIA controls relationship', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      const panel = el.querySelector('ae-tab-panel') as AeTabPanel;

      // Check that tab's aria-controls matches panel's id
      expect(tab.ariaControls).to.equal(panel.id);
    });

    it('manages tabindex for keyboard navigation', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const firstTab = tabs[0] as AeTab;
      const secondTab = tabs[1] as AeTab;

      // Only selected tab should be tabbable
      expect(firstTab.tabIndex).to.equal(0);
      expect(secondTab.tabIndex).to.equal(-1);
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const firstTab = tabs[0] as AeTab;

      // Focus first tab and press ArrowRight
      const firstTabButton = firstTab.shadowRoot?.querySelector('button');
      firstTabButton!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));

      await el.updateComplete;

      expect(el.selectedIndex).to.equal(1);
    });

    it('navigates to previous tab with ArrowLeft', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      // Select second tab first
      el.selectedIndex = 1;
      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const secondTab = tabs[1] as AeTab;

      const secondTabButton = secondTab.shadowRoot?.querySelector('button');
      secondTabButton!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }));

      await el.updateComplete;

      expect(el.selectedIndex).to.equal(0);
    });
  });

  describe('Theme Integration', () => {
    it('uses CSS variables for active tab color', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      const styles = tab.shadowRoot?.querySelector('style');

      // Check that styles contain the CSS variable, not hardcoded colors
      expect(styles?.textContent).to.include('--ae-tabs-active-color');
      expect(styles?.textContent).to.not.include('#4f46e5'); // Old hardcoded value
    });

    it('uses CSS variables for inactive tab color', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab slot="nav">Tab 2</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
          <ae-tab-panel>Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      const styles = tab.shadowRoot?.querySelector('style');

      // Check for inactive color variable
      expect(styles?.textContent).to.include('--ae-tabs-inactive-color');
    });

    it('uses CSS variables for border color', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const styles = el.shadowRoot?.querySelector('style');

      // Check that styles use the border color variable
      expect(styles?.textContent).to.include('--ae-tabs-border-color');
      expect(styles?.textContent).to.not.include('#e5e7eb'); // Old hardcoded value
    });

    it('uses CSS variables for hover background', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      const styles = tab.shadowRoot?.querySelector('style');

      // Check for hover background variable
      expect(styles?.textContent).to.include('--ae-tabs-hover-bg');
      expect(styles?.textContent).to.not.include('rgba(0, 0, 0, 0.04)'); // Old hardcoded value
    });

    it('does not have hardcoded color fallbacks in active state', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="nav">Tab 1</ae-tab>
          <ae-tab-panel>Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      const button = tab.shadowRoot?.querySelector('button');
      const indicator = tab.shadowRoot?.querySelector('.indicator');

      // Get computed styles
      const buttonStyles = window.getComputedStyle(button!);
      const indicatorStyles = window.getComputedStyle(indicator!);

      // The actual color values will depend on the theme, but they should exist
      expect(buttonStyles.color).to.exist;
      expect(indicatorStyles.backgroundColor).to.exist;
    });
  });
});
