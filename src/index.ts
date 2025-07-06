import fs from 'node:fs'
import autoDownloadModel from './autoDownloadModel'
import type { ModelName } from './constants'
import type { Logger, WhisperOptions } from './types'
import { checkIfFileExists, convertToWavType } from './utils'
import { constructCommand } from './WhisperHelper'
import { executeCppCommand } from './whisper'

export interface IOptions {
  modelName?: ModelName
  modelPath?: string
  modelDir?: string
  autoDownloadModelName?: ModelName
  whisperOptions?: WhisperOptions
  withCuda?: boolean
  removeWavFileAfterTranscription?: boolean
  logger?: Logger
}

// Main transcription function
export async function transcribe(filePath: string, options: IOptions): Promise<string> {
  const { removeWavFileAfterTranscription = false, logger = console } = options

  try {
    if (options.autoDownloadModelName) {
      logger.debug(
        `[Native-Whisper] Checking and downloading model if needed: ${options.autoDownloadModelName}`
      )

      logger.debug('autoDownloadModelName', options.autoDownloadModelName)
      logger.debug('modelDir', options.modelDir)
      logger.debug('options', options)

      await autoDownloadModel(
        logger,
        options.autoDownloadModelName,
        options.withCuda,
        options.modelDir
      )
    }

    logger.debug(`[Native-Whisper] Checking file existence: ${filePath}`)
    checkIfFileExists(filePath)

    logger.debug(`[Native-Whisper] Converting file to WAV format: ${filePath}`)
    const outputFilePath = await convertToWavType(filePath, logger)

    logger.debug(`[Native-Whisper] Constructing command for file: ${outputFilePath}`)
    const command = constructCommand(outputFilePath, options)

    logger.debug(`[Native-Whisper] Executing command: ${command}`)
    const transcript = await executeCppCommand(command, logger, options.withCuda)

    if (!transcript) {
      throw new Error('Transcription failed or produced no output.')
    }

    if (removeWavFileAfterTranscription && fs.existsSync(outputFilePath)) {
      logger.debug(`[Native-Whisper] Removing temporary WAV file: ${outputFilePath}`)
      fs.unlinkSync(outputFilePath)
    }

    return transcript
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    logger.error(`[Native-Whisper] Error during processing: ${errorMessage}`)
    throw new Error(`Operation failed: ${errorMessage}`)
  }
}

/**
 * @deprecated Use `transcribe` instead. This function will be removed in a future version.
 */
export async function nodewhisper(filePath: string, options: IOptions): Promise<string> {
  return transcribe(filePath, options)
}
