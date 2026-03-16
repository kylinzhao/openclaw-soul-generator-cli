import type { ManifestSignals } from './manifests'

export function inferProjectType(readme: string, manifest: ManifestSignals): string {
  const text = readme.toLowerCase()

  if (text.includes('command line') || text.includes('cli')) {
    return 'cli'
  }

  if (manifest.manifestType === 'pyproject.toml' || text.includes('library')) {
    return 'library'
  }

  return 'application'
}

export function inferMaturity(manifest: ManifestSignals, readme: string): 'unknown' | 'early' | 'established' {
  if (manifest.hasTests && readme.trim().length > 0) {
    return 'established'
  }

  if (readme.trim().length > 0) {
    return 'early'
  }

  return 'unknown'
}
