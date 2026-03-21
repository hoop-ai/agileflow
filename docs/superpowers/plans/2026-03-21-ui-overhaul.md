# UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip all visual noise (gradients, looping animations, decorative shapes, hardcoded colors) and rebuild the UI with a minimal Vercel/Linear-inspired design system using Inter font, monochrome foundation, and semantic color only.

**Architecture:** Foundation-first approach — install Inter font and rewrite CSS variables/tokens first (Task 1), then update Layout (Task 2), then overhaul all pages in parallel (Tasks 3-8). Each page task is independent after the foundation is in place.

**Tech Stack:** React 18, Tailwind CSS 3, shadcn/ui (new-york style), Inter font, Framer Motion (simplified), Recharts

**Spec:** `docs/superpowers/specs/2026-03-21-ui-overhaul-design.md`

---

## File Structure

### Modified Files
- `src/index.css` — Complete rewrite of CSS variables (gray scale, semantic colors, mapped tokens)
- `tailwind.config.js` — Add Inter font, extended color mapping
- `index.html` — Add Inter font link
- `src/Layout.jsx` — Strip gradient nav, clean typography, responsive mobile menu
- `src/pages/Dashboard.jsx` — Remove gradient hero, decorative shapes, scale animations
- `src/pages/Login.jsx` — Remove gradient background, simplify card
- `src/pages/Boards.jsx` — Clean board cards
- `src/pages/Board.jsx` — Clean board page wrapper
- `src/pages/Backlog.jsx` — Remove gradient stats, clean story cards
- `src/pages/Analytics.jsx` — Clean KPI cards, chart containers
- `src/pages/Calendar.jsx` — Clean event styling
- `src/pages/Settings.jsx` — Clean form styling
- `src/pages/Admin.jsx` — Clean admin panels
- `src/pages/Performance.jsx` — Clean performance panels
- `src/components/dashboard/StatsOverview.jsx` — Remove gradient cards, particles, 3D transforms
- `src/components/dashboard/ActivityFeed.jsx` — Remove gradient status indicators
- `src/components/dashboard/RecentBoards.jsx` — Clean card styling
- `src/components/dashboard/QuickActions.jsx` — Clean action buttons
- `src/components/utils/AIAssistant.jsx` — Remove gradient button/header
- `src/components/backlog/SprintPlanningModal.jsx` — Clean button colors
- `src/components/board/BoardHeader.jsx` — Remove avatar gradient, clean colors
- `src/components/board/MainTable.jsx` — Add dark mode, clean row styling
- `src/components/board/KanbanBoard.jsx` — Clean column styling, dark mode
- `src/components/board/cells/StatusCell.jsx` — Use semantic tokens for status colors
- `src/components/board/cells/PriorityCell.jsx` — Use semantic tokens for priority colors
- `src/components/board/analytics/EnhancedAnalyticsPanel.jsx` — Clean chart containers
- `src/components/common/ErrorBoundary.jsx` — Add dark mode, use tokens
- `src/components/common/LoadingState.jsx` — Add dark mode, use tokens
- `src/components/board/automations/AutomationsModal.jsx` — Clean automation colors
- `src/components/calendar/CreateEventModal.jsx` — Clean event type colors
- `src/components/boards/CreateBoardModal.jsx` — Clean form/button styling

### No Changes
- `src/components/ui/*` — shadcn primitives, untouched
- `src/api/*` — business logic, untouched
- `src/lib/*` — utilities, untouched
- `components.json` — shadcn config, untouched

---

## Task 1: Foundation — Font, CSS Variables, Tailwind Config

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

**This task MUST complete before Tasks 2-8 can start.**

- [ ] **Step 1: Add Inter font to index.html**

In `index.html`, add Google Fonts link in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Rewrite src/index.css with new design tokens**

Replace the entire `@layer base` block in `src/index.css` with the new token system. Keep the `@tailwind` directives at top.

