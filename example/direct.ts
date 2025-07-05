import fs from 'node:fs'
import path from 'node:path'
import { transcribe } from '../src/index'

// Direct model path example
const AUDIO_FILE = 'mother_teresa.wav'
const filePath = path.resolve(__dirname, AUDIO_FILE)

async function main() {
  console.log('=== Whispry Direct Path Example ===\n')

  try {
    // Check if model exists in custom directory
    const modelPath = path.join(__dirname, '..', '.models', 'ggml-tiny.en.bin')

    if (!fs.existsSync(modelPath)) {
      console.log('⚠️  Model not found at:', modelPath)
      console.log('💡 Please run "npm run example:custom" first to download the model')
      process.exit(1)
    }

    console.log('Using direct model path...')
    console.log(`Model path: ${modelPath}`)

    await transcribe(filePath, {
      modelPath: modelPath, // Direct path to model file
      whisperOptions: {
        outputInText: true,
      },
    })

    console.log('✅ Direct path transcription completed!')
    console.log('\n💡 This example demonstrates:')
    console.log('   - Direct model file path usage')
    console.log('   - No automatic download needed')
    console.log('   - Maximum control over model location')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

void main()
