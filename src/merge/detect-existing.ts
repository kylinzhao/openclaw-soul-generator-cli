import fs from 'node:fs/promises'
import path from 'node:path'

import { PERSONA_FILE_NAMES } from '../utils/constants'

export async function detectExistingPersonaFiles(cwd: string): Promise<string[]> {
  const found: string[] = []

  await Promise.all(
    PERSONA_FILE_NAMES.map(async (fileName) => {
      try {
        await fs.access(path.join(cwd, fileName))
        found.push(fileName)
      } catch {}
    })
  )

  return found.sort()
}
