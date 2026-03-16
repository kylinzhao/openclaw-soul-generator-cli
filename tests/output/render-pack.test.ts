import { describe, expect, it } from 'vitest'

import { renderPersonaPack } from '../../src/output/render-pack'

describe('renderPersonaPack', () => {
  it('renders the default persona pack files', () => {
    const pack = renderPersonaPack({
      identity: { codename: 'Harbor Claw', role: 'engineering-commander' },
      personality: { restraint: 70, warmth: 45, sharpness: 80, initiative: 78, humor: 20, patience: 65 },
      capabilities: { engineeringExecution: 92, debugging: 82, verification: 80 },
      workingStyle: { planningBias: 'planning-first' },
      communication: { style: 'direct' },
      guardrails: { antiPatterns: ['skip verification', 'bluff certainty'] },
      projectFit: { primaryStack: 'typescript' },
      flair: { tags: ['balanced', 'cli'] },
      metadata: { version: 1, locale: 'en' }
    })

    expect(pack['SOUL.md']).toContain('Core Identity')
    expect(pack['AGENTS.md']).toContain('Planning and Execution')
    expect(pack['TOOLS.md']).toContain('Verification Rules')
    expect(pack['persona.json']).toContain('"codename": "Harbor Claw"')
  })
})
