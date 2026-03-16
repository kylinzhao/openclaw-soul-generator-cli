export type LocaleCode = 'en' | 'zh' | 'es' | 'fr' | 'ja'

export interface CliMessages {
  languagePrompt: string
  helpTitle: string
  helpUsage: string
  mergePrompt: (fileName: string) => string
  mergeSmart: string
  mergeOverwrite: string
  mergeKeep: string
  successNoteTitle: string
  successNoteBody: (cwd: string) => string
}
