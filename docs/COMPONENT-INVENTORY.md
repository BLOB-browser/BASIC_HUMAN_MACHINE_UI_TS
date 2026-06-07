# BHMUI Component Inventory

_Last updated: 2026-05-25_

This document is the authoritative record of everything in BHMUI: themes, components, and their status.

---

## Status Legend

| Symbol | Meaning |
|---|---|
| ✅ | Implemented and exported |
| 🚧 | Stub / partial / draft |
| ❌ | Planned, not yet built |

---

## Architecture (v0.2.0+)

**ADR-011 (May 2026)**: CSS is defined once in `src/styles/*.css`. Vanilla TS components are classname applicators only — no runtime style injection. React components are thin `cva + cn` wrappers in `src/react/`.

### Consumer usage

```typescript
// At app boot — once, covers all component styles
import '@blob/ui/styles';

// Vanilla TS (DOM-building)
import { Button } from '@blob/ui/components';

// React (JSX)
import { Button } from '@blob/ui/react';
```

### Package exports

| Export | Content |
|---|---|
| `@blob/ui` | Re-exports everything (tokens, themes, components) |
| `@blob/ui/tokens` | Design tokens + `applyTheme()` |
| `@blob/ui/themes` | Theme definitions |
| `@blob/ui/components` | Vanilla TS component classes |
| `@blob/ui/styles` | Bundled CSS for all components (import once at app boot) |
| `@blob/ui/react` | React wrappers (`Button`, `Input`, `Avatar`, `Badge`, `Spinner`, `Tag`, `Card`, `Tabs`) |

---

## Design Token System

Tokens are implemented as **CSS custom properties** injected at runtime by `applyTheme()` from `src/themes/index.ts`.

### How It Works

```typescript
import { applyTheme, detectMode } from '@blob/ui/tokens';

// Inject all CSS vars onto :root — always use 'system' (ADR-009)
applyTheme('classic', detectMode());

// Keep in sync when OS colour scheme changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => applyTheme('classic', detectMode()));
```

All components reference tokens exclusively via CSS `var()` calls in `src/styles/*.css` — no raw colour values anywhere in component code.

### Theme Files (`src/themes/`)

| File | Export | Status |
|---|---|---|
| `classic.ts` | `classicTheme` | ✅ Full (light + dark) |
| `international.ts` | `internationalTheme` | ✅ Full |
| `cofe.ts` | `cofeTheme` | ✅ Full |
| `funky.ts` | `funkyTheme` | ✅ Full |
| `tech.ts` | `techTheme` | ✅ Full |
| `edgy.ts` | `edgyTheme` | ✅ Full |
| `types.ts` | `ThemeDefinition`, `ThemeName`, `ColorMode` | ✅ |
| `index.ts` | `applyTheme`, all theme objects | ✅ |

### Available Themes (`ThemeName`)

| Slug | Character |
|---|---|
| `classic` | Clean, neutral — BLOB house style |
| `international` | Multi-script, globally accessible |
| `cofe` | Warm, editorial |
| `funky` | Expressive, playful |
| `tech` | Technical / developer-focused |
| `edgy` | Bold, high-contrast |

### Key CSS Custom Property Slots

| CSS Variable | Role |
|---|---|
| `--color-background` | Page / panel background |
| `--color-surface` | Card / elevated surface |
| `--color-primary` | Primary action colour |
| `--color-primary-hover` | Hover state for primary |
| `--color-text` | Default body text |
| `--color-text-muted` | Secondary / muted text |
| `--color-border` | Default border colour |
| `--color-danger` | Destructive action / error |
| `--color-success` | Positive / success state |
| `--color-warning` | Warning state |
| `--font-sans` | Body / UI font stack |
| `--font-mono` | Monospace font stack |
| `--radius-sm`, `--radius-md`, `--radius-lg` | Border radii |
| `--shadow-sm`, `--shadow-md` | Box shadow levels |

---

## Components

All components are in `src/components/` under three tiers. Import tier-agnostic from the root:

```typescript
import { Button, Card, Sidebar } from '@ui/components';
```

Or from a specific tier:

```typescript
import { Button }  from '@ui/components/atoms';
import { Card }    from '@ui/components/molecules';
import { Sidebar } from '@ui/components/widgets';
```

### Tier: Atoms (`src/components/atoms/`)

Single-purpose, no internal BHMUI dependencies.

| Component | Export class | CSS class | Description | Status |
|---|---|---|---|---|
| Button | `Button` | `blob-button` | Primary action element — variants: filled, outline, ghost, danger | ✅ |
| Input | `Input` | `blob-input` | Text input with label, helper text, error state | ✅ |
| ChatInput | `ChatInput` | `blob-chat-input` | Multi-line AI chat input with submit button | ✅ |
| Tag | `Tag` | `blob-tag` | Small label pill — coloured variants | ✅ |
| Switch | `Switch` | `blob-switch` | Boolean on/off toggle (uses Button internally) | ✅ |
| Spinner | `Spinner` | `blob-spinner` | Loading indicator — size variants | ✅ |
| Divider | `Divider` | `blob-divider` | Horizontal section separator | ✅ |
| Badge | `Badge` | `blob-badge` | Count / status overlay — dot and count variants | ✅ |
| Avatar | `Avatar` | `blob-avatar` | User/entity avatar — image or initials fallback | ✅ |
| Progress | `Progress` | `blob-progress` | Linear progress bar | ✅ |
| Toggle | `Toggle` | `blob-toggle` | Icon-based toggle button | ✅ |
| Checkbox | `Checkbox` | `blob-checkbox` | Labelled checkbox with indeterminate state | ✅ |
| Radio | `Radio` | `blob-radio` | Radio button — for use in a group | ✅ |
| Slider | `Slider` | `blob-slider` | Range slider with min/max/step | ✅ |
| Textarea | `Textarea` | `blob-textarea` | Multi-line text input | ✅ |
| Tooltip | `Tooltip` | `blob-tooltip` | Hover label — 4 placement options | ✅ |
| Text | `Text` | `blob-text` | Typed text helper (`h1`–`h6`, `p`, `small`, `label`) | ✅ |
| Counter | `Counter` | `blob-counter` | Animated numeric counter | ✅ |
| TableCell | `TableCell` | `blob-table-cell` | `<th>` / `<td>` with sort indicators and selection | ✅ |

