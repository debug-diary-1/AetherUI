import { html } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

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
