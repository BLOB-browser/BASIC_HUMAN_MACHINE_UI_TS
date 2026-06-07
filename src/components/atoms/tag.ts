/**
 * Tag component — blob-tag
 *
 * A small inline label used for categorisation, filtering, and metadata.
 * Supports optional removal (×), click handlers, icons, and colour variants.
 *
 * CSS class:  blob-tag
 * Variants:   blob-tag--default
 *             blob-tag--primary   (uses --color-primary / --color-on-primary)
 *             blob-tag--success
 *             blob-tag--warning
 *             blob-tag--danger
 *             blob-tag--ghost     (border only, no fill)
 * Modifiers:  blob-tag--interactive  (pointer cursor, hover state)
 *             blob-tag--removable    (shows × button)
 *
 * @example
 * ```typescript
 * // Static label
 * const tag = new Tag({ label: 'TypeScript' });
 *
 * // Filterable tag (click to toggle active state)
 * const filter = new Tag({ label: 'Design', interactive: true, onClick: (active) => filter(active) });
 *
 * // Removable tag (e.g. selected filter chips)
 * const chip = new Tag({ label: 'React', removable: true, onRemove: () => removeFilter('react') });
 *
 * // With icon
 * const tag = new Tag({ label: 'Verified', iconLeft: checkIconEl, variant: 'success' });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'ghost';
export type TagSize    = 'sm' | 'md';

export interface TagOptions {
  label:       string;
  variant?:    TagVariant;
  size?:       TagSize;
  /** Renders pointer cursor + hover state. onClick receives the new active state. */
  interactive?: boolean;
  /** Initial active state (only meaningful when interactive: true) */
  active?:     boolean;
  /** Shows a × button that calls onRemove when clicked */
  removable?:  boolean;
  /** Element to render before the label (e.g. a status dot SVG) */
  iconLeft?:   HTMLElement;
  /** Extra Tailwind classes on the outer element */
  className?:  string;
  onClick?:    (active: boolean) => void;
  onRemove?:   () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Tag {
  public element: HTMLElement;
  private _active: boolean;

  private options: Required<Omit<TagOptions, 'iconLeft' | 'className' | 'onClick' | 'onRemove'>> &
    Pick<TagOptions, 'iconLeft' | 'className' | 'onClick' | 'onRemove'>;

  constructor(options: TagOptions) {

    this._active = options.active ?? false;

    this.options = {
      label:       options.label,
      variant:     options.variant     ?? 'default',
      size:        options.size        ?? 'sm',
      interactive: options.interactive ?? false,
      active:      this._active,
      removable:   options.removable   ?? false,
      iconLeft:    options.iconLeft,
      className:   options.className,
      onClick:     options.onClick,
      onRemove:    options.onRemove,
    };

    this.element = this.build();
  }

  private build(): HTMLElement {
    const { label, variant, size, interactive, removable, iconLeft, className, onClick, onRemove } = this.options;

    const el = document.createElement('span');

    const classes = [
      'blob-tag',
      `blob-tag--${variant}`,
      size === 'md'   ? 'blob-tag--md'          : '',
      interactive     ? 'blob-tag--interactive'  : '',
      this._active    ? 'blob-tag--active'       : '',
      removable       ? 'blob-tag--removable'     : '',
      className       ?? '',
    ].filter(Boolean).join(' ');

    el.className = classes;

    if (interactive) {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', () => {
        this._active = !this._active;
        el.classList.toggle('blob-tag--active', this._active);
        onClick?.(this._active);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    }

    // Icon left
    if (iconLeft) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'blob-tag__icon';
      iconWrap.appendChild(iconLeft);
      el.appendChild(iconWrap);
    }

    // Label
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    el.appendChild(labelEl);

    // Remove button
    if (removable) {
      const removeBtn = document.createElement('button');
      removeBtn.className = 'blob-tag__remove';
      removeBtn.type = 'button';
      removeBtn.setAttribute('aria-label', `Remove ${label}`);
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onRemove?.();
      });
      el.appendChild(removeBtn);
    }

    return el;
  }

  /** Get current active state. */
  public get active(): boolean { return this._active; }

  /** Programmatically set active state without triggering onClick. */
  public setActive(active: boolean): void {
    this._active = active;
    this.element.classList.toggle('blob-tag--active', active);
  }

  public setLabel(label: string): void {
    this.options.label = label;
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
