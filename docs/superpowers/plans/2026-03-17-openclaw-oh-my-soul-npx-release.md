# OpenClaw Oh My Soul npx Release Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing CLI into a publishable npm package that runs directly via `npx openclaw-oh-my-soul`.

**Architecture:** Keep the existing TypeScript CLI and runtime flow intact while changing the release shell around it: package metadata, executable name, help copy, published file set, and release verification. Use TDD for metadata and help-text regressions, then verify the final tarball behaves like the published package would.

**Tech Stack:** Node.js, TypeScript, Vitest, tsup, npm

---

## Chunk 1: Release Metadata and Command Name

### Task 1: Lock the expected release contract in tests

**Files:**
- Create: `tests/cli/release-config.test.ts`
- Modify: `tests/cli/smoke.test.ts`
- Test: `tests/cli/release-config.test.ts`
- Test: `tests/cli/smoke.test.ts`

- [ ] **Step 1: Write the failing metadata and help-name assertions**
- [ ] **Step 2: Run targeted tests and confirm they fail for the old package name / command**
- [ ] **Step 3: Update `package.json`, `bin/`, and localized CLI strings**
- [ ] **Step 4: Re-run targeted tests and confirm they pass**

## Chunk 2: User-Facing Release Docs

### Task 2: Document npx-first usage

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite the usage section around `npx openclaw-oh-my-soul`**
- [ ] **Step 2: Keep development commands for contributors**
- [ ] **Step 3: Re-read for consistency with package metadata**

## Chunk 3: Publish Readiness Verification

### Task 3: Verify the shipped artifact

**Files:**
- No source changes expected unless verification finds issues

- [ ] **Step 1: Run `npm run lint`, `npm test`, and `npm run build`**
- [ ] **Step 2: Run `npm pack --json` and inspect the tarball contents**
- [ ] **Step 3: Execute the packed CLI and confirm `--help` works**
- [ ] **Step 4: Commit and push the branch to GitHub**

Plan complete and saved to `docs/superpowers/plans/2026-03-17-openclaw-oh-my-soul-npx-release.md`. Ready to execute.
