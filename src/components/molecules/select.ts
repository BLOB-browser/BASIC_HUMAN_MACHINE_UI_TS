/**
 * Select component — blob-select
 *
 * Styled wrapper around a native `<select>` element. Fully keyboard-accessible,
 * inherits all token CSS vars (colors, radius, font). Passes through all native
 * select semantics so screen readers and HTML forms work correctly.
 *
 * Use this instead of Dropdown when you need a real form field. Use Dropdown
 * when you need a command menu or non-form interaction.
 *
 * CSS class: blob-select-wrap
 *
 * @example
 * ```typescript
 * const sel = new Select({
 *   label:       'Country',
 *   placeholder: 'Choose a country…',
 *   options: [
 *     { value: 'us', label: 'United States' },
 *     { value: 'gb', label: 'United Kingdom' },
 *     { group: 'Other', items: [{ value: 'ca', label: 'Canada' }] },
 *   ],
 *   onChange: (value) => console.log(value),
 * });
 *
 * form.appendChild(sel.element);
 *
 * // Programmatic value
 * sel.setValue('gb');
 * console.log(sel.value); // 'gb'
 *
 * // Error state
 * sel.setError('Please select a country.');
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOptionItem {
  value:    string;
  label:    string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  group: string;
  items: SelectOptionItem[];
}

export type SelectOptionDef = SelectOptionItem | SelectOptionGroup;

export interface SelectOptions {
  options:      SelectOptionDef[];
  label?:       string;
  placeholder?: string;
  value?:       string;
  name?:        string;
  id?:          string;
  required?:    boolean;
  disabled?:    boolean;
  size?:        SelectSize;
  helper?:      string;
  error?:       string;
  onChange?:    (value: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Select {
  public element:   HTMLElement;
  public selectEl!: HTMLSelectElement;
  private _opts:    SelectOptions;
  private _error:   string | null = null;

  constructor(options: SelectOptions) {
    this._opts   = options;
    this._error  = options.error ?? null;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const {
      options, label, placeholder, value, name, id,
      required = false, disabled = false,
      size = 'md', helper, onChange,
    } = this._opts;

    const uid = id ?? `blob-select-${Math.random().toString(36).slice(2, 8)}`;

    const wrap = document.createElement('div');
    wrap.className = 'blob-select-wrap';

    // Label
    if (label) {
      const lbl = document.createElement('label');
      lbl.className = ['blob-select-wrap__label', required ? 'blob-select-wrap__label--required' : ''].filter(Boolean).join(' ');
      lbl.htmlFor   = uid;
      lbl.textContent = label;
      wrap.appendChild(lbl);
    }

    // Control row
    const control = document.createElement('div');
    control.className = 'blob-select-wrap__control';

    // <select>
    const sel = document.createElement('select');
    sel.id        = uid;
    sel.className = [
      'blob-select',
      size !== 'md' ? `blob-select--${size}` : '',
      this._error ? 'blob-select--error' : '',
    ].filter(Boolean).join(' ');
    if (name)     sel.name     = name;
    if (required) sel.required = true;
    if (disabled) sel.disabled = true;
    if (this._error) sel.setAttribute('aria-invalid', 'true');
    this.selectEl = sel;

    // Placeholder option
    if (placeholder) {
      const ph = document.createElement('option');
      ph.value       = '';
      ph.textContent = placeholder;
      ph.disabled    = true;
      ph.selected    = !value;
      sel.appendChild(ph);
    }

    // Options / groups
    for (const opt of options) {
      if ('group' in opt) {
        const grp = document.createElement('optgroup');
        grp.label = opt.group;
        for (const item of opt.items) {
          const o = document.createElement('option');
          o.value        = item.value;
          o.textContent  = item.label;
          if (item.disabled) o.disabled = true;
          if (value === item.value) o.selected = true;
          grp.appendChild(o);
        }
        sel.appendChild(grp);
      } else {
        const o = document.createElement('option');
        o.value        = opt.value;
        o.textContent  = opt.label;
        if (opt.disabled) o.disabled = true;
        if (value === opt.value) o.selected = true;
        sel.appendChild(o);
      }
    }

    sel.addEventListener('change', () => onChange?.(sel.value));
    control.appendChild(sel);

    // Chevron
    const chevron = document.createElement('span');
    chevron.className = 'blob-select-wrap__chevron';
    chevron.innerHTML = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5l4 4 4-4"/></svg>';
    control.appendChild(chevron);

    wrap.appendChild(control);

    // Helper / error text
    if (this._error) {
      const errEl = document.createElement('div');
      errEl.className   = 'blob-select-wrap__error';
      errEl.textContent = this._error;
      errEl.setAttribute('role', 'alert');
      wrap.appendChild(errEl);
    } else if (helper) {
      const helpEl = document.createElement('div');
      helpEl.className   = 'blob-select-wrap__helper';
      helpEl.textContent = helper;
      wrap.appendChild(helpEl);
    }

    return wrap;
  }

  public get value(): string { return this.selectEl.value; }

  public setValue(val: string): void {
    this.selectEl.value = val;
  }

  public setError(error: string | null): void {
    this._error = error;
    const next  = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled = disabled;
    this.selectEl.disabled = disabled;
  }
}
