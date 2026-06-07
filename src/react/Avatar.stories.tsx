import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'radio',  options: ['circle', 'square'] },
    status: {
      control: 'select',
      options: [undefined, 'online', 'away', 'busy', 'offline'],
    },
  },
} as Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=3',
    alt: 'Jane Doe',
    size: 'md',
  },
}

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    size: 'md',
  },
}

export const WithStatus: Story = {
  args: {
    initials: 'MR',
    size: 'md',
    status: 'online',
  },
}

export const Square: Story = {
  args: {
    initials: 'BL',
    size: 'md',
    shape: 'square',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Avatar initials="ON" size="md" status="online" />
      <Avatar initials="AW" size="md" status="away" />
      <Avatar initials="BU" size="md" status="busy" />
      <Avatar initials="OF" size="md" status="offline" />
    </div>
  ),
}
