# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Add mandatory `Basic ` prefix to `"Authorization"` header (thanks to @michaelbaudino)

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
