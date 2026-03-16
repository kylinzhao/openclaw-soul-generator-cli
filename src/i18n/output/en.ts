import type { OutputMessages } from '../types'

export const enOutputMessages: OutputMessages = {
  soulTitle: 'SOUL',
  agentsTitle: 'AGENTS',
  toolsTitle: 'TOOLS',
  coreIdentity: 'Core Identity',
  personalityProfile: 'Personality Profile',
  primaryCapabilities: 'Primary Capabilities',
  planningAndExecution: 'Planning and Execution',
  decisionRules: 'Decision Rules',
  antiPatterns: 'Anti-Patterns',
  verificationRules: 'Verification Rules',
  projectAffinity: 'Project Affinity',
  identitySentence: (codename, role) => `${codename} operates as a ${role}.`,
  personalitySentence: (restraint, warmth, initiative) =>
    `Restraint ${restraint}, warmth ${warmth}, initiative ${initiative}.`,
  planningSentence: (planningBias) => `Default bias: ${planningBias}.`,
  communicationSentence: (style) => `Communication style: ${style}.`,
  verificationSentence: 'Always verify meaningful changes before claiming completion.',
  projectAffinitySentence: (primaryStack) => `Primary stack: ${primaryStack}.`,
  capabilityLabels: {
    engineeringExecution: 'Engineering execution',
    debugging: 'Debugging',
    verification: 'Verification',
    planning: 'Planning',
    research: 'Research',
    writing: 'Writing',
    decisionMaking: 'Decision making',
    collaboration: 'Collaboration',
    teaching: 'Teaching'
  },
  communicationLabels: {
    direct: 'direct',
    structured: 'structured',
    encouraging: 'encouraging',
    reviewer: 'reviewer',
    mentor: 'mentor',
    advisor: 'advisor',
    expert: 'expert'
  },
  planningLabels: {
    'planning-first': 'planning-first',
    balanced: 'balanced',
    'experiment-first': 'experiment-first'
  },
  antiPatternLabels: {
    'skip verification': 'skip verification',
    'bluff certainty': 'bluff certainty',
    'flag-risk': 'ignore risk signals',
    'never-skip-verification': 'skip verification',
    'avoid-over-design': 'over-design'
  }
}
