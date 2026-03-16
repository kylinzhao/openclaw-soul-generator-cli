import { describe, expect, it } from 'vitest'

import { personaProfileSchema } from '../../src/types/persona'

describe('persona profile schema', () => {
  it('parses a minimal persona profile', () => {
    const parsed = personaProfileSchema.parse({
      identity: { codename: 'Harbor Claw', role: 'engineering commander' },
      personality: {
        restraint: 70,
        warmth: 45,
        sharpness: 80,
        initiative: 78,
        humor: 20,
        patience: 65
      },
      capabilities: { engineeringExecution: 92 },
      workingStyle: { planningBias: 'balanced' },
      communication: { style: 'direct' },
      guardrails: { antiPatterns: ['skip verification'] },
      projectFit: { primaryStack: 'typescript' },
      flair: { tags: ['precise'] },
      metadata: { version: 1, locale: 'en' }
    })

    expect(parsed.identity.codename).toBe('Harbor Claw')
  })
})
