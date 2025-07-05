import fs from 'node:fs'
import path from 'node:path'
import shell from 'shelljs'

import { WHISPER_CPP_PATH } from './constants'
import type { Logger } from './types'

const projectDir = process.cwd()

export interface IShellOptions {
  silent: boolean
  async: boolean
}

const defaultShellOptions: IShellOptions = {
  silent: false,
  async: true,
}

function handleError(error: Error, logger: Logger = console) {
  logger.error('[Whispry] Error:', error.message)
  shell.cd(projectDir)
  throw error
}

// Get the correct executable path based on platform and build system
function getWhisperExecutablePath(): string {
  const execName = process.platform === 'win32' ? 'whisper-cli.exe' : 'whisper-cli'

  // Check common CMake build locations
  const possiblePaths = [
    path.join(WHISPER_CPP_PATH, 'build', 'bin', execName), // Unix CMake
    path.join(WHISPER_CPP_PATH, 'build', 'bin', 'Release', execName), // Windows CMake Release
    path.join(WHISPER_CPP_PATH, 'build', 'bin', 'Debug', execName), // Windows CMake Debug
    path.join(WHISPER_CPP_PATH, 'build', execName), // Alternative location
    path.join(WHISPER_CPP_PATH, execName), // Root directory
  ]

  for (const execPath of possiblePaths) {
    if (fs.existsSync(execPath)) {
      return execPath
    }
  }

  return '' // Not found
}

// Check if whisper-cli executable exists
function checkExecutableExists(logger: Logger = console): boolean {
  const execPath = getWhisperExecutablePath()
  const exists = execPath !== ''

  if (exists) {
    logger.debug(`[Whispry] Found executable at: ${execPath}`)
  } else {
    logger.debug('[Whispry] Executable not found in any expected location')
  }

  return exists
}

// Check if build directory exists and has been configured
function isBuildConfigured(): boolean {
  const buildDir = path.join(WHISPER_CPP_PATH, 'build')
  const cmakeCache = path.join(buildDir, 'CMakeCache.txt')
  return fs.existsSync(buildDir) && fs.existsSync(cmakeCache)
}

export async function whisperShell(
  command: string,
  options: IShellOptions = defaultShellOptions,
  logger: Logger = console
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const shellOptions = {
      ...options,
      windowsHide: true, // Prevent command window popup on Windows
    }

    shell.exec(command, shellOptions, (code, stdout, stderr) => {
      logger.debug('Exit code:', code)
      logger.debug('Stdout:', stdout)
      logger.debug('Stderr:', stderr)

      if (code === 0) {
        if (stdout.includes('error:')) {
          reject(new Error(`Error in whisper.cpp:\n${stdout}`))
          return
        }

        logger.debug('[Whispry] Transcribing Done!')
        resolve(stdout)
      } else {
        reject(new Error(stderr || `Command failed with exit code ${code}`))
      }
    })
  }).catch((error: Error) => {
    handleError(error, logger)
    return Promise.reject(error)
  })
}

export async function executeCppCommand(
  command: string,
  logger: Logger = console,
  withCuda: boolean = false
): Promise<string> {
  try {
    shell.cd(WHISPER_CPP_PATH)

    // Check if executable already exists
    if (!checkExecutableExists(logger)) {
      logger.debug('[Whispry] whisper-cli executable not found. Building...')

      // Configure build if not already configured
      if (!isBuildConfigured()) {
        logger.debug('[Whispry] Configuring CMake build...')

        let configureCommand = 'cmake -B build'
        if (withCuda) {
          configureCommand += ' -DGGML_CUDA=1'
        }

        const configResult = shell.exec(configureCommand)
        if (configResult.code !== 0) {
          throw new Error(`[Whispry] CMake configuration failed: ${configResult.stderr}`)
        }

        logger.debug('[Whispry] CMake configuration completed.')
      } else {
        logger.debug('[Whispry] Build already configured.')
      }

      // Build the project
      logger.debug('[Whispry] Building whisper.cpp...')
      const buildCommand = 'cmake --build build --config Release'
      const buildResult = shell.exec(buildCommand)

      if (buildResult.code !== 0) {
        throw new Error(`[Whispry] Build failed: ${buildResult.stderr}`)
      }

      // Verify executable was created
      if (!checkExecutableExists(logger)) {
        throw new Error(
          '[Whispry] Build completed but executable not found. Please check the build output for errors.'
        )
      }

      logger.log('[Whispry] Build completed successfully.')
    } else {
      logger.debug('[Whispry] whisper-cli executable found. Skipping build.')
    }

    return await whisperShell(command, defaultShellOptions, logger)
  } catch (error) {
    handleError(error as Error, logger)
    throw error
  }
}
