/**
 * BASIC HUMAN MACHINE UI
 *
 * Three layers:
 *   1. themes/  — 6 theme definitions (colors, fonts, radius, shadow)
 *   2. tokens/  — applyTheme() runtime: writes CSS vars to the DOM
 *   3. react/   — React + Radix components (import from '@building-local-open-bots/ui/react')
 *
 * CSS (import '@building-local-open-bots/ui/styles') and the Tailwind preset
 * (import from '@building-local-open-bots/ui/tailwind-preset') are separate
 * entry points, not included here.
 */

// Theme definitions
export * from './themes';

// Runtime: applyTheme, detectMode
export * from './tokens';
