/**
 * Tailwind color palette — typed convenience re-export.
 *
 * Themes import this to reference Tailwind values by name rather than
 * hardcoding hex strings. Overriding a shade in tailwind.config.ts
 * automatically propagates to every theme that references it here.
 *
 * Usage in a theme file:
 *   import { tw } from './tw'
 *   accentPrimary: tw.blue[600]
 */

// @ts-ignore — tailwindcss/colors has no bundled .d.ts in some setups
import twColors from 'tailwindcss/colors'

type Palette = Record<string, string | Record<string, string>>

const c = twColors as unknown as Palette

function scale(name: string): Record<string, string> {
  return c[name] as Record<string, string>
}

export const tw = {
  // Neutrals
  black:   c['black']   as string,
  white:   c['white']   as string,
  slate:   scale('slate'),
  gray:    scale('gray'),
  zinc:    scale('zinc'),
  neutral: scale('neutral'),
  stone:   scale('stone'),
  // Colors
  red:     scale('red'),
  orange:  scale('orange'),
  amber:   scale('amber'),
  yellow:  scale('yellow'),
  lime:    scale('lime'),
  green:   scale('green'),
  emerald: scale('emerald'),
  teal:    scale('teal'),
  cyan:    scale('cyan'),
  sky:     scale('sky'),
  blue:    scale('blue'),
  indigo:  scale('indigo'),
  violet:  scale('violet'),
  purple:  scale('purple'),
  fuchsia: scale('fuchsia'),
  pink:    scale('pink'),
  rose:    scale('rose'),
}
