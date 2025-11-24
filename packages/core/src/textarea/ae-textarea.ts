import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { textareaStyles } from './styles';

/**
 * A textarea component with support for auto-resize, character counting, and form participation.
 * Participates in native form submission via ElementInternals API.
 *
 * @element ae-textarea
 *
 * @property {string} value - The current textarea value
 * @property {string} defaultValue - Initial value for uncontrolled usage
 * @property {string} placeholder - Placeholder text
 * @property {string} label - Label text for the textarea
 * @property {string} name - The name attribute for form submission
 * @property {boolean} disabled - Whether the textarea is disabled
 * @property {boolean} required - Whether the textarea is required
 * @property {boolean} readonly - Whether the textarea is readonly
 * @property {string} error - Error message to display
 * @property {string} helpText - Helper text to display below the textarea
 * @property {number} minlength - Minimum length
 * @property {number} maxlength - Maximum length
 * @property {number} rows - Number of visible text rows
 * @property {boolean} resize - Whether the textarea can be manually resized (none, vertical, horizontal, both)
 * @property {boolean} autoResize - Whether to automatically resize based on content
 * @property {boolean} showCount - Whether to show character count
 *
 * @fires {CustomEvent<{value: string}>} ae-textarea-change - Fired when the textarea value changes
 * @fires {CustomEvent<{value: string}>} ae-textarea-input - Fired on input event
 * @fires {CustomEvent<void>} ae-textarea-focus - Fired when textarea receives focus
 * @fires {CustomEvent<void>} ae-textarea-blur - Fired when textarea loses focus
 *
 * @csspart base - The component's base wrapper
 * @csspart label - The label element
 * @csspart textarea-wrapper - The wrapper around the textarea
 * @csspart textarea - The native textarea element
 * @csspart footer - The footer container
 * @csspart help-text - The help text element
 * @csspart char-count - The character count element
 * @csspart error-text - The error text element
 *
 * @example
 * ```html
 * <ae-textarea label="Description" name="description" required></ae-textarea>
 *
 * <ae-textarea
 *   label="Comment"
 *   name="comment"
 *   maxlength="500"
 *   show-count
 *   auto-resize
 * ></ae-textarea>
 * ```
 */
@customElement('ae-textarea')
export class AeTextarea extends LitElement {
  static styles = textareaStyles;
  static formAssociated = true;

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

  @property({ type: Number })
  accessor rows = 4;

  @property({ type: String, reflect: true })
  accessor resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  @property({ type: Boolean, attribute: 'auto-resize' })
  accessor autoResize = false;

  @property({ type: Boolean, attribute: 'show-count' })
  accessor showCount = false;

  @state()
  private accessor focused = false;

  @query('textarea')
  private accessor textareaElement!: HTMLTextAreaElement;

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
      if (this.autoResize) {
        this._adjustHeight();
      }
    }

    if (changedProperties.has('required') || changedProperties.has('minlength') ||
        changedProperties.has('maxlength')) {
      this._updateValidity();
    }
  }

  private _updateFormValue() {
    this._internals.setFormValue(this.value || null);
  }

  private _updateValidity() {
    if (!this.textareaElement) return;

    // Reset validity
    this._internals.setValidity({});

    const validity = this.textareaElement.validity;

    if (!validity.valid) {
      this._internals.setValidity(
        {
          valueMissing: validity.valueMissing,
          tooLong: validity.tooLong,
          tooShort: validity.tooShort,
        },
        this.textareaElement.validationMessage,
        this.textareaElement
      );
    }
  }

  private _adjustHeight() {
    if (!this.textareaElement || !this.autoResize) return;

    // Reset height to auto to get the correct scrollHeight
    this.textareaElement.style.height = 'auto';
    this.textareaElement.style.height = `${this.textareaElement.scrollHeight}px`;
  }

  private handleInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;

    this.dispatchEvent(new CustomEvent('ae-textarea-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private handleChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;

    this.dispatchEvent(new CustomEvent('ae-textarea-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private handleFocus() {
    this.focused = true;
    this.dispatchEvent(new CustomEvent('ae-textarea-focus', {
      bubbles: true,
      composed: true,
    }));
  }

  private handleBlur() {
    this.focused = false;
    this.dispatchEvent(new CustomEvent('ae-textarea-blur', {
      bubbles: true,
      composed: true,
    }));
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
    this.textareaElement?.focus(options);
  }

  public blur() {
    this.textareaElement?.blur();
  }

  public select() {
    this.textareaElement?.select();
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
    const charCount = this.value.length;
    const showCharCount = this.showCount && this.maxlength;

    return html`
      <div part="base" class="textarea-base">
        ${this.label ? html`
          <label part="label" class="textarea-label" for="textarea">
            ${this.label}
            ${this.required ? html`<span class="required-indicator">*</span>` : ''}
          </label>
        ` : ''}

        <div
          part="textarea-wrapper"
          class="textarea-wrapper ${this.focused ? 'focused' : ''} ${hasError ? 'error' : ''} ${this.disabled ? 'disabled' : ''}"
        >
          <textarea
            part="textarea"
            id="textarea"
            class="textarea-control resize-${this.resize}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            minlength="${ifDefined(this.minlength)}"
            maxlength="${ifDefined(this.maxlength)}"
            rows="${this.rows}"
            @input="${this.handleInput}"
            @change="${this.handleChange}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
          ></textarea>
        </div>

        ${showHelpText || showCharCount ? html`
          <div part="footer" class="textarea-footer">
            ${showHelpText ? html`
              <div part="help-text" class="help-text">${this.helpText}</div>
            ` : ''}
            ${showCharCount ? html`
              <div part="char-count" class="char-count">
                ${charCount}/${this.maxlength}
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${hasError ? html`
          <div part="error-text" class="error-text">${this.error}</div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-textarea': AeTextarea;
  }
}
