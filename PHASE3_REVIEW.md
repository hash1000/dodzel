# Phase 3 review

## Contrast

| Text / background | Ratio |
|---|---|
| on-dark / surface-dark | 15.39:1 |
| on-dark-muted / surface-dark | 10.66:1 |
| on-dark-muted / surface-raised | 9.00:1 |
| surface-dark / accent | 7.47:1 |
| ink / paper | 14.00:1 |
| muted / surface | 6.40:1 |
| accent-2 / paper | 5.46:1 |
| brand-red / surface | 7.00:1 |
| focus / paper | 7.63:1 |
| accent / surface-dark | 7.47:1 |
| Muted hero text / 86% blue scrim over white (worst case) | 6.92:1 |

## Media

23 originals: 11 JPG photos and 12 MP4 videos. See MEDIA_INVENTORY.json for every filename and byte size, src/content/media.ts for all slot mappings, and public/placeholder/CREDITS.md for provenance status. Originals moved to git-ignored content/originals/. Optimized WebP photos are below 400 KB; hero video is a silent 12-second, 1280px refinery excerpt with MP4, WebM and WebP poster.

Unassigned: five numerically named MP4 files and pexels-joseph-russo-430180075-29590119.jpg (subject not confirmed), plus alternate pipe-rack1.jpg. Named non-refinery videos retained as originals; still images used where a matching photo exists. Electrical & Instrumentation, Maintenance and Plan & Procure have no matching confirmed image, so keep placeholders.

## Client review

- Offshore and Maintenance descriptions; all service bullets and sector applicability.
- Plan & Procure service approval.
- Is Belgrass merging into Dodzel? Confirm current entity status. This question is excluded from the UI.
- Certifications, six-year / 350+ / 12+ figures, safety numbers; Zero Harm is a goal, not a measured incident record.
- Team originals and photo consent.
- Real red/white logo asset and reversed white version for dark surfaces. A text DODZEL wordmark is used.
- Source URLs and licences for every supplied stock asset.
- Red brand accent added to the blue, honey and rust palette; full-width pill navigation uses light paper and a dark active state.
- RFQ remains a validation preview; delivery is not connected.

## Validation

npm run lint, TypeScript and npm run build pass. All navigation and 11 service routes return HTTP 200, as do MP4/WebM/poster requests. Desktop and emulated 390px mobile Chrome previews show no application issue badge after carousel fixes. Browser extensions in the existing user browser can produce hydration mismatches; the clean headless preview has no extensions. Homepage CLS was 0 in brief reduced-motion checks at 390px and 1440px; document scroll width matched the viewport at both sizes. Reduced-motion mode rendered no video. This is a local spot check, not field performance data.
