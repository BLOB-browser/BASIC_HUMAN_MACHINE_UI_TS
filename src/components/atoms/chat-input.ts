/**
 * ChatInput component — blob-chat-input
 *
 * A multiline auto-growing textarea with an actions slot on the right.
 * Designed for chat, prompts, comments, and AI interfaces.
 *
 * Behaviour:
 *   - Textarea grows vertically as the user types, up to maxRows
 *   - Enter submits (calls onSubmit), Shift+Enter inserts a newline
 *   - Actions slot accepts any elements — pass Button instances, icon buttons, etc.
 *
 * CSS class:  blob-chat-input          (outer container)
 *             blob-chat-input__field   (the <textarea>)
 *             blob-chat-input__actions (right-side action bar)
 *             blob-chat-input--focused
 *             blob-chat-input--disabled
 *
 * @example
 * ```typescript
 * import { ChatInput, Button } from '@ui/components';
 *
 * const sendBtn = new Button({ label: 'Send', size: 'sm' });
 * const chat = new ChatInput({
 *   placeholder: 'Ask anything…',
 *   actions: [sendBtn.element],
 *   onSubmit: (value) => console.log('sent:', value),
 * });
 * document.body.appendChild(chat.element);
 * ```
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ChatInputOptions {
  placeholder?: string;
  value?:       string;
  disabled?:    boolean;
  /** Max number of visible rows before the textarea scrolls (default 6) */
  maxRows?:     number;
  /** Elements rendered in the right-side actions slot (e.g. Button.element) */
  actions?:     HTMLElement[];
  /** Extra classes on the outer wrapper */
  className?:   string;
  /** Called on every keystroke */
  onChange?:    (value: string) => void;
  /** Called when Enter is pressed (without Shift). Value is cleared after. */
  onSubmit?:    (value: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export class ChatInput {
  public element: HTMLElement;
  public textareaEl!: HTMLTextAreaElement;

  private options: Required<Omit<ChatInputOptions, 'actions' | 'className' | 'onChange' | 'onSubmit'>> &
    Pick<ChatInputOptions, 'actions' | 'className' | 'onChange' | 'onSubmit'>;

  constructor(options: ChatInputOptions = {}) {

    this.options = {
      placeholder: options.placeholder ?? 'Type a message…',
      value:       options.value       ?? '',
      disabled:    options.disabled    ?? false,
      maxRows:     options.maxRows     ?? 6,
      actions:     options.actions,
      className:   options.className,
      onChange:    options.onChange,
      onSubmit:    options.onSubmit,
    };

    this.element = this.build();
  }

  private build(): HTMLElement {
    const { placeholder, value, disabled, maxRows, actions, className, onChange, onSubmit } = this.options;

    const wrapper = document.createElement('div');
    wrapper.className = [
      'blob-chat-input',
      disabled ? 'blob-chat-input--disabled' : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    // Textarea
    const textarea = document.createElement('textarea');
    textarea.className   = 'blob-chat-input__field';
    textarea.placeholder = placeholder;
    textarea.value       = value;
    textarea.disabled    = disabled;
    textarea.rows        = 1;

    // Auto-grow
    const LINE_HEIGHT_PX = 24; // 1.5rem at 16px base
    const resize = () => {
      textarea.style.height = 'auto';
      const maxHeight = maxRows * LINE_HEIGHT_PX;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    };

    textarea.addEventListener('input', () => {
      resize();
      onChange?.(textarea.value);
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const val = textarea.value.trim();
        if (!val) return;
        onSubmit?.(val);
        textarea.value = '';
        resize();
      }
    });

    textarea.addEventListener('focus', () => wrapper.classList.add('blob-chat-input--focused'));
    textarea.addEventListener('blur',  () => wrapper.classList.remove('blob-chat-input--focused'));

    this.textareaEl = textarea;
    wrapper.appendChild(textarea);

    // Actions slot
    if (actions && actions.length > 0) {
      const actionsEl = document.createElement('div');
      actionsEl.className = 'blob-chat-input__actions';
      actions.forEach(a => actionsEl.appendChild(a));
      wrapper.appendChild(actionsEl);
    }

    // Initial resize after next paint (value may be pre-filled)
    if (value) requestAnimationFrame(resize);

    return wrapper;
  }

  /** Get the current textarea value. */
  public getValue(): string {
    return this.textareaEl.value;
  }

  /** Programmatically set the value. */
  public setValue(value: string): void {
    this.textareaEl.value = value;
  }

  /** Clear the field. */
  public clear(): void {
    this.textareaEl.value = '';
    this.textareaEl.style.height = 'auto';
  }

  /** Focus the textarea. */
  public focus(): void {
    this.textareaEl.focus();
  }

  public setDisabled(disabled: boolean): void {
    this.options.disabled = disabled;
    const next = this.build();
    this.element.replaceWith(next);
    this.element = next;
  }
}
