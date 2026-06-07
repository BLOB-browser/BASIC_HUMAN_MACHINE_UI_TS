import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const linkVariants = cva('blob-link', {
  variants: {
    variant: {
      default: '',
      subtle:  'blob-link--subtle',
      danger:  'blob-link--danger',
    },
    underline: {
      always: '',
      hover:  'blob-link--no-underline',
      never:  'blob-link--no-underline',
    },
  },
  defaultVariants: { variant: 'default', underline: 'always' },
})

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /** Render as a <button> when no href is provided */
  asButton?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, asButton, href, children, ...props }, ref) => {
    if (asButton || !href) {
      return (
        <button
          type="button"
          className={cn(linkVariants({ variant, underline }), className)}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )
    }
    return (
      <a
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, underline }), className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)
Link.displayName = 'Link'
