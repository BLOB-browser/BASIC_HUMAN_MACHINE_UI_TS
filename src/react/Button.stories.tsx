import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './atoms/Button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
} as Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Get Started', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { children: 'Learn More', variant: 'secondary', size: 'md' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost', size: 'md' },
}

export const Danger: Story = {
  args: { children: 'Delete', variant: 'danger', size: 'md' },
}

export const Loading: Story = {
  args: { children: 'Saving…', variant: 'primary', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', variant: 'primary', disabled: true },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}
