import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SelectGroup {
  label?: string
  options: SelectOption[]
}

export interface SelectProps {
  options?: SelectOption[]
  groups?: SelectGroup[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  error?: string
  helper?: string
  size?: 'sm' | 'md' | 'lg'
  id?: string
  className?: string
}

export function Select({
  options,
  groups,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  disabled,
  label,
  error,
  helper,
  size = 'md',
  id,
  className,
}: SelectProps) {
  const autoId = React.useId()
  const selectId = id ?? autoId
  const helperId = `${selectId}-helper`
  const hasError = Boolean(error)

  const allGroups: SelectGroup[] = groups ?? (options ? [{ options }] : [])

  return (
    <div className={cn('blob-select-wrapper', `blob-select--${size}`, hasError && 'blob-select--error', className)}>
      {label && (
        <label htmlFor={selectId} className="blob-input-label">
          {label}
        </label>
      )}
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          id={selectId}
          className="blob-select__trigger"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError || helper ? helperId : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="blob-select__icon" asChild>
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" width="12" height="12">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="blob-select__content" position="popper" sideOffset={4}>
            <SelectPrimitive.Viewport>
              {allGroups.map((group, gi) => (
                <SelectPrimitive.Group key={gi}>
                  {group.label && (
                    <SelectPrimitive.Label className="blob-dropdown__label">{group.label}</SelectPrimitive.Label>
                  )}
                  {group.options.map((opt) => (
                    <SelectPrimitive.Item
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                      className="blob-select__item"
                    >
                      <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator className="blob-select__item-indicator">
                        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" width="12" height="12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Group>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {(error || helper) && (
        <span id={helperId} className={cn('blob-input-helper', hasError && 'blob-input-helper--error')}>
          {error ?? helper}
        </span>
      )}
    </div>
  )
}
