/**
 * Counter component — blob-counter
 *
 * Numeric stepper with decrement (−) and increment (+) controls.
 * Respects optional min/max/step bounds.
 *
 * CSS class: blob-counter
 * Sizes:     blob-counter--sm  blob-counter--md (default)  blob-counter--lg
 *
 * @example
 * ```typescript
 * const qty = new Counter({ value: 1, min: 1, max: 99, onChange: (v) => setQty(v) });
 * const zoom = new Counter({ value: 100, step: 10, min: 10, max: 200,
 *                            format: (v) => `${v}%` });
 *
 * qty.setValue(5);
 * console.log(qty.value); // → 5
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type CounterSize = 'sm' | 'md' | 'lg';

export interface CounterOptions {
  value?:    number;
  min?:      number;
  max?:      number;
  step?:     number;
  size?:     CounterSize;
  disabled?: boolean;
  /** Format the displayed value. E.g. `(v) => \`${v}%\`` */
  format?:   (value: number) => string;
  onChange?: (value: number) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Counter {
  public element:    HTMLElement;
  private _value:    number;
  private _decBtn!:  HTMLButtonElement;
  private _incBtn!:  HTMLButtonElement;
  private _valEl!:   HTMLElement;
  private _opts:     CounterOptions;

  constructor(options: CounterOptions = {}) {
    this._opts  = { step: 1, size: 'md', ...options };
    this._value = options.value ?? 0;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { min, max, size = 'md', disabled = false, format } = this._opts;

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-counter',
      `blob-counter--${size}`,
      disabled ? 'blob-counter--disabled' : '',
    ].filter(Boolean).join(' ');
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', 'Counter');

    // Decrement
    const dec = document.createElement('button');
    dec.type      = 'button';
    dec.className = 'blob-counter__btn';
    dec.textContent = '−';
    dec.setAttribute('aria-label', 'Decrease');
    if (min !== undefined && this._value <= min) dec.disabled = true;
    dec.addEventListener('click', () => this.adjust(-1));
    this._decBtn = dec;

    // Value display
    const valEl = document.createElement('span');
    valEl.className   = 'blob-counter__value';
    valEl.textContent = format ? format(this._value) : String(this._value);
    valEl.setAttribute('aria-live', 'polite');
    valEl.setAttribute('aria-atomic', 'true');
    this._valEl = valEl;

    // Increment
    const inc = document.createElement('button');
    inc.type      = 'button';
    inc.className = 'blob-counter__btn';
    inc.textContent = '+';
    inc.setAttribute('aria-label', 'Increase');
    if (max !== undefined && this._value >= max) inc.disabled = true;
    inc.addEventListener('click', () => this.adjust(1));
    this._incBtn = inc;

    wrapper.appendChild(dec);
    wrapper.appendChild(valEl);
    wrapper.appendChild(inc);

    return wrapper;
  }

  private adjust(direction: 1 | -1): void {
    const { min, max, step = 1, format, onChange } = this._opts;
    let next = this._value + direction * step;
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    if (next === this._value) return;

    this._value            = next;
    this._valEl.textContent = format ? format(next) : String(next);
    this._decBtn.disabled   = min !== undefined && next <= min;
    this._incBtn.disabled   = max !== undefined && next >= max;
    onChange?.(next);
  }

  public get value(): number { return this._value; }

  public setValue(value: number): void {
    const { min, max, format } = this._opts;
    let v = value;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    this._value            = v;
    this._valEl.textContent = format ? format(v) : String(v);
    this._decBtn.disabled   = min !== undefined && v <= min;
    this._incBtn.disabled   = max !== undefined && v >= max;
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled = disabled;
    this.element.classList.toggle('blob-counter--disabled', disabled);
  }
}
