# OpenClaw Oh My Soul

[![npm version](https://img.shields.io/npm/v/openclaw-oh-my-soul.svg)](https://www.npmjs.com/package/openclaw-oh-my-soul)
[![GitHub](https://img.shields.io/badge/GitHub-openclaw--soul--generator--cli-black?logo=github)](https://github.com/kylinzhao/openclaw-soul-generator-cli)

[English](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.md) | [简体中文](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.zh-CN.md) | [Español](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.es.md) | [Français](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.fr.md) | [日本語](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.ja.md)

Une CLI hors ligne qui vous aide a preparer un persona pack OpenClaw avec une energie de homard plutot joyeuse.

## A Quoi Ca Sert

Parfois on veut juste une bonne persona OpenClaw sans passer lapres-midi a fixer quatre fichiers markdown comme un sorcier maritime tres fatigue.

`openclaw-oh-my-soul` pose quelques questions propres, lit un peu le depot, puis sert :

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

La CLI peut plaisanter. Le pack genere, lui, reste net et utile.

## Demarrage Rapide

Generez le pack dans le dossier courant :

```bash
npx openclaw-oh-my-soul
```

Visez un autre workspace :

```bash
npx openclaw-oh-my-soul --cwd /path/to/workspace
```

Choisissez la langue de depart :

```bash
npx openclaw-oh-my-soul --locale fr
```

Regardez laide et dites bonjour au homard :

```bash
npx openclaw-oh-my-soul --help
```

## Ce Que Fait Le Homard

- pose des questions guidees au lieu de reclamer un roman
- accepte plusieurs responsabilites principales dans `use case`
- inspecte legerement le depot pour capter des signaux du projet
- genere tout en local, sans appel modele
- detecte les anciens fichiers persona et demande comment traiter lancienne carapace
- localise la CLI comme les fichiers generes
- peut appliquer `SOUL.md`, `AGENTS.md` et `TOOLS.md` dans un workspace OpenClaw detecte
- cree une sauvegarde avant chaque application et peut la restaurer ensuite

## Langues Prises En Charge

- English (`en`)
- 中文 (`zh`)
- Español (`es`)
- Français (`fr`)
- 日本語 (`ja`)

La premiere question choisit la langue de la CLI, et ce choix pilote aussi la langue du pack genere.

## Pourquoi Cest Un Peu Drole

Parce quun outil nest pas oblige de parler comme un tableur triste qui a perdu foi en la mer.

Le projet cherche a combiner :

- des commandes claires
- une lecture rapide
- une sortie pratique
- juste assez de folie de homard pour garder le terminal vivant

## Developpement

Installez les dependances :

```bash
npm install
```

Lancez les verifications :

```bash
npm run lint
npm test
npm run build
```

## Liens

- GitHub: [kylinzhao/openclaw-soul-generator-cli](https://github.com/kylinzhao/openclaw-soul-generator-cli)
- npm: [openclaw-oh-my-soul](https://www.npmjs.com/package/openclaw-oh-my-soul)
