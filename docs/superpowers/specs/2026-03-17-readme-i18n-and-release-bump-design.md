# README I18n And Release Bump Design

**Project Name:** OpenClaw Oh My Soul README Localization
**Date:** 2026-03-17
**Status:** Approved
**Version:** 1.0

## Overview

Turn the current single-language README into a multilingual, personality-rich project front page and ship the updated docs in a new npm release so `npx` users see the refreshed package version immediately.

## Goals

- keep one canonical `README.md` in English
- add four localized README files for Chinese, Spanish, French, and Japanese
- give every README a playful lobster voice without sacrificing fast scanning
- add explicit language navigation links across all README files
- bump the npm package version and republish after verification

## Non-Goals

- localize every file in the repository
- create separate docs sites
- change the CLI feature set

## Recommended Approach

Use a hub-and-spoke README layout:

- `README.md` as the main landing page
- `README.zh-CN.md`, `README.es.md`, `README.fr.md`, `README.ja.md` as peers
- each README shares the same information architecture and command examples
- the copy is adapted per language rather than translated literally

## Content Design

Each README should include:

- short tagline with personality
- quick explanation of what the tool generates
- fast-start `npx` commands
- reasons the tool is fun and useful
- language support
- development commands
- links back to the repo and the other languages

The tone should feel witty, warm, and a bit theatrical, but commands and file names stay plain and scannable.

## Release Design

- bump the package version from `0.1.0` to the next patch release
- publish the refreshed docs in that release
- verify the package still builds, tests, and packs cleanly before publishing
