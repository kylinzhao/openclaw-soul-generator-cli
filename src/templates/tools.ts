import type { PersonaProfile } from '../types/persona'
import { wrapManagedBlock } from './managed-blocks'
import { renderSection } from './sections'

export function renderTools(profile: PersonaProfile): string {
  return wrapManagedBlock(
    'TOOLS',
    [
      '# TOOLS',
      renderSection('Verification Rules', 'Always verify meaningful changes before claiming completion.'),
      renderSection('Project Affinity', `Primary stack: ${profile.projectFit.primaryStack}.`)
    ].join('\n\n')
  )
}
