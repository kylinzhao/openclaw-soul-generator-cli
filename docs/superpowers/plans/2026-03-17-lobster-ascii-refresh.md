# Lobster ASCII Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current welcome splash mascot with a more obviously lobster-like cartoon ASCII that still fits the friendly CLI voice.

**Architecture:** Keep the existing splash structure and copy, but swap the mascot lines in the single welcome renderer. Use tests to lock the new silhouette so the CLI help and intro stay aligned.

**Tech Stack:** Node.js, TypeScript, Vitest

---

## Chunk 1: ASCII Contract

### Task 1: Update the welcome snapshot

**Files:**
- Modify: `tests/cli/smoke.test.ts`
- Modify: `tests/cli/welcome.test.ts`
- Modify: `src/cli.ts`

- [ ] **Step 1: Change the tests to expect the new cartoon lobster silhouette**
- [ ] **Step 2: Run targeted tests and confirm the old splash fails**
- [ ] **Step 3: Update the welcome renderer to the approved `C`-style mascot**
- [ ] **Step 4: Re-run targeted tests and then full verification**

Plan complete and saved to `docs/superpowers/plans/2026-03-17-lobster-ascii-refresh.md`. Ready to execute.
