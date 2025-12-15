import { html } from 'lit';

export default {
  title: 'Components/Progress',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Progress variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar size',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate/loading state',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    striped: {
      control: 'boolean',
      description: 'Striped pattern',
    },
    animated: {
      control: 'boolean',
      description: 'Animate stripes',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the progress bar',
    },
  },
};

export const Default = {
  args: {
    value: 60,
    variant: 'primary',
    size: 'md',
    indeterminate: false,
    showLabel: false,
    striped: false,
    animated: false,
    ariaLabel: 'Task progress',
  },
  render: (args) => html`
    <ae-progress
      value="${args.value}"
      variant="${args.variant}"
      size="${args.size}"
      ?indeterminate="${args.indeterminate}"
      ?show-label="${args.showLabel}"
      ?striped="${args.striped}"
      ?animated="${args.animated}"
      aria-label="${args.ariaLabel || 'Progress'}"
    ></ae-progress>
  `,
};

export const WithLabel = {
  args: {
    ...Default.args,
    showLabel: true,
  },
  render: Default.render,
};

export const AllVariants = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ae-progress value="75" variant="primary" show-label aria-label="Primary progress"></ae-progress>
      <ae-progress value="60" variant="secondary" show-label aria-label="Secondary progress"></ae-progress>
      <ae-progress value="90" variant="success" show-label aria-label="Success progress"></ae-progress>
      <ae-progress value="45" variant="warning" show-label aria-label="Warning progress"></ae-progress>
      <ae-progress value="30" variant="error" show-label aria-label="Error progress"></ae-progress>
      <ae-progress value="50" variant="info" show-label aria-label="Info progress"></ae-progress>
    </div>
  `,
};

export const Indeterminate = {
  args: {
    ...Default.args,
    indeterminate: true,
  },
  render: Default.render,
};

export const Striped = {
  args: {
    ...Default.args,
    value: 70,
    striped: true,
  },
  render: Default.render,
};

export const StripedAnimated = {
  args: {
    ...Default.args,
    value: 70,
    striped: true,
    animated: true,
  },
  render: Default.render,
};
