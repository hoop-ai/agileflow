# AgileFlow Changelog

Timeline of development work, decisions, and deployments. Most recent first.

---

## 2026-03-21 — Security Overhaul, Database Hardening & Deployment Setup

### Security & Auth
- **Route protection added** — unauthenticated users now redirected to `/login` on all routes (App.jsx + AuthContext)
- **Session expiry handling** — auto-redirect to login on JWT/token failures (supabaseClient.js)
- **Entity services hardened** — all services (Item, Sprint, UserStory, CalendarEvent, Notification) now verify auth + filter by `user_id` at service layer, independent of RLS
- **SessionExpired component** — dedicated screen for expired sessions vs first-time visitors

### Database
- **Schema-safe migration created** — `supabase/schema-safe.sql` handles existing tables, adds missing columns, idempotent re-runs
- **`user_preferences` table added** — due date reminders, sprint update frequency, notification toggles, display prefs, timezone, working hours
- **`activity_log` table added** — tracks user actions (create/update/delete) with entity references and metadata
- **All 10 tables verified** — profiles, boards, items, calendar_events, user_stories, sprints, notifications, team_members, user_preferences, activity_log
- **RLS policies** — all tables have Row Level Security with `auth.uid()` scoping
- **Missing columns patched** — `profiles.role`, `profiles.theme`, `profiles.settings`, `profiles.avatar` added to existing tables via ALTER

### Error Handling
- **Toast notifications** — replaced silent `console.error` with user-facing toasts across 8 pages (Dashboard, Board, Boards, Backlog, Analytics, Calendar, Settings, Admin)
- **~25 catch blocks** updated with descriptive error messages

### Features Fixed
- **Email invite (InviteTeamModal)** — was completely fake (console.log + setTimeout), now searches real users by email, adds as team members to selected board with role, shows per-email results
- **Board selection** added to invite flow
- **Dark mode support** — replaced hardcoded colors with theme variables in 5 board components

### Infrastructure
- **Repo migrated** — from forked `project-management-system` to standalone `hoop-ai/agileflow`
- **Vercel project** — relinked to `agileflow` project at https://agileflow-one.vercel.app
- **Environment variables** — all 3 keys set (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_OPENROUTER_API_KEY) on Vercel (all environments) and local `.env.local`
- **Supabase project** — `kgpzvkgtrfrqrksvmvxk` at https://kgpzvkgtrfrqrksvmvxk.supabase.co
- **Auto-deploy** — pushes to `main` branch trigger Vercel production deployments

### Entity Services Created
- `src/api/entities/UserPreferences.js` — get (auto-creates defaults), create, update
- `src/api/entities/ActivityLog.js` — list, log, filterByEntity

---

## 2026-03-20 — Base44 to Supabase Migration

### Migration
- **Full platform migration** from Base44 (proprietary) to Supabase (PostgreSQL + Auth)
- **Entity services rewritten** — all CRUD operations now use `@supabase/supabase-js`
- **Auth migrated** — from Base44 auth to Supabase email/password auth with session management
- **OpenRouter integration** — AI assistant connected with cascading model fallback (GPT-4o-mini → Llama → Gemini → Haiku)

### Codebase Cleanup
- **All Base44 references removed** — imports, comments, documentation, agent configs
- **Repo forked** to `hoop-ai/project-management-system` (later renamed to `agileflow`)
- **Upstream remote disconnected** — standalone project, no fork relationship

### Production Audit
- **Notification RLS vulnerability patched**
- **Analytics crash** on missing status columns fixed
- **SprintPlanningModal** division by zero fixed
- **Backlog StoryCard** null safety guards added
- **BoardHeader** title persistence fixed
- **ErrorBoundary** added to application root
- **Dark mode styling** added to Dashboard, Analytics, Backlog pages
- **Deployment checklist** created

---

## Architecture Notes

### Stack
React 18 + Vite 6 → Supabase (PostgreSQL + Auth + RLS) → Vercel hosting

### Key Design Decisions
- **JSONB for flexibility** — `items.data` stores dynamic column values, `boards.columns` defines column schemas, `boards.groups` defines groups. This allows unlimited custom columns without schema changes.
- **RLS + service-layer auth** — defense-in-depth. RLS enforces at database level, entity services also verify auth and filter by user_id.
- **No backend server** — frontend connects directly to Supabase via anon key. Service role key never exposed to browser.
- **Email invites limitation** — can't send invite emails from frontend (requires service_role key). Current flow: search existing users, add as team members. Future: Supabase Edge Function for email invites.
