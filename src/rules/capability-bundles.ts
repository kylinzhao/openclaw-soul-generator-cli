const CAPABILITY_BUNDLES: Record<string, Record<string, number>> = {
  engineering: {
    engineeringExecution: 92,
    debugging: 82,
    verification: 80,
    planning: 74
  },
  research: {
    research: 90,
    writing: 75,
    decisionMaking: 70
  },
  collaboration: {
    collaboration: 88,
    teaching: 72,
    decisionMaking: 68
  }
}

export function expandCapabilityBundle(emphasis: string[]): Record<string, number> {
  const output: Record<string, number> = {}

  for (const key of emphasis) {
    const bundle = CAPABILITY_BUNDLES[key]

    if (!bundle) {
      continue
    }

    for (const [capability, weight] of Object.entries(bundle)) {
      output[capability] = Math.max(output[capability] ?? 0, weight)
    }
  }

  return output
}
