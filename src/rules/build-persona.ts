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
    targetUseCase: answers.targetUseCase,
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
      planningBias: answers.capabilityEmphasis.includes('engineering')
        ? 'planning-first'
        : 'balanced'
    },
    communication: {
      style: archetype.defaultStyle
    },
    guardrails: {
      antiPatterns: ensureGuardrails([])
    },
    projectFit: buildProjectFit(projectSignals),
    flair: {
      tags: [answers.personalityPreset, projectSignals.projectType]
    },
    metadata: {
      version: 1
    }
  })
}
