import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { themes } from '../themes'
import type { ThemeName, ThemeColorSet } from '../themes/types'

// ── Token catalogue ────────────────────────────────────────────────────────

type TokenGroup = { group: string; tokens: { key: keyof ThemeColorSet; cssVar: string; label: string; desc: string }[] }

const TOKEN_GROUPS: TokenGroup[] = [
  {
    group: 'Surfaces',
    tokens: [
      { key: 'bg',               cssVar: '--color-bg',               label: 'Background',        desc: 'Page / canvas background' },
      { key: 'surface',          cssVar: '--color-surface',           label: 'Surface',           desc: 'Cards, sidebars, interactive panels' },
      { key: 'surfaceNegative',  cssVar: '--color-surface-negative',  label: 'Surface Negative',  desc: 'Code blocks, info panels, sunken areas' },
      { key: 'surfaceElevated',  cssVar: '--color-surface-elevated',  label: 'Surface Elevated',  desc: 'Dropdowns, modals — floats above surface' },
      { key: 'border',           cssVar: '--color-border',            label: 'Border',            desc: 'Default border / divider' },
      { key: 'borderSubtle',     cssVar: '--color-border-subtle',     label: 'Border Subtle',     desc: 'Inner dividers, inset separators' },
    ],
  },
  {
    group: 'Text',
    tokens: [
      { key: 'textPrimary',            cssVar: '--color-text-primary',              label: 'Text Primary',              desc: 'Headings, high-emphasis labels' },
      { key: 'textSecondary',          cssVar: '--color-text-secondary',            label: 'Text Secondary',            desc: 'Body copy' },
      { key: 'textTertiary',           cssVar: '--color-text-tertiary',             label: 'Text Tertiary',             desc: 'Captions, hints, disabled' },
      { key: 'textOnAccentPrimary',    cssVar: '--color-text-on-accent-primary',    label: 'Text On Accent Primary',    desc: 'Contrast-safe text on a filled primary-accent background' },
      { key: 'textOnAccentSecondary',  cssVar: '--color-text-on-accent-secondary',  label: 'Text On Accent Secondary',  desc: 'Contrast-safe text on a filled secondary-accent background' },
      { key: 'textInverted',           cssVar: '--color-text-inverted',             label: 'Text Inverted',             desc: 'Inverted text — dark text in dark mode, light text in light mode' },
    ],
  },
  {
    group: 'Brand Accents',
    tokens: [
      { key: 'accentPrimary',         cssVar: '--color-accent-primary',          label: 'Accent Primary',          desc: 'CTA fill — buttons, focus ring' },
      { key: 'accentPrimarySubtle',   cssVar: '--color-accent-primary-subtle',   label: 'Accent Primary Subtle',   desc: 'Badge bg, highlight row' },
      { key: 'accentPrimaryText',     cssVar: '--color-accent-primary-text',     label: 'Accent Primary Text',     desc: 'Text in primary accent context' },
      { key: 'accentSecondary',       cssVar: '--color-accent-secondary',        label: 'Accent Secondary',        desc: 'Secondary brand fill' },
      { key: 'accentSecondarySubtle', cssVar: '--color-accent-secondary-subtle', label: 'Accent Secondary Subtle', desc: 'Secondary tinted background' },
      { key: 'accentSecondaryText',   cssVar: '--color-accent-secondary-text',   label: 'Accent Secondary Text',   desc: 'Text in secondary accent context' },
    ],
  },
  {
    group: 'Warning',
    tokens: [
      { key: 'warningText',    cssVar: '--color-warning-text',    label: 'Warning Text',    desc: 'Warning text on any background' },
      { key: 'warningAccent',  cssVar: '--color-warning-accent',  label: 'Warning Accent',  desc: 'Warning badge fill, icon' },
      { key: 'warningSurface', cssVar: '--color-warning-surface', label: 'Warning Surface', desc: 'Warning alert background' },
    ],
  },
  {
    group: 'Success',
    tokens: [
      { key: 'successText',    cssVar: '--color-success-text',    label: 'Success Text',    desc: '' },
      { key: 'successAccent',  cssVar: '--color-success-accent',  label: 'Success Accent',  desc: '' },
      { key: 'successSurface', cssVar: '--color-success-surface', label: 'Success Surface', desc: '' },
    ],
  },
  {
    group: 'Info',
    tokens: [
      { key: 'infoText',    cssVar: '--color-info-text',    label: 'Info Text',    desc: '' },
      { key: 'infoAccent',  cssVar: '--color-info-accent',  label: 'Info Accent',  desc: '' },
      { key: 'infoSurface', cssVar: '--color-info-surface', label: 'Info Surface', desc: '' },
    ],
  },
  {
    group: 'Destructive',
    tokens: [
      { key: 'destructiveText',    cssVar: '--color-destructive-text',    label: 'Destructive Text',    desc: '' },
      { key: 'destructiveAccent',  cssVar: '--color-destructive-accent',  label: 'Destructive Accent',  desc: '' },
      { key: 'destructiveSurface', cssVar: '--color-destructive-surface', label: 'Destructive Surface', desc: '' },
    ],
  },
  {
    group: 'User Colors',
    tokens: ([1,2,3,4,5,6] as const).flatMap(n => [
      { key: `user${n}Text`    as keyof ThemeColorSet, cssVar: `--color-user${n}-text`,    label: `User ${n} Text`,    desc: '' },
      { key: `user${n}Accent`  as keyof ThemeColorSet, cssVar: `--color-user${n}-accent`,  label: `User ${n} Accent`,  desc: '' },
      { key: `user${n}Surface` as keyof ThemeColorSet, cssVar: `--color-user${n}-surface`, label: `User ${n} Surface`, desc: '' },
    ]),
  },
]

