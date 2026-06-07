import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from './atoms/Button'
import { Badge } from './Badge'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'ghost'],
    },
  },
} as Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cardTitle: 'Project Overview',
    subtitle: 'Last updated 2 hours ago',
    children: 'This card shows a project summary with title, subtitle, and body content.',
    variant: 'default',
  },
}

export const Elevated: Story = {
  args: {
    cardTitle: 'Elevated Card',
    children: 'Cards with elevation use a stronger shadow to convey depth.',
    variant: 'elevated',
  },
}

export const Outlined: Story = {
  args: {
    cardTitle: 'Outlined Card',
    children: 'Cards with an explicit border for lower-emphasis contexts.',
    variant: 'outlined',
  },
}

export const WithActions: Story = {
  args: {
    cardTitle: 'Delete project?',
    children: 'This action cannot be undone. All data will be permanently removed.',
    actions: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Delete</Button>
      </div>
    ),
  },
}

export const WithTrailing: Story = {
  args: {
    cardTitle: 'BLOB Backend',
    subtitle: 'api.blob-browser.net',
    trailing: <Badge variant="success">Online</Badge>,
    children: 'FastAPI backend, port 8000. Health checks passing.',
  },
}

export const Clickable: Story = {
  args: {
    cardTitle: 'Clickable Card',
    subtitle: 'Click anywhere on this card',
    href: '#',
    variant: 'outlined',
  },
}
