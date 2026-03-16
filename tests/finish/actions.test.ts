import { describe, expect, it } from 'vitest'

import { FINISH_ACTIONS } from '../../src/finish/actions'

describe('finish actions', () => {
  it('includes keep, apply, and restore actions', () => {
    expect(FINISH_ACTIONS.map((item) => item.value)).toEqual([
      'keep-output',
      'apply-to-openclaw',
      'restore-latest-backup'
    ])
  })
})
