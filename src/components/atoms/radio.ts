/**
 * Radio component — blob-radio
 *
 * Single radio button atom. Typically composed into groups (RadioGroup molecule)
 * but usable standalone. Backed by a native `<input type="radio">` for form
 * compatibility and native radio-group keyboard behaviour.
 *
 * CSS class: blob-radio  (the outer wrapper)
 * Modifiers: blob-radio--error  blob-radio--disabled
 *
 * @example
 * ```typescript
 * // Standalone
 * const rb = new Radio({ label: 'Option A', name: 'plan', value: 'a', onChange: console.log });
 *
 * // Group — share the same `name` attribute; browser handles exclusivity
 * const a = new Radio({ label: 'Monthly', name: 'billing', value: 'monthly', checked: true });
 * const b = new Radio({ label: 'Yearly',  name: 'billing', value: 'yearly' });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface RadioOptions {
  label?:    string;
  name:      string;
  value:     string;
  checked?:  boolean;
  disabled?: boolean;
  helper?:   string;
  error?:    string;
  onChange?: (value: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Radio {
  public element:   HTMLElement;
  /** The native `<input type="radio">`. */
  public inputEl!:  HTMLInputElement;
  private _opts:    RadioOptions;

  constructor(options: RadioOptions) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { label, name, value, checked = false, disabled = false, helper, error } = this._opts;

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-radio',
      error    ? 'blob-radio--error'    : '',
      disabled ? 'blob-radio--disabled' : '',
    ].filter(Boolean).join(' ');

    const labelEl = document.createElement('label');
    labelEl.style.display    = 'inline-flex';
    labelEl.style.alignItems = 'flex-start';
    labelEl.style.gap        = '0.5rem';
    labelEl.style.cursor     = disabled ? 'not-allowed' : 'pointer';

    // Control
    const control = document.createElement('span');
    control.className = 'blob-radio__control';

    const input = document.createElement('input');
    input.type     = 'radio';
    input.className = 'blob-radio__input';
    input.name     = name;
    input.value    = value;
    input.checked  = checked;
    input.disabled = disabled;
    this.inputEl   = input;

    input.addEventListener('change', () => {
      if (input.checked) this._opts.onChange?.(value);
    });

    // Custom circle
    const circle = document.createElement('span');
    circle.className = 'blob-radio__circle';
    circle.setAttribute('aria-hidden', 'true');

    const dot = document.createElement('span');
    dot.className = 'blob-radio__dot';
    circle.appendChild(dot);

    control.appendChild(input);
    control.appendChild(circle);
    labelEl.appendChild(control);

    if (label) {
      const text = document.createElement('span');
      text.textContent = label;
      labelEl.appendChild(text);
    }

    wrapper.appendChild(labelEl);

    const helpText = error || helper;
    if (helpText) {
      const helperEl = document.createElement('span');
      helperEl.className   = 'blob-radio__helper';
      helperEl.textContent = helpText;
      wrapper.appendChild(helperEl);
    }

    return wrapper;
  }

  public get checked(): boolean  { return this.inputEl?.checked ?? false; }
  public get value():   string   { return this._opts.value; }

  public setChecked(checked: boolean): void {
    this.inputEl.checked = checked;
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled       = disabled;
    this.inputEl.disabled     = disabled;
    this.element.classList.toggle('blob-radio--disabled', disabled);
  }
}
