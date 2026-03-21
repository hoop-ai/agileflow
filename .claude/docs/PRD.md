# AgileFlow — Product Requirements Document (PRD)

> **Source**: Derived from the Bahçeşehir University Capstone Final Report — "Agile Project Management and AI-Based Collaboration Platform 2 #1011207" (Dec 2025), cross-referenced with the live codebase (React + Supabase SPA). Last updated: 2026-03-20.

---

## 1. Product Vision

AgileFlow is an all-in-one Agile project management platform that combines **task execution** (Kanban boards), **sprint planning** (backlog management), **scheduling** (calendar), and **data-driven analytics** into a single, intuitive web application. It targets small-to-medium engineering and academic teams who need Jira-level structure with Trello-level simplicity — no fragmented tooling, no enterprise pricing.

### Core Value Propositions
1. **Unified Workspace** — Dashboard-centric architecture; one source of truth for planning, execution, and reporting.
2. **Multi-View Flexibility** — Kanban, Table/List, Calendar, and Timeline views of the same data.
3. **Democratized Analytics** — Sprint velocity, completion rates, task churn, and performance distribution as core features (not premium add-ons).
4. **AI-Driven Assignment** — Intelligent task assignment engine using weighted formula: `Suitability = Competency × Availability × Performance`.
5. **Drag & Drop Execution** — Optimistic UI updates with < 100ms visual feedback.

---

## 2. Architecture Overview

### 2.1 Tech Stack (As Implemented)
| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + Vite 6 (SPA with CSR) |
| **Backend** | Supabase (`@supabase/supabase-js`) — PostgreSQL, Auth, Row Level Security |
| **AI** | OpenRouter API with cascading model fallback (GPT-4o-mini → Llama → Gemini → Haiku) |
| **Hosting** | Vercel (free tier, auto-deploys from GitHub) |
| **Routing** | React Router DOM v6 |
| **State/Data** | TanStack React Query v5, local `useState` |
| **UI Library** | Radix UI primitives + shadcn/ui (54 components in `src/components/ui/`) |
| **Styling** | Tailwind CSS 3 + `tailwind-merge` + `class-variance-authority` |
| **DnD** | `@hello-pangea/dnd` (maintained fork of react-beautiful-dnd) |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod validation |
| **Icons** | Lucide React |
| **Date Handling** | date-fns, React DatePicker |
| **Rich Text** | React Quill |
| **Maps** | React Leaflet |
| **Export** | HTML2Canvas + jsPDF |
| **Payments** | Stripe integration |

### 2.2 Architecture Pattern
- **Frontend-Only SPA** communicating with Supabase (PostgreSQL + Auth + RLS)
- **Supabase** handles: database (NoSQL document store), authentication (JWT-based), file storage, and server functions
- **Client-side rendering** with React Router for navigation without page reloads
- **Optimistic UI** pattern: update local state immediately, then sync via API with cache invalidation

### 2.3 Data Flow
```
User Action → Event Handler → Optimistic Local State Update
    → React Query Mutation (async API call to Supabase)
    → On success: cache invalidation + refetch
    → On failure: revert optimistic update + error toast
```

---

## 3. Data Model (Supabase Entities)

### 3.1 Core Entities

#### Board
The primary project container. Stores metadata, column definitions, group definitions, and board-level settings.
```
Board {
  id: string
  title: string
  description: string
  owner: string (user ID)
  columns: Array<{
    id: string
    title: string
    type: "status" | "priority" | "date" | "people" | "text" | "number" | "checkbox" | "dropdown" | "tags" | "budget"
    settings: object (options, colors, defaults)
  }>
  groups: Array<{
    id: string
    title: string
    color: string
  }>
  settings: object (board-level config)
  created_date: datetime
  updated_date: datetime
}
```

#### Item
Individual tasks/cards within a board. Uses a dynamic `data` object keyed by column IDs.
```
Item {
  id: string
  board_id: string (reference to Board)
  group_id: string (reference to Board.groups[].id)
  title: string
  data: object {
    [columnId]: value  // Dynamic — type depends on column definition
    // e.g., "col_status": "Done", "col_priority": "High", "col_date": "2025-12-15"
  }
  order: number (position within group)
  created_date: datetime
  updated_date: datetime
}
```

#### User
Application users managed by Supabase auth.
```
User {
  id: string
  full_name: string
  email: string
  avatar: string (URL)
  preferences: object (theme, settings)
  created_date: datetime
}
```

