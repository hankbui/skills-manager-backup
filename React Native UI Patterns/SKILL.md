---
name: React Native UI Patterns
description: Modern React Native UI patterns for loading states, error handling, and data fetching. Use when building UI components, handling async data, or managing UI states in React Native apps.
version: 1.1.0
lastUpdated: 2026-01-20
status: active
requires: [react-native-expert, state-management-expert]
---

# React Native UI Patterns

## Core Principles

1. **Never show stale UI** - Loading spinners only when actually loading
2. **Always surface errors** - Users must know when something fails
3. **Optimistic updates** - Make the UI feel instant
4. **Progressive disclosure** - Show content as it becomes available
5. **Graceful degradation** - Partial data is better than no data

## Loading State Patterns

### The Golden Rule

**Show loading indicator ONLY when there's no data to display.**

```typescript
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { layout, spacing, colors, typography } from '@/ui/tokens';
import { useLessons } from '@/features/lessons/hooks/useLessons';

export function LessonsScreen() {
  const { data, isLoading, error, refetch } = useLessons();

  if (error) {
    return (
      <View style={[layout.center, spacing.p4]}>
        <Text style={typography.body}>Failed to load lessons</Text>
        <Text style={typography.caption}>{error.message}</Text>
      </View>
    );
  }

  if (isLoading && !data) {
    return (
      <View style={[layout.center, spacing.p4]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={[layout.center, spacing.p4]}>
        <Text style={typography.body}>No lessons yet</Text>
      </View>
    );
  }

  return <LessonList lessons={data} />;
}
```

```typescript
// WRONG - Shows spinner even when we have cached data
if (isLoading) return <LoadingSpinner />; // Flashes on refetch!
```

### Loading State Decision Tree

```
Is there an error?
  → Yes: Show error state with retry option
  → No: Continue

Is it loading AND we have no data?
  → Yes: Show loading indicator (ActivityIndicator/Skeleton)
  → No: Continue

Do we have data?
  → Yes, with items: Show the data
  → Yes, but empty: Show empty state
  → No: Show loading (fallback)
```

### Skeleton vs Spinner

| Use Skeleton When | Use Spinner When |
|-------------------|------------------|
| Known content shape | Unknown content shape |
| List/card layouts | Modal actions |
| Initial page load | Button submissions |
| Content placeholders | Inline operations |

```typescript
// Skeleton example for React Native
import { View } from 'react-native';
import { colors } from '@/ui/tokens';

export function SkeletonCard() {
  return (
    <View style={{ backgroundColor: colors.surface.secondary, borderRadius: 8, padding: 16 }}>
      <View style={{ height: 20, backgroundColor: colors.border, borderRadius: 4 }} />
      <View style={{ height: 12, marginTop: 8, backgroundColor: colors.border, borderRadius: 4, width: '60%' }} />
    </View>
  );
}
```

## Error Handling Patterns

### The Error Handling Hierarchy

```
1. Inline error (field-level) → Form validation errors
2. Toast notification → Recoverable errors, user can retry
3. Error banner → Page-level errors, data still partially usable
4. Full error screen → Unrecoverable, needs user action
```

### Always Show Errors

**CRITICAL: Never swallow errors silently.**

```typescript
import { useCreateLessonMutation } from '@/features/lessons/api/useLessons';
import { useToast } from '@/shared/hooks/useToast';

export function useCreateLesson() {
  const toast = useToast();
  
  return useCreateLessonMutation({
    onCompleted: () => {
      toast.show({ title: 'Lesson created', type: 'success' });
    },
    onError: (error) => {
      console.error('createLesson failed:', error);
      toast.show({ title: 'Failed to create lesson', type: 'error' });
    },
  });
}

// WRONG - Error silently caught, user has no idea
const [createLesson] = useCreateLessonMutation({
  onError: (error) => {
    console.error(error); // User sees nothing!
  },
});
```

### Error State Component Pattern

```typescript
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { layout, spacing, typography, colors } from '@/ui/tokens';

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
  title?: string;
}

export function ErrorState({ error, onRetry, title }: ErrorStateProps) {
  return (
    <View style={[layout.center, spacing.p4, { backgroundColor: colors.background.secondary }]}>
      <Ionicons name="alert-circle" size={48} color={colors.error} />
      <Text style={[typography.title, { marginTop: spacing.p2 }]}>
        {title ?? 'Something went wrong'}
      </Text>
      <Text style={[typography.body, { marginTop: spacing.p1, color: colors.text.muted }]}>
        {error.message}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={[spacing.p2, spacing.px4, { backgroundColor: colors.primary, borderRadius: 8 }]}
        >
          <Text style={[typography.button, { color: colors.white }]}>Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}
```

## Button State Patterns

### Button Loading State

```typescript
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/ui/tokens';

interface ButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ onPress, isLoading, disabled, children }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        {
          opacity: (disabled || isLoading) ? 0.6 : pressed ? 0.8 : 1,
          backgroundColor: colors.primary,
          padding: 12,
          borderRadius: 8,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={{ color: colors.white, textAlign: 'center' }}>{children}</Text>
      )}
    </Pressable>
  );
}
```

