# OpenClaw Oh My Soul

[![npm version](https://img.shields.io/npm/v/openclaw-oh-my-soul.svg)](https://www.npmjs.com/package/openclaw-oh-my-soul)
[![GitHub](https://img.shields.io/badge/GitHub-openclaw--soul--generator--cli-black?logo=github)](https://github.com/kylinzhao/openclaw-soul-generator-cli)

[English](./README.md) | [简体中文](./README.zh-CN.md) | [Español](./README.es.md) | [Français](./README.fr.md) | [日本語](./README.ja.md)

OpenClaw の persona pack を、ちょっと陽気なロブスター気分で整えてくれるオフライン CLI です。

## 何をしてくれるのか

OpenClaw 用の persona を作りたいだけなのに、四つの markdown を前にして海辺の疲れた魔法使いみたいになる午後、ありますよね。

`openclaw-oh-my-soul` は質問をいくつか整理して投げ、リポジトリを少しだけ読み、次のファイルをまとめて用意します。

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

CLI は少し愛嬌あり。生成される pack はきちんと実務向きです。

## クイックスタート

今いるディレクトリで生成する:

```bash
npx openclaw-oh-my-soul
```

別の workspace を指定する:

```bash
npx openclaw-oh-my-soul --cwd /path/to/workspace
```

CLI の開始言語を指定する:

```bash
npx openclaw-oh-my-soul --locale ja
```

ヘルプとロブスターに会う:

```bash
npx openclaw-oh-my-soul --help
```

## このロブスターがやること

- いきなり長文入力を求めず、ガイド付きの選択肢で進める
- `use case` では複数の役割を選べる
- 対象リポジトリを軽く見て、プロジェクトの気配を拾う
- モデル呼び出しなしでローカル生成する
- 既存の persona ファイルがあれば古い甲羅をどう扱うか聞いてくれる
- CLI も生成ファイルも多言語対応
- 検出した OpenClaw workspace に `SOUL.md`、`AGENTS.md`、`TOOLS.md` を適用できる
- 適用前には毎回バックアップを作り、必要なら復元できる

## 対応言語

- English (`en`)
- 中文 (`zh`)
- Español (`es`)
- Français (`fr`)
- 日本語 (`ja`)

最初の質問で CLI の言語を選ぶと、そのまま生成される pack の言語にも反映されます。

## なぜ少しふざけているのか

道具がいつも無機質である必要はないからです。

このプロジェクトは次の両立を狙っています。

- コマンドは明快
- 情報は読みやすい
- 出力は実用的
- でも端末が完全に無表情にはならない程度のロブスター感

## 開発

依存関係を入れる:

```bash
npm install
```

チェックを回す:

```bash
npm run lint
npm test
npm run build
```

## リンク

- GitHub: [kylinzhao/openclaw-soul-generator-cli](https://github.com/kylinzhao/openclaw-soul-generator-cli)
- npm: [openclaw-oh-my-soul](https://www.npmjs.com/package/openclaw-oh-my-soul)
