# README I18n And Release Bump Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add multilingual README files with a lively lobster voice and release the changes as a new npm patch version.

**Architecture:** Keep the project structure simple: one English primary README plus four sibling localized README files. Add a small release contract test for package versioning and README cross-links, then update package metadata and publish the new patch after full verification.

**Tech Stack:** Node.js, Markdown, Vitest, npm

---

## Chunk 1: README Contract

### Task 1: Lock expected README structure and version bump in tests

**Files:**
- Create: `tests/docs/readme-i18n.test.ts`

- [ ] **Step 1: Write failing tests for language nav and next patch version**
- [ ] **Step 2: Run the targeted test and confirm it fails**
- [ ] **Step 3: Implement the minimal README/version changes**
- [ ] **Step 4: Re-run the targeted test and confirm it passes**

## Chunk 2: README Rewrite

### Task 2: Replace the current docs with multilingual, humorous copy

**Files:**
- Modify: `README.md`
- Create: `README.zh-CN.md`
- Create: `README.es.md`
- Create: `README.fr.md`
- Create: `README.ja.md`

- [ ] **Step 1: Rewrite the English README as the primary entrypoint**
- [ ] **Step 2: Add four localized README siblings with matching structure**
- [ ] **Step 3: Re-read all five files for link consistency and command accuracy**

## Chunk 3: Release

### Task 3: Publish the next patch version

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Bump the version**
- [ ] **Step 2: Run `npm run lint`, `npm test`, `npm run build`, and `npm pack --json`**
- [ ] **Step 3: Push the branch**
- [ ] **Step 4: Publish to npm**

Plan complete and saved to `docs/superpowers/plans/2026-03-17-readme-i18n-and-release-bump.md`. Ready to execute.
