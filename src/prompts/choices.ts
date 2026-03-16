export interface ChoiceOption {
  value: string
  label: string
  labelKey: string
  recommended?: boolean
}

export const languageChoices: ChoiceOption[] = [
  { value: 'en', label: 'English', labelKey: 'choice.locale.en', recommended: true },
  { value: 'zh', label: '中文', labelKey: 'choice.locale.zh' },
  { value: 'es', label: 'Español', labelKey: 'choice.locale.es' },
  { value: 'fr', label: 'Français', labelKey: 'choice.locale.fr' },
  { value: 'ja', label: '日本語', labelKey: 'choice.locale.ja' }
]

export const creationModeChoices: ChoiceOption[] = [
  {
    value: 'project-recommended',
    label: 'Recommend from current project',
    labelKey: 'choice.creation_mode.project_recommended',
    recommended: true
  },
  {
    value: 'scratch',
    label: 'Start from scratch',
    labelKey: 'choice.creation_mode.scratch'
  },
  {
    value: 'quick-refine',
    label: 'Quick generate then refine',
    labelKey: 'choice.creation_mode.quick_refine'
  },
  {
    value: 'import-persona-json',
    label: 'Import existing persona.json',
    labelKey: 'choice.creation_mode.import_persona_json'
  },
  {
    value: 'upgrade-pack',
    label: 'Upgrade an existing persona pack',
    labelKey: 'choice.creation_mode.upgrade_pack'
  }
]

export const useCaseChoices: ChoiceOption[] = [
  { value: 'engineering', label: 'Engineering development', labelKey: 'choice.use_case.engineering' },
  { value: 'debugging', label: 'Debugging and repair', labelKey: 'choice.use_case.debugging' },
  { value: 'research', label: 'Research and analysis', labelKey: 'choice.use_case.research' },
  { value: 'product', label: 'Product and planning', labelKey: 'choice.use_case.product' },
  { value: 'writing', label: 'Writing and documentation', labelKey: 'choice.use_case.writing' },
  {
    value: 'general',
    label: 'General collaboration',
    labelKey: 'choice.use_case.general',
    recommended: true
  },
  { value: 'teaching', label: 'Teaching and coaching', labelKey: 'choice.use_case.teaching' }
]

export const capabilityChoices: ChoiceOption[] = [
  {
    value: 'engineering',
    label: 'Engineering execution',
    labelKey: 'choice.capability.engineering',
    recommended: true
  },
  { value: 'debugging', label: 'Debugging', labelKey: 'choice.capability.debugging' },
  { value: 'architecture', label: 'Architecture', labelKey: 'choice.capability.architecture' },
  { value: 'research', label: 'Research', labelKey: 'choice.capability.research' },
  { value: 'collaboration', label: 'Collaboration', labelKey: 'choice.capability.collaboration' },
  { value: 'decision', label: 'Decision making', labelKey: 'choice.capability.decision' },
  { value: 'writing', label: 'Writing', labelKey: 'choice.capability.writing' },
  { value: 'teaching', label: 'Teaching', labelKey: 'choice.capability.teaching' }
]

export const personalityChoices: ChoiceOption[] = [
  { value: 'balanced', label: 'Balanced and steady', labelKey: 'choice.personality.balanced', recommended: true },
  { value: 'calm', label: 'Calm and precise', labelKey: 'choice.personality.calm' },
  { value: 'energetic', label: 'Warm and energetic', labelKey: 'choice.personality.energetic' },
  { value: 'leading', label: 'Strong and leading', labelKey: 'choice.personality.leading' },
  { value: 'collaborative', label: 'Gentle and collaborative', labelKey: 'choice.personality.collaborative' },
  { value: 'distinctive', label: 'Highly distinctive', labelKey: 'choice.personality.distinctive' },
  { value: 'reflective', label: 'Reflective and analytical', labelKey: 'choice.personality.reflective' }
]

export const communicationChoices: ChoiceOption[] = [
  { value: 'direct', label: 'Concise and direct', labelKey: 'choice.communication.direct', recommended: true },
  { value: 'structured', label: 'Structured and clear', labelKey: 'choice.communication.structured' },
  { value: 'encouraging', label: 'Encouraging partner', labelKey: 'choice.communication.encouraging' },
  { value: 'reviewer', label: 'Rigorous reviewer', labelKey: 'choice.communication.reviewer' },
  { value: 'mentor', label: 'Mentor style', labelKey: 'choice.communication.mentor' },
  { value: 'advisor', label: 'Strategic advisor', labelKey: 'choice.communication.advisor' },
  { value: 'expert', label: 'Dense expert mode', labelKey: 'choice.communication.expert' }
]

export const workingStyleChoices: ChoiceOption[] = [
  { value: 'planning-first', label: 'Plan first', labelKey: 'choice.working_style.planning_first', recommended: true },
  { value: 'experiment-first', label: 'Experiment first', labelKey: 'choice.working_style.experiment_first' },
  { value: 'verification-heavy', label: 'Verification heavy', labelKey: 'choice.working_style.verification_heavy' },
  { value: 'iteration-heavy', label: 'Iteration heavy', labelKey: 'choice.working_style.iteration_heavy' },
  { value: 'high-ownership', label: 'High ownership', labelKey: 'choice.working_style.high_ownership' },
  { value: 'conservative', label: 'Conservative and safe', labelKey: 'choice.working_style.conservative' },
  { value: 'outcome-driven', label: 'Outcome driven', labelKey: 'choice.working_style.outcome_driven' }
]

export const riskBoundaryChoices: ChoiceOption[] = [
  { value: 'flag-risk', label: 'Proactively flag risk', labelKey: 'choice.risk.flag_risk', recommended: true },
  { value: 'confirm-high-risk', label: 'Confirm high-risk actions first', labelKey: 'choice.risk.confirm_high_risk' },
  { value: 'avoid-assumptions', label: 'Avoid assumptions by default', labelKey: 'choice.risk.avoid_assumptions' },
  { value: 'clarify-first', label: 'Clarify ambiguity first', labelKey: 'choice.risk.clarify_first' },
  { value: 'challenge-bad-premises', label: 'Challenge bad premises', labelKey: 'choice.risk.challenge_bad_premises' },
  { value: 'never-skip-verification', label: 'Never skip verification', labelKey: 'choice.risk.never_skip_verification' },
  { value: 'avoid-over-design', label: 'Avoid over-design', labelKey: 'choice.risk.avoid_over_design' }
]
