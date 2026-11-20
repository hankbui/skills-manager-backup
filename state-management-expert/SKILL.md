---
name: State Management Expert
description: Expert in React Native state management with Zustand, TanStack Query, Context API, and persistence patterns
version: 1.1.0
lastUpdated: 2026-01-20
status: active
requires: [react-native-expert]
---

# State Management Expert Skill

## When to Use

Use when implementing global state, managing server state, handling persistence, or choosing the right state solution for React Native apps.

## State Categories

### UI State (Local)

- Component-specific state
- Managed with `useState`, `useReducer`
- Example: `isModalOpen`, `inputValue`, `isExpanded`

### App State (Global)

- Shared across components
- Managed with Zustand, Context
- Example: `user`, `theme`, `auth`

### Server State (Remote)

- Data from API
- Managed with TanStack Query
- Example: `users`, `posts`, `lessons`

## Zustand Pattern

### Basic Store

```typescript
import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';

const storage = new MMKV({ id: 'user-storage' });

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => storage.getString(name) ?? null,
        setItem: (name, value) => storage.set(name, value),
        removeItem: (name) => storage.delete(name),
      })),
    }
  )
);
```

### Store with Actions

```typescript
import { create } from 'zustand';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  isLoading: boolean;

  fetchLessons: () => Promise<void>;
  setCurrentLesson: (lesson: Lesson) => void;
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessons: [],
  currentLesson: null,
  isLoading: false,

  async fetchLessons() {
    set({ isLoading: true });
    try {
      const lessons = await api.getLessons();
      set({ lessons, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  completeLesson: (lessonId) => {
    set((state) => ({
      lessons: state.lessons.map((l) =>
        l.id === lessonId ? { ...l, completed: true } : l
      ),
    }));
  },

  resetProgress: () => set({ lessons: [], currentLesson: null }),
}));
```

### Selectors

```typescript
// Component using selector
const completedLessons = useLessonStore((state) =>
  state.lessons.filter((l) => l.completed)
);

// Custom hook for derived state
export function useProgress() {
  const lessons = useLessonStore((state) => state.lessons);

  return useMemo(() => {
    const total = lessons.length;
    const completed = lessons.filter((l) => l.completed).length;
    const percent = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, percent };
  }, [lessons]);
}
```

## TanStack Query Pattern

### Setup

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// In _layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Data Fetching

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query hook
export function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: () => api.getLessons(),
  });
}

// Mutation with invalidation
export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => api.completeLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}
```

### Optimistic Updates

```typescript
export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => api.likePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (old: Post[]) =>
        old.map((post) =>
          post.id === postId
            ? { ...post, likes: post.likes + 1, liked: true }
            : post
        )
      );

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

### Infinite Query

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteLessons() {
  return useInfiniteQuery({
    queryKey: ['lessons', 'infinite'],
    queryFn: ({ pageParam = 0 }) => api.getLessons({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 0,
  });
}

// Usage
const { data, fetchNextPage, hasNextPage } = useInfiniteLessons();
```

## Context API Pattern

### Simple Context

```typescript
// context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Complex Context with Reducer

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
```

## Persistence Pattern

### MMKV for Performance (PREFERRED)

```typescript
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'secure-key',
});

// Direct usage
storage.set('user', JSON.stringify(user));
const user = JSON.parse(storage.getString('user') || 'null');
storage.delete('user');

// With Zustand
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => storage.getString(name) ?? null,
        setItem: (name, value) => storage.set(name, value),
        removeItem: (name) => storage.delete(name),
      })),
    }
  )
);
```

### AsyncStorage (DEPRECATED - Use MMKV)

```typescript
// ❌ DO NOT USE - For reference only
import AsyncStorage from '@react-native-async-storage/async-storage';

// Previous pattern
await AsyncStorage.setItem('key', value);
const value = await AsyncStorage.getItem('key');
```

## Directory Structure

```
src/
  stores/
    useAuthStore.ts
    useLessonStore.ts
    useSettingsStore.ts
  hooks/
    useLessons.ts
    useUser.ts
    useProgress.ts
  context/
    ThemeContext.tsx
    AuthContext.tsx
  lib/
    queryClient.ts
```

## Naming Conventions

| Pattern | Example |
|---------|---------|
| Zustand hooks | `useUserStore`, `useLessonStore` |
| Custom hooks | `useLessons`, `useUserProgress` |
| Context | `AuthContext`, `ThemeContext` |

## Performance Tips

1. **Select only needed state** - Prevent unnecessary re-renders
2. **Memoize expensive computations** - Use `useMemo`
3. **Use shallow comparison** - For derived state
4. **Persist strategically** - Only persist what you need

## Common Patterns

### Offline-First

```typescript
export function useOfflineLessons() {
  const { data: lessons } = useLessons();
  const { data: cachedLessons } = useQuery({
    queryKey: ['lessons', 'offline'],
    queryFn: () => getCachedLessons(),
    networkMode: 'offlineFirst',
  });

  return lessons ?? cachedLessons ?? [];
}
```

### Dependent Queries

```typescript
export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ['users', userId, 'posts'],
    queryFn: () => api.getUserPosts(userId),
    enabled: !!userId, // Only run if userId exists
  });
}
```

### Query with Initial Data

```typescript
export function useLessons(initialData: Lesson[]) {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: () => api.getLessons(),
    initialData, // Hydrate from server-side or cache
  });
}
```

## Debugging

### Zustand DevTools

```typescript
import { devtools, subscribeWithSelector } from 'zustand/middleware';

const useStore = create(
  devtools(
    subscribeWithSelector((set) => ({
      // state
    })),
    { name: 'my-store' }
  )
);
```

### React Query DevTools

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  {children}
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

**Last Updated:** 2026-01-20
**Version:** 1.1.0
**Related Skills:** react-native-expert, test-driven-development
