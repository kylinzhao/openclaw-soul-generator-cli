export function wrapManagedBlock(name: string, content: string): string {
  return [
    `<!-- BEGIN OPENCLAW-PERSONA:${name} -->`,
    content.trim(),
    `<!-- END OPENCLAW-PERSONA:${name} -->`
  ].join('\n')
}
