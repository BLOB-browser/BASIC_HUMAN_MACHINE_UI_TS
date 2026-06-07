import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipProvider } from './widgets/Tooltip'
import { Button } from './atoms/Button'

const meta = {
  title: 'Widgets/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    side:  { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
  },
} as Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    side: 'top',
    children: <Button variant="ghost">Hover me</Button>,
  },
}

export const AllSides: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ display: 'flex', gap: '16px', padding: '40px' }}>
        <Tooltip content="Top tooltip" side="top"><Button variant="ghost">Top</Button></Tooltip>
        <Tooltip content="Right tooltip" side="right"><Button variant="ghost">Right</Button></Tooltip>
        <Tooltip content="Bottom tooltip" side="bottom"><Button variant="ghost">Bottom</Button></Tooltip>
        <Tooltip content="Left tooltip" side="left"><Button variant="ghost">Left</Button></Tooltip>
      </div>
    </TooltipProvider>
  ),
}
