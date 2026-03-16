import { describe, expect, it } from 'vitest'

import { wrapManagedBlock } from '../../src/templates/managed-blocks'

describe('managed blocks', () => {
  it('wraps content in stable managed markers', () => {
    const block = wrapManagedBlock('SOUL', 'hello')

    expect(block).toContain('BEGIN OPENCLAW-PERSONA:SOUL')
    expect(block).toContain('END OPENCLAW-PERSONA:SOUL')
  })
})
