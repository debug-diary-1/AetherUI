import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { selectStyles } from './styles';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

/**
 * A select dropdown component with support for single/multiple selection and form participation.
 * Participates in native form submission via ElementInternals API.
 *
 * @element ae-select
 *
 * @property {string} value - The current selected value (single select)
 * @property {string[]} values - The current selected values (multiple select)
 * @property {string} defaultValue - Initial value for uncontrolled usage
 * @property {string} placeholder - Placeholder text when no option is selected
 * @property {string} label - Label text for the select
 * @property {string} name - The name attribute for form submission
 * @property {boolean} disabled - Whether the select is disabled
 * @property {boolean} required - Whether the select is required
 * @property {boolean} multiple - Whether multiple selection is allowed
 * @property {string} error - Error message to display
 * @property {string} helpText - Helper text to display below the select
 * @property {string} ariaLabel - Accessible label for the select (used when no visible label)
 * @property {SelectOption[]} options - Programmatic options for structured or agent-generated UIs
 *
 * @fires {CustomEvent<{value: string | string[]}>} ae-select-change - Fired when the selection changes
 *
 * @slot - The select options (ae-option elements)
 *
 * @csspart base - The component's base wrapper
 * @csspart label - The label element
 * @csspart select-wrapper - The wrapper around the select
 * @csspart select - The native select element
 * @csspart help-text - The help text element
 * @csspart error-text - The error text element
 *
 * @example
 * ```html
 * <ae-select label="Country" name="country" required>
 *   <option value="">Select a country</option>
 *   <option value="us">United States</option>
 *   <option value="uk">United Kingdom</option>
 *   <option value="ca">Canada</option>
 * </ae-select>
 *
 * <ae-select label="Tags" name="tags" multiple>
 *   <option value="javascript">JavaScript</option>
 *   <option value="typescript">TypeScript</option>
 *   <option value="python">Python</option>
 * </ae-select>
 * ```
 */
