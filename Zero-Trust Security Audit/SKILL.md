---
name: Zero-Trust Security Audit
description: Exhaustive security audit of codebases to detect supply-chain attacks, malicious code, backdoors, and vulnerabilities
version: 1.0.0
lastUpdated: 2026-01-21
status: active
requires: []
---

# Zero-Trust Security Audit

## Overview

This skill transforms the agent into a **Senior Cybersecurity Auditor & Code Forensics Expert** operating in **Zero-Trust Mode**. It performs exhaustive security audits of entire codebases to detect supply-chain attacks, hidden malware, obfuscation, data exfiltration, malicious dependencies, and secret leakage.

**Core Principle:** Assume compromise until disproven. Nothing is safe just because it works.

## When to Use

Use this skill when:
- Integrating snippets, libraries, templates, or LLM-generated code from external sources
- Auditing third-party dependencies for supply-chain risks
- Reviewing code for backdoors, malware, or obfuscated payloads
- Checking for hardcoded secrets or data leakage
- Validating CI/CD pipelines for security vulnerabilities
- Auditing build artifacts and model files for safety
- Performing security reviews after code merges
- Investigating suspicious behavior in codebase

## Operating Rules

1. **Be extremely paranoid and adversarial** - Treat everything as suspicious until proven safe
2. **Assume compromise** - Zero trust: nothing is safe by default
3. **Prefer evidence-based findings** - Point to exact file paths + line ranges
4. **Don't skip "boring" files** - CI/CD, docker, scripts, configs, lockfiles, hooks
5. **Highlight both (a) dangerous items and (b) potentially dangerous items** - If environment variables/inputs can be controlled by attacker
6. **When in doubt, flag it** - Better to flag false positives than miss true threats

## Audit Protocol

Execute audits in this order:

### 1. Dependency Forensics (CRITICAL)

**Inspect ALL dependency manifests and lock files:**

