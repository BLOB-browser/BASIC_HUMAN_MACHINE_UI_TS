import type { ThemeName } from '../themes/types'

/**
 * Dynamically injects the font stylesheet for a given theme.
 * Each theme ships its own CSS file with @font-face declarations
 * so only the active theme's fonts are ever loaded.
 */
export function loadThemeFonts(theme: ThemeName): void {
  if (typeof document === 'undefined') return

  const id = `bhmui-fonts-${theme}`
  if (document.getElementById(id)) return // already loaded

  // Remove previous theme's font link (optional — fonts are cached by browser anyway)
  document.querySelectorAll('[data-bhmui-fonts]').forEach(el => el.remove())

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.setAttribute('data-bhmui-fonts', theme)
  // Resolved by the consuming app's bundler via the package exports map
  link.href = new URL(`../../dist/fonts/${theme}.css`, import.meta.url).href
  document.head.appendChild(link)
}
