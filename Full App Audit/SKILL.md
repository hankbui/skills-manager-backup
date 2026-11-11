---
name: Full App Audit
description: >
  Comprehensive codebase audit skill for Hanverse RN. Performs a full audit
  across 8 dimensions (architecture, security, performance, scalability, crash
  risks, data management, maintainability, UX consistency) and produces detailed
  Markdown reports in .agent/plan/audit/. Activate when the user says "audit",
  "kiểm tra app", "review toàn bộ code", or similar.
---

# 🔍 Full App Audit Skill

## When To Use This Skill

Activate this skill when the user says any of:
- "audit app", "audit codebase", "audit toàn bộ"
- "kiểm tra app", "review code", "tìm lỗi toàn bộ"
- "security audit", "performance audit"
- "làm audit như lần trước"

## Prerequisites

Before starting, read:
1. `.agent/rule.md`
2. `.agent/quick-reference.md`
3. `.agent/gotchas/INDEX.md` — to know existing known issues so you don't re-report them

## Output Location

All audit reports go to: `.agent/plan/audit/`

```
.agent/plan/audit/
├── audit-architecture.md
├── audit-security.md
├── audit-performance.md
├── audit-scalability.md
├── audit-crash-risks.md
├── audit-data.md
├── audit-maintainability.md
├── audit-ux-consistency.md
└── audit-summary.md          ← final summary of all categories
```

---

## Audit Workflow

### Phase 1 — Prepare

1. Create the output directory if it doesn't exist: `.agent/plan/audit/`
2. Check `.agent/memory.md` for issues already fixed — skip re-reporting those
3. Check `.agent/gotchas/INDEX.md` for known patterns — reference them instead of re-explaining
4. Note today's date for report headers

### Phase 2 — Audit (8 Categories in Priority Order)

Run each category below. Write the report file as you complete each one.
**Priority order**: Security → Crash Risks → Data → Performance → Scalability → Architecture → Maintainability → UX

---

### Category 1: 🔒 SECURITY → `audit-security.md`

Scan for:
- Hardcoded secrets, API keys, tokens, passwords in source code or `.env` files
  - Check: `EXPO_PUBLIC_` prefix on sensitive keys (exposes to JS bundle)
  - Check: any key directly in source (not in `.env`)
- Insecure data storage (sensitive data unencrypted, wrong MMKV namespace, etc.)
- Missing or improper input validation
- SQL injection vulnerabilities (raw SQL string concatenation)
- XSS vulnerabilities in WebView injected scripts
- Insecure API communication (HTTP endpoints, missing auth headers)
- Missing authentication / authorization checks on Firestore rules
  - Check every `allow write: if true` or `allow read: if true` rule
- JWT handling issues (improper storage, no expiry check)
- Sensitive data appearing in `console.log` or error messages
- Dependency vulnerabilities (check package.json for known insecure versions)
- User data persisted in MMKV/SQLite without user-scoping (leaks between users on logout)
- `EXPO_PUBLIC_` prefix used on variables that should be server-side only

**Hanverse-specific checks:**
- AI provider API keys — must not be in client bundle
- Firebase rules — all collections must have proper auth guards
- MMKV stores — user-specific stores must be cleared on `clearUserPersistedData()`
- Subtitle/backend API keys — must not use `EXPO_PUBLIC_` prefix

---

### Category 2: 💥 CRASH RISKS → `audit-crash-risks.md`

Scan for:
- Unhandled null/undefined access — especially `.find() || array[0]` anti-pattern
- Missing try/catch on async operations and network calls
- Silent error swallowing (`catch (e) {}` with no logging)
- No global error boundary / crash handler
- Assumption that lists are non-empty before accessing `[0]`
- Missing type guards when parsing external JSON data
- React Native / Hermes API gaps:
  - `response.body?.getReader()` — NOT available in Hermes (use `response.json()` fallback)
  - `ReadableStream` — not implemented
- Yoga renderer crashes from invalid style values:
  - Hex color concatenation: `color + 'opacity'` crashes if color is not hex format
  - Use `addHexOpacity()` from `@/shared/utils/colorUtils` instead
