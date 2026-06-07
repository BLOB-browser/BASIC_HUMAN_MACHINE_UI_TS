import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const chipVariants = cva(
  'blob-chip p-4 text-xs gap-1',
  {
    variants: {
      variant: {
        default: 'blob-chip--default',
        primary: 'blob-chip--primary',
        success: 'blob-chip--success',
        warning: 'blob-chip--warning',
        danger:  'blob-chip--danger',
        ghost:   'blob-chip--ghost',
      },
      size: {
        sm: '',
        md: 'blob-chip--md',
      },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  interactive?: boolean;
  active?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      removable,
      onRemove,
      interactive,
      active,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({ variant, size }),
          interactive && 'blob-chip--interactive',
          active      && 'blob-chip--active',
          className
        )}
        {...(interactive ? { role: 'button', tabIndex: 0 } : {})}
        {...props}
      >
        {icon && <span className="blob-chip__icon">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            className="blob-chip__remove"
            onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);
Chip.displayName = 'Tag';
