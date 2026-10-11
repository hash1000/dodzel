# Asset locations

- Served images and videos: `public/assets/images` and `public/assets/videos`.
- Subsidiary logos: `public/images/belgrass.jpeg`, `novex.jpeg`, and `bimex.jpeg`.
- Team portraits: `public/images/team`.
- Original source files and generation cache: `asset-sources/originals` and `asset-sources/.cache` (ignored by Git).

The former `media` and `public/media` directories have been moved. The application and asset generation script no longer depend on them. Historical review documents and reports retain their original paths.

Run `npm run media:optimize` to regenerate the image variants, video renditions, and `src/content/media.ts`. This requires the retained originals, Sharp, FFmpeg, and FFprobe. If using `NEXT_PUBLIC_MEDIA_BASE_URL`, upload `public/assets` under `/assets` on that CDN.
