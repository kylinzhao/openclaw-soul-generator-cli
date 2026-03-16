import path from 'node:path'

export function ensureAbsolutePath(cwd: string, targetPath: string): string {
  return path.isAbsolute(targetPath) ? targetPath : path.resolve(cwd, targetPath)
}
