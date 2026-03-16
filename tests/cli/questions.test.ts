import { describe, expect, it } from 'vitest'

import { QUESTION_DEFINITIONS } from '../../src/prompts/questions'

describe('wizard questions', () => {
  it('includes the expected core prompts', () => {
    expect(QUESTION_DEFINITIONS.length).toBeGreaterThanOrEqual(6)
    expect(QUESTION_DEFINITIONS.map((question) => question.id)).toContain('language')
    expect(QUESTION_DEFINITIONS.map((question) => question.id)).toContain('creation-mode')
    expect(QUESTION_DEFINITIONS.map((question) => question.id)).toContain('capabilities')
    expect(QUESTION_DEFINITIONS.map((question) => question.id)).toContain('personality')
    expect(QUESTION_DEFINITIONS.map((question) => question.id)).toContain('risk-boundaries')
  })

  it('uses semantic message keys and marks recommended defaults on core questions', () => {
    const creationMode = QUESTION_DEFINITIONS.find((question) => question.id === 'creation-mode')

    expect(creationMode?.messageKey).toBe('question.creation_mode')
    expect(creationMode?.choices.some((choice) => choice.recommended)).toBe(true)
  })
})
