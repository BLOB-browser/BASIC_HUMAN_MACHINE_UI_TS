/**
 * Modal component — blob-modal
 *
 * A full-screen overlay dialog with focus trap, keyboard dismiss (Escape), and
 * ARIA `role="dialog"`. Provides header (title + close button), scrollable body
 * slot, and optional footer with action buttons.
 *
 * Focus management:
 *  - On open: focus is moved to the first focusable element inside the modal
 *    (or the modal close button as fallback).
 *  - While open: Tab / Shift+Tab cycle within the modal.
 *  - On close: focus returns to the element that triggered the open.
 *
 * CSS class: blob-modal-overlay
 *            blob-modal  [role="dialog"]
 * Sizes:     sm (400px), md (560px, default), lg (720px), full
 *
 * @example
 * ```typescript
 * const body = document.createElement('p');
 * body.textContent = 'Are you sure you want to delete this item?';
 *
 * const modal = new Modal({
 *   title:   'Confirm Delete',
 *   body:    body,
 *   actions: [
 *     new Button({ label: 'Cancel',  variant: 'secondary',             onClick: () => modal.close() }).element,
 *     new Button({ label: 'Delete',  variant: 'danger',  size: 'sm',   onClick: () => { deleteItem(); modal.close(); } }).element,
 *   ],
 * });
 *
 * document.body.appendChild(modal.element);
 * modal.open();
 *
 * // With trigger element (auto focus-return)
 * const editBtn = document.getElementById('edit');
 * modal.openFrom(editBtn);
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ModalSize        = 'sm' | 'md' | 'lg' | 'full';
export type ModalFooterAlign = 'start' | 'end' | 'between';

export interface ModalOptions {
  title:        string;
  body:         HTMLElement;
  /** Action buttons in the footer. */
  actions?:     HTMLElement[];
  footerAlign?: ModalFooterAlign;
  size?:        ModalSize;
  /** Called after the modal is opened. */
  onOpen?:      () => void;
  /** Called after the modal is closed. */
  onClose?:     () => void;
  /** Whether clicking the overlay closes the modal. Default: true. */
  closeOnOverlay?: boolean;
  /** Whether pressing Escape closes the modal. Default: true. */
  closeOnEscape?: boolean;
}

// ---------------------------------------------------------------------------
// Focusable selectors helper
// ---------------------------------------------------------------------------
const FOCUSABLE = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Modal {
  public element:    HTMLElement;
  public overlayEl:  HTMLElement;
  public dialogEl:   HTMLElement;
  public closeBtn!:  HTMLButtonElement;
  private _isOpen:   boolean = false;
  private _trigger:  HTMLElement | null = null;
  private _opts:     ModalOptions;

  constructor(options: ModalOptions) {
    this._opts = options;
    const { overlay, dialog } = this.build();
    this.overlayEl = overlay;
    this.dialogEl  = dialog;
    this.element   = overlay;
  }

  private build(): { overlay: HTMLElement; dialog: HTMLElement } {
    const {
      title, body, actions, footerAlign = 'end',
      size = 'md', closeOnOverlay = true, closeOnEscape = true,
    } = this._opts;

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'blob-modal-overlay blob-modal-overlay--hidden';
    overlay.setAttribute('aria-hidden', 'true');
    if (closeOnOverlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    // Dialog
    const dialog = document.createElement('div');
    dialog.className = ['blob-modal', `blob-modal--${size}`].join(' ');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'blob-modal-title');
    dialog.addEventListener('click', (e) => e.stopPropagation());

    // Header
    const header = document.createElement('div');
    header.className = 'blob-modal__header';

    const titleEl = document.createElement('div');
    titleEl.className   = 'blob-modal__title';
    titleEl.id          = 'blob-modal-title';
    titleEl.textContent = title;
    header.appendChild(titleEl);

    const closeBtn = document.createElement('button');
    closeBtn.type      = 'button';
    closeBtn.className = 'blob-modal__close';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    closeBtn.addEventListener('click', () => this.close());
    header.appendChild(closeBtn);
    this.closeBtn = closeBtn;

    dialog.appendChild(header);

    // Body
    const bodyEl = document.createElement('div');
    bodyEl.className = 'blob-modal__body';
    bodyEl.appendChild(body);
    dialog.appendChild(bodyEl);

    // Footer
    if (actions && actions.length > 0) {
      const footer = document.createElement('div');
      footer.className = [
        'blob-modal__footer',
        footerAlign === 'start'   ? 'blob-modal__footer--start'   : '',
        footerAlign === 'between' ? 'blob-modal__footer--between' : '',
      ].filter(Boolean).join(' ');
      for (const action of actions) footer.appendChild(action);
      dialog.appendChild(footer);
    }

    overlay.appendChild(dialog);

    // Keyboard: focus trap + Escape
    overlay.addEventListener('keydown', (e) => {
      if (closeOnEscape && e.key === 'Escape') { e.preventDefault(); this.close(); return; }
      if (e.key === 'Tab') this.trapFocus(e);
    });

    return { overlay, dialog };
  }

  private trapFocus(e: KeyboardEvent): void {
    const focusable = Array.from(this.dialogEl.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  /** Open the modal. Returns focus to `triggerEl` on close if provided. */
  public open(triggerEl?: HTMLElement): void {
    this._trigger = triggerEl ?? (document.activeElement as HTMLElement | null);
    this._isOpen  = true;
    this.overlayEl.classList.remove('blob-modal-overlay--hidden');
    this.overlayEl.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';

    // Focus first focusable inside dialog, fallback to close button
    const first = this.dialogEl.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? this.closeBtn).focus();

    this._opts.onOpen?.();
  }

  /**
   * Convenience method that also captures the trigger for focus-return.
   * @example modal.openFrom(event.currentTarget as HTMLElement)
   */
  public openFrom(trigger: HTMLElement): void {
    this.open(trigger);
  }

  public close(): void {
    if (!this._isOpen) return;
    this._isOpen = false;
    this.overlayEl.classList.add('blob-modal-overlay--hidden');
    this.overlayEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Return focus to trigger element
    this._trigger?.focus();
    this._trigger = null;

    this._opts.onClose?.();
  }

  public toggle(triggerEl?: HTMLElement): void {
    this._isOpen ? this.close() : this.open(triggerEl);
  }

  public get isOpen(): boolean { return this._isOpen; }

  /** Update the dialog title without rebuilding. */
  public setTitle(title: string): void {
    const el = this.dialogEl.querySelector('#blob-modal-title');
    if (el) el.textContent = title;
  }
}
