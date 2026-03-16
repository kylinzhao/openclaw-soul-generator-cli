export function titleCase(value: string): string {
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}
