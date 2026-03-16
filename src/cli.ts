import path from 'node:path'
import { pathToFileURL } from 'node:url'

import * as prompts from '@clack/prompts'

import { getCliMessages } from './i18n/cli'
import type { LocaleCode } from './i18n'
import { isSupportedLocale } from './i18n'
import { detectExistingPersonaFiles } from './merge/detect-existing'
import { mergePersonaContent, type MergeStrategy } from './merge/strategies'
import { runPromptFlow, type PromptAdapter } from './prompts/flow'
import { QUESTION_DEFINITIONS } from './prompts/questions'
import { buildPersonaProfile } from './rules/build-persona'
import { detectProjectSignals } from './scanner/detect-project'
import { renderPersonaPack } from './output/render-pack'
import { writePersonaPack } from './output/write-pack'

export interface CliResult {
  exitCode: number
  output: string
}

export interface CliDependencies {
  createPromptAdapter?: () => Promise<PromptAdapter>
  chooseMergeStrategy?: (fileName: string) => Promise<MergeStrategy>
}

class ClackPromptAdapter implements PromptAdapter {
  private locale: LocaleCode = 'en'

  async select(id: string): Promise<string> {
    const question = QUESTION_DEFINITIONS.find((item) => item.id === id)

    if (!question) {
      throw new Error(`Unknown question: ${id}`)
    }

    const messages = getCliMessages(this.locale)

    const value = await prompts.select({
      message: messages.questions[question.messageKey] ?? question.message,
      options: question.choices.map((choice) => ({
        value: choice.value,
        label: choice.recommended
          ? `${messages.choices[choice.labelKey] ?? choice.label} (recommended)`
          : (messages.choices[choice.labelKey] ?? choice.label)
      }))
    })

    if (prompts.isCancel(value)) {
      throw new Error('Prompt cancelled')
    }

    if (id === 'language' && isSupportedLocale(value)) {
      this.locale = value
    }

    return value
  }

  async multiselect(id: string): Promise<string[]> {
    const question = QUESTION_DEFINITIONS.find((item) => item.id === id)

    if (!question) {
      throw new Error(`Unknown question: ${id}`)
    }

    const messages = getCliMessages(this.locale)

    const value = await prompts.multiselect({
      message: messages.questions[question.messageKey] ?? question.message,
      options: question.choices.map((choice) => ({
        value: choice.value,
        label: choice.recommended
          ? `${messages.choices[choice.labelKey] ?? choice.label} (recommended)`
          : (messages.choices[choice.labelKey] ?? choice.label)
      })),
      initialValues: question.choices.filter((choice) => choice.recommended).map((choice) => choice.value),
      required: false
    })

    if (prompts.isCancel(value)) {
      throw new Error('Prompt cancelled')
    }

    return value
  }
}

function readCwd(argv: string[]): string {
  const index = argv.indexOf('--cwd')
  if (index >= 0 && argv[index + 1]) {
    return path.resolve(argv[index + 1])
  }

  return process.cwd()
}

function readLocaleArg(argv: string[]): LocaleCode {
  const index = argv.indexOf('--locale')
  const candidate = index >= 0 ? argv[index + 1] : undefined

  if (candidate && isSupportedLocale(candidate)) {
    return candidate
  }

  return 'en'
}

async function defaultMergeStrategy(fileName: string, locale: LocaleCode): Promise<MergeStrategy> {
  const messages = getCliMessages(locale)
  const value = await prompts.select({
    message: messages.mergePrompt(fileName),
    options: [
      { value: 'smart-merge', label: messages.mergeSmart },
      { value: 'overwrite', label: messages.mergeOverwrite },
      { value: 'keep', label: messages.mergeKeep }
    ]
  })

  if (prompts.isCancel(value)) {
    throw new Error('Merge prompt cancelled')
  }

  return value
}

export async function runCli(argv: string[], deps: CliDependencies = {}): Promise<CliResult> {
  if (argv.includes('--help')) {
    const locale = readLocaleArg(argv)
    const messages = getCliMessages(locale)
    return {
      exitCode: 0,
      output: `${messages.helpTitle}\n\n${messages.helpUsage}`
    }
  }

  const cwd = readCwd(argv)
  const adapter = deps.createPromptAdapter
    ? await deps.createPromptAdapter()
    : await Promise.resolve(new ClackPromptAdapter())

  const answers = await runPromptFlow(adapter)
  const projectSignals = await detectProjectSignals(cwd)
  const personaProfile = buildPersonaProfile(answers, projectSignals)
  const generatedPack = renderPersonaPack(personaProfile)
  const existingFiles = await detectExistingPersonaFiles(cwd)
  const chooseMergeStrategy = deps.chooseMergeStrategy
  const finalPack: Record<string, string> = { ...generatedPack }

  for (const fileName of existingFiles) {
    const strategy = chooseMergeStrategy
      ? await chooseMergeStrategy(fileName)
      : await defaultMergeStrategy(fileName, answers.selectedLocale)
    const existingContent = await import('node:fs/promises').then((fs) =>
      fs.readFile(path.join(cwd, fileName), 'utf8')
    )

    finalPack[fileName] = mergePersonaContent(existingContent, generatedPack[fileName], strategy)
  }

  await writePersonaPack(cwd, finalPack)

  const messages = getCliMessages(answers.selectedLocale)
  prompts.note(messages.successNoteBody(cwd), messages.successNoteTitle)

  return {
    exitCode: 0,
    output: messages.successNoteBody(cwd)
  }
}

async function main(): Promise<void> {
  const result = await runCli(process.argv.slice(2))

  if (result.output) {
    console.log(result.output)
  }

  process.exitCode = result.exitCode
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
