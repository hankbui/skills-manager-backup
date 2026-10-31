---
name: Writing Plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
version: 1.1.0
lastUpdated: 2026-01-20
status: active
requires: [brainstorming]
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** This should be run in a dedicated worktree (created by brainstorming skill).

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md`

## Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement the minimal code to make the test pass" - step
- "Run the tests and make sure they pass" - step
- "Commit" - step

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---

## Tasks

[Tasks as defined below]
```

## Task Structure

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts:123-145`
- Test: `tests/exact/path/to/test.ts`

**Step 1: Write the failing test**

```typescript
// tests/path/test.ts
import { render, screen } from '@testing-library/react-native';
import { Feature } from '@/features/path/Feature';

test('renders correctly', () => {
  render(<Feature />);
  expect(screen.getByText('Expected Text')).toBeTruthy();
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern="test.ts" -t "renders correctly"
```
Expected: FAIL with "Expected Text not found"

**Step 3: Write minimal implementation**

```typescript
// src/features/path/Feature.tsx
import { Text, View } from 'react-native';

export function Feature() {
  return (
    <View>
      <Text>Expected Text</Text>
    </View>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern="test.ts" -t "renders correctly"
```
Expected: PASS

**Step 5: Commit**

```bash
git add tests/path/test.ts src/features/path/Feature.tsx
git commit -m "feat: add Feature component with basic rendering"
```
```

## Remember

- Exact file paths always
- Complete code in plan (not "add validation")
- Exact commands with expected output
- Reference relevant skills with their path
- DRY, YAGNI, TDD, frequent commits
- **NO `className`** - Use `style + @/ui/tokens`
- **NO NativeWind/Tailwind** - Use `StyleSheet.create()`

## Execution Handoff

After saving the plan, offer execution choice:

**"Plan complete and saved to `docs/plans/<filename>.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?"**

**If Subagent-Driven chosen:**
- Use `subagent-driven-development` skill
- Stay in this session
- Fresh subagent per task + code review

**If Parallel Session chosen:**
- Guide them to open new session in worktree
- New session uses `executing-plans` skill

## Example Plan

```markdown
# Lesson Card Implementation Plan

**Goal:** Create reusable LessonCard component for displaying lesson info with progress.

**Architecture:** Feature-based component in `@/features/lessons/components/LessonCard.tsx`. Uses Zustand for progress state if needed.

**Tech Stack:** React Native, TypeScript, StyleSheet, TanStack Query for progress data.

---

## Tasks

### Task 1: Create LessonCard component

**Files:**
- Create: `src/features/lessons/components/LessonCard.tsx`
- Create: `src/features/lessons/components/__tests__/LessonCard.test.tsx`

**Step 1: Write the failing test**

```typescript
// src/features/lessons/components/__tests__/LessonCard.test.tsx
import { render, screen } from '@testing-library/react-native';
import { LessonCard } from '../LessonCard';

test('renders lesson title', () => {
  render(<LessonCard title="HSK 1 Lesson 1" progress={50} />);
  expect(screen.getByText('HSK 1 Lesson 1')).toBeTruthy();
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern="LessonCard.test.tsx" -t "renders lesson title"
```
Expected: FAIL

**Step 3: Write minimal implementation**

```typescript
// src/features/lessons/components/LessonCard.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { layout, spacing, colors, typography } from '@/ui/tokens';

interface LessonCardProps {
  title: string;
  progress: number;
  onPress?: () => void;
}

export function LessonCard({ title, progress, onPress }: LessonCardProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.progress}>{progress}%</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...layout.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.body,
    fontWeight: '600',
  },
  progress: {
    ...typography.caption,
    color: colors.text.muted,
  },
});
```

**Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern="LessonCard.test.tsx" -t "renders lesson title"
```
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/lessons/components/LessonCard.tsx \
        src/features/lessons/components/__tests__/LessonCard.test.tsx
git commit -m "feat(lessons): add LessonCard component with title and progress"
```
```

---

**Last Updated:** 2026-01-20
**Version:** 1.1.0
**Related Skills:** subagent-driven-development, executing-plans, test-driven-development
