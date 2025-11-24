import { html } from 'lit';
import { expect, within, userEvent, waitFor } from '@storybook/test';

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Badge variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    dot: {
      control: 'boolean',
      description: 'Display as dot indicator',
    },
    outline: {
      control: 'boolean',
      description: 'Outline style',
    },
    content: {
      control: 'text',
      description: 'Badge content',
    },
  },
};

export const Default = {
  args: {
    variant: 'primary',
    size: 'md',
    closable: true,
    dot: false,
    outline: false,
    content: 'Badge',
  },
  render: (args) => html`
    <ae-badge
      variant="${args.variant}"
      size="${args.size}"
      ?closable="${args.closable}"
      ?dot="${args.dot}"
      ?outline="${args.outline}"
      @ae-badge-close="${() => console.log('Badge closed')}"
    >
      ${args.content}
    </ae-badge>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the badge element
    const aeBadge = canvasElement.querySelector('ae-badge');
    expect(aeBadge).toBeInTheDocument();

    // Verify badge content is visible
    const base = aeBadge.shadowRoot.querySelector('[part="base"]');
    expect(base).toBeTruthy();

    // Verify variant attribute is set
    expect(aeBadge.getAttribute('variant')).toBe('primary');

    // Find and click close button
    const closeButton = aeBadge.shadowRoot.querySelector('[part="close-button"]');
    expect(closeButton).toBeTruthy();

    await userEvent.click(closeButton);

    // Badge should emit close event (verified by console.log in template)
  },
};

export const AllVariants = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <ae-badge variant="primary">Primary</ae-badge>
      <ae-badge variant="secondary">Secondary</ae-badge>
      <ae-badge variant="success">Success</ae-badge>
      <ae-badge variant="warning">Warning</ae-badge>
      <ae-badge variant="error">Error</ae-badge>
      <ae-badge variant="info">Info</ae-badge>
    </div>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ae-badge size="sm" variant="primary">Small</ae-badge>
      <ae-badge size="md" variant="primary">Medium</ae-badge>
      <ae-badge size="lg" variant="primary">Large</ae-badge>
    </div>
  `,
};

export const Outline = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <ae-badge variant="primary" outline>Primary</ae-badge>
      <ae-badge variant="success" outline>Success</ae-badge>
      <ae-badge variant="warning" outline>Warning</ae-badge>
      <ae-badge variant="error" outline>Error</ae-badge>
    </div>
  `,
};

export const Closable = {
  args: {
    ...Default.args,
    closable: true,
    content: 'Closable Badge',
  },
  render: Default.render,
};

export const DotIndicator = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <ae-badge variant="primary" dot></ae-badge>
      <ae-badge variant="success" dot></ae-badge>
      <ae-badge variant="warning" dot></ae-badge>
      <ae-badge variant="error" dot></ae-badge>
    </div>
  `,
};
