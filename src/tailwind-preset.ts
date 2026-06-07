/**
 * BHMUI Tailwind Preset
 *
 * Maps all semantic BHMUI CSS vars to Tailwind utilities.
 * Add to tailwind.config.ts: presets: [blobPreset]
 * Then call applyTheme() at app boot to populate the vars.
 *
 * Examples:
 *   bg-surface          → background-color: var(--color-surface)
 *   text-secondary      → color: var(--color-text-secondary)
 *   border-default      → border-color: var(--color-border)
 *   bg-warning-surface  → background-color: var(--color-warning-surface)
 *   text-user1          → color: var(--color-user1-text)
 */

import type { Config } from 'tailwindcss'

const userColors = Object.fromEntries(
  [1,2,3,4,5,6].flatMap(n => [
    [`user${n}`,         `var(--color-user${n}-accent)`],
    [`user${n}-accent`,  `var(--color-user${n}-accent)`],
    [`user${n}-surface`, `var(--color-user${n}-surface)`],
    [`user${n}-text`,    `var(--color-user${n}-text)`],
  ])
)

export const blobPreset = {
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg:                       'var(--color-bg)',
        surface:                  'var(--color-surface)',
        'surface-negative':       'var(--color-surface-negative)',
        'surface-elevated':       'var(--color-surface-elevated)',
        border:                   'var(--color-border)',
        'border-subtle':          'var(--color-border-subtle)',
        // Text
        'text-primary':                'var(--color-text-primary)',
        'text-secondary':               'var(--color-text-secondary)',
        'text-tertiary':                'var(--color-text-tertiary)',
        'text-on-accent-primary':       'var(--color-text-on-accent-primary)',
        'text-on-accent-secondary':     'var(--color-text-on-accent-secondary)',
        'text-inverted':                'var(--color-text-inverted)',
        // Brand accents
        'accent-primary':         'var(--color-accent-primary)',
        'accent-primary-subtle':  'var(--color-accent-primary-subtle)',
        'accent-primary-text':    'var(--color-accent-primary-text)',
        'accent-secondary':       'var(--color-accent-secondary)',
        'accent-secondary-subtle':'var(--color-accent-secondary-subtle)',
        'accent-secondary-text':  'var(--color-accent-secondary-text)',
        // Semantic
        'warning-text':           'var(--color-warning-text)',
        'warning-accent':         'var(--color-warning-accent)',
        'warning-surface':        'var(--color-warning-surface)',
        'success-text':           'var(--color-success-text)',
        'success-accent':         'var(--color-success-accent)',
        'success-surface':        'var(--color-success-surface)',
        'info-text':              'var(--color-info-text)',
        'info-accent':            'var(--color-info-accent)',
        'info-surface':           'var(--color-info-surface)',
        'destructive-text':       'var(--color-destructive-text)',
        'destructive-accent':     'var(--color-destructive-accent)',
        'destructive-surface':    'var(--color-destructive-surface)',
        // User colors
        ...userColors,
      },
      textColor: {
        primary:   'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary:  'var(--color-text-tertiary)',
      },
      fontFamily: {
        human:   ['var(--font-human)',   { fontFeatureSettings: '"kern"' }],
        display: ['var(--font-display)', { fontFeatureSettings: '"kern"' }],
        machine: ['var(--font-machine)'],
      },
      borderColor: {
        DEFAULT: 'var(--color-border)',
        subtle:  'var(--color-border-subtle)',
      },
      borderRadius: {
        sm:      'var(--radius-s)',
        DEFAULT: 'var(--radius-m)',
        md:      'var(--radius-m)',
        lg:      'var(--radius-l)',
        xl:      'var(--radius-xl)',
        full:    'var(--radius-full)',
      },
      boxShadow: {
        sm:      'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md:      'var(--shadow-md)',
        lg:      'var(--shadow-lg)',
        xl:      'var(--shadow-xl)',
      },
      // ── Spacing: standard keys → density-aware CSS vars ─────────────────
      // p-4 gap-2 m-3 w-8 → all scale with density mode + screen size.
      // Web Builder configures what --space-* means; AI writes normal Tailwind.
      spacing: {
        '1':  'var(--space-1)',
        '2':  'var(--space-2)',
        '3':  'var(--space-3)',
        '4':  'var(--space-4)',
        '5':  'var(--space-5)',
        '6':  'var(--space-6)',
        '8':  'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        // Icon container sizes — w-icon-sm h-icon-sm (square icon wrapper)
        'icon-xs':   'var(--icon-xs)',
        'icon-sm':   'var(--icon-sm)',
        'icon-base': 'var(--icon-base)',
        'icon-lg':   'var(--icon-lg)',
        'icon-xl':   'var(--icon-xl)',
      },
      // ── Font size: standard names → density-aware CSS vars ───────────────
      // text-sm text-base text-lg → all scale with density mode + screen size.
      fontSize: {
        'xs':   ['var(--text-ui-xs)',   { lineHeight: 'var(--leading-ui-normal)' }],
        'sm':   ['var(--text-ui-sm)',   { lineHeight: 'var(--leading-ui-normal)' }],
        'base': ['var(--text-ui-base)', { lineHeight: 'var(--leading-ui-normal)' }],
        'lg':   ['var(--text-ui-lg)',   { lineHeight: 'var(--leading-ui-tight)'  }],
        'xl':   ['var(--text-ui-xl)',   { lineHeight: 'var(--leading-ui-tight)'  }],
        '2xl':  ['var(--text-ui-2xl)',  { lineHeight: 'var(--leading-ui-tight)'  }],
      },
    },
  },
} satisfies Partial<Config>

