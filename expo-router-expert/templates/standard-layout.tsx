import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '@/ui/hooks'; // Example hook

export default function StandardLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    />
  );
}
