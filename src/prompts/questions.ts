import {
  capabilityChoices,
  creationModeChoices,
  personalityChoices,
  useCaseChoices,
  type ChoiceOption
} from './choices'

export interface QuestionDefinition {
  id: string
  kind: 'select' | 'multiselect'
  message: string
  choices: ChoiceOption[]
}

export const QUESTION_DEFINITIONS: QuestionDefinition[] = [
  {
    id: 'creation-mode',
    kind: 'select',
    message: 'How should we start?',
    choices: creationModeChoices
  },
  {
    id: 'use-case',
    kind: 'select',
    message: 'What is this lobster mainly for?',
    choices: useCaseChoices
  },
  {
    id: 'capabilities',
    kind: 'multiselect',
    message: 'Which capabilities should be strongest?',
    choices: capabilityChoices
  },
  {
    id: 'personality',
    kind: 'select',
    message: 'Which personality spectrum fits best?',
    choices: personalityChoices
  },
  {
    id: 'communication',
    kind: 'select',
    message: 'How should it communicate?',
    choices: [{ value: 'direct', label: 'Direct', recommended: true }]
  },
  {
    id: 'working-style',
    kind: 'select',
    message: 'How should it work by default?',
    choices: [{ value: 'planning-first', label: 'Planning first', recommended: true }]
  }
]
