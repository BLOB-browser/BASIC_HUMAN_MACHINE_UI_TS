/**
 * Progress component — blob-progress
 *
 * Horizontal progress bar with optional label and value display.
 * Supports determinate (value 0–100) and indeterminate (animated) modes.
 *
 * CSS class: blob-progress
 * Sizes:     blob-progress--sm (4px) --md (6px, default) --lg (10px)
 *
 * @example
 * ```typescript
 * const bar  = new Progress({ value: 65, label: 'Uploading…' });
 * const busy = new Progress({ indeterminate: true });
 *
 * // Update value live
 * bar.setValue(90);
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ProgressSize    = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

export interface ProgressOptions {
  /** 0–100. Ignored in indeterminate mode. */
  value?:         number;
  /** Show animated bar instead of a fixed value. */
  indeterminate?: boolean;
  label?:         string;
  /** Show the numeric percentage next to the label. */
  showValue?:     boolean;
  size?:          ProgressSize;
  variant?:       ProgressVariant;
  className?:     string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Progress {
  public element:  HTMLElement;
  private _bar!:   HTMLElement;
  private _opts:   ProgressOptions;

  constructor(options: ProgressOptions = {}) {
    this._opts   = { value: 0, size: 'md', variant: 'default', ...options };
    this.element = this.build();
  }

  private build(): HTMLElement {
    const {
      value = 0, indeterminate = false, label, showValue,
      size = 'md', variant = 'default', className,
    } = this._opts;

    const pct = Math.min(100, Math.max(0, value));

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-progress',
      `blob-progress--${size}`,
      variant !== 'default' ? `blob-progress--${variant}` : '',
      indeterminate ? 'blob-progress--indeterminate' : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    wrapper.setAttribute('role', 'progressbar');
    wrapper.setAttribute('aria-valuemin', '0');
    wrapper.setAttribute('aria-valuemax', '100');
    if (!indeterminate) {
      wrapper.setAttribute('aria-valuenow', String(pct));
    }
    if (label) wrapper.setAttribute('aria-label', label);

    // Header
    if (label || showValue) {
      const header = document.createElement('div');
      header.className = 'blob-progress__header';
      if (label) {
        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        header.appendChild(labelEl);
      }
      if (showValue && !indeterminate) {
        const valEl = document.createElement('span');
        valEl.textContent = `${pct}%`;
        header.appendChild(valEl);
      }
      wrapper.appendChild(header);
    }

    // Track + bar
    const track = document.createElement('div');
    track.className = 'blob-progress__track';

    const bar = document.createElement('div');
    bar.className   = 'blob-progress__bar';
    bar.style.width = indeterminate ? '35%' : `${pct}%`;
    track.appendChild(bar);
    wrapper.appendChild(track);

    this._bar = bar;

    return wrapper;
  }

  /** Update the progress value (0–100). Has no effect in indeterminate mode. */
  public setValue(value: number): void {
    this._opts.value = value;
    const pct = Math.min(100, Math.max(0, value));
    if (!this._opts.indeterminate) {
      this._bar.style.width = `${pct}%`;
      this.element.setAttribute('aria-valuenow', String(pct));
    }
    // Re-render header value label if shown
    if (this._opts.showValue) {
      const header = this.element.querySelector('.blob-progress__header');
      const valEl  = header?.lastElementChild as HTMLElement | null;
      if (valEl && header?.children[header.children.length - 1] === valEl) {
        valEl.textContent = `${pct}%`;
      }
    }
  }

  public set(updates: Partial<ProgressOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
