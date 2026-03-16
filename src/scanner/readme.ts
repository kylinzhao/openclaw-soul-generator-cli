import fs from 'node:fs/promises'
import path from 'node:path'

export async function readReadme(cwd: string): Promise<string> {
  const candidates = ['README.md', 'README']

  for (const candidate of candidates) {
    try {
      return await fs.readFile(path.join(cwd, candidate), 'utf8')
    } catch {}
  }

  return ''
}
