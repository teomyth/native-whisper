# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## 0.3.0 (2025-07-07)

### ⚠ BREAKING CHANGES

* Package name changed from 'whispry' to 'native-whisper'

### ✨ Features

* add autodownload feature ([ebd7229](https://github.com/teomyth/nwhisper/commit/ebd722988940877db3cedd2ec464f56c0ccc01b5))
* add custom model directory support ([d666f8e](https://github.com/teomyth/nwhisper/commit/d666f8e943ee51d197ba95eec887ef4479beae3f))
* add ffmpeg static ([c4ede80](https://github.com/teomyth/nwhisper/commit/c4ede80ef8105499be54df087bc3178eca2e1949))
* add function to download models directly ([5cc6624](https://github.com/teomyth/nwhisper/commit/5cc66243ed82b5e086f72ba0fd9bb960e878dbd7))
* add modelsname check and logs ([8f5c8bf](https://github.com/teomyth/nwhisper/commit/8f5c8bf48bdb33c248f3a44db7202284e459df5e))
* add support for CUDA compilation in autoDownloadModel and downloadModel functions ([1dbe0e3](https://github.com/teomyth/nwhisper/commit/1dbe0e34b33b8f06d42e0f32ed769fc840f1fd61))
* add validation and some default values ([f3528aa](https://github.com/teomyth/nwhisper/commit/f3528aa6044e98eb452c1aceab41c9a25b3cf349))
* add verbose mode and removeWavFileAfterTranscriptin flag ([e6f1daa](https://github.com/teomyth/nwhisper/commit/e6f1daa3712f2d5d9ce5713fc6d67cbf8066ec52))
* add workflow for code formatting and fix npx command download issue ([2480c0f](https://github.com/teomyth/nwhisper/commit/2480c0f4a0ed29179fbe8b9c7a22e963b2e4eb38))
* better error handling and messages ([77dc3ab](https://github.com/teomyth/nwhisper/commit/77dc3ab407add6b6627afb9c54d9de42bfb366e6))
* configure release-it to filter build system commits from changelog ([6607bf7](https://github.com/teomyth/nwhisper/commit/6607bf7083419dc473fe0327bdd2974d75d5ab14))
* migrate to Biome and optimize project structure ([581f80e](https://github.com/teomyth/nwhisper/commit/581f80e8a43def299bcd7d0205f7ba2aa4a4c564))
* rename package from native-whisper to nwhisper ([9e323ef](https://github.com/teomyth/nwhisper/commit/9e323ef07ad7d2b82404c401a1b4bc87d9a41708))
* rename project from whispry to native-whisper ([4d8e455](https://github.com/teomyth/nwhisper/commit/4d8e45567e715a71ef4a40d0d2e71936aa05a627))
* update changelog ([0dc1441](https://github.com/teomyth/nwhisper/commit/0dc1441ba94489812568ad799c3dde55a8070afa))
* update changelogs ([7c053cd](https://github.com/teomyth/nwhisper/commit/7c053cdf53fd7b2992d2e4cf99936d3e82f34c9d))
* update CI workflow to include write permissions and use GITHUB_TOKEN ([b2d237b](https://github.com/teomyth/nwhisper/commit/b2d237b9eb517361840eadc0b58fd7028df963f6))
* update readme ([65371e3](https://github.com/teomyth/nwhisper/commit/65371e3f2e1af16f8405a873d402f88f99c9b102))

### 🐛 Bug Fixes

* add missing downloadModel function call for CLI command ([#195](https://github.com/teomyth/nwhisper/issues/195)) ([99053be](https://github.com/teomyth/nwhisper/commit/99053be924321bc2525c9ad72bb6de53ed3d48b3))
* console usage consistency ([#198](https://github.com/teomyth/nwhisper/issues/198)) ([78d7abf](https://github.com/teomyth/nwhisper/commit/78d7abf069a62c73599933cce66cf055754cc9d1))
* Current directory remains to be whisper.cpp ([fec5527](https://github.com/teomyth/nwhisper/commit/fec552731520194ec561b2a812733fa938e65ba3))
* disable default removing WAV files after transcription ([1cd25ed](https://github.com/teomyth/nwhisper/commit/1cd25ed6a49e44b1505cdfad9dc7603f6f8d4f25))
* ensure models run using correct binary paths ([3e23840](https://github.com/teomyth/nwhisper/commit/3e23840306c6d5174d418280e4300997cde4d5d4))
* handling of mislabeled WAV files with non-WAV content ([12d9ec8](https://github.com/teomyth/nwhisper/commit/12d9ec873e26f2bf6f5664d4e547f36cb65c7c0b))
* improve model download with custom directory support ([12b61c7](https://github.com/teomyth/nwhisper/commit/12b61c7194322e9c489ab4829cc654c5c554f9ba))
* improve WAV validation to check sample rate requirements ([#199](https://github.com/teomyth/nwhisper/issues/199)) ([96dc063](https://github.com/teomyth/nwhisper/commit/96dc063721ec96974ae6635a875f5b96b0d837d8)), closes [#113](https://github.com/teomyth/nwhisper/issues/113)
* incorrect model path ([2af6b86](https://github.com/teomyth/nwhisper/commit/2af6b8615d0b96a923b68e5bba0bf182d6d2d7fc))
* logger interface flexibility ([#197](https://github.com/teomyth/nwhisper/issues/197)) ([187644c](https://github.com/teomyth/nwhisper/commit/187644cf2266bcaab019ae5c794fdc3e04c02c67)), closes [#158](https://github.com/teomyth/nwhisper/issues/158)
* remove trailing space, this makes command unexecutable on macos ([9dfdc11](https://github.com/teomyth/nwhisper/commit/9dfdc11087824a335b788f92b91306a62dc6cf3c))
* remove useless dependencies ([8fc0a73](https://github.com/teomyth/nwhisper/commit/8fc0a73b5a53f8b6e3fb43263dfe48f2015a297a))
* restore original CHANGELOG.md from upstream project ([424202a](https://github.com/teomyth/nwhisper/commit/424202a63a5905d2c89d790b009c0fb77bd98f1b))
* update command construction to use quotes for file path ([0177dd1](https://github.com/teomyth/nwhisper/commit/0177dd1535fd86a5ecd44352fad67df3a66a3420))
* update GitHub Actions workflows and test scripts ([addfc2e](https://github.com/teomyth/nwhisper/commit/addfc2e52eaefb3f9f4ab23c451cbcc2481b2114))
* update remaining references and rebuild dist files ([f00d6fb](https://github.com/teomyth/nwhisper/commit/f00d6fb2216a7484eea36d147c0e971a39f7d716))
* whisper command error handling ([38ed2de](https://github.com/teomyth/nwhisper/commit/38ed2de18685a89658deeb8d67b7f3998b66ba38))
* Windows special build path ([2b74795](https://github.com/teomyth/nwhisper/commit/2b747959a9fcdf581eebc705fe6bc7c5ad7ee209))

### ♻️ Code Refactoring

* reorganize example structure ([8636300](https://github.com/teomyth/nwhisper/commit/863630057c5dbfe7108a5b5897a9ccfb9dc9ce8f))
* reorganize examples and improve directory handling ([eb8aea9](https://github.com/teomyth/nwhisper/commit/eb8aea91938af56d14801ab839f2e0b8bc646a9c))
* reorganize package.json fields in standard order ([d40f030](https://github.com/teomyth/nwhisper/commit/d40f0301483b4d47e2f8c297e323c22e34ebb484))

### 📚 Documentation

* add CHANGELOG.md for version tracking ([#196](https://github.com/teomyth/nwhisper/issues/196)) ([436f8da](https://github.com/teomyth/nwhisper/commit/436f8dacab44617a7999d12dfc19517db4759d10))
* add Windows installation instructions to README ([3c38e16](https://github.com/teomyth/nwhisper/commit/3c38e16444f219e508785c5bf7d85e95a72f3118))
* update author information and LICENSE copyright ([0a415b9](https://github.com/teomyth/nwhisper/commit/0a415b925cabd46b708a8d142353210949c13799))
* update README with new features and examples ([32d00ec](https://github.com/teomyth/nwhisper/commit/32d00ec1f78ae49e8dcd677868efc6086ec26f8f))

### 💎 Styles

* format code with biome ([bdcdc05](https://github.com/teomyth/nwhisper/commit/bdcdc05682581e84d24ba50d9b673b72f26f9de5))
* format code with prettier ([d5432fb](https://github.com/teomyth/nwhisper/commit/d5432fb22e58c5e9b09a327902da79b0d2e2d254))

### 🧪 Tests

* use tiny.en model to speed up download ([961be12](https://github.com/teomyth/nwhisper/commit/961be12f776f3c73f77f12ef4064b96f3454feab))

### 👷 CI/CD

* Add integration tests ([8c5c50c](https://github.com/teomyth/nwhisper/commit/8c5c50cac6d05e15f08456ebeec2d626e246bf86))
* fix Biome installation issues in GitHub Actions ([de40e36](https://github.com/teomyth/nwhisper/commit/de40e3663e934ce510cfacdf5727e626ebf14ee2))
* Fix formatting checks for external contributors ([dbb8f09](https://github.com/teomyth/nwhisper/commit/dbb8f09c52a57c0fb919ecdaa88419e2904042d9))
* update workflows for Node.js version and add build step; enhance error handling in examples ([580a365](https://github.com/teomyth/nwhisper/commit/580a36554f0028a8832ba598932921e33659826a))

### 🔧 Chores

* clean up project structure and optimize package.json ([25868a6](https://github.com/teomyth/nwhisper/commit/25868a69722dc5782c0efd965d01a02717bb57f4))
* exclude test and bindings folders from whisper cpp package ([36af8e8](https://github.com/teomyth/nwhisper/commit/36af8e806a476d53ce684d466a2ebebb111c940b))
* npm run format ([ba8e4ae](https://github.com/teomyth/nwhisper/commit/ba8e4aea714f760824727d9efaf824de2a3fe82d))
* remove .npmignore and update package.json to include only necessary files ([71321de](https://github.com/teomyth/nwhisper/commit/71321de404435cef22ef8a942738149c44ab10bf))
* update gitignore and changelog ([ed2faf8](https://github.com/teomyth/nwhisper/commit/ed2faf83412e6e22052640591802d17fa71e168a))
* update package configuration and remove generated files ([db6e979](https://github.com/teomyth/nwhisper/commit/db6e9797b76df88b668104bbe2100022ce24b3d4))
* update whisper shell logging and error handling ([75c24e1](https://github.com/teomyth/nwhisper/commit/75c24e1e3222bbddb20a490df4bbe54db0160054))
* update WhisperHelper.ts to include language option in constructCommand function ([46fd9ae](https://github.com/teomyth/nwhisper/commit/46fd9aedaae8f9790d2c4e69eae8b1dd2232ec6d))

## [Unreleased]

### Added

- Nothing yet

### Changed

- Nothing yet

### Fixed

- Nothing yet

---

## [0.2.9] - 2025-05-15

### Fixed

- Fixed CLI download command not executing (missing function call)
- `npx nodejs-whisper download` now works as expected
- Fixed restrictive Console logger type that didn't work with popular loggers like Pino, Winston ([#158](https://github.com/ChetanXpro/nodejs-whisper/issues/158))
- Fixed inconsistent console usage in downloadModel.ts, now properly uses logger parameter ([#157](https://github.com/ChetanXpro/nodejs-whisper/issues/157))
- Fixed WAV validation that incorrectly reported non-16kHz files as valid ([#113](https://github.com/ChetanXpro/nodejs-whisper/issues/113))
- WAV files with incorrect sample rates are now automatically converted to 16kHz
- Eliminates "WAV file must be 16 kHz" errors from whisper.cpp

### Changed

- Replaced Console type with flexible Logger interface for better logger compatibility
- Updated all internal logging to use logger parameter instead of direct console calls

### Added

- Added CHANGELOG.md for version tracking

## [0.2.7] - 2025-05-15

### Fixed

- Fixed Windows build failures by migrating from make to CMake build system ([#185](https://github.com/ChetanXpro/nodejs-whisper/issues/185))
- Fixed "WHISPER_CUDA unknown on Windows" error ([#193](https://github.com/ChetanXpro/nodejs-whisper/issues/193))
- Fixed Windows executable detection issues ([#163](https://github.com/ChetanXpro/nodejs-whisper/issues/163))
- Improved cross-platform compatibility for Windows, macOS, and Linux builds

### Changed

- **BREAKING**: Migrated from Makefile-based builds to CMake as primary build system
- Replaced make/mingw32-make commands with `cmake --build` for better Windows support
- Updated CUDA compilation to use `-DGGML_CUDA=1` instead of environment variables
- Improved executable path detection for CMake output structure

### Technical Details

- Added support for Visual Studio, MinGW, and other Windows compilers
- Enhanced build detection to avoid unnecessary rebuilds
- Better error messages for build failures

## [0.2.6] - 2024-XX-XX

### Note

- Previous versions before changelog was maintained
- Major Windows compatibility improvements started with 0.2.7

---

## Links

- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [GitHub Releases](https://github.com/ChetanXpro/nodejs-whisper/releases) - 2024-01-06

### ✨ Features

- Migrate to Biome for faster formatting and linting
- Add strong typing with ModelName type for better type safety
- Modernize imports to use Node.js protocol (node:fs, node:path)
- Add EditorConfig and VS Code configuration for better development experience

### ♻️ Code Refactoring

- Replace Prettier with Biome (35x faster performance)
- Update to 2-space indentation and modern code style
- Upgrade TypeScript config with strict mode and ES2020 target
- Fix all TypeScript strict mode errors

### 🏗️ Build System

- Update CI/CD workflow to use Biome
- Add comprehensive linting rules and code quality checks
- Add development scripts for formatting, linting, and checking

### 📚 Documentation

- Improve code quality with better type definitions
- Add comprehensive development tooling documentation
