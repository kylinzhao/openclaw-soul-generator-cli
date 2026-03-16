import type { LocaleCode } from '../i18n'

export const MANAGED_PERSONA_FILES = ['SOUL.md', 'AGENTS.md', 'TOOLS.md'] as const
export const WORKSPACE_BACKUP_DIRNAME = '.openclaw-persona-backups'

export type ManagedPersonaFile = (typeof MANAGED_PERSONA_FILES)[number]

export interface WorkspaceBackupManifest {
  workspacePath: string
  outputPath: string
  locale: LocaleCode
  managedFiles: string[]
  createdAt: string
}