// ── Swatch component ───────────────────────────────────────────────────────

function isLightColor(val: string): boolean {
  const m = val.match(/\d+/g)
  if (!m || m.length < 3) return true
  const [r, g, b] = m.map(Number)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

function Swatch({ cssVar, label, desc }: { cssVar: string; label: string; desc: string }) {
  const [value, setValue] = React.useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
  )
  React.useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim())
  })
  const onSwatch = isLightColor(value) ? '#000' : '#fff'
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: 6 }}>
      <div style={{ width: 72, minHeight: 56, background: `var(${cssVar})`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: onSwatch, opacity: 0.75, padding: '1px 4px', background: 'rgba(128,128,128,0.15)', borderRadius: 2 }}>
          {value || '—'}
        </span>
      </div>
      <div style={{ padding: '8px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</span>
        <code style={{ fontFamily: 'var(--font-machine)', fontSize: 10, color: 'var(--color-text-tertiary)' }}>{cssVar}</code>
        {desc && <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--color-text-tertiary)' }}>{desc}</span>}
      </div>
    </div>
  )
}

function ColorSection({ themeName, mode }: { themeName: ThemeName; mode: 'light' | 'dark' }) {
  return (
    <div style={{ padding: 24, maxWidth: 740, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4, color: 'var(--color-text-primary)' }}>Color Tokens</h2>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 28 }}>
        Theme: <strong style={{ color: 'var(--color-text-primary)' }}>{themeName}</strong> · Mode: <strong style={{ color: 'var(--color-text-primary)' }}>{mode}</strong>
      </p>
      {TOKEN_GROUPS.map(({ group, tokens }) => (
        <div key={group} style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 10 }}>
            {group}
          </h3>
          {tokens.map(t => <Swatch key={t.cssVar} cssVar={t.cssVar} label={t.label} desc={t.desc} />)}
        </div>
      ))}
    </div>
  )
}

// ── Story ──────────────────────────────────────────────────────────────────

function ColorsDoc(_props: { theme?: string; colorMode?: string }) { return null }

const meta: Meta<typeof ColorsDoc> = {
  title: 'Design Tokens/Colors',
  component: ColorsDoc,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const AllColors: Story = {
  render: (_args, context) => (
    <ColorSection
      themeName={(context.globals?.theme ?? 'classic') as ThemeName}
      mode={(context.globals?.colorMode ?? 'light') as 'light' | 'dark'}
    />
  ),
  name: 'All Color Tokens',
}

export const AllThemes: Story = {
  render: (_args, context) => {
    const mode = (context.globals?.colorMode ?? 'light') as 'light' | 'dark'
    const themeNames: ThemeName[] = ['classic', 'international', 'cofe', 'funky', 'tech', 'edgy']
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, padding: 32 }}>
        {themeNames.map(name => {
          const c = themes[name].colors[mode]
          const swatches = [c.accentPrimary, c.surface, c.bg, c.warningSurface, c.successSurface, c.destructiveSurface]
          return (
            <div key={name} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <div style={{ padding: '10px 14px', background: c.surface, borderBottom: `1px solid ${c.border}` }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: c.textPrimary }}>{name}</span>
              </div>
              <div style={{ display: 'flex', height: 40 }}>
                {swatches.map((col, i) => <div key={i} style={{ flex: 1, background: col }} title={col} />)}
              </div>
              <div style={{ padding: '10px 14px', background: c.bg, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                {(['accentPrimary','bg','surface','textPrimary','warningAccent','destructiveAccent'] as const).map(k => (
                  <div key={k} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: c[k], border: `1px solid ${c.border}`, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: c.textTertiary }}>{k}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
  name: 'All Themes Comparison',
  parameters: { layout: 'fullscreen' },
}

