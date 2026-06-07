/**
 * Checkbox component — blob-checkbox
 *
 * Custom-styled checkbox backed by a native hidden `<input type="checkbox">`.
 * The native input stays in the DOM for form-submission compatibility.
 * Supports indeterminate state (e.g. "select all" when some children are checked).
 *
 * CSS class: blob-checkbox  (the outer <label>)
 * Modifiers: blob-checkbox--error  blob-checkbox--disabled
 *
 * @example
 * ```typescript
 * const cb = new Checkbox({ label: 'Remember me', onChange: (v) => save(v) });
 * const all = new Checkbox({ label: 'Select all', indeterminate: true });
 *
 * cb.setChecked(true);
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface CheckboxOptions {
  label?:         string;
  checked?:       boolean;
  indeterminate?: boolean;
  disabled?:      boolean;
  /** Optional name attribute for form submission. */
  name?:          string;
  value?:         string;
  helper?:        string;
  error?:         string;
  onChange?:      (checked: boolean) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Checkbox {
  public element:    HTMLElement;
  /** The native `<input type="checkbox">` for direct form access. */
  public inputEl!:   HTMLInputElement;
  private _checked:  boolean;
  private _opts:     CheckboxOptions;

  constructor(options: CheckboxOptions = {}) {
    this._checked = options.checked ?? false;
    this._opts    = options;
    this.element  = this.build();
  }

  private build(): HTMLElement {
    const {
      label, indeterminate = false, disabled = false,
      name, value, helper, error,
    } = this._opts;

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-checkbox',
      error    ? 'blob-checkbox--error'    : '',
      disabled ? 'blob-checkbox--disabled' : '',
    ].filter(Boolean).join(' ');

    const labelEl = document.createElement('label');
    labelEl.style.display    = 'inline-flex';
    labelEl.style.alignItems = 'flex-start';
    labelEl.style.gap        = '0.5rem';
    labelEl.style.cursor     = disabled ? 'not-allowed' : 'pointer';

    // Control
    const control = document.createElement('span');
    control.className = 'blob-checkbox__control';

    const input = document.createElement('input');
    input.type           = 'checkbox';
    input.className      = 'blob-checkbox__input';
    input.checked        = this._checked;
    input.indeterminate  = indeterminate;
    input.disabled       = disabled;
    if (name)  input.name  = name;
    if (value) input.value = value;
    this.inputEl = input;

    input.addEventListener('change', () => {
      this._checked = input.checked;
      this._opts.onChange?.(this._checked);
    });

    // Custom box
    const box = document.createElement('span');
    box.className = 'blob-checkbox__box';
    box.setAttribute('aria-hidden', 'true');

    // Checkmark SVG
    const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    check.setAttribute('class', 'blob-checkbox__check');
    check.setAttribute('viewBox', '0 0 10 10');
    check.setAttribute('fill', 'none');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1.5 5.5L4 8L8.5 2');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.75');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    check.appendChild(path);
    box.appendChild(check);

    // Dash (indeterminate)
    const dash = document.createElement('span');
    dash.className = 'blob-checkbox__dash';
    dash.setAttribute('aria-hidden', 'true');
    box.appendChild(dash);

    control.appendChild(input);
    control.appendChild(box);
    labelEl.appendChild(control);

    if (label) {
      const text = document.createElement('span');
      text.textContent = label;
      labelEl.appendChild(text);
    }

    wrapper.appendChild(labelEl);

    // Helper / error text
    const helpText = error || helper;
    if (helpText) {
      const helperEl = document.createElement('span');
      helperEl.className   = 'blob-checkbox__helper';
      helperEl.textContent = helpText;
      wrapper.appendChild(helperEl);
    }

    return wrapper;
  }

  public get checked(): boolean  { return this._checked; }
  public get value():   string   { return this.inputEl?.value ?? ''; }

  public setChecked(checked: boolean): void {
    this._checked        = checked;
    this.inputEl.checked = checked;
  }

  public setIndeterminate(value: boolean): void {
    this.inputEl.indeterminate = value;
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled       = disabled;
    this.inputEl.disabled     = disabled;
    this.element.classList.toggle('blob-checkbox--disabled', disabled);
  }

  public setError(msg: string): void {
    this._opts.error = msg;
    // Rebuild the helper text only — not full re-render
    const existing = this.element.querySelector('.blob-checkbox__helper');
    if (existing) existing.textContent = msg;
    else {
      const helperEl = document.createElement('span');
      helperEl.className   = 'blob-checkbox__helper';
      helperEl.textContent = msg;
      this.element.appendChild(helperEl);
    }
    this.element.classList.add('blob-checkbox--error');
  }

  public clearError(): void {
    this._opts.error = undefined;
    this.element.classList.remove('blob-checkbox--error');
    this.element.querySelector('.blob-checkbox__helper')?.remove();
  }
}
