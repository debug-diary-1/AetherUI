import { html } from 'lit';
import { expect, within, userEvent } from 'storybook/test';

export default {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Current page number',
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Siblings on each side',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first/last buttons',
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Show prev/next buttons',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Pagination size',
    },
  },
};

export const Default = {
  args: {
    currentPage: 5,
    totalPages: 10,
    siblingCount: 1,
    showFirstLast: false,
    showPrevNext: true,
    size: 'md',
  },
  render: (args) => html`
    <ae-pagination
      current-page="${args.currentPage}"
      total-pages="${args.totalPages}"
      sibling-count="${args.siblingCount}"
      ?show-first-last="${args.showFirstLast}"
      ?show-prev-next="${args.showPrevNext}"
      size="${args.size}"
      @ae-page-change="${(e) => console.log('Page changed to:', e.detail.page)}"
    ></ae-pagination>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the ae-pagination element and access its shadow DOM
    const aePagination = canvasElement.querySelector('ae-pagination');
    expect(aePagination).toBeInTheDocument();

    // Find all buttons in shadow DOM
    const buttons = aePagination.shadowRoot.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Find the next button
    const nextButton = Array.from(buttons).find(
      (btn) => btn.textContent.includes('Next') || btn.getAttribute('aria-label') === 'Next page',
    );
    expect(nextButton).toBeTruthy();

    // Click next button
    await userEvent.click(nextButton);

    // Verify current page updated
    expect(aePagination.currentPage).toBe(6);
  },
};

export const WithFirstLast = {
  args: {
    ...Default.args,
    totalPages: 20,
    showFirstLast: true,
  },
  render: Default.render,
};

export const ManyPages = {
  args: {
    ...Default.args,
    currentPage: 25,
    totalPages: 50,
    siblingCount: 2,
    showFirstLast: true,
  },
  render: Default.render,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Small</h4>
        <ae-pagination
          current-page="3"
          total-pages="10"
          size="sm"
          aria-label="Small pagination"
        ></ae-pagination>
      </div>
      <div>
        <h4>Medium</h4>
        <ae-pagination
          current-page="3"
          total-pages="10"
          size="md"
          aria-label="Medium pagination"
        ></ae-pagination>
      </div>
      <div>
        <h4>Large</h4>
        <ae-pagination
          current-page="3"
          total-pages="10"
          size="lg"
          aria-label="Large pagination"
        ></ae-pagination>
      </div>
    </div>
  `,
};
