import path from 'node:path'
import { transcribe } from '../src/index'

// Basic usage example - standard model download and usage
const AUDIO_FILE = 'mother_teresa.wav'
const filePath = path.resolve(__dirname, AUDIO_FILE)

async function main() {
  console.log('=== Whispry Basic Example ===\n')

  try {
    console.log('Using standard model with auto-download...')

    await transcribe(filePath, {
      modelName: 'tiny.en',
      autoDownloadModelName: 'tiny.en',
      whisperOptions: {
        outputInText: true,
      },
    })

    console.log('✅ Basic transcription completed!')
    console.log('\n💡 This example demonstrates:')
    console.log('   - Automatic model download')
    console.log('   - Standard model usage')
    console.log('   - Text output generation')
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

void main()
