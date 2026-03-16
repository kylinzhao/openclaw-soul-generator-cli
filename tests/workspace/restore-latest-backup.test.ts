import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { restoreLatestWorkspaceBackup } from '../../src/workspace/restore-latest-backup'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('restoreLatestWorkspaceBackup', () => {
  it('restores the latest backup into the workspace', async () => {
    const workspaceDir = await fs.mkdtemp(path.join(os.tmpdir(), 'workspace-'))
    tempDirs.push(workspaceDir)

    const backupRoot = path.join(workspaceDir, '.openclaw-persona-backups')
    const backupDir = path.join(backupRoot, '20260316-120000')
    await fs.mkdir(backupDir, { recursive: true })
    await fs.writeFile(path.join(backupDir, 'SOUL.md'), 'restored soul')
    await fs.writeFile(path.join(backupDir, 'AGENTS.md'), 'restored agents')
    await fs.writeFile(path.join(backupDir, 'TOOLS.md'), 'restored tools')
    await fs.writeFile(
      path.join(backupDir, 'manifest.json'),
      JSON.stringify({ workspacePath: workspaceDir, managedFiles: ['SOUL.md', 'AGENTS.md', 'TOOLS.md'] })
    )

    const result = await restoreLatestWorkspaceBackup({ workspacePath: workspaceDir })

    expect(result.restoredFrom).toBe(backupDir)
    expect(await fs.readFile(path.join(workspaceDir, 'SOUL.md'), 'utf8')).toBe('restored soul')
  })

  it('reports cleanly when no backup exists', async () => {
    const workspaceDir = await fs.mkdtemp(path.join(os.tmpdir(), 'workspace-'))
    tempDirs.push(workspaceDir)

    const result = await restoreLatestWorkspaceBackup({ workspacePath: workspaceDir })

    expect(result.restoredFrom).toBeNull()
    expect(result.restoredFiles).toEqual([])
  })
})
