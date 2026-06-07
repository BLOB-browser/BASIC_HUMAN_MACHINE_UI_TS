import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './widgets/Dropdown'
import { Button } from './atoms/Button'

const meta = {
  title: 'Widgets/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} as Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Dropdown
        trigger={<Button variant="secondary" size="sm">Options</Button>}
        items={[
          { label: 'Edit',     onClick: () => alert('Edit') },
          { label: 'Duplicate', onClick: () => alert('Duplicate') },
          { type: 'divider' },
          { label: 'Delete', variant: 'danger', onClick: () => alert('Delete') },
        ]}
      />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Dropdown
        trigger={<Button variant="secondary" size="sm">Actions</Button>}
        items={[
          {
            label: 'Copy link',
            leading: '🔗',
            onClick: () => alert('Copied'),
          },
          {
            label: 'Share',
            leading: '↗',
            onClick: () => alert('Share'),
          },
          { type: 'divider' },
          {
            label: 'Move to trash',
            leading: '🗑',
            variant: 'danger',
            onClick: () => alert('Moved to trash'),
          },
        ]}
      />
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Dropdown
        trigger={<Button variant="secondary" size="sm">More</Button>}
        items={[
          { type: 'label', label: 'View as' },
          { label: 'List' },
          { label: 'Grid' },
          { label: 'Kanban' },
          { type: 'divider' },
          { type: 'label', label: 'Sort by' },
          { label: 'Created date' },
          { label: 'Updated date' },
        ]}
      />
    </div>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Dropdown
        trigger={<Button variant="secondary" size="sm">Add tool</Button>}
        items={[
          {
            label: 'Web Builder',
            description: 'Visual website editor',
          },
          {
            label: 'Workflow Builder',
            description: 'Automate tasks with drag-and-drop',
          },
          {
            label: 'MCP Builder',
            description: 'Define tools for AI agents',
            disabled: true,
            trailing: 'Soon',
          },
        ]}
      />
    </div>
  ),
}
