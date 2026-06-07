/**
 * BHMUI theme runtime — applies a theme as CSS custom properties.
 */

import { themes }  from '../themes';
import type { ThemeName, ThemeColorSet } from '../themes/types';

export type ColorMode = 'light' | 'dark';

export function detectMode(): ColorMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function set(el: HTMLElement, prop: string, val: string) {
  el.style.setProperty(prop, val);
}

export function applyTheme(
  themeName: ThemeName,
  mode: ColorMode = 'light',
  target: HTMLElement = document.documentElement,
  overrides: Record<string, string> = {},
): void {
  const theme = themes[themeName];
  if (!theme) {
    console.warn(`[BHMUI] Unknown theme: "${themeName}"`);
    return;
  }

  const c: ThemeColorSet = theme.colors[mode];

  // Fonts
  set(target, '--font-human',   theme.fonts.human);
  set(target, '--font-display', theme.fonts.display);
  set(target, '--font-machine', theme.fonts.machine);

  // Surfaces
  set(target, '--color-bg',                c.bg);
  set(target, '--color-surface',           c.surface);
  set(target, '--color-surface-negative',  c.surfaceNegative);
  set(target, '--color-surface-elevated',  c.surfaceElevated);
  set(target, '--color-border',            c.border);
  set(target, '--color-border-subtle',     c.borderSubtle);
  set(target, '--color-overlay',           c.overlay);

  // Text
  set(target, '--color-text-primary',              c.textPrimary);
  set(target, '--color-text-secondary',             c.textSecondary);
  set(target, '--color-text-tertiary',              c.textTertiary);
  set(target, '--color-text-on-accent-primary',     c.textOnAccentPrimary);
  set(target, '--color-text-on-accent-secondary',   c.textOnAccentSecondary);
  set(target, '--color-text-inverted',              c.textInverted);

  // Brand accents
  set(target, '--color-accent-primary',          c.accentPrimary);
  set(target, '--color-accent-primary-subtle',   c.accentPrimarySubtle);
  set(target, '--color-accent-primary-text',     c.accentPrimaryText);
  set(target, '--color-accent-secondary',        c.accentSecondary);
  set(target, '--color-accent-secondary-subtle', c.accentSecondarySubtle);
  set(target, '--color-accent-secondary-text',   c.accentSecondaryText);

  // Semantic: warning
  set(target, '--color-warning-text',    c.warningText);
  set(target, '--color-warning-accent',  c.warningAccent);
  set(target, '--color-warning-surface', c.warningSurface);

  // Semantic: success
  set(target, '--color-success-text',    c.successText);
  set(target, '--color-success-accent',  c.successAccent);
  set(target, '--color-success-surface', c.successSurface);

  // Semantic: info
  set(target, '--color-info-text',    c.infoText);
  set(target, '--color-info-accent',  c.infoAccent);
  set(target, '--color-info-surface', c.infoSurface);

  // Semantic: destructive
  set(target, '--color-destructive-text',    c.destructiveText);
  set(target, '--color-destructive-accent',  c.destructiveAccent);
  set(target, '--color-destructive-surface', c.destructiveSurface);

  // User colors
  for (let i = 1; i <= 6; i++) {
    const n = i as 1|2|3|4|5|6;
    set(target, `--color-user${n}-text`,    c[`user${n}Text`]);
    set(target, `--color-user${n}-accent`,  c[`user${n}Accent`]);
    set(target, `--color-user${n}-surface`, c[`user${n}Surface`]);
  }

  // Radius
  set(target, '--radius-s',    theme.radius.s);
  set(target, '--radius-m',    theme.radius.m);
  set(target, '--radius-l',    theme.radius.l);
  set(target, '--radius-xl',   theme.radius.xl);
  set(target, '--radius-full', theme.radius.full);

  // Shadow
  set(target, '--shadow-sm', theme.shadow.sm);
  set(target, '--shadow-md', theme.shadow.md);
  set(target, '--shadow-lg', theme.shadow.lg);
  set(target, '--shadow-xl', theme.shadow.xl);

  // Overrides
  for (const [prop, value] of Object.entries(overrides)) {
    set(target, prop, value);
  }
}

