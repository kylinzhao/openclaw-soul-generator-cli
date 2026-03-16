import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { runCli, type CliDependencies } from '../../src/cli'
import type { PromptAdapter } from '../../src/prompts/flow'

class StubPromptAdapter implements PromptAdapter {
  constructor(private readonly answers: Record<string, string | string[]>) {}

  async select(id: string): Promise<string> {
    return this.answers[id] as string
  }

  async multiselect(id: string): Promise<string[]> {
    return (this.answers[id] as string[]) ?? []
  }
}

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('runCli', () => {
  it('generates a persona pack in the target directory', async () => {
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-e2e-'))
    tempDirs.push(cwd)

    const deps: CliDependencies = {
      createPromptAdapter: async () =>
        new StubPromptAdapter({
          language: 'zh',
          'creation-mode': 'scratch',
          'use-case': 'engineering',
          capabilities: ['engineering'],
          personality: 'balanced',
          communication: 'direct',
          'working-style': 'planning-first',
          'risk-boundaries': ['flag-risk', 'never-skip-verification']
        }),
      chooseMergeStrategy: async () => 'overwrite'
    }

    const result = await runCli(['--cwd', cwd], deps)

    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('persona pack')
    expect(await fs.readFile(path.join(cwd, 'SOUL.md'), 'utf8')).toContain('核心身份')
  })
})
