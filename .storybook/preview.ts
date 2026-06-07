import type { Preview } from '@storybook/react'
import { applyTheme, detectMode } from '../src/tokens/apply-theme'
import { applyDensity } from '../src/tokens/apply-density'
import type { DensityMode } from '../src/tokens/apply-density'
import '../src/styles/fonts.css'
import '../src/styles/index.css'
import '../src/styles/base.css'

// Apply BHMUI classic theme before any story renders
applyTheme('classic', detectMode())

const preview: Preview = {
  parameters: {
    // We drive the canvas background ourselves via applyTheme → CSS vars on body
    backgrounds: { disable: true },
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'BHMUI theme',
      defaultValue: 'classic',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['classic', 'international', 'cofe', 'funky', 'tech', 'edgy'],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Light / Dark',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: '☀️ Light' },
          { value: 'dark',  title: '🌙 Dark'  },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'UI density',
      defaultValue: 'default',
      toolbar: {
        title: 'Density',
        icon: 'expandalt',
        items: [
          { value: 'compact',     title: '▪ Compact'     },
          { value: 'default',     title: '▫ Default'     },
          { value: 'comfortable', title: '□ Comfortable' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme = 'classic', colorMode = 'light', density = 'default' } = context.globals as {
        theme: string
        colorMode: 'light' | 'dark'
        density: DensityMode
      }

      // 1. Write CSS vars onto <html>
      applyTheme(theme as Parameters<typeof applyTheme>[0], colorMode)
      applyDensity(density)

      // 2. Drive the entire canvas background from the active theme token
      document.body.style.backgroundColor = 'var(--color-bg)'
      document.body.style.color           = 'var(--color-text-primary)'

      // 3. Tell the browser which scheme we're in so native elements
      //    (scrollbars, inputs, date-pickers) also adapt
      document.documentElement.style.colorScheme = colorMode

      return Story()
    },
  ],
}

export default preview
