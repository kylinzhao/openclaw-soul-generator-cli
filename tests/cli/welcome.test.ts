import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { runCli, type CliDependencies } from '../../src/cli'
import { getCliMessages } from '../../src/i18n/cli'
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

describe('CLI welcome personality', () => {
  it('shows a lobster welcome splash before interactive prompts', async () => {
    const showIntro = vi.fn()
    const showNote = vi.fn()
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-welcome-'))
    tempDirs.push(cwd)

    const deps: CliDependencies = {
      showIntro,
      showNote,
      createPromptAdapter: async () =>
        new StubPromptAdapter({
          language: 'en',
          'creation-mode': 'scratch',
          'use-case': ['engineering'],
          capabilities: ['engineering'],
          personality: 'balanced',
          communication: 'direct',
          'working-style': 'planning-first',
          'risk-boundaries': ['flag-risk']
        }),
      chooseMergeStrategy: async () => 'overwrite',
      chooseFinishAction: async () => 'keep-output'
    }

    await runCli(['--cwd', cwd], deps)

    expect(showIntro).toHaveBeenCalledTimes(1)
    expect(showIntro.mock.calls[0]?.[0]).toContain('OpenClaw Oh My Soul')
    expect(showIntro.mock.calls[0]?.[0]).toContain('Sharp claws, gentle vibes')
    expect(showIntro.mock.calls[0]?.[0]).toContain('🦞')
    expect(showIntro.mock.calls[0]?.[0]).toContain('/  |_|  \\\\')
    expect(showIntro.mock.calls[0]?.[0]).toContain('(_____^____)')
    expect(showNote).toHaveBeenCalled()
  })

  it('keeps prompt copy clear first and playful second', () => {
    const messages = getCliMessages('en')

    expect(messages.questions['question.language']).toContain('\n')
    expect(messages.questions['question.language']).toContain('Choose your CLI language')
    expect(messages.questions['question.language']).toContain('little lobster')
    expect(messages.mergePrompt('SOUL.md')).toContain('\n')
    expect(messages.finishActionPrompt).toContain('\n')
    expect(messages.applyConfirmPrompt('/tmp/demo')).toContain('\n')
  })
})
