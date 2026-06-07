import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const inputVariants = cva(
  'blob-input-wrapper',
  {
    variants: {
      size: {
        sm: 'blob-input--sm',
        md: 'blob-input--md',
        lg: 'blob-input--lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helper?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  action?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size, label, helper, error, iconLeft, iconRight, action, id, disabled, ...props },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const hasError = Boolean(error);

    return (
      <div
        className={cn(
          inputVariants({ size }),
          hasError && 'blob-input--error',
          disabled  && 'blob-input--disabled',
          className
        )}
      >
        {label && (
          <label htmlFor={inputId} className="blob-input-label">
            {label}
          </label>
        )}
        <div className="blob-input-row">
          {iconLeft && <span className="blob-input-icon">{iconLeft}</span>}
          <input
            ref={ref}
            id={inputId}
            className="blob-input-field"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError || helper ? `${inputId}-helper` : undefined}
            {...props}
          />
          {iconRight && <span className="blob-input-icon">{iconRight}</span>}
          {action && <span className="blob-input-action">{action}</span>}
        </div>
        {(error || helper) && (
          <span id={`${inputId}-helper`} className="blob-input-helper">
            {error ?? helper}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
