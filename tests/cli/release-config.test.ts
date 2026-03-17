import { readFileSync, statSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const packageJsonPath = path.resolve('package.json')
const binPath = path.resolve('bin/openclaw-oh-my-soul')

describe('release config', () => {
  it('publishes the package for direct npx use', () => {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
      name?: string
      private?: boolean
      bin?: Record<string, string>
      files?: string[]
      scripts?: Record<string, string>
      engines?: Record<string, string>
    }

    expect(packageJson.name).toBe('openclaw-oh-my-soul')
    expect(packageJson.private).not.toBe(true)
    expect(packageJson.bin).toEqual({
      'openclaw-oh-my-soul': './bin/openclaw-oh-my-soul'
    })
    expect(packageJson.files).toEqual(['bin', 'dist', 'README.md'])
    expect(packageJson.engines?.node).toBe('>=18')
    expect(packageJson.scripts?.prepublishOnly).toBe('npm run lint && npm test && npm run build')
  })

  it('ships the expected executable entrypoint file', () => {
    const binFile = readFileSync(binPath, 'utf8')
    const binStat = statSync(binPath)

    expect(binFile).toContain('#!/usr/bin/env node')
    expect(binFile).toContain("import('../dist/cli.js')")
    expect(binFile).toContain('runCli(process.argv.slice(2))')
    expect(binStat.mode & 0o111).not.toBe(0)
  })
})
