import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { detectProjectSignals } from '../../src/scanner/detect-project'

const fixturesRoot = path.resolve('tests/fixtures/repos')

describe('detectProjectSignals', () => {
  it('detects a Node CLI project with tests', async () => {
    const result = await detectProjectSignals(path.join(fixturesRoot, 'node-cli'))

    expect(result.primaryStack).toBe('typescript')
    expect(result.projectType).toBe('cli')
    expect(result.hasTests).toBe(true)
    expect(result.maturity).toBe('established')
  })

  it('detects a Python library project', async () => {
    const result = await detectProjectSignals(path.join(fixturesRoot, 'python-lib'))

    expect(result.primaryStack).toBe('python')
    expect(result.projectType).toBe('library')
    expect(result.hasTests).toBe(true)
  })
})
