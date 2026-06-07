/**
 * Badge component — blob-badge
 *
 * Static status indicator. Three display modes:
 * - label  — pill with text (default when `label` is provided)
 * - dot    — small coloured circle (default when no `label`)
 * - count  — compact number chip (notification counters, avatar overlays)
 *
 * Unlike Tag, Badge has no interaction — it is purely informational.
 *
 * CSS class: blob-badge
 * Modes:     blob-badge--dot   blob-badge--count
 * Variants:  blob-badge--default  --primary  --success  --warning  --danger  --info
 *
 * @example
 * ```typescript
 * const live    = new Badge({ label: '● Live',   variant: 'success' });
 * const beta    = new Badge({ label: 'Beta',     variant: 'warning' });
 * const dot     = new Badge({ variant: 'danger' });                      // dot mode
 * const notifs  = new Badge({ label: '12', mode: 'count', variant: 'danger' });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeMode    = 'label' | 'dot' | 'count';

export interface BadgeOptions {
  /** Text for label / count modes. Omit for dot mode. */
  label?:     string;
  /** Automatically inferred from `label` presence when omitted. */
  mode?:      BadgeMode;
  variant?:   BadgeVariant;
  /** Render a small status dot before the label text (label mode only). */
  dot?:       boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Badge {
  public element: HTMLElement;
  private _opts: BadgeOptions;

  constructor(options: BadgeOptions = {}) {
    this._opts   = { variant: 'default', ...options };
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { label, mode: rawMode, variant = 'default', dot, className } = this._opts;
    const mode = rawMode ?? (label ? 'label' : 'dot');

    const el = document.createElement('span');
    el.className = [
      'blob-badge',
      `blob-badge--${variant}`,
      mode === 'dot'   ? 'blob-badge--dot'   : '',
      mode === 'count' ? 'blob-badge--count'  : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    if (mode === 'dot') {
      el.setAttribute('role', 'status');
      return el;
    }

    if (dot && mode === 'label') {
      const dotEl = document.createElement('span');
      dotEl.setAttribute('aria-hidden', 'true');
      dotEl.style.cssText = 'width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;flex-shrink:0';
      el.appendChild(dotEl);
    }

    if (label) {
      const textEl = document.createElement('span');
      textEl.textContent = label;
      el.appendChild(textEl);
    }

    return el;
  }

  public set(updates: Partial<BadgeOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }

  public setLabel(label: string): void { this.set({ label }); }
}
