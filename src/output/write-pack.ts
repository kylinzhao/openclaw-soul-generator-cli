import fs from 'node:fs/promises'
import path from 'node:path'

export async function writePersonaPack(
  cwd: string,
  files: Record<string, string>
): Promise<void> {
  await fs.mkdir(cwd, { recursive: true })

  await Promise.all(
    Object.entries(files).map(async ([fileName, content]) => {
      await fs.writeFile(path.join(cwd, fileName), content, 'utf8')
    })
  )
}
