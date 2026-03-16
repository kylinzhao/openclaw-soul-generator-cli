# OpenClaw Persona Pack I18n And Question Expansion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing CLI to support five languages and richer 5-8 option question sets while keeping the persona rule engine language-neutral and the generated pack professionally localized.

**Architecture:** Introduce an i18n layer with semantic IDs, localized CLI copy, and localized output templates. Expand the wizard data model into structured question catalogs and localized choice labels, then thread the selected language through CLI prompts and markdown rendering without leaking display text into the rules layer.

**Tech Stack:** Node.js, TypeScript, `vitest`, `@clack/prompts`, `zod`, `tsup`

---

## File Structure

### New and Updated Layout

```text
src/
├── cli.ts                                  # Orchestrates language selection, prompts, merge copy
├── i18n/
│   ├── index.ts                            # Locale lookup helpers
│   ├── types.ts                            # Locale and message key types
│   ├── locales.ts                          # Supported locale registry
│   ├── cli/
│   │   ├── en.ts
│   │   ├── zh.ts
│   │   ├── es.ts
│   │   ├── fr.ts
│   │   └── ja.ts
│   └── output/
│       ├── en.ts
│       ├── zh.ts
│       ├── es.ts
│       ├── fr.ts
│       └── ja.ts
├── prompts/
│   ├── choices.ts                          # Semantic option catalogs
│   ├── questions.ts                        # Semantic question definitions
│   └── flow.ts                             # Prompt flow using locale-aware rendering
├── templates/
│   ├── soul.ts                             # Localized SOUL renderer
│   ├── agents.ts                           # Localized AGENTS renderer
│   ├── tools.ts                            # Localized TOOLS renderer
│   └── sections.ts                         # Localized section helpers
├── types/
│   ├── answers.ts                          # Add selected locale and richer answer dimensions
│   └── persona.ts                          # Keep language-neutral profile, extend metadata as needed
tests/
├── cli/
├── i18n/
├── output/
└── prompts/
```

### Responsibilities

- `src/i18n/*`: all user-facing strings, split between CLI and output templates
- `src/prompts/*`: semantic question IDs and option values, not raw localized display strings
- `src/cli.ts`: startup language selection, localized merge prompts, localized completion text
- `src/templates/*`: professional output rendering in the selected language
- `src/types/answers.ts`: stores semantic values and the selected locale
- `tests/i18n/*`: completeness checks across all five locales

---

## Chunk 1: Locale Infrastructure

### Task 1: Add Locale Types and Registry

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/index.ts`
- Test: `tests/i18n/locales.test.ts`

- [ ] **Step 1: Write the failing locale registry test**

Create file: `tests/i18n/locales.test.ts`

```ts
import { describe, expect, it } from 'vitest'

import { SUPPORTED_LOCALES, isSupportedLocale } from '../../src/i18n/locales'

