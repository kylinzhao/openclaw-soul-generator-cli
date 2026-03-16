import { z } from 'zod'

export const creationModeSchema = z.enum([
  'scratch',
  'project-recommended',
  'quick-refine'
])

export const personaAnswersSchema = z.object({
  creationMode: creationModeSchema.default('scratch'),
  targetUseCase: z.string().default('general'),
  capabilityEmphasis: z.array(z.string()).default([]),
  personalityPreset: z.string().default('balanced')
})

export type CreationMode = z.infer<typeof creationModeSchema>
export type PersonaAnswers = z.infer<typeof personaAnswersSchema>
