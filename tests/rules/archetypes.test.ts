import { describe, expect, it } from 'vitest'

import { expandCapabilityBundle } from '../../src/rules/capability-bundles'
import { selectArchetype } from '../../src/rules/archetypes'

describe('persona archetypes and capability bundles', () => {
  it('selects an engineering archetype for engineering-heavy requests', () => {
    const archetype = selectArchetype({
      targetUseCases: ['engineering', 'debugging'],
      capabilityEmphasis: ['engineering', 'debugging']
    })

    expect(archetype.id).toBe('engineering-commander')
  })

  it('selects a research archetype for research-heavy requests', () => {
    const archetype = selectArchetype({
      targetUseCases: ['research'],
      capabilityEmphasis: ['research']
    })

    expect(archetype.id).toBe('research-strategist')
  })

  it('boosts debugging and verification for strong engineering', () => {
    const capabilities = expandCapabilityBundle(['engineering'])

    expect(capabilities.engineeringExecution).toBeGreaterThanOrEqual(85)
    expect(capabilities.debugging).toBeGreaterThanOrEqual(75)
    expect(capabilities.verification).toBeGreaterThanOrEqual(75)
  })
})
