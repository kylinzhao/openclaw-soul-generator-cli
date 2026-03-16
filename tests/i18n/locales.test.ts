import { describe, expect, it } from 'vitest'

import { SUPPORTED_LOCALES, isSupportedLocale } from '../../src/i18n/locales'

describe('locale registry', () => {
  it('supports the five required locales', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'zh', 'es', 'fr', 'ja'])
  })

  it('recognizes valid locale codes', () => {
    expect(isSupportedLocale('zh')).toBe(true)
    expect(isSupportedLocale('de')).toBe(false)
  })
})
