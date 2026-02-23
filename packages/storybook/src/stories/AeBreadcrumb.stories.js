import { html } from 'lit';
import { expect, within } from '@storybook/test';

export default {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Separator character',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the breadcrumb navigation',
    },
  },
};

export const Default = {
  args: {
    separator: '/',
    ariaLabel: 'Main navigation breadcrumb',
  },
  render: (args) => html`
    <ae-breadcrumb separator="${args.separator}" aria-label="${args.ariaLabel}">
      <ae-breadcrumb-item href="/" aria-label="Home">Home</ae-breadcrumb-item>
      <ae-breadcrumb-item href="/products" aria-label="Products">Products</ae-breadcrumb-item>
      <ae-breadcrumb-item href="/products/electronics" aria-label="Electronics">Electronics</ae-breadcrumb-item>
      <ae-breadcrumb-item current aria-label="Laptops">Laptops</ae-breadcrumb-item>
    </ae-breadcrumb>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the breadcrumb element
    const aeBreadcrumb = canvasElement.querySelector('ae-breadcrumb');
    expect(aeBreadcrumb).toBeInTheDocument();

    // Verify separator attribute
    expect(aeBreadcrumb.getAttribute('separator')).toBe('/');

    // Get breadcrumb items
    const items = canvasElement.querySelectorAll('ae-breadcrumb-item');
    expect(items.length).toBe(4);

    // Verify first item has link
    const firstItem = items[0];
    const firstLink = firstItem.shadowRoot.querySelector('a');
    expect(firstLink).toBeTruthy();
    expect(firstLink.getAttribute('href')).toBe('/');

    // Verify last item is current and has no link
    const lastItem = items[3];
    expect(lastItem.hasAttribute('current')).toBe(true);
    const lastLink = lastItem.shadowRoot.querySelector('a');
    expect(lastLink).toBeFalsy();

    // Verify separator exists in non-current items
    const separator = firstItem.shadowRoot.querySelector('[part="separator"]');
    expect(separator).toBeTruthy();
    expect(separator.textContent).toBe('/');
  },
};

export const CustomSeparator = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ae-breadcrumb separator=">" aria-label="Documentation breadcrumb">
        <ae-breadcrumb-item href="/" aria-label="Home">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/docs" aria-label="Docs">Docs</ae-breadcrumb-item>
        <ae-breadcrumb-item current aria-label="Components">Components</ae-breadcrumb-item>
      </ae-breadcrumb>

      <ae-breadcrumb separator="•" aria-label="Blog breadcrumb">
        <ae-breadcrumb-item href="/" aria-label="Home">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/blog" aria-label="Blog">Blog</ae-breadcrumb-item>
        <ae-breadcrumb-item current aria-label="Article">Article</ae-breadcrumb-item>
      </ae-breadcrumb>

      <ae-breadcrumb separator="→" aria-label="Settings breadcrumb">
        <ae-breadcrumb-item href="/" aria-label="Home">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/settings" aria-label="Settings">Settings</ae-breadcrumb-item>
        <ae-breadcrumb-item current aria-label="Profile">Profile</ae-breadcrumb-item>
      </ae-breadcrumb>
    </div>
  `,
};

export const WithoutLinks = {
  render: () => html`
    <ae-breadcrumb aria-label="Steps progress breadcrumb">
      <ae-breadcrumb-item aria-label="Step 1">Step 1</ae-breadcrumb-item>
      <ae-breadcrumb-item aria-label="Step 2">Step 2</ae-breadcrumb-item>
      <ae-breadcrumb-item current aria-label="Step 3">Step 3</ae-breadcrumb-item>
    </ae-breadcrumb>
  `,
};
