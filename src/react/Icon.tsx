import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const iconVariants = cva('blob-icon', {
  variants: {
    size: {
      xs:   'blob-icon--xs',
      sm:   'blob-icon--sm',
      base: 'blob-icon--base',
      lg:   'blob-icon--lg',
      xl:   'blob-icon--xl',
    },
  },
  defaultVariants: { size: 'base' },
})

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconVariants> {
  /** Accessible label — required unless parent provides aria-label */
  label?: string
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size, label, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(iconVariants({ size }), className)}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      {...props}
    >
      {children}
    </span>
  )
)
Icon.displayName = 'Icon'
