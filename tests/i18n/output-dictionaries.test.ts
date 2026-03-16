import { describe, expect, it } from 'vitest'

import { enOutputMessages } from '../../src/i18n/output/en'
import { zhOutputMessages } from '../../src/i18n/output/zh'
import { esOutputMessages } from '../../src/i18n/output/es'
import { frOutputMessages } from '../../src/i18n/output/fr'
import { jaOutputMessages } from '../../src/i18n/output/ja'

const dictionaries = [enOutputMessages, zhOutputMessages, esOutputMessages, frOutputMessages, jaOutputMessages]

describe('output dictionaries', () => {
  it('share the same keys across languages', () => {
    const keys = Object.keys(enOutputMessages).sort()

    for (const dictionary of dictionaries) {
      expect(Object.keys(dictionary).sort()).toEqual(keys)
    }
  })
})
