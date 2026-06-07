import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './widgets/Tabs'

const meta = {
  title: 'Widgets/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['line', 'pill', 'boxed'] },
  },
} as Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  { id: 'overview',  label: 'Overview',  panel: <p style={{ padding: '16px' }}>Overview content</p> },
  { id: 'settings',  label: 'Settings',  panel: <p style={{ padding: '16px' }}>Settings content</p> },
  { id: 'members',   label: 'Members',   panel: <p style={{ padding: '16px' }}>Members content</p> },
  { id: 'disabled',  label: 'Disabled',  panel: null, disabled: true },
]

export const Line: Story = {
  args: { items: ITEMS, variant: 'line' },
}

export const Pill: Story = {
  args: { items: ITEMS, variant: 'pill' },
}

export const Boxed: Story = {
  args: { items: ITEMS, variant: 'boxed' },
}
