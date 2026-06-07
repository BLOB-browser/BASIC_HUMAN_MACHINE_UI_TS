/**
 * ActionBar component — blob-action-bar
 *
 * A horizontal bar of contextual action buttons, typically docked at the
 * bottom of a widget or modal. Supports a hint label on the left, primary
 * and secondary action groups, and an optional trailing slot.
 *
 * Three layout variants:
 *  - default  — flush background matching surface (toolbar feel)
 *  - elevated — subtle shadow to lift above content
 *  - ghost    — transparent, just the buttons
 *
 * Alignment:
 *  - end (default)     — actions aligned to the right
 *  - start             — actions aligned to the left
 *  - between           — hint label on left, actions on right
 *  - center            — everything centered
 *
 * CSS class: blob-action-bar
 *
 * @example
 * ```typescript
 * const bar = new ActionBar({
 *   hint: 'Unsaved changes',
 *   actions: [
 *     new Button({ label: 'Discard', variant: 'ghost' }).element,
 *     new Button({ label: 'Save',    variant: 'primary' }).element,
 *   ],
 * });
 *
 * // Suggestion chips (ghost variant)
 * const bar = new ActionBar({
 *   hint:    'Try asking:',
 *   variant: 'ghost',
 *   actions: suggestions.map(s =>
 *     new Button({ label: s, variant: 'secondary', size: 'sm', onClick: () => ask(s) }).element
 *   ),
 * });
 *
 * // With separator and trailing slot
 * const bar = new ActionBar({
 *   actions:  [cancelBtn, saveBtn],
 *   trailing: helpBtn,
 *   align:    'between',
 * });
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ActionBarVariant = 'default' | 'elevated' | 'ghost';
export type ActionBarAlign   = 'start' | 'end' | 'center' | 'between';

export interface ActionBarOptions {
  /** Descriptive text on the leading side (e.g. "2 items selected", "Try asking:"). */
  hint?:     string;
  /** Action elements (Buttons, Tags, etc.). */
  actions?:  HTMLElement[];
  /** Element placed at the far trailing end after a separator. */
  trailing?: HTMLElement;
  variant?:  ActionBarVariant;
  align?:    ActionBarAlign;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class ActionBar {
  public element:   HTMLElement;
  public actionsEl: HTMLElement;
  private _opts:    ActionBarOptions;

  constructor(options: ActionBarOptions = {}) {
    this._opts = options;
    const { bar, actionsEl } = this.build();
    this.element    = bar;
    this.actionsEl  = actionsEl;
  }

  private build(): { bar: HTMLElement; actionsEl: HTMLElement } {
    const { hint, actions = [], trailing, variant = 'default', align = 'end' } = this._opts;

    const bar = document.createElement('div');
    bar.className = [
      'blob-action-bar',
      `blob-action-bar--${variant}`,
      `blob-action-bar--${align}`,
    ].join(' ');

    // Hint label
    if (hint) {
      const hintEl = document.createElement('span');
      hintEl.className   = 'blob-action-bar__hint';
      hintEl.textContent = hint;
      bar.appendChild(hintEl);
    }

    // For 'between': spacer pushes actions to the right
    if (align === 'between' && hint) {
      const spacer = document.createElement('div');
      spacer.className = 'blob-action-bar__spacer';
      bar.appendChild(spacer);
    }

    // Actions group
    const actionsEl = document.createElement('div');
    actionsEl.className = 'blob-action-bar__actions';
    for (const action of actions) actionsEl.appendChild(action);
    bar.appendChild(actionsEl);

    // Trailing
    if (trailing) {
      const sep = document.createElement('div');
      sep.className = 'blob-action-bar__sep';
      bar.appendChild(sep);

      const trailWrap = document.createElement('div');
      trailWrap.className = 'blob-action-bar__trailing';
      trailWrap.appendChild(trailing);
      bar.appendChild(trailWrap);
    }

    return { bar, actionsEl };
  }

  /** Replace all action elements. */
  public setActions(actions: HTMLElement[]): void {
    this.actionsEl.innerHTML = '';
    for (const a of actions) this.actionsEl.appendChild(a);
  }

  /** Update hint text. */
  public setHint(hint: string): void {
    const el = this.element.querySelector('.blob-action-bar__hint');
    if (el) {
      el.textContent = hint;
    } else {
      const hintEl = document.createElement('span');
      hintEl.className   = 'blob-action-bar__hint';
      hintEl.textContent = hint;
      this.element.insertBefore(hintEl, this.element.firstChild);
    }
  }
}
