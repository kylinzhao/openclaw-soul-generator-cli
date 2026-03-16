import fs from 'node:fs/promises'
import path from 'node:path'

import {
  MANAGED_PERSONA_FILES,
  WORKSPACE_BACKUP_DIRNAME,
  type WorkspaceBackupManifest
} from './manifest'

export interface RestoreLatestWorkspaceBackupInput {
  workspacePath: string
}

export interface RestoreLatestWorkspaceBackupResult {
  restoredFrom: string | null
  restoredFiles: string[]
}

async function findLatestBackupDir(backupRoot: string): Promise<string | null> {
  try {
    const entries = await fs.readdir(backupRoot, { withFileTypes: true })
    const directories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(backupRoot, entry.name))
      .sort()

    return directories.at(-1) ?? null
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }

    throw error
  }
}

async function readManagedFiles(backupPath: string): Promise<string[]> {
  const manifestPath = path.join(backupPath, 'manifest.json')

  try {
    const rawManifest = await fs.readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(rawManifest) as Partial<WorkspaceBackupManifest>

    return manifest.managedFiles?.length ? manifest.managedFiles : [...MANAGED_PERSONA_FILES]
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [...MANAGED_PERSONA_FILES]
    }

    throw error
  }
}

export async function restoreLatestWorkspaceBackup(
  input: RestoreLatestWorkspaceBackupInput
): Promise<RestoreLatestWorkspaceBackupResult> {
  const backupRoot = path.join(input.workspacePath, WORKSPACE_BACKUP_DIRNAME)
  const latestBackupPath = await findLatestBackupDir(backupRoot)

  if (!latestBackupPath) {
    return {
      restoredFrom: null,
      restoredFiles: []
    }
  }

  await fs.mkdir(input.workspacePath, { recursive: true })

  const managedFiles = await readManagedFiles(latestBackupPath)
  const restoredFiles: string[] = []

  for (const fileName of managedFiles) {
    const sourcePath = path.join(latestBackupPath, fileName)
    const targetPath = path.join(input.workspacePath, fileName)

    try {
      await fs.copyFile(sourcePath, targetPath)
      restoredFiles.push(fileName)
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
    }
  }

  return {
    restoredFrom: latestBackupPath,
    restoredFiles
  }
}
