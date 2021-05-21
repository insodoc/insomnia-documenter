# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.5.1 - 2021-05-21
## Changed
- upgraded some dependencies (@devhammed)

## Fixed
- body parser failing on invalid JSON

## 0.5.0 - 2021-05-14
## Changed
- example response format (@devhammed)

## Fixed
- highlight.js not working
- env vars with underscore format (@devhammed)

## 0.4.4 - 2020-12-06
### Fixed
- Escaping in Python generator (thanks to @Psychokiller1888)
- Escaping in curl generator (thanks to @Psychokiller1888)
- Handle empty body values (thanks to @Psychokiller1888)
- Handle empty header values (thanks to @Psychokiller1888)

### Changed
- Bumped highlight.js to 10.4.1

## 0.4.3 - 2020-10-05
### Added
- Table of Contents in the README
- Notice about the [Insomnia Plugin](https://insomnia.rest/plugins/insomnia-plugin-documenter) by @devhammed

### Changed
- UI/UX: Highlight variables and implement example toggle button (thanks @macjuul)

## 0.4.1 - 2020-08-09
### Fixed
- Rendering error when the example response is empty or null.

## 0.4.0 - 2020-06-30
### Changed
- Node.js example uses now fetch too
- You can now specify multiple example responses with status code support

### Fixed
- Basic HTTP auth header generation (@michaelbaudino)

## 0.3.4 - 2020-05-30
### Changed
- Use short options in curl (@ZeProf2Code)
- Updated dependencies

### Fixed
- Horizontal scrolling in code example

## 0.3.3 - 2020-04-06
### Changed
- Upgraded dependencies to resolve security vulnerabilities

### Fixed
- applyEnv regex error (@dingyaguang117)
- Request order (@dingyaguang117)
- applyEnv not replacing in every field (@aravindps)

## 0.3.2 - 2020-01-09
### Added
- Tutorial and demo video in the README
- [Security notice](https://github.com/jozsefsallai/insomnia-documenter/blob/master/SECURITY.md)
- Notice about enterprise support through [Tidelift](https://tidelift.com/subscription/pkg/npm-insomnia-documenter?utm_source=npm-insomnia-documenter&utm_medium=referral&utm_campaign=enterprise&utm_term=repo) in the README

### Changed
- Upgraded devdependencies

### Fixed
- Logo not showing up when the documenter is not at root-level

## 0.3.1 - 2020-01-04
### Added
- Support for descriptions in headers, body, and parameters

## 0.3.0 - 2019-12-16
### Added
- Experimental support for example responses
- Markdown table support (thanks to @motaghifar)

### Fixed
- Check if URL exists before trying to retrieve cookies (thanks to @farzeni)

## 0.2.1 - 2019-10-06
### Added
- Insomnia Documenter logo
- Info about running the page locally in the README

### Changed
- Updated programming language dropdown
- Switched to FontAwesome v4.7.0
- Improved performance of sidebar folder opening

### Fixed
- Overflowing text breaking the entire layout

## 0.2.0 - 2019-09-20

### Added
- Run-in-Insomnia button ([#1](https://github.com/jozsefsallai/insomnia-documenter/issues/1)).
- `data-root` property for `<div id="root">` to change the location from which the Insomnia configuration will be loaded.
- Error page if the config file cannot be loaded.
- Changelog!

### Changed
- Removed forward slashes from static asset declarations in the HTML file (making it even more portable).
- Header is less cluttery now.

## 0.1.5 - 2019-09-19
First public version.
