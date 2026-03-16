# OpenClaw Persona Pack Generator

Offline interactive CLI for generating OpenClaw persona packs.

## What It Generates

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

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

- asks guided multiple-choice questions
- lightly inspects the target repository when relevant
- builds a local persona profile with no model calls
- detects existing persona files and asks how to handle them

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
