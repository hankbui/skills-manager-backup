<USER_REQUEST>
làm cho tôi skill này vào hệ thống gemini agent của bạn nhé:
Deploy skill vào project
bash# Copy vào user skills (Agent sẽ đọc khi cần)
mkdir -p /Users/hankbui/.gemini/skills/liquid-glass-rn
cp liquid-glass-rn-SKILL.md \
  /Users/hankbui/.gemini/skills/liquid-glass-rn/SKILL.md
Sau đó thêm vào ~/.gemini/GEMINI.md:
md## Skills
- Liquid glass RN: ~/.gemini/skills/liquid-glass-rn/SKILL.md
và thêm skill này vào trong codebase nữa nhé.

  Trigger: bất kỳ yêu cầu nào về "glass effect", "liquid glass", "blur card"

# SKILL: Liquid Glass — React Native / Expo
# Hanverse v4.0 | Đọc file này TRƯỚC KHI viết bất kỳ dòng code liquid glass nào.

---

## 🔬 PHÂN TÍCH KỸ THUẬT: WEB VS NATIVE

### Tại sao web repo (liquid-glass-react) KHÔNG thể port thẳng sang RN

Web dùng:
- `backdrop-filter: url(#svg-filter)` — CSS + SVG filter chain
- `feDisplacementMap` + `feGaussianBlur` + `feImage` — chạy trong browser DOM
<truncated 23302 bytes>
