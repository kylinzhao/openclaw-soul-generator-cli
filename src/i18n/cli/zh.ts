import type { CliMessages } from '../types'

export const zhCliMessages: CliMessages = {
  languagePrompt: '先选一下 CLI 语言吧 🌍',
  helpTitle: 'OpenClaw Persona Pack Generator',
  helpUsage: '用法：openclaw-persona [--cwd <路径>]',
  mergePrompt: (fileName) => `${fileName} 已存在，要怎么处理这只龙虾的旧设定？🦞`,
  mergeSmart: '智能合并（推荐）',
  mergeOverwrite: '覆盖',
  mergeKeep: '保留原文件',
  successNoteTitle: 'OpenClaw Persona Pack Generator',
  successNoteBody: (cwd) => `已经在 ${cwd} 生成 persona pack`
}
