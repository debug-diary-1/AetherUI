import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import { inputStyles } from './styles';

/**
 * A text input component with support for various input types, validation, and form participation.
 * Participates in native form submission via ElementInternals API.
 * Enabled, named inputs submit empty strings. Validity follows changes to native constraints.
 *
 * @element ae-input
 *
 * @property {string} type - The type of input (text, email, password, number, tel, url, search)
 * @property {string} value - The current input value
 * @property {string} defaultValue - Initial value for uncontrolled usage
 * @property {string} placeholder - Placeholder text
 * @property {string} label - Label text for the input
 * @property {string} name - The name attribute for form submission
 * @property {boolean} disabled - Whether the input is disabled
 * @property {boolean} required - Whether the input is required
 * @property {boolean} readonly - Whether the input is readonly
 * @property {string} error - Error message to display
 * @property {string} helpText - Helper text to display below the input
 * @property {number} minlength - Minimum length for text inputs
 * @property {number} maxlength - Maximum length for text inputs
 * @property {string} pattern - Regex pattern for validation
 * @property {number} min - Minimum value for number inputs
 * @property {number} max - Maximum value for number inputs
 * @property {number} step - Step value for number inputs
 * @property {string} autocomplete - Autocomplete attribute
 * @property {boolean} clearable - Whether to show a clear button
 * @property {string} ariaLabel - Accessible label for the input (used when no visible label)
 *
 * @fires {CustomEvent<{value: string}>} ae-input-change - Fired when the input value changes
 * @fires {CustomEvent<{value: string}>} ae-input-input - Fired on input event
 * @fires {CustomEvent<void>} ae-input-focus - Fired when input receives focus
 * @fires {CustomEvent<void>} ae-input-blur - Fired when input loses focus
 * @fires {CustomEvent<void>} ae-input-clear - Fired when clear button is clicked
 *
 * @slot prefix - Content to display before the input
 * @slot suffix - Content to display after the input
 *
 * @csspart base - The component's base wrapper
 * @csspart label - The label element
 * @csspart input-wrapper - The wrapper around the input and slots
 * @csspart input - The native input element
 * @csspart prefix - The prefix slot container
 * @csspart suffix - The suffix slot container
 * @csspart clear-button - The clear button
 * @csspart help-text - The help text element
 * @csspart error-text - The error text element
 *
 * @example
 * ```html
 * <ae-input label="Email" type="email" name="email" required></ae-input>
 *
 * <ae-input
 *   label="Password"
 *   type="password"
 *   name="password"
 *   minlength="8"
 *   error="Password must be at least 8 characters"
 * ></ae-input>
 *
 * <ae-input
 *   label="Search"
 *   type="search"
 *   clearable
 *   placeholder="Search..."
 * ></ae-input>
 * ```
 */
@customElement('ae-input')
export class AeInput extends LitElement {
  static styles = inputStyles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: String, reflect: true })
  accessor type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';

  @property({ type: String })
  accessor value = '';

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
  accessor readonly = false;

  @property({ type: String })
  accessor error = '';

  @property({ type: String, attribute: 'help-text' })
  accessor helpText = '';

  @property({ type: Number })
  accessor minlength: number | undefined = undefined;

  @property({ type: Number })
  accessor maxlength: number | undefined = undefined;

  @property({ type: String })
  accessor pattern: string | undefined = undefined;

  @property({ type: Number })
  accessor min: number | undefined = undefined;

  @property({ type: Number })
  accessor max: number | undefined = undefined;

  @property({ type: Number })
  accessor step: number | undefined = undefined;

  @property({ type: String })
  accessor autocomplete: string | undefined = undefined;

  @property({ type: Boolean, reflect: true })
  accessor clearable = false;

  @property({ type: String, attribute: 'aria-label' })
  accessor ariaLabel = '';

  @state()
  private accessor focused = false;

  @query('input')
  private accessor inputElement!: HTMLInputElement;

  private _internals: ElementInternals;
  private _defaultValue = '';

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
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._updateFormValue();
      this._updateValidity();
    }

    if (
      changedProperties.has('type') ||
      changedProperties.has('step') ||
      changedProperties.has('readonly') ||
      changedProperties.has('disabled') ||
      changedProperties.has('required') ||
      changedProperties.has('pattern') ||
      changedProperties.has('minlength') ||
      changedProperties.has('maxlength') ||
      changedProperties.has('min') ||
      changedProperties.has('max')
    ) {
      this._updateValidity();
    }
  }

  private _updateFormValue() {
    this._internals.setFormValue(this.value);
  }

  private _updateValidity() {
    if (!this.inputElement) return;

    // Reset validity
    this._internals.setValidity({});

    const validity = this.inputElement.validity;

    if (!validity.valid) {
      this._internals.setValidity(
        {
          valueMissing: validity.valueMissing,
          typeMismatch: validity.typeMismatch,
          patternMismatch: validity.patternMismatch,
          tooLong: validity.tooLong,
          tooShort: validity.tooShort,
          rangeUnderflow: validity.rangeUnderflow,
          rangeOverflow: validity.rangeOverflow,
          stepMismatch: validity.stepMismatch,
        },
        this.inputElement.validationMessage,
        this.inputElement,
      );
    }
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('ae-input-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('ae-input-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleFocus() {
    this.focused = true;
    this.dispatchEvent(
      new CustomEvent('ae-input-focus', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleBlur() {
    this.focused = false;
    this.dispatchEvent(
      new CustomEvent('ae-input-blur', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleClear() {
    this.value = '';
    this.inputElement?.focus();

    this.dispatchEvent(
      new CustomEvent('ae-input-clear', {
        bubbles: true,
        composed: true,
      }),
    );

    this.dispatchEvent(
      new CustomEvent('ae-input-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // Form-associated callbacks
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = this._defaultValue;
    this._updateFormValue();
    this._updateValidity();
  }

  formStateRestoreCallback(state: string | null, _mode: 'restore' | 'autocomplete') {
    this.value = state || '';
    this._updateFormValue();
    this._updateValidity();
  }

  // Public methods
  public focus(options?: FocusOptions) {
    this.inputElement?.focus(options);
  }

  public blur() {
    this.inputElement?.blur();
  }

  public select() {
    this.inputElement?.select();
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
      <div part="base" class="input-base">
        ${
          this.label
            ? html`
                <label part="label" class="input-label" for="input">
                  ${this.label}
                  ${this.required ? html`<span class="required-indicator">*</span>` : ''}
                </label>
              `
            : ''
        }

        <div
          part="input-wrapper"
          class="input-wrapper ${this.focused ? 'focused' : ''} ${hasError ? 'error' : ''} ${
            this.disabled ? 'disabled' : ''
          }"
        >
          <slot name="prefix" part="prefix"></slot>

          <input
            part="input"
            id="input"
            class="input-control"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            minlength="${ifDefined(this.minlength)}"
            maxlength="${ifDefined(this.maxlength)}"
            pattern="${ifDefined(this.pattern)}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            step="${ifDefined(this.step)}"
            autocomplete="${ifDefined(this.autocomplete)}"
            aria-label="${ifDefined(
              this.label ? undefined : this.ariaLabel || this.placeholder || undefined,
            )}"
            @input="${this.handleInput}"
            @change="${this.handleChange}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
          />

          ${
            this.clearable && this.value && !this.disabled && !this.readonly
              ? html`
                  <button
                    part="clear-button"
                    class="clear-button"
                    type="button"
                    @click="${this.handleClear}"
                    aria-label="Clear input"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                `
              : ''
          }

          <slot name="suffix" part="suffix"></slot>
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
    'ae-input': AeInput;
  }
}