describe('locale registry', () => {
  it('supports the five required locales', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'zh', 'es', 'fr', 'ja'])
  })

  it('recognizes valid locale codes', () => {
    expect(isSupportedLocale('zh')).toBe(true)
    expect(isSupportedLocale('de')).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/i18n/locales.test.ts`
Expected: FAIL with missing `src/i18n/locales`

- [ ] **Step 3: Implement locale types and helpers**

Create file: `src/i18n/types.ts`

```ts
export type LocaleCode = 'en' | 'zh' | 'es' | 'fr' | 'ja'
```

Create file: `src/i18n/locales.ts`

```ts
import type { LocaleCode } from './types'

export const SUPPORTED_LOCALES: LocaleCode[] = ['en', 'zh', 'es', 'fr', 'ja']

export function isSupportedLocale(value: string): value is LocaleCode {
  return SUPPORTED_LOCALES.includes(value as LocaleCode)
}
```

Create file: `src/i18n/index.ts`

```ts
export * from './types'
export * from './locales'
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/i18n/locales.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/i18n tests/i18n/locales.test.ts
git commit -m "feat: add locale registry"
```

### Task 2: Add CLI Locale Dictionaries

**Files:**
- Create: `src/i18n/cli/en.ts`
- Create: `src/i18n/cli/zh.ts`
- Create: `src/i18n/cli/es.ts`
- Create: `src/i18n/cli/fr.ts`
- Create: `src/i18n/cli/ja.ts`
- Test: `tests/i18n/cli-dictionaries.test.ts`

- [ ] **Step 1: Write the failing dictionary completeness test**

Create file: `tests/i18n/cli-dictionaries.test.ts`

```ts
import { describe, expect, it } from 'vitest'

import { cliMessages } from '../../src/i18n/cli/en'
import { zhCliMessages } from '../../src/i18n/cli/zh'
import { esCliMessages } from '../../src/i18n/cli/es'
import { frCliMessages } from '../../src/i18n/cli/fr'
import { jaCliMessages } from '../../src/i18n/cli/ja'

const dictionaries = [cliMessages, zhCliMessages, esCliMessages, frCliMessages, jaCliMessages]

describe('CLI dictionaries', () => {
  it('share the same keys across languages', () => {
    const keys = Object.keys(cliMessages).sort()

    for (const dictionary of dictionaries) {
      expect(Object.keys(dictionary).sort()).toEqual(keys)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/i18n/cli-dictionaries.test.ts`
Expected: FAIL with missing dictionary files

- [ ] **Step 3: Implement shared CLI dictionary shape and five locale files**

Include keys for:

- language selection prompt
- help summary
- merge prompt title
- merge option labels
- success message
- light playful CLI framing with small, appropriate emoji

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/i18n/cli-dictionaries.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/i18n/cli tests/i18n/cli-dictionaries.test.ts
git commit -m "feat: add localized CLI message dictionaries"
```

---

## Chunk 2: Semantic Question Catalog Expansion

### Task 3: Expand Semantic Choice Catalogs

**Files:**
- Modify: `src/prompts/choices.ts`
- Test: `tests/cli/questions-expanded.test.ts`

- [ ] **Step 1: Write the failing question coverage test**

Create file: `tests/cli/questions-expanded.test.ts`

```ts
import { describe, expect, it } from 'vitest'

import {
  creationModeChoices,
  useCaseChoices,
  capabilityChoices,
  personalityChoices,
  communicationChoices,
  workingStyleChoices,
  riskBoundaryChoices
} from '../../src/prompts/choices'

describe('expanded choice catalogs', () => {
  it('provides 5-8 quality options for each main question group', () => {
    expect(creationModeChoices.length).toBeGreaterThanOrEqual(5)
    expect(useCaseChoices.length).toBeGreaterThanOrEqual(6)
    expect(capabilityChoices.length).toBeGreaterThanOrEqual(7)
    expect(personalityChoices.length).toBeGreaterThanOrEqual(6)
    expect(communicationChoices.length).toBeGreaterThanOrEqual(6)
    expect(workingStyleChoices.length).toBeGreaterThanOrEqual(6)
    expect(riskBoundaryChoices.length).toBeGreaterThanOrEqual(6)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/cli/questions-expanded.test.ts`
Expected: FAIL because current choice arrays are too small or missing

- [ ] **Step 3: Implement expanded semantic choice catalogs**

Add semantic values only, not localized labels. Include:

- `creationModeChoices`
- `useCaseChoices`
- `capabilityChoices`
- `personalityChoices`
- `communicationChoices`
- `workingStyleChoices`
- `riskBoundaryChoices`

Each entry should use stable IDs such as:

```ts
{ value: 'engineering', labelKey: 'choice.use_case.engineering', recommended: true }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/cli/questions-expanded.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/prompts/choices.ts tests/cli/questions-expanded.test.ts
git commit -m "feat: expand semantic question choice catalogs"
```

### Task 4: Convert Question Definitions to Semantic IDs

**Files:**
- Modify: `src/prompts/questions.ts`
- Modify: `src/types/answers.ts`
- Test: `tests/cli/questions.test.ts`
- Test: `tests/rules/types.test.ts`

- [ ] **Step 1: Update tests to require semantic message keys and new answer fields**

Extend `tests/cli/questions.test.ts` so it checks:

- question definitions use `messageKey`
- new question IDs include `communication`, `working-style`, and `risk-boundaries`

Extend `tests/rules/types.test.ts` so it checks:

- `selectedLocale`
- `communicationStyle`
- `workingStyle`
- `riskBoundaries`

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/cli/questions.test.ts tests/rules/types.test.ts`
Expected: FAIL because the old question and answer shape is still too narrow

- [ ] **Step 3: Implement updated question definitions and answer schema**

Examples:

```ts
export interface QuestionDefinition {
  id: string
  kind: 'select' | 'multiselect'
  messageKey: string
  choices: ChoiceOption[]
}
```

```ts
export const personaAnswersSchema = z.object({
  selectedLocale: z.enum(['en', 'zh', 'es', 'fr', 'ja']),
  creationMode: creationModeSchema,
  targetUseCase: z.string(),
  capabilityEmphasis: z.array(z.string()),
  personalityPreset: z.string(),
  communicationStyle: z.string(),
  workingStyle: z.string(),
  riskBoundaries: z.array(z.string())
})
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/cli/questions.test.ts tests/rules/types.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/prompts/questions.ts src/types/answers.ts tests/cli/questions.test.ts tests/rules/types.test.ts
git commit -m "feat: add semantic question definitions and richer answers"
```

---

## Chunk 3: Locale-Aware Prompt Flow

### Task 5: Add Startup Language Selection

**Files:**
- Modify: `src/cli.ts`
- Modify: `src/prompts/flow.ts`
- Test: `tests/cli/flow.test.ts`
- Test: `tests/cli/e2e.test.ts`

- [ ] **Step 1: Update prompt flow tests for locale-first behavior**

Extend `tests/cli/flow.test.ts` with a case that expects:

- the language is chosen first
- the returned answers include `selectedLocale`

Extend `tests/cli/e2e.test.ts` so the stub prompt adapter answers:

- `language`
- `creation-mode`
- `use-case`
- `capabilities`
- `personality`
- `communication`
- `working-style`
- `risk-boundaries`

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/cli/flow.test.ts tests/cli/e2e.test.ts`
Expected: FAIL because the current flow does not ask for language or the new questions

- [ ] **Step 3: Implement locale-first prompt flow**

Update `src/prompts/flow.ts` to:

- ask for locale first
- then ask the expanded semantic question set
- return a complete localized answer object using semantic values

Update `src/cli.ts` to pass the selected locale into all downstream render and message helpers.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/cli/flow.test.ts tests/cli/e2e.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/cli.ts src/prompts/flow.ts tests/cli/flow.test.ts tests/cli/e2e.test.ts
git commit -m "feat: add locale-first prompt flow"
```

### Task 6: Localize Prompt Labels and Merge Prompts

**Files:**
- Modify: `src/cli.ts`
- Modify: `src/prompts/flow.ts`
- Test: `tests/cli/smoke.test.ts`
- Test: `tests/merge/strategies.test.ts`

- [ ] **Step 1: Write or update tests to require localized help and merge copy**

Add assertions that:

- help output changes based on a locale argument helper or selected locale path
- merge prompt labels come from localized CLI dictionaries

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/cli/smoke.test.ts tests/merge/strategies.test.ts`
Expected: FAIL because current strings are hardcoded in English

- [ ] **Step 3: Implement locale-aware prompt rendering**

Use dictionary lookups for:

- help summary
- language prompt
- question messages
- merge prompt title and options
- success note

Keep CLI copy lightly playful with restrained emoji.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/cli/smoke.test.ts tests/merge/strategies.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/cli.ts src/prompts/flow.ts tests/cli/smoke.test.ts tests/merge/strategies.test.ts
git commit -m "feat: localize CLI prompt and merge copy"
```

---

## Chunk 4: Localized Output Templates

### Task 7: Add Output Dictionaries and Professional Localized Templates

**Files:**
- Create: `src/i18n/output/en.ts`
- Create: `src/i18n/output/zh.ts`
- Create: `src/i18n/output/es.ts`
- Create: `src/i18n/output/fr.ts`
- Create: `src/i18n/output/ja.ts`
- Test: `tests/i18n/output-dictionaries.test.ts`

- [ ] **Step 1: Write the failing output dictionary completeness test**

Create file: `tests/i18n/output-dictionaries.test.ts`

```ts
import { describe, expect, it } from 'vitest'

import { outputMessages } from '../../src/i18n/output/en'
import { zhOutputMessages } from '../../src/i18n/output/zh'
import { esOutputMessages } from '../../src/i18n/output/es'
import { frOutputMessages } from '../../src/i18n/output/fr'
import { jaOutputMessages } from '../../src/i18n/output/ja'

const dictionaries = [outputMessages, zhOutputMessages, esOutputMessages, frOutputMessages, jaOutputMessages]

describe('output dictionaries', () => {
  it('share the same keys across languages', () => {
    const keys = Object.keys(outputMessages).sort()

    for (const dictionary of dictionaries) {
      expect(Object.keys(dictionary).sort()).toEqual(keys)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/i18n/output-dictionaries.test.ts`
Expected: FAIL with missing output dictionary files

- [ ] **Step 3: Implement output dictionaries**

Include localized professional strings for:

- section titles
- short capability phrasing
- working style text
- communication text
- guardrail labels

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/i18n/output-dictionaries.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/i18n/output tests/i18n/output-dictionaries.test.ts
git commit -m "feat: add localized output dictionaries"
```

### Task 8: Localize Renderers Without Changing Persona Logic

**Files:**
- Modify: `src/output/render-pack.ts`
- Modify: `src/templates/soul.ts`
- Modify: `src/templates/agents.ts`
- Modify: `src/templates/tools.ts`
- Modify: `src/templates/sections.ts`
- Test: `tests/output/render-pack.test.ts`
- Test: `tests/output/render-pack-locales.test.ts`

- [ ] **Step 1: Write failing localized rendering tests**

Create file: `tests/output/render-pack-locales.test.ts`

```ts
import { describe, expect, it } from 'vitest'

import { renderPersonaPack } from '../../src/output/render-pack'

const profile = {
  identity: { codename: 'Harbor Claw', role: 'engineering-commander' },
  personality: { restraint: 70, warmth: 45, sharpness: 80, initiative: 78, humor: 20, patience: 65 },
  capabilities: { engineeringExecution: 92, debugging: 82, verification: 80 },
  workingStyle: { planningBias: 'planning-first' },
  communication: { style: 'direct' },
  guardrails: { antiPatterns: ['skip verification', 'bluff certainty'] },
  projectFit: { primaryStack: 'typescript' },
  flair: { tags: ['balanced', 'cli'] },
  metadata: { version: 1 }
}

describe('localized persona pack rendering', () => {
  it('renders Chinese headings in zh mode', () => {
    const pack = renderPersonaPack(profile, 'zh')
    expect(pack['SOUL.md']).toContain('核心身份')
  })

  it('renders Japanese headings in ja mode', () => {
    const pack = renderPersonaPack(profile, 'ja')
    expect(pack['AGENTS.md']).toContain('計画と実行')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/output/render-pack.test.ts tests/output/render-pack-locales.test.ts`
Expected: FAIL because renderers do not yet accept locale-aware output dictionaries

- [ ] **Step 3: Implement localized rendering**

Update renderers so they:

- accept a `LocaleCode`
- look up professional output messages
- preserve managed blocks and stable structure
- never add playful emoji to generated markdown

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/output/render-pack.test.ts tests/output/render-pack-locales.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/output/render-pack.ts src/templates/soul.ts src/templates/agents.ts src/templates/tools.ts src/templates/sections.ts tests/output/render-pack.test.ts tests/output/render-pack-locales.test.ts
git commit -m "feat: localize persona pack renderers"
```

---

## Chunk 5: Persona Metadata and Regression Coverage

### Task 9: Thread Locale Through persona.json and Validation

**Files:**
- Modify: `src/types/persona.ts`
- Modify: `src/rules/build-persona.ts`
- Modify: `src/output/render-pack.ts`
- Test: `tests/rules/build-persona.test.ts`
- Test: `tests/output/write-pack.test.ts`

- [ ] **Step 1: Update tests to require locale-aware metadata**

Add assertions that:

- the generated profile metadata stores the selected locale
- `persona.json` preserves it

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/rules/build-persona.test.ts tests/output/write-pack.test.ts`
Expected: FAIL because metadata does not yet include locale

- [ ] **Step 3: Implement locale metadata threading**

Update persona metadata to include:

- `version`
- `locale`

Keep the profile language-neutral otherwise.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/rules/build-persona.test.ts tests/output/write-pack.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/persona.ts src/rules/build-persona.ts src/output/render-pack.ts tests/rules/build-persona.test.ts tests/output/write-pack.test.ts
git commit -m "feat: persist locale in persona metadata"
```

### Task 10: Add No-Emoji Guard For Generated Markdown

**Files:**
- Test: `tests/output/no-emoji-output.test.ts`

- [ ] **Step 1: Write the failing no-emoji output test**

Create file: `tests/output/no-emoji-output.test.ts`

```ts
import { describe, expect, it } from 'vitest'

import { renderPersonaPack } from '../../src/output/render-pack'

describe('generated markdown tone', () => {
  it('does not include playful emoji in localized output files', () => {
    const pack = renderPersonaPack({
      identity: { codename: 'Harbor Claw', role: 'engineering-commander' },
      personality: { restraint: 70, warmth: 45, sharpness: 80, initiative: 78, humor: 20, patience: 65 },
      capabilities: { engineeringExecution: 92 },
      workingStyle: { planningBias: 'planning-first' },
      communication: { style: 'direct' },
      guardrails: { antiPatterns: ['skip verification'] },
      projectFit: { primaryStack: 'typescript' },
      flair: { tags: ['balanced'] },
      metadata: { version: 1, locale: 'en' }
    }, 'en')

    const combined = `${pack['SOUL.md']}\n${pack['AGENTS.md']}\n${pack['TOOLS.md']}`
    expect(combined).not.toMatch(/[🦞✨🎯🔥😄🚀]/u)
  })
})
```

- [ ] **Step 2: Run test to verify it fails or is not yet supported**

Run: `npm test -- tests/output/no-emoji-output.test.ts`
Expected: FAIL until locale-aware render signatures and clean output guarantees are in place

- [ ] **Step 3: Implement any needed cleanup in renderers**

Keep all emoji strictly inside CLI dictionaries and never in output renderers.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/output/no-emoji-output.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/output/no-emoji-output.test.ts src/templates src/output/render-pack.ts
git commit -m "test: guard generated markdown against playful emoji"
```

---

## Chunk 6: Documentation and Final Verification

### Task 11: Document New Language and Prompt Features

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add README sections for supported languages, richer prompts, and localized output**

Include:

- five supported languages
- locale-first wizard flow
- distinction between playful CLI and professional output files
- example command usage

- [ ] **Step 2: Verify documented commands still work**

Run:

```bash
npm test
npm run lint
npm run build
node dist/cli.js --help
```

Expected: all commands pass and help output is shown

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: describe multilingual persona pack flow"
```

### Task 12: Full Verification Before Completion

**Files:**
- No file changes required

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run typecheck**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Manually sanity-check one non-English flow**

Run: `node dist/cli.js --cwd /tmp/openclaw-persona-i18n-demo`
Expected: choose `zh`, `es`, `fr`, or `ja`, complete the flow, and confirm the generated markdown files are localized while remaining professional

- [ ] **Step 5: Commit any final fixes**

```bash
git add .
git commit -m "chore: finalize multilingual question expansion upgrade"
```

## Plan Review Notes

This environment does not expose the plan-review subagent workflow referenced by the skill, so this plan is chunked for manual review and execution. During implementation, preserve the TDD sequence in each task and verify each chunk before moving on.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-16-openclaw-persona-pack-i18n-and-question-expansion.md`. Ready to execute?
