import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { themes } from '../themes'
import type { ThemeName } from '../themes/types'

// ---------------------------------------------------------------------------
// Typography story — shows all three font roles across all 6 themes
// ---------------------------------------------------------------------------

const LOREM = 'The quick brown fox jumps over the lazy dog'
const LOREM_LONG = 'Designing for humans means every interaction should feel natural, clear, and intentional. Typography sets the tone before a single word is read.'

function FontCard({ role, cssVar, label, stack, sample }: {
  role: string
  cssVar: string
  label: string
  stack: string
  sample: string
}) {
  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 16,
    }}>
      <div style={{
        padding: '10px 16px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        gap: 12,
        alignItems: 'baseline',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--color-text-primary)' }}>
          {label}
        </span>
        <code style={{ fontFamily: 'var(--font-machine)', fontSize: 11, color: 'var(--color-text-subtle)' }}>
          {cssVar}
        </code>
        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 11, color: 'var(--color-text-subtle)', marginLeft: 'auto' }}>
          {stack}
        </span>
      </div>
      <div style={{ padding: 20, background: 'var(--color-background)' }}>
        <div style={{ fontFamily: `var(${cssVar})`, fontSize: 32, lineHeight: 1.2, color: 'var(--color-text-primary)', marginBottom: 8 }}>
          {LOREM}
        </div>
        <div style={{ fontFamily: `var(${cssVar})`, fontSize: 16, lineHeight: 1.6, color: 'var(--color-text-default)', marginBottom: 12 }}>
          {LOREM_LONG}
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[10, 12, 14, 16, 20, 24, 32].map(size => (
            <span key={size} style={{ fontFamily: `var(${cssVar})`, fontSize: size, color: 'var(--color-text-primary)', lineHeight: 1 }}>
              {size}px
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: '8px 16px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {([400, 500, 700] as const).map(w => (
            <span key={w} style={{ fontFamily: `var(${cssVar})`, fontWeight: w, fontSize: 14, color: 'var(--color-text-primary)' }}>
              {w} — {sample}
            </span>
          ))}
          <span style={{ fontFamily: `var(${cssVar})`, fontStyle: 'italic', fontSize: 14, color: 'var(--color-text-primary)' }}>
            Italic — {sample}
          </span>
        </div>
      </div>
    </div>
  )
}

function TypographySection({ themeName }: { themeName: ThemeName }) {
  const theme = themes[themeName]
  return (
    <div style={{ padding: 24, maxWidth: 760, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4, color: 'var(--color-text-primary)' }}>
        Typography
      </h2>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--color-text-subtle)', marginBottom: 24 }}>
        Theme: <strong>{themeName}</strong>
      </p>

      <FontCard
        role="display"
        cssVar="--font-display"
        label="Display"
        stack={theme.fonts.display}
        sample="BLOB"
      />
      <FontCard
        role="human"
        cssVar="--font-human"
        label="Human"
        stack={theme.fonts.human}
        sample="BLOB"
      />
      <FontCard
        role="machine"
        cssVar="--font-machine"
        label="Machine"
        stack={theme.fonts.machine}
        sample="BLOB"
      />

      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-primary)' }}>
          Type Scale
        </h3>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--color-text-subtle)', marginBottom: 16 }}>
          BHMUI provides font-role CSS vars only (<code style={{ fontFamily: 'var(--font-machine)' }}>--font-display</code>, <code style={{ fontFamily: 'var(--font-machine)' }}>--font-human</code>, <code style={{ fontFamily: 'var(--font-machine)' }}>--font-machine</code>). Font sizes and weights are the consuming app's responsibility — set via Tailwind utilities or your own CSS.
        </p>
        {([
          ['h1–h5',    'display', 'Headings use --font-display'],
          ['body',     'human',   'Body prose uses --font-human'],
          ['body-sm',  'human',   'Small body uses --font-human'],
          ['caption',  'human',   'Captions use --font-human'],
          ['overline', 'human',   'Overline uses --font-human (uppercase)'],
          ['code',     'machine', 'Code uses --font-machine'],
        ] as [string, 'display' | 'human' | 'machine', string][]).map(([name, role, note]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10, borderBottom: '1px solid var(--color-border)', paddingBottom: 10 }}>
            <code style={{ fontFamily: 'var(--font-machine)', fontSize: 11, color: 'var(--color-text-subtle)', width: 80, flexShrink: 0 }}>
              .{name}
            </code>
            <span style={{ fontFamily: `var(--font-${role})`, fontSize: 20, color: 'var(--color-text-primary)', flex: 1, lineHeight: 1.3 }}>
              {LOREM.slice(0, 30)}
            </span>
            <span style={{ fontFamily: 'var(--font-machine)', fontSize: 10, color: 'var(--color-text-subtle)', flexShrink: 0, maxWidth: 180, textAlign: 'right' }}>
              {note}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TypographyDoc(_props: { theme?: string }) { return null }

const meta: Meta<typeof TypographyDoc> = {
  title: 'Design Tokens/Typography',
  component: TypographyDoc,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const AllFonts: Story = {
  render: (_args, context) => {
    const themeName = (context.globals?.theme ?? 'classic') as ThemeName
    return <TypographySection themeName={themeName} />
  },
  name: 'All Font Roles',
}

export const AllThemesComparison: Story = {
  render: (_args, context) => {
    const themeNames: ThemeName[] = ['classic', 'international', 'cofe', 'funky', 'tech', 'edgy']
    return (
      <div style={{ padding: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 24, color: 'var(--color-text-primary)' }}>
          All Themes — Font Comparison
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {themeNames.map(name => {
            const theme = themes[name]
            return (
              <div key={name} style={{ border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '8px 14px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--color-text-primary)' }}>{name}</span>
                </div>
                <div style={{ padding: 16, background: 'var(--color-background)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {([
                    ['Display', theme.fonts.display, theme.fonts.display],
                    ['Human',   theme.fonts.human,   theme.fonts.display],
                    ['Machine', theme.fonts.machine,  theme.fonts.display],
                  ] as [string, string, string][]).map(([role, stack]) => (
                    <div key={role}>
                      <div style={{ fontFamily: 'var(--font-machine)', fontSize: 10, color: 'var(--color-text-subtle)', marginBottom: 2 }}>
                        {role} — {stack}
                      </div>
                      <div style={{ fontFamily: stack, fontSize: 20, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                        {LOREM.slice(0, 24)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
  name: 'All Themes Comparison',
  parameters: { layout: 'fullscreen' },
}
