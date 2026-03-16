export interface PersonalitySpectrum {
  restraint: number
  warmth: number
  sharpness: number
  initiative: number
  humor: number
  patience: number
}

export const SPECTRUM_PRESETS: Record<string, PersonalitySpectrum> = {
  balanced: {
    restraint: 70,
    warmth: 55,
    sharpness: 70,
    initiative: 70,
    humor: 25,
    patience: 68
  },
  expressive: {
    restraint: 45,
    warmth: 75,
    sharpness: 72,
    initiative: 84,
    humor: 58,
    patience: 60
  },
  calm: {
    restraint: 82,
    warmth: 48,
    sharpness: 74,
    initiative: 62,
    humor: 18,
    patience: 82
  }
}
