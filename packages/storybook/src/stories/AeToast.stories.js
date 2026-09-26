import { html } from 'lit';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { showToast, createToastHelpers } from '@aetherui-kit/core/toast';
import { createRef, ref } from 'lit/directives/ref.js';

export default {
  title: 'Components/AeToast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Ephemeral non-modal notifications that appear and disappear automatically. Designed for short, transient feedback.',
      },
    },
  },
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual styling preset',
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 1000 },
      description: 'Auto-dismiss duration in milliseconds (0 = sticky)',
    },
    placement: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Screen corner container',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause countdown when hovered',
    },
  },
};

// Convenience helpers for toast variants
const toast = createToastHelpers();

// Basic toast
export const Basic = (args) => {
  const showBasicToast = () => {
    showToast({
      message: args.message,
      variant: args.variant,
      duration: args.duration,
      placement: args.placement,
      pauseOnHover: args.pauseOnHover,
    });
  };

  return html` <button type="button" @click=${showBasicToast}>Show Toast</button> `;
};

Basic.args = {
  message: 'This is a simple toast notification',
  variant: 'info',
  duration: 5000,
  placement: 'bottom-right',
  pauseOnHover: true,
};

Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Find the button
  const button = canvas.getByText('Show Toast');
  expect(button).toBeInTheDocument();

  // Click to show toast
  await userEvent.click(button);

  // Wait for toast to appear in the DOM
  await waitFor(
    () => {
      const toast = document.querySelector('ae-toast');
      expect(toast).toBeTruthy();
    },
    { timeout: 2000 },
  );

  // Verify toast content
  const toast = document.querySelector('ae-toast');
  expect(toast.getAttribute('variant')).toBe('info');
};

// Toast variants
export const Variants = () => {
  return html`
    <style>
      .variants-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        min-width: 200px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ddd;
        background: white;
      }

      .info {
        color: #055160;
        border-color: #9eeaf9;
      }
      .success {
        color: #065f46;
        border-color: #a7f3d0;
      }
      .warning {
        color: #7a4d00;
        border-color: #fef3c7;
      }
      .error {
        color: #b71c1c;
        border-color: #fecaca;
      }
    </style>

    <div class="variants-container">
      <button class="info" @click=${() => toast.info('This is an information message')}>
        Show Info Toast
      </button>

      <button class="success" @click=${() => toast.success('Operation completed successfully!')}>
        Show Success Toast
      </button>

      <button
        class="warning"
        @click=${() => toast.warning('Warning: This action cannot be undone')}
      >
        Show Warning Toast
      </button>

      <button class="error" @click=${() => toast.error('Error: Something went wrong')}>
        Show Error Toast
      </button>
    </div>
  `;
};

// Placement options
export const Placement = () => {
  return html`
    <style>
      .placement-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ddd;
        background: white;
      }
    </style>

    <div class="placement-container">
      <button
        @click=${() =>
          showToast({
            message: 'Top Left Toast',
            placement: 'top-left',
          })}
      >
        Top Left
      </button>

      <button
        @click=${() =>
          showToast({
            message: 'Top Right Toast',
            placement: 'top-right',
          })}
      >
        Top Right
      </button>

      <button
        @click=${() =>
          showToast({
            message: 'Bottom Left Toast',
            placement: 'bottom-left',
          })}
      >
        Bottom Left
      </button>

      <button
        @click=${() =>
          showToast({
            message: 'Bottom Right Toast',
            placement: 'bottom-right',
          })}
      >
        Bottom Right
      </button>
    </div>
  `;
};

// Duration options
export const Duration = () => {
  return html`
    <style>
      .duration-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ddd;
        background: white;
      }
    </style>

    <div class="duration-container">
      <button
        @click=${() =>
          showToast({
            message: 'Quick toast - 2 seconds',
            duration: 2000,
          })}
      >
        Quick Toast (2s)
      </button>

      <button
        @click=${() =>
          showToast({
            message: 'Standard toast - 5 seconds',
            duration: 5000,
          })}
      >
        Standard Toast (5s)
      </button>

      <button
        @click=${() =>
          showToast({
            message: 'Long toast - 8 seconds',
            duration: 8000,
          })}
      >
        Long Toast (8s)
      </button>

      <button
        @click=${() =>
          showToast({
            message: 'Sticky toast - will not automatically dismiss',
            duration: 0,
          })}
      >
        Sticky Toast (No Auto-dismiss)
      </button>
    </div>
  `;
};

// Stacking multiple toasts
export const MultipleToasts = () => {
  const showMultipleToasts = () => {
    // Show multiple toasts with different variants
    toast.info('First notification');

    setTimeout(() => {
      toast.success('Second notification');
    }, 500);

    setTimeout(() => {
      toast.warning('Third notification');
    }, 1000);

    setTimeout(() => {
      toast.error('Fourth notification');
    }, 1500);
  };

  return html` <button @click=${showMultipleToasts}>Show Multiple Toasts</button> `;
};

// Rich content uses the component's public slot, not HTML strings in the text API.
export const CustomContentToast = () => {
  const notification = createRef();
  return html`
    <button @click=${() => (notification.value.open = true)}>Show Toast with Custom Content</button>
    <ae-toast ${ref(notification)} .open=${false} duration="8000" variant="info">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span aria-hidden="true">✉</span>
        <div>
          <strong>New Message</strong>
          <div>You have a new message from User123</div>
        </div>
      </div>
    </ae-toast>
  `;
};

export const VariantHelper = () => html`
  <button
    @click=${() =>
      toast.success('Your payment of $199.99 has been processed.', {
        duration: 7000,
        placement: 'top-right',
      })}
  >
    Show Toast with Success Helper
  </button>
`;

// PauseOnHover Demonstration
export const PauseOnHover = () => {
  return html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ddd;
        background: white;
      }

      .info {
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 4px;
        border-left: 4px solid #055160;
      }
    </style>

    <div class="container">
      <p class="info">
        Hover over the toast to pause the countdown. Move your mouse away to resume.
      </p>

      <button
        type="button"
        @click=${() =>
          showToast({
            message: 'Hover me to pause the countdown (5s)',
            duration: 5000,
            pauseOnHover: true,
          })}
      >
        Toast with Pause on Hover
      </button>

      <button
        type="button"
        @click=${() =>
          showToast({
            message: 'Hover has no effect on this toast (5s)',
            duration: 5000,
            pauseOnHover: false,
          })}
      >
        Toast without Pause on Hover
      </button>
    </div>
  `;
};