### Disable During Operations

**CRITICAL: Always disable triggers during async operations.**

```typescript
// CORRECT - Button disabled while loading
<Button
  onPress={handleSubmit}
  isLoading={isSubmitting}
  disabled={!isValid || isSubmitting}
>
  Submit
</Button>

// WRONG - User can tap multiple times
<Button onPress={handleSubmit}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

## Empty States

### Empty State Requirements

Every list/collection MUST have an empty state:

```typescript
// WRONG - No empty state
<FlatList data={items} renderItem={renderItem} />

// CORRECT - Explicit empty state
<FlatList
  data={items}
  renderItem={renderItem}
  ListEmptyComponent={<EmptyState />}
/>
```

### Contextual Empty States

```typescript
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { layout, spacing, typography, colors } from '@/ui/tokens';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={[layout.center, spacing.p4, { flex: 1 }]}>
      {icon && <Ionicons name={icon} size={48} color={colors.text.muted} />}
      <Text style={[typography.title, { marginTop: spacing.p2 }]}>{title}</Text>
      {description && (
        <Text style={[typography.body, { marginTop: spacing.p1, color: colors.text.muted }]}>
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={[spacing.p2, spacing.px4, { backgroundColor: colors.primary, borderRadius: 8, marginTop: spacing.p3 }]}
        >
          <Text style={[typography.button, { color: colors.white }]}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

// Usage examples
<EmptyState icon="search" title="No results found" description="Try different search terms" />
<EmptyState icon="add-circle" title="No lessons yet" description="Create your first lesson" actionLabel="Create" onAction={handleCreate} />
```

## Form Submission Pattern

```typescript
import { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useSubmitLessonMutation } from '@/features/lessons/api/useLessons';
import { useToast } from '@/shared/hooks/useToast';
import { layout, spacing, colors, typography } from '@/ui/tokens';

export function LessonForm() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  
  const [submit, { loading }] = useSubmitLessonMutation({
    onCompleted: () => {
      toast.show({ title: 'Lesson saved', type: 'success' });
      setName('');
    },
    onError: (error) => {
      toast.show({ title: 'Failed to save', type: 'error' });
    },
  });

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    await submit({ name: name.trim() });
  };

  return (
    <View style={spacing.p4}>
      <View>
        <Text style={typography.label}>Lesson Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          style={[
            typography.body,
            {
              borderWidth: 1,
              borderColor: errors.name ? colors.error : colors.border,
              borderRadius: 8,
              padding: 12,
              marginTop: spacing.p1,
            },
          ]}
          placeholder="Enter lesson name"
        />
        {errors.name && (
          <Text style={[typography.caption, { color: colors.error, marginTop: spacing.p1 }]}>
            {errors.name}
          </Text>
        )}
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        style={[
          spacing.p3,
          {
            backgroundColor: loading ? colors.text.muted : colors.primary,
            borderRadius: 8,
            marginTop: spacing.p3,
          },
        ]}
      >
        <Text style={[typography.button, { color: colors.white, textAlign: 'center' }]}>
          {loading ? 'Saving...' : 'Save Lesson'}
        </Text>
      </Pressable>
    </View>
  );
}
```

## Anti-Patterns

### Loading States

```typescript
// WRONG - Spinner when data exists (causes flash)
if (isLoading) return <ActivityIndicator />;

// CORRECT - Only show loading without data
if (isLoading && !data) return <ActivityIndicator />;
```

### Error Handling

```typescript
// WRONG - Error swallowed
try {
  await mutation();
} catch (e) {
  console.log(e); // User has no idea!
}

// CORRECT - Error surfaced
onError: (error) => {
  console.error('operation failed:', error);
  toast.show({ title: 'Operation failed', type: 'error' });
}
```

### Button States

```typescript
// WRONG - Button not disabled during submission
<Pressable onPress={submit}>
  <Text>Submit</Text>
</Pressable>

// CORRECT - Disabled and shows loading
<Pressable onPress={submit} disabled={loading}>
  <Text>{loading ? 'Submitting...' : 'Submit'}</Text>
</Pressable>
```

## Checklist

Before completing any UI component:

**UI States:**
- [ ] Error state handled and shown to user
- [ ] Loading state shown only when no data exists
- [ ] Empty state provided for collections
- [ ] Buttons disabled during async operations
- [ ] Buttons show loading indicator when appropriate

**Data & Mutations:**
- [ ] Mutations have onError handler
- [ ] All user actions have feedback (toast/visual)

## Integration with Other Skills

- **state-management-expert**: Use TanStack Query patterns with proper error handling
- **testing-patterns**: Test all UI states (loading, error, empty, success)
- **react-native-expert**: Apply React Native component patterns

---

**Last Updated:** 2026-01-20
**Version:** 1.1.0
