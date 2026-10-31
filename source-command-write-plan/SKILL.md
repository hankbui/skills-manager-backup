---
name: "source-command-write-plan"
description: "Break work into small verifiable tasks with acceptance criteria and dependency ordering"
---

# source-command-write-plan

Use this skill when the user asks to run the migrated source command `write-plan`.

## Command Template

Invoke the planning-and-task-breakdown skill alongside writing-plans.

Read the existing spec (SPEC.md or equivalent) and the relevant codebase sections. Then:

1. Enter plan mode — read only, no code changes
2. Identify the dependency graph between components
3. Slice work vertically (one complete path per task, not horizontal layers)
4. Write tasks with acceptance criteria and verification steps
5. Add checkpoints between phases
6. Present the plan for human review

Save the plan to docs/plans/YYYY-MM-DD-<feature>.md and task list to tasks/todo.md.
