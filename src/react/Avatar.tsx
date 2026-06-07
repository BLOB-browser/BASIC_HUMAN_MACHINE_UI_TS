import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const avatarVariants = cva(
  'blob-avatar',
  {
    variants: {
      size: {
        xs: 'blob-avatar--xs',
        sm: 'blob-avatar--sm',
        md: 'blob-avatar--md',
        lg: 'blob-avatar--lg',
        xl: 'blob-avatar--xl',
      },
      shape: {
        circle: '',
        square: 'blob-avatar--square',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  }
);

export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  status?: AvatarStatus;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, shape, src, alt, initials, status, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(avatarVariants({ size, shape }), className)} {...props}>
        {src ? (
          <img className="blob-avatar__img" src={src} alt={alt ?? ''} />
        ) : initials ? (
          <span className="blob-avatar__initials" aria-hidden>
            {initials}
          </span>
        ) : null}
        {status && (
          <span
            className={`blob-avatar__status blob-avatar__status--${status}`}
            aria-label={status}
          />
        )}
      </span>
    );
  }
);
Avatar.displayName = 'Avatar';
