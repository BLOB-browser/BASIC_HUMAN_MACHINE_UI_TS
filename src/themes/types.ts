/**
 * BHMUI Theme Types
 *
 * A theme defines three axes:
 *   1. Font families (display / human / machine)
 *   2. Colors — light + dark variants, using Tailwind color values via tw.ts
 *   3. Border radius scale
 *
 * Token naming conventions:
 *   bg*           → page / canvas level
 *   surface*      → card / panel / sidebar level
 *   accent*       → brand interaction colors
 *   {status}*     → semantic status: warning, success, info, destructive
 *   user{n}*      → 6 assignable user/label colors (theme-specific)
 */

export type ThemeName = 'classic' | 'international' | 'cofe' | 'funky' | 'tech' | 'edgy';

export interface ThemeFonts {
  /** Body / prose text — warm, readable. e.g. Roboto Serif */
  human: string;
  /** UI headings and labels — clean, impactful. e.g. Roboto */
  display: string;
  /** Code, numbers, data. e.g. Roboto Mono */
  machine: string;
}

export interface ThemeColorSet {
  // ── Surfaces ────────────────────────────────────────────────────────────
  /** Page / canvas background */
  bg:               string;
  /** Sidebar, cards, interactive panels */
  surface:          string;
  /** Code blocks, info panels, sunken / recessed areas */
  surfaceNegative:  string;
  /** Dropdowns, modals — floats above surface */
  surfaceElevated:  string;
  /** Default border */
  border:           string;
  /** Subtle / inner border (dividers, inset separators) */
  borderSubtle:     string;
  /** Modal/drawer backdrop scrim */
  overlay:          string;

  // ── Text ────────────────────────────────────────────────────────────────
  /** Highest emphasis — headings, active labels */
  textPrimary:      string;
  /** Body copy */
  textSecondary:    string;
  /** Captions, hints, disabled */
  textTertiary:     string;
  /** Text on a filled primary-accent background (contrast safe) */
  textOnAccentPrimary:   string;
  /** Text on a filled secondary-accent background (contrast safe) */
  textOnAccentSecondary: string;
  /** Inverted text — light text for use on dark surfaces (and vice versa) */
  textInverted:     string;

  // ── Brand accents ────────────────────────────────────────────────────────
  /** Primary CTA background (button fill, link, focus ring) */
  accentPrimary:        string;
  /** Tinted surface for primary accent (badge bg, highlight row) */
  accentPrimarySubtle:  string;
  /** Text / icon in primary accent context */
  accentPrimaryText:    string;
  /** Secondary accent fill */
  accentSecondary:      string;
  /** Tinted surface for secondary accent */
  accentSecondarySubtle: string;
  /** Text / icon in secondary accent context */
  accentSecondaryText:  string;

  // ── Semantic: warning ────────────────────────────────────────────────────
  warningText:      string;
  warningAccent:    string;
  warningSurface:   string;

  // ── Semantic: success ────────────────────────────────────────────────────
  successText:      string;
  successAccent:    string;
  successSurface:   string;

  // ── Semantic: info ───────────────────────────────────────────────────────
  infoText:         string;
  infoAccent:       string;
  infoSurface:      string;

  // ── Semantic: destructive ────────────────────────────────────────────────
  destructiveText:    string;
  destructiveAccent:  string;
  destructiveSurface: string;

  // ── User / label colors (6 slots, theme-specific) ────────────────────────
  user1Text: string; user1Accent: string; user1Surface: string;
  user2Text: string; user2Accent: string; user2Surface: string;
  user3Text: string; user3Accent: string; user3Surface: string;
  user4Text: string; user4Accent: string; user4Surface: string;
  user5Text: string; user5Accent: string; user5Surface: string;
  user6Text: string; user6Accent: string; user6Surface: string;
}

export interface ThemeRadius {
  s:    string;
  m:    string;
  l:    string;
  xl:   string;
  full: string;
}

export interface ThemeShadow {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Theme {
  fonts:  ThemeFonts;
  colors: { light: ThemeColorSet; dark: ThemeColorSet };
  radius: ThemeRadius;
  shadow: ThemeShadow;
}

export interface TailwindThemePreset {
  fontFamily: {
    human:   string[];
    display: string[];
    machine: string[];
  };
}

