/**
 * Breadcrumb component — blob-breadcrumb
 *
 * Navigation path chain. Each item is a label, optionally wrapped in an `<a>`
 * if an `href` is provided. The last item is the current page — it is rendered
 * as plain text (no link) and receives `aria-current="page"`.
 *
 * CSS class: blob-breadcrumb
 *
 * @example
 * ```typescript
 * const bc = new Breadcrumb({
 *   items: [
 *     { label: 'Home',     href: '/' },
 *     { label: 'Projects', href: '/projects' },
 *     { label: 'Alpha',                        },  // current — no href needed
 *   ],
 * });
 *
 * // Custom separator (SVG element)
 * const bc = new Breadcrumb({
 *   items: [...],
 *   separator: slashEl,
 * });
 *
 * // With icons
 * const bc = new Breadcrumb({
 *   items: [
 *     { label: 'Home', href: '/', icon: homeIcon },
 *     { label: 'Settings' },
 *   ],
 * });
 * ```
 */

// Default separator chevron
const DEFAULT_SEP = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 3l3.5 4-3.5 4"/></svg>';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface BreadcrumbItem {
  label:  string;
  href?:  string;
  icon?:  HTMLElement;
  /** Override the separator after this item (useful for custom separators). */
  sep?:   HTMLElement | string;
}

export interface BreadcrumbOptions {
  items:      BreadcrumbItem[];
  /** Default separator between items. String = HTML, HTMLElement = element. */
  separator?: HTMLElement | string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class Breadcrumb {
  public element: HTMLElement;

  constructor(options: BreadcrumbOptions) {
    this.element = this.build(options);
  }

  private buildSep(sep: HTMLElement | string | undefined): HTMLElement {
    const wrap = document.createElement('li');
    wrap.className = 'blob-breadcrumb__sep';
    wrap.setAttribute('aria-hidden', 'true');
    if (sep instanceof HTMLElement) {
      wrap.appendChild(sep.cloneNode(true) as HTMLElement);
    } else {
      wrap.innerHTML = sep ?? DEFAULT_SEP;
    }
    return wrap;
  }

  private build(options: BreadcrumbOptions): HTMLElement {
    const { items, separator } = options;

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Breadcrumb');

    const ol = document.createElement('ol');
    ol.className = 'blob-breadcrumb';

    items.forEach((item, idx) => {
      const isCurrent = idx === items.length - 1;
      const li = document.createElement('li');
      li.className = 'blob-breadcrumb__item';

      if (isCurrent) {
        const span = document.createElement('span');
        span.className = 'blob-breadcrumb__current';
        span.setAttribute('aria-current', 'page');

        if (item.icon) {
          const iconWrap = document.createElement('span');
          iconWrap.className = 'blob-breadcrumb__icon';
          iconWrap.appendChild(item.icon);
          span.appendChild(iconWrap);
        }

        span.appendChild(document.createTextNode(item.label));
        li.appendChild(span);
      } else {
        const a = item.href ? document.createElement('a') : document.createElement('span');
        a.className = 'blob-breadcrumb__link';
        if (item.href && a instanceof HTMLAnchorElement) a.href = item.href;

        if (item.icon) {
          const iconWrap = document.createElement('span');
          iconWrap.className = 'blob-breadcrumb__icon';
          iconWrap.appendChild(item.icon);
          a.appendChild(iconWrap);
        }

        a.appendChild(document.createTextNode(item.label));
        li.appendChild(a);

        // Append separator after non-last items
        const sep = item.sep ?? separator;
        ol.appendChild(li);
        ol.appendChild(this.buildSep(sep));
        return;
      }

      ol.appendChild(li);
    });

    nav.appendChild(ol);
    return nav;
  }
}
