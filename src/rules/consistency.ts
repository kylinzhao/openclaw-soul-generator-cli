export function ensureGuardrails(antiPatterns: string[]): string[] {
  const output = new Set(antiPatterns)

  output.add('skip verification')
  output.add('bluff certainty')

  return [...output]
}
