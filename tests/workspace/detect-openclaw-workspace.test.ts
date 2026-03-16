import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { detectOpenClawWorkspace } from '../../src/workspace/detect-openclaw-workspace'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('detectOpenClawWorkspace', () => {
  it('uses a configured workspace when present', async () => {
    const homeDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openclaw-home-'))
    tempDirs.push(homeDir)

    const configPath = path.join(homeDir, '.openclaw', 'openclaw.json')
    await fs.mkdir(path.dirname(configPath), { recursive: true })
    await fs.writeFile(
      configPath,
      JSON.stringify({
        agents: { defaults: { workspace: '~/custom/workspace' } }
      })
    )

    const result = await detectOpenClawWorkspace({ homeDir, configPath })

    expect(result.workspacePath).toBe(path.join(homeDir, 'custom', 'workspace'))
    expect(result.managedFiles).toEqual(['SOUL.md', 'AGENTS.md', 'TOOLS.md'])
  })

  it('falls back to the profile-specific default workspace', async () => {
    const homeDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openclaw-home-'))
    tempDirs.push(homeDir)

    const result = await detectOpenClawWorkspace({
      homeDir,
      env: { OPENCLAW_PROFILE: 'dev' }
    })

    expect(result.workspacePath).toBe(path.join(homeDir, '.openclaw', 'workspace-dev'))
  })
})
