import type { PersonaProfile } from '../types/persona'
import { renderAgents } from '../templates/agents'
import { renderSoul } from '../templates/soul'
import { renderTools } from '../templates/tools'

export function renderPersonaPack(profile: PersonaProfile): Record<string, string> {
  return {
    'SOUL.md': renderSoul(profile),
    'AGENTS.md': renderAgents(profile),
    'TOOLS.md': renderTools(profile),
    'persona.json': JSON.stringify(profile, null, 2)
  }
}
