# AgileFlow - Project Management System

## Overview
React + Vite project management app (Monday.com-style) built on **Supabase** (PostgreSQL + Auth). Features Kanban boards, sprints, backlog management, analytics, calendar, and an AI assistant powered by OpenRouter.

## Product Requirements
See `.claude/docs/PRD.md` for the full PRD — feature specs, data models, use cases, acceptance criteria, and implementation priorities. Derived from the Capstone Report (`.claude/docs/Copy of CapstoneReportTemplate_updated.md`).

## Tech Stack
- **Framework**: React 18 + Vite 6
- **Backend**: Supabase (`@supabase/supabase-js`) — PostgreSQL, Auth, Row Level Security
- **AI**: OpenRouter API with cascading model fallback (GPT-4o-mini → Llama → Gemini → Haiku)
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query v5, local `useState`
- **UI**: Radix UI primitives + shadcn/ui components (`src/components/ui/`)
- **Styling**: Tailwind CSS 3 + `tailwind-merge` + `class-variance-authority`
- **DnD**: `@hello-pangea/dnd` (maintained fork of react-beautiful-dnd)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Hosting**: Vercel (free tier)

## Project Structure
```
src/
├── api/
│   ├── supabaseClient.js  # Supabase client initialization
│   ├── openrouter.js      # OpenRouter LLM client with model fallback
│   └── entities/          # Entity service layer (CRUD operations)
│       ├── Board.js
│       ├── Item.js
│       ├── User.js
│       ├── CalendarEvent.js
│       ├── UserStory.js
│       ├── Sprint.js
│       └── index.js
├── components/
│   ├── ui/           # shadcn/ui primitives (DO NOT manually edit)
│   ├── board/        # Board page components (cells/, views/, analytics/, automations/, integrations/)
│   ├── boards/       # Board listing components
│   ├── backlog/      # Sprint/story components
│   ├── calendar/     # Calendar event components
│   ├── dashboard/    # Dashboard widgets
│   ├── common/       # ErrorBoundary, LoadingState
│   ├── admin/        # PerformanceMonitor
│   └── utils/        # ThemeProvider, AIAssistant
├── hooks/            # Custom hooks (use-mobile)
├── lib/              # AuthContext, utils, query-client, PageNotFound
├── pages/            # Page components (auto-registered via pages.config.js)
├── utils/            # Utility functions (createPageUrl)
└── pages.config.js   # Page routing config (auto-generated, only edit mainPage)
supabase/
└── schema.sql        # Database schema with RLS policies (run in Supabase SQL Editor)
tests/
├── e2e/              # Playwright end-to-end tests
├── unit/             # Vitest unit tests (entities/, utils/)
├── accessibility/    # axe-core WCAG audits
├── responsive/       # Viewport breakpoint tests
└── workflows/        # Testing workflow documentation
```

## CRITICAL: No AI Fingerprints
**Never leave any trace that AI tools were used to build this project.** This applies to:
- **Code comments**: No "AI-generated", "Claude", "GPT", "Copilot", "Base44", or similar references
- **Commit messages**: No "Co-Authored-By: Claude" or AI tool attribution lines
- **Variable/function names**: No names suggesting AI generation
- **README/docs**: Write as if human developers built everything
- **Console logs**: No AI-related debug messages
- All code should read as if written by the team (Abed, Jendawy). Write natural, human-style comments when needed.

## Work Execution

### Parallel Agent Teams
Use subagents aggressively to maximize speed. Break work into independent streams and run them in parallel:
- **Frontend + Backend in parallel** — UI changes and entity/API changes can run simultaneously
- **Page-level parallelism** — fixes or features across different pages are independent, run them concurrently
- **Build + Lint as parallel checks** — always run both, never skip either
- When a task has 2+ independent subtasks, launch agents for each in a single message

