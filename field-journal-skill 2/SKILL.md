# Field Journal Skill

Auto-evolving experience log for HanverseRN development. Purpose: stop re-solving
the same hard problem twice, and give future-you (or any agent) a fast way to
check "have I hit this before?" before diving in.

This is a *knowledge* skill, not a tool-calling skill — it just governs when and
how to read/write markdown files in `field-journal/`.

## When to READ (before starting non-trivial work)

Check `field-journal/_index.md` first whenever the task smells like one of these:

- A tricky integration (Apple Intelligence, Firebase Functions Gen 2, Cloudflare
  R2, RevenueCat, YouTube extraction, native module bridging)
- Anything that previously took multiple attempts or produced a workaround
- A bug class that could easily recur (race conditions, FTS5 query quirks,
  Expo/EAS build issues, TypeScript/RN version mismatches)

If `_index.md` has a matching entry, read that specific journal file before
writing code. Reuse verified solutions. If a past solution doesn't apply
anymore, say why in the new entry rather than silently ignoring it.

## When to WRITE (after finishing non-trivial work)

Write a new entry when ANY of these are true:

1. A task took more than one real attempt to get right (i.e. there was a
   dead end, wrong assumption, or failed approach along the way)
2. You discovered a non-obvious pitfall in a library/service/tool
   (Expo SQLite FTS5, Apple Foundation Models, Railway, Cloudflare R2/Workers,
   NativeCN, react-native-reanimated, etc.)
3. You fixed a bug whose root cause wasn't obvious from the error message
4. You made an architecture decision with real tradeoffs worth remembering
5. Something failed and the failure reason is useful to know next time,
   even if you didn't fully solve it

Do NOT write an entry for routine, first-try-worked tasks — that's noise, not
signal. The bar is "would future-me want to have read this before starting."

## How to write an entry

1. Copy `field-journal/_template.md` to
   `field-journal/YYYY-MM-DD_short-keyword-slug.md`
2. Fill it in — see Quality rules below
3. Update `field-journal/_index.md` with a one-line pointer under the right
   category

## Quality rules

- **Concrete over vague.** Paste the actual error message, the actual command,
  the actual code snippet that fixed it. "Fixed a config issue" is useless six
  months from now.
- **One pitfall = one row.** Don't merge unrelated problems into one entry.
- **Mark scope.** If a fix only works under specific conditions (iOS 26+,
  Expo SDK version X, specific Railway plan), say so explicitly.
- **No fluff.** Skip preamble/narrative. Straight to problem → cause → fix.
- **Stay in project stack.** Assume Lucide icons, Expo SQLite FTS5, NativeCN,
  StyleSheet API, dark theme (#0A0A0F) as the default context — don't relitigate
  the stack choice in every entry.

## Directory structure

```
field-journal/
├── _template.md     # entry template — copy this, don't edit in place
├── _index.md        # searchable index, updated on every new entry
└── YYYY-MM-DD_*.md   # individual entries
```
