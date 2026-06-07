/**
 * Textarea component — blob-textarea
 *
 * Multi-line plain text field with label, helper, error, and optional resize
 * control. This is the raw atom (fixed height). For the auto-growing chat
 * variant see ChatInput.
 *
 * CSS class: blob-textarea-wrapper  (outer)
 *            blob-textarea-label    (label)
 *            blob-textarea-field    (the <textarea>)
 *            blob-textarea-helper   (helper / error text)
 * Modifiers: blob-textarea--error  blob-textarea--disabled
 *
 * @example
 * ```typescript
 * const notes = new Textarea({ label: 'Notes', rows: 4, placeholder: 'Add a note…' });
 * const bio   = new Textarea({ label: 'Bio', maxLength: 280, showCount: true });
 *
 * notes.setValue('Hello');
 * notes.setError('Too long');
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface TextareaOptions {
  label?:       string;
  placeholder?: string;
  value?:       string;
  rows?:        number;
  maxLength?:   number;
  /** Show a live character count when maxLength is set. */
  showCount?:   boolean;
  resize?:      boolean;
  disabled?:    boolean;
  required?:    boolean;
  name?:        string;
  helper?:      string;
  error?:       string;
  onChange?:    (value: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Textarea {
  public element:       HTMLElement;
  /** The native `<textarea>` element. */
  public textareaEl!:   HTMLTextAreaElement;
  private _countEl:     HTMLElement | null = null;
  private _opts:        TextareaOptions;

  constructor(options: TextareaOptions = {}) {
    this._opts    = options;
    this.element  = this.build();
  }

  private build(): HTMLElement {
    const {
      label, placeholder, value = '', rows = 4,
      maxLength, showCount, resize = true, disabled = false,
      required = false, name, helper, error,
    } = this._opts;

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-textarea-wrapper',
      error            ? 'blob-textarea--error'     : '',
      !resize          ? 'blob-textarea--no-resize'  : '',
    ].filter(Boolean).join(' ');

    // Label
    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className   = 'blob-textarea-label';
      labelEl.textContent = label;
      if (required) {
        const req = document.createElement('span');
        req.textContent = '*';
        req.style.color = '#dc2626';
        req.setAttribute('aria-hidden', 'true');
        labelEl.appendChild(req);
      }
      wrapper.appendChild(labelEl);
    }

    // Textarea
    const textarea = document.createElement('textarea');
    textarea.className   = 'blob-textarea-field';
    textarea.rows        = rows;
    textarea.value       = value;
    textarea.disabled    = disabled;
    textarea.required    = required;
    if (placeholder) textarea.placeholder = placeholder;
    if (maxLength)   textarea.maxLength   = maxLength;
    if (name)        textarea.name        = name;
    this.textareaEl = textarea;

    textarea.addEventListener('input', () => {
      if (this._countEl && maxLength) {
        const len = textarea.value.length;
        this._countEl.textContent = `${len} / ${maxLength}`;
        this._countEl.classList.toggle('blob-textarea-count--over', len > maxLength);
      }
      this._opts.onChange?.(textarea.value);
    });

    wrapper.appendChild(textarea);

    // Footer (helper + count)
    const helpText = error || helper;
    if (helpText || (showCount && maxLength)) {
      const footer = document.createElement('div');
      footer.className = 'blob-textarea-footer';

      if (helpText) {
        const helperEl = document.createElement('span');
        helperEl.className   = 'blob-textarea-helper';
        helperEl.textContent = helpText;
        footer.appendChild(helperEl);
      }

      if (showCount && maxLength) {
        const countEl = document.createElement('span');
        countEl.className   = 'blob-textarea-count';
        countEl.textContent = `${value.length} / ${maxLength}`;
        this._countEl       = countEl;
        footer.appendChild(countEl);
      }

      wrapper.appendChild(footer);
    }

    return wrapper;
  }

  public getValue(): string          { return this.textareaEl?.value ?? ''; }
  public setValue(value: string): void {
    this.textareaEl.value = value;
    if (this._countEl && this._opts.maxLength) {
      this._countEl.textContent = `${value.length} / ${this._opts.maxLength}`;
    }
  }
  public focus(): void { this.textareaEl?.focus(); }

  public setError(msg: string): void {
    this._opts.error = msg;
    this.element.classList.add('blob-textarea--error');
    const helperEl = this.element.querySelector('.blob-textarea-helper');
    if (helperEl) helperEl.textContent = msg;
    else {
      let footer = this.element.querySelector('.blob-textarea-footer') as HTMLElement | null;
      if (!footer) {
        footer = document.createElement('div');
        footer.className = 'blob-textarea-footer';
        this.element.appendChild(footer);
      }
      const helperNew = document.createElement('span');
      helperNew.className   = 'blob-textarea-helper';
      helperNew.textContent = msg;
      footer.prepend(helperNew);
    }
  }

  public clearError(): void {
    this._opts.error = undefined;
    this.element.classList.remove('blob-textarea--error');
    this.element.querySelector('.blob-textarea-helper')?.remove();
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled         = disabled;
    this.textareaEl.disabled    = disabled;
  }
}
