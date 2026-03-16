import { z } from 'zod'

export const projectSignalsSchema = z.object({
  primaryStack: z.string().default('unknown'),
  projectType: z.string().default('unknown'),
  hasTests: z.boolean().default(false),
  maturity: z.enum(['unknown', 'early', 'established']).default('unknown')
})

export type ProjectSignals = z.infer<typeof projectSignalsSchema>
