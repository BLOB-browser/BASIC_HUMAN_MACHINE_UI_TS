/**
 * Alert component — blob-alert
 *
 * Inline status banner for persistent feedback. Not a toast — sits in the
 * document flow. Variants cover the 4 semantic states: info, success,
 * warning, error. An optional dismiss button removes the element from the DOM.
 *
 * CSS class: blob-alert
 * Variants:  info (default), success, warning, error
 *
 * @example
 * ```typescript
 * const a = new Alert({
 *   variant: 'success',
 *   title:   'Saved',
 *   message: 'Your changes have been saved successfully.',
 *   dismissible: true,
 * });
 * parent.appendChild(a.element);
 *
 * // Without title
 * const warn = new Alert({ variant: 'warning', message: 'Your session expires in 5 minutes.' });
 *
 * // With custom icon
 * const info = new Alert({ message: 'Read the docs first.', icon: infoSvgEl });
 *
 * // Programmatic dismiss
 * a.dismiss();
 * ```
 */

// ---------------------------------------------------------------------------
// Default icons (inline SVG strings)
// ---------------------------------------------------------------------------
const DEFAULT_ICONS: Record<AlertVariant, string> = {
  info:    '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="7.5"/><path d="M9 8v4M9 6h.01"/></svg>',
  success: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="7.5"/><path d="M5.5 9.5l2.5 2.5 4.5-5"/></svg>',
  warning: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2L16.5 15.5H1.5L9 2z"/><path d="M9 7.5v3M9 12.5h.01"/></svg>',
  error:   '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="7.5"/><path d="M6 6l6 6M12 6l-6 6"/></svg>',
};

const CLOSE_ICON = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M11 3L3 11M3 3l8 8"/></svg>';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertOptions {
  variant?:      AlertVariant;
  title?:        string;
  message:       string;
  /** Custom icon element. If omitted, a default SVG for the variant is used. */
  icon?:         HTMLElement | false;
  dismissible?:  boolean;
  onDismiss?:    () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Alert {
  public element: HTMLElement;
  private _opts:  AlertOptions;

  constructor(options: AlertOptions) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { variant = 'info', title, message, icon, dismissible = false } = this._opts;

    const el = document.createElement('div');
    el.className = `blob-alert blob-alert--${variant}`;
    el.setAttribute('role', variant === 'error' ? 'alert' : 'status');
    el.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');

    // Icon
    if (icon !== false) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'blob-alert__icon';
      if (icon instanceof HTMLElement) {
        iconWrap.appendChild(icon);
      } else {
        iconWrap.innerHTML = DEFAULT_ICONS[variant];
      }
      el.appendChild(iconWrap);
    }

    // Body
    const body = document.createElement('div');
    body.className = 'blob-alert__body';

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className   = 'blob-alert__title';
      titleEl.textContent = title;
      body.appendChild(titleEl);
    }

    const msgEl = document.createElement('div');
    msgEl.className   = 'blob-alert__message';
    msgEl.textContent = message;
    body.appendChild(msgEl);

    el.appendChild(body);

    // Dismiss button
    if (dismissible) {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'blob-alert__dismiss';
      btn.setAttribute('aria-label', 'Dismiss');
      btn.innerHTML = CLOSE_ICON;
      btn.addEventListener('click', () => this.dismiss());
      el.appendChild(btn);
    }

    return el;
  }

  public dismiss(): void {
    this.element.remove();
    this._opts.onDismiss?.();
  }

  public set(updates: Partial<AlertOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
