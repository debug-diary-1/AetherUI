import { html } from 'lit-html';
import { expect, within, userEvent, waitFor } from '@storybook/test';

export default {
  title: 'Components/Tooltip',
  component: 'ae-tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight tooltip component that shows contextual information on hover/focus',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to display in the tooltip',
      defaultValue: 'This is a tooltip',
    },
    open: {
      control: 'boolean',
      description: 'Whether the tooltip is currently visible',
      defaultValue: false,
    },
    hoverDelay: {
      control: 'number',
      description: 'Delay in milliseconds before showing on hover',
      defaultValue: 100,
    },
    hideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding on mouse leave',
      defaultValue: 100,
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Preferred placement position',
      defaultValue: 'top',
    },
    strategy: {
      control: 'select',
      options: ['absolute', 'fixed'],
      description: 'Positioning strategy',
      defaultValue: 'absolute',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
      defaultValue: false,
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow indicator',
      defaultValue: true,
    },
    animation: {
      control: 'select',
      options: ['fade', 'scale'],
      description: 'Animation type',
      defaultValue: 'fade',
    },
    content: {
      control: 'text',
      description: 'Content to wrap with the tooltip (slot)',
      defaultValue: 'Hover me',
      table: {
        category: 'Slots',
      },
    },
  },
  args: {
    text: 'This is a tooltip',
    hoverDelay: 100,
    hideDelay: 100,
    placement: 'top',
    strategy: 'absolute',
    disabled: false,
    showArrow: true,
    animation: 'fade',
    open: false,
    content: 'Hover me',
  },
};

// Default tooltip story
export const Default = {
  args: {
    text: 'This is a tooltip',
    hoverDelay: 100,
    hideDelay: 100,
    placement: 'top',
    strategy: 'absolute',
    disabled: false,
    showArrow: true,
    animation: 'fade',
    open: false,
    content: 'Hover me',
  },
  render: (args) => html`
    <div style="padding: 100px; text-align: center;">
      <ae-tooltip
        text="${args.text}"
        hover-delay="${args.hoverDelay}"
        hide-delay="${args.hideDelay}"
        placement="${args.placement}"
        strategy="${args.strategy}"
        ?disabled="${args.disabled}"
        ?show-arrow="${args.showArrow}"
        animation="${args.animation}"
        ?open="${args.open}"
      >
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          ${args.content}
        </button>
      </ae-tooltip>
    </div>
  `,
  play: async ({ canvasElement }) => {
    // Get the ae-tooltip element and access its shadow DOM
    const aeTooltip = canvasElement.querySelector('ae-tooltip');
    expect(aeTooltip).toBeInTheDocument();

    // Find the button that should trigger the tooltip
    const button = aeTooltip.querySelector('button');
    expect(button).toBeTruthy();

    // Initially tooltip should not be open
    expect(aeTooltip.open).toBe(false);

    // Hover over the button
    await userEvent.hover(button);

    // Wait for the tooltip to appear (accounting for hover delay)
    await waitFor(() => {
      expect(aeTooltip.open).toBe(true);
    }, { timeout: 500 });

    // Verify tooltip overlay is rendered
    const overlay = aeTooltip.shadowRoot.querySelector('[part="overlay"]');
    expect(overlay).toBeTruthy();
    expect(overlay.getAttribute('role')).toBe('tooltip');

    // Verify tooltip content is correct
    const content = overlay.querySelector('[part="content"]');
    expect(content.textContent).toBe('This is a tooltip');

    // Verify arrow is present
    const arrow = aeTooltip.shadowRoot.querySelector('[part="arrow"]');
    expect(arrow).toBeTruthy();

    // Unhover to close tooltip
    await userEvent.unhover(button);

    // Wait for tooltip to close (accounting for hide delay)
    await waitFor(() => {
      expect(aeTooltip.open).toBe(false);
    }, { timeout: 500 });
  },
};

// Playground with all interactive controls
export const Playground = {
  args: {
    text: 'This is a customizable tooltip',
    hoverDelay: 100,
    hideDelay: 100,
    placement: 'top',
    strategy: 'absolute',
    disabled: false,
    showArrow: true,
    animation: 'fade',
    open: false,
    content: 'Hover or click me',
  },
  render: (args) => html`
    <div style="padding: 100px; text-align: center;">
      <ae-tooltip 
        text="${args.text}"
        hover-delay="${args.hoverDelay}"
        hide-delay="${args.hideDelay}"
        placement="${args.placement}"
        strategy="${args.strategy}"
        ?disabled="${args.disabled}"
        ?show-arrow="${args.showArrow}"
        animation="${args.animation}"
        ?open="${args.open}"
      >
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          ${args.content}
        </button>
      </ae-tooltip>
    </div>
  `,
};

