import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva('blob-button', {
  variants: {
    variant: {
      primary:   'blob-button--primary',
      secondary: 'blob-button--secondary',
      ghost:     'blob-button--ghost',
      danger:    'blob-button--danger',
    },
    size: {
      sm: 'p-2 text-xs gap-1',
      md: 'p-4 text-sm gap-2',
      lg: 'p-6 text-base gap-2',
    },
    iconOnly: {
      true:  'blob-button--icon-only',
      false: '',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md', iconOnly: false },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (e.g. <a>) via Radix Slot */
  asChild?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, asChild, loading, disabled, iconLeft, iconRight, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className="blob-button__spinner" aria-hidden="true" />}
        {iconLeft && <span className="blob-button__icon-left" aria-hidden="true">{iconLeft}</span>}
        {children}
        {iconRight && <span className="blob-button__icon-right" aria-hidden="true">{iconRight}</span>}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
