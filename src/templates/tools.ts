import type { OutputMessages } from '../i18n/types'
import type { PersonaProfile } from '../types/persona'
import { wrapManagedBlock } from './managed-blocks'
import { renderSection } from './sections'

export function renderTools(profile: PersonaProfile, messages: OutputMessages): string {
  return wrapManagedBlock(
    'TOOLS',
    [
      `# ${messages.toolsTitle}`,
      renderSection(messages.verificationRules, messages.verificationSentence),
      renderSection(messages.projectAffinity, messages.projectAffinitySentence(profile.projectFit.primaryStack))
    ].join('\n\n')
  )
}
