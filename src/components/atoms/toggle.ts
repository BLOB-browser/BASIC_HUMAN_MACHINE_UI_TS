/**
 * Toggle component — blob-toggle
 *
 * Boolean on/off pill control. Uses `<button role="switch" aria-checked>` for
 * accessibility. The sliding thumb animation is pure CSS via aria-checked.
 * Optional text label wraps everything in a `<label>`.
 *
 * CSS class: blob-toggle  (the <button> track)
 * Sizes:     blob-toggle--sm  blob-toggle--md (default)  blob-toggle--lg
 *
 * @example
 * ```typescript
 * const toggle = new Toggle({ label: 'Enable notifications', checked: true, onChange: (v) => save(v) });
 * const compact = new Toggle({ onChange: (v) => console.log(v) }); // no label
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleOptions {
  checked?:   boolean;
  label?:     string;
  size?:      ToggleSize;
  disabled?:  boolean;
  /** Called with the new checked value after each toggle. */
  onChange?:  (checked: boolean) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Toggle {
  /** Outermost element — the `<label>` wrapper when a label is set, else the `<button>`. */
  public element:   HTMLElement;
  /** Always the `<button role="switch">` track. */
  public trackEl:   HTMLButtonElement;
  private _checked: boolean;
  private _opts:    ToggleOptions;

  constructor(options: ToggleOptions = {}) {
    this._checked = options.checked ?? false;
    this._opts    = options;
    const { track, wrapper } = this.build();
    this.trackEl  = track;
    this.element  = wrapper ?? track;
  }

  private build(): { track: HTMLButtonElement; wrapper?: HTMLElement } {
    const { label, size = 'md', disabled = false } = this._opts;

    // Track button
    const track = document.createElement('button');
    track.type  = 'button';
    track.className = ['blob-toggle', `blob-toggle--${size}`].join(' ');
    track.setAttribute('role', 'switch');
    track.setAttribute('aria-checked', String(this._checked));
    if (disabled) track.disabled = true;

    const thumb = document.createElement('span');
    thumb.className = 'blob-toggle__thumb';
    thumb.setAttribute('aria-hidden', 'true');
    track.appendChild(thumb);

    // Click — update DOM in place (no rebuild, keeps event listeners)
    track.addEventListener('click', () => {
      if (this._opts.disabled) return;
      this._checked = !this._checked;
      track.setAttribute('aria-checked', String(this._checked));
      this._opts.onChange?.(this._checked);
    });

    if (!label) return { track };

    // Wrapper label
    const wrapper = document.createElement('label');
    wrapper.className = [
      'blob-toggle-wrapper',
      disabled ? 'blob-toggle-wrapper--disabled' : '',
    ].filter(Boolean).join(' ');

    wrapper.appendChild(track);

    const labelEl = document.createElement('span');
    labelEl.className   = ['blob-toggle__label', `blob-toggle__label--${size}`].join(' ');
    labelEl.textContent = label;
    wrapper.appendChild(labelEl);

    return { track, wrapper };
  }

  /** Get current checked state. */
  public get checked(): boolean { return this._checked; }

  /** Programmatically set state. Does NOT fire onChange. */
  public setChecked(checked: boolean): void {
    this._checked = checked;
    this.trackEl.setAttribute('aria-checked', String(checked));
  }

  /** Toggle and fire onChange. */
  public toggle(): void {
    this.trackEl.click();
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled   = disabled;
    this.trackEl.disabled = disabled;
    if (this._opts.label && this.element !== this.trackEl) {
      this.element.classList.toggle('blob-toggle-wrapper--disabled', disabled);
    }
  }
}