#### UserStory (Backlog)
Sprint-plannable user stories with story points and priority.
```
UserStory {
  id: string
  title: string
  description: string
  story_points: number
  priority: "critical" | "high" | "medium" | "low"
  status: "backlog" | "ready" | "active" | "done"
  sprint_id: string (reference to Sprint)
  board_id: string (reference to Board)
  created_date: datetime
  updated_date: datetime
}
```

#### Sprint
Sprint cycles for time-boxed iteration planning.
```
Sprint {
  id: string
  title: string
  goal: string
  start_date: datetime
  end_date: datetime
  capacity: number (max story points)
  status: "planning" | "active" | "completed"
  board_id: string (reference to Board)
  created_date: datetime
  updated_date: datetime
}
```

### 3.2 Entity API
```js
Entity.list(sortField?, limit?)   // List records (sorted, limited)
Entity.create(data)               // Create new record
Entity.update(id, data)           // Update by ID
Entity.delete(id)                 // Delete by ID
Entity.get(id)                    // Get single record

// Auth (via AuthContext)
User.me()                         // Current user profile
supabase.auth.signOut()           // Logout
// Login redirect handled by React Router
```

---

## 4. Features & Functional Requirements

### 4.1 Dashboard (Landing Page)
**Page**: `src/pages/Dashboard.jsx`
**Route**: `/` (default/main page)

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-D1 | Display greeting with user name and time-of-day context | ✅ Implemented |
| FR-D2 | Show KPI summary cards: Total Boards, Total Tasks, Completed Tasks, Pending Tasks | ✅ Implemented |
| FR-D3 | Display recent boards (up to 10, sorted by last updated) | ✅ Implemented |
| FR-D4 | Show activity feed with recent task/board changes | ✅ Implemented |
| FR-D5 | Quick action buttons: Create Board, View Analytics, Open Calendar | ✅ Implemented |
| FR-D6 | Invite team member modal | ✅ Implemented |
| FR-D7 | Dashboard loads within < 200ms (target) | ⬜ Needs perf testing |

**Components**: `StatsOverview`, `RecentBoards`, `ActivityFeed`, `QuickActions`, `CalendarModal`, `InviteTeamModal`

---

### 4.2 Board Management
**Page**: `src/pages/Boards.jsx`
**Route**: `/Boards`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-B1 | List all boards owned by or shared with current user | ✅ Implemented |
| FR-B2 | Create new board with title, description, and default columns | ✅ Implemented |
| FR-B3 | Edit board metadata (title, description) | ✅ Implemented |
| FR-B4 | Delete board (owner only — RBAC) | ✅ Implemented |
| FR-B5 | Board cards show title, description preview, member count, task count | ✅ Implemented |

**Components**: `BoardCard`, `CreateBoardModal`, `EditBoardModal`

---

### 4.3 Board Workspace (Core Feature)
**Page**: `src/pages/Board.jsx`
**Route**: `/Board?id=<boardId>`

#### 4.3.1 Views
| Requirement | Description | Status |
|------------|-------------|--------|
| FR-BW1 | **Kanban View** — Drag-and-drop task cards between status columns | ✅ Implemented |
| FR-BW2 | **Calendar View** — Date-based item layout | ✅ Implemented |
| FR-BW3 | **Timeline View** — Gantt-style horizontal timeline | ✅ Implemented |
| FR-BW4 | Switch between views seamlessly | ✅ Implemented |

**View Components**: `KanbanView`, `CalendarView`, `TimelineView`

#### 4.3.2 Column Types (Cell Renderers)
Each column type has a dedicated cell renderer in `src/components/board/cells/`:

| Column Type | Cell Component | Behavior |
|------------|----------------|----------|
| `status` | `StatusCell` | Dropdown with colored labels (e.g., To Do, In Progress, Done) |
| `priority` | `PriorityCell` | Priority badges (Critical, High, Medium, Low) |
| `date` | `DateCell` | Date picker with formatted display |
| `people` | `PeopleCell` | Avatar/assignee selector |
| `text` | `TextCell` | Inline text editing |
| `number` | `NumberCell` | Numeric input |
| `checkbox` | `CheckboxCell` | Boolean toggle |
| `dropdown` | `DropdownCell` | Custom dropdown options |
| `tags` | `TagsCell` | Multi-select tag chips |
| `budget` | `BudgetCell` | Currency-formatted numeric input |

