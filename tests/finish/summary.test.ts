import { describe, expect, it } from 'vitest'

import { renderFinishSummary } from '../../src/finish/summary'

describe('renderFinishSummary', () => {
  it('includes celebration copy, output path, and generated files', () => {
    const summary = renderFinishSummary({
      locale: 'zh',
      outputPath: '/tmp/demo',
      files: ['SOUL.md', 'AGENTS.md', 'TOOLS.md', 'persona.json']
    })

    expect(summary).toContain('/tmp/demo')
    expect(summary).toContain('SOUL.md')
    expect(summary).toContain('AGENTS.md')
  })
})