Light mode (`:root`):
```css
/* Gray Scale */
--gray-50: 0 0% 98%;
--gray-100: 0 0% 96%;
--gray-200: 0 0% 90%;
--gray-300: 0 0% 83%;
--gray-400: 0 0% 64%;
--gray-500: 0 0% 45%;
--gray-600: 0 0% 32%;
--gray-700: 0 0% 25%;
--gray-800: 0 0% 15%;
--gray-900: 0 0% 9%;
--gray-950: 0 0% 4%;

/* Semantic Colors - each with 50, 500, 600, 900 shades */
--blue-50: 214 100% 97%;
--blue-500: 217 91% 60%;
--blue-600: 217 91% 50%;
--blue-900: 217 91% 20%;

--green-50: 138 76% 97%;
--green-500: 142 71% 45%;
--green-600: 142 76% 36%;
--green-900: 142 72% 18%;

--amber-50: 48 100% 96%;
--amber-500: 38 92% 50%;
--amber-600: 32 95% 44%;
--amber-900: 28 73% 20%;

--red-50: 0 86% 97%;
--red-500: 0 84% 60%;
--red-600: 0 72% 51%;
--red-900: 0 63% 20%;

--purple-50: 270 100% 98%;
--purple-500: 262 83% 58%;
--purple-600: 262 83% 48%;
--purple-900: 262 72% 22%;

--cyan-50: 183 100% 96%;
--cyan-500: 192 91% 36%;
--cyan-600: 192 82% 31%;
--cyan-900: 192 70% 15%;

/* Mapped Tokens (what components use) */
--background: var(--gray-50);
--foreground: 0 0% 9%;
--card: 0 0% 100%;
--card-foreground: 0 0% 9%;
--popover: 0 0% 100%;
--popover-foreground: 0 0% 9%;
--primary: 0 0% 9%;
--primary-foreground: 0 0% 98%;
--secondary: 0 0% 96%;
--secondary-foreground: 0 0% 9%;
--muted: 0 0% 96%;
--muted-foreground: 0 0% 45%;
--accent: 0 0% 96%;
--accent-foreground: 0 0% 9%;
--destructive: 0 84% 60%;
--destructive-foreground: 0 0% 98%;
--border: 0 0% 90%;
--input: 0 0% 90%;
--ring: 217 91% 60%;
--radius: 0.375rem;

/* Chart colors */
--chart-1: 217 91% 60%;
--chart-2: 142 71% 45%;
--chart-3: 38 92% 50%;
--chart-4: 262 83% 58%;
--chart-5: 192 91% 36%;

/* Sidebar */
--sidebar-background: 0 0% 100%;
--sidebar-foreground: 0 0% 25%;
--sidebar-primary: 217 91% 60%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 0 0% 96%;
--sidebar-accent-foreground: 0 0% 9%;
--sidebar-border: 0 0% 90%;
--sidebar-ring: 217 91% 60%;
```

Dark mode (`.dark`):
```css
--gray-50: 0 0% 7%;
--gray-100: 0 0% 10%;
--gray-200: 0 0% 15%;
--gray-300: 0 0% 22%;
--gray-400: 0 0% 40%;
--gray-500: 0 0% 55%;
--gray-600: 0 0% 70%;
--gray-700: 0 0% 80%;
--gray-800: 0 0% 88%;
--gray-900: 0 0% 95%;
--gray-950: 0 0% 98%;

/* Semantic colors - adjusted for dark mode */
--blue-50: 217 50% 15%;
--blue-500: 217 91% 65%;
--blue-600: 217 91% 55%;
--blue-900: 217 91% 85%;

--green-50: 142 40% 12%;
--green-500: 142 71% 50%;
--green-600: 142 76% 42%;
--green-900: 142 72% 82%;

--amber-50: 38 40% 12%;
--amber-500: 38 92% 55%;
--amber-600: 32 95% 48%;
--amber-900: 28 73% 80%;

--red-50: 0 40% 14%;
--red-500: 0 84% 62%;
--red-600: 0 72% 55%;
--red-900: 0 63% 82%;

--purple-50: 262 40% 14%;
--purple-500: 262 83% 65%;
--purple-600: 262 83% 55%;
--purple-900: 262 72% 82%;

--cyan-50: 192 40% 12%;
--cyan-500: 192 91% 42%;
--cyan-600: 192 82% 36%;
--cyan-900: 192 70% 82%;

/* Mapped tokens - dark */
--background: 0 0% 7%;
--foreground: 0 0% 95%;
--card: 0 0% 10%;
--card-foreground: 0 0% 95%;
--popover: 0 0% 10%;
--popover-foreground: 0 0% 95%;
--primary: 0 0% 98%;
--primary-foreground: 0 0% 9%;
--secondary: 0 0% 15%;
--secondary-foreground: 0 0% 95%;
--muted: 0 0% 15%;
--muted-foreground: 0 0% 55%;
--accent: 0 0% 15%;
--accent-foreground: 0 0% 95%;
--destructive: 0 84% 62%;
--destructive-foreground: 0 0% 98%;
--border: 0 0% 18%;
--input: 0 0% 18%;
--ring: 217 91% 65%;

/* Chart colors dark */
--chart-1: 217 91% 65%;
--chart-2: 142 71% 50%;
--chart-3: 38 92% 55%;
--chart-4: 262 83% 65%;
--chart-5: 192 91% 42%;

/* Sidebar dark */
--sidebar-background: 0 0% 7%;
--sidebar-foreground: 0 0% 80%;
--sidebar-primary: 217 91% 65%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 0 0% 15%;
--sidebar-accent-foreground: 0 0% 95%;
--sidebar-border: 0 0% 18%;
--sidebar-ring: 217 91% 65%;
```

