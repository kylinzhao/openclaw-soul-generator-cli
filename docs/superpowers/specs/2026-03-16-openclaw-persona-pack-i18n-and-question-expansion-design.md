# OpenClaw Persona Pack Generator CLI - Question Expansion and I18n Design

**Project Name:** OpenClaw Persona Pack Generator CLI
**Date:** 2026-03-16
**Status:** Draft approved in brainstorming
**Version:** 1.0

## 1. Overview

This design extends the existing OpenClaw persona pack generator with two product upgrades:

- richer guided choices in the interactive CLI
- multilingual CLI and multilingual generated output

The goal is to improve usability and expressiveness without weakening the existing offline, rule-based architecture.

## 2. Goals

### 2.1 Product Goals

- increase the number and quality of interactive choices in the wizard
- support five languages:
  - English (`en`)
  - Chinese (`zh`)
  - Spanish (`es`)
  - French (`fr`)
  - Japanese (`ja`)
- make the CLI interaction feel lively, light, and a little humorous
- keep generated persona pack files professional and execution-oriented

### 2.2 Architecture Goals

- keep rule logic language-neutral
- avoid duplicating persona logic per language
- support future language expansion with minimal code churn
- separate CLI interaction tone from generated markdown tone

## 3. Non-Goals

This upgrade will not:

- make CLI interaction and output language independently configurable in v1
- use automatic language detection
- add model-based translation
- add emojis or playful tone to generated markdown files

## 4. Current Limitations

The current implementation has two clear limitations:

- too few options in the wizard, which makes persona shaping feel narrow
- all CLI text and generated content are effectively hardcoded in English

These issues reduce product quality even though the core generation pipeline works.

## 5. Recommended Product Behavior

### 5.1 Language Selection

At startup, the CLI should ask the user to choose one language. That language controls:

- interactive prompts
- help text
- merge prompts
- success and error messaging
- generated `SOUL.md`
- generated `AGENTS.md`
- generated `TOOLS.md`

`persona.json` should remain language-neutral where practical, storing internal IDs and structured values rather than localized prose.

### 5.2 Tone and Emoji

The CLI interaction should use a light, friendly tone with occasional appropriate emoji.

Examples of acceptable behavior:

- short playful intros
- gentle encouragement
- a few contextual emoji in prompts or confirmations

Examples of unacceptable behavior:

- excessive emoji density
- joke-heavy prompts that reduce clarity
- playful language inside generated persona pack files

Generated markdown files must stay professional, clean, and execution-focused.

## 6. Question System Upgrade

### 6.1 New Design Principle

Questions and choices should no longer be hardcoded as direct display text. Instead, they should be represented by stable semantic IDs and rendered through a localization layer.

For example:

- `question.creation_mode`
- `question.use_case`
- `choice.use_case.engineering`
- `choice.capability.debugging`

This allows one internal model to support multiple languages cleanly.

### 6.2 Target Question Groups

Each primary step should offer 5-8 high-quality choices.

Recommended groups:

1. creation mode
2. primary use case
3. capability emphasis
4. personality spectrum preset
5. communication style
6. working style
7. risk and boundaries

### 6.3 Recommended Choice Expansion

#### Creation Mode

- start from scratch
- recommend from current project
- quick generate then refine
- import existing `persona.json`
- upgrade an existing persona pack

#### Primary Use Case

- engineering development
- debugging and repair
- research and analysis
- product and planning
- writing and documentation
- general collaboration
- teaching and coaching

#### Capability Emphasis

- engineering execution
- debugging
- architecture
- research
- collaboration
- decision making
- writing
- teaching

#### Personality Spectrum Preset

- balanced and steady
- calm and precise
- warm and energetic
- strong and leading
- gentle and collaborative
- highly distinctive
- reflective and analytical

#### Communication Style

- concise and direct
- structured and clear
- encouraging partner
- rigorous reviewer
- mentor style
- strategic advisor
- dense expert mode

#### Working Style

- plan first
- experiment first
- verification heavy
- iteration heavy
- high ownership
- conservative and safe
- outcome driven

