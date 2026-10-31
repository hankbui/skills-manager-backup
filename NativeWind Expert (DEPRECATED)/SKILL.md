---
name: NativeWind Expert (DEPRECATED)
description: DO NOT USE - See @/ui/tokens styling instead
version: 1.0.0
lastUpdated: 2024-01-15
status: deprecated
redirectTo: .agent/DEPRECATED.md
---

# ⚠️ DEPRECATED - KHÔNG DÙNG

**Skill này đã DEPRECATED. Vui lòng không sử dụng.**

## Thay thế bằng

Sử dụng `style + @/ui/tokens` thay vì NativeWind/Tailwind:

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { layout, spacing, colors, typography, borders } from '@/ui/tokens';

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[layout.rowCenter, spacing.p4, borders.roundedMd, { backgroundColor: colors.primary }]}
    >
      <Text style={typography.body}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
```

## Xem thêm

- `.agent/rule.md` - QUY TẮC VÀNG về styling
- `.agent/DEPRECATED.md` - Danh sách patterns cũ
- `src/ui/tokens/` - Design tokens của project

---

**Last Updated:** 2024-01-15
**Status:** Deprecated - Use style + @/ui/tokens instead
