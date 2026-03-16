import { z } from 'zod'
import { SUPPORTED_LOCALES } from '../i18n/locales'

export const creationModeSchema = z.enum([
  'scratch',
  'project-recommended',
  'quick-refine',
  'import-persona-json',
  'upgrade-pack'
])

export const personaAnswersSchema = z.object({
  selectedLocale: z.enum(SUPPORTED_LOCALES as ['en', 'zh', 'es', 'fr', 'ja']).default('en'),
  creationMode: creationModeSchema.default('scratch'),
  targetUseCase: z.string().default('general'),
  capabilityEmphasis: z.array(z.string()).default([]),
  personalityPreset: z.string().default('balanced'),
  communicationStyle: z.string().default('direct'),
  workingStyle: z.string().default('planning-first'),
  riskBoundaries: z.array(z.string()).default([])
})

export type CreationMode = z.infer<typeof creationModeSchema>
export type PersonaAnswers = z.infer<typeof personaAnswersSchema>
