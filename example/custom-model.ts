import path from 'node:path'
import { transcribe } from '../src/index'

// Example demonstrating custom model features
const AUDIO_FILE = 'mother_teresa.wav'
const filePath = path.resolve(__dirname, AUDIO_FILE)

async function main() {
	console.log('=== Whispry Custom Model Examples ===\n')

	try {
		// Example 1: Standard approach (backward compatible)
		console.log('Example 1: Standard model name')
		await transcribe(filePath, {
			modelName: 'tiny.en',
			autoDownloadModelName: 'tiny.en',
			whisperOptions: {
				outputInText: true,
			},
		})
		console.log('✅ Standard model completed\n')

		// Example 2: Using custom model directory
		console.log('Example 2: Using custom model directory')
		const fs = require('fs')
		const exampleModelsDir = path.join(__dirname, '.models')
		const exampleModelFile = path.join(exampleModelsDir, 'ggml-tiny.en.bin')

		// Create example models directory for demonstration
		if (!fs.existsSync(exampleModelsDir)) {
			fs.mkdirSync(exampleModelsDir, { recursive: true })
			console.log('📁 Created example .models directory')
		}

		if (fs.existsSync(exampleModelFile)) {
			console.log('✅ Found model in example .models directory')
			await transcribe(filePath, {
				modelName: 'tiny.en',
				modelDir: exampleModelsDir,  // Explicitly specify directory
				whisperOptions: {
					outputInText: true,
				},
			})
			console.log('✅ Custom directory model completed')
		} else {
			console.log('⚠️  No model in example .models directory')
			console.log(`💡 You can copy a model to: ${exampleModelFile}`)
			console.log('💡 Or download directly to this directory using downloadDir option')
		}

		// Example 3: Download to custom directory
		console.log('\nExample 3: Download to custom directory')
		await transcribe(filePath, {
			modelName: 'tiny.en',
			autoDownloadModelName: 'tiny.en',
			modelDir: exampleModelsDir,  // Download to and use this directory
			whisperOptions: {
				outputInText: true,
			},
		})
		console.log('✅ Download to custom directory completed')

		// Example 4: Direct file path
		console.log('\nExample 4: Direct file path')
		const directPath = path.join(exampleModelsDir, 'ggml-tiny.en.bin')
		if (fs.existsSync(directPath)) {
			await transcribe(filePath, {
				modelPath: directPath,  // Direct path to file
				whisperOptions: {
					outputInText: true,
				},
			})
			console.log('✅ Direct path approach completed')
		} else {
			console.log('⚠️  Direct path model not found')
		}

		console.log('\n📝 Summary of approaches:')
		console.log('   1. modelName: "tiny.en" - uses standard models')
		console.log('   2. modelName + modelDir - specify directory (also downloads here)')
		console.log('   3. modelPath - direct file path')
		console.log('\n💡 Priority: modelPath > modelDir + modelName > standard')
		console.log('💡 modelDir serves dual purpose: download location and model location')

	} catch (error) {
		console.error('❌ Error:', error.message)
		process.exit(1)
	}
}

void main()
