import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writePersonaPack } from '../../src/output/write-pack'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

describe('writePersonaPack', () => {
  it('writes the generated pack to disk', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-pack-write-'))
    tempDirs.push(dir)

    await writePersonaPack(dir, {
      'SOUL.md': 'soul',
      'AGENTS.md': 'agents',
      'TOOLS.md': 'tools',
      'persona.json': '{}'
    })

    expect(await fs.readFile(path.join(dir, 'SOUL.md'), 'utf8')).toBe('soul')
  })
})
