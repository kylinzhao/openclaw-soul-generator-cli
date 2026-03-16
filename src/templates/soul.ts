import type { OutputMessages } from '../i18n/types'
import type { PersonaProfile } from '../types/persona'
import { wrapManagedBlock } from './managed-blocks'
import { renderSection } from './sections'

export function renderSoul(profile: PersonaProfile, messages: OutputMessages): string {
  return wrapManagedBlock(
    'SOUL',
    [
      `# ${messages.soulTitle}`,
      renderSection(messages.coreIdentity, messages.identitySentence(profile.identity.codename, profile.identity.role)),
      renderSection(
        messages.personalityProfile,
        messages.personalitySentence(
          profile.personality.restraint,
          profile.personality.warmth,
          profile.personality.initiative
        )
      ),
      renderSection(
        messages.primaryCapabilities,
        Object.entries(profile.capabilities)
          .map(([key, value]) => `- ${messages.capabilityLabels[key] ?? key}: ${value}`)
          .join('\n')
      )
    ].join('\n\n')
  )
}