#### 4.3.3 Board Operations
| Requirement | Description | Status |
|------------|-------------|--------|
| FR-BW5 | Add new columns with type selection | ✅ Implemented |
| FR-BW6 | Add new groups (row sections) | ✅ Implemented |
| FR-BW7 | Add new tasks/items to groups | ✅ Implemented |
| FR-BW8 | Edit task details via modal | ✅ Implemented |
| FR-BW9 | Filter items by any column value | ✅ Implemented |
| FR-BW10 | Sort items by any column | ✅ Implemented |
| FR-BW11 | Group items by column values | ✅ Implemented |
| FR-BW12 | Hide/show columns | ✅ Implemented |
| FR-BW13 | Filter by assigned person | ✅ Implemented |
| FR-BW14 | Group summary row with aggregations | ✅ Implemented |
| FR-BW15 | Drag-and-drop reordering (optimistic UI, < 100ms feedback) | ✅ Implemented |

**Components**: `BoardHeader`, `ColumnHeader`, `ItemRow`, `GroupSection`, `GroupSummary`, `GroupSummaryRow`, `FilterPanel`, `SortMenu`, `GroupByMenu`, `HideMenu`, `PersonFilter`, `NewColumnModal`, `NewGroupModal`, `NewTaskModal`, `TaskEditModal`

#### 4.3.4 Board Analytics
| Requirement | Description | Status |
|------------|-------------|--------|
| FR-BW16 | Board-level analytics panel with task distribution charts | ✅ Implemented |
| FR-BW17 | Enhanced analytics with detailed metrics | ✅ Implemented |

**Components**: `AnalyticsPanel`, `EnhancedAnalyticsPanel`

#### 4.3.5 Automations & Integrations
| Requirement | Description | Status |
|------------|-------------|--------|
| FR-BW18 | Automations panel for rule-based task actions | ✅ Implemented |
| FR-BW19 | Integrations panel for external service connections | ✅ Implemented |

**Components**: `AutomationsPanel`, `IntegrationsPanel`

---

### 4.4 Backlog & Sprint Management
**Page**: `src/pages/Backlog.jsx`
**Route**: `/Backlog`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-BL1 | Create user stories with title, description, story points, priority | ✅ Implemented |
| FR-BL2 | View backlog as prioritized list | ✅ Implemented |
| FR-BL3 | Filter/sort stories by priority, points, status | ✅ Implemented |
| FR-BL4 | Sprint planning: select stories and assign to sprint | ✅ Implemented |
| FR-BL5 | Sprint capacity validation (total points ≤ capacity, warn if exceeded) | ⬜ Needs verification |
| FR-BL6 | Prevent assigning stories to completed sprints | ⬜ Needs verification |
| FR-BL7 | View story details with full description | ✅ Implemented |
| FR-BL8 | Drag-and-drop story reordering | ✅ Implemented |

**Components**: `CreateStoryModal`, `StoryDetailModal`, `SprintPlanningModal`

**Business Rules**:
- Stories cannot be assigned to sprints marked "Completed" (preserves velocity accuracy)
- Sprint capacity warnings when total story points exceed defined limit
- Stories transition: Backlog → Ready → Active Sprint → Done

---

### 4.5 Calendar
**Page**: `src/pages/Calendar.jsx`
**Route**: `/Calendar`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-C1 | Monthly/weekly calendar grid view | ✅ Implemented |
| FR-C2 | Create calendar events with title, date, time, category | ✅ Implemented |
| FR-C3 | Event categories: Group Discussions, Due Dates, Evaluations | ✅ Implemented |
| FR-C4 | Display task due dates from boards on calendar | ✅ Implemented |

**Components**: `CreateEventModal`

---

### 4.6 Analytics Dashboard
**Page**: `src/pages/Analytics.jsx`
**Route**: `/Analytics`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-A1 | Filter analytics by board and time range | ✅ Implemented |
| FR-A2 | KPI cards: Total Tasks, Completed Tasks, Completion Rate, Overdue Tasks | ✅ Implemented |
| FR-A3 | Per-board performance comparison | ✅ Implemented |
| FR-A4 | Task status distribution chart (Recharts) | ✅ Implemented |
| FR-A5 | Sprint Velocity tracking (story points per sprint) | ⬜ Needs implementation |
| FR-A6 | Task Churn metric (tasks added/removed mid-sprint) | ⬜ Needs implementation |
| FR-A7 | Performance Distribution (workload per team member) | ⬜ Needs implementation |
| FR-A8 | Burn-down chart (remaining work over sprint duration) | ⬜ Needs implementation |
| FR-A9 | Analytics reports generated in < 800ms (up to 1,000 tasks) | ⬜ Needs perf testing |