Add to the global base layer:
```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  }
}
```

- [ ] **Step 3: Update tailwind.config.js**

Add Inter as the default sans font. Add the semantic color tokens to the extend section so they're available as `text-gray-500`, `bg-blue-50`, etc. via CSS variables:

```js
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
},
```

Map gray scale and semantic colors to CSS variables using `hsl(var(...))` pattern. The existing shadcn color mappings (background, foreground, card, etc.) should remain as-is since they reference CSS variables that we just redefined.

- [ ] **Step 4: Verify foundation builds**

Run: `npm run build`
Expected: Clean build, no errors

- [ ] **Step 5: Commit foundation**

```bash
git add index.html src/index.css tailwind.config.js
git commit -m "feat: install Inter font and rewrite design tokens for minimal UI"
```

---

## Task 2: Layout — Navigation Bar

**Files:**
- Modify: `src/Layout.jsx`

**Depends on:** Task 1

- [ ] **Step 1: Read Layout.jsx fully**

Read the entire file to understand the current nav structure, mobile menu, and dark mode handling.

- [ ] **Step 2: Rewrite the navigation bar**

Apply these rules to the entire Layout.jsx:

**Logo area:**
- Remove the gradient background icon (`bg-gradient-to-br from-blue-500 to-blue-600`)
- Replace with text-only: `<span className="text-lg font-semibold text-foreground">AgileFlow</span>`
- No icon wrapper, no shadow-lg

**Nav items:**
- Remove `text-[#0073EA]` and all hardcoded hex colors
- Active state: `text-foreground font-medium` with a 2px bottom border using `border-b-2 border-foreground`
- Inactive: `text-muted-foreground hover:text-foreground transition-colors duration-150`
- No background color on active items (remove `bg-[#E1E5F3]`)

**Right-side icons:**
- Ghost buttons: `text-muted-foreground hover:text-foreground hover:bg-accent`
- Avatar: `bg-muted text-foreground` circle with initials, no gradient

**Nav bar container:**
- `bg-background border-b border-border` (remove hardcoded `bg-white`, `border-[#E1E5F3]`)
- Remove `shadow-sm` if present

**Page background:**
- Remove `bg-[#F5F6F8]` → use `bg-background`
- Remove any hardcoded dark mode colors → use `dark:bg-background` (automatic via CSS vars)

**Mobile menu:**
- Keep hamburger → sheet/drawer pattern
- Apply same token-based styling

- [ ] **Step 3: Remove all Framer Motion scale/rotate animations**

Keep only simple opacity + translateY entrance animations if they exist. Remove any `whileHover={{ scale: }}` or `whileHover={{ y: -N }}` where N > 2.

- [ ] **Step 4: Verify layout renders**

Run: `npm run dev` and check the nav visually (or `npm run build` for a build check).

- [ ] **Step 5: Commit**

```bash
git add src/Layout.jsx
git commit -m "feat: clean navigation bar with token-based styling"
```

---

## Task 3: Dashboard Page + Dashboard Components