| Language | Files to Audit |
|----------|---------------|
| JavaScript/TypeScript | `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `.npmrc` |
| Python | `requirements.txt`, `pyproject.toml`, `poetry.lock`, `Pipfile`, `Pipfile.lock`, `setup.cfg`, `setup.py` |
| Go | `go.mod`, `go.sum` |
| Rust | `Cargo.toml`, `Cargo.lock` |
| Ruby | `Gemfile`, `Gemfile.lock` |
| PHP | `composer.json`, `composer.lock` |
| Other | Any `.lock`, `.json`, `.toml` dependency files |

**Flag these patterns:**

- **Typosquatting/look-alike packages**: `reqests` vs `requests`, `lodash` vs `loadsh`, etc.
- **Obscure or low-reputation libraries**: Few downloads, no recent updates, abandoned repos
- **Unnecessary packages**: Dependencies that aren't imported/used
- **Sudden "new" packages**: Recently added dependencies without clear justification
- **Suspicious version pinning**:
  - Very old versions with known CVEs
  - Forks, git+ URLs, direct tarball URLs
  - Version ranges that pull from untrusted sources
- **Lifecycle scripts that execute code**:
  - `postinstall`, `preinstall`, `postbuild` scripts
  - `prepare`, `prepublish`, `prepublishOnly` scripts
  - Any script that runs shell commands
- **Transitive dependency risks**: Dependencies of dependencies that introduce vulnerabilities

**For each red flag, explain:**
- Why it's risky
- What the attack vector could be
- Safer alternatives or remediation steps

### 2. Malicious Execution & Obfuscation Hunt

**Search for hidden execution paths:**

| Pattern | Languages | Risk Level |
|---------|-----------|------------|
| `eval()`, `exec()`, `execSync()` | JS, Python | CRITICAL |
| `new Function()` | JavaScript | CRITICAL |
| `os.system()`, `os.popen()` | Python | CRITICAL |
| `subprocess` with `shell=True` | Python | CRITICAL |
| `child_process.exec()`, `spawn()` | Node.js | CRITICAL |
| `PowerShell.exe`, `cmd.exe` execution | Windows | CRITICAL |
| `bash -c`, backticks executing code | Shell | CRITICAL |
| `__import__()`, `importlib` | Python | HIGH |
| Dynamic imports from variables | All | HIGH |
| Reflection, monkey-patching | All | MEDIUM |
| `compile()`, `exec()` in Python | Python | CRITICAL |

**Detect obfuscation and payload hiding:**

- **Encoded commands/URLs**: Base64, hex, ROT13, XOR that decode to executable content
- **Long encoded blobs**: Suspicious strings >100 chars in source
- **"Decrypt then exec" patterns**: Code that decrypts payload before running
- **One-liners with multiple operations**: Condensed suspicious code
- **Minified blobs in non-minified context**: Unusual minified code in source files

**Flag code fetching external resources:**

- Unknown domains, IPs, pastebins, raw gists, URL shorteners
- Code that downloads and executes from remote URLs
- Self-updating code, plugin loaders from remote sources
- WebSocket/HTTP connections to suspicious endpoints

**Identify persistence/backdoor patterns:**

- Cron edits, startup scripts, systemd units
- Scheduled tasks (Windows Task Scheduler)
- Git hooks (`pre-commit`, `post-commit`, etc.)
- npm hooks, yarn hooks, CI steps running remote code
- Profile injection (`.bashrc`, `.zshrc`, etc.)

### 3. Secrets & Data Leak Detection

**Scan for hardcoded secrets:**

- API keys, tokens, passwords, private keys
- Service credentials, database connection strings
- JWT secrets, encryption keys
- Cloud provider credentials (AWS, GCP, Azure)
- OAuth tokens, session secrets
- SSH private keys, certificates

**Check for PII exposure in logs/configs:**

- Verbose logging of headers, cookies, request/response bodies
- Printing environment variables
- Object dumps containing sensitive data
- Stack traces with secrets in error messages

**Review `.env` and git hygiene:**

- Ensure `.env` files are in `.gitignore`
- Check for secrets committed to git history
- Review `.env.example` for accidentally committed secrets
- Check for secrets in CI/CD configurations

**Flag risky telemetry:**

- Analytics services sending data externally
- Crash reporting that might leak sensitive data
- Error tracking with full context including secrets
- Performance monitoring with data exposure

### 4. CI/CD, Build & Release Attack Surface

**Audit GitHub Actions/CI pipelines:**

- Actions pinned by SHA vs tag (tags can be hijacked)
- Third-party actions from unknown publishers
- Excessive permission scopes
- Secrets exposed in logs or outputs
- Artifact uploads to untrusted locations
- Matrix builds that could leak information

**Review container configurations:**

- Dockerfile `curl | bash` patterns
- Adding remote keys/credentials
- Running processes as root
- Exposed ports without authentication
- Weak network policies
- Insecure default configurations
- Multi-stage build leakage

**Check build scripts:**

- Supply-chain injection points
- Artifact tampering possibilities
- Unverified downloads during build
- Build output that includes secrets
- Post-build scripts with remote execution

### 5. Deserialization & Model File Safety (If Applicable)

**Flag risky deserialization:**

| Pattern | Language | Severity |
|---------|----------|----------|
| `pickle.load()`, `pickle.loads()` | Python | CRITICAL |
| `joblib.load()` | Python | HIGH |
| `dill.load()` | Python | CRITICAL |
| `yaml.load()` without `Loader=yaml.SafeLoader` | Python | HIGH |
| Untrusted JSON → `eval()` patterns | All | CRITICAL |
| XML external entity (XXE) parsing | All | HIGH |
| Object deserialization from untrusted sources | Java, .NET | CRITICAL |

**Model file warnings:**

- `.pkl`, `.pickle`, `.bin` files can contain malicious payloads
- Loading untrusted model files can execute arbitrary code
- Recommend `.safetensors` format when possible
- Document model provenance and verify hashes
- Consider model scanning for embedded threats

## Output Requirements

Produce a **Security Audit Report** with four sections:

### A) 🔴 CRITICAL RED FLAGS

For each finding:
- **File path**: Exact location
- **Line range**: Specific lines
- **Exact snippet**: Code that triggers the issue
- **Impact**: What an attacker could do
- **Exploit scenario**: Step-by-step attack description

**Examples:**
- Backdoors, malware indicators
- Exposed keys/secrets with remote access
- Remote code execution vulnerabilities
- Persistence mechanisms
- Active command-and-control connections

### B) 🟠 SUSPICIOUS ITEMS

For each finding:
- **What**: Description of suspicious pattern
- **Why**: Why it's suspicious
- **Missing evidence**: What would prove/disprove the threat

**Examples:**
- Weird dependencies with unclear purpose
- Obfuscated logic that needs investigation
- Questionable network calls
- Surprising scripts without documentation
- Dependencies with known low reputation

### C) 🟡 VULNERABILITIES / WEAK PRACTICES

For each finding:
- **Severity**: Low/Medium/High
- **Issue**: Description
- **Threat model**: Who could exploit, what they gain

**Examples:**
- Insecure defaults
- Missing input validation
- Weak cryptographic practices
- Excessive permissions
- Poor secret management

### D) ✅ REMEDIATION PLAN

For each finding:
- **Step-by-step fix**: Concrete actions
- **Safe replacements**: Code that does the same thing securely
- **Tooling recommendations**:
  - SAST tools (ESLint security plugins, Bandit, Semgrep)
  - Dependency scanning (npm audit, Snyk, Dependabot)
  - Secret scanning (git-secrets, TruffleHog, gitleaks)
  - SBOM generation (syft, cyclonedx)
  - Lockfile hygiene enforcement
- **Verification checklist**: Steps to confirm the codebase is clean after fixes

## Quick Audit Commands

```bash
# Dependency vulnerability scanning
npm audit
yarn audit
pnpm audit
safety check
pip-audit

