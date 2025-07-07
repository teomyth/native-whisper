# nwhisper

Native Node.js bindings for OpenAI's Whisper using whisper.cpp. High-performance local speech-to-text with custom model path support.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Features

-   **Custom Model Path Support**: Use your own trained models by providing a custom model file path
-   Automatically convert the audio to WAV format with a 16000 Hz frequency to support the whisper model.
-   Output transcripts to (.txt .srt .vtt .json .wts .lrc)
-   Optimized for CPU (Including Apple Silicon ARM)
-   Timestamp precision to single word
-   Split on word rather than on token (Optional)
-   Translate from source language to english (Optional)
-   Convert audio format to wav to support whisper model
-   Backward compatible with nodejs-whisper

## Installation

1. Install make tools

```bash
sudo apt update
sudo apt install build-essential
```

2. Install nwhisper with npm

```bash
  npm i nwhisper
```

3. Download whisper model (for standard models)

```bash
  npx nwhisper download
```

-   NOTE: user may need to install make tool

### Windows Installation

1. Install MinGW-w64 or MSYS2 (which includes make tools)
   - Option 1: Install MSYS2 from https://www.msys2.org/
   - Option 2: Install MinGW-w64 from https://www.mingw-w64.org/

2. Install nwhisper with npm
```bash
npm i nwhisper
```

3. Download whisper model (for standard models)
```bash
npx nwhisper download
```

- Note: Make sure mingw32-make or make is available in your system PATH.

## Usage/Examples

See `example/basic.ts` (can be run with `$ npm run example`)

```javascript
import path from 'path'
import { transcribe } from 'nwhisper'

// Need to provide exact path to your audio file.
const filePath = path.resolve(__dirname, 'YourAudioFileName')

// Using standard model
await transcribe(filePath, {
  modelName: 'base.en', //Downloaded models name
  autoDownloadModelName: 'base.en', // (optional) auto download a model if model is not present
  removeWavFileAfterTranscription: false, // (optional) remove wav file once transcribed
  withCuda: false, // (optional) use cuda for faster processing
  logger: console, // (optional) Logging instance, defaults to console
  whisperOptions: {
    outputInCsv: false, // get output result in csv file
    outputInJson: false, // get output result in json file
    outputInJsonFull: false, // get output result in json file including more information
    outputInLrc: false, // get output result in lrc file
    outputInSrt: true, // get output result in srt file
    outputInText: false, // get output result in txt file
    outputInVtt: false, // get output result in vtt file
    outputInWords: false, // get output result in wts file for karaoke
    translateToEnglish: false, // translate from source language to english
    wordTimestamps: false, // word-level timestamps
    timestamps_length: 20, // amount of dialogue per timestamp pair
    splitOnWord: true, // split on word rather than on token
  },
})

// Using custom models (NEW FEATURES)
// Method 1: Specify model directory
const modelDir = path.join(process.cwd(), '.models')
await transcribe(filePath, {
  modelName: 'tiny.en',
  modelDir: modelDir,
  whisperOptions: {
    outputInSrt: true,
  },
})

// Method 2: Direct file path
const modelPath = path.join(__dirname, 'models', 'my-custom-model.bin')
await transcribe(filePath, {
  modelPath: modelPath,
  whisperOptions: {
    outputInSrt: true,
    language: 'en',
  },
})

// Method 3: Download to and use custom directory
await transcribe(filePath, {
  modelName: 'tiny.en',
  autoDownloadModelName: 'tiny.en',
  modelDir: path.join(__dirname, 'models'), // Download to and use this directory
  whisperOptions: {
    outputInSrt: true,
  },
})

// Model list
const MODELS_LIST = [
  'tiny',
  'tiny.en',
  'base',
  'base.en',
  'small',
  'small.en',
  'medium',
  'medium.en',
  'large-v1',
  'large',
  'large-v3-turbo',
]
```

## Types

