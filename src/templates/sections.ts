export function renderSection(title: string, body: string): string {
  return `## ${title}\n\n${body.trim()}`
}