**Total atoms: 19**

---

### Tier: Molecules (`src/components/molecules/`)

Composed from atoms and/or basic DOM elements.

| Component | Export class | CSS class | Description | Status |
|---|---|---|---|---|
| ListItem | `ListItem` | `blob-list-item` | Row with icon, label, description, and trailing action | ✅ |
| Tabs | `Tabs` | `blob-tabs` | Tabbed content switcher | ✅ |
| Dropdown | `Dropdown` | `blob-dropdown` | Floating menu anchored to a trigger button | ✅ |
| Card | `Card` | `blob-card` | Elevated surface with header, body, footer slots | ✅ |
| Modal | `Modal` | `blob-modal` | Accessible dialog overlay — size variants | ✅ |
| Alert | `Alert` | `blob-alert` | Inline status banner — info/success/warning/danger | ✅ |
| Toast | `Toast` | `blob-toast` | Transient notification — auto-dismiss | ✅ |
| Select | `Select` | `blob-select` | Custom styled select with search | ✅ |
| Accordion | `Accordion` | `blob-accordion` | Collapsible sections list | ✅ |
| Breadcrumb | `Breadcrumb` | `blob-breadcrumb` | Navigation path trail | ✅ |
| Pagination | `Pagination` | `blob-pagination` | Page number navigation | ✅ |
| EmptyState | `EmptyState` | `blob-empty-state` | Zero-content placeholder with CTA | ✅ |
| SearchBar | `SearchBar` | `blob-search-bar` | Input with search icon and clear button | ✅ |
| Table | `Table` | `blob-table` | Full data table — sorting, selection, skeleton, density | ✅ |
| TopBar | `TopBar` | `blob-top-bar` | App-level top navigation bar | ✅ |
| ActionBar | `ActionBar` | `blob-action-bar` | Toolbar for bulk/contextual actions | ✅ |
| Sparkline | `Sparkline` | `blob-sparkline` | Mini inline SVG line chart | ✅ |
| DonutChart | `DonutChart` | `blob-donut-chart` | SVG donut chart with legend | ✅ |
| LineChart | `LineChart` | `blob-line-chart` | SVG multi-series line chart | ✅ |
| BarChart | `BarChart` | `blob-bar-chart` | SVG grouped / stacked bar chart | ✅ |

**Total molecules: 20**

---

### Tier: Widgets (`src/components/widgets/`)

Full standalone feature components — each can own the full viewport.

| Component | Export class | CSS class | Description | Status |
|---|---|---|---|---|
| Sidebar | `Sidebar` | `blob-sidebar` | Collapsible page sidebar — left or right | ✅ |
| TopNav | `TopNav` | `blob-top-nav` | Full-width navigation with links and auth action | ✅ |
| FileTree | `FileTree` | `blob-file-tree` | Hierarchical file/folder explorer | ✅ |
| TokenEditor | `TokenEditor` | `blob-token-editor` | Visual CSS token editor — sections and fields | ✅ |
| WidgetMeta | — | — | Shared type definition for widget registry metadata | ✅ |

**Total widgets: 5**

---

## Summary

| Tier | Count | Status |
|---|---|---|
| Atoms | 19 | ✅ All implemented |
| Molecules | 20 | ✅ All implemented |
| Widgets | 5 | ✅ All implemented |
| **Total** | **44 components** | **✅ Zero gaps** |

---

## React Wrappers (`@blob/ui/react`) 

Available since v0.2.0 (ADR-011). These are thin `cva + cn` wrappers that apply the same CSS classes as the vanilla TS components — same visual output, React API.

| Component | Import | Variants |
|---|---|---|
| `Button` | `@blob/ui/react` | `variant`: primary \| secondary \| ghost \| danger; `size`: sm \| md \| lg; `loading` |
| `Input` | `@blob/ui/react` | `size`: sm \| md \| lg; `state`: default \| error \| success |
| `Avatar` | `@blob/ui/react` | `size`: sm \| md \| lg \| xl; `shape`: circle \| square |
| `Badge` | `@blob/ui/react` | `variant`: default \| primary \| success \| warning \| danger; `size`: sm \| md |
| `Spinner` | `@blob/ui/react` | `size`: sm \| md \| lg |
| `Tag` | `@blob/ui/react` | `variant`: default \| primary; `removable` |
| `Card` | `@blob/ui/react` | `variant`: default \| elevated \| outlined |
| `Tabs` | `@blob/ui/react` | `items`, `activeIndex`, `onChange` |

All apps must add `import '@blob/ui/styles'` once at boot before any BHMUI component class is used.

---

## What Is NOT in BHMUI (by design)

| Item | Reason |
|---|---|
| ColorPicker | Complex — planned for Widget Builder phase |
| RichTextEditor | Third-party integration (ProseMirror) — out of scope for primitives |
| DatePicker / Calendar | Complex — deferred |
| DataGrid (virtual scroll) | Deferred until blob-database-builder needs it |
| Icon system | Uses system emoji or caller-provided SVG — no icon library bundled |
