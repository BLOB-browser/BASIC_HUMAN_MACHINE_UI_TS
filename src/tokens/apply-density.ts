/**
 * BHMUI density runtime — sets the active density mode.
 *
 * Works by writing `data-density` on the target element.
 * CSS vars in density.css respond to this attribute, composing
 * naturally with @media breakpoints in the same stylesheet.
 *
 * Usage:
 *   import { applyDensity, detectDensity } from '@building-local-open-bots/ui'
 *   applyDensity(detectDensity())
 */

export type DensityMode = 'compact' | 'default' | 'comfortable';

/**
 * Apply a density mode. Sets `data-density` on `target` (default: <html>).
 * Removing the attribute returns to default density.
 */
export function applyDensity(
  mode: DensityMode,
  target: HTMLElement = document.documentElement,
): void {
  if (mode === 'default') {
    target.removeAttribute('data-density');
  } else {
    target.dataset.density = mode;
  }
}

/**
 * Read stored density preference from localStorage.
 * Falls back to 'default' if nothing is stored.
 */
export function detectDensity(): DensityMode {
  if (typeof window === 'undefined') return 'default';
  const stored = localStorage.getItem('blob-density') as DensityMode | null;
  if (stored === 'compact' || stored === 'comfortable') return stored;
  return 'default';
}

/**
 * Persist the density preference to localStorage and apply it immediately.
 */
export function saveDensity(
  mode: DensityMode,
  target: HTMLElement = document.documentElement,
): void {
  localStorage.setItem('blob-density', mode);
  applyDensity(mode, target);
}
