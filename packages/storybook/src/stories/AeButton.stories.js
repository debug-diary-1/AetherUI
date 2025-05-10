import { html } from 'lit';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    hasIcon: {
      control: 'boolean',
      description: 'Whether to show an icon',
      if: { arg: 'iconOnly', truthy: false },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'The position of the icon',
      if: { arg: 'hasIcon', truthy: true },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether to show only the icon',
    },
    label: {
      control: 'text',
      description: 'The button label',
      if: { arg: 'iconOnly', truthy: false },
    },
  },
  render: (args) => {
    return html`
      <ae-button
        variant="${args.variant}"
        size="${args.size}"
        ?disabled="${args.disabled}"
        icon-position="${args.iconPosition}"
        ?icon-only="${args.iconOnly}"
        aria-label="${args.iconOnly ? 'Icon Button' : ''}"
      >
        ${args.hasIcon && args.iconPosition === 'start' && !args.iconOnly
          ? html`
              <svg
                slot="icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            `
          : ''}
        ${!args.iconOnly ? args.label : ''}
        ${args.hasIcon && args.iconPosition === 'end' && !args.iconOnly
          ? html`
              <svg
                slot="icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            `
          : ''}
        ${args.iconOnly
          ? html`
              <svg
                slot="icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            `
          : ''}
      </ae-button>
    `;
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    hasIcon: false,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    hasIcon: false,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Secondary Button',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: false,
    hasIcon: false,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Ghost Button',
  },
};

export const WithIconStart = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    hasIcon: true,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Button with Icon',
  },
};

export const WithIconEnd = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    hasIcon: true,
    iconPosition: 'end',
    iconOnly: false,
    label: 'Button with Icon',
  },
};

export const IconOnly = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconOnly: true,
  },
};

export const SmallSize = {
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    hasIcon: false,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Small Button',
  },
};

export const LargeSize = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    hasIcon: false,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Large Button',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    hasIcon: false,
    iconPosition: 'start',
    iconOnly: false,
    label: 'Disabled Button',
  },
};

export const ButtonGroup = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <ae-button variant="primary">Save</ae-button>
      <ae-button variant="secondary">Cancel</ae-button>
      <ae-button variant="ghost">Reset</ae-button>
    </div>
  `,
};

export const AllVariants = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px;">
        <ae-button variant="primary">Primary</ae-button>
        <ae-button variant="secondary">Secondary</ae-button>
        <ae-button variant="ghost">Ghost</ae-button>
      </div>

      <div style="display: flex; gap: 8px;">
        <ae-button variant="primary" disabled>Primary Disabled</ae-button>
        <ae-button variant="secondary" disabled>Secondary Disabled</ae-button>
        <ae-button variant="ghost" disabled>Ghost Disabled</ae-button>
      </div>
    </div>
  `,
};
