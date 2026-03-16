# OpenClaw Persona Pack Generator CLI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an offline interactive TypeScript CLI that generates an OpenClaw persona pack (`SOUL.md`, `AGENTS.md`, `TOOLS.md`, `persona.json`), supports light repository inspection, and safely handles existing persona files with merge prompts.

**Architecture:** The CLI will use a layered design: prompt-driven answer collection, lightweight repository signal extraction, a rule-based persona modeling engine, markdown renderers for each output file, and a persistence layer that detects existing files and offers keep/overwrite/merge/new-pack flows. The implementation stays fully local and deterministic, with snapshot-friendly rendering and TDD around the rule engine, merge logic, and CLI flows.

**Tech Stack:** Node.js, TypeScript, `tsx`, `vitest`, `@clack/prompts`, `picocolors`, `fs-extra`, `zod`

---

## File Structure

### Top-Level Layout

```text
LobsterSoul/
├── docs/
│   └── superpowers/
│       ├── plans/
│       └── specs/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── .gitignore
├── README.md
├── src/
│   ├── cli.ts
│   ├── index.ts
│   ├── types/
│   │   ├── answers.ts
│   │   ├── persona.ts
│   │   ├── project-signals.ts
│   │   └── files.ts
│   ├── prompts/
│   │   ├── flow.ts
│   │   ├── questions.ts
│   │   └── choices.ts
│   ├── scanner/
│   │   ├── detect-project.ts
│   │   ├── manifests.ts
│   │   ├── readme.ts
│   │   └── signals.ts
│   ├── rules/
│   │   ├── archetypes.ts
│   │   ├── capability-bundles.ts
│   │   ├── personality-spectrums.ts
│   │   ├── project-fit.ts
│   │   ├── consistency.ts
│   │   └── build-persona.ts
│   ├── templates/
│   │   ├── soul.ts
│   │   ├── agents.ts
│   │   ├── tools.ts
│   │   ├── sections.ts
│   │   └── managed-blocks.ts
│   ├── merge/
│   │   ├── detect-existing.ts
│   │   ├── parse-sections.ts
│   │   ├── strategies.ts
│   │   └── prompts.ts
│   ├── output/
│   │   ├── render-pack.ts
│   │   ├── validate-pack.ts
│   │   ├── write-pack.ts
│   │   └── backup.ts
│   └── utils/
│       ├── random.ts
│       ├── paths.ts
│       ├── text.ts
│       └── constants.ts
├── tests/
│   ├── scanner/
│   ├── rules/
│   ├── merge/
│   ├── output/
│   ├── cli/
│   └── fixtures/
└── bin/
    └── openclaw-persona
```

### File Responsibilities

- `src/cli.ts`: CLI entrypoint, orchestration, exit codes
- `src/prompts/*`: wizard questions and interactive flow
- `src/scanner/*`: lightweight repository detection and signal extraction
- `src/rules/*`: persona archetypes, weighting logic, consistency repair
- `src/templates/*`: markdown section renderers with stable headings
- `src/merge/*`: existing file detection, section parsing, merge decisions
- `src/output/*`: validation, serialization, write and backup logic
- `tests/*`: unit, snapshot, and end-to-end coverage

---

## Chunk 1: Project Skeleton and Core Types

### Task 1: Initialize Node/TypeScript CLI Workspace

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsup.config.ts`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `README.md`
- Create: `bin/openclaw-persona`
- Create: `src/index.ts`
- Create: `src/cli.ts`

- [ ] **Step 1: Write the failing package and smoke test**

Create file: `tests/cli/smoke.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { runCli } from '../../src/cli'

