import { describe, expect, it } from 'vitest'

import { enCliMessages } from '../../src/i18n/cli/en'
import { zhCliMessages } from '../../src/i18n/cli/zh'
import { esCliMessages } from '../../src/i18n/cli/es'
import { frCliMessages } from '../../src/i18n/cli/fr'
import { jaCliMessages } from '../../src/i18n/cli/ja'

const dictionaries = [enCliMessages, zhCliMessages, esCliMessages, frCliMessages, jaCliMessages]

describe('CLI dictionaries', () => {
  it('share the same keys across languages', () => {
    const keys = Object.keys(enCliMessages).sort()

    for (const dictionary of dictionaries) {
      expect(Object.keys(dictionary).sort()).toEqual(keys)
    }
  })
})
