/**
 * Spinner component — blob-spinner
 *
 * Standalone loading indicator. The button.ts inline spinner is a separate
 * implementation; this is the composable atom used everywhere else
 * (tables, cards, page-level loading states).
 *
 * CSS class: blob-spinner
 * Sizes:     blob-spinner--xs  (12 px)
 *            blob-spinner--sm  (16 px)
 *            blob-spinner--md  (24 px, default)
 *            blob-spinner--lg  (40 px)
 *
 * Color inherits from `currentColor` by default — set a color on the parent
 * or pass `color` to override.
 *
 * @example
 * ```typescript
 * const spinner = new Spinner();                          // md, inherits color
 * const small   = new Spinner({ size: 'sm', color: 'var(--color-primary)' });
 * document.body.appendChild(spinner.element);
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SpinnerOptions {
  size?:      SpinnerSize;
  /** Any CSS color value — overrides currentColor inheritance. */
  color?:     string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Spinner {
  public element: HTMLElement;
  private _opts: SpinnerOptions;

  constructor(options: SpinnerOptions = {}) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { size = 'md', color, className } = this._opts;

    const el = document.createElement('span');
    el.className = ['blob-spinner', `blob-spinner--${size}`, className ?? '']
      .filter(Boolean).join(' ');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', 'Loading');
    if (color) el.style.color = color;

    const ring = document.createElement('span');
    ring.className = 'blob-spinner__ring';
    ring.setAttribute('aria-hidden', 'true');
    el.appendChild(ring);

    return el;
  }

  public set(updates: Partial<SpinnerOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
