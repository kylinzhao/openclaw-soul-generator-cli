import { personaAnswersSchema, type PersonaAnswers } from '../types/answers'

export interface PromptAdapter {
  select(id: string): Promise<string>
  multiselect(id: string): Promise<string[]>
}

export async function runPromptFlow(adapter: PromptAdapter): Promise<PersonaAnswers> {
  const selectedLocale = await adapter.select('language')
  const creationMode = await adapter.select('creation-mode')
  const targetUseCases = await adapter.multiselect('use-case')
  const capabilityEmphasis = await adapter.multiselect('capabilities')
  const personalityPreset = await adapter.select('personality')
  const communicationStyle = await adapter.select('communication')
  const workingStyle = await adapter.select('working-style')
  const riskBoundaries = await adapter.multiselect('risk-boundaries')

  return personaAnswersSchema.parse({
    selectedLocale,
    creationMode,
    targetUseCases,
    capabilityEmphasis,
    personalityPreset,
    communicationStyle,
    workingStyle,
    riskBoundaries
  })
}