#### Risk and Boundaries

- proactively flag risk
- confirm high-risk actions first
- avoid assumptions by default
- clarify ambiguity first
- challenge bad premises
- never skip verification
- avoid over-design

## 7. Multilingual Architecture

### 7.1 Separation of Concerns

The system should split into three layers:

1. semantic IDs
2. localization resources
3. renderers

The rule engine should only consume semantic values and internal structures. It should not know which language is active.

### 7.2 Localization Resource Types

The project should define localized text resources for:

- question messages
- choice labels
- help text
- merge prompts
- validation messages
- CLI success and error notifications
- markdown section headings
- markdown sentence templates

### 7.3 CLI Tone Layer

The CLI should have a language-aware tone layer that produces:

- light humor
- minor encouragement
- small amounts of emoji

This tone layer applies only to interaction messages, not to the generated pack content.

### 7.4 Generated File Tone

Generated files should use a professional tone in every language.

That means localized output, but not playful output.

## 8. Data Model Impact

### 8.1 Answers

Answer objects should store semantic values, not display labels.

Examples:

- `creationMode: "project-recommended"`
- `targetUseCase: "engineering"`
- `capabilityEmphasis: ["engineering", "debugging"]`

### 8.2 Persona Profile

The persona profile should remain language-neutral.

Localized prose belongs in the rendering layer, not in the core profile.

### 8.3 persona.json

`persona.json` should continue to preserve structured internal values.

Recommended additions:

- selected language code
- localized metadata if useful
- stable question and choice IDs

The file should not become primarily prose-based.

## 9. Rendering Strategy

### 9.1 CLI Rendering

CLI rendering should resolve:

- localized question copy
- localized option labels
- localized prompt framing
- localized merge behavior text

### 9.2 Markdown Rendering

Markdown rendering should use localized templates per file type:

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`

Each language should have:

- localized section headings
- localized connective phrasing
- localized professional templates

The renderers should continue to consume the same `personaProfile`.

## 10. File Structure Recommendation

Recommended additions:

```text
src/
├── i18n/
│   ├── index.ts
│   ├── locales.ts
│   ├── types.ts
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
│   ├── choices.ts
│   ├── questions.ts
│   └── flow.ts
```

Possible refinement:

- split prompt catalogs by domain if `choices.ts` becomes too large

## 11. Validation Strategy

### 11.1 Localization Completeness

Every supported language must provide entries for all required keys.

Missing keys should fail tests.

### 11.2 Question Coverage

Tests should assert that target question groups contain the expected number of choices.

### 11.3 Output Stability

Snapshot tests should verify localized markdown outputs for all five languages.

### 11.4 Tone Boundaries

Tests should ensure:

- CLI strings may contain limited emoji
- generated markdown does not contain playful emoji by default

## 12. Risks and Mitigations

### 12.1 Risk: Localization Drift

Mitigation:

- centralize keys
- add completeness tests
- avoid ad hoc strings in business logic

### 12.2 Risk: Choice Explosion

Mitigation:

- limit each question to 5-8 high-quality options
- keep options semantically distinct
- avoid near-duplicate labels

### 12.3 Risk: Tone Feels Inconsistent Across Languages

Mitigation:

- localize tone intentionally rather than direct translation
- keep playful language light
- prioritize clarity over cleverness

### 12.4 Risk: Generated Files Become Too Stylized

Mitigation:

- isolate tone to CLI only
- keep output templates professional
- test for unexpected emoji or playful copy in generated files

## 13. Recommended V1 Scope

This upgrade should include:

- startup language selection
- support for `en`, `zh`, `es`, `fr`, `ja`
- 5-8 options for each main question group
- localized CLI text
- localized generated markdown files
- professional output templates per language
- tests for localization completeness and expanded question coverage

This upgrade should not include:

- separate UI and output language settings
- automatic locale detection
- runtime translation services
- playful markdown output

## 14. Next Step

After user review of this design document, the next step is to create an implementation plan for the question expansion and internationalization upgrade.