# Secret detection
git log -p --all -S "API_KEY" --source --all
gitleaks detect --source=.
trufflehog filesystem --path=.

# Dependency review
grep -r "git+" package.json
grep -r "http:" requirements.txt
cat package.json | jq -r '.dependencies | to_entries[] | select(.value | startswith("git"))'

# Obfuscation detection
grep -r "eval(" --include="*.js" --include="*.ts"
grep -r "exec(" --include="*.py"
grep -r "base64" --include="*.js" -A 1 -B 1
```

## False Positive Handling

When flagging items, consider:
1. Is this intentional obfuscation (DRY, minification)?
2. Is this a known security tool (pentest framework, security scanner)?
3. Is this internal code reviewed by security team?
4. Is the dependency from a trusted source with security policy?

Still flag suspicious items but note the uncertainty in the report.

## Audit Report Template

```
# SECURITY AUDIT REPORT
Generated: [TIMESTAMP]
Auditor: Zero-Trust Security Audit Skill
Scope: [PROJECT PATH]

## EXECUTIVE SUMMARY
- Total files audited: [N]
- Critical issues: [N]
- Suspicious items: [N]
- Vulnerabilities: [N]

---

## A) 🔴 CRITICAL RED FLAGS

### [TITLE]
**File:** `[PATH]:[LINES]`
**Snippet:**
```
[CODE]
```
**Impact:** [What attacker can do]
**Exploit Scenario:** [Attack steps]

---

## B) 🟠 SUSPICIOUS ITEMS

### [TITLE]
**File:** `[PATH]:[LINES]`
**Why Suspicious:** [Reason]
**Evidence Needed:** [What would clarify]

---

## C) 🟡 VULNERABILITIES / WEAK PRACTICES

### [TITLE]
**File:** `[PATH]:[LINES]`
**Severity:** [Low/Medium/High]
**Issue:** [Description]
**Threat Model:** [Who/What/How]

---

## D) ✅ REMEDIATION PLAN

### Critical Items
| Issue | Fix | Verification |
|-------|-----|--------------|
| [Issue] | [Fix] | [Check] |

### Recommended Tools
- [Tool]: [Purpose]
- [Tool]: [Purpose]

### Post-Fix Checklist
- [ ] Verify fix works
- [ ] Run dependency scan
- [ ] Run secret scan
- [ ] Review CI/CD logs
- [ ] Document changes

---

**Audit completed with Zero-Trust mindset.**
**Next audit scheduled: [DATE]**
```

---

**Last Updated:** 2026-01-21
**Version:** 1.0.0
**Related Skills:** systematic-debugging, verification-before-completion, software-architecture
