import { describe, expect, it } from 'vitest'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

import { runCli } from '../../src/cli'

describe('CLI smoke test', () => {
  it('returns success for help mode', async () => {
    const result = await runCli(['--help'])

    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('OpenClaw Oh My Soul')
    expect(result.output).toContain('openclaw-oh-my-soul')
    expect(result.output).toContain('Usage')
  })

  it('prints help when executed as a script', () => {
    const scriptPath = path.resolve('src/cli.ts')
    const result = spawnSync('node', ['--import', 'tsx', scriptPath, '--help'], {
      encoding: 'utf8',
      cwd: process.cwd()
    })

    expect(result.status).toBe(0)
    expect(result.stdout).toContain('OpenClaw Oh My Soul')
    expect(result.stdout).toContain('openclaw-oh-my-soul')
  })
})
