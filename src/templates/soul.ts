import type { PersonaProfile } from '../types/persona'
import { wrapManagedBlock } from './managed-blocks'
import { renderSection } from './sections'

export function renderSoul(profile: PersonaProfile): string {
  return wrapManagedBlock(
    'SOUL',
    [
      '# SOUL',
      renderSection('Core Identity', `${profile.identity.codename} is a ${profile.identity.role}.`),
      renderSection(
        'Personality Profile',
        `Restraint ${profile.personality.restraint}, warmth ${profile.personality.warmth}, initiative ${profile.personality.initiative}.`
      ),
      renderSection(
        'Primary Capabilities',
        Object.entries(profile.capabilities)
          .map(([key, value]) => `- ${key}: ${value}`)
          .join('\n')
      )
    ].join('\n\n')
  )
}
