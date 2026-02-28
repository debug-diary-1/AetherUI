import { html } from 'lit';
import { expect, within, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Components/Popover',
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'manual'],
      description: 'Trigger mode',
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Popover placement',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Close on outside click',
    },
  },
};

export const ClickTrigger = {
  args: {
    trigger: 'click',
    placement: 'bottom',
    arrow: true,
    closeOnClickOutside: true,
  },
  render: (args) => html`
    <ae-popover
      trigger="${args.trigger}"
      placement="${args.placement}"
      ?arrow="${args.arrow}"
      ?close-on-click-outside="${args.closeOnClickOutside}"
    >
      <button slot="trigger">Click me</button>
      <div style="padding: 1rem;">
        <p style="margin: 0;">This is popover content!</p>
      </div>
    </ae-popover>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the popover element
    const aePopover = canvasElement.querySelector('ae-popover');
    expect(aePopover).toBeInTheDocument();

    // Initially closed
    expect(aePopover.open).toBe(false);

    // Find and click the trigger button in shadow DOM
    const trigger = aePopover.shadowRoot.querySelector('[part="trigger"]');
    expect(trigger).toBeTruthy();
    await userEvent.click(trigger);

    // Wait for popover to open
    await waitFor(() => {
      expect(aePopover.open).toBe(true);
    });

    // Verify popover content is visible
    const popoverContent = aePopover.shadowRoot.querySelector('[part="popover"]');
    expect(popoverContent).toBeTruthy();

    // Click again to close
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(aePopover.open).toBe(false);
    });
  },
};

export const HoverTrigger = {
  args: {
    trigger: 'hover',
    placement: 'top',
    arrow: true,
  },
  render: (args) => html`
    <ae-popover
      trigger="${args.trigger}"
      placement="${args.placement}"
      ?arrow="${args.arrow}"
    >
      <button slot="trigger">Hover me</button>
      <div style="padding: 1rem;">
        <p style="margin: 0;">Hover popover content</p>
      </div>
    </ae-popover>
  `,
};

export const AllPlacements = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; padding: 4rem;">
      <ae-popover trigger="click" placement="top">
        <button slot="trigger">Top</button>
        <div style="padding: 0.5rem;">Top placement</div>
      </ae-popover>

      <ae-popover trigger="click" placement="bottom">
        <button slot="trigger">Bottom</button>
        <div style="padding: 0.5rem;">Bottom placement</div>
      </ae-popover>

      <ae-popover trigger="click" placement="left">
        <button slot="trigger">Left</button>
        <div style="padding: 0.5rem;">Left placement</div>
      </ae-popover>

      <ae-popover trigger="click" placement="right">
        <button slot="trigger">Right</button>
        <div style="padding: 0.5rem;">Right placement</div>
      </ae-popover>
    </div>
  `,
};

export const WithoutArrow = {
  args: {
    trigger: 'click',
    placement: 'bottom',
    arrow: false,
  },
  render: ClickTrigger.render,
};
