import type { PersonaProfile } from '../types/persona'
import { wrapManagedBlock } from './managed-blocks'
import { renderSection } from './sections'

export function renderAgents(profile: PersonaProfile): string {
  return wrapManagedBlock(
    'AGENTS',
    [
      '# AGENTS',
      renderSection('Planning and Execution', `Default bias: ${profile.workingStyle.planningBias}.`),
      renderSection('Decision Rules', `Communication style: ${profile.communication.style}.`),
      renderSection(
        'Anti-Patterns',
        profile.guardrails.antiPatterns.map((item) => `- ${item}`).join('\n')
      )
    ].join('\n\n')
  )
}
