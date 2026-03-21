# AgileFlow UI Overhaul — Design Spec

## Vision
Strip all visual noise. Rebuild the UI with a Vercel/Linear/Untitled UI-inspired design system: **monochrome foundation, semantic color only, Inter font, no gradients, no looping animations**. The result should feel like a premium SaaS tool, not an AI-generated demo.

## Design Principles
1. **Color is information** — Only use color to convey meaning (status, priority, action). Never decorative.
2. **Subtract, don't add** — Remove gradients, floating particles, decorative shapes, shadow escalation.
3. **Consistent tokens** — All colors, spacing, radii come from CSS variables. Zero hardcoded hex values.
4. **Responsive first** — Every layout works on mobile. Sidebar collapses, tables scroll, cards stack.
5. **Subtle motion** — Transitions (150-200ms) for hover/focus. No scale transforms, no floating animations.

---

## 1. Design Tokens (CSS Variables)

### Font
- **Family**: `Inter` (variable weight, loaded via Google Fonts or `@fontsource/inter`)
- **Scale**: 12px (xs), 13px (sm), 14px (base), 16px (lg), 18px (xl), 20px (2xl), 24px (3xl), 30px (4xl)
- **Weight**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line-height**: 1.5 for body, 1.2 for headings
- **Letter-spacing**: -0.01em for headings, normal for body
- **Anti-aliasing**: `-webkit-font-smoothing: antialiased`

### Color Palette

All colors defined as HSL in CSS variables. Light and dark mode variants.

#### Neutral Scale (Gray)
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--gray-50` | `0 0% 98%` | `0 0% 8%` | Page background |
| `--gray-100` | `0 0% 96%` | `0 0% 11%` | Card background alt |
| `--gray-200` | `0 0% 90%` | `0 0% 16%` | Borders, dividers |
| `--gray-300` | `0 0% 83%` | `0 0% 22%` | Disabled borders |
| `--gray-400` | `0 0% 64%` | `0 0% 40%` | Placeholder text |
| `--gray-500` | `0 0% 45%` | `0 0% 55%` | Secondary text |
| `--gray-600` | `0 0% 32%` | `0 0% 70%` | Body text |
| `--gray-700` | `0 0% 20%` | `0 0% 80%` | Primary text |
| `--gray-800` | `0 0% 12%` | `0 0% 90%` | Headings |
| `--gray-900` | `0 0% 5%` | `0 0% 96%` | Bold headings |
| `--gray-950` | `0 0% 2%` | `0 0% 99%` | Max contrast |

#### Semantic Colors
Each has 5 shades: `50` (background tint), `100` (light), `500` (base), `600` (hover), `900` (text on tint).

| Semantic | Base (500) | Usage |
|----------|-----------|-------|
| `--blue` | `217 91% 60%` | Primary actions, links, selected states |
| `--green` | `142 71% 45%` | Success, done, completed |
| `--amber` | `38 92% 50%` | Warning, in-progress, medium priority |
| `--red` | `0 84% 60%` | Error, destructive, high priority, overdue |
| `--purple` | `262 83% 58%` | Labels, categories, AI features |
| `--cyan` | `192 91% 36%` | Info, links, secondary accents |

#### Mapped Tokens (what components actually use)
```
--background: var(--gray-50)
--foreground: var(--gray-900)
--card: 0 0% 100% (white in light, --gray-100 in dark)
--card-foreground: var(--gray-900)
--primary: var(--blue-500)
--primary-foreground: 0 0% 100%
--secondary: var(--gray-100)
--secondary-foreground: var(--gray-700)
--muted: var(--gray-100)
--muted-foreground: var(--gray-500)
--accent: var(--gray-100)
--accent-foreground: var(--gray-900)
--destructive: var(--red-500)
--border: var(--gray-200)
--input: var(--gray-200)
--ring: var(--blue-500)
```

### Spacing
Use Tailwind defaults (4px base): `1`=4px, `2`=8px, `3`=12px, `4`=16px, `5`=20px, `6`=24px, `8`=32px.

### Border Radius
- `--radius-sm`: 4px (badges, small inputs)
- `--radius`: 6px (buttons, inputs, cards)
- `--radius-lg`: 8px (modals, larger cards)
- `--radius-xl`: 12px (page-level containers)

### Shadows
Only 2 levels. No `shadow-2xl`, no `hover:shadow-xl`.
- `--shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)` — cards, dropdowns
- `--shadow`: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` — modals, popovers
- Dark mode: use border emphasis instead of shadows

### Motion
- `--transition-fast`: `150ms ease`
- `--transition-base`: `200ms ease`
- **Allowed**: opacity, background-color, border-color, color, transform(translateY max 2px)
- **Banned**: scale transforms, rotate, infinite keyframes, floating particles, glow effects

---

## 2. Layout System

