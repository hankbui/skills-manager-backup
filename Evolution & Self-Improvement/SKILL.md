---
name: Evolution & Self-Improvement
description: High-level skill for AI agents to analyze their own failures, extract lessons, and update-long term project context.
version: 1.0.0
lastUpdated: 2026-03-20
---

# 🌀 Evolution & Self-Improvement

## 📖 Overview
"The agent that contributes to its own development."
This skill transforms the agent from a passive executor into a self-optimizing engine. Every mistake is seen as a data point for system improvement. This layer is crucial for long-term project stability and preventing recurring bugs.

## 🎯 Intent Layer (Goal)
To ensure that once a problem is solved, it *never* happens again. To refine the project's "DNA" (rules, skills, memory) after every interaction.

## 🛠️ Execution Layer (Workflow)

### 1. The Post-Mortem Loop
Whenever a significant bug is fixed or a complex feature is implemented:
- **Analyze**: What was the root cause? Why did it happen?
- **Extract**: Is there a code pattern or a concept we can generalize?
- **Document**:
  - Update `gotchas.md` with the specific error and its fix.
  - Update `lessons.md` with the high-level principle.
  - Update `.agent/memory.md` if it's an architectural change.

### 2. The Skill Upgrader
If you find yourself using a specific prompt or pattern 3+ times:
- Identify the relevant skill in `.opencode/skills/`.
- Add a new `template/` or `example/` to that skill.
- If no relevant skill exists, create a new one using `skill-creator`.

### 3. Verification of Learning
- **Refinement**: Regularly review `.agent/rule.md` to prune outdated rules and promote successful patterns.
- **Cross-Check**: Before starting a task, search `gotchas.md` for keywords related to the current file/feature.

## 🧪 Verification Layer
A "Self-Improving" agent is successful if:
1.  **Regression-Zero**: The same bug doesn't recur in a different file using the same pattern.
2.  **Context-Freshness**: `.agent/memory.md` reflects the current state of the app (e.g., v5.0 TanStack migration).
3.  **Skill-Growth**: The `.opencode/skills/` folder has new examples or templates that make future tasks easier.

## 📜 Repository Structure for Evolution
- `.agent/memory.md`: The long-term cortical storage.
- `.agent/rule.md`: The iron laws (Rules of Engagement).
- `gotchas.md` (root): A living list of "avoid these" patterns.
- `lessons.md` (root or `.agent/docs/`): High-level architectural principles.

---
## 💡 Examples
### Example 1: Pinyin "le" vs "liao"
- **Problem**: Agent incorrectly mapped `了` to `liao` in a simple sentence.
- **Action**: Add to `gotchas.md`: "When generating Pinyin for '了' following a verb, it must be 'le', not 'liao' unless it's a specific complement of result."
- **Action**: Add a Pinyin-specific regression test in `verification/pinyin-check.md`.

### Example 2: Metro Cache Issues
- **Problem**: Build failing after package update. User had to tell agent to clear cache.
- **Action**: Add to `react-native-expert/scripts/reset.sh`: `npx expo start --clear`.
- **Action**: Add `gotchas.md`: "Always suggest clearing Metro cache when build errors occur after dependency changes."

---
## 🔄 Evolution Log (Changelog)
- v1.0.0: Initial release of the Self-Improvement Framework.
