import fs from 'node:fs/promises'
import path from 'node:path'

export interface ManifestSignals {
  primaryStack: string
  hasTests: boolean
  manifestType: 'package.json' | 'pyproject.toml' | 'unknown'
}

export async function readManifestSignals(cwd: string): Promise<ManifestSignals> {
  const packageJsonPath = path.join(cwd, 'package.json')
  const pyprojectPath = path.join(cwd, 'pyproject.toml')

  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8')) as {
      devDependencies?: Record<string, string>
      dependencies?: Record<string, string>
      scripts?: Record<string, string>
    }

    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    }

    return {
      primaryStack: deps.typescript ? 'typescript' : 'javascript',
      hasTests: Boolean(packageJson.scripts?.test || deps.vitest || deps.jest),
      manifestType: 'package.json'
    }
  } catch {}

  try {
    const pyproject = await fs.readFile(pyprojectPath, 'utf8')

    return {
      primaryStack: 'python',
      hasTests: pyproject.includes('pytest'),
      manifestType: 'pyproject.toml'
    }
  } catch {}

  return {
    primaryStack: 'unknown',
    hasTests: false,
    manifestType: 'unknown'
  }
}
