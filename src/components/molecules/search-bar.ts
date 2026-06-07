/**
 * SearchBar component — blob-search-bar
 *
 * An enhanced Input with a built-in search icon, clear button, optional
 * keyboard shortcut hint, and an optional results dropdown.
 *
 * Pass `onSearch` for debounced search. Results are rendered inside an
 * auto-positioned dropdown using the same visual pattern as Dropdown items.
 * When `results` is `null` the dropdown is hidden; set it to `[]` to show
 * an empty state.
 *
 * CSS class: blob-search-bar
 *
 * @example
 * ```typescript
 * // Basic (no results)
 * const search = new SearchBar({
 *   placeholder: 'Search anything…',
 *   onSearch:    (query) => console.log(query),
 * });
 *
 * // With async results
 * const search = new SearchBar({
 *   placeholder: 'Search projects…',
 *   shortcut:    '⌘K',
 *   onSearch:    async (q) => {
 *     const data = await api.search(q);
 *     search.setResults(
 *       data.map(r => ({ label: r.name, description: r.path, onSelect: () => open(r) }))
 *     );
 *   },
 * });
 *
 * // Programmatic clear
 * search.clear();
 * ```
 */

const SEARCH_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>';
const CLEAR_ICON  = '<svg viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 2L2 9M2 2l7 7"/></svg>';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface SearchResultItem {
  label:        string;
  description?: string;
  icon?:        HTMLElement;
  trailing?:    HTMLElement;
  onSelect?:    () => void;
}

export interface SearchBarOptions {
  placeholder?:  string;
  value?:        string;
  /** Optional keyboard shortcut badge displayed on the right (e.g. '⌘K'). */
  shortcut?:     string;
  /** Debounce delay in ms. Default: 200. */
  debounce?:     number;
  /** Empty string label shown when results = []. Default: 'No results'. */
  emptyLabel?:   string;
  onSearch?:     (query: string) => void;
  onClear?:      () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class SearchBar {
  public element:   HTMLElement;
  public inputEl!:  HTMLInputElement;
  private _resultsEl!: HTMLElement;
  private _clearBtn!:  HTMLButtonElement;
  private _opts:    SearchBarOptions;
  private _debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(options: SearchBarOptions = {}) {
    this._opts = options;
    this.element = this.build();
  }

  private build(): HTMLElement {
    const { placeholder = 'Search…', value = '', shortcut, debounce: delay = 200 } = this._opts;
    const hasRight = !!(shortcut);

    const wrap = document.createElement('div');
    wrap.className = ['blob-search-bar', hasRight ? 'blob-search-bar--has-right' : ''].filter(Boolean).join(' ');

    // Search icon
    const iconEl = document.createElement('span');
    iconEl.className = 'blob-search-bar__icon';
    iconEl.innerHTML  = SEARCH_ICON;
    wrap.appendChild(iconEl);

    // Input
    const input = document.createElement('input');
    input.type        = 'search';
    input.className   = 'blob-search-bar__input';
    input.placeholder = placeholder;
    input.value       = value;
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('spellcheck', 'false');
    this.inputEl = input;
    wrap.appendChild(input);

    // Right slot
    const right = document.createElement('div');
    right.className = 'blob-search-bar__right';

    // Clear button
    const clearBtn = document.createElement('button');
    clearBtn.type      = 'button';
    clearBtn.className = ['blob-search-bar__clear', value ? '' : 'blob-search-bar__clear--hidden'].filter(Boolean).join(' ');
    clearBtn.setAttribute('aria-label', 'Clear search');
    clearBtn.innerHTML = CLEAR_ICON;
    clearBtn.addEventListener('click', () => this.clear());
    right.appendChild(clearBtn);
    this._clearBtn = clearBtn;

    if (shortcut) {
      const sc = document.createElement('span');
      sc.className   = 'blob-search-bar__shortcut';
      sc.textContent = shortcut;
      right.appendChild(sc);
    }

    wrap.appendChild(right);

    // Results dropdown
    const results = document.createElement('div');
    results.className = 'blob-search-bar__results blob-search-bar__results--hidden';
    results.setAttribute('role', 'listbox');
    wrap.appendChild(results);
    this._resultsEl = results;

    // Input events
    input.addEventListener('input', () => {
      const q = input.value;
      // Toggle clear button
      clearBtn.classList.toggle('blob-search-bar__clear--hidden', !q);
      // Debounced search
      if (this._debounceTimer) clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => this._opts.onSearch?.(q), delay);
      // Hide results on empty
      if (!q) this.hideResults();
    });

    // Close results on outside click
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target as Node)) this.hideResults();
    });

    // Arrow key navigation into results
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const first = results.querySelector<HTMLElement>('.blob-search-bar__result-item');
        first?.focus();
      } else if (e.key === 'Escape') {
        this.hideResults();
        input.blur();
      }
    });

    results.addEventListener('keydown', (e) => {
      const items = Array.from(results.querySelectorAll<HTMLElement>('.blob-search-bar__result-item'));
      const idx   = items.indexOf(document.activeElement as HTMLElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); idx <= 0 ? input.focus() : items[idx - 1]?.focus(); }
      if (e.key === 'Escape')    { this.hideResults(); input.focus(); }
    });

    return wrap;
  }

  /** Replace results dropdown content. Pass null to hide, [] to show empty state. */
  public setResults(items: SearchResultItem[] | null): void {
    const el = this._resultsEl;
    el.innerHTML = '';

    if (items === null) {
      this.hideResults();
      return;
    }

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className   = 'blob-search-bar__results-empty';
      empty.textContent = this._opts.emptyLabel ?? 'No results';
      el.appendChild(empty);
    } else {
      for (const item of items) {
        const row = document.createElement('div');
        row.className  = 'blob-search-bar__result-item';
        row.setAttribute('role', 'option');
        row.tabIndex   = 0;

        if (item.icon) {
          const iw = document.createElement('span');
          iw.className = 'blob-search-bar__result-item-icon';
          iw.appendChild(item.icon);
          row.appendChild(iw);
        }

        const body = document.createElement('div');
        body.className = 'blob-search-bar__result-item-body';
        const lbl = document.createElement('span');
        lbl.className   = 'blob-search-bar__result-item-label';
        lbl.textContent = item.label;
        body.appendChild(lbl);
        if (item.description) {
          const desc = document.createElement('span');
          desc.className   = 'blob-search-bar__result-item-desc';
          desc.textContent = item.description;
          body.appendChild(desc);
        }
        row.appendChild(body);

        if (item.trailing) {
          const tw = document.createElement('span');
          tw.className = 'blob-search-bar__result-trailing';
          tw.appendChild(item.trailing);
          row.appendChild(tw);
        }

        row.addEventListener('click', () => { item.onSelect?.(); this.hideResults(); });
        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.onSelect?.(); this.hideResults(); }
        });

        el.appendChild(row);
      }
    }

    el.classList.remove('blob-search-bar__results--hidden');
  }

  public hideResults(): void {
    this._resultsEl.classList.add('blob-search-bar__results--hidden');
  }

  public clear(): void {
    this.inputEl.value = '';
    this._clearBtn.classList.add('blob-search-bar__clear--hidden');
    this.hideResults();
    this._opts.onClear?.();
    this._opts.onSearch?.('');
    this.inputEl.focus();
  }

  public get value(): string { return this.inputEl.value; }

  public setValue(val: string): void {
    this.inputEl.value = val;
    this._clearBtn.classList.toggle('blob-search-bar__clear--hidden', !val);
  }
}
