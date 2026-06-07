import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const tabsVariants = cva(
  'blob-tabs',
  {
    variants: {
      variant: {
        line:  'blob-tabs--line',
        pill:  'blob-tabs--pill',
        boxed: 'blob-tabs--boxed',
      },
    },
    defaultVariants: { variant: 'line' },
  }
);

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  panel?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[];
  active?: string;
  onChange?: (id: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant, items, active, onChange, ...props }, ref) => {
    const [internal, setInternal] = React.useState(active ?? items[0]?.id);
    const activeId = active !== undefined ? active : internal;

    const handleClick = (id: string) => {
      setInternal(id);
      onChange?.(id);
    };

    return (
      <div ref={ref} className={cn(tabsVariants({ variant }), className)} {...props}>
        <div className="blob-tabs__list" role="tablist">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeId === item.id}
              aria-controls={`blob-panel-${item.id}`}
              id={`blob-tab-${item.id}`}
              disabled={item.disabled}
              className={cn(
                'blob-tabs__tab',
                activeId === item.id && 'blob-tabs__tab--active',
                item.disabled        && 'blob-tabs__tab--disabled'
              )}
              onClick={() => !item.disabled && handleClick(item.id)}
            >
              {item.icon && <span className="blob-tabs__tab-icon">{item.icon}</span>}
              {item.label}
              {item.badge !== undefined && (
                <span className="blob-tabs__tab-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            id={`blob-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`blob-tab-${item.id}`}
            className={cn(
              'blob-tabs__panel',
              activeId === item.id && 'blob-tabs__panel--active'
            )}
            hidden={activeId !== item.id}
          >
            {item.panel}
          </div>
        ))}
      </div>
    );
  }
);
Tabs.displayName = 'Tabs';
