import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { expect, within, userEvent } from 'storybook/test';

export default {
  title: 'Components/Menu',
  tags: ['autodocs'],
};

export const Default = {
  render: () => html`
    <ae-menu @ae-menu-select="${(e) => console.log('Selected:', e.detail.value)}">
      <ae-menu-item value="edit">Edit</ae-menu-item>
      <ae-menu-item value="copy">Copy</ae-menu-item>
      <ae-menu-item value="paste">Paste</ae-menu-item>
      <ae-menu-divider></ae-menu-divider>
      <ae-menu-item value="delete">Delete</ae-menu-item>
    </ae-menu>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get menu items
    const menuItems = canvasElement.querySelectorAll('ae-menu-item');
    expect(menuItems.length).toBeGreaterThan(0);

    // Get the first menu item and click it
    const firstItem = menuItems[0];
    const itemButton = firstItem.shadowRoot.querySelector('[part="base"]');
    expect(itemButton).toBeTruthy();

    await userEvent.click(itemButton);

    // Verify menu item has proper role
    expect(itemButton.getAttribute('role')).toBe('menuitem');

    // Verify divider exists
    const divider = canvasElement.querySelector('ae-menu-divider');
    expect(divider).toBeInTheDocument();

    const dividerElement = divider.shadowRoot.querySelector('[role="separator"]');
    expect(dividerElement).toBeTruthy();
  },
};

export const WithIcons = {
  render: () => html`
    <ae-menu>
      <ae-menu-item value="new">
        <span slot="prefix">📄</span>
        New File
      </ae-menu-item>
      <ae-menu-item value="open">
        <span slot="prefix">📂</span>
        Open
      </ae-menu-item>
      <ae-menu-item value="save">
        <span slot="prefix">💾</span>
        Save
      </ae-menu-item>
      <ae-menu-divider></ae-menu-divider>
      <ae-menu-item value="exit">
        <span slot="prefix">🚪</span>
        Exit
      </ae-menu-item>
    </ae-menu>
  `,
};

export const WithShortcuts = {
  render: () => html`
    <ae-menu>
      <ae-menu-item value="undo">
        Undo
        <span slot="suffix" style="opacity: 0.6; font-size: 0.875rem;">⌘Z</span>
      </ae-menu-item>
      <ae-menu-item value="redo">
        Redo
        <span slot="suffix" style="opacity: 0.6; font-size: 0.875rem;">⌘⇧Z</span>
      </ae-menu-item>
      <ae-menu-divider></ae-menu-divider>
      <ae-menu-item value="cut">
        Cut
        <span slot="suffix" style="opacity: 0.6; font-size: 0.875rem;">⌘X</span>
      </ae-menu-item>
      <ae-menu-item value="copy">
        Copy
        <span slot="suffix" style="opacity: 0.6; font-size: 0.875rem;">⌘C</span>
      </ae-menu-item>
      <ae-menu-item value="paste">
        Paste
        <span slot="suffix" style="opacity: 0.6; font-size: 0.875rem;">⌘V</span>
      </ae-menu-item>
    </ae-menu>
  `,
};

export const WithDisabled = {
  render: () => html`
    <ae-menu>
      <ae-menu-item value="new">New</ae-menu-item>
      <ae-menu-item value="open">Open</ae-menu-item>
      <ae-menu-item value="save" disabled>Save (disabled)</ae-menu-item>
      <ae-menu-divider></ae-menu-divider>
      <ae-menu-item value="delete" disabled>Delete (disabled)</ae-menu-item>
    </ae-menu>
  `,
};

export const AsContextMenu = {
  render: () => {
    let menu;
    let contextMenuOpen = false;

    const handleContextMenu = (e) => {
      e.preventDefault();
      if (menu) {
        menu.style.position = 'fixed';
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;
        menu.style.zIndex = '1000';
        contextMenuOpen = true;
        menu.style.display = 'block';
      }
    };

    const handleClick = () => {
      if (menu && contextMenuOpen) {
        menu.style.display = 'none';
        contextMenuOpen = false;
      }
    };

    return html`
      <div
        @contextmenu="${handleContextMenu}"
        @click="${handleClick}"
        style="padding: 4rem; background: #f3f4f6; border-radius: 0.5rem; text-align: center;"
      >
        Right-click here to see the context menu
      </div>

      <ae-menu
        ${ref((el) => (menu = el))}
        style="display: none;"
        @ae-menu-select="${(e) => {
          console.log('Selected:', e.detail.value);
          if (menu) menu.style.display = 'none';
        }}"
      >
        <ae-menu-item value="refresh">Refresh</ae-menu-item>
        <ae-menu-item value="inspect">Inspect</ae-menu-item>
        <ae-menu-divider></ae-menu-divider>
        <ae-menu-item value="save">Save Page As...</ae-menu-item>
        <ae-menu-item value="print">Print...</ae-menu-item>
      </ae-menu>
    `;
  },
};
