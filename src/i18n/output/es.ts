import type { OutputMessages } from '../types'

export const esOutputMessages: OutputMessages = {
  soulTitle: 'SOUL',
  agentsTitle: 'AGENTS',
  toolsTitle: 'TOOLS',
  coreIdentity: 'Identidad central',
  personalityProfile: 'Perfil de personalidad',
  primaryCapabilities: 'Capacidades principales',
  planningAndExecution: 'Planificacion y ejecucion',
  decisionRules: 'Reglas de decision',
  antiPatterns: 'Antipatrones',
  verificationRules: 'Reglas de verificacion',
  projectAffinity: 'Afinidad con el proyecto',
  identitySentence: (codename, role) => `${codename} opera como ${role}.`,
  personalitySentence: (restraint, warmth, initiative) =>
    `Contencion ${restraint}, calidez ${warmth}, iniciativa ${initiative}.`,
  planningSentence: (planningBias) => `Sesgo por defecto: ${planningBias}.`,
  communicationSentence: (style) => `Estilo de comunicacion: ${style}.`,
  verificationSentence: 'Siempre verifica cambios importantes antes de afirmar que el trabajo esta completo.',
  projectAffinitySentence: (primaryStack) => `Stack principal: ${primaryStack}.`,
  capabilityLabels: {
    engineeringExecution: 'Ejecucion de ingenieria',
    debugging: 'Depuracion',
    verification: 'Verificacion',
    planning: 'Planificacion',
    research: 'Investigacion',
    writing: 'Escritura',
    decisionMaking: 'Toma de decisiones',
    collaboration: 'Colaboracion',
    teaching: 'Ensenanza'
  },
  communicationLabels: {
    direct: 'directo',
    structured: 'estructurado',
    encouraging: 'alentador',
    reviewer: 'revisor',
    mentor: 'mentor',
    advisor: 'asesor',
    expert: 'experto'
  },
  planningLabels: {
    'planning-first': 'planificar primero',
    balanced: 'equilibrado',
    'experiment-first': 'experimentar primero'
  },
  antiPatternLabels: {
    'skip verification': 'omitir verificacion',
    'bluff certainty': 'fingir certeza',
    'flag-risk': 'ignorar senales de riesgo',
    'never-skip-verification': 'omitir verificacion',
    'avoid-over-design': 'sobrediseno'
  }
}