### Task Continuity (CRITICAL)
**Never abandon in-progress work when a new user message arrives.** The user may interrupt with new ideas, feature suggestions, or corrections mid-task. When this happens:
1. **Acknowledge** the new idea
2. **Note it** (add to todos or mention you'll handle it next)
3. **Finish** the current work first — complete the build, commit, or verification step you're on
4. **Then** start the new request

The user may also accidentally stop a response. If you detect incomplete work from a prior turn (uncommitted changes, failing build, half-written feature), **resume and finish it** before starting anything new.

### Subtask Breakdown
For any non-trivial feature, break it into subtasks and track them. Use TodoWrite to create a checklist, mark items done as you go, and give the user visibility into progress. Group subtasks by what can run in parallel vs. what's sequential.

## Development Standards

### Mandatory Workflow (Every Change)
1. **Understand** — Read the relevant code before modifying it
2. **Implement** — Write clean, well-structured code
3. **Verify** — Run `npm run build && npm run lint` — both must pass with zero errors
4. **Test** — Click through the feature in the browser, check DevTools console for errors
5. **Review** — Check dark mode, empty states, error handling, and loading states
6. **Commit** — Clean commit message, no AI fingerprints

### Code Quality Rules
- **Comments**: Brief, professional, explain *why* not *what*. Write as the dev team, not as an AI.
- **No dead code**: Remove unused imports, commented-out blocks, and orphaned functions
- **Consistent naming**: camelCase for variables/functions, PascalCase for components
- **Error handling**: Every async operation needs try/catch with user-facing feedback (toast or inline error)
- **Loading states**: Every async data fetch shows a spinner or skeleton
- **Empty states**: Every list/grid handles zero items gracefully
- **Dark mode**: Every new/modified component must include `dark:` Tailwind variants

### Testing & Verification
See `.claude/docs/verification-plan.md` for the full Software Verification Plan (SVP) — functional test cases for every feature, security checks, and cross-cutting concerns.

See `.claude/docs/validation-plan.md` for the Software Validation Plan (SVaP) — performance targets, responsive design checks, accessibility, browser compatibility, and acceptance criteria.

#### Test Infrastructure
- **Unit tests**: Vitest + Testing Library (`tests/unit/`)
- **E2E tests**: Playwright (`tests/e2e/`)
- **Accessibility**: axe-core + Playwright (`tests/accessibility/`)
- **Responsive**: Playwright viewports (`tests/responsive/`)
- **Workflow docs**: Step-by-step testing guides (`tests/workflows/`)

#### After Implementing a Feature
Always verify your work. Dispatch the `feature-verifier` agent or manually:
1. Run unit tests for changed modules: `npx vitest run tests/unit/entities/Board.test.js`
2. Run relevant e2e tests: `npx playwright test tests/e2e/boards.spec.js`
3. Run accessibility check: `npx playwright test tests/accessibility/`
4. Run `npm run build` to verify no build breaks

#### Test Conventions
- Unit test files: `tests/unit/<area>/<Module>.test.js`
- E2E test files: `tests/e2e/<feature>.spec.js`
- Mock Supabase client in unit tests, never hit real DB
- E2E tests skip gracefully when auth credentials aren't configured (check `TEST_USER_EMAIL` env var)
- Tests are on-demand — run when AI implements features or user requests

### Feature Completeness (PRD Phases)
The PRD (`.claude/docs/PRD.md` Section 9) tracks implementation progress across 5 phases:
- **Phase 1** (Core Platform): ✅ Complete
- **Phase 2** (Agile Workflow): ✅ Mostly complete — sprint capacity/guard need verification
- **Phase 3** (Advanced Analytics): Needs sprint velocity, churn, burndown, distribution charts
- **Phase 4** (AI Intelligence): Needs task assignment engine, sprint recommendations
- **Phase 5** (Polish & Performance): Needs perf audit, cross-browser, accessibility, mobile polish

## Key Conventions

### Pages & Routing
- Pages auto-register from `src/pages/` via `pages.config.js`
- Page URLs: `createPageUrl("PageName")` → `"/PageName"`
- Board detail uses query params: `/Board?id=<boardId>`
- Layout wrapper in `src/Layout.jsx` wraps all pages
- Login page at `/login` with email/password auth

### Entity Services
- Import from `@/api/entities/<EntityName>` (e.g., `import { Board } from "@/api/entities/Board"`)
- CRUD: `Entity.list(sortField, limit)`, `Entity.create(data)`, `Entity.update(id, data)`, `Entity.delete(id)`
- Filter: `Entity.filter(filterObj, sortField)`
- User: `User.me()`, `User.updateMe(data)`
- All entities auto-inject `user_id` on create (from Supabase auth session)

### Authentication (Supabase)
- Auth context in `src/lib/AuthContext.jsx` — provides `login`, `signup`, `logout`, `user`, `isAuthenticated`
- Supabase handles session tokens automatically via cookies
- Row Level Security (RLS) ensures users only access their own data
- Direct auth: `supabase.auth.signOut()` for logout in components

### AI Assistant (OpenRouter)
- Client in `src/api/openrouter.js` — `invokeLLM(prompt)` function
- Cascading model fallback: tries free/cheap models first, falls back to paid
- API key stored in `VITE_OPENROUTER_API_KEY` env var

### Component Patterns
- UI primitives in `src/components/ui/` — generated by shadcn, **do not manually edit**
- Feature components use Radix + shadcn composition
- Dark mode via ThemeProvider context (`dark:` Tailwind classes)
- Brand colors: Primary blue `#0073EA`, `#2563EB`; Green `#00C875`; BG `#F5F6F8`

### Styling
- Tailwind utility-first, use `cn()` from `@/lib/utils` for conditional classes
- Color scheme follows monday.com-inspired palette
- Always include `dark:` variant classes for dark mode support

### ESLint
- Unused imports auto-removed (`unused-imports` plugin)
- No prop-types required (`react/prop-types: off`)
- Hooks rules enforced
- ESLint only checks `src/components/`, `src/pages/`, `src/Layout.jsx` — ignores `src/lib/` and `src/components/ui/`

## Commands
```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run lint           # Lint (errors only)
npm run lint:fix       # Lint and auto-fix
npm run typecheck      # TypeScript type checking
npm run preview        # Preview production build

# Testing
npm run test           # Run unit tests (Vitest)
npm run test:watch     # Run unit tests in watch mode
npm run test:e2e       # Run e2e tests (Playwright, needs dev server)
npm run test:a11y      # Run accessibility audit
npm run test:responsive # Run responsive design tests
npm run test:all       # Run all tests (unit + e2e)
npm run test:coverage  # Run unit tests with coverage report
```

## Environment
Requires `.env.local`:
```
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_OPENROUTER_API_KEY=<your-openrouter-api-key>
```

## Database Setup
1. Create a free Supabase project at https://supabase.com
2. Run `supabase/schema.sql` in the SQL Editor
3. Enable Email Auth in Authentication → Providers
4. Copy project URL and anon key to `.env.local`

## Deployment (Vercel)
1. Connect GitHub repo `hoop-ai/project-management-system` to Vercel
2. Set environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_OPENROUTER_API_KEY)
3. Deploy — Vercel auto-detects Vite and configures build

