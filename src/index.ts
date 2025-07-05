import { Logger, WhisperOptions } from './types'
import { executeCppCommand } from './whisper'
import fs from 'fs'
import { constructCommand } from './WhisperHelper'
import { checkIfFileExists, convertToWavType } from './utils'
import autoDownloadModel from './autoDownloadModel'

export interface IOptions {
	modelName?: string
	modelPath?: string
	modelDir?: string
	autoDownloadModelName?: string
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
			logger.debug(`[Whispry] Checking and downloading model if needed: ${options.autoDownloadModelName}`)

			logger.debug('autoDownloadModelName', options.autoDownloadModelName)
			logger.debug('modelDir', options.modelDir)
			logger.debug('options', options)

			await autoDownloadModel(logger, options.autoDownloadModelName, options.withCuda, options.modelDir)
		}

		logger.debug(`[Whispry] Checking file existence: ${filePath}`)
		checkIfFileExists(filePath)

		logger.debug(`[Whispry] Converting file to WAV format: ${filePath}`)
		const outputFilePath = await convertToWavType(filePath, logger)

		logger.debug(`[Whispry] Constructing command for file: ${outputFilePath}`)
		const command = constructCommand(outputFilePath, options)

		logger.debug(`[Whispry] Executing command: ${command}`)
		const transcript = await executeCppCommand(command, logger, options.withCuda)

		if (!transcript) {
			throw new Error('Transcription failed or produced no output.')
		}

		if (removeWavFileAfterTranscription && fs.existsSync(outputFilePath)) {
			logger.debug(`[Whispry] Removing temporary WAV file: ${outputFilePath}`)
			fs.unlinkSync(outputFilePath)
		}

		return transcript
	} catch (error) {
		logger.error(`[Whispry] Error during processing: ${error.message}`)
		throw new Error(`Operation failed: ${error.message}`)
	}
}

/**
 * @deprecated Use `transcribe` instead. This function will be removed in a future version.
 */
export async function nodewhisper(filePath: string, options: IOptions): Promise<string> {
	return transcribe(filePath, options)
}
