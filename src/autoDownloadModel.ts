import fs from 'node:fs'
import path from 'node:path'
import shell from 'shelljs'
import { MODEL_OBJECT, MODELS_LIST, type ModelName, WHISPER_CPP_PATH } from './constants'
import type { Logger } from './types'

export default async function autoDownloadModel(
  logger: Logger = console,
  autoDownloadModelName?: ModelName,
  withCuda: boolean = false,
  modelDir?: string
): Promise<void> {
  const projectDir = process.cwd()

  if (!autoDownloadModelName) {
    throw new Error('[Native-Whisper] Error: Model name must be provided.')
  }

  if (!MODELS_LIST.includes(autoDownloadModelName)) {
    throw new Error('[Native-Whisper] Error: Provide a valid model name')
  }

  try {
    // Determine download directory
    const modelDirectory = modelDir || path.join(WHISPER_CPP_PATH, 'models')
    const modelFileName = MODEL_OBJECT[autoDownloadModelName]
    const modelFilePath = path.join(modelDirectory, modelFileName)

    // Ensure download directory exists
    if (!fs.existsSync(modelDirectory)) {
      fs.mkdirSync(modelDirectory, { recursive: true })
      logger.debug(`[Native-Whisper] Created model directory: ${modelDirectory}`)
    }

    // Check if model already exists
    if (fs.existsSync(modelFilePath)) {
      logger.debug(
        `[Native-Whisper] ${autoDownloadModelName} already exists in ${modelDirectory}. Skipping download.`
      )
      return
    }

    logger.debug(
      `[Native-Whisper] Auto-download Model: ${autoDownloadModelName} to ${modelDirectory}`
    )

    // Always use whisper.cpp models directory for download script
    const whisperModelsDir = path.join(WHISPER_CPP_PATH, 'models')
    shell.cd(whisperModelsDir)

    let scriptPath = './download-ggml-model.sh'
    if (process.platform === 'win32') {
      scriptPath = 'download-ggml-model.cmd'
    }

    shell.chmod('+x', scriptPath)
    const result = shell.exec(`${scriptPath} ${autoDownloadModelName}`)

    if (result.code !== 0) {
      throw new Error(`[Native-Whisper] Failed to download model: ${result.stderr}`)
    }

    // If using custom modelDir, move the downloaded model there
    if (modelDir && modelDir !== whisperModelsDir) {
      const sourceModelPath = path.join(whisperModelsDir, modelFileName)
      if (fs.existsSync(sourceModelPath)) {
        logger.debug(`[Native-Whisper] Moving model from ${sourceModelPath} to ${modelFilePath}`)
        fs.copyFileSync(sourceModelPath, modelFilePath)
        fs.unlinkSync(sourceModelPath) // Remove from original location
      }
    }

    logger.debug('[Native-Whisper] Model downloaded. Attempting to build whisper.cpp...')
    shell.cd('../')

    // Configure CMake build
    logger.debug('[Native-Whisper] Configuring CMake build...')
    let configureCommand = 'cmake -B build'
    if (withCuda) {
      configureCommand += ' -DGGML_CUDA=1'
    }

    const configResult = shell.exec(configureCommand)
    if (configResult.code !== 0) {
      throw new Error(`[Native-Whisper] CMake configuration failed: ${configResult.stderr}`)
    }

    // Build the project
    logger.debug('[Native-Whisper] Building whisper.cpp...')
    const buildCommand = 'cmake --build build --config Release'
    const buildResult = shell.exec(buildCommand)

    if (buildResult.code !== 0) {
      throw new Error(`[Native-Whisper] Build failed: ${buildResult.stderr}`)
    }

    logger.debug('[Native-Whisper] Model downloaded and built successfully')
  } catch (error) {
    logger.error('[Native-Whisper] Error caught in autoDownloadModel:', error)
    shell.cd(projectDir)
    throw error
  }
}
