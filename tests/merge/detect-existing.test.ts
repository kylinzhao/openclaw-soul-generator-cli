import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { detectExistingPersonaFiles } from '../../src/merge/detect-existing'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('detectExistingPersonaFiles', () => {
  it('finds existing persona files in a directory', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-pack-'))
    tempDirs.push(dir)

    await fs.writeFile(path.join(dir, 'SOUL.md'), '# existing')
    await fs.writeFile(path.join(dir, 'AGENTS.md'), '# existing')

    const found = await detectExistingPersonaFiles(dir)

    expect(found).toEqual(['AGENTS.md', 'SOUL.md'])
  })
})
