export interface WhisperOptions {
  outputInCsv?: boolean
  outputInJson?: boolean
  outputInJsonFull?: boolean
  outputInLrc?: boolean
  outputInSrt?: boolean
  outputInText?: boolean
  outputInVtt?: boolean
  outputInWords?: boolean
  translateToEnglish?: boolean
  language?: string
  timestamps_length?: number
  wordTimestamps?: boolean
  splitOnWord?: boolean
}

export interface Logger {
  debug: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  log: (...args: unknown[]) => void
}
