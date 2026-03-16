import type { PersonaAnswers } from '../types/answers'
import { personaProfileSchema, type PersonaProfile } from '../types/persona'
import type { ProjectSignals } from '../types/project-signals'
import { selectArchetype } from './archetypes'
import { expandCapabilityBundle } from './capability-bundles'
import { ensureGuardrails } from './consistency'
import { SPECTRUM_PRESETS } from './personality-spectrums'
import { buildProjectFit } from './project-fit'

export function buildPersonaProfile(
  answers: PersonaAnswers,
  projectSignals: ProjectSignals
): PersonaProfile {
  const archetype = selectArchetype({
    targetUseCases: answers.targetUseCases,
    capabilityEmphasis: answers.capabilityEmphasis
  })

  const personality = SPECTRUM_PRESETS[answers.personalityPreset] ?? SPECTRUM_PRESETS.balanced
  const capabilities = expandCapabilityBundle(answers.capabilityEmphasis)

  return personaProfileSchema.parse({
    identity: {
      codename: archetype.label,
      role: archetype.id
    },
    personality,
    capabilities,
    workingStyle: {
      planningBias:
        answers.workingStyle === 'experiment-first'
          ? 'experiment-first'
          : answers.workingStyle === 'planning-first'
            ? 'planning-first'
            : 'balanced'
    },
    communication: {
      style: answers.communicationStyle || archetype.defaultStyle
    },
    guardrails: {
      antiPatterns: ensureGuardrails(answers.riskBoundaries)
    },
    projectFit: buildProjectFit(projectSignals),
    flair: {
      tags: [answers.personalityPreset, projectSignals.projectType, ...answers.targetUseCases]
    },
    metadata: {
      version: 1,
      locale: answers.selectedLocale
    }
  })
}
