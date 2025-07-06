#! /usr/bin/env node

// npx native-whisper download

import fs from 'node:fs'
import path from 'node:path'
import readlineSync from 'readline-sync'
import shell from 'shelljs'
import {
  DEFAULT_MODEL,
  MODEL_OBJECT,
  MODELS_LIST,
  type ModelName,
  WHISPER_CPP_PATH,
} from './constants'
import type { Logger } from './types'

const askForModel = async (logger: Logger = console): Promise<ModelName> => {
  const answer = readlineSync.question(
    `\n[Native-Whisper] Enter model name (e.g. 'tiny.en') or 'cancel' to exit\n(ENTER for tiny.en): `
  )

  if (answer === 'cancel') {
    logger.log('[Native-Whisper] Exiting model downloader.\n')
    process.exit(0)
  }
  // User presses enter
  else if (answer === '') {
    logger.log('[Native-Whisper] Going with', DEFAULT_MODEL)
    return DEFAULT_MODEL
  } else if (!MODELS_LIST.includes(answer as ModelName)) {
    logger.log(
      '\n[Native-Whisper] FAIL: Name not found. Check your spelling OR quit wizard and use custom model.\n'
    )

    return await askForModel()
  }

  return answer as ModelName
}

const askIfUserWantToUseCuda = (logger: Logger = console) => {
  const answer = readlineSync.question(
    `\n[Native-Whisper] Do you want to use CUDA for compilation? (y/n)\n(ENTER for n): `
  )

  if (answer === 'y') {
    logger.log('[Native-Whisper] Using CUDA for compilation.')
    return true
  } else {
    logger.log('[Native-Whisper] Not using CUDA for compilation.')
    return false
  }
}

async function downloadModel(logger: Logger = console) {
  try {
    shell.cd(path.join(WHISPER_CPP_PATH, 'models'))

    const anyModelExist: string[] = []

    MODELS_LIST.forEach(model => {
      if (!fs.existsSync(path.join(WHISPER_CPP_PATH, 'models', MODEL_OBJECT[model]))) {
        // Model does not exist, skip
      } else {
        anyModelExist.push(model)
      }
    })

    if (anyModelExist.length > 0) {
      logger.log('\n[Native-Whisper] Currently installed models:')
      anyModelExist.forEach(model => logger.log(`- ${model}`))
      logger.log('\n[Native-Whisper] You can install additional models from the list below.\n')
    }

    logger.log(`
| Model          | Disk   | RAM     |
|----------------|--------|---------|
| tiny           |  75 MB | ~390 MB |
| tiny.en        |  75 MB | ~390 MB |
| base           | 142 MB | ~500 MB |
| base.en        | 142 MB | ~500 MB |
| small          | 466 MB | ~1.0 GB |
| small.en       | 466 MB | ~1.0 GB |
| medium         | 1.5 GB | ~2.6 GB |
| medium.en      | 1.5 GB | ~2.6 GB |
| large-v1       | 2.9 GB | ~4.7 GB |
| large          | 2.9 GB | ~4.7 GB |
| large-v3-turbo | 1.5 GB | ~2.6 GB |
`)

    if (!shell.which('./download-ggml-model.sh')) {
      throw '[Native-Whisper] Error: Downloader not found.\n'
    }

    const modelName = await askForModel()

    let scriptPath = './download-ggml-model.sh'
    if (process.platform === 'win32') scriptPath = 'download-ggml-model.cmd'

    shell.chmod('+x', scriptPath)
    shell.exec(`${scriptPath} ${modelName}`)

    logger.log('[Native-Whisper] Attempting to build whisper.cpp...\n')
    shell.cd('../')

    const withCuda = askIfUserWantToUseCuda()

    // Use CMake instead of make
    logger.log('[Native-Whisper] Configuring CMake build...')
    let configureCommand = 'cmake -B build'
    if (withCuda) {
      configureCommand += ' -DGGML_CUDA=1'
    }

    shell.exec(configureCommand)

    logger.log('[Native-Whisper] Building with CMake...')
    shell.exec('cmake --build build --config Release')

    process.exit(0)
  } catch (error) {
    logger.error('[Native-Whisper] Error Caught in downloadModel\n')
    logger.error(error)
    return error
  }
}
downloadModel().catch(error => {
  console.error('Failed to download:', error)
  process.exit(1)
})
