import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'blob-button',
  {
    variants: {
      variant: {
        primary:   'blob-button--primary',
        secondary: 'blob-button--secondary',
        ghost:     'blob-button--ghost',
        danger:    'blob-button--danger',
      },
      size: {
        sm: 'blob-button--sm',
        md: 'blob-button--md',
        lg: 'blob-button--lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  /** Render as an anchor tag when provided */
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Icon-only button (square aspect-ratio) */
  iconOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      loading,
      iconLeft,
      iconRight,
      iconOnly,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      buttonVariants({ variant, size }),
      loading   && 'blob-button--loading',
      disabled  && 'blob-button--disabled',
      iconOnly  && 'blob-button--icon-only',
      className
    );

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {loading && <span className="blob-button__spinner" aria-hidden />}
          {iconLeft}
          {children}
          {iconRight}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className="blob-button__spinner" aria-hidden />}
        {iconLeft}
        {children}
        {iconRight}
      </button>
    );
  }
);
Button.displayName = 'Button';
