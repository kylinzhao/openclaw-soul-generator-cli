import { describe, expect, it } from 'vitest'

import { renderPersonaPack } from '../../src/output/render-pack'

describe('generated markdown tone', () => {
  it('does not include playful emoji in localized output files', () => {
    const pack = renderPersonaPack({
      identity: { codename: 'Harbor Claw', role: 'engineering-commander' },
      personality: { restraint: 70, warmth: 45, sharpness: 80, initiative: 78, humor: 20, patience: 65 },
      capabilities: { engineeringExecution: 92 },
      workingStyle: { planningBias: 'planning-first' },
      communication: { style: 'direct' },
      guardrails: { antiPatterns: ['skip verification'] },
      projectFit: { primaryStack: 'typescript' },
      flair: { tags: ['balanced'] },
      metadata: { version: 1, locale: 'en' }
    }, 'en')

    const combined = `${pack['SOUL.md']}\n${pack['AGENTS.md']}\n${pack['TOOLS.md']}`
    expect(combined).not.toMatch(/[🦞✨🎯🔥😄🚀]/u)
  })
})
