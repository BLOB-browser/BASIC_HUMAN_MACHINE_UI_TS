import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'ghost'],
    },
    size:        { control: 'radio', options: ['sm', 'md'] },
    removable:   { control: 'boolean' },
    interactive: { control: 'boolean' },
    active:      { control: 'boolean' },
  },
} as Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Design', variant: 'default' },
}

export const Primary: Story = {
  args: { children: 'TypeScript', variant: 'primary' },
}

export const Removable: Story = {
  args: {
    children: 'React',
    variant: 'default',
    removable: true,
    onRemove: () => alert('Removed!'),
  },
}

export const Interactive: Story = {
  args: {
    children: 'Clickable',
    variant: 'primary',
    interactive: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="ghost">Ghost</Chip>
    </div>
  ),
}
