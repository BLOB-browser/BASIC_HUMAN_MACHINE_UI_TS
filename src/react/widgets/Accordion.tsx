import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '../../utils/cn'

export interface AccordionItem {
  id: string
  trigger: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  className?: string
}

export function Accordion({ items, type = 'single', defaultValue, className }: AccordionProps) {
  // Radix Accordion has separate types for single/multiple — cast accordingly
  const sharedProps = {
    className: cn('blob-accordion', className),
    defaultValue: defaultValue as string & string[],
  }

  return (
    <AccordionPrimitive.Root type={type as 'single'} {...sharedProps} collapsible>
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          disabled={item.disabled}
          className="blob-accordion__item"
        >
          <AccordionPrimitive.Header className="blob-accordion__header">
            <AccordionPrimitive.Trigger className="blob-accordion__trigger">
              {item.trigger}
              <span className="blob-accordion__chevron" aria-hidden="true">
                <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="blob-accordion__content">
            <div className="blob-accordion__content-inner">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
