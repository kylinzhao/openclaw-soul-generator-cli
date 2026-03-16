import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { runCli, type CliDependencies } from '../../src/cli'
import type { PromptAdapter } from '../../src/prompts/flow'

class StubPromptAdapter implements PromptAdapter {
  constructor(private readonly answers: Record<string, string | string[]>) {}

  async select(id: string): Promise<string> {
    return this.answers[id] as string
  }

  async multiselect(id: string): Promise<string[]> {
    return (this.answers[id] as string[]) ?? []
  }
}

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  tempDirs.length = 0
})

function buildDeps(overrides: Partial<CliDependencies> = {}): CliDependencies {
  return {
    createPromptAdapter: async () =>
      new StubPromptAdapter({
        language: 'en',
        'creation-mode': 'scratch',
        'use-case': ['engineering', 'debugging'],
        capabilities: ['engineering', 'debugging'],
        personality: 'balanced',
        communication: 'direct',
        'working-style': 'planning-first',
        'risk-boundaries': ['flag-risk', 'never-skip-verification']
      }),
    chooseMergeStrategy: async () => 'overwrite',
    ...overrides
  }
}

describe('runCli finish flow', () => {
  it('shows a finish summary with output path and generated files', async () => {
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-finish-'))
    tempDirs.push(cwd)

    const notes: Array<{ message: string; title: string }> = []
    const result = await runCli(['--cwd', cwd], buildDeps({
      chooseFinishAction: async () => 'keep-output',
      showNote: (message, title) => {
        notes.push({ message, title })
      }
    }))

    expect(result.exitCode).toBe(0)
    expect(notes.at(-1)?.message).toContain(cwd)
    expect(notes.at(-1)?.message).toContain('SOUL.md')
    expect(notes.at(-1)?.message).toContain('persona.json')
  })

  it('confirms and applies the generated pack to the detected workspace', async () => {
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-apply-'))
    tempDirs.push(cwd)

    const confirmationMessages: string[] = []
    const appliedCalls: Array<{ workspacePath: string; files: Record<string, string> }> = []
    const workspacePath = '/tmp/openclaw-demo-workspace'

    const result = await runCli(['--cwd', cwd], buildDeps({
      chooseFinishAction: async () => 'apply-to-openclaw',
      detectWorkspace: async () => ({
        workspacePath,
        managedFiles: ['SOUL.md', 'AGENTS.md', 'TOOLS.md']
      }),
      confirmWorkspaceAction: async (message) => {
        confirmationMessages.push(message)
        return true
      },
      applyToWorkspace: async (input) => {
        appliedCalls.push({ workspacePath: input.workspacePath, files: input.files })
        return {
          workspacePath: input.workspacePath,
          backupPath: '/tmp/openclaw-backup',
          appliedFiles: ['SOUL.md', 'AGENTS.md', 'TOOLS.md']
        }
      }
    }))

    expect(confirmationMessages[0]).toContain(workspacePath)
    expect(appliedCalls).toHaveLength(1)
    expect(appliedCalls[0].workspacePath).toBe(workspacePath)
    expect(appliedCalls[0].files['SOUL.md']).toContain('# ')
    expect(result.output).toContain(workspacePath)
  })

  it('confirms and restores the latest workspace backup', async () => {
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'persona-restore-'))
    tempDirs.push(cwd)

    let restoredWorkspacePath = ''
    const workspacePath = '/tmp/openclaw-demo-workspace'

    const result = await runCli(['--cwd', cwd], buildDeps({
      chooseFinishAction: async () => 'restore-latest-backup',
      detectWorkspace: async () => ({
        workspacePath,
        managedFiles: ['SOUL.md', 'AGENTS.md', 'TOOLS.md']
      }),
      confirmWorkspaceAction: async () => true,
      restoreWorkspace: async (input) => {
        restoredWorkspacePath = input.workspacePath
        return {
          restoredFrom: '/tmp/openclaw-backup',
          restoredFiles: ['SOUL.md', 'AGENTS.md', 'TOOLS.md']
        }
      }
    }))

    expect(restoredWorkspacePath).toBe(workspacePath)
    expect(result.output).toContain('/tmp/openclaw-backup')
  })
})
