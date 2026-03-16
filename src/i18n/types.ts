export type LocaleCode = 'en' | 'zh' | 'es' | 'fr' | 'ja'

export interface CliMessages {
  languagePrompt: string
  helpTitle: string
  helpUsage: string
  mergePrompt: (fileName: string) => string
  mergeSmart: string
  mergeOverwrite: string
  mergeKeep: string
  successNoteTitle: string
  successNoteBody: (cwd: string) => string
  finishCelebrate: string
  finishOutputPathLabel: string
  finishFilesLabel: string
  finishActionPrompt: string
  finishActionKeep: string
  finishActionApply: string
  finishActionRestore: string
  workspacePathLabel: string
  workspaceFilesLabel: string
  applyConfirmPrompt: (workspacePath: string) => string
  restoreConfirmPrompt: (workspacePath: string) => string
  applySuccessBody: (workspacePath: string, backupPath: string) => string
  restoreSuccessBody: (workspacePath: string, backupPath: string) => string
  restoreMissingBody: (workspacePath: string) => string
  questions: Record<string, string>
  choices: Record<string, string>
  localeNames: Record<LocaleCode, string>
}

export interface OutputMessages {
  soulTitle: string
  agentsTitle: string
  toolsTitle: string
  coreIdentity: string
  personalityProfile: string
  primaryCapabilities: string
  planningAndExecution: string
  decisionRules: string
  antiPatterns: string
  verificationRules: string
  projectAffinity: string
  identitySentence: (codename: string, role: string) => string
  personalitySentence: (restraint: number, warmth: number, initiative: number) => string
  planningSentence: (planningBias: string) => string
  communicationSentence: (style: string) => string
  verificationSentence: string
  projectAffinitySentence: (primaryStack: string) => string
  capabilityLabels: Record<string, string>
  communicationLabels: Record<string, string>
  planningLabels: Record<string, string>
  antiPatternLabels: Record<string, string>
}
