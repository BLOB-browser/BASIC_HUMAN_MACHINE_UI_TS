import type { Theme } from './types';
import { tw } from './tw';

/**
 * Classic — BLOB house style.
 * Neutral black/white palette, Roboto family, soft rounded corners.
 * All color values sourced from Tailwind's palette via tw.ts.
 */
export const classic: Theme = {
  fonts: {
    human:   '"Roboto Serif Variable", serif',
    display: '"Roboto Variable", sans-serif',
    machine: '"Roboto Mono", monospace',
  },
  colors: {
    light: {
      // Surfaces
      bg:               tw.stone[50],
      surface:          tw.white,
      surfaceNegative:  tw.stone[100],
      surfaceElevated:  tw.white,
      border:           tw.stone[200],
      borderSubtle:     tw.stone[100],
      overlay:          'rgba(0, 0, 0, 0.45)',
      // Text
      textPrimary:      tw.stone[950],
      textSecondary:    tw.stone[600],
      textTertiary:     tw.stone[400],
      textOnAccentPrimary:   tw.white,
      textOnAccentSecondary: tw.stone[900],
      textInverted:     tw.white,
      // Brand accents — classic uses neutral black
      accentPrimary:        tw.stone[900],
      accentPrimarySubtle:  tw.stone[100],
      accentPrimaryText:    tw.stone[900],
      accentSecondary:      tw.stone[200],
      accentSecondarySubtle: tw.stone[50],
      accentSecondaryText:  tw.stone[700],
      // Warning
      warningText:      tw.amber[700],
      warningAccent:    tw.amber[400],
      warningSurface:   tw.amber[50],
      // Success
      successText:      tw.green[700],
      successAccent:    tw.green[500],
      successSurface:   tw.green[50],
      // Info
      infoText:         tw.yellow[700],
      infoAccent:       tw.yellow[500],
      infoSurface:      tw.yellow[50],
      // Destructive
      destructiveText:    tw.pink[700],
      destructiveAccent:  tw.pink[500],
      destructiveSurface: tw.pink[50],
      // User colors (classic: saturated Tailwind 500s)
      user1Text: tw.blue[700],   user1Accent: tw.blue[500],   user1Surface: tw.blue[50],
      user2Text: tw.violet[700], user2Accent: tw.violet[500], user2Surface: tw.violet[50],
      user3Text: tw.rose[700],   user3Accent: tw.rose[500],   user3Surface: tw.rose[50],
      user4Text: tw.amber[700],  user4Accent: tw.amber[500],  user4Surface: tw.amber[50],
      user5Text: tw.green[700],  user5Accent: tw.green[500],  user5Surface: tw.green[50],
      user6Text: tw.cyan[700],   user6Accent: tw.cyan[500],   user6Surface: tw.cyan[50],
    },
    dark: {
      // Surfaces
      bg:               tw.neutral[900],
      surface:          tw.neutral[800],
      surfaceNegative:  tw.neutral[950],
      surfaceElevated:  tw.neutral[800],
      border:           tw.neutral[700],
      borderSubtle:     tw.neutral[800],
      overlay:          'rgba(0, 0, 0, 0.65)',
      // Text
      textPrimary:      tw.neutral[50],
      textSecondary:    tw.neutral[300],
      textTertiary:     tw.neutral[500],
      textOnAccentPrimary:   tw.neutral[950],
      textOnAccentSecondary: tw.neutral[100],
      textInverted:     tw.neutral[950],
      // Brand accents — classic dark uses white
      accentPrimary:        tw.white,
      accentPrimarySubtle:  tw.neutral[800],
      accentPrimaryText:    tw.white,
      accentSecondary:      tw.stone[700],
      accentSecondarySubtle: tw.stone[900],
      accentSecondaryText:  tw.stone[300],
      // Warning
      warningText:      tw.amber[400],
      warningAccent:    tw.amber[500],
      warningSurface:   tw.amber[950],
      // Success
      successText:      tw.green[400],
      successAccent:    tw.green[500],
      successSurface:   tw.green[950],
      // Info
      infoText:         tw.blue[400],
      infoAccent:       tw.blue[500],
      infoSurface:      tw.blue[950],
      // Destructive
      destructiveText:    tw.pink[400],
      destructiveAccent:  tw.pink[500],
      destructiveSurface: tw.pink[950],
      // User colors (dark: lighter shades for contrast on dark bg)
      user1Text: tw.blue[400],   user1Accent: tw.blue[500],   user1Surface: tw.blue[950],
      user2Text: tw.violet[400], user2Accent: tw.violet[500], user2Surface: tw.violet[950],
      user3Text: tw.rose[400],   user3Accent: tw.rose[500],   user3Surface: tw.rose[950],
      user4Text: tw.amber[400],  user4Accent: tw.amber[500],  user4Surface: tw.amber[950],
      user5Text: tw.green[400],  user5Accent: tw.green[500],  user5Surface: tw.green[950],
      user6Text: tw.cyan[400],   user6Accent: tw.cyan[500],   user6Surface: tw.cyan[950],
    },
  },
  radius: {
    s:    '2px',
    m:    '6px',
    l:    '10px',
    xl:   '16px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 16px rgba(0,0,0,0.10)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
    xl: '0 20px 60px rgba(0,0,0,0.20)',
  },
};

