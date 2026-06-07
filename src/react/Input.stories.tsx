import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './atoms/Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', size: 'md' },
}

export const WithHelper: Story = {
  args: { label: 'Username', placeholder: 'blob_user', helper: 'Only letters, numbers, and underscores.' },
}

export const WithError: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', error: 'Please enter a valid email address.' },
}

export const Disabled: Story = {
  args: { label: 'Read Only', value: 'Cannot change this', disabled: true },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
}
