import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const tabsVariants = cva('blob-tabs', {
  variants: {
    variant: {
      line:  'blob-tabs--line',
      pill:  'blob-tabs--pill',
      boxed: 'blob-tabs--boxed',
    },
  },
  defaultVariants: { variant: 'line' },
})

export interface TabItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  panel?: React.ReactNode
  disabled?: boolean
}

export interface TabsProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'onChange'>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[]
  className?: string
}

export function Tabs({ items, variant, className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={items[0]?.id}
      className={cn(tabsVariants({ variant }), className)}
      {...props}
    >
      <TabsPrimitive.List className="blob-tabs__list">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className={cn('blob-tabs__tab', item.disabled && 'blob-tabs__tab--disabled')}
          >
            {item.icon && <span className="blob-tabs__tab-icon" aria-hidden="true">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && <span className="blob-tabs__tab-badge">{item.badge}</span>}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.id}
          value={item.id}
          className="blob-tabs__panel"
        >
          {item.panel}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
