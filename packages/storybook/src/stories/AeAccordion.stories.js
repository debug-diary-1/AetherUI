import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Import from the accordion module in the core package
import '@aetherui/core/accordion';

// Make sure both components are registered
if (!customElements.get('ae-accordion')) {
  throw new Error('ae-accordion component is not registered');
}
if (!customElements.get('ae-accordion-item')) {
  throw new Error('ae-accordion-item component is not registered');
}

export default {
  title: 'Components/Accordion',
  component: 'ae-accordion',
  tags: ['autodocs'],
  argTypes: {
    multiselectable: {
      control: { type: 'boolean' },
      description: 'Allow multiple panels to be open simultaneously',
    },
    initialOpenPanel: {
      control: { type: 'select', options: ['none', 'first', 'second', 'third'] },
      description: 'Which panel should be initially open',
    },
  },
};

// Default accordion group example (single selection mode)
export const Default = {
  args: {
    multiselectable: false,
    initialOpenPanel: 'first' // Only this panel should be open initially
  },
  render: (args) => {
    // Only set open on the selected panel
    const initialPanel = args.initialOpenPanel;
    
    return html`
      <div style="max-width: 600px;">
        <p style="margin-bottom: 1rem; font-family: system-ui, sans-serif; color: #666;">
          This is the default accordion in <strong>single selection mode</strong>. 
          Only one panel can be open at a time. Opening a new panel will close any currently open panel.
        </p>
        
        <!-- Force single select by setting expanded prop explicitly -->
        <ae-accordion 
          ?multiselectable=${args.multiselectable}
          .expanded=${initialPanel ? [initialPanel] : []}
        >
          <ae-accordion-item data-header-id="first">
            <div slot="header">What is AetherUI?</div>
            <div>
              AetherUI is a lightweight, accessible web component library built with Lit.
              It provides a set of reusable UI components that are easy to customize and integrate into any web project.
            </div>
          </ae-accordion-item>

          <ae-accordion-item data-header-id="second">
            <div slot="header">How do I install AetherUI?</div>
            <div>
              You can install AetherUI using npm or yarn:
              <pre>npm install @aetherui/core</pre>
              <p>Then import and use the components in your application.</p>
            </div>
          </ae-accordion-item>

          <ae-accordion-item data-header-id="third">
            <div slot="header">Can I customize the styles?</div>
            <div>
              Yes! AetherUI components are designed to be highly customizable through CSS custom properties (variables).
              You can easily change colors, sizing, spacing, and more to match your design system.
            </div>
          </ae-accordion-item>
        </ae-accordion>
      </div>
    `;
  },
};

// Single accordion item
export const SingleItem = {
  args: {
    open: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="max-width: 600px;">
      <ae-accordion-item 
        ?open=${args.open} 
        ?disabled=${args.disabled}
      >
        <div slot="header">Expandable Section</div>
        <div>
          This is a single accordion item. It can be used on its own without being wrapped in an accordion container.
          When used alone, it maintains its own state independently.
        </div>
      </ae-accordion-item>
    </div>
  `,
};

// Multiselectable accordion
export const Multiselectable = {
  render: () => html`
    <div style="max-width: 600px;">
      <p style="margin-bottom: 1rem; font-family: system-ui, sans-serif; color: #666;">
        This accordion uses <strong>multiselectable mode</strong>, which allows multiple panels to be open simultaneously.
        Try opening all sections at once!
      </p>
      <ae-accordion multiselectable>
        <ae-accordion-item data-header-id="multi-1">
          <div slot="header">First Section</div>
          <div>
            This is the content for the first section. You can open this panel without closing others.
          </div>
        </ae-accordion-item>

        <ae-accordion-item data-header-id="multi-2">
          <div slot="header">Second Section</div>
          <div>
            This is the content for the second section. Multiple sections can be open at the same time.
          </div>
        </ae-accordion-item>

        <ae-accordion-item data-header-id="multi-3">
          <div slot="header">Third Section</div>
          <div>
            This is the content for the third section. The multiselectable accordion does not enforce
            single selection behavior.
          </div>
        </ae-accordion-item>
      </ae-accordion>
    </div>
  `,
};

// Disabled accordion item
export const Disabled = {
  render: () => html`
    <div style="max-width: 600px;">
      <ae-accordion>
        <ae-accordion-item data-header-id="disabled-1">
          <div slot="header">Available Section</div>
          <div>This section can be opened and closed normally.</div>
        </ae-accordion-item>

        <ae-accordion-item data-header-id="disabled-2" disabled>
          <div slot="header">Disabled Section</div>
          <div>This section is disabled and cannot be toggled.</div>
        </ae-accordion-item>

        <ae-accordion-item data-header-id="disabled-3">
          <div slot="header">Another Available Section</div>
          <div>This section can be opened and closed normally.</div>
        </ae-accordion-item>
      </ae-accordion>
    </div>
  `,
};

// Rich HTML content in accordion
export const WithHtmlContent = {
  render: () => {
    const richContent = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4 style="margin: 0; color: #5e7ce2;">Rich HTML Content</h4>
        <p>This accordion contains <strong>formatted content</strong> with various elements.</p>
        <div style="background: #f5f7ff; padding: 12px; border-radius: 4px; border-left: 3px solid #5e7ce2;">
          <code>You can include code examples, callouts, and other rich content.</code>
        </div>
        <ul>
          <li>List item with <a href="#" style="color: #5e7ce2; text-decoration: none;">hyperlink</a></li>
          <li>Another list item</li>
          <li>A third list item</li>
        </ul>
      </div>
    `;

    return html`
      <div style="max-width: 600px;">
        <ae-accordion .expanded=${['rich-1']}>
          <ae-accordion-item data-header-id="rich-1">
            <div slot="header">Accordion with Rich Content</div>
            <div>
              ${unsafeHTML(richContent)}
            </div>
          </ae-accordion-item>

          <ae-accordion-item data-header-id="rich-2">
            <div slot="header">Another Section</div>
            <div>This is a standard text section for comparison.</div>
          </ae-accordion-item>
        </ae-accordion>
      </div>
    `;
  },
};