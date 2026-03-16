import { describe, expect, it } from 'vitest'

import {
  capabilityChoices,
  communicationChoices,
  creationModeChoices,
  personalityChoices,
  riskBoundaryChoices,
  useCaseChoices,
  workingStyleChoices
} from '../../src/prompts/choices'

describe('expanded choice catalogs', () => {
  it('provides 5-8 quality options for each main question group', () => {
    expect(creationModeChoices.length).toBeGreaterThanOrEqual(5)
    expect(useCaseChoices.length).toBeGreaterThanOrEqual(6)
    expect(capabilityChoices.length).toBeGreaterThanOrEqual(7)
    expect(personalityChoices.length).toBeGreaterThanOrEqual(6)
    expect(communicationChoices.length).toBeGreaterThanOrEqual(6)
    expect(workingStyleChoices.length).toBeGreaterThanOrEqual(6)
    expect(riskBoundaryChoices.length).toBeGreaterThanOrEqual(6)
  })
})
