import type { LocaleCode } from '../i18n'
import { getCliMessages } from '../i18n/cli'

export interface FinishSummaryInput {
  locale: LocaleCode
  outputPath: string
  files: string[]
}

export function renderFinishSummary(input: FinishSummaryInput): string {
  const messages = getCliMessages(input.locale)

  return [
    messages.finishCelebrate,
    `${messages.finishOutputPathLabel} ${input.outputPath}`,
    `${messages.finishFilesLabel}`,
    ...input.files.map((file) => `- ${file}`)
  ].join('\n')
}
