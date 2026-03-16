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
  it('collects the locale-first start-from-scratch path', async () => {
    const answers = await runPromptFlow(
      new StubPromptAdapter({
        language: 'zh',
        'creation-mode': 'scratch',
        'use-case': 'engineering',
        capabilities: ['engineering'],
        personality: 'balanced',
        communication: 'direct',
        'working-style': 'planning-first',
        'risk-boundaries': ['flag-risk', 'never-skip-verification']
      })
    )

    expect(answers.selectedLocale).toBe('zh')
    expect(answers.creationMode).toBe('scratch')
    expect(answers.targetUseCase).toBe('engineering')
    expect(answers.capabilityEmphasis).toEqual(['engineering'])
    expect(answers.communicationStyle).toBe('direct')
    expect(answers.workingStyle).toBe('planning-first')
    expect(answers.riskBoundaries).toEqual(['flag-risk', 'never-skip-verification'])
  })
})
