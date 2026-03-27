# Platform Stability Blitz — Design Spec

**Date:** 2026-03-27
**Status:** Approved
**Scope:** Fix all loading bugs, auth issues, dead code, and AI reliability across AgileFlow

---

## Problem Statement

The platform has systemic quality issues:
- Infinite loading spinners when data is empty
- Auth broken for returning users (must use incognito)
- Concurrent sessions (shared accounts, multi-tab) cause conflicts
- Unwanted features (integrations, automations) clutter the codebase
- AI assistant fails silently

## Stream 1: Auth System Rewrite

### Root Causes
1. Stale closure in `onAuthStateChange` — `isAuthenticated` captured at mount time, never updates
2. No Supabase storage configuration — sessions lost on localStorage clear
3. Race condition between `checkSession()` and `onAuthStateChange` running in parallel
4. `login()` navigates before auth state settles
5. Redundant auth listener in `supabaseClient.js` does hard redirects
6. Token refresh incorrectly treated as session expiry

### Changes

**supabaseClient.js:**
- Add explicit auth config: `persistSession: true`, `autoRefreshToken: true`
- Remove the redundant `onAuthStateChange` listener with `window.location.href` redirect

**AuthContext.jsx — Full rewrite:**
- Use `useRef` for `isAuthenticated` so `onAuthStateChange` callback reads current value
- Make `onAuthStateChange` the single source of truth — remove competing `checkSession()`
- Handle all auth events properly: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED
- For concurrent sessions: TOKEN_REFRESHED is normal, not an error — don't set `authError`
- Wrap `loadProfile()` in try/catch — failed profile fetch shows error, doesn't hang app
- `setIsLoadingAuth(false)` guaranteed in all code paths

**Login.jsx:**
- After `login()` succeeds, wait for `onAuthStateChange` to fire SIGNED_IN before navigating
- Or: let AuthContext handle the redirect when `isAuthenticated` becomes true

### Concurrent Session Support
- Supabase handles multi-session natively (each browser gets its own JWT)
- Our fix: stop treating token refreshes as errors, stop competing listeners from conflicting
- Multiple tabs: `onAuthStateChange` with `persistSession` handles cross-tab sync automatically

## Stream 2: Loading & Empty State Sweep

### Pattern
Every data-fetching component must handle exactly 3 states:
1. **Loading** — spinner/skeleton while fetching
2. **Empty** — helpful message + action when data returns empty
3. **Populated** — normal content rendering

### File-by-File Changes

| File | Issue | Fix |
|------|-------|-----|
| Backlog.jsx | Infinite spinner with zero stories | Check `!loadingStories && stories.length === 0` for empty state |
| Board.jsx / GroupSection.jsx | Loading flag not cleared | Ensure `isLoading` tracks actual fetch state, not stale prop |
| Boards.jsx | Skeleton mismatch during search | Separate fetch-loading from filter-loading |
| KanbanView.jsx | No loading state at all | Add loading skeleton when parent `isLoading` is true |
| AnalyticsPanel.jsx | Shows zeros with no context | Add "No data to analyze yet" empty state |
| Dashboard.jsx (StatsOverview) | Partial stale data | Show skeleton per widget, not full-page |
| RecentBoards.jsx | 4 skeletons always | Dynamic skeleton count: `Math.min(boards.length || 3, 4)` |
| ActivityFeed.jsx | 4 skeletons always | Same dynamic skeleton fix |
| Analytics.jsx | Full-page loading blocks partial data | Load sections independently |
| TimelineView.jsx | Unhelpful empty message | Distinguish "no items" vs "items without dates" |
| Calendar.jsx | Subtle empty state | Add icon + styled empty state card |
| SprintPlanningModal.jsx | No loading for sprint list | Add spinner while sprints load |

## Stream 3: Dead Code & Unwanted Feature Removal

### Delete Files
- `src/components/board/integrations/` (entire directory)
- `src/components/board/automations/` (entire directory)
- `src/components/board/analytics/EnhancedAnalyticsPanel.jsx`
- `src/components/common/ConnectionLost.jsx`
- `src/components/utils/performance.jsx`
- `src/components/utils/security.jsx`

### Clean References
- **Board.jsx**: Remove imports (lines ~40-41), state (lines ~70-71), callbacks (lines ~512-513), render blocks (lines ~785-794)
- **BoardHeader.jsx**: Remove props (lines ~69-70), buttons (lines ~286-315)

## Stream 4: AI Reliability Fix

### Changes

**openrouter.js:**
- Validate response structure: check `data.choices` exists and has elements before accessing
- Include tried models in final error message

**AIAssistant.jsx:**
- Replace generic error messages with specific feedback:
  - No API key → "AI features require configuration"
  - Network error → "Couldn't reach AI service"
  - All models failed → "AI service temporarily unavailable"
- Surface `invokeLLM` errors in performance insights instead of swallowing

**HelpAIAssistant.jsx:**
- Delete duplicated OpenRouter client code (lines 7-56)
- Import `invokeLLM` from `@/api/openrouter`
- Show "AI help is currently unavailable" UI instead of returning null when key is missing

## Success Criteria
- Login works on first attempt, every time, without incognito
- Multiple people can use the same account simultaneously
- Returning to the app after hours/days doesn't require re-login tricks
- Every page shows appropriate loading → empty → content states
- No infinite spinners anywhere
- No integrations or automations UI visible
- AI assistant shows clear feedback when it works or fails
- `npm run build` and `npm run lint` pass with zero errors
