import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { MANAGED_PERSONA_FILES } from './manifest'

export interface DetectOpenClawWorkspaceOptions {
  homeDir?: string
  configPath?: string
  env?: NodeJS.ProcessEnv
}

export interface OpenClawWorkspaceInfo {
  workspacePath: string
  managedFiles: string[]
}

interface OpenClawConfig {
  agents?: {
    defaults?: {
      workspace?: string
    }
  }
}

function expandHomeDir(candidatePath: string, homeDir: string): string {
  if (candidatePath === '~') {
    return homeDir
  }

  if (candidatePath.startsWith('~/')) {
    return path.join(homeDir, candidatePath.slice(2))
  }

  return path.resolve(candidatePath)
}

async function readWorkspaceFromConfig(configPath: string, homeDir: string): Promise<string | null> {
  try {
    const rawConfig = await fs.readFile(configPath, 'utf8')
    const parsed = JSON.parse(rawConfig) as OpenClawConfig
    const configuredWorkspace = parsed.agents?.defaults?.workspace

    if (!configuredWorkspace) {
      return null
    }

    return expandHomeDir(configuredWorkspace, homeDir)
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }

    throw new Error(`Unable to read OpenClaw config at ${configPath}`)
  }
}

export async function detectOpenClawWorkspace(
  options: DetectOpenClawWorkspaceOptions = {}
): Promise<OpenClawWorkspaceInfo> {
  const homeDir = options.homeDir ?? os.homedir()
  const configPath = options.configPath ?? path.join(homeDir, '.openclaw', 'openclaw.json')
  const env = options.env ?? process.env
  const configuredWorkspace = await readWorkspaceFromConfig(configPath, homeDir)

  if (configuredWorkspace) {
    return {
      workspacePath: configuredWorkspace,
      managedFiles: [...MANAGED_PERSONA_FILES]
    }
  }

  const profile = env.OPENCLAW_PROFILE
  const workspaceName = profile && profile !== 'default' ? `workspace-${profile}` : 'workspace'

  return {
    workspacePath: path.join(homeDir, '.openclaw', workspaceName),
    managedFiles: [...MANAGED_PERSONA_FILES]
  }
}
