import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const tagVariants = cva(
  'blob-tag',
  {
    variants: {
      variant: {
        default: 'blob-tag--default',
        primary: 'blob-tag--primary',
        success: 'blob-tag--success',
        warning: 'blob-tag--warning',
        danger:  'blob-tag--danger',
        ghost:   'blob-tag--ghost',
      },
      size: {
        sm: '',
        md: 'blob-tag--md',
      },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  interactive?: boolean;
  active?: boolean;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
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
          tagVariants({ variant, size }),
          interactive && 'blob-tag--interactive',
          active      && 'blob-tag--active',
          className
        )}
        {...(interactive ? { role: 'button', tabIndex: 0 } : {})}
        {...props}
      >
        {icon && <span className="blob-tag__icon">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            className="blob-tag__remove"
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
Tag.displayName = 'Tag';
