import { html, fixture, expect } from '@open-wc/testing';
import { AeBreadcrumb } from '../ae-breadcrumb.js';
import { AeBreadcrumbItem } from '../ae-breadcrumb-item.js';
import '../ae-breadcrumb.js';
import '../ae-breadcrumb-item.js';

describe('ae-breadcrumb', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeBreadcrumb>(html`<ae-breadcrumb></ae-breadcrumb>`);

    expect(el.separator).to.equal('/');
  });

  it('sets separator from attribute', async () => {
    const el = await fixture<AeBreadcrumb>(html` <ae-breadcrumb separator=">"></ae-breadcrumb> `);

    expect(el.separator).to.equal('>');
  });

  it('renders breadcrumb items', async () => {
    const el = await fixture<AeBreadcrumb>(html`
      <ae-breadcrumb>
        <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/products">Products</ae-breadcrumb-item>
        <ae-breadcrumb-item current>Details</ae-breadcrumb-item>
      </ae-breadcrumb>
    `);

    const items = el.querySelectorAll('ae-breadcrumb-item');
    expect(items.length).to.equal(3);
  });

  it('has correct ARIA attributes', async () => {
    const el = await fixture<AeBreadcrumb>(html`<ae-breadcrumb></ae-breadcrumb>`);
    const nav = el.shadowRoot!.querySelector('nav')!;

    expect(nav.getAttribute('aria-label')).to.equal('Breadcrumb');
  });

  it('passes separator to child items', async () => {
    const el = await fixture<AeBreadcrumb>(html`
      <ae-breadcrumb separator="-">
        <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
        <ae-breadcrumb-item href="/products">Products</ae-breadcrumb-item>
      </ae-breadcrumb>
    `);

    const items = el.querySelectorAll('ae-breadcrumb-item');
    const firstItem = items[0] as AeBreadcrumbItem;
    const separator = firstItem.shadowRoot!.querySelector('[part="separator"]');
    expect(separator).to.exist;
    expect(separator!.textContent).to.equal('-');
  });
});

describe('ae-breadcrumb-item', () => {
  it('has correct default properties', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
    `);

    expect(el.href).to.equal('/');
    expect(el.current).to.be.false;
  });

  it('sets properties from attributes', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item href="/home" current>Home</ae-breadcrumb-item>
    `);

    expect(el.href).to.equal('/home');
    expect(el.current).to.be.true;
  });

  it('renders as link when href is provided', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item href="/home">Home</ae-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector('a');
    expect(link).to.exist;
    expect(link!.href).to.include('/home');
  });

  it('renders as span when current is true', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item current>Current Page</ae-breadcrumb-item>
    `);

    const span = el.shadowRoot!.querySelector('span.breadcrumb-text');
    expect(span).to.exist;
  });

  it('sets aria-current="page" when current is true', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item current>Current</ae-breadcrumb-item>
    `);

    const li = el.shadowRoot!.querySelector('li')!;
    expect(li.getAttribute('aria-current')).to.equal('page');
  });

  it('does not set aria-current when current is false', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item href="/home">Home</ae-breadcrumb-item>
    `);

    const li = el.shadowRoot!.querySelector('li')!;
    expect(li.hasAttribute('aria-current')).to.be.false;
  });

  it('renders slot content', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item>Test Content</ae-breadcrumb-item>
    `);

    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('does not render link when current is true', async () => {
    const el = await fixture<AeBreadcrumbItem>(html`
      <ae-breadcrumb-item href="/test" current>Current</ae-breadcrumb-item>
    `);

    const link = el.shadowRoot!.querySelector('a');
    expect(link).to.not.exist;
  });
});
