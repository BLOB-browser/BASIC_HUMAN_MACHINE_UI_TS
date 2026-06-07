/**
 * EmptyState component — blob-empty-state
 *
 * Blank-slate placeholder shown when a list, table, or section has no content.
 * Provides an optional illustration/icon, heading, description, and CTA action.
 *
 * CSS class: blob-empty-state
 *
 * @example
 * ```typescript
 * const emptySearch = new EmptyState({
 *   icon:        searchIcon,
 *   title:       'No results found',
 *   description: 'Try adjusting your search or filters.',
 * });
 *
 * // With primary action
 * const emptyProjects = new EmptyState({
 *   icon:        folderIcon,
 *   title:       'No projects yet',
 *   description: 'Create your first project to get started.',
 *   action:      new Button({ label: 'New project', variant: 'primary' }).element,
 * });
 *
 * // Compact (inside a card or table)
 * const empty = new EmptyState({ title: 'Nothing here yet', compact: true });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface EmptyStateOptions {
  title:        string;
  description?: string;
  /** Icon or illustration element. */
  icon?:         HTMLElement;
  /** Primary CTA — typically a Button element. Can also be an array. */
  action?:       HTMLElement | HTMLElement[];
  /** Reduce padding for use inside a card or table. */
  compact?:      boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class EmptyState {
  public element: HTMLElement;

  constructor(options: EmptyStateOptions) {
    this.element = this.build(options);
  }

  private build(options: EmptyStateOptions): HTMLElement {
    const { title, description, icon, action, compact = false } = options;

    const el = document.createElement('div');
    el.className = ['blob-empty-state', compact ? 'blob-empty-state--compact' : ''].filter(Boolean).join(' ');

    // Icon
    if (icon) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'blob-empty-state__icon';
      iconWrap.appendChild(icon);
      el.appendChild(iconWrap);
    }

    // Title
    const titleEl = document.createElement('div');
    titleEl.className   = 'blob-empty-state__title';
    titleEl.textContent = title;
    el.appendChild(titleEl);

    // Description
    if (description) {
      const descEl = document.createElement('div');
      descEl.className   = 'blob-empty-state__description';
      descEl.textContent = description;
      el.appendChild(descEl);
    }

    // Action(s)
    if (action) {
      const actionsEl = document.createElement('div');
      actionsEl.className = 'blob-empty-state__actions';
      const actions = Array.isArray(action) ? action : [action];
      for (const a of actions) actionsEl.appendChild(a);
      el.appendChild(actionsEl);
    }

    return el;
  }
}
