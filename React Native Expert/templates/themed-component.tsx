import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/ui/hooks'; // Common hook
import { SafeText } from '@/ui/core'; // Rule: Always use SafeText

interface ThemedComponentProps {
  title: string;
  onPress?: () => void;
}

export function ThemedComponent({ title, onPress }: ThemedComponentProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing[4] }]}>
      <SafeText style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
        {title}
      </SafeText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
