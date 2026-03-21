# Software Verification Plan (SVP)

Verification = "Did we build it right?" — confirms the code works correctly against requirements.

---

## 1. Pre-Commit Checklist (Every Change)

Before any code is committed, ALL of these must pass:

```bash
npm run build          # Zero errors
npm run lint           # Zero warnings/errors
```

Manual checks:
- [ ] No console.error() or unhandled promise rejections in browser DevTools
- [ ] Feature works in both light and dark mode
- [ ] No hardcoded strings that should be dynamic
- [ ] No dead code, unused imports, or commented-out blocks left behind
- [ ] Comments are clean, professional, and written as if by the dev team

---

## 2. Functional Verification Matrix

### 2.1 Authentication (Auth)
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| AUTH-01 | Email signup | Enter name/email/password → Submit | Account created, redirected to dashboard | ⬜ |
| AUTH-02 | Email login | Enter email/password → Submit | Logged in, dashboard loads | ⬜ |
| AUTH-03 | Invalid login | Enter wrong password → Submit | Error message shown, no crash | ⬜ |
| AUTH-04 | Logout | Click logout → Confirm | Redirected to login page, session cleared | ⬜ |
| AUTH-05 | Auth guard | Visit /Dashboard without login | Redirected to /login | ⬜ |
| AUTH-06 | Session persistence | Login → Close tab → Reopen | Still logged in (Supabase session) | ⬜ |

### 2.2 Dashboard
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| DASH-01 | KPI cards load | Login → View dashboard | Stats cards show correct counts | ⬜ |
| DASH-02 | Recent boards | Create 3 boards → View dashboard | All 3 appear in recent boards | ⬜ |
| DASH-03 | Quick actions | Click each quick action button | Each navigates to correct page | ⬜ |
| DASH-04 | Empty state | New user, no data → View dashboard | Friendly empty state, no crash | ⬜ |

### 2.3 Board Management
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| BRD-01 | Create board | Click create → Enter title → Save | Board appears in list | ⬜ |
| BRD-02 | Edit board title | Click edit on board → Change title → Save | Title updated | ⬜ |
| BRD-03 | Delete board | Click delete → Confirm | Board removed, tasks deleted | ⬜ |
| BRD-04 | Open board | Click board card | Board workspace loads with columns | ⬜ |

### 2.4 Board Workspace
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| BWS-01 | Add task | Click add → Enter title → Save | Task appears in group | ⬜ |
| BWS-02 | Edit task | Click task → Edit fields → Save | Changes persisted | ⬜ |
| BWS-03 | Delete task | Click delete on task → Confirm | Task removed | ⬜ |
| BWS-04 | Drag-and-drop | Drag task to new status column | Status updates, task stays in new column | ⬜ |
| BWS-05 | Add column | Click + column → Select type → Save | Column appears | ⬜ |
| BWS-06 | Add group | Click + group → Enter name | Group section appears | ⬜ |
| BWS-07 | Filter tasks | Apply status filter | Only matching tasks shown | ⬜ |
| BWS-08 | Sort tasks | Sort by priority | Tasks reorder correctly | ⬜ |
| BWS-09 | Kanban view | Switch to Kanban | Cards organized by status columns | ⬜ |
| BWS-10 | Calendar view | Switch to Calendar | Tasks on date grid | ⬜ |
| BWS-11 | Timeline view | Switch to Timeline | Gantt-style layout | ⬜ |
| BWS-12 | Cell types | Edit each cell type (status, priority, date, people, text, number, checkbox, dropdown, tags, budget) | Each saves correctly | ⬜ |

### 2.5 Backlog & Sprints
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| BKL-01 | Create story | Click create → Fill form → Save | Story appears in backlog | ⬜ |
| BKL-02 | Edit story | Click story → Edit → Save | Changes persisted | ⬜ |
| BKL-03 | Delete story | Click delete → Confirm | Story removed | ⬜ |
| BKL-04 | Create sprint | Click plan sprint → Fill form → Save | Sprint created | ⬜ |
| BKL-05 | Assign to sprint | Select stories → Assign to sprint | Stories move to sprint | ⬜ |
| BKL-06 | Capacity warning | Assign stories exceeding capacity | Warning displayed | ⬜ |
| BKL-07 | Completed sprint guard | Try assigning to completed sprint | Action blocked or warned | ⬜ |
| BKL-08 | Drag reorder | Drag story up/down in backlog | Order changes persist | ⬜ |

### 2.6 Calendar
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| CAL-01 | View calendar | Navigate to Calendar page | Monthly grid renders | ⬜ |
| CAL-02 | Create event | Click date → Fill form → Save | Event appears on date | ⬜ |
| CAL-03 | Event categories | Create events with different types | Correct color/label shown | ⬜ |

### 2.7 Analytics
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| ANA-01 | Page loads | Navigate to Analytics | Charts render without crash | ⬜ |
| ANA-02 | Board filter | Select specific board | Metrics update for that board | ⬜ |
| ANA-03 | Time filter | Select time range | Data filtered correctly | ⬜ |
| ANA-04 | KPI accuracy | Compare KPI cards to actual data | Numbers match manual count | ⬜ |
| ANA-05 | Empty state | No boards/tasks → View analytics | Graceful empty state, no crash | ⬜ |

### 2.8 Settings
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| SET-01 | Update profile | Change name → Save | Name updated across app | ⬜ |
| SET-02 | Toggle theme | Switch dark/light mode | All pages update correctly | ⬜ |

### 2.9 AI Assistant
| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| AI-01 | Open assistant | Click AI button | Chat panel opens | ⬜ |
| AI-02 | Send message | Type question → Send | Response appears | ⬜ |
| AI-03 | Clear chat | Click clear | Chat history cleared | ⬜ |

---

## 3. Security Verification

| Test ID | Scenario | Expected Result | Status |
|---------|----------|-----------------|--------|
| SEC-01 | RLS: user A can't see user B's boards | Query returns empty, not error | ⬜ |
| SEC-02 | RLS: user A can't edit user B's items | Update rejected by Supabase | ⬜ |
| SEC-03 | Auth token expired | User redirected to login | ⬜ |
| SEC-04 | Direct API call without token | Request rejected (401) | ⬜ |
| SEC-05 | XSS in task title | HTML tags escaped, not rendered | ⬜ |
| SEC-06 | SQL injection in search | Query sanitized, no data leak | ⬜ |

---

## 4. Cross-Cutting Verification

| Test ID | Scenario | Expected Result | Status |
|---------|----------|-----------------|--------|
| CC-01 | Dark mode — all pages | No white/unthemed elements | ⬜ |
| CC-02 | Loading states — all async ops | Spinner or skeleton shown | ⬜ |
| CC-03 | Error handling — API failures | Toast or inline error, no crash | ⬜ |
| CC-04 | Empty states — no data | Friendly message, no crash | ⬜ |
| CC-05 | Navigation — all nav links | Each goes to correct page | ⬜ |

---

## 5. How to Run Verification

1. Start dev server: `npm run dev`
2. Open browser DevTools console (check for errors)
3. Walk through each test case above
4. Mark status: ✅ Pass / ❌ Fail (with notes) / ⬜ Not tested
5. Fix any failures before committing
