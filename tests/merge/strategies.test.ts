import { describe, expect, it } from 'vitest'

import { mergePersonaContent } from '../../src/merge/strategies'

describe('mergePersonaContent', () => {
  it('keeps existing content when strategy is keep', () => {
    expect(mergePersonaContent('old', 'new', 'keep')).toBe('old')
  })

  it('overwrites content when strategy is overwrite', () => {
    expect(mergePersonaContent('old', 'new', 'overwrite')).toBe('new')
  })

  it('prefers generated content for managed blocks during smart merge', () => {
    const existing = '<!-- BEGIN OPENCLAW-PERSONA:SOUL -->old<!-- END OPENCLAW-PERSONA:SOUL -->\n\ncustom'
    const generated = '<!-- BEGIN OPENCLAW-PERSONA:SOUL -->new<!-- END OPENCLAW-PERSONA:SOUL -->'

    expect(mergePersonaContent(existing, generated, 'smart-merge')).toContain('new')
    expect(mergePersonaContent(existing, generated, 'smart-merge')).toContain('custom')
  })
})
