import { html } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import { expect, within, userEvent, waitFor } from '@storybook/test';

export default {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer placement',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Drawer size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    backdrop: {
      control: 'boolean',
      description: 'Show backdrop',
    },
  },
};

const createDrawerExample = (args) => {
  const drawerRef = createRef();

  const openDrawer = () => {
    if (drawerRef.value) drawerRef.value.open = true;
  };

  return html`
    <div>
      <button @click="${openDrawer}">Open Drawer</button>

      <ae-drawer
        ${ref(drawerRef)}
        placement="${args.placement}"
        size="${args.size}"
        ?closable="${args.closable}"
        ?backdrop="${args.backdrop}"
        @ae-drawer-close="${() => console.log('Drawer closed')}"
      >
        <h2 slot="header">Drawer Title</h2>

        <div>
          <p>This is the drawer content.</p>
          <p>You can put any content here including forms, lists, or other components.</p>
        </div>

        <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button @click="${() => drawerRef.value && (drawerRef.value.open = false)}">Cancel</button>
          <button @click="${() => drawerRef.value && (drawerRef.value.open = false)}">Save</button>
        </div>
      </ae-drawer>
    </div>
  `;
};

export const Right = {
  args: {
    placement: 'right',
    size: 'md',
    closable: true,
    backdrop: true,
  },
  render: createDrawerExample,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the open button
    const openButton = canvas.getByText('Open Drawer');
    expect(openButton).toBeInTheDocument();

    // Click to open drawer
    await userEvent.click(openButton);

    // Get the drawer element
    const aeDrawer = canvasElement.querySelector('ae-drawer');
    expect(aeDrawer).toBeInTheDocument();

    // Wait for drawer to open
    await waitFor(() => {
      expect(aeDrawer.open).toBe(true);
    });

    // Verify drawer content is visible
    const header = aeDrawer.shadowRoot.querySelector('[part="header"]');
    expect(header).toBeTruthy();

    // Find and click close button
    const closeButton = aeDrawer.shadowRoot.querySelector('[part="close-button"]');
    expect(closeButton).toBeTruthy();
    await userEvent.click(closeButton);

    // Wait for drawer to close
    await waitFor(() => {
      expect(aeDrawer.open).toBe(false);
    });
  },
};

export const Left = {
  args: {
    placement: 'left',
    size: 'md',
    closable: true,
    backdrop: true,
  },
  render: createDrawerExample,
};

export const Top = {
  args: {
    placement: 'top',
    size: 'md',
    closable: true,
    backdrop: true,
  },
  render: createDrawerExample,
};

export const Bottom = {
  args: {
    placement: 'bottom',
    size: 'md',
    closable: true,
    backdrop: true,
  },
  render: createDrawerExample,
};

export const NoBackdrop = {
  args: {
    placement: 'right',
    size: 'md',
    closable: true,
    backdrop: false,
  },
  render: createDrawerExample,
};
