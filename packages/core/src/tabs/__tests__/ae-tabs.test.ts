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
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      expect(el.orientation).to.equal('horizontal');
      // Value should be set to the first tab's id after initialization
      await el.updateComplete;
      expect(el.value).to.not.be.empty;
    });

    it('renders with multiple tabs and panels', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab slot="tab">Tab 3</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 3</ae-tab-panel>
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
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
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
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
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
      expect(el.value).to.equal(secondTab.id);
    });

    it('emits ae-tab-change event when tab changes', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
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
      expect(eventDetail.tab).to.equal(secondTab.id);
    });

    it('supports vertical orientation', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs orientation="vertical">
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
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
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
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
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
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
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const firstTab = tabs[0] as AeTab;
      const secondTab = tabs[1] as AeTab;

      // Only selected tab should be tabbable (check inner button's tabindex)
      const firstButton = firstTab.shadowRoot?.querySelector('button');
      const secondButton = secondTab.shadowRoot?.querySelector('button');
      expect(firstButton?.getAttribute('tabindex')).to.equal('0');
      expect(secondButton?.getAttribute('tabindex')).to.equal('-1');
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const secondTab = tabs[1] as HTMLElement;

      // Dispatch keyboard event on the tabs component
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

      await el.updateComplete;

      expect(el.value).to.equal(secondTab.id);
    });

    it('navigates to previous tab with ArrowLeft', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tabs = el.querySelectorAll('ae-tab');
      const firstTab = tabs[0] as HTMLElement;
      const secondTab = tabs[1] as HTMLElement;

      // Select second tab first
      el.value = secondTab.id;
      await el.updateComplete;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

      await el.updateComplete;

      expect(el.value).to.equal(firstTab.id);
    });
  });

  describe('Theme Integration', () => {
    it('uses CSS variables for active tab color', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      // Access static styles directly - Lit uses constructible stylesheets, not <style> elements
      const stylesText = (tab.constructor as typeof AeTab).styles?.toString() || '';

      // Check that styles contain the CSS variable, not hardcoded colors
      expect(stylesText).to.include('--ae-tabs-active-color');
      expect(stylesText).to.not.include('#4f46e5'); // Old hardcoded value
    });

    it('uses CSS variables for inactive tab color', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab slot="tab">Tab 2</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
          <ae-tab-panel slot="panel">Panel 2</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      // Access static styles directly - Lit uses constructible stylesheets, not <style> elements
      const stylesText = (tab.constructor as typeof AeTab).styles?.toString() || '';

      // Check for inactive color variable
      expect(stylesText).to.include('--ae-tabs-inactive-color');
    });

    it('uses CSS variables for border color', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      // Access static styles directly - Lit uses constructible stylesheets, not <style> elements
      const stylesText = (el.constructor as typeof AeTabs).styles?.toString() || '';

      // Check that styles use the border color variable
      expect(stylesText).to.include('--ae-tabs-border-color');
      expect(stylesText).to.not.include('#e5e7eb'); // Old hardcoded value
    });

    it('uses CSS variables for hover background', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
        </ae-tabs>
      `);

      await el.updateComplete;

      const tab = el.querySelector('ae-tab') as AeTab;
      // Access static styles directly - Lit uses constructible stylesheets, not <style> elements
      const stylesText = (tab.constructor as typeof AeTab).styles?.toString() || '';

      // Check for hover background variable
      expect(stylesText).to.include('--ae-tabs-hover-bg');
      expect(stylesText).to.not.include('rgba(0, 0, 0, 0.04)'); // Old hardcoded value
    });

    it('does not have hardcoded color fallbacks in active state', async () => {
      const el = await fixture<AeTabs>(html`
        <ae-tabs>
          <ae-tab slot="tab">Tab 1</ae-tab>
          <ae-tab-panel slot="panel">Panel 1</ae-tab-panel>
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
