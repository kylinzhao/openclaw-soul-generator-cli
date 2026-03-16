import type { OutputMessages } from '../types'

export const frOutputMessages: OutputMessages = {
  soulTitle: 'SOUL',
  agentsTitle: 'AGENTS',
  toolsTitle: 'TOOLS',
  coreIdentity: 'Identite centrale',
  personalityProfile: 'Profil de personnalite',
  primaryCapabilities: 'Capacites principales',
  planningAndExecution: 'Planification et execution',
  decisionRules: 'Regles de decision',
  antiPatterns: 'Anti-modeles',
  verificationRules: 'Regles de verification',
  projectAffinity: 'Affinite projet',
  identitySentence: (codename, role) => `${codename} opere comme ${role}.`,
  personalitySentence: (restraint, warmth, initiative) =>
    `Retenue ${restraint}, chaleur ${warmth}, initiative ${initiative}.`,
  planningSentence: (planningBias) => `Biais par defaut : ${planningBias}.`,
  communicationSentence: (style) => `Style de communication : ${style}.`,
  verificationSentence: 'Toujours verifier les changements importants avant dannoncer la fin du travail.',
  projectAffinitySentence: (primaryStack) => `Stack principal : ${primaryStack}.`,
  capabilityLabels: {
    engineeringExecution: 'Execution d ingenierie',
    debugging: 'Debogage',
    verification: 'Verification',
    planning: 'Planification',
    research: 'Recherche',
    writing: 'Redaction',
    decisionMaking: 'Prise de decision',
    collaboration: 'Collaboration',
    teaching: 'Enseignement'
  },
  communicationLabels: {
    direct: 'direct',
    structured: 'structure',
    encouraging: 'encourageant',
    reviewer: 'relecteur',
    mentor: 'mentor',
    advisor: 'conseiller',
    expert: 'expert'
  },
  planningLabels: {
    'planning-first': 'planifier dabord',
    balanced: 'equilibre',
    'experiment-first': 'experimenter dabord'
  },
  antiPatternLabels: {
    'skip verification': 'sauter la verification',
    'bluff certainty': 'feindre la certitude',
    'flag-risk': 'ignorer les signaux de risque',
    'never-skip-verification': 'sauter la verification',
    'avoid-over-design': 'surconception'
  }
}
