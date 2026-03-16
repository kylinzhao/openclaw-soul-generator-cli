import { projectSignalsSchema, type ProjectSignals } from '../types/project-signals'
import { readManifestSignals } from './manifests'
import { readReadme } from './readme'
import { inferMaturity, inferProjectType } from './signals'

export async function detectProjectSignals(cwd: string): Promise<ProjectSignals> {
  const manifest = await readManifestSignals(cwd)
  const readme = await readReadme(cwd)

  return projectSignalsSchema.parse({
    primaryStack: manifest.primaryStack,
    projectType: inferProjectType(readme, manifest),
    hasTests: manifest.hasTests,
    maturity: inferMaturity(manifest, readme)
  })
}
