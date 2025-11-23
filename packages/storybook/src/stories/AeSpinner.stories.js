import { html } from 'lit';

export default {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Spinner color variant',
    },
    label: {
      control: 'text',
      description: 'Accessible label',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading...',
  },
  render: (args) => html`
    <ae-spinner
      size="${args.size}"
      variant="${args.variant}"
      label="${args.label}"
    ></ae-spinner>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <ae-spinner size="xs"></ae-spinner>
      <ae-spinner size="sm"></ae-spinner>
      <ae-spinner size="md"></ae-spinner>
      <ae-spinner size="lg"></ae-spinner>
      <ae-spinner size="xl"></ae-spinner>
    </div>
  `,
};

export const AllVariants = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <ae-spinner variant="primary"></ae-spinner>
      <ae-spinner variant="secondary"></ae-spinner>
      <ae-spinner variant="success"></ae-spinner>
      <ae-spinner variant="warning"></ae-spinner>
      <ae-spinner variant="error"></ae-spinner>
      <ae-spinner variant="info"></ae-spinner>
    </div>
  `,
};

export const WithText = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ae-spinner size="sm"></ae-spinner>
      <span>Loading content...</span>
    </div>
  `,
};
