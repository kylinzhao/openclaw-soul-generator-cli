import { z } from 'zod'

const boundedScore = z.number().int().min(0).max(100)

export const personaProfileSchema = z.object({
  identity: z.object({
    codename: z.string().min(1),
    role: z.string().min(1)
  }),
  personality: z.object({
    restraint: boundedScore,
    warmth: boundedScore,
    sharpness: boundedScore,
    initiative: boundedScore,
    humor: boundedScore,
    patience: boundedScore
  }),
  capabilities: z.record(z.string(), boundedScore),
  workingStyle: z.object({
    planningBias: z.enum(['planning-first', 'balanced', 'experiment-first'])
  }),
  communication: z.object({
    style: z.string().min(1)
  }),
  guardrails: z.object({
    antiPatterns: z.array(z.string())
  }),
  projectFit: z.object({
    primaryStack: z.string().min(1)
  }),
  flair: z.object({
    tags: z.array(z.string())
  }),
  metadata: z.object({
    version: z.number().int().positive()
  })
})

export type PersonaProfile = z.infer<typeof personaProfileSchema>
