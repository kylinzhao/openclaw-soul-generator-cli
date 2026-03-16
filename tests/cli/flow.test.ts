import { describe, expect, it } from 'vitest'

import { runPromptFlow, type PromptAdapter } from '../../src/prompts/flow'

class StubPromptAdapter implements PromptAdapter {
  constructor(private readonly answers: Record<string, string | string[]>) {}

  async select(id: string): Promise<string> {
    return this.answers[id] as string
  }

  async multiselect(id: string): Promise<string[]> {
    return (this.answers[id] as string[]) ?? []
  }
}

describe('runPromptFlow', () => {
  it('collects the start-from-scratch path', async () => {
    const answers = await runPromptFlow(
      new StubPromptAdapter({
        'creation-mode': 'scratch',
        'use-case': 'engineering',
        capabilities: ['engineering'],
        personality: 'balanced'
      })
    )

    expect(answers.creationMode).toBe('scratch')
    expect(answers.targetUseCase).toBe('engineering')
    expect(answers.capabilityEmphasis).toEqual(['engineering'])
  })
})
