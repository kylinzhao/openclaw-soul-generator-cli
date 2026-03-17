# CLI Lobster Personality Design

**Project Name:** OpenClaw Oh My Soul CLI Personality Refresh
**Date:** 2026-03-17
**Status:** Approved
**Version:** 1.0

## Overview

Give the CLI a stronger lobster personality without making it noisy, confusing, or unprofessional. The CLI should feel playful, welcoming, and a little mischievous, while still being easy to scan and safe to use for real work.

## Goals

- add a noticeable startup welcome card with ASCII art and a short lobster-flavored tagline
- make the full CLI voice consistently playful instead of only a few isolated prompts
- keep important actions, file paths, and risk-sensitive confirmations easy to read
- carry the tone through every supported locale

## Non-Goals

- redesign the wizard flow
- add new persona-generation features
- add heavy ANSI styling or terminal-only dependencies

## Recommended Approach

Adopt a `B+` tone system:

- first line says the action clearly
- second line adds the lobster personality with a short playful nudge
- emoji are used at key moments, not in every sentence

This keeps the interface charming without burying the meaning.

## Technical Design

### Welcome Experience

- render a compact ASCII welcome splash at CLI startup
- include the product name, a lobster mascot, and a short tagline
- keep the splash short enough to avoid pushing the first prompt too far down the terminal

### Prompt Tone

- keep existing question text as the clear main instruction
- add a short secondary line for personality and warmth
- update merge, finish, apply, and restore prompts to follow the same structure

### Help Output

- help output should include the branded welcome text
- usage and flags stay crisp and machine-scannable

### Testing

- add tests that lock the help banner and welcome splash shape
- add tests that verify prompt copy contains the new playful-but-clear structure
- keep existing end-to-end behavior tests passing

## Risks and Mitigations

- too much humor can hurt readability: keep important action words first
- ASCII art can overwhelm small terminals: keep width moderate and line count low
- localization can become awkward: prioritize natural phrasing over literal translation
