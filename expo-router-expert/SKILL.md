---
name: Expo Router Expert
description: Expert in Expo Router file-based navigation, layouts, dynamic routes, and nested navigation patterns
version: 1.0.0
---

# Expo Router Expert Skill

## When to Use
Use when working with Expo Router, creating navigation structures, implementing layouts, or handling dynamic routing in React Native apps.

## Core Concepts

### File-Based Routing
```
app/
  _layout.tsx        # Root layout with providers
  (app)/
    _layout.tsx      # Authenticated layout
    index.tsx        # Home screen
    profile/
      [id].tsx       # Dynamic route
  (auth)/
    login.tsx        # Login screen
    register.tsx     # Registration
```

### Route Groups
- `(app)` - Authenticated routes
- `(auth)` - Unauthenticated routes
- `(admin)` - Admin-only routes

### Dynamic Routes
```typescript
// app/profile/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function Profile() {
  const { id } = useLocalSearchParams();
  return <Text>Profile: {id}</Text>;
}
```

### Search Params
```typescript
// app/search.tsx
import { useGlobalSearchParams, useSearchParams } from 'expo-router';

export default function Search() {
  const [params] = useGlobalSearchParams();
  // or
  const { q, page } = useSearchParams();
}
```

## Layout Patterns

### Root Layout
```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

### Tab Layout
```typescript
// app/(app)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
```

### Drawer Layout
```typescript
import { Drawer } from 'expo-router';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="home" />
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}
```

## Navigation Actions

### Programmatic Navigation
```typescript
import { router, useRouter } from 'expo-router';

router.push('/profile/123');
router.replace('/login');
router.back();
router.canGoBack();
```

### Passing Data
```typescript
router.push({
  pathname: '/profile/[id]',
  params: { id: '123', from: 'home' },
});
```

### Prefetching
```typescript
import { useFocusEffect } from '@expo/router';

useFocusEffect(() => {
  // Run when screen comes into focus
  fetchData();
});
```

## Hooks

### useLocalSearchParams
- Per-screen params
- Updates on screen focus

### useGlobalSearchParams
- Global params across app
- Persists across navigation

### useNavigation
- Low-level navigation API
- For complex scenarios

### useRoute
- Current route info
- For conditional rendering

## Best Practices

### Performance
- Use `dynamic` routes for IDs
- Implement lazy loading
- Avoid deep nesting (>3 levels)

### Deep Linking
```typescript
// app/+html.tsx for handling web URLs
// or linking config in app.json
```

### Error Handling
```typescript
import { ErrorBoundary } from 'expo-router';

<ErrorBoundary>
  <Stack />
</ErrorBoundary>
```

## Common Patterns

### Protected Routes
```typescript
// app/(app)/_layout.tsx
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedLayout() {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect href="/login" />;
  }
  
  return <Stack />;
}
```

### Redirect After Auth
```typescript
// After successful login
router.replace({
  pathname: '/(app)/home',
  params: { welcome: 'true' },
});
```

### Nested Tabs in Stack
```typescript
// app/(app)/_layout.tsx
export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="detail/[id]" options={{ title: 'Detail' }} />
    </Stack>
  );
}
```

## Testing

```typescript
import { renderRouter, fireEvent } from '@testing-library/react-native';

// Basic navigation test
renderRouter({
  index: () => <Home />,
  profile: () => <Profile />,
});

// Interaction test
const { getByText } = renderRouter({
  home: () => <Home />,
});

fireEvent.press(getByText('Go to Profile'));
```

## Resources
- https://expo.github.io/router
- https://docs.expo.dev/router/introduction/
