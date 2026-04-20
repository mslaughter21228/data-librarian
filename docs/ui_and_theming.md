# UI & Theming Standards

This document outlines the design system, color palette, and theming guidelines for the **Data Librarian** application.

## 1. Design Philosophy

- **Dark Mode First**: The UI is optimized for dark environments. We use deep blue/slate backgrounds (`#09161c`, `#0d2029`) rather than pure black to create depth.
- **Semantic Roles**: We avoid hardcoded colors (e.g., `text-blue-500`) in favor of semantic roles (e.g., `text-info`). This allows for global theming updates without refactoring components.
- **High Contrast**: Text legibility is a priority. 
  - `text-main`: Bright/White (`#e1e8eb`) for primary content.
  - `text-muted`: Accessible Gray (`#d1d5db`) for secondary labels. We explicitly avoid low-contrast grays (like `gray-500` or `gray-600`) on dark backgrounds.

---

## 2. Color System

The color system is defined in `app/semantic-colors.css` using **HSL (Hue, Saturation, Lightness)** variables. This allows us to derive variations (backgrounds, hover states, accents) mathematically from a single base definition.

### Defined Roles

| Role | Base Color | HSL | Usage |
|------|-----------|-----|-------|
| **Primary** | Electric Blue | 184, 100%, 50% | Main actions, active states, focus rings, key borders. |
| **Secondary** | Yellow | 48, 96%, 53% | Section headers, special highlights, JSON files. |
| **Info** | Blue | 217, 91%, 60% | Informational messages, standard links, Word documents. |
| **Warning** | Amber | 38, 92%, 50% | Alerts, "Cancelled" states, Archives. |
| **Error** | Red | 0, 84%, 60% | Errors, validation failures, destructive actions, PDF files. |
| **Success** | Emerald | 151, 65%, 41% | Completion messages, "Running" states, Excel files. |
| **Media** | Purple | 270, 91%, 65% | Video & Audio file icons. |
| **Image** | Pink | 330, 83%, 60% | Image file icons. |

### Derived Variables

For each role (e.g., `--primary`), the following variations are available:

- `--role`: The base color.
- `--role-bg`: A darkened, desaturated version (15% lightness) suitable for backgrounds/cards.
- `--role-hover`: A lighter/brighter version for hover states.
- `--role-dim`: A low-opacity version (15% opacity) for subtle borders or glows.

---

## 3. Global Variables

Defined in `app/globals.css`, these variables control the structural look of the application.

### Backgrounds
- `--bg-dark` (`#09161c`): The deepest background, used for the main body and "terminal-like" inputs.
- `--bg-panel` (`#0d2029`): Used for sidebars and top navigation bars.
- `--bg-card` (`#142832`): Used for content cards (e.g., dashboard stats).
- `--bg-input` (`#1a3542`): Used for form inputs and hover states on list items.

### Typography
- `--text-main` (`#e1e8eb`): Primary text color.
- `--text-muted` (`#d1d5db`): Secondary text / labels. 

### Borders
- `--border-dim`: Subtle border color for separating sections.

---

## 4. Usage Guide (Tailwind)

We have mapped these CSS variables to Tailwind's theme config in `app/globals.css`.

### Do's ✅
- Use **semantic class names**: `text-primary`, `bg-error-bg`, `border-warning`.
- Use **global structural variables**: `bg-[var(--bg-dark)]`, `text-[var(--text-muted)]`.
- Use specific file-type colors only for icons: `text-media` for video icons.

### Don'ts ❌
- ❌ `text-blue-500` (Hardcoded value) → ✅ `text-info`
- ❌ `bg-gray-900` (Generic Tailwind) → ✅ `bg-[var(--bg-dark)]`
- ❌ `text-gray-500` (Low contrast) → ✅ `text-[var(--text-muted)]`

### Example Component

```tsx
<div className="bg-[var(--bg-card)] border border-[var(--border-dim)] p-4">
  <h3 className="text-secondary font-bold">Module Status</h3>
  <div className="flex items-center mt-2">
    <span className="text-[var(--text-muted)] mr-2">Status:</span>
    <span className="text-success">Active</span>
  </div>
  <button className="bg-[var(--bg-input)] hover:text-primary transition-colors">
    Configure
  </button>
</div>
```
