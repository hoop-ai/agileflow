# AgileFlow: Capstone 1 to Capstone 2 Changelog

**Project:** Agile Project Management and AI-Based Collaboration Platform 2 #1011207
**Team:** Maria Alftaih, Berra Gungor, Khalid Hajjo Rifai, Mohammad Houjeirat, Duygu Kaya, Abdul Rahman Malak, Sakir Taha Son
**Advisors:** Prof. Dr. Gul Temur (Management Engineering), Dr. Derya Bodur (Software Engineering)
**Capstone 1:** December 2025 (Planning & Design Phase)
**Capstone 2:** March 2026 (Development & Implementation Phase)
**Document Date:** March 22, 2026

---

## Purpose

This document records every significant change between the Capstone 1 report (Dec 2025), which described the planned system architecture, and the Capstone 2 deliverable (Mar 2026), which is the implemented, deployed application. Changes are organized by category: architecture, database, frontend, security, features, infrastructure, and testing.

---

## 1. Architecture Changes

| Area | Capstone 1 (Planned) | Capstone 2 (Implemented) | Rationale |
|------|----------------------|--------------------------|-----------|
| **Database** | NoSQL / MongoDB with sharding (Shard 1-3) | Supabase PostgreSQL with JSONB columns | PostgreSQL provides relational integrity while JSONB preserves the document-style flexibility originally desired. Supabase offers a managed PostgreSQL instance with built-in auth, eliminating the need to self-host MongoDB. |
| **Backend** | Node.js REST API server with dedicated service layers (User & Role Service, Board & Project Service, Backlog & Task Service, Sprint Management Service, Analytics & Reporting Service, Calendar & Event Service, AI Task Assignment Service) | Serverless / no backend server. Frontend connects directly to Supabase via `@supabase/supabase-js` SDK. Entity service layer in `src/api/entities/` replaces backend controllers. | Supabase provides REST and real-time APIs out of the box. Eliminating a separate backend server reduced complexity, hosting costs, and deployment surface area. Row Level Security (RLS) replaces server-side authorization middleware. |
| **Authentication** | Custom JWT middleware on Node.js API Gateway; manual password hashing; token verification on every protected route | Supabase Auth with automatic JWT issuance, session management, password hashing, and cookie-based token refresh | Supabase Auth handles the entire auth lifecycle (signup, login, session refresh, password reset) with zero custom backend code. JWTs are still used internally but managed automatically. |
| **API Gateway** | Dedicated API Gateway component with rate limiting and routing to backend services | Not needed. Supabase's built-in PostgREST layer serves as the API. React Query handles caching and request deduplication on the client. | The planned API Gateway was designed for a multi-service backend. With Supabase as the single backend, PostgREST fulfills this role. |
| **Hosting** | Generic "cloud hosting" with CDN for static assets | Vercel (free tier) with automatic deployments from GitHub `main` branch. Production URL: `https://agileflow-one.vercel.app` | Vercel provides zero-config React/Vite deployments, global CDN, and automatic HTTPS. Free tier is sufficient for the capstone scope. |
| **Language** | TypeScript (enforced static typing, compile-time error checking) | JavaScript (ES2022+) | The team prioritized development speed over static typing. TypeScript can be incrementally adopted in future phases. Zod validation at form boundaries provides runtime type safety where it matters most. |
| **AI Service** | Generic "AI service" (Google Gemini or OpenAI GPT-5); AI Task Assignment Service as a backend microservice; Event Bus for async AI processing | OpenRouter API with 4-model cascading fallback (GPT-4o-mini -> Llama 3.3 -> Gemini Flash -> Claude Haiku). Client-side integration via `src/api/openrouter.js`. | OpenRouter provides a single API endpoint with access to multiple models. Cascading fallback ensures availability even when free-tier models are rate-limited. No backend service or Event Bus needed since AI calls are made directly from the client. |
| **Caching** | Redis caching layer to minimize redundant database queries | React Query (TanStack Query v5) client-side cache with configurable stale times and background refetching | Client-side caching via React Query eliminates the need for a server-side Redis layer. Query invalidation on mutations keeps data fresh. |
| **Event Bus / Message Broker** | Event Bus for asynchronous processing of AI suggestions and analytics aggregation | Not implemented; not needed | The planned Event Bus was designed for a multi-service backend architecture. With a client-side SPA connecting directly to Supabase, asynchronous processing is handled by React Query mutations and background refetching. |
| **File Storage** | AWS S3 or Firebase Storage for binary files (attachments, exports) | Not yet implemented | File upload functionality is deferred to a future phase. The database stores all current data; no binary file uploads are supported yet. |

