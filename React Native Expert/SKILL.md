---
name: React Native Expert
description: Expert React Native development for building high-quality cross-platform mobile applications with Expo
version: 1.1.0
lastUpdated: 2026-01-20
status: active
requires: [state-management-expert, expo-router-expert]
---

# React Native Expert Skill

## When to Use

Use when building React Native apps with Expo, creating mobile components, implementing navigation, managing state, or optimizing performance.

## Key Principles

- Write platform-agnostic code where possible
- Optimize for performance (60fps)
- Use native modules when necessary
- Follow platform-specific design guidelines (HIG, Material Design)
- Manage state efficiently
- **Use StyleSheet.create() + @/ui/tokens for styling (NO className)**

## Core Concepts

### Components

| Component | Use For |
|-----------|---------|
| `View` | Layout container |
| `Text` | Text content |
| `Image` | Image display |
| `ScrollView` | Scrollable content (avoid for long lists) |
| `FlatList` | Long lists (PREFERRED over ScrollView) |
| `Pressable` | Touchable areas (recommended) |
| `TouchableOpacity` | Button-like pressable |
| `TextInput` | User text input |
| `SafeAreaView` | Safe area for notched devices |
| `Modal` | Modal overlays |
| `ActivityIndicator` | Loading spinners |
| `RefreshControl` | Pull-to-refresh |

### Styling (MANDATORY)

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { layout, spacing, colors, typography, borders, shadows } from '@/ui/tokens';

export function Card({ title, onPress }: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        layout.card,
        spacing.p4,
        borders.roundedMd,
        shadows.sm,
        { backgroundColor: colors.background.primary },
      ]}
    >
      <Text style={typography.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
```

**❌ NEVER use:** `className`, `NativeWind`, `Tailwind`

### Navigation

| Navigator | Use For |
|-----------|---------|
| **Expo Router** | File-based routing (RECOMMENDED) |
| Stack Navigator | Push/pop screens |
| Tab Navigator | Bottom tabs |
| Drawer Navigator | Side menu |

```typescript
// app/index.tsx - Expo Router
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Pressable onPress={() => router.push('/lessons')}>
        <Text>Go to Lessons</Text>
      </Pressable>
    </View>
  );
}

// app/lessons/[id].tsx - Dynamic route
import { useLocalSearchParams } from 'expo-router';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  return <Text>Lesson: {id}</Text>;
}
```

### Animations

| Library | Use For |
|---------|---------|
| `react-native-reanimated` | 60fps animations (PREFERRED) |
| `LayoutAnimation` | Automatic layout transitions |
| `Animated` API | Simple animations |

```typescript
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const handlePress = () => {
  scale.value = withTiming(1.2, { duration: 200 });
};
```

## State Management

### Local State

| Hook | Use For |
|------|---------|
| `useState` | Simple UI state |
| `useRef` | Mutable values without re-render |
| `useEffect` | Side effects (data fetching) |

### Global State

| Solution | Use For |
|----------|---------|
| **Zustand** | Global app state (PREFERRED) |
| Context API | Simple theme/user state |

```typescript
// stores/useLessonStore.ts
import { create } from 'zustand';

interface LessonState {
  lessons: Lesson[];
  isLoading: boolean;
  fetchLessons: () => Promise<void>;
}

