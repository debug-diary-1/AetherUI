import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'Examples/Simple Accordion',
  tags: ['autodocs'],
  render: (args) => {
    // Let users toggle the accordion with a click
    const toggleAccordion = (e) => {
      const header = e.currentTarget;
      const panel = header.nextElementSibling;
      const chevron = header.querySelector('svg');

      if (args.disabled) return;

      if (panel.style.maxHeight === '0px' || !panel.style.maxHeight) {
        panel.style.maxHeight = '200px';
        panel.style.padding = '16px';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        panel.style.maxHeight = '0px';
        panel.style.padding = '0 16px';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
    };

    return html`
      <div
        style="
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        font-family: system-ui, sans-serif;
        width: 100%;
        max-width: 500px;
      "
      >
        <div
          @click=${toggleAccordion}
          style="
            padding: 16px;
            background-color: #f9f9f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: ${args.disabled ? 'not-allowed' : 'pointer'};
            font-weight: 600;
            user-select: none;
            ${args.disabled ? 'opacity: 0.5;' : ''}
          "
        >
          ${args.header || 'Accordion Header'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            style="transition: transform 0.3s ease; ${args.open
              ? 'transform: rotate(180deg);'
              : ''}"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div
          style="
            padding: ${args.open ? '16px' : '0 16px'};
            max-height: ${args.open ? '200px' : '0'};
            overflow: hidden;
            transition: all 0.3s ease;
          "
        >
          ${typeof args.content === 'string'
            ? unsafeHTML(args.content)
            : args.content ||
              'Accordion content goes here. You can put any content inside the accordion panel.'}
        </div>
      </div>
    `;
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the accordion is open initially',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the accordion is disabled',
    },
    header: {
      control: { type: 'text' },
      description: 'The accordion header text',
    },
    content: {
      control: { type: 'text' },
      description: 'The accordion content (can include HTML)',
    },
  },
};

export const Default = {
  args: {
    open: false,
    disabled: false,
    header: 'Accordion Header',
    content:
      'This is the accordion content. You can click the header to toggle it open and closed.',
  },
};

export const Open = {
  args: {
    open: true,
    disabled: false,
    header: 'Open Accordion',
    content: 'This accordion is open by default. Click the header to close it.',
  },
};

export const Disabled = {
  args: {
    open: false,
    disabled: true,
    header: 'Disabled Accordion',
    content: 'This accordion is disabled and cannot be toggled.',
  },
};

export const WithHtmlContent = {
  args: {
    open: true,
    disabled: false,
    header: 'Accordion with HTML Content',
    content: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 0; color: #0066FF;">Rich Content</h4>
        <p>This accordion contains <strong>formatted HTML</strong> content.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    `,
  },
};

export const AccordionGroup = {
  render: () => {
    const toggleAccordion = (e) => {
      const header = e.currentTarget;
      const panel = header.nextElementSibling;
      const chevron = header.querySelector('svg');

      if (panel.style.maxHeight === '0px' || !panel.style.maxHeight) {
        panel.style.maxHeight = '200px';
        panel.style.padding = '16px';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        panel.style.maxHeight = '0px';
        panel.style.padding = '0 16px';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
    };

    return html`
      <div
        style="
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        max-width: 500px;
        font-family: system-ui, sans-serif;
      "
      >
        <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
          <div
            @click=${toggleAccordion}
            style="
              padding: 16px;
              background-color: #f9f9f9;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              font-weight: 600;
            "
          >
            First Section
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div style="padding: 0; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
            This is the content for the first accordion section.
          </div>
        </div>

        <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
          <div
            @click=${toggleAccordion}
            style="
              padding: 16px;
              background-color: #f9f9f9;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              font-weight: 600;
            "
          >
            Second Section
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              style="transform: rotate(180deg);"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div
            style="padding: 16px; max-height: 200px; overflow: hidden; transition: all 0.3s ease;"
          >
            This is the content for the second accordion section.
          </div>
        </div>

        <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
          <div
            @click=${toggleAccordion}
            style="
              padding: 16px;
              background-color: #f9f9f9;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              font-weight: 600;
            "
          >
            Third Section
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div style="padding: 0 16px; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
            This is the content for the third accordion section.
          </div>
        </div>
      </div>
    `;
  },
};
