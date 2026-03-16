export type MergeStrategy = 'keep' | 'overwrite' | 'smart-merge'

const managedBlockPattern =
  /<!-- BEGIN OPENCLAW-PERSONA:[A-Z]+ -->[\s\S]*?<!-- END OPENCLAW-PERSONA:[A-Z]+ -->/

export function mergePersonaContent(
  existing: string,
  generated: string,
  strategy: MergeStrategy
): string {
  if (strategy === 'keep') {
    return existing
  }

  if (strategy === 'overwrite') {
    return generated
  }

  if (!managedBlockPattern.test(existing)) {
    return `${generated}\n\n${existing}`.trim()
  }

  return existing.replace(managedBlockPattern, generated)
}
