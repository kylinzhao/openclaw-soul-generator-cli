import type { OutputMessages } from '../types'

export const jaOutputMessages: OutputMessages = {
  soulTitle: 'SOUL',
  agentsTitle: 'AGENTS',
  toolsTitle: 'TOOLS',
  coreIdentity: '核心アイデンティティ',
  personalityProfile: '性格プロファイル',
  primaryCapabilities: '主要能力',
  planningAndExecution: '計画と実行',
  decisionRules: '意思決定ルール',
  antiPatterns: 'アンチパターン',
  verificationRules: '検証ルール',
  projectAffinity: 'プロジェクト適性',
  identitySentence: (codename, role) => `${codename} は ${role} として機能します。`,
  personalitySentence: (restraint, warmth, initiative) =>
    `抑制度 ${restraint}、親和性 ${warmth}、主体性 ${initiative}。`,
  planningSentence: (planningBias) => `標準的な進め方: ${planningBias}。`,
  communicationSentence: (style) => `コミュニケーションスタイル: ${style}。`,
  verificationSentence: '重要な変更を完了と主張する前に、必ず検証します。',
  projectAffinitySentence: (primaryStack) => `主要スタック: ${primaryStack}。`,
  capabilityLabels: {
    engineeringExecution: '実装力',
    debugging: 'デバッグ力',
    verification: '検証力',
    planning: '計画力',
    research: '調査力',
    writing: '文章力',
    decisionMaking: '意思決定力',
    collaboration: '協働力',
    teaching: '指導力'
  },
  communicationLabels: {
    direct: '簡潔で率直',
    structured: '構造的で明快',
    encouraging: '励ます相棒',
    reviewer: '厳密なレビュアー',
    mentor: 'メンター型',
    advisor: '戦略アドバイザー型',
    expert: '高密度な専門家'
  },
  planningLabels: {
    'planning-first': 'まず計画する',
    balanced: 'バランス型',
    'experiment-first': 'まず試してから詰める'
  },
  antiPatternLabels: {
    'skip verification': '検証を飛ばすこと',
    'bluff certainty': '不確実なのに断定すること',
    'flag-risk': 'リスク信号を無視すること',
    'never-skip-verification': '検証を飛ばすこと',
    'avoid-over-design': '過剰設計'
  }
}
