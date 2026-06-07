import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'onChange'> {
  label?: React.ReactNode
  helper?: string
  error?: string
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, helper, error, id, ...props }, ref) => {
  const autoId = React.useId()
  const checkId = id ?? autoId
  const helperId = `${checkId}-helper`
  const hasError = Boolean(error)

  return (
    <div className={cn('blob-checkbox', hasError && 'blob-checkbox--error', className)}>
      <div className="blob-checkbox__row">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkId}
          className="blob-checkbox__control"
          aria-describedby={hasError || helper ? helperId : undefined}
          aria-invalid={hasError || undefined}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="blob-checkbox__indicator">
            {/* checkmark SVG — inlined so it works without icon deps */}
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <LabelPrimitive.Root htmlFor={checkId} className="blob-checkbox__label">
            {label}
          </LabelPrimitive.Root>
        )}
      </div>
      {(error || helper) && (
        <span id={helperId} className={cn('blob-checkbox__helper', hasError && 'blob-checkbox__helper--error')}>
          {error ?? helper}
        </span>
      )}
    </div>
  )
})
Checkbox.displayName = 'Checkbox'