### App Shell
```
┌─────────────────────────────────────────┐
│ Top Nav (h-14, border-b, sticky)        │
├─────────────────────────────────────────┤
│                                         │
│  Main Content (max-w-7xl, mx-auto,      │
│  px-4 md:px-6 lg:px-8, py-6)           │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Top Navigation
- Height: 56px (h-14)
- Background: white / dark:gray-900
- Border: 1px bottom, `--border` color
- Logo: Text only "AgileFlow" in semibold, no icon background, no gradient
- Nav items: text buttons, `text-gray-500 hover:text-gray-900`, active = `text-gray-900 font-medium` with subtle bottom border indicator
- Right side: icon buttons (ghost), avatar (initials in gray circle, no gradient)
- Mobile: hamburger → sheet/drawer from left

### Page Layout
- All pages: `max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6`
- Page header: `text-2xl font-semibold text-gray-900` + optional description in `text-gray-500 text-sm`
- Sections separated by `space-y-6`

---

## 3. Component Overhaul Rules

### Cards
- Background: white / dark:card
- Border: 1px solid `--border`
- Shadow: `--shadow-sm` (optional, prefer border-only)
- Radius: `--radius-lg`
- Padding: `p-5` or `p-6`
- **NO**: gradient backgrounds, decorative shapes, hover shadow escalation

### Buttons
- Primary: `bg-gray-900 text-white hover:bg-gray-800` (dark: `bg-white text-gray-900 hover:bg-gray-200`)
- Secondary: `bg-white border border-gray-200 text-gray-700 hover:bg-gray-50`
- Destructive: `bg-red-500 text-white hover:bg-red-600`
- Ghost: `text-gray-500 hover:text-gray-900 hover:bg-gray-100`
- **NO**: gradient buttons, scale-on-hover, shadow-on-hover

### Stats/Metric Cards
- Simple layout: label (text-sm text-gray-500) → value (text-2xl font-semibold) → optional trend indicator
- Trend: green text + up arrow for positive, red + down for negative
- **NO**: colored gradient backgrounds, floating particle effects, icon animations

### Tables
- Header: `text-xs font-medium text-gray-500 uppercase tracking-wider`
- Rows: `border-b border-gray-100`, hover: `bg-gray-50`
- Mobile: horizontal scroll with `overflow-x-auto`

### Badges/Status
- This is WHERE color lives. Use semantic tint backgrounds:
  - Done/Success: `bg-green-50 text-green-700 border border-green-200`
  - In Progress: `bg-blue-50 text-blue-700 border border-blue-200`
  - Warning: `bg-amber-50 text-amber-700 border border-amber-200`
  - Error/Blocked: `bg-red-50 text-red-700 border border-red-200`
  - Default: `bg-gray-100 text-gray-700 border border-gray-200`
- Dark mode: darker tints with lighter text

### Charts (Recharts)
- Use 5 chart colors from tokens (restrained palette)
- Grid lines: `--gray-200` with dashed stroke
- Tooltip: white card with border, no shadow-xl
- Axis labels: `text-xs text-gray-500`

### Forms
- Inputs: `border border-gray-200 bg-white rounded-md h-9 px-3 text-sm`
- Focus: `ring-2 ring-blue-500 ring-offset-1 border-blue-500`
- Labels: `text-sm font-medium text-gray-700`
- Error: `text-sm text-red-500` below input, `border-red-500` on input

### AI Assistant
- Floating button: `bg-gray-900 text-white` circle, no gradient
- Chat panel: standard card styling (white, border, shadow)
- Messages: gray-100 for AI, white for user, no colored bubbles

---

## 4. Pages to Overhaul

### Priority Order (by user visibility)

1. **Layout.jsx** — Nav bar: strip gradients, use Inter, fix nav active states
2. **Dashboard.jsx** — Welcome section, stats overview, quick actions
3. **Login.jsx** — Clean card on neutral background, no gradient bg
4. **Boards.jsx** — Board listing cards
5. **Board.jsx** — Kanban columns, task cards, header
6. **Backlog.jsx** — Sprint planning, story cards, stats
7. **Analytics.jsx** — Charts, KPI cards, filters
8. **Calendar.jsx** — Event display, color coding
9. **Settings.jsx** — Forms, preferences
10. **Admin.jsx / Performance.jsx** — Admin panels

### Supporting Components
- `src/components/dashboard/StatsOverview.jsx` — Remove all gradient cards, particles
- `src/components/utils/AIAssistant.jsx` — Strip gradient button/header
- `src/components/backlog/SprintPlanningModal.jsx` — Clean modal styling
- `src/components/board/` — All board sub-components
- `src/components/utils/analytics.jsx` — (utility file, no UI changes needed)

---

## 5. Technical Implementation

### Step 1: Foundation
1. Install Inter font (`@fontsource-variable/inter`)
2. Update `src/index.css` with new CSS variables (full gray scale + semantic colors)
3. Update `tailwind.config.js` to map new variables
4. Add Inter to font-family in CSS

### Step 2: Global Cleanup
1. Update `Layout.jsx` — new nav styling
2. Create a search-and-replace pass for banned patterns:
   - `bg-gradient-to-*` → solid colors
   - `from-*-500 to-*-600` → remove
   - `shadow-2xl`, `shadow-xl` → `shadow-sm` or remove
   - `whileHover={{ scale:` → remove or replace with subtle opacity/translateY
   - `animate={{` with infinite repeat → remove entirely
   - Hardcoded hex (#0073EA, #323338, etc.) → CSS variable equivalents

### Step 3: Page-by-Page Rebuild
Each page gets its own parallel workstream:
- Strip old styling
- Apply new token system
- Ensure responsive breakpoints work
- Test dark mode toggle

### Step 4: Verification
- `npm run build` — no errors
- `npm run lint` — clean
- Visual check on desktop and mobile viewport
- Dark mode check

---

## 6. What We're NOT Changing
- Component logic/functionality — untouched
- Data fetching, API calls — untouched
- Routing structure — untouched
- shadcn/ui primitives in `src/components/ui/` — untouched (they already follow the token system)
- Framer Motion for page transitions (enter/exit) — kept, but simplified (opacity + translateY only)

## 7. Banned Patterns (enforced going forward)
- `bg-gradient-to-*` anywhere in feature components
- `infinite` keyword in any animation
- `whileHover={{ scale:` or `whileHover={{ y: -12`
- Hardcoded hex colors outside of CSS variable definitions
- `shadow-2xl`, `shadow-xl`, `hover:shadow-xl`
- Decorative absolute-positioned shapes (gradient circles, blur blobs)
- `animate={{ rotate:`, `animate={{ ... repeat: Infinity`
