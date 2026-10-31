import { useRouter } from 'expo-router';

// Best practice: Use typed paths and params
const router = useRouter();

// ❌ Avoid: router.push('/user/123')
// ✅ Prefer:
router.push({
  pathname: '/user/[id]', // Dynamic route
  params: { id: '123' },   // Typed params
});

// ✅ Prefer for tab switching:
router.replace('/(app)/home');
