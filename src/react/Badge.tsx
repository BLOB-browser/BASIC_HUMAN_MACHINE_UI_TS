import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'blob-badge',
  {
    variants: {
      variant: {
        default: 'blob-badge--default',
        primary: 'blob-badge--primary',
        success: 'blob-badge--success',
        warning: 'blob-badge--warning',
        danger:  'blob-badge--danger',
        info:    'blob-badge--info',
      },
      mode: {
        label: '',
        dot:   'blob-badge--dot',
        count: 'blob-badge--count',
      },
    },
    defaultVariants: { variant: 'default', mode: 'label' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  count?: number;
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, mode, count, dot, children, ...props }, ref) => {
    const resolvedMode: 'label' | 'dot' | 'count' =
      dot ? 'dot' : count !== undefined ? 'count' : mode ?? 'label';

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, mode: resolvedMode }), className)}
        {...props}
      >
        {resolvedMode === 'count' ? count : resolvedMode === 'dot' ? null : children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
