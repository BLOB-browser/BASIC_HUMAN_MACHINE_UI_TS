/**
 * Card component — blob-card
 *
 * A surface container with optional header (leading + title/subtitle + trailing),
 * optional media (image banner), a free-form body slot, and an optional footer
 * with action buttons. Accepts any atom or molecule as content.
 *
 * CSS class: blob-card
 * Variants:  default  — bordered, no shadow
 *            elevated — drop shadow, no border
 *            outlined — thicker border, no shadow
 *            ghost    — no border, no shadow (plain container)
 *
 * @example
 * ```typescript
 * const body = document.createElement('div');
 * body.textContent = 'Here is some card content.';
 *
 * const card = new Card({
 *   title:    'Project Alpha',
 *   subtitle: 'Last updated 2h ago',
 *   leading:  new Avatar({ initials: 'PA', size: 'sm' }).element,
 *   trailing: new Badge({ label: 'Active', variant: 'success' }).element,
 *   body:     body,
 *   actions:  [
 *     new Button({ label: 'Open',   variant: 'primary',   size: 'sm' }).element,
 *     new Button({ label: 'Share',  variant: 'secondary', size: 'sm' }).element,
 *   ],
 * });
 *
 * // Media card
 * const mediaCard = new Card({
 *   mediaSrc: '/cover.jpg',
 *   title:    'Getting started',
 *   body:     descEl,
 * });
 *
 * // Clickable card
 * const link = new Card({ title: 'Go somewhere', variant: 'elevated', onClick: () => nav('/') });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type CardVariant     = 'default' | 'elevated' | 'outlined' | 'ghost';
export type CardFooterAlign = 'start' | 'end' | 'between';

export interface CardOptions {
  /** Card title in the header. Omit header section entirely if not provided. */
  title?:        string;
  subtitle?:     string;
  /** Element placed at the start of the header (Avatar, icon, etc.). */
  leading?:      HTMLElement;
  /** Element placed at the end of the header (Badge, Button, etc.). */
  trailing?:     HTMLElement;
  /** Shows a divider under the header. */
  headerDivider?: boolean;
  /** Image URL for a banner above the header. */
  mediaSrc?:     string;
  mediaAlt?:     string;
  /** The main body content. Any HTMLElement. */
  body?:         HTMLElement;
  /** Action buttons rendered in the footer. */
  actions?:      HTMLElement[];
  footerAlign?:  CardFooterAlign;
  variant?:      CardVariant;
  onClick?:      () => void;
  className?:    string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Card {
  public element: HTMLElement;
  private _opts:  CardOptions;

  constructor(options: CardOptions = {}) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const {
      title, subtitle, leading, trailing, headerDivider = false,
      mediaSrc, mediaAlt = '', body, actions,
      footerAlign = 'end', variant = 'default',
      onClick, className,
    } = this._opts;

    const hasHeader = !!(title || leading || trailing);

    const card = document.createElement('div');
    card.className = [
      'blob-card',
      `blob-card--${variant}`,
      onClick ? 'blob-card--clickable' : '',
      hasHeader ? 'blob-card--has-header' : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    if (onClick) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('click', onClick);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      });
    }

    // Media
    if (mediaSrc) {
      const mediaEl = document.createElement('div');
      mediaEl.className = 'blob-card__media';
      const img = document.createElement('img');
      img.src = mediaSrc;
      img.alt = mediaAlt;
      img.loading = 'lazy';
      mediaEl.appendChild(img);
      card.appendChild(mediaEl);
    }

    // Header
    if (hasHeader) {
      const header = document.createElement('div');
      header.className = [
        'blob-card__header',
        headerDivider ? 'blob-card__header--bottom-border' : '',
      ].filter(Boolean).join(' ');

      if (leading) {
        const leadWrap = document.createElement('div');
        leadWrap.className = 'blob-card__header-leading';
        leadWrap.appendChild(leading);
        header.appendChild(leadWrap);
      }

      if (title || subtitle) {
        const headerBody = document.createElement('div');
        headerBody.className = 'blob-card__header-body';

        if (title) {
          const titleEl = document.createElement('div');
          titleEl.className   = 'blob-card__title';
          titleEl.textContent = title;
          headerBody.appendChild(titleEl);
        }

        if (subtitle) {
          const subEl = document.createElement('div');
          subEl.className   = 'blob-card__subtitle';
          subEl.textContent = subtitle;
          headerBody.appendChild(subEl);
        }

        header.appendChild(headerBody);
      }

      if (trailing) {
        const trailWrap = document.createElement('div');
        trailWrap.className = 'blob-card__header-trailing';
        trailWrap.appendChild(trailing);
        header.appendChild(trailWrap);
      }

      card.appendChild(header);
    }

    // Body
    if (body) {
      const bodyEl = document.createElement('div');
      bodyEl.className = 'blob-card__body';
      bodyEl.appendChild(body);
      card.appendChild(bodyEl);
    }

    // Footer
    if (actions && actions.length > 0) {
      const footer = document.createElement('div');
      footer.className = [
        'blob-card__footer',
        footerAlign === 'start'   ? 'blob-card__footer--start'   : '',
        footerAlign === 'between' ? 'blob-card__footer--between' : '',
      ].filter(Boolean).join(' ');
      for (const action of actions) footer.appendChild(action);
      card.appendChild(footer);
    }

    return card;
  }

  public set(updates: Partial<CardOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
