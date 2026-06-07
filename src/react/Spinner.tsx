import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const spinnerVariants = cva(
  'blob-spinner',
  {
    variants: {
      size: {
        xs: 'blob-spinner--xs',
        sm: 'blob-spinner--sm',
        md: 'blob-spinner--md',
        lg: 'blob-spinner--lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label for screen readers */
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label = 'Loading…', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(spinnerVariants({ size }), className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className="blob-spinner__ring" aria-hidden />
      </span>
    );
  }
);
Spinner.displayName = 'Spinner';
