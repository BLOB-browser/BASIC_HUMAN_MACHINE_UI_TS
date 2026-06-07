import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Modal } from './widgets/Modal'
import { Button } from './atoms/Button'

const meta = {
  title: 'Widgets/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    closeOnOverlayClick: { control: 'boolean' },
  },
} as Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

function ModalDemo(args: React.ComponentProps<typeof Modal>) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Confirm action',
    description: 'Are you sure you want to continue? This cannot be undone.',
    size: 'md',
    children: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '16px' }}>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    ),
  },
}

export const SmallSize: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: { ...Default.args, title: 'Quick confirmation', size: 'sm' },
}

export const LargeSize: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: { ...Default.args, title: 'Edit details', size: 'lg' },
}
