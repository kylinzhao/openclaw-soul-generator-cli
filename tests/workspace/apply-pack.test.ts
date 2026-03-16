import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { applyPersonaPackToWorkspace } from '../../src/workspace/apply-pack'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('applyPersonaPackToWorkspace', () => {
  it('backs up and replaces managed files in the workspace', async () => {
    const workspaceDir = await fs.mkdtemp(path.join(os.tmpdir(), 'workspace-'))
    const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'output-'))
    tempDirs.push(workspaceDir, outputDir)

    await fs.writeFile(path.join(workspaceDir, 'SOUL.md'), 'old soul')
    await fs.writeFile(path.join(workspaceDir, 'AGENTS.md'), 'old agents')
    await fs.writeFile(path.join(workspaceDir, 'TOOLS.md'), 'old tools')

    const result = await applyPersonaPackToWorkspace({
      workspacePath: workspaceDir,
      outputPath: outputDir,
      locale: 'en',
      files: {
        'SOUL.md': 'new soul',
        'AGENTS.md': 'new agents',
        'TOOLS.md': 'new tools',
        'persona.json': '{}'
      }
    })

    expect(result.workspacePath).toBe(workspaceDir)
    expect(result.backupPath).toContain('.openclaw-persona-backups')
    expect(await fs.readFile(path.join(workspaceDir, 'SOUL.md'), 'utf8')).toBe('new soul')
  })
})
