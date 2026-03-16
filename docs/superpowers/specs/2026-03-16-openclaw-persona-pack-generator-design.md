# OpenClaw Persona Pack Generator CLI - Design

**Project Name:** OpenClaw Persona Pack Generator CLI
**Date:** 2026-03-16
**Status:** Draft approved in brainstorming
**Version:** 1.0

## 1. Overview

### 1.1 Goal

Build a local, offline, interactive CLI that helps users create a high-quality OpenClaw persona pack through guided multiple-choice questions.

The generator should produce personas that are:

- diverse in personality
- strong in the capabilities the user actually needs
- rich in character without sacrificing reliability
- aligned with OpenClaw persona best practices

### 1.2 Why This Exists

The existing `lobster-soul-generator` repository is useful as a product reference, but it is mostly a design/planning repository rather than a reusable implementation base. Its main value is the product framing:

- guided creation flow
- local generation
- combination of personality and work preferences

For this CLI, we will adapt those ideas to a better-fitting architecture for OpenClaw:

- interactive CLI instead of web wizard
- persona pack output instead of only `SOUL.md`
- rule engine plus composable templates instead of freeform generation
- strong preference for selectable prompts over large text inputs

### 1.3 Non-Goals

The first version will not:

- depend on an online model during CLI execution
- perform deep semantic code analysis of a repository
- generate arbitrary prose with unlimited stylistic freedom
- replace all OpenClaw bootstrapping files

## 2. Product Direction

### 2.1 Primary Experience

The primary experience is a guided CLI wizard with a medium-length flow.

Default behavior:

- asks roughly 10-12 questions
- prefers choices and recommendations over open text entry
- allows `recommended`, `skip`, and `quick path` in appropriate steps
- lightly inspects the current repository when available

### 2.2 Supported Creation Modes

The CLI should support three entry modes:

1. start from scratch
2. recommend based on current project
3. quick generate, then refine

These modes share the same generation engine but differ in how much user input is required upfront.

### 2.3 Primary Output

The CLI will generate an OpenClaw persona pack rather than only a soul file.

Default outputs:

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

Optional future outputs:

- `IDENTITY.md`
- `USER.md`
- `BOOTSTRAP.md`

## 3. Design Principles

### 3.1 Offline First

The generator must work without model calls. All decisions should be derived from:

- user answers
- repository signals
- local templates
- local rules
- optional randomness with a reproducible seed

### 3.2 Selective Input Over Free Text

The wizard should minimize user typing. Most questions should be expressed as:

- single choice
- multi-choice
- ranking
- slider-like spectrum choices
- accept recommended defaults

Short text input is allowed only when it materially improves the persona, such as a project description or custom name.

### 3.3 Character With Operational Value

The generated persona should feel distinct, but every major trait should change behavior in a useful way. The system should avoid empty flavor text that does not affect execution.

### 3.4 Best-Practice Separation

Different concerns should live in different files:

- `SOUL.md` for identity, temperament, collaboration vibe, values
- `AGENTS.md` for execution discipline and working method
- `TOOLS.md` for tool behavior and operational safety

This separation is critical for strong results in OpenClaw.

## 4. Existing Reference Analysis

The reference repository highlights several useful ideas:

- guided, multi-step creation is valuable
- local generation is desirable
- persona generation benefits from combining role, personality, and work preferences

It also suggests a few adjustments for this CLI:

- MBTI should not be the primary design axis
- web-specific navigation patterns do not translate directly to CLI
- generating only `SOUL.md` is insufficient for strong OpenClaw behavior

Conclusion:

The new generator should borrow the guided composition concept, but center the design around persona pack generation and structured behavior modeling.

## 5. System Architecture

The CLI should be split into five clear modules.

### 5.1 Wizard Layer

Responsibilities:

- ask questions step by step
- present recommended answers
- support skip and quick mode
- collect structured user answers

Output:

- `answers`

### 5.2 Context Scan Layer

Responsibilities:

- lightly inspect the current repository
- read files such as `README`, dependency manifests, and key config files
- infer lightweight project signals

Examples of signals:

- runtime or language family
- probable project type
- presence of tests
- probable frontend/backend/tooling emphasis
- maturity indicators

Output:

- `projectSignals`

### 5.3 Persona Modeling Layer

Responsibilities:

- combine `answers` and `projectSignals`
- derive persona archetype
- compute personality spectrum values
- weight capabilities
- choose collaboration style and decision defaults
- enforce consistency rules

Output:

- `personaProfile`

This is the core rule engine of the system.

### 5.4 Rendering Layer

