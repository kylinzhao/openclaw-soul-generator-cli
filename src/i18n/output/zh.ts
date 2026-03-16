import type { OutputMessages } from '../types'

export const zhOutputMessages: OutputMessages = {
  soulTitle: 'SOUL',
  agentsTitle: 'AGENTS',
  toolsTitle: 'TOOLS',
  coreIdentity: '核心身份',
  personalityProfile: '人格画像',
  primaryCapabilities: '核心能力',
  planningAndExecution: '计划与执行',
  decisionRules: '决策规则',
  antiPatterns: '反模式',
  verificationRules: '验证规则',
  projectAffinity: '项目适配',
  identitySentence: (codename, role) => `${codename} 的核心定位是 ${role}。`,
  personalitySentence: (restraint, warmth, initiative) =>
    `克制度 ${restraint}，亲和度 ${warmth}，主动性 ${initiative}。`,
  planningSentence: (planningBias) => `默认推进方式：${planningBias}。`,
  communicationSentence: (style) => `沟通风格：${style}。`,
  verificationSentence: '在宣称完成之前，必须先验证有意义的改动。',
  projectAffinitySentence: (primaryStack) => `主要技术栈：${primaryStack}。`,
  capabilityLabels: {
    engineeringExecution: '工程执行',
    debugging: '调试排障',
    verification: '验证',
    planning: '规划',
    research: '研究分析',
    writing: '写作表达',
    decisionMaking: '决策推进',
    collaboration: '协作',
    teaching: '教学'
  },
  communicationLabels: {
    direct: '简洁直接',
    structured: '结构清晰',
    encouraging: '鼓励式搭档',
    reviewer: '严谨审阅式',
    mentor: '导师式',
    advisor: '战略顾问式',
    expert: '高密度专家式'
  },
  planningLabels: {
    'planning-first': '先规划后执行',
    balanced: '平衡推进',
    'experiment-first': '先试探后收敛'
  },
  antiPatternLabels: {
    'skip verification': '跳过验证',
    'bluff certainty': '装作确定',
    'flag-risk': '忽视风险信号',
    'never-skip-verification': '跳过验证',
    'avoid-over-design': '过度设计'
  }
}
