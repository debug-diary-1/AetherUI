import { LitElement, html, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import { selectStyles } from './styles';
import { arraysShallowEqual, toArrayCopy } from '../internal/array-props';

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

  private _values: string[] = [];

  /**
   * Set only when the consumer (or the user, via a change) writes `values`.
   * Internal writes — adoption of authored `selected` options and form
   * resets — go through assignValues() and never latch, so declarative
   * defaults keep working until the consumer actually takes control.
   */
  private _valuesWereSet = false;

  /** @default [] */
  @property({ type: Array })
  set values(next: string[]) {
    this._valuesWereSet = true;
    this.assignValues(next);
  }
  get values(): string[] {
    return [...this._values];
  }

  /** Internal write path for `values` that does not mark the select controlled. */
  private assignValues(next: unknown) {
    const values = toArrayCopy<string>(next);
    const previous = this._values;
    if (arraysShallowEqual(previous, values)) return;
    this._values = values;
    this.requestUpdate('values', previous);
  }

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

  private _options: SelectOption[] = [];

  /** @default [] */
  @property({ type: Array })
  set options(next: SelectOption[]) {
    const options = toArrayCopy<SelectOption>(next);
    const previous = this._options;
    if (arraysShallowEqual(previous, options)) return;
    this._options = options;
    this.requestUpdate('options', previous);
  }
  get options(): SelectOption[] {
    return [...this._options];
  }

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
      // Apply the single-select value imperatively. The template deliberately
      // has no `.value` binding: assigning HTMLSelectElement.value collapses
      // a multiple-select's selection to a single option on every render.
      if (!this.multiple && changedProperties.has('value') && this.selectElement) {
        this.selectElement.value = this.value;
      }

      // Update option selection state in multiple mode
      if (this.multiple && changedProperties.has('values')) {
        this._syncOptionSelection();
      }

      this._updateFormValue();
      this._updateValidity();
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

    // Preserve the current selection after replacing the native options.
    // While uncontrolled, authored `selected` state stays authoritative: a
    // replaced option set is re-adopted rather than leaving `values` holding
    // ids that no longer exist in the list.
    if (this.multiple) {
      if (this._valuesWereSet) {
        this._syncOptionSelection();
      } else {
        // Uncontrolled: the rendered options are the source of truth, so a
        // replaced option set re-adopts (and drops ids that are gone).
        const selectedValues = Array.from(
          this.selectElement.selectedOptions,
          (option) => option.value,
        );
        const changed = !arraysShallowEqual(this._values, selectedValues);
        this.assignValues(selectedValues);
        if (changed) this._updateFormValue();
      }
    } else {
      if (this.value) {
        this.selectElement.value = this.value;
      } else {
        // Adopt a declaratively selected option only when uncontrolled.
        const selectedOption =
          this.selectElement.querySelector<HTMLOptionElement>('option:checked');
        if (selectedOption && !selectedOption.hasAttribute('data-placeholder')) {
          this.value = selectedOption.value;
          this._updateFormValue();
        }
      }
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
    // Native reset semantics: restore the authored defaults (`selected`
    // attributes on light-DOM options and `selected` flags on programmatic
    // options) rather than clearing. Uses the internal write paths so a reset
    // never marks the select as controlled.
    const defaults = this._getDefaultValues();
    if (this.multiple) {
      this.assignValues(defaults);
      this._syncOptionSelection();
    } else {
      // An explicit `value`/`default-value` on the element wins over an
      // authored `selected` option, matching how the initial value is chosen.
      this.value = this._defaultValue || defaults[0] || '';
    }
    this._updateFormValue();
    this._updateValidity();
  }

  /**
   * Authored default selection, mirroring HTMLOptionElement.defaultSelected.
   * Programmatic and light-DOM options are rendered into the same list, so
   * the result is de-duplicated to match what the native select can report.
   */
  private _getDefaultValues(): string[] {
    const fromOptions = this._options
      .filter((option) => option.selected)
      .map((option) => option.value);
    const fromLightDOM = Array.from(this.querySelectorAll('option'))
      .filter((option) => option.defaultSelected)
      .map((option) => option.value);
    return [...new Set([...fromOptions, ...fromLightDOM])];
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
        ${
          this.label
            ? html`
                <label part="label" class="select-label" for="select">
                  ${this.label}
                  ${this.required ? html`<span class="required-indicator">*</span>` : ''}
                </label>
              `
            : ''
        }

        <div
          part="select-wrapper"
          class="select-wrapper ${this.focused ? 'focused' : ''} ${hasError ? 'error' : ''} ${
            this.disabled ? 'disabled' : ''
          }"
        >
          <select
            part="select"
            id="select"
            class="select-control"
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
            ${
              this.placeholder && !this.multiple
                ? html`
                    <option value="" disabled ?selected="${!this.value}" data-placeholder>
                      ${this.placeholder}
                    </option>
                  `
                : ''
            }
            <slot></slot>
          </select>

          ${
            !this.multiple
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
              : ''
          }
        </div>

        ${
          showHelpText ? html` <div part="help-text" class="help-text">${this.helpText}</div> ` : ''
        }
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
