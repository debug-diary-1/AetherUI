import { html } from 'lit';

export default {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Separator character',
    },
  },
};

export const Default = {
  args: {
    separator: '/',
  },
  render: (args) => html`
    <ae-breadcrumb separator="${args.separator}">
      <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
      <ae-breadcrumb-item href="/products">Products</ae-breadcrumb-item>
      <ae-breadcrumb-item href="/products/electronics">Electronics</ae-breadcrumb-item>
      <ae-breadcrumb-item current>Laptops</ae-breadcrumb-item>
    </ae-breadcrumb>
  `,
};

export const CustomSeparator = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ae-breadcrumb separator=">">
        <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/docs">Docs</ae-breadcrumb-item>
        <ae-breadcrumb-item current>Components</ae-breadcrumb-item>
      </ae-breadcrumb>

      <ae-breadcrumb separator="•">
        <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/blog">Blog</ae-breadcrumb-item>
        <ae-breadcrumb-item current>Article</ae-breadcrumb-item>
      </ae-breadcrumb>

      <ae-breadcrumb separator="→">
        <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/settings">Settings</ae-breadcrumb-item>
        <ae-breadcrumb-item current>Profile</ae-breadcrumb-item>
      </ae-breadcrumb>
    </div>
  `,
};

export const WithoutLinks = {
  render: () => html`
    <ae-breadcrumb>
      <ae-breadcrumb-item>Step 1</ae-breadcrumb-item>
      <ae-breadcrumb-item>Step 2</ae-breadcrumb-item>
      <ae-breadcrumb-item current>Step 3</ae-breadcrumb-item>
    </ae-breadcrumb>
  `,
};
