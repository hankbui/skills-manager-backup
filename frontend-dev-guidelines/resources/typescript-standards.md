# TypeScript Standards

TypeScript best practices for type safety and maintainability in React Native code.

---

## Strict Mode

### Configuration

TypeScript strict mode is **enabled** in the project:

```json
// tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
```

**This means:**
- No implicit `any` types
- Null/undefined must be handled explicitly
- Type safety enforced

---

## No `any` Type

### The Rule

```typescript
// ❌ NEVER use any
function handleData(data: any) {
    return data.something;
}

// ✅ Use specific types
interface MyData {
    something: string;
}

function handleData(data: MyData) {
    return data.something;
}

// ✅ Or use unknown for truly unknown data
function handleUnknown(data: unknown) {
    if (typeof data === 'object' && data !== null && 'something' in data) {
        return (data as MyData).something;
    }
}
```

**If you truly don't know the type:**
- Use `unknown` (forces type checking)
- Use type guards to narrow
- Document why type is unknown

---

## Explicit Return Types

### Function Return Types

```typescript
// ✅ CORRECT - Explicit return type
function getUser(id: number): Promise<User> {
    return apiClient.get(`/users/${id}`);
}

function calculateTotal(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ AVOID - Implicit return type (less clear)
function getUser(id: number) {
    return apiClient.get(`/users/${id}`);
}
```

### Component Return Types

```typescript
// React Native component with explicit return type
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
    title: string;
}

export function MyComponent({ title }: MyComponentProps): React.JSX.Element {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}

// For custom hooks
function useMyData(id: number): { data: Data | null; isLoading: boolean } {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    return { data, isLoading };
}
```

---

## Type Imports

### Use 'type' Keyword

```typescript
// ✅ CORRECT - Explicitly mark as type import
import type { User } from '@/types/user';
import type { Lesson } from '@/features/lessons/types';

// ❌ AVOID - Mixed value and type imports
import { User } from '@/types/user';  // Unclear if type or value
```

**Benefits:**
- Clearly separates types from values
- Better tree-shaking
- Prevents circular dependencies
- TypeScript compiler optimization

---

## Component Prop Interfaces

### Interface Pattern

```typescript
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Props for Card component
 */
interface CardProps {
    /** The card title */
    title: string;

    /** Optional callback when card is pressed */
    onPress?: () => void;

    /** Display variant */
    variant?: 'primary' | 'secondary';

    /** Custom container style */
    style?: ViewStyle;
}

export function Card({ title, onPress, variant = 'primary', style }: CardProps): React.JSX.Element {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                variant === 'secondary' && styles.secondary,
                style,
            ]}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    secondary: {
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
});
```

**Key Points:**
- Separate interface for props
- JSDoc comments for each prop
- Optional props use `?`
- Provide defaults in destructuring

### Props with Children

```typescript
interface ContainerProps {
    children: React.ReactNode;
    title: string;
}

export function Container({ children, title }: ContainerProps): React.JSX.Element {
    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            {children}
        </View>
    );
}
```

---

## Utility Types

### Partial<T>

```typescript
// Make all properties optional
type UserUpdate = Partial<User>;

function updateUser(id: number, updates: Partial<User>) {
    // updates can have any subset of User properties
}
```

### Pick<T, K>

```typescript
// Select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;

const preview: UserPreview = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    // Other User properties not allowed
};
```

### Omit<T, K>

```typescript
// Exclude specific properties
type UserWithoutPassword = Omit<User, 'password' | 'passwordHash'>;

const publicUser: UserWithoutPassword = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    // password and passwordHash not allowed
};
```

### Required<T>

```typescript
// Make all properties required
type RequiredConfig = Required<Config>;  // All optional props become required
```

### Record<K, V>

```typescript
// Type-safe object/map
const userMap: Record<string, User> = {
    'user1': { id: 1, name: 'John' },
    'user2': { id: 2, name: 'Jane' },
};

// For styles
const styles: Record<string, ViewStyle> = {
    container: { padding: 16 },
    header: { marginBottom: 8 },
};
```

---

## Type Guards

### Basic Type Guards

```typescript
function isUser(data: unknown): data is User {
    return (
        typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'name' in data
    );
}

// Usage
if (isUser(response)) {
    console.log(response.name);  // TypeScript knows it's User
}
```

### Discriminated Unions

```typescript
type LoadingState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: Data }
    | { status: 'error'; error: Error };

function Component({ state }: { state: LoadingState }) {
    // TypeScript narrows type based on status
    if (state.status === 'success') {
        return <Display data={state.data} />;  // data available here
    }

    if (state.status === 'error') {
        return <ErrorView error={state.error} />;  // error available here
    }

    return <LoadingView />;
}
```

---

## Generic Types

### Generic Functions

```typescript
function getById<T extends { id: string | number }>(items: T[], id: string | number): T | undefined {
    return items.find(item => item.id === id);
}

// Usage with type inference
const users: User[] = [...];
const user = getById(users, 123);  // Type: User | undefined
```

### Generic Components

```typescript
import { FlatList, View, Text } from 'react-native';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>): React.JSX.Element {
    return (
        <FlatList
            data={items}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={keyExtractor}
        />
    );
}

// Usage
<List<User>
    items={users}
    renderItem={(user) => <UserRow user={user} />}
    keyExtractor={(user) => user.id}
/>
```

---

## Type Assertions (Use Sparingly)

### When to Use

```typescript
// ✅ OK - When you know more than TypeScript
const element = nativeEvent.nativeEvent; // Already typed

// ✅ OK - API response that you've validated
const response = await api.getData();
const user = response.data as User;  // You know the shape
```

### When NOT to Use

```typescript
// ❌ AVOID - Circumventing type safety
const data = getData() as any;  // WRONG - defeats TypeScript

// ❌ AVOID - Unsafe assertion
const value = unknownValue as string;  // Might not actually be string
```

---

## Null/Undefined Handling

### Optional Chaining

```typescript
// ✅ CORRECT
const name = user?.profile?.name;

// Equivalent to:
const name = user && user.profile && user.profile.name;
```

### Nullish Coalescing

```typescript
// ✅ CORRECT
const displayName = user?.name ?? 'Anonymous';

// Only uses default if null or undefined
// (Different from || which triggers on '', 0, false)
```

### Non-Null Assertion (Use Carefully)

```typescript
// ✅ OK - When you're certain value exists
const data = queryClient.getQueryData<Data>(['data'])!;

// ⚠️ CAREFUL - Only use when you KNOW it's not null
// Better to check explicitly:
const data = queryClient.getQueryData<Data>(['data']);
if (data) {
    // Use data
}
```

---

## Summary

**TypeScript Checklist:**
- ✅ Strict mode enabled
- ✅ No `any` type (use `unknown` if needed)
- ✅ Explicit return types on functions
- ✅ Use `import type` for type imports
- ✅ JSDoc comments on prop interfaces
- ✅ Utility types (Partial, Pick, Omit, Required, Record)
- ✅ Type guards for narrowing
- ✅ Optional chaining and nullish coalescing
- ❌ Avoid type assertions unless necessary

**See Also:**
- [component-patterns.md](component-patterns.md) - Component typing
- [data-fetching.md](data-fetching.md) - API typing

---

**Last Updated:** 2026-01-20
