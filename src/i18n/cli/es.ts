import type { CliMessages } from '../types'

export const esCliMessages: CliMessages = {
  languagePrompt: 'Elige el idioma del CLI 🌍',
  helpTitle: 'OpenClaw Persona Pack Generator',
  helpUsage: 'Uso: openclaw-persona [--cwd <ruta>]',
  mergePrompt: (fileName) => `${fileName} ya existe. ¿Qué debería hacer esta langosta? 🦞`,
  mergeSmart: 'Combinar inteligentemente (recomendado)',
  mergeOverwrite: 'Sobrescribir',
  mergeKeep: 'Conservar el archivo actual',
  successNoteTitle: 'OpenClaw Persona Pack Generator',
  successNoteBody: (cwd) => `Persona pack generado en ${cwd}`
}
