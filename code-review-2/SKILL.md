---
name: code-review
description: Code review uncommitted local changes for bugs, security vulnerabilities, coding standards compliance, and code clarity. Use when asked to review code or check uncommitted changes.
---

# Code Review Skill

Code review uncommitted local changes for bugs, security vulnerabilities, CLAUDE.md compliance, and code clarity.

## Usage

When user asks to review code or asks "review", use this skill to perform a comprehensive code review.

## Process

### Step 1: Check Working Directory State
Run these commands to see what changed:
```
git status
git diff --name-only
git diff --stat
```

### Step 2: Review Changes
Read and analyze the changed files. For each file, check:

1. **Bugs & Logic Errors**
   - null/undefined handling
   - off-by-one errors
   - race conditions
   - resource leaks
   - error handling gaps

2. **Security Vulnerabilities**
   - injection flaws
   - XSS vulnerabilities
   - auth bypass issues
   - sensitive data exposure
   - insecure dependencies

3. **TypeScript Type Safety**
   - type errors
   - missing type annotations
   - any usage
   - unsafe casts

4. **Code Quality**
   - code clarity and readability
   - consistent naming conventions
   - DRY principle
   - KISS principle
   - SRP (Single Responsibility Principle)

5. **CLAUDE.md Compliance**
   - project-specific conventions
   - coding standards
   - architectural patterns

### Step 3: Report Issues

Group findings by severity:

- **Critical**: Must fix before committing (bugs, security issues)
- **Warning**: Should consider fixing (code quality, type safety)
- **Suggestion**: Optional improvements (clarity, readability)

## Output Format

```
### Code Review

Found N issues in uncommitted changes:

**Critical** (X issues)

1. **file.ts:42** - Brief description
   Explanation and suggested fix

**Warning** (Y issues)

1. **file.ts:15** - Brief description
   Explanation and suggested fix

**Suggestions** (Z issues)

1. **file.ts:28** - Brief description
   Explanation and suggestion
```

## Notes

- Focus on significant issues, avoid nitpicks
- Consider the context of the changes
- Check for pre-existing issues vs. new issues
- Prioritize issues that affect functionality
