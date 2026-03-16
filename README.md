# OpenClaw Persona Pack Generator

Offline interactive CLI for generating OpenClaw persona packs.

## What It Generates

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

## Languages

The CLI currently supports:

- English (`en`)
- Chinese (`zh`)
- Spanish (`es`)
- French (`fr`)
- Japanese (`ja`)

The wizard asks for the language first and uses it for both:

- the interactive CLI experience
- the generated markdown files

The CLI can stay light and playful, with a little humor and a few emojis. The generated persona pack stays professional and execution-focused.

## Usage

Install dependencies:

```bash
npm install
```

Run the interactive wizard in the current directory:

```bash
npm run dev
```

Run it against a target workspace:

```bash
npm run dev -- --cwd /path/to/workspace
```

Show help:

```bash
node dist/cli.js --help
```

## Behavior

- asks guided multiple-choice questions with richer 5-8 option groups
- lets the primary `use case` step select multiple responsibilities
- lightly inspects the target repository when relevant
- builds a local persona profile with no model calls
- detects existing persona files and asks how to handle them
- localizes CLI prompts and generated pack files in the selected language
- ends with a celebratory summary that shows exactly where the generated files live
- can apply `SOUL.md`, `AGENTS.md`, and `TOOLS.md` into the detected OpenClaw workspace after confirmation
- creates a timestamped backup before every workspace apply and can restore the latest backup

## Development

Run tests:

```bash
npm test
```

Run typecheck:

```bash
npm run lint
```

Build:

```bash
npm run build
```
