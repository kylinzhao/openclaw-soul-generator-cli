import fs from 'node:fs/promises'
import path from 'node:path'

import type { LocaleCode } from '../i18n'
import { createWorkspaceBackup } from './backup'
import { MANAGED_PERSONA_FILES } from './manifest'

export interface ApplyPersonaPackToWorkspaceInput {
  workspacePath: string
  outputPath: string
  locale: LocaleCode
  files: Record<string, string>
}

export interface ApplyPersonaPackToWorkspaceResult {
  workspacePath: string
  backupPath: string
  appliedFiles: string[]
}

export async function applyPersonaPackToWorkspace(
  input: ApplyPersonaPackToWorkspaceInput
): Promise<ApplyPersonaPackToWorkspaceResult> {
  await fs.mkdir(input.workspacePath, { recursive: true })

  const backup = await createWorkspaceBackup({
    workspacePath: input.workspacePath,
    outputPath: input.outputPath,
    locale: input.locale,
    managedFiles: [...MANAGED_PERSONA_FILES]
  })

  const appliedFiles: string[] = []

  for (const fileName of MANAGED_PERSONA_FILES) {
    const content = input.files[fileName]

    if (!content) {
      continue
    }

    await fs.writeFile(path.join(input.workspacePath, fileName), content, 'utf8')
    appliedFiles.push(fileName)
  }

  return {
    workspacePath: input.workspacePath,
    backupPath: backup.backupPath,
    appliedFiles
  }
}
