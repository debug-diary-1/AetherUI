import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'Examples/Simple Modal',
  tags: ['autodocs'],
  render: (args) => {
    // For demo purposes, let's toggle the modal state
    const handleClick = () => {
      const modalRoot = document.querySelector('.modal-root');
      if (modalRoot) {
        modalRoot.style.display = modalRoot.style.display === 'none' ? 'flex' : 'none';
      }
    };

    return html`
      <div>
        ${args.open
          ? html`
              <div
                class="modal-root"
                style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.5);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 1000;
                "
              >
                <div
                  style="
                    background: white;
                    border-radius: 8px;
                    width: ${args.size === 'sm' ? '300px' : args.size === 'lg' ? '600px' : '450px'};
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow: auto;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    font-family: system-ui, sans-serif;
                  "
                >
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding: 16px;
                      border-bottom: 1px solid #eee;
                    "
                  >
                    <h3 style="margin: 0; font-size: 1.2rem;">${args.title || 'Modal Title'}</h3>
                    <button
                      @click=${handleClick}
                      style="
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        font-size: 1.5rem;
                        line-height: 1;
                        padding: 0;
                        color: #666;
                      "
                    >
                      ×
                    </button>
                  </div>
                  <div style="padding: 16px;">
                    ${typeof args.content === 'string' ? unsafeHTML(args.content) : args.content}
                  </div>
                  ${args.hasFooter
                    ? html`
                        <div
                          style="
                            padding: 16px;
                            border-top: 1px solid #eee;
                            display: flex;
                            justify-content: flex-end;
                            gap: 8px;
                          "
                        >
                          <button
                            @click=${handleClick}
                            style="
                              padding: 8px 16px;
                              background: transparent;
                              border: 1px solid #ddd;
                              border-radius: 4px;
                              cursor: pointer;
                            "
                          >
                            Cancel
                          </button>
                          <button
                            @click=${handleClick}
                            style="
                              padding: 8px 16px;
                              background: #0066FF;
                              color: white;
                              border: none;
                              border-radius: 4px;
                              cursor: pointer;
                            "
                          >
                            Confirm
                          </button>
                        </div>
                      `
                    : ''}
                </div>
              </div>
            `
          : html`
              <button
                @click=${handleClick}
                style="
                  padding: 8px 16px;
                  background: #0066FF;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-family: system-ui, sans-serif;
                "
              >
                Open Modal
              </button>
            `}
      </div>
    `;
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the modal is open initially',
    },
    title: {
      control: { type: 'text' },
      description: 'The modal title',
    },
    content: {
      control: { type: 'text' },
      description: 'The modal content (can include HTML)',
    },
    hasFooter: {
      control: { type: 'boolean' },
      description: 'Whether to show the footer with action buttons',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the modal',
    },
  },
};

export const Default = {
  args: {
    open: false,
    title: 'Modal Title',
    content: 'This is the modal content. Click the button to open the modal.',
    hasFooter: true,
    size: 'md',
  },
};

export const OpenModal = {
  args: {
    open: true,
    title: 'Open Modal',
    content:
      'This modal is open by default. You can close it by clicking the X button, the Cancel/Confirm buttons, or outside the modal.',
    hasFooter: true,
    size: 'md',
  },
};

export const SmallModal = {
  args: {
    open: true,
    title: 'Small Modal',
    content: 'This is a small-sized modal dialog.',
    hasFooter: true,
    size: 'sm',
  },
};

export const LargeModal = {
  args: {
    open: true,
    title: 'Large Modal',
    content: 'This is a large-sized modal dialog with more space for content.',
    hasFooter: true,
    size: 'lg',
  },
};

export const NoFooter = {
  args: {
    open: true,
    title: 'Modal Without Footer',
    content: 'This modal does not have a footer with action buttons.',
    hasFooter: false,
    size: 'md',
  },
};

export const LongContent = {
  args: {
    open: true,
    title: 'Modal With Long Content',
    content: `
      <p>This modal contains a lot of content that might require scrolling.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.</p>
    `,
    hasFooter: true,
    size: 'md',
  },
};

export const CustomHtml = {
  args: {
    open: true,
    title: 'Modal With Custom HTML',
    content: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4 style="margin: 0; color: #0066FF;">Custom HTML Content</h4>
        <p>This modal contains <strong>formatted HTML</strong> content.</p>
        <div style="background: #f5f5f5; padding: 12px; border-radius: 4px;">
          <code>You can even include code examples!</code>
        </div>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    `,
    hasFooter: true,
    size: 'md',
  },
};