- Index out of bounds on array access
- Component accessing state after unmount (missing cleanup in `useEffect`)
- Zustand `getGroupedTasks()` or similar getter returning new object called bare in render
  - Rule: Always wrap in `useMemo(() => getter(), [deps])`

---

### Category 3: 📊 DATA MANAGEMENT → `audit-data.md`

Scan for:
- Sensitive data not cleared on logout
  - Check `useAuth.ts` `clearUserPersistedData()` — does it clear ALL user-specific MMKV stores?
  - Any new MMKV-persisted store with user data must be added there
- Missing data validation at model/schema level
- Inconsistent data transformation (same data mapped differently in different places)
- SQLite: missing indexes, no migration strategy, raw SQL outside Repository files
- State shape: deeply nested / denormalized state causing cascading re-renders
- API response handling: blindly trusting API shape without schema validation
- Date/time handling: timezone issues, inconsistent formats
- Data sync conflicts: offline changes vs server data
- Zustand selector instability: getter functions creating new object references in render

---

### Category 4: ⚡ PERFORMANCE → `audit-performance.md`

Scan for:
- Expensive operations on UI thread (blocking synchronous calls)
- Missing pagination — loading all records at once
- Unnecessary re-renders:
  - Inline functions in JSX (`onPress={() => ...}`) — use `useCallback`
  - Inline style objects (`style={{ margin: 16 }}`) — use `StyleSheet.create`
  - Unstable selector results from Zustand getter functions
- Memory leaks: event listeners not removed, timers not cleared, subscriptions not cancelled
- Inefficient loops on large datasets
- Redundant network calls with no caching
- Large images without compression
- Animations on the JS thread — must use `useAnimatedStyle` + Reanimated 3
- `FlatList`/`ScrollView` used for lists > 20 items — must use `FlashList`
- `useMemo` / `useCallback` missing on expensive computations

---

### Category 5: 📈 SCALABILITY → `audit-scalability.md`

Scan for:
- Race conditions — async operations on shared state without guards
- Missing debounce/throttle on search inputs, scroll handlers, button taps
- Missing loading states / double-submit prevention
- State management: global state overused vs local state that should be global
- Real-time features: WebSocket/SSE connection lifecycle not managed
- No exponential backoff / retry logic on network failures
- No offline graceful degradation
- SQLite: missing indexes, N+1 query problems
- Zustand store slicing: one big store causing full re-renders on unrelated changes

---

### Category 6: 🏗️ ARCHITECTURE → `audit-architecture.md`

Scan for:
- Cross-feature imports (feature A imports directly from feature B screen/component)
  - Rule: cross-feature interaction goes through `@/shared` only
- SQL / database queries outside Repository files (SoC violation)
- Business logic inside screen components (should be in hooks/services)
- Circular dependencies
- God functions / God components doing too many jobs
- Dead code: unused functions, unused imports, unreachable code
- Inconsistent naming conventions
- Magic numbers / hardcoded strings that should be tokens or constants
- Missing abstraction where complexity should be hidden
- Expo Router files that are not thin wrappers
- NativeWind / className usage (deprecated — use `@/ui/tokens` + StyleSheet)

---

### Category 7: 🧪 MAINTAINABILITY → `audit-maintainability.md`

Scan for:
- Missing unit tests for business logic
- Code that is inherently untestable (tight coupling, no dependency injection)
- Missing or outdated CHANGELOG.md files after feature changes
- No error monitoring integration (Sentry, Crashlytics)
- Missing analytics events on critical user actions
- Environment config: dev/staging/prod clearly separated?
- Logging strategy: `console.log` in production builds? (should be stripped)
- Babel config issues (e.g., `api.cache(true)` + `api.env()` conflict)
- Pre-commit / pre-push hooks broken
- Missing ownership comments at top of complex files (`@file`, `@description`, `@architecture`)

---

### Category 8: 🎨 UX CONSISTENCY → `audit-ux-consistency.md`

