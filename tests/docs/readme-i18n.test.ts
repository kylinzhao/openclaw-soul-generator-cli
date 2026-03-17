import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const readmePath = path.resolve('README.md')
const packageJsonPath = path.resolve('package.json')

describe('README i18n release contract', () => {
  it('bumps the package to the next patch release', () => {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as { version?: string }

    expect(packageJson.version).toBe('0.1.1')
  })

  it('links to all localized README files from the primary README', () => {
    const readme = readFileSync(readmePath, 'utf8')

    expect(readme).toContain('[English](./README.md)')
    expect(readme).toContain('[简体中文](./README.zh-CN.md)')
    expect(readme).toContain('[Español](./README.es.md)')
    expect(readme).toContain('[Français](./README.fr.md)')
    expect(readme).toContain('[日本語](./README.ja.md)')
    expect(readme).toContain('npx openclaw-oh-my-soul')
    expect(readme).toContain('lobster')
  })
})
