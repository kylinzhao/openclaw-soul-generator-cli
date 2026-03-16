import { describe, expect, it } from 'vitest'

import { buildPersonaProfile } from '../../src/rules/build-persona'

describe('buildPersonaProfile', () => {
  it('uses project signals to shape project fit', () => {
    const profile = buildPersonaProfile(
      {
        selectedLocale: 'zh',
        creationMode: 'project-recommended',
        targetUseCase: 'engineering',
        capabilityEmphasis: ['engineering'],
        personalityPreset: 'balanced',
        communicationStyle: 'direct',
        workingStyle: 'planning-first',
        riskBoundaries: ['flag-risk', 'never-skip-verification']
      },
      {
        primaryStack: 'typescript',
        projectType: 'cli',
        hasTests: true,
        maturity: 'established'
      }
    )

    expect(profile.projectFit.primaryStack).toBe('typescript')
    expect(profile.capabilities.engineeringExecution).toBeGreaterThanOrEqual(85)
    expect(profile.metadata.locale).toBe('zh')
  })

  it('keeps expressive personas guarded by execution rules', () => {
    const profile = buildPersonaProfile(
      {
        selectedLocale: 'en',
        creationMode: 'scratch',
        targetUseCase: 'general',
        capabilityEmphasis: ['engineering'],
        personalityPreset: 'balanced',
        communicationStyle: 'mentor',
        workingStyle: 'planning-first',
        riskBoundaries: ['flag-risk']
      },
      {
        primaryStack: 'unknown',
        projectType: 'application',
        hasTests: false,
        maturity: 'early'
      }
    )

    expect(profile.communication.style).toBe('mentor')
    expect(profile.guardrails.antiPatterns).toContain('skip verification')
  })
})
