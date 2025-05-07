import { html } from 'lit';

// Simple button story that doesn't rely on the component imports
export default {
  title: 'Examples/Simple Button',
  tags: ['autodocs'],
  render: (args) => html`
    <button
      style="
        background-color: ${args.variant === 'primary' ? 'blue' : 'transparent'};
        color: ${args.variant === 'primary' ? 'white' : 'blue'};
        padding: ${args.size === 'sm'
        ? '8px 16px'
        : args.size === 'lg'
          ? '16px 32px'
          : '12px 24px'};
        border: 2px solid blue;
        border-radius: 4px;
        cursor: ${args.disabled ? 'not-allowed' : 'pointer'};
        opacity: ${args.disabled ? '0.7' : '1'};
        display: flex;
        align-items: center;
        gap: 8px;
        ${args.iconOnly ? 'aspect-ratio: 1/1; padding: 8px;' : ''}
      "
      ?disabled=${args.disabled}
    >
      ${args.iconPosition === 'start' && args.hasIcon
        ? html`
            <svg
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
      ${args.iconPosition === 'end' && args.hasIcon
        ? html`
            <svg
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
    </button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    hasIcon: {
      control: { type: 'boolean' },
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
      control: { type: 'boolean' },
      description: 'Whether to show only the icon',
    },
    label: {
      control: { type: 'text' },
      description: 'The button label',
      if: { arg: 'iconOnly', truthy: false },
    },
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

export const Small = {
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

export const Large = {
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

export const ButtonGroup = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <button
        style="background-color: blue; color: white; padding: 12px 24px; border: 2px solid blue; border-radius: 4px;"
      >
        Save
      </button>
      <button
        style="background-color: transparent; color: blue; padding: 12px 24px; border: 2px solid blue; border-radius: 4px;"
      >
        Cancel
      </button>
      <button
        style="background-color: transparent; color: blue; padding: 12px 24px; border: none; border-radius: 4px;"
      >
        Reset
      </button>
    </div>
  `,
};
