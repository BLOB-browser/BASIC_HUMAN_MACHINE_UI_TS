/**
 * Accordion component — blob-accordion
 *
 * Vertically stacked collapsible sections. Each section has a clickable
 * trigger row and a panel that expands/collapses with a CSS height animation.
 *
 * Modes:
 *  - single (default): only one panel open at a time (accordion behaviour)
 *  - multi:            multiple panels can be open simultaneously
 *
 * CSS class: blob-accordion
 *
 * @example
 * ```typescript
 * const faq = new Accordion({
 *   items: [
 *     {
 *       id:      'q1',
 *       label:   'What is BLOB?',
 *       content: contentEl,
 *     },
 *     {
 *       id:      'q2',
 *       label:   'How do I get started?',
 *       content: startEl,
 *       open:    true,           // start expanded
 *     },
 *   ],
 * });
 *
 * // Multi-open
 * const faq = new Accordion({ multi: true, items: [...] });
 *
 * // Programmatic control
 * faq.open('q1');
 * faq.close('q2');
 * faq.toggle('q1');
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface AccordionItem {
  id:       string;
  label:    string;
  content:  HTMLElement;
  /** Leading icon (optional). */
  icon?:    HTMLElement;
  open?:    boolean;
  disabled?: boolean;
}

export interface AccordionOptions {
  items:  AccordionItem[];
  /** Allow multiple open at once. Default: false (single). */
  multi?: boolean;
  onChange?: (openIds: string[]) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface AccordionRef {
  trigger:   HTMLButtonElement;
  panelWrap: HTMLElement;
}

const CHEVRON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5 4.5-4.5"/></svg>';

export class Accordion {
  public element: HTMLElement;
  private _refs:  Map<string, AccordionRef> = new Map();
  private _open:  Set<string>;
  private _opts:  AccordionOptions;

  constructor(options: AccordionOptions) {
    this._opts = options;
    this._open = new Set(options.items.filter(i => i.open).map(i => i.id));
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { items, multi = false } = this._opts;

    const root = document.createElement('div');
    root.className = 'blob-accordion';

    for (const item of items) {
      const panelId   = `blob-acc-panel-${item.id}`;
      const triggerId = `blob-acc-trigger-${item.id}`;
      const isOpen    = this._open.has(item.id);

      // Item wrapper
      const itemEl = document.createElement('div');
      itemEl.className = 'blob-accordion__item';

      // Trigger
      const trigger = document.createElement('button');
      trigger.type      = 'button';
      trigger.id        = triggerId;
      trigger.className = 'blob-accordion__trigger';
      trigger.setAttribute('aria-expanded', String(isOpen));
      trigger.setAttribute('aria-controls', panelId);
      if (item.disabled) trigger.disabled = true;

      if (item.icon) {
        const iconWrap = document.createElement('span');
        iconWrap.className = 'blob-accordion__trigger-leading';
        iconWrap.appendChild(item.icon);
        trigger.appendChild(iconWrap);
      }

      const labelEl = document.createElement('span');
      labelEl.className   = 'blob-accordion__trigger-label';
      labelEl.textContent = item.label;
      trigger.appendChild(labelEl);

      const chevron = document.createElement('span');
      chevron.className = 'blob-accordion__trigger-chevron';
      chevron.innerHTML = CHEVRON;
      trigger.appendChild(chevron);

      // Panel
      const panelWrap = document.createElement('div');
      panelWrap.className = ['blob-accordion__panel-wrap', isOpen ? 'blob-accordion__panel-wrap--open' : ''].filter(Boolean).join(' ');

      const panelInner = document.createElement('div');
      panelInner.className = 'blob-accordion__panel-inner';

      const panel = document.createElement('div');
      panel.className  = 'blob-accordion__panel';
      panel.id         = panelId;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', triggerId);
      panel.appendChild(item.content);

      panelInner.appendChild(panel);
      panelWrap.appendChild(panelInner);

      trigger.addEventListener('click', () => {
        if (item.disabled) return;
        if (this._open.has(item.id)) {
          this.close(item.id);
        } else {
          if (!multi) {
            // close all others
            for (const openId of this._open) this.close(openId);
          }
          this.open(item.id);
        }
      });

      itemEl.appendChild(trigger);
      itemEl.appendChild(panelWrap);
      root.appendChild(itemEl);

      this._refs.set(item.id, { trigger, panelWrap });
    }

    return root;
  }

  public open(id: string): void {
    const ref = this._refs.get(id);
    if (!ref) return;
    this._open.add(id);
    ref.trigger.setAttribute('aria-expanded', 'true');
    ref.panelWrap.classList.add('blob-accordion__panel-wrap--open');
    this._opts.onChange?.([...this._open]);
  }

  public close(id: string): void {
    const ref = this._refs.get(id);
    if (!ref) return;
    this._open.delete(id);
    ref.trigger.setAttribute('aria-expanded', 'false');
    ref.panelWrap.classList.remove('blob-accordion__panel-wrap--open');
    this._opts.onChange?.([...this._open]);
  }

  public toggle(id: string): void {
    this._open.has(id) ? this.close(id) : this.open(id);
  }

  public get openIds(): string[] { return [...this._open]; }
}
