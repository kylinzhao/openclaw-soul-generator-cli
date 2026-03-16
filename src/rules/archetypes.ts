export interface ArchetypeInput {
  targetUseCases: string[]
  capabilityEmphasis: string[]
}

export interface PersonaArchetype {
  id: string
  label: string
  defaultStyle: 'direct' | 'structured' | 'mentor'
}

const ARCHETYPES: PersonaArchetype[] = [
  {
    id: 'engineering-commander',
    label: 'Engineering Commander',
    defaultStyle: 'direct'
  },
  {
    id: 'research-strategist',
    label: 'Research Strategist',
    defaultStyle: 'structured'
  },
  {
    id: 'collaboration-lead',
    label: 'Collaboration Lead',
    defaultStyle: 'mentor'
  }
]

export function selectArchetype(input: ArchetypeInput): PersonaArchetype {
  const emphasis = new Set([...input.targetUseCases, ...input.capabilityEmphasis])

  if (emphasis.has('engineering') || emphasis.has('debugging')) {
    return ARCHETYPES[0]
  }

  if (emphasis.has('research')) {
    return ARCHETYPES[1]
  }

  return ARCHETYPES[2]
}