---

## 2. Database Changes

### 2.1 Schema Scope

| Capstone 1 (Planned) | Capstone 2 (Implemented) |
|-----------------------|--------------------------|
| 2 collections: **Users** and **Boards** (with nested tasks, sprints, stories as sub-documents) | **10 relational tables**: `profiles`, `boards`, `items`, `calendar_events`, `user_stories`, `sprints`, `notifications`, `team_members`, `user_preferences`, `activity_log` |

### 2.2 New Tables (Not in Cap1)

| Table | Purpose |
|-------|---------|
| `team_members` | Tracks board membership with roles (owner, member). Enables team invite functionality. |
| `notifications` | In-app notification system for board events and updates. |
| `user_preferences` | Per-user settings: due date reminders, sprint update frequency, notification toggles, display preferences, timezone, working hours. |
| `activity_log` | Audit trail tracking user actions (create, update, delete) with entity references and metadata. |

### 2.3 Row Level Security (RLS)

Capstone 1 described authorization at the API middleware level (JWT verification before routing to services). Capstone 2 implements authorization at the database level:

- **All 10 tables** have RLS policies enabled.
- Every policy uses `auth.uid()` to scope data access to the authenticated user.
- Entity services in `src/api/entities/` provide a second layer of auth verification (defense in depth).
- No data can be read or written without a valid Supabase session, even if the client code is bypassed.

### 2.4 JSONB Flexibility

To preserve the document-style flexibility originally planned with MongoDB, several columns use PostgreSQL's `JSONB` type:

| Column | Table | Purpose |
|--------|-------|---------|
| `columns` | `boards` | Array of column definitions (id, title, type, settings). Allows unlimited custom column types without schema migrations. |
| `groups` | `boards` | Array of group definitions (id, title, color). Groups are row sections within a board. |
| `settings` | `boards` | Board-level configuration (view preferences, automations, integrations). |
| `data` | `items` | Dynamic key-value store for task data, keyed by column IDs. Each item stores values for all board columns. |
| `settings` | `profiles` | User-specific settings stored as flexible JSON. |

### 2.5 Auto-Profile Creation

A PostgreSQL trigger (`handle_new_user`) automatically creates a `profiles` row when a new user signs up through Supabase Auth, eliminating the need for a separate user-creation endpoint.

---

## 3. Frontend Changes

### 3.1 Component Library

| Metric | Count |
|--------|-------|
| shadcn/ui primitives (`src/components/ui/`) | 54 components |
| Board workspace components (`src/components/board/`) | 32 components |
| Cell type renderers (`src/components/board/cells/`) | 10 renderers |
| Board views (`src/components/board/views/`) | 3 views (Kanban, Calendar, Timeline) |
| Dashboard widgets (`src/components/dashboard/`) | 6 components |
| Backlog/sprint components (`src/components/backlog/`) | 3 modals |
| Total pages | 11 (Dashboard, Boards, Board, Backlog, Calendar, Analytics, Settings, Performance, Admin, Help, Login) |

### 3.2 UI/UX Enhancements (Not in Cap1)

- **Dark mode**: Full dark theme support via ThemeProvider context. Every component includes `dark:` Tailwind CSS variants. Toggle available in Settings page.
- **Toast notifications**: Replaced silent `console.error` calls with user-facing toast notifications across all 8 main pages (~25 catch blocks updated).
- **Error boundary**: `ErrorBoundary` component at application root catches unhandled React errors and displays a recovery UI instead of a blank screen.
- **Loading states**: Every async data fetch displays a spinner or skeleton, ensuring no blank screens during network requests.
- **Empty states**: Every list and grid component handles zero items with descriptive messaging and call-to-action buttons.
- **Responsive layout**: Collapsible sidebar on mobile viewports, responsive grid layouts throughout.

### 3.3 Board Workspace Features

The Cap1 report described a Kanban board with drag-and-drop. The implementation significantly exceeds that scope:

- **10 column types**: Status, Priority, Date, People, Text, Number, Checkbox, Dropdown, Tags, Budget -- each with a dedicated cell renderer.
- **3 board views**: Kanban (drag-and-drop cards), Calendar (date-based layout), Timeline (Gantt-style horizontal view).
- **Filtering**: Filter items by any column value, with multi-criteria support.
- **Sorting**: Sort by any column, ascending or descending.
- **Grouping**: Group items by column values (e.g., group by status, priority, assignee).
- **Column management**: Add, remove, reorder, hide/show columns.
- **Group management**: Add groups with custom colors, collapse/expand groups.
- **Board analytics panel**: Inline task distribution charts without leaving the board.
- **Board automations panel**: Rule-based task automation interface.
- **Board integrations panel**: External service connection interface.

