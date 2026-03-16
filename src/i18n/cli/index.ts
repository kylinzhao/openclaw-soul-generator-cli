import type { LocaleCode, CliMessages } from '../types'
import { enCliMessages } from './en'
import { esCliMessages } from './es'
import { frCliMessages } from './fr'
import { jaCliMessages } from './ja'
import { zhCliMessages } from './zh'

const CLI_DICTIONARIES: Record<LocaleCode, CliMessages> = {
  en: enCliMessages,
  zh: zhCliMessages,
  es: esCliMessages,
  fr: frCliMessages,
  ja: jaCliMessages
}

export function getCliMessages(locale: LocaleCode): CliMessages {
  return CLI_DICTIONARIES[locale]
}
