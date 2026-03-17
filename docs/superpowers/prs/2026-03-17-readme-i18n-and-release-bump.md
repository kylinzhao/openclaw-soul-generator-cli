# PR Draft: README I18n And Release Bump

## Summary

- rewrite the primary README with a clearer, more playful lobster voice
- add localized README files for Chinese, Spanish, French, and Japanese with shared structure
- bump `openclaw-oh-my-soul` from `0.1.0` to `0.1.1` and include the localized README files in the published package

## Test Plan

- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] `npm pack --json`
- [x] publish the new npm version
