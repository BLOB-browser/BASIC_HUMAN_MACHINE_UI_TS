import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    mode: {
      control: 'radio',
      options: ['label', 'dot', 'count'],
    },
  },
} as Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'New', variant: 'default' },
}

export const Primary: Story = {
  args: { children: 'Primary', variant: 'primary' },
}

export const Success: Story = {
  args: { children: 'Active', variant: 'success' },
}

export const Warning: Story = {
  args: { children: 'Pending', variant: 'warning' },
}

export const Danger: Story = {
  args: { children: 'Error', variant: 'danger' },
}

export const DotMode: Story = {
  args: { dot: true, variant: 'success' },
}

export const CountMode: Story = {
  args: { count: 42, variant: 'danger' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge dot variant="success" />
      <Badge count={7} variant="danger" />
    </div>
  ),
}
