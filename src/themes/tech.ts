import type { Theme } from './types';
import { tw } from './tw';

/**
 * Tech — Clean and professional.
 * Source family (Adobe), blue accent, slate palette, tight radius.
 */
export const tech: Theme = {
  fonts: {
    human:   '"Source Serif 4 Variable", serif',
    display: '"Source Sans 3 Variable", sans-serif',
    machine: '"Source Code Pro", monospace',
  },
  colors: {
    light: {
      // Surfaces
      bg:               tw.slate[50],
      surface:          tw.white,
      surfaceNegative:  tw.slate[100],
      surfaceElevated:  tw.white,
      border:           tw.slate[200],
      borderSubtle:     tw.slate[100],
      overlay:          'rgba(0, 0, 0, 0.45)',
      // Text
      textPrimary:      tw.slate[900],
      textSecondary:    tw.slate[600],
      textTertiary:     tw.slate[400],
      textOnAccentPrimary:   tw.white,
      textOnAccentSecondary: tw.slate[800],
      textInverted:     tw.white,
      // Brand accents — blue
      accentPrimary:        tw.blue[700],
      accentPrimarySubtle:  tw.blue[50],
      accentPrimaryText:    tw.blue[700],
      accentSecondary:      tw.slate[200],
      accentSecondarySubtle: tw.slate[50],
      accentSecondaryText:  tw.slate[600],
      // Warning
      warningText:      tw.amber[700],
      warningAccent:    tw.amber[400],
      warningSurface:   tw.amber[50],
      // Success
      successText:      tw.green[700],
      successAccent:    tw.green[500],
      successSurface:   tw.green[50],
      // Info
      infoText:         tw.blue[700],
      infoAccent:       tw.blue[500],
      infoSurface:      tw.blue[50],
      // Destructive
      destructiveText:    tw.red[700],
      destructiveAccent:  tw.red[500],
      destructiveSurface: tw.red[50],
      // User colors
      user1Text: tw.blue[700],   user1Accent: tw.blue[500],   user1Surface: tw.blue[50],
      user2Text: tw.violet[700], user2Accent: tw.violet[500], user2Surface: tw.violet[50],
      user3Text: tw.rose[700],   user3Accent: tw.rose[500],   user3Surface: tw.rose[50],
      user4Text: tw.amber[700],  user4Accent: tw.amber[500],  user4Surface: tw.amber[50],
      user5Text: tw.green[700],  user5Accent: tw.green[500],  user5Surface: tw.green[50],
      user6Text: tw.cyan[700],   user6Accent: tw.cyan[500],   user6Surface: tw.cyan[50],
    },
    dark: {
      // Surfaces
      bg:               tw.slate[800],
      surface:          tw.slate[900],
      surfaceNegative:  tw.slate[950],
      surfaceElevated:  tw.slate[700],
      border:           tw.slate[700],
      borderSubtle:     tw.slate[800],
      overlay:          'rgba(0, 0, 0, 0.65)',
      // Text
      textPrimary:      tw.slate[50],
      textSecondary:    tw.slate[300],
      textTertiary:     tw.slate[500],
      textOnAccentPrimary:   tw.white,
      textOnAccentSecondary: tw.slate[50],
      textInverted:     tw.slate[900],
      // Brand accents — blue
      accentPrimary:        tw.blue[500],
      accentPrimarySubtle:  tw.blue[950],
      accentPrimaryText:    tw.blue[400],
      accentSecondary:      tw.slate[600],
      accentSecondarySubtle: tw.slate[800],
      accentSecondaryText:  tw.slate[300],
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
      destructiveText:    tw.red[400],
      destructiveAccent:  tw.red[500],
      destructiveSurface: tw.red[950],
      // User colors
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
    m:    '4px',
    l:    '8px',
    xl:   '12px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.15)',
    md: '0 4px 16px rgba(0,0,0,0.20)',
    lg: '0 8px 24px rgba(0,0,0,0.25)',
    xl: '0 20px 60px rgba(0,0,0,0.35)',
  },
};
