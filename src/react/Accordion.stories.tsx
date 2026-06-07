import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './widgets/Accordion'

const meta = {
  title: 'Widgets/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
  },
} as Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  {
    id: 'what',
    trigger: 'What is BLOB?',
    content: 'BLOB (Building Local Open Bots) is a local-first AI workspace that runs on your machine. It connects your tools, files, and AI models without sending data to the cloud.',
  },
  {
    id: 'how',
    trigger: 'How does OATFLAKE work?',
    content: 'OATFLAKE is the local FastAPI backend that orchestrates all BLOB tools. It manages plugins, routes requests, and stores data in your ~/.blob/ directory.',
  },
  {
    id: 'auth',
    trigger: 'Do I need an account?',
    content: 'No. BLOB works fully offline without an account. An account is only required for sharing projects publicly, syncing to GitHub, or using the BLOB compute network.',
  },
]

export const Default: Story = {
  args: {
    items: ITEMS,
    type: 'single',
  },
}

export const DefaultOpen: Story = {
  args: {
    items: ITEMS,
    type: 'single',
    defaultValue: 'what',
  },
}

export const Multiple: Story = {
  args: {
    items: ITEMS,
    type: 'multiple',
  },
}

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...ITEMS,
      { id: 'disabled', trigger: 'Coming soon', content: 'Not available yet.', disabled: true },
    ],
    type: 'single',
  },
}
