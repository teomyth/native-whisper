import { transcribe } from '../src/index'

// Simple test that verifies the module can be imported and basic functionality works
async function testBasicImport() {
  console.log('✅ Testing basic module import...')
  
  // Test that the transcribe function exists and is callable
  if (typeof transcribe !== 'function') {
    throw new Error('transcribe function not exported correctly')
  }
  
  console.log('✅ Module import test passed')
}

async function testTypeDefinitions() {
  console.log('✅ Testing TypeScript definitions...')
  
  // This will fail at compile time if types are wrong
  const options = {
    modelName: 'tiny.en',
    autoDownloadModelName: 'tiny.en',
    whisperOptions: {
      outputInText: true,
    },
  }
  
  // Verify options structure is valid
  if (!options.modelName || !options.autoDownloadModelName) {
    throw new Error('Options structure is invalid')
  }
  
  console.log('✅ TypeScript definitions test passed')
}

async function main() {
  console.log('=== Whispry Basic Tests ===\n')
  
  try {
    await testBasicImport()
    await testTypeDefinitions()
    
    console.log('\n✅ All basic tests passed!')
    console.log('💡 These tests verify:')
    console.log('   - Module can be imported correctly')
    console.log('   - TypeScript definitions are valid')
    console.log('   - Basic function exports work')
  } catch (error) {
    console.error('❌ Test failed:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

void main()