export const useLessonStore = create<LessonState>((set) => ({
  lessons: [],
  isLoading: false,
  fetchLessons: async () => {
    set({ isLoading: true });
    try {
      const lessons = await api.getLessons();
      set({ lessons, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
```

### Server State

**TanStack Query (RECOMMENDED):**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: () => api.getLessons(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.completeLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
}
```

### Persistence

| Solution | Use For |
|----------|---------|
| **MMKV** | High-performance storage (PREFERRED) |
| SecureStore | Encrypted values (tokens) |

```typescript
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'secure-key',
});

storage.set('user', JSON.stringify(user));
const user = JSON.parse(storage.getString('user') || 'null');
```

## Performance Optimization

### List Rendering (CRITICAL)

```typescript
import { FlatList } from 'react-native';

<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={8}
  windowSize={10}
/>
```

**Rules:**
- Always use `FlatList` for lists (never `ScrollView`)
- Provide `keyExtractor`
- Use `removeClippedSubviews` for memory optimization

### Memoization

```typescript
import { memo, useCallback, useMemo } from 'react';

const MemoizedItem = memo(function Item({ item, onPress }: ItemProps) {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

// In parent
const renderItem = useCallback(({ item }: { item: Item }) => (
  <MemoizedItem item={item} onPress={handlePress} />
), [handlePress]);

const processedData = useMemo(() =>
  data.filter((d) => d.active),
  [data]
);
```

## Architecture

### Feature-Based Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── api/
│   ├── lessons/
│   ├── flashcards/
│   └── ...
├── shared/
│   ├── components/
│   │   └── Reader/
│   ├── hooks/
│   └── utils/
├── ui/
│   ├── tokens/
│   ├── components/
│   └── primitives/
├── stores/
└── types/
```

### Reader Engine (SHARED)

All reader components MUST be in `@/shared/components/Reader`:

```
shared/components/Reader/
├── ReaderModeContent.tsx
├── LookupSheet.tsx
├── useWordLookup.ts
└── useTranslation.ts
```

## Testing

### Unit Testing

```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

test('renders correctly', () => {
  const { getByText } = render(<Button title="Press" onPress={jest.fn()} />);
  expect(getByText('Press')).toBeTruthy();
});

test('calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button title="Press" onPress={onPress} />);
  fireEvent.press(getByText('Press'));
  expect(onPress).toHaveBeenCalled();
});
```

### E2E Testing

**Maestro (RECOMMENDED):**

```yaml
# flows/lessons.yaml
- appId: com.hanverse.app
- launch
- tap: "Lessons"
- assertVisible: "Lesson List"
- tap: "First Lesson"
- assertVisible: "Practice"
```

## Best Practices

### TypeScript

```typescript
// ✅ CORRECT
interface LessonProps {
  id: string;
  title: string;
  onComplete?: () => void;
}

export function Lesson({ id, title, onComplete }: LessonProps): React.JSX.Element {
  return <Text>{title}</Text>;
}

// ❌ WRONG
function handleData(data: any) {
  return data.something;
}
```

### Platform Handling

```typescript
import { Platform } from 'react-native';

const padding = Platform.select({
  ios: 16,
  android: 12,
  default: 16,
});

const icon = Platform.OS === 'ios' ? 'ios-star' : 'md-star';
```

### Accessibility

```typescript
<Pressable
  accessible={true}
  accessibilityLabel="Add lesson"
  accessibilityHint="Creates a new lesson"
  accessibilityRole="button"
  onPress={handlePress}
>
  <Text>Add</Text>
</Pressable>
```

**Rules:**
- Minimum touch target: 44x44 points
- Use `accessible` prop for interactive elements
- Provide `accessibilityLabel` and `accessibilityHint`

### Offline Support

```typescript
import { useNetInfo } from '@react-native-community/netinfo';

export function useOfflineAware() {
  const netInfo = useNetInfo();

  return {
    isOffline: netInfo.type === 'none' || !netInfo.isConnected,
    isOnline: netInfo.isConnected,
  };
}
```

## Expo Specific

### Recommended SDK Modules

| Module | Use For |
|--------|---------|
| `expo-router` | Navigation |
| `expo-image` | Image loading (PREFERRED over Image) |
| `expo-camera` | Camera |
| `expo-notifications` | Push notifications |
| `expo-av` | Audio/Video |
| `expo-secure-store` | Secure storage |

### EAS Commands

```bash
# Build
eas build --platform ios --profile preview
eas build --platform android --profile preview

# Submit
eas submit -p ios
eas submit -p android

# Update (OTA)
eas update --auto
```

## Common Patterns

### Data Fetching with TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';

export function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    staleTime: 5 * 60 * 1000,
  });
}
```

### Error Boundary

```typescript
import { ErrorBoundary } from 'expo-router';

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  name: string
): React.FC<P> {
  return function ErrorWrapped(props: P) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default withErrorBoundary(LessonScreen, 'LessonScreen');
```

### Optimized FlatList

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={8}
  windowSize={10}
  getItemLayout={(_, index) => ({
    length: 60,
    offset: 60 * index,
    index,
  })}
/>
```

### Platform-Specific Styles

```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      ios: 16,
      android: 12,
    }),
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
  },
});
```

---

**Last Updated:** 2026-01-20
**Version:** 1.1.0
**Related Skills:** state-management-expert, expo-router-expert
