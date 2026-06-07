import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './atoms/Switch'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Enable notifications' },
}

export const Checked: Story = {
  args: { label: 'Dark mode', defaultChecked: true },
}

export const WithHelper: Story = {
  args: { label: 'Auto-save', helper: "Saves your work every 30 seconds." },
}

export const Disabled: Story = {
  args: { label: 'Feature locked', disabled: true },
}
