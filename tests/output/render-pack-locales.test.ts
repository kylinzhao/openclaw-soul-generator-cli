import { describe, expect, it } from 'vitest'

import { renderPersonaPack } from '../../src/output/render-pack'

const profile = {
  identity: { codename: 'Harbor Claw', role: 'engineering-commander' },
  personality: { restraint: 70, warmth: 45, sharpness: 80, initiative: 78, humor: 20, patience: 65 },
  capabilities: { engineeringExecution: 92, debugging: 82, verification: 80 },
  workingStyle: { planningBias: 'planning-first' as const },
  communication: { style: 'direct' },
  guardrails: { antiPatterns: ['skip verification', 'bluff certainty'] },
  projectFit: { primaryStack: 'typescript' },
  flair: { tags: ['balanced', 'cli'] },
  metadata: { version: 1, locale: 'en' as const }
}

describe('localized persona pack rendering', () => {
  it('renders Chinese headings in zh mode', () => {
    const pack = renderPersonaPack({ ...profile, metadata: { version: 1, locale: 'zh' } }, 'zh')
    expect(pack['SOUL.md']).toContain('核心身份')
  })

  it('renders Japanese headings in ja mode', () => {
    const pack = renderPersonaPack({ ...profile, metadata: { version: 1, locale: 'ja' } }, 'ja')
    expect(pack['AGENTS.md']).toContain('計画と実行')
  })
})
