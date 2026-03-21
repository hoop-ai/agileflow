# Quality & Testing Infrastructure Design

## Problem
AgileFlow was migrated from Base44 to Supabase but has systemic quality issues:
- No error feedback to users (silent failures everywhere)
- No form validation display
- No test framework, no test files, no CI
- No accessibility or responsiveness verification
- 10 pages, 8 entity services — all untested

## Solution: Two Parallel Tracks

### Track 1: Fix Broken Features
Systematic fix of error handling, form validation, and silent failures across all features.

**Scope:**
1. **Global toast notification system** — Add sonner for user-facing error/success feedback
2. **Board creation flow** — Error display, validation feedback, loading states
3. **All entity service calls** — Wrap in try/catch with toast notifications
4. **Form validation** — Display Zod/RHF validation errors visually
5. **Auth flow** — Login/signup error messages
6. **All CRUD operations** — Success/error toasts for create, update, delete across all entities

### Track 2: Testing Infrastructure
On-demand testing system that AI agents use to verify their work.

**Stack:**
| Layer | Tool | Purpose |
|-------|------|---------|
| E2E / UI | Playwright + MCP | Full user flow testing |
| Unit | Vitest + Testing Library | Entity services, utils, hooks |
| Accessibility | axe-core + Playwright | WCAG 2.1 checks |
| Responsiveness | Playwright viewports | Mobile/tablet/desktop |
| Visual Regression | Playwright screenshots | UI snapshot comparison |

**Directory Structure:**
```
tests/
├── e2e/
│   ├── boards.spec.js
│   ├── backlog.spec.js
│   ├── calendar.spec.js
│   ├── dashboard.spec.js
│   ├── auth.spec.js
│   └── helpers/
│       └── test-utils.js
├── unit/
│   ├── entities/
│   │   ├── Board.test.js
│   │   ├── Item.test.js
│   │   ├── Sprint.test.js
│   │   └── UserStory.test.js
│   └── utils/
│       └── utils.test.js
├── accessibility/
│   └── a11y-audit.spec.js
├── responsive/
│   └── breakpoints.spec.js
└── workflows/
    ├── feature-verification.md
    ├── regression-testing.md
    ├── accessibility-audit.md
    └── performance-audit.md
```

### Track 3: Claude Agent Infrastructure
New subagents and CLAUDE.md updates so future AI sessions auto-verify their work.

**New Agents:**
- `e2e-tester.md` — Run Playwright e2e tests for specific features
- `accessibility-tester.md` — Run axe-core accessibility audits
- `responsive-tester.md` — Test across viewport breakpoints
- `regression-tester.md` — Run full test suite for regression checking
- `feature-verifier.md` — Meta-agent: after implementing a feature, run relevant tests

**CLAUDE.md Updates:**
- Add testing commands (vitest, playwright)
- Add verification workflow: "after implementing a feature, dispatch feature-verifier agent"
- Add test file conventions and patterns

**Workflow Documents:**
Each workflow doc describes step-by-step how to run that type of testing, what to look for, and how to interpret results. These are instructions for AI agents, not humans.

## Implementation Order
1. Install dependencies (sonner, vitest, @testing-library/react, playwright, axe-core)
2. Configure vitest and playwright
3. Fix global error handling (toast system)
4. Fix board creation flow (highest visibility bug)
5. Fix remaining entity CRUD error handling
6. Write e2e tests for fixed features
7. Write unit tests for entity services
8. Create accessibility and responsive test suites
9. Create Claude agents and workflow docs
10. Update CLAUDE.md with testing conventions

## Package.json Script Additions
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "test:a11y": "playwright test tests/accessibility/",
  "test:responsive": "playwright test tests/responsive/",
  "test:all": "vitest run && playwright test"
}
```

## Key Decisions
- **Vitest over Jest**: Native Vite integration, faster, same API
- **Playwright over Cypress**: Better multi-browser support, MCP integration already present
- **Sonner for toasts**: Lightweight, great defaults, works with shadcn/ui
- **On-demand testing**: No CI/CD auto-run on commits. User or AI triggers tests explicitly.
- **Workflow docs over automation**: Testing workflows are documented instructions, not rigid pipelines
