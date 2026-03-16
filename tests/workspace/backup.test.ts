import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { createWorkspaceBackup } from '../../src/workspace/backup'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('createWorkspaceBackup', () => {
  it('creates a timestamped backup with managed files and a manifest', async () => {
    const workspaceDir = await fs.mkdtemp(path.join(os.tmpdir(), 'workspace-'))
    const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'output-'))
    tempDirs.push(workspaceDir, outputDir)

    await fs.writeFile(path.join(workspaceDir, 'SOUL.md'), 'old soul')
    await fs.writeFile(path.join(workspaceDir, 'AGENTS.md'), 'old agents')
    await fs.writeFile(path.join(workspaceDir, 'TOOLS.md'), 'old tools')

    const result = await createWorkspaceBackup({
      workspacePath: workspaceDir,
      outputPath: outputDir,
      locale: 'zh',
      managedFiles: ['SOUL.md', 'AGENTS.md', 'TOOLS.md']
    })

    expect(result.backupPath).toContain('.openclaw-persona-backups')
    expect(await fs.readFile(path.join(result.backupPath, 'SOUL.md'), 'utf8')).toBe('old soul')
    expect(JSON.parse(await fs.readFile(path.join(result.backupPath, 'manifest.json'), 'utf8'))).toMatchObject({
      workspacePath: workspaceDir,
      locale: 'zh'
    })
  })
})
