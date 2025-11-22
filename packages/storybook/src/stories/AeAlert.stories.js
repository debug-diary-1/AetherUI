import { html } from 'lit';

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual theme of the alert',
    },
    closable: {
      control: 'boolean',
      description: 'Show a dismiss button',
    },
    open: {
      control: 'boolean',
      description: 'Control visibility',
    },
    customStyles: {
      control: 'boolean',
      description: 'Apply custom styles',
    },
    slotContent: {
      control: 'text',
      description: 'Content to display in the alert',
    },
  },
};

export const Default = {
  args: {
    variant: 'info',
    closable: false,
    open: true,
    customStyles: false,
    slotContent: 'This is an informational alert message.',
  },
  render: (args) => {
    const handleClose = () => {
      console.log('Alert closed!');
    };

    const styles = args.customStyles
      ? html`
          <style>
            .custom-alert {
              --ae-alert-radius: 8px;
              --ae-alert-padding: 16px;
              --ae-space-3: 12px;
              font-family:
                system-ui,
                -apple-system,
                sans-serif;
            }

            .custom-alert::part(base) {
              border-left: 4px solid var(--accent-color, #0066ff);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .custom-alert[variant='info'] {
              --accent-color: #0066ff;
            }

            .custom-alert[variant='success'] {
              --accent-color: #10b981;
            }

            .custom-alert[variant='warning'] {
              --accent-color: #f59e0b;
            }

            .custom-alert[variant='error'] {
              --accent-color: #ef4444;
            }

            .custom-alert::part(close) {
              transition: all 0.2s ease;
            }
          </style>
        `
      : '';

    return html`
      ${styles}
      <div style="width: 100%; max-width: 600px;">
        <ae-alert
          class="custom-alert"
          variant="${args.variant}"
          ?closable="${args.closable}"
          ?open="${args.open}"
          @ae-close="${handleClose}"
        >
          ${args.slotContent}
        </ae-alert>
      </div>
    `;
  },
};

export const All = {
  render: () => {
    return html`
      <div
        style="width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 16px; font-family: system-ui, sans-serif;"
      >
        <ae-alert variant="info"> This is an informational alert message. </ae-alert>

        <ae-alert variant="success"> Operation completed successfully! </ae-alert>

        <ae-alert variant="warning"> Warning: This action cannot be undone. </ae-alert>

        <ae-alert variant="error"> Error: Unable to save changes. Please try again. </ae-alert>

        <ae-alert variant="info" closable>
          This alert can be dismissed by clicking the close button.
        </ae-alert>
      </div>
    `;
  },
};

export const CustomIcon = {
  render: () => {
    return html`
      <div style="width: 100%; max-width: 600px; font-family: system-ui, sans-serif;">
        <ae-alert variant="info">
          <svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          You can replace the default icon with a custom one using the icon slot.
        </ae-alert>
      </div>
    `;
  },
};

export const WithCustomEventHandling = {
  render: () => {
    const handleClose = (e) => {
      const alert = e.target;
      // Add a fade-out animation
      alert.style.transition = 'opacity 0.5s ease-out';
      alert.style.opacity = '0';

      // Remove from DOM after animation completes
      setTimeout(() => {
        alert.remove();
      }, 500);

      console.log('Alert closed with custom handler');
    };

    return html`
      <div style="width: 100%; max-width: 600px; font-family: system-ui, sans-serif;">
        <p style="margin-bottom: 16px;">This example shows how to handle the ae-close event:</p>

        <ae-alert variant="info" closable @ae-close="${handleClose}">
          This alert will fade out when closed.
        </ae-alert>
      </div>
    `;
  },
};
