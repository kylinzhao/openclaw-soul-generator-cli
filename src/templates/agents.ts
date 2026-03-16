import type { OutputMessages } from '../i18n/types'
import type { PersonaProfile } from '../types/persona'
import { wrapManagedBlock } from './managed-blocks'
import { renderSection } from './sections'

export function renderAgents(profile: PersonaProfile, messages: OutputMessages): string {
  return wrapManagedBlock(
    'AGENTS',
    [
      `# ${messages.agentsTitle}`,
      renderSection(
        messages.planningAndExecution,
        messages.planningSentence(messages.planningLabels[profile.workingStyle.planningBias] ?? profile.workingStyle.planningBias)
      ),
      renderSection(
        messages.decisionRules,
        messages.communicationSentence(
          messages.communicationLabels[profile.communication.style] ?? profile.communication.style
        )
      ),
      renderSection(
        messages.antiPatterns,
        profile.guardrails.antiPatterns
          .map((item) => `- ${messages.antiPatternLabels[item] ?? item}`)
          .join('\n')
      )
    ].join('\n\n')
  )
}
