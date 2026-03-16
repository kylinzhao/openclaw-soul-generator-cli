import { describe, expect, it } from 'vitest'

import { buildPersonaProfile } from '../../src/rules/build-persona'

describe('buildPersonaProfile', () => {
  it('uses project signals to shape project fit', () => {
    const profile = buildPersonaProfile(
      {
        creationMode: 'project-recommended',
        targetUseCase: 'engineering',
        capabilityEmphasis: ['engineering'],
        personalityPreset: 'balanced'
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
  })

  it('keeps expressive personas guarded by execution rules', () => {
    const profile = buildPersonaProfile(
      {
        creationMode: 'scratch',
        targetUseCase: 'general',
        capabilityEmphasis: ['engineering'],
        personalityPreset: 'expressive'
      },
      {
        primaryStack: 'unknown',
        projectType: 'application',
        hasTests: false,
        maturity: 'early'
      }
    )

    expect(profile.personality.humor).toBeGreaterThan(40)
    expect(profile.guardrails.antiPatterns).toContain('skip verification')
  })
})