describe('CLI smoke test', () => {
  it('returns success for help mode', async () => {
    const result = await runCli(['--help'])
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('OpenClaw Persona Pack Generator')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/cli/smoke.test.ts`
Expected: FAIL with missing package scripts or missing `src/cli`

- [ ] **Step 3: Create package and toolchain files**

Create file: `package.json`

```json
{
  "name": "openclaw-persona-pack-generator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "bin": {
    "openclaw-persona": "./bin/openclaw-persona"
  },
  "scripts": {
    "build": "tsup src/index.ts src/cli.ts --format esm,cjs --dts",
    "dev": "tsx src/cli.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@clack/prompts": "^0.10.1",
    "fs-extra": "^11.3.0",
    "picocolors": "^1.1.1",
    "zod": "^3.25.0"
  },
  "devDependencies": {
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^24.0.0",
    "tsup": "^8.5.0",
    "tsx": "^4.20.0",
    "typescript": "^5.9.0",
    "vitest": "^3.2.0"
  }
}
```

Create file: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "declaration": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": ".",
    "types": ["node", "vitest/globals"]
  },
  "include": ["src", "tests", "vitest.config.ts", "tsup.config.ts"]
}
```

Create file: `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts']
  }
})
```

Create file: `tsup.config.ts`

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false
})
```

Create file: `.gitignore`

```gitignore
node_modules
dist
.DS_Store
coverage
*.log
tmp
```

Create file: `bin/openclaw-persona`

```bash
#!/usr/bin/env node
import('../dist/cli.js')
```

- [ ] **Step 4: Implement minimal CLI help path**

Create file: `src/cli.ts`

```ts
export interface CliResult {
  exitCode: number
  output: string
}

export async function runCli(argv: string[]): Promise<CliResult> {
  if (argv.includes('--help')) {
    return {
      exitCode: 0,
      output: 'OpenClaw Persona Pack Generator'
    }
  }

  return {
    exitCode: 0,
    output: 'Interactive mode not implemented yet'
  }
}
```

Create file: `src/index.ts`

```ts
export { runCli } from './cli'
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- tests/cli/smoke.test.ts`
Expected: PASS

- [ ] **Step 6: Run typecheck**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add package.json tsconfig.json tsup.config.ts vitest.config.ts .gitignore README.md bin/openclaw-persona src/index.ts src/cli.ts tests/cli/smoke.test.ts
git commit -m "chore: initialize TypeScript CLI workspace"
```

### Task 2: Add Core Domain Types and Validation Schemas

**Files:**
- Create: `src/types/answers.ts`
- Create: `src/types/persona.ts`
- Create: `src/types/project-signals.ts`
- Create: `src/types/files.ts`
- Test: `tests/rules/types.test.ts`

- [ ] **Step 1: Write the failing type-shape test**

Create file: `tests/rules/types.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { personaProfileSchema } from '../../src/types/persona'

describe('persona profile schema', () => {
  it('parses a minimal persona profile', () => {
    const parsed = personaProfileSchema.parse({
      identity: { codename: 'Harbor Claw', role: 'engineering commander' },
      personality: { restraint: 70, warmth: 45, sharpness: 80, initiative: 78, humor: 20, patience: 65 },
      capabilities: { engineeringExecution: 92 },
      workingStyle: { planningBias: 'balanced' },
      communication: { style: 'direct' },
      guardrails: { antiPatterns: ['skip verification'] },
      projectFit: { primaryStack: 'typescript' },
      flair: { tags: ['precise'] },
      metadata: { version: 1 }
    })

    expect(parsed.identity.codename).toBe('Harbor Claw')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/rules/types.test.ts`
Expected: FAIL with missing schema file

- [ ] **Step 3: Implement schemas and types**

Create the four type files with `zod` schemas and exported inferred types. Keep field names aligned with the spec and future renderers.

- [ ] **Step 4: Run tests**

Run: `npm test -- tests/rules/types.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types tests/rules/types.test.ts
git commit -m "feat: add persona domain schemas"
```

### Task 3: Add Shared Utilities

**Files:**
- Create: `src/utils/random.ts`
- Create: `src/utils/paths.ts`
- Create: `src/utils/text.ts`
- Create: `src/utils/constants.ts`
- Test: `tests/output/utils.test.ts`

- [ ] **Step 1: Write utility tests for deterministic randomness and safe paths**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement utilities**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/utils tests/output/utils.test.ts
git commit -m "feat: add shared CLI utilities"
```

---

## Chunk 2: Repository Scanning and Persona Modeling

### Task 4: Implement Lightweight Repository Signal Extraction

**Files:**
- Create: `src/scanner/manifests.ts`
- Create: `src/scanner/readme.ts`
- Create: `src/scanner/detect-project.ts`
- Create: `src/scanner/signals.ts`
- Test: `tests/scanner/detect-project.test.ts`
- Test: `tests/fixtures/repos/node-cli/package.json`
- Test: `tests/fixtures/repos/node-cli/README.md`
- Test: `tests/fixtures/repos/python-lib/pyproject.toml`

- [ ] **Step 1: Write failing scanner tests for Node and Python fixtures**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement manifest readers and signal inference**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/scanner tests/scanner tests/fixtures/repos
git commit -m "feat: add lightweight repository scanner"
```

### Task 5: Implement Persona Archetypes and Capability Bundles

**Files:**
- Create: `src/rules/archetypes.ts`
- Create: `src/rules/capability-bundles.ts`
- Create: `src/rules/personality-spectrums.ts`
- Test: `tests/rules/archetypes.test.ts`

- [ ] **Step 1: Write failing tests for archetype selection and capability bundle expansion**

Test cases should cover:

- engineering-heavy request yields engineering-centered archetype
- research-heavy request yields research-centered archetype
- asking for strong engineering also boosts debugging and verification

- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement archetype tables, capability bundle mappings, and spectrum presets**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/rules/archetypes.ts src/rules/capability-bundles.ts src/rules/personality-spectrums.ts tests/rules/archetypes.test.ts
git commit -m "feat: add persona archetype and capability rules"
```

### Task 6: Build Persona Profile Assembly and Consistency Repair

**Files:**
- Create: `src/rules/project-fit.ts`
- Create: `src/rules/consistency.ts`
- Create: `src/rules/build-persona.ts`
- Test: `tests/rules/build-persona.test.ts`

- [ ] **Step 1: Write failing persona build tests**

Test cases should cover:

- project signals influence `projectFit`
- expressive style still produces required guardrails
- conflicting traits are repaired into valid output

- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement persona assembly pipeline**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/rules/project-fit.ts src/rules/consistency.ts src/rules/build-persona.ts tests/rules/build-persona.test.ts
git commit -m "feat: add persona profile builder"
```

---

## Chunk 3: Wizard and Interactive Flow

### Task 7: Define Choice Catalog and Question Metadata

**Files:**
- Create: `src/prompts/choices.ts`
- Create: `src/prompts/questions.ts`
- Test: `tests/cli/questions.test.ts`

- [ ] **Step 1: Write failing tests asserting question count, required prompts, and recommended defaults**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement question metadata and choice catalogs**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/prompts/choices.ts src/prompts/questions.ts tests/cli/questions.test.ts
git commit -m "feat: define wizard questions and choices"
```

### Task 8: Implement Interactive Prompt Flow

**Files:**
- Create: `src/prompts/flow.ts`
- Modify: `src/cli.ts`
- Test: `tests/cli/flow.test.ts`

- [ ] **Step 1: Write failing tests for start-from-scratch, recommended path, and quick path**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement prompt flow with injectable prompt adapter for tests**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/prompts/flow.ts src/cli.ts tests/cli/flow.test.ts
git commit -m "feat: add interactive wizard flow"
```

---

## Chunk 4: Rendering and Validation

### Task 9: Implement Reusable Markdown Sections and Managed Blocks

**Files:**
- Create: `src/templates/sections.ts`
- Create: `src/templates/managed-blocks.ts`
- Test: `tests/output/managed-blocks.test.ts`

- [ ] **Step 1: Write failing tests for stable headings and managed block delimiters**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement section formatting helpers**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/templates/sections.ts src/templates/managed-blocks.ts tests/output/managed-blocks.test.ts
git commit -m "feat: add markdown section helpers"
```

### Task 10: Implement `SOUL.md`, `AGENTS.md`, and `TOOLS.md` Renderers

**Files:**
- Create: `src/templates/soul.ts`
- Create: `src/templates/agents.ts`
- Create: `src/templates/tools.ts`
- Create: `src/output/render-pack.ts`
- Test: `tests/output/render-pack.test.ts`
- Test: `tests/output/__snapshots__/render-pack.test.ts.snap`

- [ ] **Step 1: Write failing snapshot tests for at least four representative personas**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement renderers with stable headings and generator-owned blocks**
- [ ] **Step 4: Run tests to verify they pass and review snapshots**
- [ ] **Step 5: Commit**

```bash
git add src/templates/soul.ts src/templates/agents.ts src/templates/tools.ts src/output/render-pack.ts tests/output/render-pack.test.ts tests/output/__snapshots__/render-pack.test.ts.snap
git commit -m "feat: add persona pack markdown renderers"
```

### Task 11: Add Pack Validation

**Files:**
- Create: `src/output/validate-pack.ts`
- Test: `tests/output/validate-pack.test.ts`

- [ ] **Step 1: Write failing validation tests for missing sections, conflicting traits, and missing engineering guardrails**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement pack validation**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/output/validate-pack.ts tests/output/validate-pack.test.ts
git commit -m "feat: add persona pack validation"
```

---

## Chunk 5: Existing File Detection, Merge, and Persistence

### Task 12: Detect Existing Persona Files and Backup Behavior

**Files:**
- Create: `src/merge/detect-existing.ts`
- Create: `src/output/backup.ts`
- Test: `tests/merge/detect-existing.test.ts`

- [ ] **Step 1: Write failing tests for detecting existing persona files and generating backup names**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement detection and backup helpers**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/merge/detect-existing.ts src/output/backup.ts tests/merge/detect-existing.test.ts
git commit -m "feat: detect existing persona files"
```

### Task 13: Implement Section Parsing and Merge Strategies

**Files:**
- Create: `src/merge/parse-sections.ts`
- Create: `src/merge/strategies.ts`
- Test: `tests/merge/strategies.test.ts`

- [ ] **Step 1: Write failing tests for keep, overwrite, and section-level smart merge**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement heading-based parsing and merge logic**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/merge/parse-sections.ts src/merge/strategies.ts tests/merge/strategies.test.ts
git commit -m "feat: add persona file merge strategies"
```

### Task 14: Implement Merge Decision Prompts and Pack Writing

**Files:**
- Create: `src/merge/prompts.ts`
- Create: `src/output/write-pack.ts`
- Modify: `src/cli.ts`
- Test: `tests/merge/prompts.test.ts`
- Test: `tests/output/write-pack.test.ts`

- [ ] **Step 1: Write failing tests for prompt decisions and write outcomes**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement merge prompt flow and persistence layer**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/merge/prompts.ts src/output/write-pack.ts src/cli.ts tests/merge/prompts.test.ts tests/output/write-pack.test.ts
git commit -m "feat: add merge prompt flow and pack persistence"
```

---

## Chunk 6: End-to-End CLI Integration, Docs, and Publishing

### Task 15: Integrate the Full CLI Flow

**Files:**
- Modify: `src/cli.ts`
- Test: `tests/cli/e2e.test.ts`
- Test: `tests/fixtures/answers/*.json`

- [ ] **Step 1: Write failing end-to-end tests for scratch mode, project-aware mode, and existing-file merge mode**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Wire scanner, prompts, rules, rendering, validation, and writing together**
- [ ] **Step 4: Run tests to verify they pass**
- [ ] **Step 5: Commit**

```bash
git add src/cli.ts tests/cli/e2e.test.ts tests/fixtures/answers
git commit -m "feat: integrate full persona pack generation flow"
```

### Task 16: Document Usage and Local Development

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add README sections for install, usage, example flows, outputs, merge behavior, and development**
- [ ] **Step 2: Run `npm test` and `npm run lint` to verify documented commands still match reality**
- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add CLI usage and development guide"
```

### Task 17: Initialize Git Repository and Make First Pushable History

**Files:**
- Modify: `.gitignore`
- Modify: `README.md`

- [ ] **Step 1: Verify the workspace is not already a git repository**

Run: `git rev-parse --is-inside-work-tree`
Expected: FAIL with "not a git repository"

- [ ] **Step 2: Initialize git**

Run: `git init`
Expected: repository initialized in the current workspace

- [ ] **Step 3: Rename default branch**

Run: `git branch -M main`
Expected: branch renamed to `main`

- [ ] **Step 4: Stage the project and create an initial commit**

Run: `git add . && git commit -m "feat: scaffold openclaw persona pack generator"`
Expected: initial commit created

- [ ] **Step 5: Confirm status is clean**

Run: `git status --short`
Expected: no output

### Task 18: Create and Connect GitHub Repository

**Files:**
- No file changes required unless remote URL is documented in `README.md`

- [ ] **Step 1: Confirm GitHub authentication is available**

Run: `gh auth status`
Expected: authenticated account available

- [ ] **Step 2: Create the GitHub repository**

Run: `gh repo create <repo-name> --private --source=. --remote=origin --push`
Expected: GitHub repository created, `origin` configured, initial branch pushed

- [ ] **Step 3: Verify remote**

Run: `git remote -v`
Expected: `origin` points to the new GitHub repository

- [ ] **Step 4: Verify branch tracking**

Run: `git status -sb`
Expected: `## main...origin/main`

### Task 19: Final Verification Before Completion

**Files:**
- No file changes required

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run typecheck**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Build the CLI**

Run: `npm run build`
Expected: PASS and `dist/` created

- [ ] **Step 4: Dry-run the CLI help command**

Run: `node dist/cli.js --help`
Expected: shows help text and exits successfully

- [ ] **Step 5: Create a sample persona pack in a temp directory**

Run: `node dist/cli.js --cwd tests/fixtures/repos/node-cli`
Expected: interactive or scripted test path produces the four output files successfully

- [ ] **Step 6: Commit any final fixes**

```bash
git add .
git commit -m "chore: finalize openclaw persona pack generator"
```

## Implementation Notes

- Prefer dependency injection for prompt adapters and filesystem access where tests need control.
- Keep markdown sections stable and explicit so merge behavior stays predictable.
- Do not add model-backed generation as a hidden fallback.
- Keep each file focused; if orchestration grows large, split helper modules instead of building one giant service file.

## Plan Review Notes

This environment does not currently expose the plan-review subagent workflow referenced by the skill, so this plan is structured in chunks and manually reviewed for completeness. During execution, preserve the chunk boundaries and verify each chunk before moving to the next.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-16-openclaw-persona-pack-generator.md`. Ready to execute?
