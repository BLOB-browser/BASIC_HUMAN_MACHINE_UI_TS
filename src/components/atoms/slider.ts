/**
 * Slider component — blob-slider
 *
 * Range input with custom CSS styling. The track fill is updated in JS via a
 * CSS custom property (`--pct`) so there's no extra DOM element needed.
 *
 * CSS class: blob-slider
 * Sizes:     blob-slider--sm  blob-slider--md (default)  blob-slider--lg
 *
 * @example
 * ```typescript
 * const volume = new Slider({ label: 'Volume', value: 70, onChange: (v) => setVol(v) });
 * const opacity = new Slider({ min: 0, max: 1, step: 0.01, value: 0.5, showValue: true });
 *
 * volume.setValue(50);
 * console.log(volume.value); // → 50
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderOptions {
  value?:     number;
  min?:       number;
  max?:       number;
  step?:      number;
  label?:     string;
  /** Show the current value next to the label. */
  showValue?: boolean;
  /** Format function for the displayed value. */
  format?:    (v: number) => string;
  size?:      SliderSize;
  disabled?:  boolean;
  onChange?:  (value: number) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Slider {
  public element:   HTMLElement;
  /** The native `<input type="range">`. */
  public inputEl!:  HTMLInputElement;
  private _valueEl: HTMLElement | null = null;
  private _opts:    SliderOptions;

  constructor(options: SliderOptions = {}) {
    this._opts   = { min: 0, max: 100, step: 1, value: 0, size: 'md', ...options };
    this.element = this.build();
  }

  private build(): HTMLElement {
    const {
      value = 0, min = 0, max = 100, step = 1,
      label, showValue, format, size = 'md', disabled = false,
    } = this._opts;

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-slider',
      `blob-slider--${size}`,
      disabled ? 'blob-slider--disabled' : '',
    ].filter(Boolean).join(' ');

    // Header
    if (label || showValue) {
      const header = document.createElement('div');
      header.className = 'blob-slider__header';

      if (label) {
        const labelEl = document.createElement('label');
        labelEl.textContent = label;
        header.appendChild(labelEl);
      }

      if (showValue) {
        const valEl = document.createElement('span');
        valEl.className   = 'blob-slider__value';
        valEl.textContent = format ? format(value) : String(value);
        this._valueEl     = valEl;
        header.appendChild(valEl);
      }

      wrapper.appendChild(header);
    }

    // Range input
    const input = document.createElement('input');
    input.type      = 'range';
    input.className = 'blob-slider__input';
    input.min       = String(min);
    input.max       = String(max);
    input.step      = String(step);
    input.value     = String(value);
    input.disabled  = disabled;
    this.inputEl    = input;

    // Set initial fill percentage
    this.updateFill(input, value, min, max);

    input.addEventListener('input', () => {
      const v = Number(input.value);
      this.updateFill(input, v, min, max);
      if (this._valueEl) {
        this._valueEl.textContent = format ? format(v) : String(v);
      }
      this._opts.onChange?.(v);
    });

    wrapper.appendChild(input);

    return wrapper;
  }

  private updateFill(input: HTMLInputElement, value: number, min: number, max: number): void {
    const pct = ((value - min) / (max - min)) * 100;
    input.style.setProperty('--pct', `${pct}%`);
  }

  public get value(): number { return Number(this.inputEl?.value ?? 0); }

  public setValue(value: number): void {
    const { min = 0, max = 100, format } = this._opts;
    this.inputEl.value = String(value);
    this.updateFill(this.inputEl, value, min, max);
    if (this._valueEl) {
      this._valueEl.textContent = format ? format(value) : String(value);
    }
  }

  public setDisabled(disabled: boolean): void {
    this._opts.disabled    = disabled;
    this.inputEl.disabled  = disabled;
    this.element.classList.toggle('blob-slider--disabled', disabled);
  }
}