**Files:**
- Modify: `src/pages/Dashboard.jsx`
- Modify: `src/components/dashboard/StatsOverview.jsx`
- Modify: `src/components/dashboard/ActivityFeed.jsx`
- Modify: `src/components/dashboard/RecentBoards.jsx`
- Modify: `src/components/dashboard/QuickActions.jsx`

**Depends on:** Task 1

- [ ] **Step 1: Read all 5 files**

- [ ] **Step 2: Overhaul Dashboard.jsx**

**Welcome/Hero section:**
- Remove `bg-gradient-to-br from-white via-white to-blue-50/30`
- Remove decorative absolute-positioned gradient circles
- Replace with: simple `<div className="space-y-1 mb-8">` with heading and subtitle
- Heading: `text-2xl font-semibold text-foreground`
- Subtitle: `text-sm text-muted-foreground`

**Buttons:**
- Remove `bg-[#0073EA]` → use shadcn `<Button>` default (which uses `bg-primary`)
- Remove `shadow-lg hover:shadow-xl`
- Remove `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`

**Grid layout:**
- Keep responsive grid: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4`
- Ensure `space-y-6` or `space-y-8` between sections

- [ ] **Step 3: Overhaul StatsOverview.jsx**

This is the worst offender. Complete rewrite of the stat card rendering:

**Remove entirely:**
- All gradient backgrounds (`bg-gradient-to-br from-blue-500 to-blue-600`, etc.)
- Floating particle animations (`motion.div` with `animate={{ y: [0, -10, 0] }}`)
- 3D perspective transforms (`rotateX`, `rotateY`)
- Scale-on-hover (`whileHover={{ scale: 1.05 }}`)
- Decorative circles (`bg-white/10 rounded-full`)
- `hover:shadow-2xl`, `shadow-lg`

**Replace with:**
```jsx
<div className="rounded-lg border border-border bg-card p-5">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
    <stat.icon className="h-4 w-4 text-muted-foreground" />
  </div>
  <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
  {stat.trend && (
    <p className={cn("mt-1 text-xs", stat.trend > 0 ? "text-green-500" : "text-red-500")}>
      {stat.trend > 0 ? "+" : ""}{stat.trend}% from last period
    </p>
  )}