Scan for:
- Inconsistent UI components — same element styled differently across screens
- Missing empty states, error states, loading states (skeleton screens)
- Font sizes, colors, spacing using hardcoded values instead of `@/ui/tokens`
- Missing keyboard handling (keyboard covers inputs)
- No haptic feedback on primary/destructive actions
- Accessibility issues (missing labels, poor contrast)
- Touch targets < 44pt (Apple HIG requirement)
- Icons from libraries other than `lucide-react-native`
- `Animated` API used instead of Reanimated 3
- `ScrollView + .map()` used for lists > 20 items

---

### Phase 3 — Write Summary

Write `audit-summary.md` with:
- Overall health score table (each category scored /10)
- All 🔴 Critical issues listed with file references
- All 🟠 High issues listed
- Recommended fix roadmap (Phase 1 Immediate → Phase 4 Long-term)
- Top 10 most impactful fixes

---

## Report Template

Each report file must follow this structure:

```markdown
# [Category] Audit Report

**Date:** [today]
**Auditor:** Agent
**Severity Legend:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low | ℹ️ Info

---

## Summary

> [2-3 câu tổng kết tình trạng của category này]

**Total Issues Found:** X
🔴 Critical: X | 🟠 High: X | 🟡 Medium: X | 🟢 Low: X

---

## Issues

### [SEVERITY_EMOJI] [Issue Title]

- **Severity:** Critical / High / Medium / Low
- **Location:** `path/to/file.ts` (line X–Y) or multiple files
- **Description:** Clear description of the problem
- **Impact:** What happens if not fixed? (crash? data leak? bad UX?)
- **Recommendation:** Specific fix

❌ Current:
```language
// bad code
```

✅ Recommended:
```language
// good code
```

---

## Quick Wins

> Easiest fixes with highest impact — do these first

1. ...
2. ...
3. ...
```

---

## Implementation Rules

After completing the audit:

1. **Do NOT auto-fix** unless the user explicitly says "sửa luôn" or "fix it"
   - The audit is read-only: discover and document, not edit
   - Exception: if the user says "audit và sửa luôn" then apply the Critical fixes

2. **If user says "sửa luôn" after audit**:
   - Fix all 🔴 Critical issues first
   - Write a CHANGELOG entry for each fixed file
   - Run TypeScript check: `npx tsc --noEmit` on changed files
   - Update `memory.md` with any new durable patterns discovered
   - Update `gotchas/INDEX.md` with new traps found
   - Commit with format: `fix: [scope] audit — [N] issues fixed`

3. **Always update after audit**:
   - Add newly discovered traps to `.agent/gotchas/INDEX.md`
   - Add durable rules to `.agent/memory.md`

---

## Severity Scoring Guide

| Severity | When to use |
|----------|-------------|
| 🔴 Critical | App crashes, data loss, security breach, privacy leak |
| 🟠 High | Significant user-facing bug, performance blocker, auth gap |
| 🟡 Medium | UX degradation, maintainability debt, minor perf issue |
| 🟢 Low | Style inconsistency, minor naming, nice-to-have improvement |
| ℹ️ Info | Observation with no action required |

---

## Known Already-Fixed Issues (Skip These)

Check `.agent/memory.md` for the "Security Audit Fixes — 7 Issues (2026-06-15)" entry.
The following have already been fixed and should NOT be re-reported:
- AI streaming `getReader()` crash → fixed with fallback in all 3 providers
- Hex color crash → fixed with `addHexOpacity()` in `colorUtils.ts`
- CharacterDecomposition null-pointer → fixed with explicit guards
- `EXPO_PUBLIC_SUBTITLE_APP_KEY` exposure → renamed to `SUBTITLE_APP_KEY`
- Firestore `dictionary_stats` unauth write → fixed to `isAuthenticated()`
- Zustand `getGroupedTasks()` bare in render → fixed with `useMemo`
- Logout MMKV data leak → fixed with `clearUserPersistedData()`
- Babel `api.cache(true)` + `api.env()` conflict → fixed with `api.cache(() => process.env.NODE_ENV)`
## Findings ledger (mandatory)

Follow `.claude/rules/audits.md`: run `node scripts/findings.mjs verify --apply` first, record every
confirmed finding with `node scripts/findings.mjs record --source audit_full_app`, and report
only NEW / REGRESSED plus the totals line. Close false positives with a reason so the next audit
does not re-raise them.
