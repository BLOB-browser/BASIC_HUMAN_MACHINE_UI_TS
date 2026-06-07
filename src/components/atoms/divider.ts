/**
 * Divider component — blob-divider
 *
 * A horizontal (default) or vertical separator line.
 * Optionally renders a centered text label.
 *
 * CSS class: blob-divider
 *
 * @example
 * ```typescript
 * const rule   = new Divider();
 * const orRule = new Divider({ label: 'or' });
 * const vRule  = new Divider({ orientation: 'vertical' });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerOptions {
  /** Centered text (horizontal only). Switches to labeled variant. */
  label?:       string;
  orientation?: DividerOrientation;
  className?:   string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Divider {
  public element: HTMLElement;

  constructor(options: DividerOptions = {}) {
    this.element = this.build(options);
  }

  private build(options: DividerOptions): HTMLElement {
    const { label, orientation = 'horizontal', className } = options;

    const el = document.createElement('div');
    el.setAttribute('role', 'separator');
    el.setAttribute('aria-orientation', orientation);

    const classes = [
      'blob-divider',
      orientation === 'vertical' ? 'blob-divider--vertical' : '',
      label                      ? 'blob-divider--labeled'  : '',
      className ?? '',
    ].filter(Boolean).join(' ');
    el.className = classes;

    if (label) {
      const text = document.createElement('span');
      text.textContent = label;
      el.appendChild(text);
    }

    return el;
  }
}
