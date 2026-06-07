import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../utils/cn'

export interface DropdownItem {
  type?: 'item' | 'divider' | 'label'
  label?: React.ReactNode
  description?: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
  variant?: 'default' | 'danger'
  disabled?: boolean
  onClick?: () => void
  /** Sub-items — renders a submenu */
  items?: DropdownItem[]
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  /** bottom-start (default), bottom-end, top-start, top-end */
  side?: 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function Dropdown({ trigger, items, side = 'bottom', align = 'start', className }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn('blob-dropdown__menu', className)}
          side={side}
          align={align}
          sideOffset={4}
        >
          {items.map((item, i) => {
            if (item.type === 'divider') {
              return <DropdownMenu.Separator key={i} className="blob-dropdown__divider" />
            }
            if (item.type === 'label') {
              return <DropdownMenu.Label key={i} className="blob-dropdown__label">{item.label}</DropdownMenu.Label>
            }
            if (item.items?.length) {
              return (
                <DropdownMenu.Sub key={i}>
                  <DropdownMenu.SubTrigger className={cn('blob-dropdown__item', item.variant === 'danger' && 'blob-dropdown__item--danger')}>
                    {item.leading && <span className="blob-dropdown__item-leading" aria-hidden="true">{item.leading}</span>}
                    <span className="blob-dropdown__item-label">{item.label}</span>
                    <span className="blob-dropdown__item-arrow" aria-hidden="true">›</span>
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent className="blob-dropdown__menu" sideOffset={2}>
                      {item.items.map((sub, j) => (
                        <DropdownItem key={j} item={sub} />
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
              )
            }
            return <DropdownItem key={i} item={item} />
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function DropdownItem({ item }: { item: DropdownItem }) {
  return (
    <DropdownMenu.Item
      className={cn('blob-dropdown__item', item.variant === 'danger' && 'blob-dropdown__item--danger')}
      disabled={item.disabled}
      onSelect={item.onClick}
    >
      {item.leading && <span className="blob-dropdown__item-leading" aria-hidden="true">{item.leading}</span>}
      <span className="blob-dropdown__item-content">
        <span className="blob-dropdown__item-label">{item.label}</span>
        {item.description && <span className="blob-dropdown__item-description">{item.description}</span>}
      </span>
      {item.trailing && <span className="blob-dropdown__item-trailing" aria-hidden="true">{item.trailing}</span>}
    </DropdownMenu.Item>
  )
}
