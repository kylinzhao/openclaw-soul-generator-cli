import { describe, expect, it } from 'vitest'

import { createSeededRandom } from '../../src/utils/random'
import { ensureAbsolutePath } from '../../src/utils/paths'

describe('shared utilities', () => {
  it('creates deterministic random sequences', () => {
    const first = createSeededRandom(42)
    const second = createSeededRandom(42)

    expect(first()).toBe(second())
    expect(first()).toBe(second())
  })

  it('normalizes a relative path against cwd', () => {
    const result = ensureAbsolutePath('/tmp/workspace', './nested/file.md')

    expect(result).toBe('/tmp/workspace/nested/file.md')
  })
})
