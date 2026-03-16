export interface ChoiceOption {
  value: string
  label: string
  recommended?: boolean
}

export const creationModeChoices: ChoiceOption[] = [
  { value: 'project-recommended', label: 'Recommend from current project', recommended: true },
  { value: 'scratch', label: 'Start from scratch' },
  { value: 'quick-refine', label: 'Quick generate then refine' }
]

export const useCaseChoices: ChoiceOption[] = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'research', label: 'Research' },
  { value: 'general', label: 'Generalist', recommended: true }
]

export const capabilityChoices: ChoiceOption[] = [
  { value: 'engineering', label: 'Engineering execution', recommended: true },
  { value: 'research', label: 'Research depth' },
  { value: 'collaboration', label: 'Collaboration' }
]

export const personalityChoices: ChoiceOption[] = [
  { value: 'balanced', label: 'Balanced', recommended: true },
  { value: 'expressive', label: 'Expressive' },
  { value: 'calm', label: 'Calm' }
]
