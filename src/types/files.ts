import { z } from 'zod'

export const personaFileNameSchema = z.enum([
  'SOUL.md',
  'AGENTS.md',
  'TOOLS.md',
  'IDENTITY.md',
  'USER.md',
  'BOOTSTRAP.md',
  'persona.json'
])

export const personaPackFilesSchema = z.object({
  soul: z.string(),
  agents: z.string(),
  tools: z.string(),
  personaJson: z.string()
})

export type PersonaFileName = z.infer<typeof personaFileNameSchema>
export type PersonaPackFiles = z.infer<typeof personaPackFilesSchema>
