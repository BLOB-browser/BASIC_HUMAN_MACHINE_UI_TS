import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const cardVariants = cva(
  'blob-card',
  {
    variants: {
      variant: {
        default:  '',
        elevated: 'blob-card--elevated',
        outlined: 'blob-card--outlined',
        ghost:    'blob-card--ghost',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardVariants> {
  cardTitle?: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  actions?: React.ReactNode;
  mediaSrc?: string;
  mediaAlt?: string;
  /** Render as an <a> when provided */
  href?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      cardTitle,
      subtitle,
      leading,
      trailing,
      actions,
      mediaSrc,
      mediaAlt,
      href,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isClickable = Boolean(href || onClick);
    const hasHeader = Boolean(cardTitle || subtitle || leading || trailing);

    const inner = (
      <>
        {mediaSrc && (
          <div className="blob-card__media">
            <img src={mediaSrc} alt={mediaAlt ?? ''} />
          </div>
        )}

        {hasHeader && (
          <div className="blob-card__header">
            {leading && <div className="blob-card__header__leading">{leading}</div>}
            <div className="blob-card__header__body">
              {cardTitle && <p className="blob-card__title">{cardTitle}</p>}
              {subtitle  && <p className="blob-card__subtitle">{subtitle}</p>}
            </div>
            {trailing && <div className="blob-card__header__trailing">{trailing}</div>}
          </div>
        )}

        {children && (
          <div className={cn('blob-card__body', hasHeader && 'blob-card__body--has-header')}>
            {children}
          </div>
        )}

        {actions && (
          <div className="blob-card__footer blob-card__footer--end">{actions}</div>
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={cn(cardVariants({ variant }), 'blob-card--clickable', className)}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {inner}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), isClickable && 'blob-card--clickable', className)}
        onClick={onClick}
        {...(onClick ? { role: 'button', tabIndex: 0 } : {})}
        {...props}
      >
        {inner}
      </div>
    );
  }
);
Card.displayName = 'Card';