**Key Metrics to Implement** (from Capstone requirements):
1. **Completion Rate** — `(completed tasks / total tasks) × 100`
2. **Sprint Velocity** — Total story points completed per sprint cycle
3. **Task Churn** — Net tasks added/removed during active sprint
4. **Performance Distribution** — Tasks completed per team member (bar/pie chart)
5. **Burn-down Chart** — Remaining story points vs. ideal line over sprint duration
6. **Overdue Items** — Tasks past due date that are not "Done"
7. **Board Performance** — Completion rate per board for cross-project comparison

---

### 4.7 Settings
**Page**: `src/pages/Settings.jsx`
**Route**: `/Settings`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-S1 | User profile editing (name, avatar) | ✅ Implemented |
| FR-S2 | Theme toggle (Light/Dark mode, class-based) | ✅ Implemented |
| FR-S3 | Integration settings | ✅ Implemented |

---

### 4.8 Performance Monitoring
**Page**: `src/pages/Performance.jsx`
**Route**: `/Performance`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-P1 | Admin-level performance monitoring dashboard | ✅ Implemented |

**Components**: `PerformanceMonitor`

---

### 4.9 AI Assistant
**Component**: `src/components/utils/AIAssistant.jsx`

| Requirement | Description | Status |
|------------|-------------|--------|
| FR-AI1 | AI chat assistant accessible from any page | ✅ Implemented |
| FR-AI2 | Intelligent Task Assignment Engine (Suitability = Competency × Availability × Performance) | ⬜ Needs implementation |
| FR-AI3 | AI-generated task assignment suggestions based on team skills/availability | ⬜ Needs implementation |
| FR-AI4 | AI-powered sprint planning recommendations | ⬜ Needs implementation |

**AI Assignment Formula** (from Capstone):
```
Suitability Score = w1 × Competency + w2 × Availability + w3 × Performance

Where:
- Competency: skill match for the task type (0-1)
- Availability: current workload inverse (0-1)
- Performance: historical completion rate and on-time delivery (0-1)
- w1, w2, w3: configurable weights (default: equal weighting)
```

---

## 5. Non-Functional Requirements

### 5.1 Performance
| ID | Requirement | Target |
|----|------------|--------|
| NFR-P1 | Dashboard Time-to-Interactive (TTI) | < 200ms |
| NFR-P2 | Drag-and-drop visual feedback (optimistic UI) | < 100ms |
| NFR-P3 | Analytics report generation | < 800ms (up to 1,000 tasks) |
| NFR-P4 | API response for standard read operations | Minimal delay |
| NFR-P5 | Auth token verification overhead | < 50ms per request |
| NFR-P6 | Concurrent users supported | ≥ 15 simultaneous |

### 5.2 Security
| ID | Requirement | Implementation |
|----|------------|---------------|
| NFR-S1 | JWT-based authentication on all protected routes | Supabase auth |
| NFR-S2 | Unauthenticated users auto-redirect to login | AuthContext + route guards |
| NFR-S3 | HTTPS encryption for all data in transit | Supabase infrastructure |
| NFR-S4 | Input validation/sanitization (prevent injection) | Zod + server-side via Supabase |
| NFR-S5 | Role-Based Access Control (RBAC) | Owner/Member permissions on boards |
| NFR-S6 | Password hashing (never return passwords in API) | Supabase auth layer |

### 5.3 Usability
| ID | Requirement |
|----|------------|
| NFR-U1 | Responsive design: mobile, tablet, desktop (Tailwind breakpoints) |
| NFR-U2 | Dark mode support on all components (`dark:` Tailwind classes) |
| NFR-U3 | Consistent color palette (Monday.com-inspired) |
| NFR-U4 | Accessible UI (Radix UI provides ARIA compliance) |
| NFR-U5 | Error messages for API failures (no silent crashes) |
| NFR-U6 | Loading states for all async operations |

### 5.4 Data Integrity
| ID | Requirement |
|----|------------|
| NFR-D1 | Form inputs validate data types before persistence |
| NFR-D2 | Sprint logic enforcement: no stories assigned to completed sprints |
| NFR-D3 | Account singularity: one email per account |
| NFR-D4 | Automatic database backups (Supabase managed) |

