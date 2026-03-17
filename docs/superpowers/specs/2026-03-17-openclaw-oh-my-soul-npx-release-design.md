# OpenClaw Oh My Soul npx Release Design

**Project Name:** OpenClaw Oh My Soul npx Release
**Date:** 2026-03-17
**Status:** Approved
**Version:** 1.0

## Overview

Ship the existing interactive CLI as a publishable npm package that users can run directly with `npx openclaw-oh-my-soul`.

The current codebase already has a working CLI entrypoint, build pipeline, and automated tests. This change focuses on release packaging, executable naming, and end-user documentation rather than new product behavior.

## Goals

- publish a non-private npm package
- expose the executable as `openclaw-oh-my-soul`
- keep the current interactive flow unchanged
- make help text and README match the published command
- add release-safe package metadata and prepublish verification

## Non-Goals

- redesign the prompt flow
- add subcommands
- rename internal backup directories or existing file formats

## Recommended Approach

Use a single publishable package whose npm name and CLI command are both `openclaw-oh-my-soul`.

This is the cleanest user experience because `npx` resolves package names first. Matching the package name and executable avoids extra instructions and keeps installation friction low.

## Technical Design

### Packaging

- rename the package in `package.json`
- remove `private: true`
- keep the existing `bin` launcher pattern, but rename the executable file and bin key
- add a `files` allowlist so the published tarball only contains runtime assets
- add `engines.node` and `prepublishOnly` to guard release quality

### CLI Copy

- update help output to use the new command name
- update localized help usage strings so every locale documents the same executable
- keep the product-facing title aligned with the new package name

### Validation

- add automated tests for package metadata and command naming
- run typecheck, unit tests, build, tarball creation, and a packed execution smoke test

## Risks and Mitigations

- npm package name may already be taken: validate with `npm view` before any real publish attempt
- build output may be missing from the tarball: verify with `npm pack --json`
- renamed executable may drift from help text: cover with tests
