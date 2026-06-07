import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './widgets/Select'

const meta = {
  title: 'Widgets/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const TOOLS = [
  { value: 'web-builder',      label: 'Web Builder' },
  { value: 'workflow-builder', label: 'Workflow Builder' },
  { value: 'mcp-builder',      label: 'MCP Builder' },
  { value: 'database-builder', label: 'Database Builder' },
  { value: 'calendar',         label: 'Calendar' },
]

export const Default: Story = {
  args: { label: 'Tool', options: TOOLS, placeholder: 'Select a tool…', size: 'md' },
}

export const WithError: Story = {
  args: { label: 'Tool', options: TOOLS, error: 'Please select a tool to continue.' },
}

export const Grouped: Story = {
  args: {
    label: 'Permission',
    groups: [
      { label: 'View', options: [{ value: 'viewer', label: 'Viewer' }] },
      { label: 'Edit', options: [{ value: 'editor', label: 'Editor' }, { value: 'admin', label: 'Admin' }] },
      { label: 'Manage', options: [{ value: 'owner', label: 'Owner' }] },
    ],
  },
}

export const Disabled: Story = {
  args: { label: 'Locked', options: TOOLS, disabled: true, placeholder: 'Not available' },
}