---

## 6. UI/UX Design System

### 6.1 Brand Colors
| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Primary | `#0073EA` | `blue-400` |
| Secondary | `#2563EB` | `blue-500` |
| Success | `#00C875` | `green-400` |
| Background | `#F5F6F8` | `gray-900` |
| Surface | `white` | `gray-800` |
| Border | `#E1E5F3` | `gray-700` |
| Text Primary | `#323338` | `white` |
| Text Secondary | `#676879` | `gray-400` |

### 6.2 Component Library
- **54 shadcn/ui primitives** in `src/components/ui/` — auto-generated, DO NOT manually edit
- Conditional classes via `cn()` from `@/lib/utils`
- All custom components must include `dark:` Tailwind variants

### 6.3 Layout Structure
- `src/Layout.jsx` — Global wrapper with sticky navbar, sidebar navigation, theme toggle
- Navigation: Dashboard, Boards, Backlog, Calendar, Analytics
- User menu with profile and logout
- Responsive: collapsible sidebar on mobile

---

## 7. Project Structure

```
src/
├── api/                          # Supabase client + entity services
│   ├── supabaseClient.js
│   ├── openrouter.js
│   └── entities/                 # CRUD service layer
├── components/
│   ├── ui/                       # 54 shadcn/ui primitives (DO NOT EDIT)
│   ├── board/                    # Board workspace (32 components)
│   │   ├── cells/                # 10 cell type renderers
│   │   ├── views/                # Kanban, Calendar, Timeline
│   │   ├── analytics/            # Board-level analytics panels
│   │   ├── automations/          # Rule-based automations
│   │   └── integrations/         # External service integrations
│   ├── boards/                   # Board listing (3 components)
│   ├── backlog/                  # Sprint/story management (3 modals)
│   ├── calendar/                 # Calendar events
│   ├── dashboard/                # Dashboard widgets (6 components)
│   ├── common/                   # ErrorBoundary, LoadingState
│   ├── admin/                    # PerformanceMonitor
│   └── utils/                    # ThemeProvider, AIAssistant, analytics, performance, security
├── hooks/                        # Custom hooks
├── lib/                          # AuthContext, utils, query-client, app-params, PageNotFound
├── pages/                        # 8 page components (auto-registered)
├── utils/                        # createPageUrl utility
├── App.jsx                       # Root component
├── Layout.jsx                    # Global layout wrapper
├── main.jsx                      # Entry point
├── pages.config.js               # Page routing (auto-generated, only edit mainPage)
└── index.css                     # Global Tailwind styles
```

---

## 8. Use Cases

### UC-1: Manage Sprint Backlog
| Field | Value |
|-------|-------|
| **Actors** | Project Manager, System |
| **Pre-condition** | User authenticated; Project Board exists |
| **Post-condition** | Selected stories moved from "Backlog" to "Active Sprint" |
| **Normal Flow** | 1. Navigate to Backlog view → 2. Click "Create Story" (title, points, priority) → 3. System saves to backlog → 4. Select stories + "Plan Sprint" → 5. System validates capacity → 6. Stories assigned to sprint |
| **Alt Flow** | 5a: Points exceed capacity → Warning toast → User removes story or overrides |

### UC-2: Execute Task (Drag & Drop)
| Field | Value |
|-------|-------|
| **Actors** | Team Member, System |
| **Pre-condition** | User logged in, viewing active Board |
| **Post-condition** | Task status updated in database, visible to all |
| **Normal Flow** | 1. Drag task card to new column → 2. UI updates immediately (optimistic) → 3. API request sent → 4. Backend validates + persists → 5. Success confirmation |
| **Alt Flow** | 4a: Permission denied → Card reverts to original column → Error toast |

### UC-3: Sprint Capacity Planning
| Field | Value |
|-------|-------|
| **Actors** | Project Manager, System |
| **Pre-condition** | Active Sprint exists with defined story point limit |
| **Post-condition** | Stories assigned to Sprint in database |
| **Normal Flow** | 1. Select stories from backlog → 2. "Add to Sprint" → 3. Calculate total points → 4. Validate (total + current ≤ capacity) → 5. Assign |
| **Alt Flow** | 4a: Capacity exceeded → HTTP 409 + warning toast |

