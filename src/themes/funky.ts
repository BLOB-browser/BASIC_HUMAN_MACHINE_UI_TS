import type { Theme } from './types';
import { tw } from './tw';

/**
 * Funky — Bold and playful.
 * PT family, teal + fuchsia accents, warm amber/dark-red canvas.
 */
export const funky: Theme = {
  fonts: {
    human:   '"PT Serif", serif',
    display: '"PT Sans", sans-serif',
    machine: '"PT Mono", monospace',
  },
  colors: {
    light: {
      // Surfaces
      bg:               tw.amber[50],
      surface:          tw.white,
      surfaceNegative:  tw.teal[50],
      surfaceElevated:  tw.white,
      border:           tw.stone[200],
      borderSubtle:     tw.stone[100],
      overlay:          'rgba(0, 0, 0, 0.45)',
      // Text
      textPrimary:      tw.stone[900],
      textSecondary:    tw.stone[700],
      textTertiary:     tw.stone[400],
      textOnAccentPrimary:   tw.white,
      textOnAccentSecondary: tw.stone[900],
      textInverted:     tw.white,
      // Brand accents — teal primary, fuchsia secondary
      accentPrimary:        tw.teal[500],
      accentPrimarySubtle:  tw.teal[50],
      accentPrimaryText:    tw.teal[700],
      accentSecondary:      tw.fuchsia[300],
      accentSecondarySubtle: tw.fuchsia[50],
      accentSecondaryText:  tw.fuchsia[800],
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
      bg:               tw.red[950],
      surface:          tw.stone[800],
      surfaceNegative:  tw.stone[900],
      surfaceElevated:  tw.stone[700],
      border:           tw.stone[600],
      borderSubtle:     tw.stone[700],
      overlay:          'rgba(0, 0, 0, 0.65)',
      // Text
      textPrimary:      tw.white,
      textSecondary:    tw.stone[200],
      textTertiary:     tw.stone[500],
      textOnAccentPrimary:   tw.black,
      textOnAccentSecondary: tw.stone[900],
      textInverted:     tw.stone[950],
      // Brand accents — teal primary, fuchsia secondary
      accentPrimary:        tw.teal[300],
      accentPrimarySubtle:  tw.teal[950],
      accentPrimaryText:    tw.teal[300],
      accentSecondary:      tw.fuchsia[300],
      accentSecondarySubtle: tw.fuchsia[950],
      accentSecondaryText:  tw.fuchsia[200],
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
    s:    '4px',
    m:    '10px',
    l:    '16px',
    xl:   '24px',
    full: '9999px',
  },
  shadow: {
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
  },
};
