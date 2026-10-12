# Asset locations

- Served site images: `public/assets/images`. Unused video files have been removed.
- Subsidiary logos: `public/images/belgrass.jpeg`, `novex.jpeg`, and `bimex.jpeg`.
- Team portraits: `public/images/team`.
- Source images used to regenerate live variants: `asset-sources/originals` (ignored by Git). Video poster frames are retained as JPEG sources; their original videos and extraction cache have been removed.

The former `media` and `public/media` directories have been moved. The application and asset generation script no longer depend on them. Historical review documents and reports retain their original paths.

Run `npm run media:optimize` to regenerate only the live image variants and `src/content/media.ts`. This requires the retained image originals and Sharp. The script preserves slot mappings and will not recreate removed videos or unused assets. If using `NEXT_PUBLIC_MEDIA_BASE_URL`, upload `public/assets` under `/assets` on that CDN.
