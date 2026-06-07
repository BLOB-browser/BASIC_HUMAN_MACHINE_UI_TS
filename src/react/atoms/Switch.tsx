import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: React.ReactNode
  helper?: string
  error?: string
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, helper, error, id, ...props }, ref) => {
  const autoId = React.useId()
  const switchId = id ?? autoId
  const helperId = `${switchId}-helper`
  const hasError = Boolean(error)

  return (
    <div className={cn('blob-switch', hasError && 'blob-switch--error', className)}>
      <div className="blob-switch__row">
        <SwitchPrimitive.Root
          ref={ref}
          id={switchId}
          className="blob-switch__track"
          aria-describedby={hasError || helper ? helperId : undefined}
          {...props}
        >
          <SwitchPrimitive.Thumb className="blob-switch__thumb" />
        </SwitchPrimitive.Root>
        {label && (
          <LabelPrimitive.Root htmlFor={switchId} className="blob-switch__label">
            {label}
          </LabelPrimitive.Root>
        )}
      </div>
      {(error || helper) && (
        <span id={helperId} className={cn('blob-switch__helper', hasError && 'blob-switch__helper--error')}>
          {error ?? helper}
        </span>
      )}
    </div>
  )
})
Switch.displayName = 'Switch'
