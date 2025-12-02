import { html } from 'lit';
import { expect, within, userEvent } from '@storybook/test';

export default {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Textarea value',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-resize to content',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum length',
    },
  },
};

export const Default = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
    value: '',
    rows: 4,
    disabled: false,
    required: false,
    readonly: false,
    autoResize: false,
    showCount: false,
    maxlength: 0,
  },
  render: (args) => html`
    <ae-textarea
      label="${args.label}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      rows="${args.rows}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?auto-resize="${args.autoResize}"
      ?show-count="${args.showCount}"
      maxlength="${args.maxlength || undefined}"
      @ae-textarea-change="${(e) => console.log('Textarea changed:', e.detail)}"
    ></ae-textarea>
  `,
  play: async ({ canvasElement }) => {
    // Get the ae-textarea element and access its shadow DOM
    const aeTextarea = canvasElement.querySelector('ae-textarea');
    expect(aeTextarea).toBeInTheDocument();

    // Wait for component to render
    await aeTextarea.updateComplete;

    // Get the textarea element from shadow DOM
    const textarea = aeTextarea.shadowRoot.querySelector('textarea');
    expect(textarea).toBeTruthy();

    // Verify label property is set correctly
    expect(aeTextarea.label).toBe('Description');

    // Test that the textarea is interactive by setting value directly
    // (userEvent.type doesn't work reliably with shadow DOM)
    textarea.value = 'This is a test description';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await aeTextarea.updateComplete;

    // Verify the component received the value
    expect(aeTextarea.value).toBe('This is a test description');
  },
};

export const WithCharacterCount = {
  args: {
    ...Default.args,
    label: 'Comment',
    showCount: true,
    maxlength: 500,
    helpText: 'Maximum 500 characters',
  },
  render: (args) => html`
    <ae-textarea
      label="${args.label}"
      ?show-count="${args.showCount}"
      maxlength="${args.maxlength}"
      help-text="${args.helpText}"
    ></ae-textarea>
  `,
};

export const AutoResize = {
  args: {
    ...Default.args,
    label: 'Auto-resizing Textarea',
    autoResize: true,
    rows: 2,
  },
  render: Default.render,
};
