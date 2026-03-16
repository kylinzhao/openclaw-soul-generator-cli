import type { ProjectSignals } from '../types/project-signals'

export function buildProjectFit(projectSignals: ProjectSignals): { primaryStack: string } {
  return {
    primaryStack: projectSignals.primaryStack
  }
}
