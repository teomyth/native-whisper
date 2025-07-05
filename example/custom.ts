import path from 'node:path'
import { transcribe } from '../src/index'

// Custom model directory example
const AUDIO_FILE = 'mother_teresa.wav'
const filePath = path.resolve(__dirname, AUDIO_FILE)

async function main() {
  console.log('=== Whispry Custom Directory Example ===\n')

  try {
    const customModelDir = path.join(__dirname, '..', '.models')

    console.log('Downloading and using model in custom directory...')
    console.log(`Custom directory: ${customModelDir}`)

    await transcribe(filePath, {
      modelName: 'tiny.en',
      autoDownloadModelName: 'tiny.en',
      modelDir: customModelDir, // Custom directory for model storage
      whisperOptions: {
        outputInText: true,
      },
    })

    console.log('✅ Custom directory transcription completed!')
    console.log('\n💡 This example demonstrates:')
    console.log('   - Custom model directory usage')
    console.log('   - Automatic directory creation')
    console.log('   - Model download to custom location')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

void main()