---

## 4. Security Changes

| Area | Capstone 1 (Planned) | Capstone 2 (Implemented) |
|------|----------------------|--------------------------|
| **Auth mechanism** | Custom JWT middleware on backend API | Supabase Auth (automatic JWT, sessions, cookie-based refresh) |
| **Route protection** | Described as "unauthenticated redirection" | Implemented: all routes check `isAuthenticated` via AuthContext; unauthenticated users redirected to `/login` |
| **Session expiry** | Not explicitly addressed | Implemented: `supabaseClient.js` detects expired tokens, triggers auto-redirect to login. `SessionExpired` component distinguishes expired sessions from first-time visitors. |
| **Data authorization** | JWT verification at API middleware | Two layers: (1) RLS policies at database level with `auth.uid()` scoping, (2) Entity services verify auth and filter by `user_id` at the application level |
| **Password security** | "Secure user-management functions" | Supabase Auth handles password hashing (bcrypt), never returns passwords in API responses, enforces minimum password requirements |
| **RBAC** | Planned owner/member permissions | Implemented via `team_members` table with `role` column (owner, member). Board deletion restricted to owners. |
| **Input validation** | "Schema validation and cleansing" | Zod validation on form inputs; Supabase server-side type checking on persistence |
| **HTTPS** | Planned via CDN | Automatic via Supabase infrastructure and Vercel hosting |

---

## 5. Features Added (Not in Capstone 1)

These features were not described in the Cap1 report but were implemented based on development needs:

| Feature | Description | Location |
|---------|-------------|----------|
| **Team member invites** | Search existing users by email, add to board with role assignment (owner/member). Previously a fake implementation (console.log + setTimeout); now functional. | `InviteTeamModal` component, `team_members` table |
| **Activity logging** | Tracks user actions (create, update, delete) with entity references, timestamps, and metadata. | `activity_log` table, `ActivityLog` entity service |
| **User preferences system** | Granular notification settings, due date reminders, sprint update frequency, display preferences, timezone, working hours. | `user_preferences` table, `UserPreferences` entity service |
| **Performance monitoring** | Admin-level page showing application performance metrics. | `src/pages/Performance.jsx`, `PerformanceMonitor` component |
| **Board-level analytics** | Inline analytics panels on the board workspace showing task distribution charts. | `AnalyticsPanel`, `EnhancedAnalyticsPanel` components |
| **Board automations** | Rule-based automation interface for board-level task actions. | `AutomationsPanel` component |
| **Board integrations** | External service connection interface at the board level. | `IntegrationsPanel` component |
| **AI chat assistant** | Conversational AI assistant accessible from any page, powered by OpenRouter with 4-model cascading fallback. | `AIAssistant` component, `openrouter.js` client |

---

## 6. Infrastructure Changes

### 6.1 Repository

| Aspect | Before | After |
|--------|--------|-------|
| **Repository** | Forked from `project-management-system` | Standalone `hoop-ai/agileflow` (fork relationship removed) |
| **Platform** | Originally built on Base44 (proprietary BaaS) | Fully migrated to Supabase (open-source BaaS) |
| **Branch strategy** | Not defined | Single `main` branch; all work committed directly to main |

### 6.2 Deployment Pipeline

```
Developer pushes to main branch on GitHub
    -> Vercel detects push
    -> Vercel runs `npm run build` (Vite production build)
    -> Build artifacts deployed to Vercel CDN
    -> Production URL updated: https://agileflow-one.vercel.app
```

- Auto-deploy on every push to `main`.
- Environment variables configured on Vercel: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_OPENROUTER_API_KEY`.
- Supabase project: `kgpzvkgtrfrqrksvmvxk` at `https://kgpzvkgtrfrqrksvmvxk.supabase.co`.

### 6.3 Environment Configuration

```
.env.local (local development)
    VITE_SUPABASE_URL=<supabase-project-url>
    VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
    VITE_OPENROUTER_API_KEY=<openrouter-api-key>
```

---

## 7. Testing Infrastructure (New in Cap2)

Capstone 1 mentioned "Testing & Validation" as a project phase but did not specify tooling or test architecture. Capstone 2 includes a full testing infrastructure:

| Test Type | Tool | Location | Purpose |
|-----------|------|----------|---------|
| **Unit tests** | Vitest + Testing Library | `tests/unit/` | Entity service logic, utility functions, component rendering |
| **End-to-end tests** | Playwright | `tests/e2e/` | Full user workflow testing (board creation, sprint planning, etc.) |
| **Accessibility audits** | axe-core + Playwright | `tests/accessibility/` | WCAG 2.1 AA compliance auditing across all pages |
| **Responsive tests** | Playwright viewports | `tests/responsive/` | Mobile, tablet, desktop breakpoint verification |
| **Workflow documentation** | Markdown guides | `tests/workflows/` | Step-by-step procedures for feature verification, regression testing, accessibility audits, performance audits |

### Supporting Documents

- **Software Verification Plan (SVP)**: `.claude/docs/verification-plan.md` -- Functional test cases for every feature, security checks, cross-cutting concerns.
- **Software Validation Plan (SVaP)**: `.claude/docs/validation-plan.md` -- Performance targets, responsive design checks, accessibility requirements, browser compatibility, acceptance criteria.

---

## 8. Dependency Changes

### 8.1 Key Libraries Added (Not in Cap1 Plan)

| Library | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Supabase client SDK (replaces planned Node.js backend) |
| `@hello-pangea/dnd` | Maintained fork of react-beautiful-dnd for drag-and-drop |
| `@tanstack/react-query` v5 | Server state management with caching (replaces planned Redis) |
| `@radix-ui/*` | Accessible UI primitives (foundation for shadcn/ui) |
| `class-variance-authority` | Component variant management for shadcn/ui |
| `tailwind-merge` | Intelligent Tailwind class merging |
| `react-hook-form` + `zod` | Form management with runtime schema validation |
| `html2canvas` + `jspdf` | PDF export capability (installed but not yet wired up) |
| `lucide-react` | Icon library |
| `date-fns` | Date formatting and manipulation |
| `framer-motion` | Animation library |
| `recharts` | Charting library (was in Cap1 plan) |

### 8.2 Planned but Not Used

| Planned Technology | Reason Not Used |
|--------------------|-----------------|
| MongoDB | Replaced by Supabase PostgreSQL |
| Express.js / Node.js backend | Replaced by direct Supabase SDK calls |
| Redis | Client-side caching via React Query suffices |
| AWS S3 / Firebase Storage | File uploads not yet implemented |
| TypeScript | JavaScript used instead for development speed |

---

## 9. Migration Events

### March 20, 2026: Base44 to Supabase Migration

The application was originally built on Base44, a proprietary Backend-as-a-Service platform. On March 20, 2026, the entire platform was migrated to Supabase:

- All entity services rewritten to use `@supabase/supabase-js`.
- Auth migrated from Base44 auth to Supabase email/password auth.
- OpenRouter integration connected for AI assistant.
- All Base44 references removed from code, comments, and documentation.

### March 21, 2026: Security Overhaul & Deployment

Following the migration, a comprehensive security and infrastructure pass was completed:

- Route protection, session expiry handling, and entity service hardening.
- Database schema patched with missing columns, new tables (`user_preferences`, `activity_log`).
- RLS policies verified on all 10 tables.
- Toast notifications replaced silent error handling across 8 pages.
- Repository migrated from fork to standalone `hoop-ai/agileflow`.
- Vercel deployment configured with auto-deploy pipeline.

---

## 10. Summary of Deviations from Capstone 1

| Cap1 Promise | Cap2 Reality | Impact |
|--------------|--------------|--------|
| NoSQL/MongoDB | PostgreSQL + JSONB | Positive: better integrity, built-in auth, RLS |
| Node.js REST API | Serverless (no backend) | Positive: less code, lower cost, faster development |
| TypeScript | JavaScript | Neutral: faster development, less compile-time safety |
| Custom JWT middleware | Supabase Auth | Positive: zero custom auth code, more secure |
| Redis caching | React Query client cache | Positive: simpler architecture, no server to manage |
| Event Bus / Message Broker | Not needed | Positive: simpler architecture |
| AI Task Assignment Engine | Conversational AI chat only | Negative: AI cannot execute actions on the platform |
| File attachments (S3/Firebase) | Not implemented | Negative: file uploads not available |
| Sprint Velocity chart | Not implemented | Negative: analytics gap |
| Burn-down chart | Not implemented | Negative: analytics gap |
| Task Churn metric | Not implemented | Negative: analytics gap |
| Performance Distribution chart | Not implemented | Negative: analytics gap |
| Real-time collaboration | Not implemented | Negative: no live multi-user updates |

---

*This document was prepared by the AgileFlow development team for the Capstone 2 submission, March 2026.*
