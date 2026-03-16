import {
  capabilityChoices,
  communicationChoices,
  creationModeChoices,
  languageChoices,
  personalityChoices,
  riskBoundaryChoices,
  useCaseChoices,
  workingStyleChoices,
  type ChoiceOption
} from './choices'

export interface QuestionDefinition {
  id: string
  kind: 'select' | 'multiselect'
  messageKey: string
  message: string
  choices: ChoiceOption[]
}

export const QUESTION_DEFINITIONS: QuestionDefinition[] = [
  {
    id: 'language',
    kind: 'select',
    messageKey: 'question.language',
    message: 'Choose your language',
    choices: languageChoices
  },
  {
    id: 'creation-mode',
    kind: 'select',
    messageKey: 'question.creation_mode',
    message: 'How should we start?',
    choices: creationModeChoices
  },
  {
    id: 'use-case',
    kind: 'multiselect',
    messageKey: 'question.use_case',
    message: 'What is this lobster mainly for?',
    choices: useCaseChoices
  },
  {
    id: 'capabilities',
    kind: 'multiselect',
    messageKey: 'question.capabilities',
    message: 'Which capabilities should be strongest?',
    choices: capabilityChoices
  },
  {
    id: 'personality',
    kind: 'select',
    messageKey: 'question.personality',
    message: 'Which personality spectrum fits best?',
    choices: personalityChoices
  },
  {
    id: 'communication',
    kind: 'select',
    messageKey: 'question.communication',
    message: 'How should it communicate?',
    choices: communicationChoices
  },
  {
    id: 'working-style',
    kind: 'select',
    messageKey: 'question.working_style',
    message: 'How should it work by default?',
    choices: workingStyleChoices
  },
  {
    id: 'risk-boundaries',
    kind: 'multiselect',
    messageKey: 'question.risk_boundaries',
    message: 'Which guardrails matter most?',
    choices: riskBoundaryChoices
  }
]