### UC-4: Authenticate User
| Field | Value |
|-------|-------|
| **Actors** | User, System |
| **Pre-condition** | User has registered account |
| **Post-condition** | Valid JWT returned to client |
| **Normal Flow** | 1. POST credentials → 2. Query user by email → 3. Verify password hash → 4. Generate JWT → 5. Return HTTP 200 + token |
| **Alt Flow** | 3a: Password mismatch → HTTP 401 Unauthorized |

---

## 9. Implementation Priorities

### Phase 1 — Core Platform (✅ Complete)
- [x] Dashboard with KPI cards, recent boards, activity feed
- [x] Board CRUD (create, edit, delete, list)
- [x] Board workspace with Kanban view and drag-and-drop
- [x] 10 column types with cell renderers
- [x] Multi-view: Kanban, Calendar, Timeline
- [x] Filtering, sorting, grouping, column hiding
- [x] Task create/edit modals
- [x] User authentication via Supabase
- [x] Dark mode support
- [x] Responsive layout

### Phase 2 — Agile Workflow (✅ Mostly Complete)
- [x] Backlog page with story management
- [x] Sprint planning modal
- [x] Calendar page with event creation
- [x] Board-level analytics panels
- [x] Automations and integrations panels
- [x] Sprint capacity enforcement (validate story points ≤ capacity, warning + override flow)
- [x] Sprint completion logic (prevent story assignment to completed sprints)

### Phase 3 — Advanced Analytics (⬜ Needs Work)
- [x] Basic analytics page with completion rate and overdue tracking
- [ ] Sprint Velocity chart (story points per sprint over time)
- [ ] Task Churn metric
- [ ] Burn-down chart
- [ ] Performance Distribution (workload by team member)
- [ ] Historical sprint comparison
- [ ] Analytics export (PDF/CSV)

### Phase 4 — AI Intelligence (⬜ Needs Work)
- [x] AI Assistant component (chat interface)
- [ ] Intelligent Task Assignment Engine (weighted formula)
- [ ] AI-suggested sprint composition
- [ ] Bottleneck prediction / workload alerts
- [ ] AI-generated status summaries

### Phase 5 — Polish & Performance
- [ ] Performance audit against NFR targets
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Accessibility audit
- [ ] Error handling hardening
- [ ] Loading state consistency
- [ ] Mobile responsiveness polish

---

## 10. Acceptance Criteria Summary

| Category | Criterion | Target |
|----------|----------|--------|
| **Functional** | All CRUD operations pass for Boards, Items, Stories, Sprints | 100% pass rate |
| **Drag & Drop** | Task status updates via DnD with optimistic UI | < 100ms visual feedback |
| **Analytics** | Dashboard metrics accurate with live data | Verified against manual count |
| **Sprint Logic** | Cannot assign to completed sprints | Enforced server-side |
| **Security** | Protected routes reject invalid/expired/missing tokens | HTTP 401 returned |
| **Performance** | Dashboard TTI | < 200ms |
| **Performance** | Analytics generation (1,000 tasks) | < 800ms |
| **Concurrency** | 15 simultaneous users | No data integrity loss |
| **Responsive** | Layouts correct on mobile, tablet, desktop | No breaks or overlaps |
| **Dark Mode** | All components styled for dark theme | Visual pass |

---

## 11. Glossary

| Term | Definition |
|------|-----------|
| **SPA** | Single Page Application — loads once, dynamically updates via JS |
| **CSR** | Client-Side Rendering — UI rendered in browser, not server |
| **JWT** | JSON Web Token — stateless authentication token |
| **RBAC** | Role-Based Access Control — permissions based on user role |
| **Optimistic UI** | Update UI before server confirmation for perceived speed |
| **Story Points** | Numeric effort estimate for user stories |
| **Sprint Velocity** | Total story points completed per sprint |
| **Task Churn** | Net tasks added/removed during active sprint |
| **Burn-down Chart** | Visual of remaining work vs. time in a sprint |
| **AHP** | Analytic Hierarchy Process — multi-criteria decision method used to prioritize features |
| **Supabase** | Backend-as-a-service platform providing entities, auth, and server functions |
| **shadcn/ui** | Component library built on Radix UI primitives with Tailwind styling |

---

## 12. References

- Capstone Report: `.claude/docs/Copy of CapstoneReportTemplate_updated.md`
- Entity Services: `src/api/entities/`
- Component Patterns: `.claude/docs/component-patterns.md`
- Project CLAUDE.md: `./CLAUDE.md`
- Subagent Guides: `.claude/agents/`
