export interface FinishAction {
  value: 'keep-output' | 'apply-to-openclaw' | 'restore-latest-backup'
}

export const FINISH_ACTIONS: FinishAction[] = [
  { value: 'keep-output' },
  { value: 'apply-to-openclaw' },
  { value: 'restore-latest-backup' }
]
