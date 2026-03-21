# Component Patterns Reference

## shadcn/ui Usage
All UI primitives live in `src/components/ui/`. They are generated — do not edit directly.
Import: `import { Button } from "@/components/ui/button"`

## Conditional Classes
```jsx
import { cn } from "@/lib/utils";
<div className={cn("base-class", isActive && "active-class", variant === "primary" ? "text-blue" : "text-gray")} />
```

## Dark Mode
Every visual component must include `dark:` Tailwind variants.
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
```

## Brand Color Palette
| Token | Light | Dark |
|-------|-------|------|
| Primary | `#0073EA` / `bg-[#0073EA]` | `blue-400` |
| Secondary | `#2563EB` | `blue-500` |
| Success | `#00C875` | `green-400` |
| Background | `#F5F6F8` | `gray-900` |
| Surface | `white` | `gray-800` |
| Border | `#E1E5F3` | `gray-700` |
| Text primary | `#323338` | `white` |
| Text secondary | `#676879` | `gray-400` |

## Board Cell Components
Located in `src/components/board/cells/`. Each cell handles a specific column type:
- `StatusCell` — dropdown with colored labels
- `PriorityCell` — priority badges
- `DateCell` — date picker
- `PeopleCell` — avatar/assignee selector
- `TagsCell` — multi-select tags
- `TextCell`, `NumberCell`, `CheckboxCell`, `BudgetCell`, `DropdownCell`

## Board Views
- `KanbanView` — drag-and-drop card columns
- `CalendarView` — date-based item layout
- `TimelineView` — Gantt-style timeline

## Modal Pattern
Use Radix Dialog via shadcn:
```jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
```

## Loading States
Use `src/components/common/LoadingState.jsx` for consistent loading UX.
Use `src/components/common/ErrorBoundary.jsx` to wrap feature sections.
