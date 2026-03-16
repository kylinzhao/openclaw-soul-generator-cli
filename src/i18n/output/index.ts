import type { LocaleCode, OutputMessages } from '../types'
import { enOutputMessages } from './en'
import { esOutputMessages } from './es'
import { frOutputMessages } from './fr'
import { jaOutputMessages } from './ja'
import { zhOutputMessages } from './zh'

const OUTPUT_DICTIONARIES: Record<LocaleCode, OutputMessages> = {
  en: enOutputMessages,
  zh: zhOutputMessages,
  es: esOutputMessages,
  fr: frOutputMessages,
  ja: jaOutputMessages
}

export function getOutputMessages(locale: LocaleCode): OutputMessages {
  return OUTPUT_DICTIONARIES[locale]
}
