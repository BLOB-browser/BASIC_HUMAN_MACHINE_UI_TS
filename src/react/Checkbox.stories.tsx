import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './atoms/Checkbox'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'I agree to the terms and conditions' },
}

export const Checked: Story = {
  args: { label: 'Remember me', defaultChecked: true },
}

export const WithHelper: Story = {
  args: { label: 'Subscribe to updates', helper: "We'll only send important updates." },
}

export const WithError: Story = {
  args: { label: 'Required field', error: 'You must accept before continuing.' },
}

export const Disabled: Story = {
  args: { label: 'Unavailable option', disabled: true },
}

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Option A" defaultChecked />
      <Checkbox label="Option B" />
      <Checkbox label="Option C (disabled)" disabled />
    </div>
  ),
}
