import type { CliMessages } from '../types'

export const frCliMessages: CliMessages = {
  languagePrompt: 'Choisissez la langue du CLI 🌍',
  helpTitle: 'OpenClaw Persona Pack Generator',
  helpUsage: 'Utilisation : openclaw-persona [--cwd <chemin>]',
  mergePrompt: (fileName) => `${fileName} existe deja. Que doit faire ce homard ? 🦞`,
  mergeSmart: 'Fusion intelligente (recommandee)',
  mergeOverwrite: 'Remplacer',
  mergeKeep: 'Conserver le fichier actuel',
  successNoteTitle: 'OpenClaw Persona Pack Generator',
  successNoteBody: (cwd) => `Persona pack genere dans ${cwd}`
}