Responsibilities:

- transform `personaProfile` into file-specific representations
- assemble markdown from reusable templates and fragments
- render JSON output

Outputs:

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

### 5.5 Validation and Persistence Layer

Responsibilities:

- validate completeness and consistency
- detect conflicting traits
- save outputs
- manage merge or overwrite behavior for existing files

## 6. Wizard Flow

The default wizard should use approximately 10-12 steps, but support acceleration paths.

### 6.1 Proposed Steps

1. creation mode
2. target use case
3. project context
4. primary capability emphasis
5. personality spectrum
6. communication style
7. working style
8. decision posture and boundaries
9. domain or technical preferences
10. anti-patterns and dislikes
11. preview and confirmation
12. generation and save

### 6.2 Input Style

Preferred formats:

- choice lists
- checkboxes
- ranked preferences
- spectrum selections with labeled endpoints
- recommended answer shortcuts

Avoid:

- long paragraph prompts
- forcing the user to explain traits in prose
- too many fine-grained knobs in the main flow

### 6.3 Acceleration

The wizard should support:

- quick mode
- accept recommended answer
- skip optional question
- project-driven prefill when repository signals are strong

### 6.4 Optional Personality Reference

MBTI or similar systems may be offered as optional references, but they should not drive the model. The generator should remain centered on behavior, capability, and collaboration fit.

## 7. Persona Profile Data Model

The generator should first build a structured internal profile before rendering any markdown.

### 7.1 Core Structure

Recommended top-level sections:

- `identity`
- `personality`
- `capabilities`
- `workingStyle`
- `communication`
- `guardrails`
- `projectFit`
- `flair`
- `metadata`

### 7.2 Identity

Contains:

- persona name or codename
- primary role framing
- intended usage context
- domain affinities

### 7.3 Personality

Represented as normalized spectrum values, for example:

- restraint
- warmth
- sharpness
- initiative
- humor
- patience

These values affect both phrasing and behavior.

### 7.4 Capabilities

Represents weighted strengths such as:

- engineering execution
- debugging
- architecture
- research
- writing
- collaboration
- teaching
- decision-making
- planning

Strength should be modeled as coordinated bundles instead of isolated tags. For example, strong engineering execution should raise:

- implementation skill
- task breakdown
- debugging discipline
- verification habits
- delivery rigor

### 7.5 Working Style

Examples:

- planning-first vs experiment-first
- strict verification vs fast iteration
- explicit trade-off discussion
- ownership level
- documentation tendency

### 7.6 Communication

Examples:

- concise vs explanatory
- direct vs diplomatic
- partner-like vs instructor-like
- willingness to challenge assumptions

### 7.7 Guardrails

Contains constraints such as:

- avoid over-design
- do not skip verification
- do not bluff confidence
- escalate hidden risk

### 7.8 Project Fit

Derived from repository context where available:

- stack affinities
- expected workflows
- testing expectations
- file or tool conventions

### 7.9 Flair

Limited identity markers that create distinctiveness without overwhelming the pack. This should remain small and behaviorally relevant.

## 8. Generation Strategy

The generator should use layered synthesis.

### 8.1 Base Archetype

First choose a primary archetype based on user goals, such as:

- engineering commander
- research strategist
- collaboration lead
- creative builder
- precision operator

### 8.2 Capability Weighting

Then adjust capability bundles based on user intent. The goal is not only to amplify the requested strength, but also to add the necessary supporting disciplines.

### 8.3 Style Modulation

Apply personality spectrum settings to the same underlying capability profile. This allows multiple distinct personas to still remain effective.

Example:

- high-engineering plus calm precision
- high-engineering plus energetic momentum

### 8.4 Project Adaptation

Project signals should refine:

- domain-specific tool habits
- testing posture
- likely artifact preferences
- working assumptions

### 8.5 Consistency Repair

The final pass should fix or reject conflicting states, such as:

- highly dominant but never willing to decide
- extremely expressive but entirely flavorless wording
- strong engineering persona with no validation behavior

## 9. Output File Design

### 9.1 `SOUL.md`

Purpose:

- express the core persona
- communicate temperament and values
- establish relationship style with the user

Recommended sections:

- Core Identity
- Personality Profile
- Primary Capabilities
- Working Presence
- Communication Style
- Signature Flavor

### 9.2 `AGENTS.md`

Purpose:

- define how the persona operates
- encode work discipline and collaboration rules

Recommended sections:

- Mission and Focus
- Planning and Execution
- Decision Rules
- Validation Habits
- Collaboration Contract
- Risk Handling
- Anti-Patterns

