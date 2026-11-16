# Repository Guidance

- Preserve the existing React/TypeScript app structure and dependencies; avoid unrelated refactors.
- This is a Persian/Farsi RTL application. Preserve RTL behavior and existing localization conventions.
- Keep features in their existing areas: API/query code in `app/api/`, shared UI in `app/components/`, cart state in `app/stores/`, and global styles/tokens in `app/styles/`.
- Use PNPM. `pnpm lint` applies fixes; `pnpm ci:validate` runs formatting, lint, type-check, and build.
- Follow applicable guidance in `.github/instructions/` and `.github/skills/`; don’t duplicate it here.
