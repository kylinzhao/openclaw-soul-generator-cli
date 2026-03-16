import type { LocaleCode } from '../i18n'
import { getOutputMessages } from '../i18n/output'
import type { PersonaProfile } from '../types/persona'
import { renderAgents } from '../templates/agents'
import { renderSoul } from '../templates/soul'
import { renderTools } from '../templates/tools'

export function renderPersonaPack(profile: PersonaProfile, locale: LocaleCode = profile.metadata.locale): Record<string, string> {
  const messages = getOutputMessages(locale)

  return {
    'SOUL.md': renderSoul(profile, messages),
    'AGENTS.md': renderAgents(profile, messages),
    'TOOLS.md': renderTools(profile, messages),
    'persona.json': JSON.stringify(profile, null, 2)
  }
}
