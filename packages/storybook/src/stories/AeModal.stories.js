import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Import directly from the core package
import { AeModal } from '@aetherui/core';
import { AeButton } from '@aetherui/core';

// Make sure components are defined
customElements.define('ae-modal', AeModal);
customElements.define('ae-button', AeButton);

export default {
  title: 'Components/Modal',
  component: 'ae-modal',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the modal is open initially',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the modal',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Whether to show a close button and allow closing via backdrop',
    },
    backdrop: {
      control: { type: 'boolean' },
      description: 'Whether to show a backdrop',
    },
    title: {
      control: { type: 'text' },
      description: 'The modal title',
    },
    content: {
      control: { type: 'text' },
      description: 'The modal content',
    },
    hasFooter: {
      control: { type: 'boolean' },
      description: 'Whether to show the footer with action buttons',
    },
  },
};

// In Storybook context with Modal, we need to ensure it remains visible in the iframe
export const Default = {
  args: {
    open: true,
    size: 'medium',
    closable: true,
    backdrop: true,
    title: 'Modal Title',
    content: 'This is the modal content.',
    hasFooter: true,
  },
  render: (args) => {
    // For HTML content in Storybook we need special handling
    const handleCloseModal = () => {
      console.log('Modal closed');
    };

    return html`
      <ae-modal
        ?open=${args.open}
        size=${args.size}
        ?closable=${args.closable}
        ?backdrop=${args.backdrop}
        @ae-modal-close=${handleCloseModal}
      >
        <h3 slot="header">${args.title}</h3>
        <div slot="body">
          ${args.content}
        </div>
        ${args.hasFooter
          ? html`
              <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                <ae-button variant="secondary" @click=${() => console.log('Cancel clicked')}>
                  Cancel
                </ae-button>
                <ae-button variant="primary" @click=${() => console.log('Confirm clicked')}>
                  Confirm
                </ae-button>
              </div>
            `
          : ''}
      </ae-modal>
    `;
  },
};

export const SmallModal = {
  args: {
    open: true,
    size: 'small',
    title: 'Small Modal',
    content: 'This is a small-sized modal dialog.',
    hasFooter: true,
  },
  render: (args) => {
    return html`
      <ae-modal
        ?open=${args.open}
        size=${args.size}
        @ae-modal-close=${() => console.log('Modal closed')}
      >
        <h3 slot="header">${args.title}</h3>
        <div slot="body">
          ${args.content}
        </div>
        ${args.hasFooter
          ? html`
              <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                <ae-button variant="secondary" @click=${() => console.log('Cancel clicked')}>
                  Cancel
                </ae-button>
                <ae-button variant="primary" @click=${() => console.log('Confirm clicked')}>
                  Confirm
                </ae-button>
              </div>
            `
          : ''}
      </ae-modal>
    `;
  },
};

export const LargeModal = {
  args: {
    open: true,
    size: 'large',
    title: 'Large Modal',
    content: 'This is a large-sized modal dialog with more space for content.',
    hasFooter: true,
  },
  render: (args) => {
    return html`
      <ae-modal
        ?open=${args.open}
        size=${args.size}
        @ae-modal-close=${() => console.log('Modal closed')}
      >
        <h3 slot="header">${args.title}</h3>
        <div slot="body">
          ${args.content}
        </div>
        ${args.hasFooter
          ? html`
              <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                <ae-button variant="secondary" @click=${() => console.log('Cancel clicked')}>
                  Cancel
                </ae-button>
                <ae-button variant="primary" @click=${() => console.log('Confirm clicked')}>
                  Confirm
                </ae-button>
              </div>
            `
          : ''}
      </ae-modal>
    `;
  },
};

export const NoFooter = {
  args: {
    open: true,
    size: 'medium',
    title: 'Modal Without Footer',
    content: 'This modal does not have a footer with action buttons.',
    hasFooter: false,
  },
  render: (args) => {
    return html`
      <ae-modal
        ?open=${args.open}
        size=${args.size}
        @ae-modal-close=${() => console.log('Modal closed')}
      >
        <h3 slot="header">${args.title}</h3>
        <div slot="body">
          ${args.content}
        </div>
      </ae-modal>
    `;
  },
};

export const ModalWithCustomContent = {
  args: {
    open: true,
    size: 'medium',
    title: 'Modal With Custom Content',
    hasFooter: true,
  },
  render: (args) => {
    const customContent = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4 style="margin: 0; color: #0066FF;">Rich Content Example</h4>
        <p>This modal contains <strong>formatted content</strong> with various elements.</p>
        <div style="background: #f5f5f5; padding: 12px; border-radius: 4px;">
          <code>You can include code examples or other formatted content.</code>
        </div>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    `;

    return html`
      <ae-modal
        ?open=${args.open}
        size=${args.size}
        @ae-modal-close=${() => console.log('Modal closed')}
      >
        <h3 slot="header">${args.title}</h3>
        <div slot="body">
          ${unsafeHTML(customContent)}
        </div>
        ${args.hasFooter
          ? html`
              <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                <ae-button variant="secondary" @click=${() => console.log('Cancel clicked')}>
                  Cancel
                </ae-button>
                <ae-button variant="primary" @click=${() => console.log('Confirm clicked')}>
                  Confirm
                </ae-button>
              </div>
            `
          : ''}
      </ae-modal>
    `;
  },
};