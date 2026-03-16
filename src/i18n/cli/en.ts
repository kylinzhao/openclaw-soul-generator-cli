import type { CliMessages } from '../types'

export const enCliMessages: CliMessages = {
  languagePrompt: 'Choose your CLI language 🌍',
  helpTitle: 'OpenClaw Persona Pack Generator',
  helpUsage: 'Usage: openclaw-persona [--cwd <path>]',
  mergePrompt: (fileName) => `${fileName} already exists. What should this lobster do? 🦞`,
  mergeSmart: 'Smart merge (recommended)',
  mergeOverwrite: 'Overwrite',
  mergeKeep: 'Keep existing',
  successNoteTitle: 'OpenClaw Persona Pack Generator',
  successNoteBody: (cwd) => `Generated persona pack in ${cwd}`
}
