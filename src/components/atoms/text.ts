/**
 * Text component — blob-text
 *
 * Typography atoms for all text content: headings, body copy, captions,
 * overlines, and inline code. Produces the correct semantic HTML element
 * per variant. Font-family comes from CSS vars; font-size from Tailwind.
 *
 * CSS class: blob-text blob-text--{variant}
 * Color:     blob-text--{color}
 *
 * Variants: h1  h2  h3  h4  h5  body  body-sm  caption  overline  code
 * Colors:   default  subtle  primary  success  warning  danger
 *
 * @example
 * ```typescript
 * const title   = new Text({ variant: 'h1', content: 'Welcome to BLOB' });
 * const para    = new Text({ variant: 'body', content: 'Edit anything below.' });
 * const muted   = new Text({ variant: 'caption', content: 'Last updated 1h ago', color: 'subtle' });
 * const snippet = new Text({ variant: 'code', content: 'npm install' });
 *
 * // Update text live
 * title.setContent('New heading');
 * ```
 */

// ---------------------------------------------------------------------------
// Size → Tailwind class mapping
// ---------------------------------------------------------------------------
type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  | 'body' | 'body-sm'
  | 'caption' | 'overline'
  | 'code';

type TextColor = 'default' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger';

const VARIANT_TAG: Record<TextVariant, string> = {
  h1:       'h1',
  h2:       'h2',
  h3:       'h3',
  h4:       'h4',
  h5:       'h5',
  body:     'p',
  'body-sm':'p',
  caption:  'span',
  overline: 'span',
  code:     'code',
};

const VARIANT_TAILWIND: Record<TextVariant, string> = {
  h1:        'text-4xl font-bold',
  h2:        'text-3xl font-bold',
  h3:        'text-2xl font-semibold',
  h4:        'text-xl font-semibold',
  h5:        'text-lg font-semibold',
  body:      'text-base font-normal leading-relaxed',
  'body-sm': 'text-sm font-normal leading-relaxed',
  caption:   'text-xs font-normal',
  overline:  'text-xs font-medium',
  code:      'text-sm font-normal',
};

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------
export type { TextVariant, TextColor };

export interface TextOptions {
  variant?:   TextVariant;
  content?:   string;
  /** Explicit colour — overrides variant default. */
  color?:     TextColor;
  /** Extra Tailwind classes. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Text {
  public element: HTMLElement;
  private _opts:  TextOptions;

  constructor(options: TextOptions = {}) {
    this._opts   = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { variant = 'body', content = '', color, className } = this._opts;

    const tag = VARIANT_TAG[variant];
    const el  = document.createElement(tag) as HTMLElement;

    el.className = [
      'blob-text',
      `blob-text--${variant}`,
      VARIANT_TAILWIND[variant],
      color     ? `blob-text--color-${color}` : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    el.textContent = content;

    return el;
  }

  public setContent(content: string): void {
    this._opts.content    = content;
    this.element.textContent = content;
  }

  public setColor(color: TextColor): void {
    // Remove any existing color class, apply new one
    for (const c of ['default','subtle','primary','success','warning','danger']) {
      this.element.classList.remove(`blob-text--color-${c}`);
    }
    this._opts.color = color;
    this.element.classList.add(`blob-text--color-${color}`);
  }

  public set(updates: Partial<TextOptions>): void {
    Object.assign(this._opts, updates);
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