</div>
```

- [ ] **Step 4: Overhaul ActivityFeed.jsx**

- Remove hardcoded green gradient for completed items
- Status indicators: small colored dot (6px circle) using semantic colors
  - Done: `bg-green-500`
  - Working: `bg-amber-500`
  - Stuck: `bg-red-500`
  - Default: `bg-muted-foreground`
- Activity text: `text-sm text-foreground`, timestamp: `text-xs text-muted-foreground`
- List items: `border-b border-border last:border-0 py-3`

- [ ] **Step 5: Overhaul RecentBoards.jsx**

- Board cards: `rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors duration-150`
- Remove any gradient overlays or shadow escalation
- Board name: `text-sm font-medium text-foreground`
- Meta info: `text-xs text-muted-foreground`

- [ ] **Step 6: Overhaul QuickActions.jsx**

- Action buttons: use shadcn `<Button variant="outline">` or secondary styling
- Remove hardcoded action colors
- Icons: `text-muted-foreground`, text: `text-sm font-medium`

- [ ] **Step 7: Verify build**

Run: `npm run build && npm run lint`

- [ ] **Step 8: Commit**

```bash
git add src/pages/Dashboard.jsx src/components/dashboard/
git commit -m "feat: overhaul dashboard with minimal card design, remove gradients and particles"
```

---

## Task 4: Login Page

**Files:**
- Modify: `src/pages/Login.jsx`

**Depends on:** Task 1

- [ ] **Step 1: Read Login.jsx**

- [ ] **Step 2: Overhaul Login page**

**Page background:**
- Remove `bg-gradient-to-br from-blue-50 to-indigo-100`
- Replace with `min-h-screen bg-background flex items-center justify-center p-4`

**Card:**
- Use shadcn `<Card>` with default styling (border, no shadow-xl)
- `<Card className="w-full max-w-sm">`
- Remove `shadow-xl`

**Form elements:**
- Use shadcn `<Input>`, `<Button>`, `<Label>` as-is
- Primary button: `<Button className="w-full">` (uses `bg-primary` from tokens)
- Remove any hardcoded `bg-[#0073EA]`

**Framer Motion:**
- Keep the initial page entrance animation (opacity + translateY) but simplify:
  - `initial={{ opacity: 0, y: 10 }}` (not y: 20)
  - `animate={{ opacity: 1, y: 0 }}`
  - `transition={{ duration: 0.2 }}` (not 0.5)

**Logo/Title:**
- "AgileFlow" in `text-xl font-semibold text-foreground`
- Subtitle in `text-sm text-muted-foreground`
- No icon with gradient background

- [ ] **Step 3: Verify build**

Run: `npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/pages/Login.jsx
git commit -m "feat: clean login page with minimal card design"
```

---

## Task 5: Board Pages + Board Components

**Files:**
- Modify: `src/pages/Board.jsx`
- Modify: `src/pages/Boards.jsx`
- Modify: `src/components/board/BoardHeader.jsx`
- Modify: `src/components/board/MainTable.jsx`
- Modify: `src/components/board/KanbanBoard.jsx`
- Modify: `src/components/board/cells/StatusCell.jsx`
- Modify: `src/components/board/cells/PriorityCell.jsx`
- Modify: `src/components/boards/CreateBoardModal.jsx`
- Modify: `src/components/board/automations/AutomationsModal.jsx`
- Modify: `src/components/board/analytics/EnhancedAnalyticsPanel.jsx`

**Depends on:** Task 1

- [ ] **Step 1: Read all board-related files**

Read Board.jsx, Boards.jsx, BoardHeader.jsx, MainTable.jsx, KanbanBoard.jsx to understand the full board rendering pipeline.

- [ ] **Step 2: Clean Boards.jsx (board listing page)**

- Board cards: `rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors duration-150`
- Remove gradient overlays, shadow escalation
- Board name: `text-sm font-medium text-foreground`
- Empty state: `text-muted-foreground`

- [ ] **Step 3: Clean Board.jsx (board detail page wrapper)**

- Remove any gradient page backgrounds
- Use `bg-background` for page container
- Keep the board content structure as-is

- [ ] **Step 4: Clean BoardHeader.jsx**

- Remove avatar gradient (`bg-gradient-to-br from-green-400 to-green-600` or similar)
- Avatar: `bg-muted text-muted-foreground` with initials
- Board title: `text-lg font-semibold text-foreground`
- Buttons: use shadcn Button variants (outline, ghost)
- Remove hardcoded `#0073EA`

- [ ] **Step 5: Clean MainTable.jsx**

- Header row: `bg-muted text-xs font-medium text-muted-foreground uppercase tracking-wider`
- Data rows: `border-b border-border hover:bg-accent/50 transition-colors duration-150`
- Remove hardcoded colors, add dark mode support throughout
- Ensure `overflow-x-auto` wrapper for mobile

- [ ] **Step 6: Clean KanbanBoard.jsx**

- Column background: `bg-muted/50 rounded-lg p-3`
- Column header: `text-sm font-medium text-foreground` with item count in `text-muted-foreground`
- Task cards: `bg-card border border-border rounded-md p-3 shadow-sm`
- Drag-over state: `bg-accent` (not a blue/green highlight)
- Remove any hardcoded blue/green focus states

- [ ] **Step 7: Clean StatusCell.jsx and PriorityCell.jsx**

Replace hardcoded hex color arrays with semantic token-based colors:

**Status colors:**
```jsx
const statusColors = {
  todo: { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-gray-400' },
  working: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  done: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  stuck: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};
```

**Priority colors:**
```jsx
const priorityColors = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  high: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  medium: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  low: { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-gray-400' },
};
```

Use Tailwind classes (which now map to our CSS variables) instead of inline hex.

- [ ] **Step 8: Clean CreateBoardModal.jsx**

- Remove hardcoded `#0073EA` buttons → use `<Button>`
- Form inputs: use shadcn `<Input>` defaults
- Dark mode: use token-based colors throughout

- [ ] **Step 9: Clean AutomationsModal.jsx**

- Remove hardcoded automation trigger colors
- Use semantic badge styling: `bg-muted text-foreground rounded-md px-2 py-1 text-xs`
- Active automations: `bg-green-50 text-green-700 border border-green-200`

- [ ] **Step 10: Clean EnhancedAnalyticsPanel.jsx**

- Chart container: `bg-card border border-border rounded-lg p-4`
- Recharts colors: use CSS variable values via `getComputedStyle`
- Remove gradient chart backgrounds
- Axis/grid: `stroke="hsl(var(--border))"` with dashed lines
- Tooltip: `bg-card border border-border shadow-sm rounded-md`

- [ ] **Step 11: Verify build and lint**

Run: `npm run build && npm run lint`

- [ ] **Step 12: Commit**

```bash
git add src/pages/Board.jsx src/pages/Boards.jsx src/components/board/ src/components/boards/
git commit -m "feat: overhaul board pages with clean table, kanban, and cell styling"
```

---

## Task 6: Backlog + Sprint Planning

**Files:**
- Modify: `src/pages/Backlog.jsx`
- Modify: `src/components/backlog/SprintPlanningModal.jsx`

**Depends on:** Task 1

- [ ] **Step 1: Read both files**

- [ ] **Step 2: Overhaul Backlog.jsx**

**Page header:**
- Remove any gradient background
- `text-2xl font-semibold text-foreground` for title
- Filter/action buttons: use shadcn `<Button variant="outline">`

**Stats cards (if present):**
- Same pattern as StatsOverview: `border border-border bg-card rounded-lg p-5`
- Remove colored gradient backgrounds
- Label: `text-sm text-muted-foreground`, value: `text-2xl font-semibold text-foreground`

**Story/item cards:**
- `border border-border bg-card rounded-md p-4 hover:bg-accent/50 transition-colors duration-150`
- Priority badge: use semantic colors (same as PriorityCell)
- Story points: `bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium`
- Remove drag-handle gradients if any

**Dark mode:**
- Ensure all elements use token-based colors that auto-switch

- [ ] **Step 3: Clean SprintPlanningModal.jsx**

- This is already mostly good (has dark mode)
- Replace any remaining hardcoded blue (`#0073EA`) with `<Button>` primary
- Capacity indicator bar: `bg-muted rounded-full` with fill using semantic colors
  - Under capacity: `bg-green-500`
  - Near capacity: `bg-amber-500`
  - Over capacity: `bg-red-500`

- [ ] **Step 4: Verify build**

Run: `npm run build && npm run lint`

- [ ] **Step 5: Commit**

```bash
git add src/pages/Backlog.jsx src/components/backlog/
git commit -m "feat: clean backlog page with token-based story cards and sprint planning"
```

---

## Task 7: Analytics Page

**Files:**
- Modify: `src/pages/Analytics.jsx`
- Modify: `src/components/utils/analytics.jsx` (only if it has UI elements)

**Depends on:** Task 1

- [ ] **Step 1: Read Analytics.jsx**

- [ ] **Step 2: Overhaul Analytics.jsx**

**Page header:**
- `text-2xl font-semibold text-foreground`
- Filter tabs/buttons: use shadcn `<Tabs>` or `<Button variant="outline">`
- Time range selector: shadcn `<Select>` with default styling

**KPI/Metric cards:**
- Same clean pattern: `border border-border bg-card rounded-lg p-5`
- Remove ALL gradient backgrounds on metric cards
- Label: `text-sm text-muted-foreground`
- Value: `text-2xl font-semibold text-foreground`
- Trend indicator: small text with semantic color

**Chart sections:**
- Container: `border border-border bg-card rounded-lg p-5`
- Section title: `text-sm font-medium text-foreground mb-4`
- Recharts config:
  - Use chart token colors: `hsl(var(--chart-1))` through `hsl(var(--chart-5))`
  - Grid: `stroke="hsl(var(--border))"` with `strokeDasharray="3 3"`
  - Tooltip: custom component with `bg-card border border-border shadow-sm rounded-md p-2`
  - Axis ticks: `fill="hsl(var(--muted-foreground))"` with `fontSize={12}`

**Remove:**
- All gradient chart container backgrounds
- Colored KPI card backgrounds
- Shadow escalation on hover

- [ ] **Step 3: Verify build**

Run: `npm run build && npm run lint`

- [ ] **Step 4: Commit**

```bash
git add src/pages/Analytics.jsx src/components/utils/analytics.jsx
git commit -m "feat: clean analytics with minimal chart containers and token-based colors"
```

---

## Task 8: Remaining Pages + Utility Components

**Files:**
- Modify: `src/pages/Calendar.jsx`
- Modify: `src/pages/Settings.jsx`
- Modify: `src/pages/Admin.jsx`
- Modify: `src/pages/Performance.jsx`
- Modify: `src/components/utils/AIAssistant.jsx`
- Modify: `src/components/common/ErrorBoundary.jsx`
- Modify: `src/components/common/LoadingState.jsx`
- Modify: `src/components/calendar/CreateEventModal.jsx`

**Depends on:** Task 1

- [ ] **Step 1: Read all files**

- [ ] **Step 2: Clean Calendar.jsx**

- Event color indicators: small colored dots or left-border accents
- Replace hardcoded hex event colors with semantic Tailwind classes
- Calendar grid: `border border-border` cells
- Today indicator: `bg-foreground text-background` (inverted) for the day number
- Dark mode support throughout

- [ ] **Step 3: Clean Settings.jsx**

- Form sections: `border border-border bg-card rounded-lg p-6 space-y-4`
- Section titles: `text-lg font-semibold text-foreground`
- Labels, inputs, buttons: use shadcn defaults
- Remove any hardcoded colors

- [ ] **Step 4: Clean Admin.jsx and Performance.jsx**

- Same card pattern throughout
- Tables: same as MainTable styling (bg-muted header, border-b rows)
- Remove gradients, hardcoded colors

- [ ] **Step 5: Overhaul AIAssistant.jsx**

**Floating button:**
- Remove gradient (`bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500`)
- Replace with: `bg-foreground text-background rounded-full w-12 h-12 shadow-sm hover:bg-foreground/90 transition-colors duration-150`
- Icon: `MessageCircle` from Lucide

**Chat panel:**
- Container: `bg-card border border-border rounded-lg shadow-sm`
- Header: `border-b border-border p-4`, title: `text-sm font-semibold text-foreground`
- Remove gradient header background
- Messages:
  - AI: `bg-muted rounded-lg p-3 text-sm`
  - User: `bg-foreground text-background rounded-lg p-3 text-sm`
- Input area: `border-t border-border p-3` with shadcn `<Input>` and `<Button>`

- [ ] **Step 6: Clean ErrorBoundary.jsx**

- Error container: `border border-red-200 bg-red-50 dark:bg-red-50 rounded-lg p-6 text-center`
- Error icon: `text-red-500`
- Error message: `text-sm text-red-700 dark:text-red-900`
- Retry button: `<Button variant="outline">`

- [ ] **Step 7: Clean LoadingState.jsx**

- Spinner: simple CSS spinner using `border-foreground border-t-transparent animate-spin rounded-full w-8 h-8 border-2`
- Text: `text-sm text-muted-foreground mt-3`
- Container: `flex flex-col items-center justify-center py-12`
- Remove hardcoded blue spinner color

- [ ] **Step 8: Clean CreateEventModal.jsx**

- Event type color pickers: use semantic color dots instead of full-gradient previews
- Form: shadcn defaults
- Buttons: shadcn defaults

- [ ] **Step 9: Verify entire build and lint**

Run: `npm run build && npm run lint`

- [ ] **Step 10: Commit**

```bash
git add src/pages/Calendar.jsx src/pages/Settings.jsx src/pages/Admin.jsx src/pages/Performance.jsx src/components/utils/AIAssistant.jsx src/components/common/ src/components/calendar/
git commit -m "feat: clean remaining pages and utility components"
```

---

## Task 9: Final Verification and Cleanup

**Depends on:** Tasks 2-8

- [ ] **Step 1: Full codebase search for banned patterns**

Search for any remaining anti-patterns:
- `bg-gradient-to` — should be zero results in feature components
- `shadow-2xl` or `shadow-xl` — should be zero
- `scale:` in motion props — should be zero (except if inside shadcn/ui)
- `#0073EA` or `#00C875` or `#E2445C` — should be zero outside CSS variable definitions
- `infinite` in animation — should be zero
- `repeat: Infinity` — should be zero

Fix any remaining instances.

- [ ] **Step 2: Final build and lint**

Run: `npm run build && npm run lint`
Expected: zero errors, zero warnings

- [ ] **Step 3: Commit any cleanup**

```bash
git add -A
git commit -m "chore: final cleanup of banned styling patterns"
```
