# OpenClaw Oh My Soul

[![npm version](https://img.shields.io/npm/v/openclaw-oh-my-soul.svg)](https://www.npmjs.com/package/openclaw-oh-my-soul)
[![GitHub](https://img.shields.io/badge/GitHub-openclaw--soul--generator--cli-black?logo=github)](https://github.com/kylinzhao/openclaw-soul-generator-cli)

[English](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.md) | [简体中文](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.zh-CN.md) | [Español](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.es.md) | [Français](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.fr.md) | [日本語](https://github.com/kylinzhao/openclaw-soul-generator-cli/blob/main/README.ja.md)

一个离线 CLI，用一只有点话痨但很能干的龙虾，帮你生成 OpenClaw persona pack。

## 这玩意是干嘛的

有时候你只是想要一套像样的 OpenClaw persona，不想自己对着四个 markdown 文件发呆两小时。

`openclaw-oh-my-soul` 会问你一组结构清楚的问题，顺手看一点仓库线索，然后帮你端上：

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

CLI 可以活泼一点，输出结果依然会保持专业、可执行、能落地。

## 快速开始

在当前目录直接生成：

```bash
npx openclaw-oh-my-soul
```

指定另一个工作目录：

```bash
npx openclaw-oh-my-soul --cwd /path/to/workspace
```

指定 CLI 语言：

```bash
npx openclaw-oh-my-soul --locale zh
```

先看看帮助和龙虾长啥样：

```bash
npx openclaw-oh-my-soul --help
```

## 这只龙虾会做什么

- 用选择题引导，而不是上来就逼你写长篇小作文
- 主 `use case` 支持多选
- 轻量扫描目标仓库，提取项目信号
- 全程本地生成，不调用模型
- 如果已有 persona 文件，会先问你怎么处理旧壳
- CLI 和生成文件都支持多语言
- 可以把 `SOUL.md`、`AGENTS.md`、`TOOLS.md` 直接应用到检测到的 OpenClaw workspace
- 每次应用前自动备份，必要时还能恢复

## 支持语言

目前支持：

- English (`en`)
- 中文 (`zh`)
- Español (`es`)
- Français (`fr`)
- 日本語 (`ja`)

CLI 第一题会先问语言，这个选择也会同步决定生成出来的 markdown pack 语言。

## 为什么它读起来有点好玩

因为命令行工具不一定非得像一份冷冰冰的报销单。

这个项目想兼顾几件事：

- 命令要清楚
- 信息要好扫
- 输出要靠谱
- 龙虾可以偶尔整活，但不能妨碍干活

## 开发

安装依赖：

```bash
npm install
```

运行检查：

```bash
npm run lint
npm test
npm run build
```

## 项目链接

- GitHub: [kylinzhao/openclaw-soul-generator-cli](https://github.com/kylinzhao/openclaw-soul-generator-cli)
- npm: [openclaw-oh-my-soul](https://www.npmjs.com/package/openclaw-oh-my-soul)
