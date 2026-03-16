import fs from 'node:fs/promises'
import path from 'node:path'

import type { LocaleCode } from '../i18n'
import { WORKSPACE_BACKUP_DIRNAME, type WorkspaceBackupManifest } from './manifest'

export interface CreateWorkspaceBackupInput {
  workspacePath: string
  outputPath: string
  locale: LocaleCode
  managedFiles: string[]
}

export interface WorkspaceBackupResult {
  backupPath: string
  manifestPath: string
  backedUpFiles: string[]
}

function formatTimestamp(now: Date): string {
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}-${hours}${minutes}${seconds}`
}

export async function createWorkspaceBackup(
  input: CreateWorkspaceBackupInput
): Promise<WorkspaceBackupResult> {
  const backupRoot = path.join(input.workspacePath, WORKSPACE_BACKUP_DIRNAME)
  const backupPath = path.join(backupRoot, formatTimestamp(new Date()))
  const backedUpFiles: string[] = []

  await fs.mkdir(backupPath, { recursive: true })

  for (const fileName of input.managedFiles) {
    const sourcePath = path.join(input.workspacePath, fileName)
    const targetPath = path.join(backupPath, fileName)

    try {
      await fs.copyFile(sourcePath, targetPath)
      backedUpFiles.push(fileName)
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
    }
  }

  const manifest: WorkspaceBackupManifest = {
    workspacePath: input.workspacePath,
    outputPath: input.outputPath,
    locale: input.locale,
    managedFiles: input.managedFiles,
    createdAt: new Date().toISOString()
  }
  const manifestPath = path.join(backupPath, 'manifest.json')
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

  return {
    backupPath,
    manifestPath,
    backedUpFiles
  }
}
