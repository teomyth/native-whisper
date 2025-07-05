import path from 'path'
import fs from 'fs'
import { MODELS_LIST, MODEL_OBJECT, WHISPER_CPP_PATH } from './constants'
import { IOptions } from '.'

// Get the correct executable path based on platform and build system
function getExecutablePath(): string {
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

export const constructCommand = (filePath: string, args: IOptions): string => {
	let errors: string[] = []
	let modelPath: string
	let modelArg: string

	// Check if model path is provided (absolute path)
	if (args.modelPath) {
		// Use model path - skip validation
		if (!fs.existsSync(args.modelPath)) {
			errors.push(`[Whispry] Error: Model file does not exist: ${args.modelPath}`)
		}
		modelPath = args.modelPath
		modelArg = args.modelPath
	}
	// Check if model directory + model name is provided
	else if (args.modelDir && args.modelName) {
		// Use model directory with model name
		const modelFile = MODEL_OBJECT[args.modelName as keyof typeof MODEL_OBJECT] || `${args.modelName}.bin`
		modelPath = path.join(args.modelDir, modelFile)

		if (!fs.existsSync(modelPath)) {
			errors.push(`[Whispry] Error: Model file does not exist in directory: ${modelPath}`)
		}
		modelArg = modelPath
	}
	// Use standard model validation
	else if (args.modelName) {
		if (!MODELS_LIST.includes(args.modelName)) {
			errors.push(`[Whispry] Error: Enter a valid model name. Available models are: ${MODELS_LIST.join(', ')}`)
		}

		modelPath = path.join(WHISPER_CPP_PATH, 'models', MODEL_OBJECT[args.modelName])
		if (!fs.existsSync(modelPath)) {
			errors.push(
				'[Whispry] Error: Model file does not exist. Please ensure the model is downloaded and correctly placed.'
			)
		}
		// Use relative model path from whisper.cpp directory for standard models
		modelArg = `./models/${MODEL_OBJECT[args.modelName as keyof typeof MODEL_OBJECT]}`
	}
	else {
		errors.push('[Whispry] Error: Provide model name, model path, or model directory with model name')
	}

	if (errors.length > 0) {
		throw new Error(errors.join('\n'))
	}

	// Get the actual executable path
	const executablePath = getExecutablePath()
	if (!executablePath) {
		throw new Error('[Whispry] Error: whisper-cli executable not found')
	}

	// Construct command with proper path escaping
	const escapeArg = (arg: string) => {
		if (process.platform === 'win32') {
			return `"${arg.replace(/"/g, '\\"')}"`
		}
		return `"${arg}"`
	}

	let command = `${escapeArg(executablePath)} ${constructOptionsFlags(args)} -l ${args.whisperOptions?.language || 'auto'} -m ${escapeArg(modelArg)} -f ${escapeArg(filePath)}`

	return command
}

const constructOptionsFlags = (args: IOptions): string => {
	let flags = [
		args.whisperOptions?.outputInCsv ? '-ocsv ' : '',
		args.whisperOptions?.outputInJson ? '-oj ' : '',
		args.whisperOptions?.outputInJsonFull ? '-ojf ' : '',
		args.whisperOptions?.outputInLrc ? '-olrc ' : '',
		args.whisperOptions?.outputInSrt ? '-osrt ' : '',
		args.whisperOptions?.outputInText ? '-otxt ' : '',
		args.whisperOptions?.outputInVtt ? '-ovtt ' : '',
		args.whisperOptions?.outputInWords ? '-owts ' : '',
		args.whisperOptions?.translateToEnglish ? '-tr ' : '',
		args.whisperOptions?.wordTimestamps ? '-ml 1 ' : '',
		args.whisperOptions?.timestamps_length ? `-ml ${args.whisperOptions.timestamps_length} ` : '',
		args.whisperOptions?.splitOnWord ? '-sow true ' : '',
	].join('')

	return flags.trim()
}
