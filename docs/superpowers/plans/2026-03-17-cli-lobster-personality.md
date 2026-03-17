# CLI Lobster Personality Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clearer, more playful lobster personality to the CLI, including a startup welcome splash, more expressive prompt copy, and localized tone updates that stay easy to read.

**Architecture:** Keep the current wizard and file-generation flow intact. Add the personality layer at the CLI boundary through a reusable welcome splash renderer and richer localized CLI copy. Verify the behavior with focused tests around help output, prompt formatting, and end-to-end flow stability.

**Tech Stack:** Node.js, TypeScript, Vitest, @clack/prompts

---

## Chunk 1: Welcome Splash Contract

### Task 1: Lock the startup and help experience in tests

**Files:**
- Modify: `tests/cli/smoke.test.ts`
- Create: `tests/cli/welcome.test.ts`

- [ ] **Step 1: Add failing assertions for the welcome banner, ASCII art, and help copy**
- [ ] **Step 2: Run the targeted tests and confirm the old CLI fails**
- [ ] **Step 3: Implement the minimal welcome renderer and hook it into the CLI**
- [ ] **Step 4: Re-run the targeted tests and confirm they pass**

## Chunk 2: Localized Lobster Voice

### Task 2: Refresh interactive prompt copy

**Files:**
- Modify: `src/i18n/types.ts`
- Modify: `src/i18n/cli/en.ts`
- Modify: `src/i18n/cli/zh.ts`
- Modify: `src/i18n/cli/es.ts`
- Modify: `src/i18n/cli/fr.ts`
- Modify: `src/i18n/cli/ja.ts`

- [ ] **Step 1: Add any new localized fields needed for welcome and secondary prompt lines**
- [ ] **Step 2: Update prompts and confirmation copy to the `clear first, playful second` pattern**
- [ ] **Step 3: Re-run dictionary and flow tests**

## Chunk 3: Verification

### Task 3: Prove the refreshed CLI still works

**Files:**
- No new source files expected unless verification finds gaps

- [ ] **Step 1: Run `npm run lint`**
- [ ] **Step 2: Run `npm test`**
- [ ] **Step 3: Run `npm run build`**
- [ ] **Step 4: Run a quick help smoke test from the built CLI**

Plan complete and saved to `docs/superpowers/plans/2026-03-17-cli-lobster-personality.md`. Ready to execute.
