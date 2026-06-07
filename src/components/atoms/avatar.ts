/**
 * Avatar component — blob-avatar
 *
 * Displays a user's profile image or their initials as a fallback.
 * Optional status dot overlay.
 *
 * CSS class: blob-avatar
 * Sizes:     blob-avatar--xs (24) --sm (32) --md (40, default) --lg (56) --xl (80)
 * Shape:     circle (default) or blob-avatar--square
 * Status:    blob-avatar__status --online --away --busy --offline
 *
 * @example
 * ```typescript
 * const avatar = new Avatar({ src: '/user.jpg', alt: 'Jane Doe', size: 'md' });
 * const init   = new Avatar({ initials: 'JD', size: 'lg', status: 'online' });
 * const square = new Avatar({ src: '/logo.png', shape: 'square', size: 'sm' });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AvatarSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape   = 'circle' | 'square';
export type AvatarStatus  = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarOptions {
  /** Image URL. Falls back to `initials` then a generic placeholder. */
  src?:       string;
  alt?:       string;
  /** Up to 2 characters shown when no `src`. Auto-derived when omitted. */
  initials?:  string;
  size?:      AvatarSize;
  shape?:     AvatarShape;
  status?:    AvatarStatus;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Avatar {
  public element: HTMLElement;
  private _opts: AvatarOptions;

  constructor(options: AvatarOptions = {}) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const {
      src, alt = '', initials, size = 'md',
      shape = 'circle', status, className,
    } = this._opts;

    const el = document.createElement('span');
    el.className = [
      'blob-avatar',
      `blob-avatar--${size}`,
      shape === 'square' ? 'blob-avatar--square' : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', alt || initials || 'Avatar');

    if (src) {
      const img = document.createElement('img');
      img.className = 'blob-avatar__img';
      img.src       = src;
      img.alt       = alt;
      img.draggable = false;
      el.appendChild(img);
    } else {
      const text = document.createElement('span');
      text.className   = 'blob-avatar__initials';
      text.textContent = (initials ?? '?').slice(0, 2).toUpperCase();
      el.appendChild(text);
    }

    if (status) {
      const dot = document.createElement('span');
      dot.className = `blob-avatar__status blob-avatar__status--${status}`;
      dot.setAttribute('aria-label', status);
      el.appendChild(dot);
    }

    return el;
  }

  public set(updates: Partial<AvatarOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }

  public setStatus(status: AvatarStatus | undefined): void { this.set({ status }); }
  public setSrc(src: string): void { this.set({ src }); }
}