```
 interface IOptions {
  modelName?: string // Model name (works with directories)
  modelPath?: string // NEW: Direct path to model file
  modelDir?: string // NEW: Directory for models (download & use)
  autoDownloadModelName?: string // Model to auto-download
  removeWavFileAfterTranscription?: boolean
  withCuda?: boolean
  whisperOptions?: WhisperOptions
  logger?: Console
}

 interface WhisperOptions {
  outputInCsv?: boolean
  outputInJson?: boolean
  outputInJsonFull?: boolean
  outputInLrc?: boolean
  outputInSrt?: boolean
  outputInText?: boolean
  outputInVtt?: boolean
  outputInWords?: boolean
  translateToEnglish?: boolean
  timestamps_length?: number
  wordTimestamps?: boolean
  splitOnWord?: boolean
}

```

## Custom Model Path Usage

The main feature of nwhisper is the ability to use custom model files. This is useful when you have:
- Fine-tuned models for specific domains
- Custom trained models
- Models in different locations than the default

### Example with Custom Model

```javascript
import { transcribe } from 'nwhisper'
import path from 'path'

// Method 1: Specify model directory
const modelDir = path.join(process.cwd(), '.models')
const result = await transcribe('audio.wav', {
  modelName: 'tiny.en',
  modelDir: modelDir,
  whisperOptions: {
    outputInSrt: true,
    language: 'en'
  }
})

// Method 2: Direct file path
const modelPath = path.join(__dirname, 'models', 'my-custom-model.bin')
const result2 = await transcribe('audio.wav', {
  modelPath: modelPath,
  whisperOptions: {
    outputInSrt: true,
    language: 'auto'
  }
})

// Method 3: Download to and use custom directory
const result3 = await transcribe('audio.wav', {
  modelName: 'tiny.en',
  autoDownloadModelName: 'tiny.en',
  modelDir: modelDir, // Download to and use this directory
  whisperOptions: {
    outputInSrt: true,
    language: 'auto'
  }
})
```

### Model Priority

1. **modelPath** - Direct file path (highest priority)
2. **modelDir + modelName** - Model directory with model name
3. **Standard directory** - Default whisper.cpp models (fallback)

### Important Notes

- `modelDir` serves dual purpose: download location and model location
- When `modelDir` is specified, models are downloaded to and used from that directory
- Model files should follow whisper.cpp naming (e.g., `ggml-tiny.en.bin`)
- Models must be compatible with whisper.cpp format

## Migration from nodejs-whisper

nwhisper is fully backward compatible with nodejs-whisper. Simply replace the package:

```bash
# Remove old package
npm uninstall nodejs-whisper

# Install nwhisper
npm install nwhisper
```

### Function Names

- **Recommended**: Use `transcribe` function for new code
- **Legacy**: `nodewhisper` function is still available but deprecated

```javascript
// New (recommended)
import { transcribe } from 'nwhisper'
await transcribe('audio.wav', { modelName: 'tiny.en' })

// Legacy (deprecated but still works)
import { nodewhisper } from 'nwhisper'
await nodewhisper('audio.wav', { modelName: 'tiny.en' })
```

No code changes required for existing functionality!

## Run locally

Clone the project

```bash
  git clone https://github.com/teomyth/nwhisper
```

Go to the project directory

```bash
  cd nwhisper
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Build project

```bash
  npm run build
```

## Made with

-   [Whisper OpenAI (using C++ port by: ggerganov)](https://github.com/ggerganov/whisper.cpp)

## Feedback

If you have any feedback, please reach out to us at teomyth@gmail.com

## Authors

-   [@teomyth](https://www.github.com/teomyth) - Current maintainer

## Acknowledgments

This project is a fork of [nodejs-whisper](https://github.com/ChetanXpro/nodejs-whisper) by [@chetanXpro](https://www.github.com/chetanXpro). We extend our gratitude to the original author for creating the foundation that made nwhisper possible.

### Original Project
- **Original Author**: [@chetanXpro](https://www.github.com/chetanXpro)
- **Original Repository**: [nodejs-whisper](https://github.com/ChetanXpro/nodejs-whisper)
- **License**: MIT
