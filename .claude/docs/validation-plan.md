# Software Validation Plan (SVaP)

Validation = "Did we build the right thing?" — confirms the product meets user needs and performance targets.

---

## 1. Performance Targets (from PRD NFRs)

| ID | Metric | Target | How to Measure | Status |
|----|--------|--------|----------------|--------|
| PERF-01 | Dashboard Time-to-Interactive | < 200ms | Chrome DevTools → Performance → TTI | ⬜ |
| PERF-02 | Drag-and-drop visual feedback | < 100ms | Chrome DevTools → Performance → Interaction timing | ⬜ |
| PERF-03 | Analytics generation (1,000 tasks) | < 800ms | Seed 1,000 tasks → Measure render time | ⬜ |
| PERF-04 | Auth token verification | < 50ms | Supabase auth timing in Network tab | ⬜ |
| PERF-05 | Concurrent users (15) | No data loss | Simulate 15 sessions via multiple browser tabs | ⬜ |
| PERF-06 | Bundle size | < 500KB gzipped | `npm run build` → check dist/assets sizes | ⬜ |
| PERF-07 | Lighthouse Performance score | > 80 | Chrome DevTools → Lighthouse → Performance | ⬜ |

### How to Run Performance Tests

```bash
# 1. Build and check bundle size
npm run build
# Check dist/assets/ for JS/CSS file sizes

# 2. Lighthouse audit
# Chrome → DevTools → Lighthouse → Generate report

# 3. Manual timing
# Chrome → DevTools → Performance → Record → Perform action → Stop
# Look at "Total Blocking Time" and "Interaction to Next Paint"
```

---

## 2. Usability Validation

### 2.1 Responsive Design
| Breakpoint | Width | Pages to Check | Status |
|-----------|-------|----------------|--------|
| Mobile | 375px | Dashboard, Boards, Board, Backlog, Calendar, Analytics | ⬜ |
| Tablet | 768px | All pages | ⬜ |
| Desktop | 1280px | All pages | ⬜ |
| Wide | 1920px | All pages | ⬜ |

How to test: Chrome DevTools → Toggle Device Toolbar → Select device/width

### 2.2 Browser Compatibility
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ⬜ |
| Firefox | Latest | ⬜ |
| Safari | Latest | ⬜ |
| Edge | Latest | ⬜ |

### 2.3 Dark Mode Completeness
| Page | All text readable | Backgrounds correct | Borders visible | Charts styled | Status |
|------|-------------------|---------------------|-----------------|---------------|--------|
| Dashboard | ⬜ | ⬜ | ⬜ | N/A | ⬜ |
| Boards | ⬜ | ⬜ | ⬜ | N/A | ⬜ |
| Board workspace | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Backlog | ⬜ | ⬜ | ⬜ | N/A | ⬜ |
| Calendar | ⬜ | ⬜ | ⬜ | N/A | ⬜ |
| Analytics | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Settings | ⬜ | ⬜ | ⬜ | N/A | ⬜ |
| Login | ⬜ | ⬜ | ⬜ | N/A | ⬜ |

---

## 3. Accessibility Validation

| ID | Check | How | Status |
|----|-------|-----|--------|
| A11Y-01 | Keyboard navigation | Tab through all interactive elements | ⬜ |
| A11Y-02 | Focus indicators | Visible focus ring on focused elements | ⬜ |
| A11Y-03 | Color contrast | Lighthouse accessibility audit > 80 | ⬜ |
| A11Y-04 | Screen reader labels | ARIA labels on buttons/icons (Radix handles most) | ⬜ |
| A11Y-05 | Form labels | All inputs have associated labels | ⬜ |

---

## 4. Feature Completeness (PRD Alignment)

### Phase 1 — Core Platform: ✅ Complete
All items verified — see PRD Section 9.

### Phase 2 — Agile Workflow: ✅ Mostly Complete
- [x] Backlog with story CRUD
- [x] Sprint planning modal
- [x] Calendar with events
- [x] Board analytics panels
- [ ] Sprint capacity enforcement needs click-through verification
- [ ] Completed sprint guard needs click-through verification

### Phase 3 — Advanced Analytics: Needs Work
- [x] Basic analytics (completion rate, overdue)
- [ ] Sprint Velocity chart
- [ ] Task Churn metric
- [ ] Burn-down chart
- [ ] Performance Distribution
- [ ] Analytics export (PDF/CSV)

### Phase 4 — AI Intelligence: Needs Work
- [x] AI chat interface
- [ ] Task Assignment Engine (weighted formula)
- [ ] Sprint planning recommendations
- [ ] Bottleneck prediction

### Phase 5 — Polish & Performance
- [ ] All performance targets met (Section 1 above)
- [ ] Cross-browser testing passed (Section 2.2)
- [ ] Accessibility audit passed (Section 3)
- [ ] All dark mode pages verified (Section 2.3)
- [ ] Mobile responsiveness verified (Section 2.1)

---

## 5. Acceptance Criteria Sign-Off

Before the project is considered "done," all of these must be verified:

| # | Criterion | Target | Verified |
|---|-----------|--------|----------|
| 1 | All CRUD operations work for Boards, Items, Stories, Sprints | 100% pass | ⬜ |
| 2 | Drag-and-drop with optimistic UI | < 100ms feedback | ⬜ |
| 3 | Analytics metrics match manual data count | Accurate | ⬜ |
| 4 | Cannot assign stories to completed sprints | Enforced | ⬜ |
| 5 | Protected routes reject unauthenticated users | 401 returned | ⬜ |
| 6 | Dashboard TTI | < 200ms | ⬜ |
| 7 | Analytics renders (1,000 tasks) | < 800ms | ⬜ |
| 8 | 15 concurrent users | No data loss | ⬜ |
| 9 | Responsive on mobile/tablet/desktop | No breaks | ⬜ |
| 10 | Dark mode on all pages | No unstyled elements | ⬜ |
