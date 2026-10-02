# Dodzel Engineering

Next.js 16 public frontend for Dodzel Engineering Limited. The homepage includes twelve sections, responsive navigation, supporting pages and an RFQ validation preview. Sanity schemas and the embedded Studio remain untouched; the public site uses local content files.

```sh
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Company facts from the Phase 2 brief live in `src/content/real.ts`, with source attribution and CONFIRM flags. Unfinished content lives in `src/content/placeholder.ts`, with TODO flags. `SHOW_TODO_BADGES` in `src/lib/constants.ts` controls both kinds of badge.

Design tokens are in `src/app/globals.css`. Saira at semi-condensed 87.5% width (variable weights 500–700) and IBM Plex Sans (400/500/600) are bundled with their licenses using `next/font/local`. Font aliases are `--font-display` and `--font-text`; IBM Plex Sans Arabic is reserved for the future RTL locale.

The RFQ form validates only. It sends no email and stores no request or attachment. The server action logs a minimal validation event and retains a TODO for delivery integration.

See [PHASE2_HANDOFF.md](PHASE2_HANDOFF.md) for the changed-file list, Issue-overlay diagnosis, client questions, implementation decisions and validation results.
