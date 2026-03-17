# OpenClaw Oh My Soul

[![npm version](https://img.shields.io/npm/v/openclaw-oh-my-soul.svg)](https://www.npmjs.com/package/openclaw-oh-my-soul)
[![GitHub](https://img.shields.io/badge/GitHub-openclaw--soul--generator--cli-black?logo=github)](https://github.com/kylinzhao/openclaw-soul-generator-cli)

[English](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.md) | [简体中文](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.zh-CN.md) | [Español](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.es.md) | [Français](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.fr.md) | [日本語](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.ja.md)

An offline CLI that helps you hatch an OpenClaw persona pack with suspiciously cheerful lobster energy.

## Why This Exists

Sometimes you want a sharp OpenClaw persona without spending your whole afternoon whispering into markdown files like a confused seaside wizard.

`openclaw-oh-my-soul` asks a tidy set of questions, reads a bit of your repo, then serves up:

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

The CLI gets to be playful. The generated pack stays useful, structured, and ready to work.

## Quick Start

Run it right where you want the persona pack to land:

```bash
npx openclaw-oh-my-soul
```

Point it at another workspace:

```bash
npx openclaw-oh-my-soul --cwd /path/to/workspace
```

Start in a specific CLI language:

```bash
npx openclaw-oh-my-soul --locale zh
```

Peek at the help screen and meet the lobster:

```bash
npx openclaw-oh-my-soul --help
```

## What The Lobster Actually Does

- asks guided multiple-choice questions instead of demanding a wall of prose
- lets the main use case cover multiple responsibilities
- lightly inspects the target repository for project signals
- builds a local persona profile with no model calls
- detects existing persona files and asks how to handle the old shell
- localizes both the CLI prompts and generated output files
- can apply `SOUL.md`, `AGENTS.md`, and `TOOLS.md` into a detected OpenClaw workspace
- creates a timestamped backup before every workspace apply, then restores it if needed

## Supported Languages

The CLI supports:

- English (`en`)
- Chinese (`zh`)
- Spanish (`es`)
- French (`fr`)
- Japanese (`ja`)

The first question is the CLI language, and that choice also controls the generated markdown pack.

## Why It Is A Little Fun

Because tooling does not need to sound like it was raised in a beige spreadsheet.

This project aims for:

- clear commands
- fast scanning
- practical output
- just enough lobster nonsense to keep the terminal from feeling haunted

## Development

Install dependencies:

```bash
npm install
```

Run the checks:

```bash
npm run lint
npm test
npm run build
```

## Repo

- GitHub: [kylinzhao/openclaw-soul-generator-cli](https://github.com/kylinzhao/openclaw-soul-generator-cli)
- npm: [openclaw-oh-my-soul](https://www.npmjs.com/package/openclaw-oh-my-soul)