### 9.3 `TOOLS.md`

Purpose:

- define tool usage norms
- prevent unsafe or low-quality operational behavior

Recommended sections:

- Search and Inspection
- Editing Discipline
- Verification Rules
- Safety Constraints
- Tool-Specific Preferences

### 9.4 `persona.json`

Purpose:

- preserve the structured source of truth
- enable reproducibility and regeneration

Should include:

- answers
- project signals
- selected archetype
- normalized persona profile
- rule hits
- seed
- output metadata

## 10. Existing File Detection and Merge

This is a first-version requirement.

### 10.1 Detection

Before writing outputs, the CLI should detect whether any of these already exist in the target location:

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `IDENTITY.md`
- `USER.md`
- `BOOTSTRAP.md`
- `persona.json`

### 10.2 User Choice

When existing files are found, the CLI should ask the user how to proceed, using selectable choices rather than open text where possible.

Recommended actions:

1. keep existing file
2. overwrite with generated file
3. smart merge
4. save as a new persona pack

### 10.3 Smart Merge

First version smart merge should be rule-based, not freeform semantic rewriting.

Recommended merge behavior:

- merge by stable headings or named sections
- preserve user-authored custom sections where possible
- replace generator-owned sections with regenerated content
- ask follow-up questions only when a conflict is meaningful

### 10.4 File-Specific Defaults

Recommended merge defaults:

- `SOUL.md`: cautious, ask before replacing core identity sections
- `AGENTS.md`: allow section-level smart merge
- `TOOLS.md`: allow section-level smart merge
- `persona.json`: back up old version, then overwrite or version

### 10.5 Template Implication

To support safe merging, generated markdown should use stable section headings and optionally generator-managed markers if needed.

## 11. Validation Strategy

The generator should validate both the internal profile and the rendered outputs.

### 11.1 Consistency Validation

Check for conflicts between:

- personality traits
- capability claims
- work rules
- communication rules

### 11.2 Completeness Validation

Ensure every generated pack includes the minimum sections required to be operationally useful.

### 11.3 Context Fit Validation

If project signals are present, ensure the resulting persona pack reflects them in a meaningful way.

### 11.4 Style Boundary Validation

Ensure strong personality never erodes reliability, clarity, or execution quality.

## 12. Testing Strategy

The implementation should be testable without model calls.

Recommended test layers:

- rule engine unit tests
- repository signal extraction tests
- merge behavior tests
- persona profile consistency tests
- markdown rendering snapshot tests
- end-to-end CLI wizard tests

Representative snapshots should cover multiple persona families, including:

- engineering-heavy persona
- research-heavy persona
- leadership-heavy persona
- balanced generalist persona
- highly expressive but still reliable persona

## 13. Risks and Mitigations

### 13.1 Risk: Persona Feels Generic

Mitigation:

- use archetypes plus spectrum modulation
- add limited but meaningful flair
- ensure behavior changes with style changes

### 13.2 Risk: Persona Feels Rich but Not Useful

Mitigation:

- keep execution rules in `AGENTS.md`
- keep tool discipline in `TOOLS.md`
- validate operational completeness

### 13.3 Risk: Too Many Questions

Mitigation:

- keep the default flow medium-length
- support recommended answers
- support quick paths and skip

### 13.4 Risk: File Merge Causes User Friction

Mitigation:

- detect files up front
- default to explicit choices
- use section-based merge rather than whole-file replacement

## 14. Recommended V1 Scope

The first implementation should include:

- offline interactive CLI
- choice-heavy wizard
- light repository scanning
- persona profile rule engine
- output of `SOUL.md`, `AGENTS.md`, `TOOLS.md`, `persona.json`
- detection of existing files
- merge decision flow
- core validation and tests

The first implementation should not include:

- model-backed prose generation
- deep code comprehension
- advanced persona marketplace features
- support for every OpenClaw markdown file

## 15. Open Questions Resolved During Brainstorming

The following product decisions were made:

- generation should be interactive rather than flag-driven
- output should be enhanced-role style, not strict minimal template only
- strength should be shaped by user needs rather than a fixed capability preset
- wizard flow should be medium-length with quick path support
- the CLI should support both blank-start and existing-project contexts
- repository analysis should be light
- execution should not depend on an online model
- output should include both markdown and structured JSON
- personality should be on a tunable spectrum
- the tool should generate a full OpenClaw persona pack
- existing persona files should trigger a merge decision flow

## 16. Next Step

After user review of this design document, the next step is to create a detailed implementation plan for the CLI.
