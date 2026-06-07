/**
 * Tooltip component — blob-tooltip
 *
 * Shows a contextual label on hover or focus. Wraps any target element.
 * Positioning is CSS-driven (top/bottom/left/right). Edge-case overflow
 * detection is future work.
 *
 * Structure:
 *   <span class="blob-tooltip-wrapper">
 *     {target element}
 *     <span class="blob-tooltip__content blob-tooltip__content--top">…</span>
 *   </span>
 *
 * @example
 * ```typescript
 * const btn = new Button({ iconLeft: trashIcon, ariaLabel: 'Delete', variant: 'ghost' });
 * const tip = new Tooltip({ target: btn.element, content: 'Delete item', placement: 'top' });
 * container.appendChild(tip.element);
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipOptions {
  /** The element the tooltip is attached to. Becomes the first child of the wrapper. */
  target:      HTMLElement;
  content:     string;
  placement?:  TooltipPlacement;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Tooltip {
  public element: HTMLElement;
  private _tip:   HTMLElement;
  private _opts:  TooltipOptions;

  constructor(options: TooltipOptions) {
    this._opts = options;
    const { wrapper, tip } = this.build();
    this.element = wrapper;
    this._tip    = tip;
  }

  private build(): { wrapper: HTMLElement; tip: HTMLElement } {
    const { target, content, placement = 'top' } = this._opts;

    const wrapper = document.createElement('span');
    wrapper.className = 'blob-tooltip-wrapper';

    wrapper.appendChild(target);

    const tip = document.createElement('span');
    tip.className   = `blob-tooltip__content blob-tooltip__content--${placement}`;
    tip.textContent = content;
    tip.setAttribute('role', 'tooltip');
    wrapper.appendChild(tip);

    return { wrapper, tip };
  }

  public setContent(content: string): void {
    this._opts.content    = content;
    this._tip.textContent = content;
  }

  public setPlacement(placement: TooltipPlacement): void {
    this._opts.placement = placement;
    this._tip.className  = `blob-tooltip__content blob-tooltip__content--${placement}`;
  }
}
