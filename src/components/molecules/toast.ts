/**
 * Toast + ToastManager — blob-toast
 *
 * Transient notification messages that appear in a fixed corner of the screen
 * and auto-dismiss after a timeout. Use `ToastManager` (singleton via
 * `getToastManager()`) to push toasts from anywhere in your app.
 *
 * CSS class: blob-toast-region  (fixed container)
 *            blob-toast         (individual toast)
 *
 * Variants: info (default), success, warning, error
 * Position: top-right (default), top-left, bottom-right, bottom-left, top-center, bottom-center
 *
 * @example
 * ```typescript
 * // Preferred: singleton manager
 * import { getToastManager } from '@ui/components';
 *
 * const toasts = getToastManager();
 * toasts.push({ message: 'Saved!' });
 * toasts.push({ variant: 'error', title: 'Failed', message: 'Could not save.', duration: 0 });
 * toasts.push({ variant: 'success', message: 'Done.', position: 'bottom-right' });
 *
 * // Direct instantiation (rare — prefer manager)
 * const t = new Toast({ variant: 'warning', message: 'Low disk space.', onDismiss: () => {} });
 * document.body.appendChild(t.element);
 * t.show();
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ToastVariant  = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastOptions {
  variant?:    ToastVariant;
  title?:      string;
  message:     string;
  /** Duration in ms. 0 = sticky (never auto-dismisses). Default: 4000. */
  duration?:   number;
  dismissible?: boolean;
  position?:   ToastPosition;
  onDismiss?:  () => void;
}

// Inline icons
const TOAST_ICONS: Record<ToastVariant, string> = {
  info:    '<svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8.5" cy="8.5" r="7"/><path d="M8.5 9v3.5M8.5 5.5h.01"/></svg>',
  success: '<svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="7"/><path d="M5.5 9l2.5 2.5 4-4.5"/></svg>',
  warning: '<svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 2L15.5 14.5H1.5L8.5 2z"/><path d="M8.5 7v3M8.5 11.5h.01"/></svg>',
  error:   '<svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8.5" cy="8.5" r="7"/><path d="M6 6l5 5M11 6l-5 5"/></svg>',
};
const CLOSE_ICON = '<svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10.5 2.5l-8 8M2.5 2.5l8 8"/></svg>';

// ---------------------------------------------------------------------------
// Toast (single item)
// ---------------------------------------------------------------------------
export class Toast {
  public element: HTMLElement;
  private _timer: ReturnType<typeof setTimeout> | null = null;
  private _opts:  ToastOptions;

  constructor(options: ToastOptions) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { variant = 'info', title, message, dismissible = true } = this._opts;

    const el = document.createElement('div');
    el.className = `blob-toast blob-toast--${variant}`;
    el.setAttribute('role', variant === 'error' ? 'alert' : 'status');
    el.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');
    el.style.position = 'relative';

    // Icon
    const iconWrap = document.createElement('div');
    iconWrap.className = 'blob-toast__icon';
    iconWrap.innerHTML = TOAST_ICONS[variant];
    el.appendChild(iconWrap);

    // Body
    const body = document.createElement('div');
    body.className = 'blob-toast__body';
    if (title) {
      const t = document.createElement('div');
      t.className = 'blob-toast__title';
      t.textContent = title;
      body.appendChild(t);
    }
    const msg = document.createElement('div');
    msg.className   = 'blob-toast__message';
    msg.textContent = message;
    body.appendChild(msg);
    el.appendChild(body);

    // Dismiss
    if (dismissible) {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'blob-toast__dismiss';
      btn.setAttribute('aria-label', 'Dismiss notification');
      btn.innerHTML = CLOSE_ICON;
      btn.addEventListener('click', () => this.dismiss());
      el.appendChild(btn);
    }

    return el;
  }

  public show(): void {
    const { duration = 4000 } = this._opts;
    if (duration > 0) {
      this._timer = setTimeout(() => this.dismiss(), duration);
    }
  }

  public dismiss(): void {
    if (this._timer) clearTimeout(this._timer);
    this.element.classList.add('blob-toast--exit');
    this.element.addEventListener('animationend', () => {
      this.element.remove();
      this._opts.onDismiss?.();
    }, { once: true });
  }
}

// ---------------------------------------------------------------------------
// ToastManager — singleton per position
// ---------------------------------------------------------------------------
const _regions = new Map<ToastPosition, HTMLElement>();

function getRegion(position: ToastPosition): HTMLElement {
  let region = _regions.get(position);
  if (!region) {
    region = document.createElement('div');
    region.className = `blob-toast-region blob-toast-region--${position}`;
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'false');
    document.body.appendChild(region);
    _regions.set(position, region);
  }
  return region;
}

export class ToastManager {
  private _defaultPosition: ToastPosition;
  private _defaultDuration: number;

  constructor(options: { position?: ToastPosition; duration?: number } = {}) {
    this._defaultPosition = options.position ?? 'top-right';
    this._defaultDuration = options.duration ?? 4000;
  }

  public push(options: ToastOptions): Toast {
    const merged: ToastOptions = {
      duration:    this._defaultDuration,
      dismissible: true,
      position:    this._defaultPosition,
      ...options,
    };
    const toast  = new Toast(merged);
    const region = getRegion(merged.position ?? this._defaultPosition);
    region.appendChild(toast.element);
    toast.show();
    return toast;
  }

  public success(message: string, title?: string): Toast {
    return this.push({ variant: 'success', message, title });
  }
  public error(message: string, title?: string): Toast {
    return this.push({ variant: 'error', message, title, duration: 0 });
  }
  public warning(message: string, title?: string): Toast {
    return this.push({ variant: 'warning', message, title });
  }
  public info(message: string, title?: string): Toast {
    return this.push({ variant: 'info', message, title });
  }
}

// Global singleton
let _toastManager: ToastManager | null = null;
export function getToastManager(options?: { position?: ToastPosition; duration?: number }): ToastManager {
  if (!_toastManager) _toastManager = new ToastManager(options);
  return _toastManager;
}
