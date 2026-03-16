import type { LocaleCode } from './types'

export const SUPPORTED_LOCALES: LocaleCode[] = ['en', 'zh', 'es', 'fr', 'ja']

export function isSupportedLocale(value: string): value is LocaleCode {
  return SUPPORTED_LOCALES.includes(value as LocaleCode)
}
