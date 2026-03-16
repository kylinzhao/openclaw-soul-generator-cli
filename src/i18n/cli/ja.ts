import type { CliMessages } from '../types'

export const jaCliMessages: CliMessages = {
  languagePrompt: 'CLI の言語を選んでください 🌍',
  helpTitle: 'OpenClaw Persona Pack Generator',
  helpUsage: '使い方: openclaw-persona [--cwd <path>]',
  mergePrompt: (fileName) => `${fileName} は既にあります。このロブスターはどうしますか？🦞`,
  mergeSmart: 'スマートマージ（おすすめ）',
  mergeOverwrite: '上書き',
  mergeKeep: '既存ファイルを保持',
  successNoteTitle: 'OpenClaw Persona Pack Generator',
  successNoteBody: (cwd) => `${cwd} に persona pack を生成しました`
}