// Different placements
export const Placements = {
  render: () => html`
    <div style="padding: 100px;">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; max-width: 600px; margin: 0 auto;">
        ${[
          'top',
          'right',
          'bottom',
          'left',
          'top-start',
          'top-end',
          'bottom-start',
          'bottom-end',
          'left-start',
          'left-end',
          'right-start',
          'right-end',
        ]
          .map(
            (placement) => html`
          <div style="text-align: center;">
            <ae-tooltip text="${placement}" placement="${placement}">
              <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
                ${placement}
              </button>
            </ae-tooltip>
          </div>
        `
          )}
      </div>
    </div>
  `,
};

// Animation types
export const Animations = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 40px; justify-content: center;">
      <ae-tooltip text="Fade animation" animation="fade">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Fade Animation
        </button>
      </ae-tooltip>
      
      <ae-tooltip text="Scale animation" animation="scale">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Scale Animation
        </button>
      </ae-tooltip>
    </div>
  `,
};

// Different delays
export const Delays = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 40px; justify-content: center;">
      <ae-tooltip text="No delay" hover-delay="0" hide-delay="0">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          No Delay
        </button>
      </ae-tooltip>
      
      <ae-tooltip text="Default delay" hover-delay="100" hide-delay="100">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Default Delay
        </button>
      </ae-tooltip>
      
      <ae-tooltip text="Long delay" hover-delay="500" hide-delay="500">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Long Delay
        </button>
      </ae-tooltip>
    </div>
  `,
};

// Different content types
export const ContentTypes = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 40px; justify-content: center; align-items: center;">
      <ae-tooltip text="Tooltip for a button">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Button
        </button>
      </ae-tooltip>
      
      <ae-tooltip text="Tooltip for a link">
        <a href="#" style="color: #0066cc; text-decoration: underline;">Link</a>
      </ae-tooltip>
      
      <ae-tooltip text="Tooltip for an icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </ae-tooltip>
      
      <ae-tooltip text="Tooltip for an image">
        <img src="https://via.placeholder.com/100x100" alt="Placeholder" style="width: 100px; height: 100px; cursor: pointer;">
      </ae-tooltip>
    </div>
  `,
};

// Disabled state
export const Disabled = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <ae-tooltip text="This tooltip is disabled" ?disabled="${true}">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Disabled Tooltip (won't show)
        </button>
      </ae-tooltip>
    </div>
  `,
};

// Without arrow
export const WithoutArrow = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <ae-tooltip text="Tooltip without arrow" ?show-arrow="${false}">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          No Arrow
        </button>
      </ae-tooltip>
    </div>
  `,
};

// Long content tooltip
export const LongContent = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <ae-tooltip text="This is a very long tooltip that contains a lot of information. The tooltip should wrap the text appropriately and remain readable.">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Long Tooltip Content
        </button>
      </ae-tooltip>
    </div>
  `,
};

// Programmatic control
export const ProgrammaticControl = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <ae-tooltip text="Programmatically controlled" id="programmatic-tooltip">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Target Element
        </button>
      </ae-tooltip>
      
      <div style="margin-top: 40px; display: flex; gap: 16px; justify-content: center;">
        <button @click="${() => document.getElementById('programmatic-tooltip').show()}" style="padding: 8px 16px; border: 1px solid #0066cc; background: #0066cc; color: white; cursor: pointer;">
          Show Tooltip
        </button>
        <button @click="${() => document.getElementById('programmatic-tooltip').hide()}" style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Hide Tooltip
        </button>
        <button @click="${() => document.getElementById('programmatic-tooltip').toggle()}" style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Toggle Tooltip
        </button>
      </div>
    </div>
  `,
};

// Accessibility example
export const Accessibility = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <p style="margin-bottom: 20px;">Tooltip properly announces to screen readers and can be dismissed with ESC key</p>
      <ae-tooltip text="This tooltip is accessible - press ESC to close">
        <button style="padding: 8px 16px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;">
          Accessible Button
        </button>
      </ae-tooltip>
    </div>
  `,
};