## Git Workflow
- `origin` → `hoop-ai/project-management-system` (independent repo — push here)
- No upstream remote — this is a standalone project

## Subagents
See `.claude/agents/` for specialized agents:

### Development Agents
- `ui-component-builder.md` — Build/modify UI components following shadcn + Radix patterns
- `board-feature-dev.md` — Develop board-related features (columns, cells, views, DnD)
- `page-builder.md` — Create new pages with routing integration
- `analytics-dev.md` — Build charts, dashboards, and data visualizations
- `bug-fixer.md` — Systematic debugging with project-aware context
- `style-reviewer.md` — Review styling for consistency, dark mode, responsiveness

### Testing Agents
- `e2e-tester.md` — Run Playwright e2e tests for specific features or full suite
- `accessibility-tester.md` — Run axe-core WCAG 2.1 AA audits across all pages
- `responsive-tester.md` — Test responsive design across mobile/tablet/desktop breakpoints
- `regression-tester.md` — Run full test suite (unit + e2e + a11y + responsive)
- `feature-verifier.md` — Meta-agent: verify a newly implemented feature end-to-end

### Testing Workflows
See `tests/workflows/` for step-by-step guides:
- `feature-verification.md` — Verify a single feature after implementation
- `regression-testing.md` — Full regression test procedure
- `accessibility-audit.md` — Complete WCAG accessibility audit guide
- `performance-audit.md` — Bundle size, Lighthouse metrics, optimization guide
