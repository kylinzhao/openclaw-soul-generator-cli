import { personaAnswersSchema, type PersonaAnswers } from '../types/answers'

export interface PromptAdapter {
  select(id: string): Promise<string>
  multiselect(id: string): Promise<string[]>
}

export async function runPromptFlow(adapter: PromptAdapter): Promise<PersonaAnswers> {
  const creationMode = await adapter.select('creation-mode')
  const targetUseCase = await adapter.select('use-case')
  const capabilityEmphasis = await adapter.multiselect('capabilities')
  const personalityPreset = await adapter.select('personality')

  return personaAnswersSchema.parse({
    creationMode,
    targetUseCase,
    capabilityEmphasis,
    personalityPreset
  })
}