@customElement('ae-select')
export class AeSelect extends LitElement {
  static styles = selectStyles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: String })
  accessor value = '';

  @property({ type: Array })
  accessor values: string[] = [];

  @property({ type: String, attribute: 'default-value' })
  accessor defaultValue = '';

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: String })
  accessor label = '';

  @property({ type: String })
  accessor name = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: Boolean, reflect: true })
  accessor multiple = false;

  @property({ type: String })
  accessor error = '';

  @property({ type: String, attribute: 'help-text' })
  accessor helpText = '';

  @property({ type: String, attribute: 'aria-label' })
  accessor ariaLabel = '';

  @property({ type: Array })
  accessor options: SelectOption[] = [];

  @state()
  private accessor focused = false;

  @query('select')
  private accessor selectElement!: HTMLSelectElement;

  @query('slot')
  private accessor slotElement!: HTMLSlotElement;

  private _internals: ElementInternals;
  private _defaultValue = '';
  private _optionObserver: MutationObserver | null = null;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();

    // Store the initial value for form reset
    this._defaultValue = this.value || this.defaultValue;
    if (this._defaultValue && !this.value) {
      this.value = this._defaultValue;
    }

    // Set initial form value
    this._updateFormValue();

    // Observe changes to light DOM options
    this._optionObserver = new MutationObserver(() => this._syncOptionsFromLightDOM());
    this._optionObserver.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._optionObserver?.disconnect();
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    // Initial sync of options from light DOM
    this._syncOptionsFromLightDOM();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('value') || changedProperties.has('values')) {
      this._updateFormValue();
      this._updateValidity();

      // Update option selection state in multiple mode
      if (this.multiple && changedProperties.has('values')) {
        this._syncOptionSelection();
      }
    }

    if (changedProperties.has('required')) {
      this._updateValidity();
    }

    if (changedProperties.has('options')) {
      this._syncOptionsFromLightDOM();
    }
  }

  private _updateFormValue() {
    if (this.multiple) {
      const formData = new FormData();
      this.values.forEach((val) => formData.append(this.name, val));
      this._internals.setFormValue(formData);
    } else {
      this._internals.setFormValue(this.value || null);
    }
  }

  private _updateValidity() {
    if (!this.selectElement) return;

    // Reset validity
    this._internals.setValidity({});

    const validity = this.selectElement.validity;

    if (!validity.valid) {
      // Provide a default message if the browser's validationMessage is empty
      const message =
        this.selectElement.validationMessage ||
        (validity.valueMissing ? 'Please select an option.' : 'Invalid selection.');

      this._internals.setValidity(
        {
          valueMissing: validity.valueMissing,
        },
        message,
        this.selectElement,
      );
    }
  }

  private _syncOptionSelection() {
    if (!this.selectElement) {
      return;
    }

    // Update the selected state of all options to match this.values
    const options = this.selectElement.querySelectorAll('option');
    options.forEach((option) => {
      option.selected = this.values.includes(option.value);
    });
  }

  private _syncOptionsFromLightDOM() {
    if (!this.selectElement) return;

    // Get options from light DOM
    const lightDOMOptions = Array.from(this.querySelectorAll('option'));

    // Remove existing cloned options (keep placeholder if any)
    const existingOptions = Array.from(
      this.selectElement.querySelectorAll('option:not([data-placeholder])'),
    );
    existingOptions.forEach((opt) => {
      if (!opt.hasAttribute('data-placeholder')) {
        opt.remove();
      }
    });

    // Create programmatic options before compatibility light-DOM options.
    this.options.forEach((option) => {
      const element = document.createElement('option');
      element.value = option.value;
      element.textContent = option.label;
      element.disabled = option.disabled ?? false;
      element.selected = option.selected ?? false;
      this.selectElement.appendChild(element);
    });

    // Clone light DOM options into shadow DOM select.
    lightDOMOptions.forEach((option) => {
      const clone = option.cloneNode(true) as HTMLOptionElement;
      this.selectElement.appendChild(clone);
    });

    // Reapply controlled selection after replacing the native options.
    if (this.multiple) {
      this._syncOptionSelection();
    } else if (this.value) {
      this.selectElement.value = this.value;
    }

    // Adopt a declaratively selected option only when uncontrolled.
    const selectedOption = this.selectElement.querySelector<HTMLOptionElement>('option:checked');
    if (selectedOption && !this.value) {
      this.value = selectedOption.value;
      this._updateFormValue();
    }

    // Update validity after syncing options
    this._updateValidity();
  }

  private handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;

    if (this.multiple) {
      this.values = Array.from(select.selectedOptions).map((opt) => opt.value);
      this.dispatchEvent(
        new CustomEvent('ae-select-change', {
          detail: { value: this.values },
          bubbles: true,
          composed: true,
        }),
      );
    } else {
      this.value = select.value;
      this.dispatchEvent(
        new CustomEvent('ae-select-change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private handleFocus() {
    this.focused = true;
  }

  private handleBlur() {
    this.focused = false;
  }

  // Form-associated callbacks
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = this._defaultValue;
    this.values = [];
    this._updateFormValue();
    this._updateValidity();
  }

  formStateRestoreCallback(state: string | FormData | null, _mode: 'restore' | 'autocomplete') {
    if (state instanceof FormData) {
      this.values = state.getAll(this.name) as string[];
    } else {
      this.value = state || '';
    }
    this._updateFormValue();
    this._updateValidity();
  }

  // Public methods
  public focus(options?: FocusOptions) {
    this.selectElement?.focus(options);
  }

  public blur() {
    this.selectElement?.blur();
  }

  public checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  public reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  render() {
    const hasError = !!this.error;
    const showHelpText = this.helpText && !hasError;

    return html`
      <div part="base" class="select-base">
        ${this.label
          ? html`
              <label part="label" class="select-label" for="select">
                ${this.label}
                ${this.required ? html`<span class="required-indicator">*</span>` : ''}
              </label>
            `
          : ''}

        <div
          part="select-wrapper"
          class="select-wrapper ${this.focused ? 'focused' : ''} ${hasError ? 'error' : ''} ${this
            .disabled
            ? 'disabled'
            : ''}"
        >
          <select
            part="select"
            id="select"
            class="select-control"
            .value="${this.value}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?multiple="${this.multiple}"
            aria-label="${ifDefined(
              this.label ? undefined : this.ariaLabel || this.placeholder || 'Select',
            )}"
            @change="${this.handleChange}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
          >
            ${this.placeholder && !this.multiple
              ? html`
                  <option value="" disabled ?selected="${!this.value}" data-placeholder>
                    ${this.placeholder}
                  </option>
                `
              : ''}
            <slot></slot>
          </select>

          ${!this.multiple
            ? html`
                <svg
                  part="icon"
                  class="select-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7 8.5L10 11.5L13 8.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              `
            : ''}
        </div>

        ${showHelpText
          ? html` <div part="help-text" class="help-text">${this.helpText}</div> `
          : ''}
        ${hasError ? html` <div part="error-text" class="error-text">${this.error}</div> ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-select': AeSelect;
  }
}
