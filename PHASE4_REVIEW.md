# Phase 4 review

Implemented palette, optimized media pipeline, hero, grouped services, map, shared inner-page heroes, review mode and preview indexing protection. Sanity/Studio and Arabic were not changed. This is a preview: approved project claims, licensing, and LCP work remain before launch.

## Verification

- `npm run lint`: pass. `npm run build`: pass (29 static pages generated).
- Clean Chrome development profile: zero overlay issues, console warnings/errors or exceptions on Home, About, Services, Careers, QHSE, Conduct, Contact and Projects.
- Actual keyboard: mega menu ArrowDown/End/Escape; overlay Enter/Shift+Tab/Escape with focus return; mobile Services disclosure; hero Space; RFQ Tab and Enter validation (seven errors, focus first field); project Power filter returns one illustrative card.
- Actual desktop scroll: five process steps switch at 0/25/50/75/100%; pin stays at 100px, approximately 540px high, with 480px travel. Fonts/image completion refresh the trigger. Offscreen hero videos pause.
- Reduced motion at 390px: zero videos, pinning, count-up or split words; final stat values visible; no horizontal overflow. Data saver and 3G: zero videos. Normal mobile sources are 720p. Only one active hero video plays; next clip is paused metadata preload.
- Preview: meta robots and X-Robots-Tag noindex,nofollow; robots Disallow /; empty sitemap; all inspected page/media responses 200.
- No hex literals in TSX components, no physical left/right margin/padding/position utilities. Originals ignored. All 17 video variants satisfy byte budgets and have no audio; details in reports/phase4-video-validation.json.

## Development diagnostics, exact message text

1. “A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up.” The diagnostic diff contains extension-injected `bis_skin_checked`, `bis_register` and generated processed attributes. Clean Chrome has no mismatch. Disable the DOM-injecting extension for localhost in the normal browser; application hydration warnings were not suppressed. That extension can reproduce the warning even on corrected code.
2. “Image with src "/media-placeholder.svg" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.” Placeholder SVG now uses unoptimized; raster loader selects generated widths.

The initial above-fold image diagnostic was also addressed: “Image with src "/media-placeholder.svg" was detected as the Largest Contentful Paint (LCP). Please add the `loading="eager"` property if this image is above the fold.” PageHero explicitly loads its poster eagerly with preload and high fetch priority. Hero duplicate keys and SplitText cleanup now keep the selected headline in sync.

## Lighthouse mobile

Production build on localhost:3100, Lighthouse mobile simulated throttling, clean standalone Chrome, performance/accessibility/SEO categories. Full reproducible report: reports/phase4-lighthouse-mobile.json.

| Metric | Result | Gate |
| --- | --- | --- |
| Performance | 86 | >=85: pass |
| LCP | 4.2s | <2.5s: missed |
| CLS | 0 | <0.1: pass |
| Accessibility | 100 | >=95: pass |
| SEO | 69 | >=95: missed, intentional preview noindex |
| TBT | 60ms | informational |

LCP is the high-priority first hero poster. Lighthouse confirms discovery, eager loading and priority all pass. Simulated mobile LCP remains above target; image-delivery audit identifies 145KiB possible savings across images and network/JavaScript work remains. Next change: supply a dedicated mobile crop with fewer pixels/bytes, delay video and animation loading further on constrained devices, then retest on the deployed edge. These are proposed further optimizations, not claimed fixes. SEO's only failed scored audit is crawlability, as required for preview. Set NEXT_PUBLIC_ENV=production only at launch, rebuild, then repeat the SEO audit. Do not remove preview protection to inflate the score.

## Palette before / after

| Components | Before | After |
| --- | --- | --- |
| Hero/PageHero | Uniform dark treatment | Blue-950, text-side 86% gradient, bottom/top scrims, vibrant open image side |
| Company intro / Services | Missing intro; individual thumbnails | Paper intro; white groups with one large crossfading image, rust eyebrows and top rules |
| TrustStats / HowWeWork | Limited navy/amber distinction | Blue-800 surfaces, honey tabular numbers/progress, completed honey lines |
| Projects / Insights | Placeholder media treatment | Light surfaces, 4:3 stock images, blue shadow tint, rust borders, media-only 1.04 hover |
| QHSE / CTA / Footer | Predominantly navy | Mid-blue cards, night imagery, honey CTAs, rust footer rule |
| PresenceMap | Less distinct highlight | Rust country fills, honey hover/focus, Qatar callout, Lahore/Qatar pins |
| Buttons / Links | Inconsistent interactions | Honey/dark CTA, blue/rust links, CSS underline/arrow, RTL mirror and 2px focus |

Blue anchors the broad dark surfaces; white/paper supplies the light section rhythm; rust and honey remain signature/interaction accents. The 60/30/10 balance is a visual target, not a measured pixel allocation. Logo red remains scoped to the Dodzel wordmark.

## Contrast

WCAG relative-luminance calculation, ratios rounded to two decimals. All listed text pairs exceed 4.5:1.

| Foreground / background | Ratio |
| --- | --- |
| Rust-600 / white | 5.56:1 |
| Rust-600 / paper | 5.06:1 |
| Blue-600 / white | 8.20:1 |
| Honey-400 / blue-800 | 5.53:1 |
| Blue-950 / honey CTA | 7.66:1 |
| White / blue-800 | 11.39:1 |
| White / brightest possible white frame under 86% blue-950 text scrim | 10.30:1 |

The last row is a conservative bound for all three hero videos, including their brightest frames, within the text scrim. It is not a claim about the intentionally uncovered image area, where no copy sits. Mobile uses the 86% vertical text band. Honey is not used as text on white.

## Media decisions and mapping

All originals were classified, numeric videos from extracted midpoint frames. Pipe-rack photos depict stacked pipe storage, not an erected rack. Residential scaffolding video is Civil illustrative media only. Portrait 15122253 is QHSE story, never hero. Scaffolding still is a multi-storey construction image; plant-service imagery remains provisional. Newly supplied office/engineering/stock images are processed and credited but not assigned where their subject cannot establish the requested capability.

| Slot | Asset |
| --- | --- |
| hero-1 | `video:oil-refinery` |
| hero-2 | `video:pipeline-welding` |
| hero-3 | `video:14529100_3840_2160_30fps` |
| Oil & Gas | `video:14529100_3840_2160_30fps` |
| Refining | `video:9339478-uhd_3840_2160_24fps` |
| Power | `video:power-plant` |
| Cement | `video:cement-plant` |
| refining-photo | `image:pexels-joseph-russo-430180075-29590119` |
| power-photo | `image:power-plant` |
| cement-photo | `image:cement-plant` |
| Civil & Buildings | `image:scaffolding` |
| Mechanical & Piping | `image:pipe-welding` |
| Structural Steel | `image:steel-structure-construction-1` |
| Plant Services (Turnaround & Shutdown) | `image:scaffolding` |
| Maintenance | `image:scaffolding` |
| Offshore | `video:4392869-uhd_3840_2160_30fps` |
| offshore-photo | `image:offshore` |
| offshore-platform | `image:offshore1` |
| piping-yard | `image:pipe-rack` |
| piping-yard-alternate | `image:pipe-rack1` |
| mechanical-texture | `video:12966194_4096_2160_25fps` |
| civil-scaffolding-video | `video:scaffolding` |
| Plan & Procure | `image:pexels-joseph-russo-430180075-29590119` |
| Build & Maintain | `image:steel-structure-construction-1` |
| About | `image:steel-structure-construction-1` |
| Services | `image:steel-structure-construction` |
| QHSE | `image:industrial-plant-night` |
| Conduct | `image:pipe-welding` |
| Contact | `image:pexels-joseph-russo-430180075-29590119` |
| qhse-story | `video:15122253_2160_3840_30fps` |
| qhse-background | `image:industrial-plant-night` |
| cta-background | `video:industrial-plant-night` |
| project-1 | `image:pexels-joseph-russo-430180075-29590119` |
| project-2 | `image:power-plant` |
| project-3 | `image:cement-plant` |
| insight-1 | `image:pipe-welding` |
| insight-2 | `image:scaffolding` |
| insight-3 | `image:industrial-plant-night` |

Need image: Electrical & Instrumentation, Project Facilities, Careers page/people. These keep clean placeholders. Review whether scaffolding is an appropriate Plant Services/Maintenance illustration; a real shutdown/turnaround photo would be better.

## Pipeline / output sizes

Run `npm run media:optimize` (ffmpeg + ffprobe and sharp required). Originals: media/originals, ignored; generated midpoint cache: media/.cache, ignored. AVIF/WebP at 640/1080/1920/2560 capped to source; quality 62/67, stripped metadata, blur and focal points. Hero: 1080 MP4/VP9, 720 MP4, 6–8 seconds, no audio, MP4 faststart. Other video: 720p, portrait retains portrait aspect. Repeated run reuses valid outputs. Manifest alone supplies component media paths; missing assets stay explicit placeholders. CREDITS.md lists every stock original with unknown URL/licence marked pending.

Total optimized public/media: **54.72 MB**; videos: **21.03 MB**; images/posters: **33.69 MB** (decimal MB). Videos are below 25 MB, so CDN is optional. NEXT_PUBLIC_MEDIA_BASE_URL supports an absolute CDN base; host generated /media paths under it and rerun the pipeline/rebuild.

Every generated file size (also machine-readable in MEDIA_INVENTORY.json):

| File beneath public/media | Bytes |
| --- | ---: |
| `images/12966194_4096_2160_25fps-poster-1080.avif` | 65,406 |
| `images/12966194_4096_2160_25fps-poster-1080.webp` | 66,354 |
| `images/12966194_4096_2160_25fps-poster-1920.avif` | 135,846 |
| `images/12966194_4096_2160_25fps-poster-1920.webp` | 130,090 |
| `images/12966194_4096_2160_25fps-poster-2560.avif` | 187,142 |
| `images/12966194_4096_2160_25fps-poster-2560.webp` | 176,116 |
| `images/12966194_4096_2160_25fps-poster-640.avif` | 29,892 |
| `images/12966194_4096_2160_25fps-poster-640.webp` | 31,794 |
| `images/14529100_3840_2160_30fps-poster-1080.avif` | 45,632 |
| `images/14529100_3840_2160_30fps-poster-1080.webp` | 34,682 |
| `images/14529100_3840_2160_30fps-poster-1920.avif` | 102,277 |
| `images/14529100_3840_2160_30fps-poster-1920.webp` | 77,266 |
| `images/14529100_3840_2160_30fps-poster-2560.avif` | 142,968 |
| `images/14529100_3840_2160_30fps-poster-2560.webp` | 108,894 |
| `images/14529100_3840_2160_30fps-poster-640.avif` | 20,035 |
| `images/14529100_3840_2160_30fps-poster-640.webp` | 15,638 |
| `images/15122253_2160_3840_30fps-poster-1080.avif` | 148,993 |
| `images/15122253_2160_3840_30fps-poster-1080.webp` | 122,176 |
| `images/15122253_2160_3840_30fps-poster-1920.avif` | 302,311 |
| `images/15122253_2160_3840_30fps-poster-1920.webp` | 225,746 |
| `images/15122253_2160_3840_30fps-poster-640.avif` | 69,261 |
| `images/15122253_2160_3840_30fps-poster-640.webp` | 61,840 |
| `images/4392869-uhd_3840_2160_30fps-poster-1080.avif` | 52,349 |
| `images/4392869-uhd_3840_2160_30fps-poster-1080.webp` | 48,118 |
| `images/4392869-uhd_3840_2160_30fps-poster-1920.avif` | 136,264 |
| `images/4392869-uhd_3840_2160_30fps-poster-1920.webp` | 122,652 |
| `images/4392869-uhd_3840_2160_30fps-poster-2560.avif` | 197,862 |
| `images/4392869-uhd_3840_2160_30fps-poster-2560.webp` | 169,234 |
| `images/4392869-uhd_3840_2160_30fps-poster-640.avif` | 19,915 |
| `images/4392869-uhd_3840_2160_30fps-poster-640.webp` | 18,444 |
| `images/9339478-uhd_3840_2160_24fps-poster-1080.avif` | 64,635 |
| `images/9339478-uhd_3840_2160_24fps-poster-1080.webp` | 59,658 |
| `images/9339478-uhd_3840_2160_24fps-poster-1920.avif` | 156,601 |
| `images/9339478-uhd_3840_2160_24fps-poster-1920.webp` | 139,944 |
| `images/9339478-uhd_3840_2160_24fps-poster-2560.avif` | 231,101 |
| `images/9339478-uhd_3840_2160_24fps-poster-2560.webp` | 198,226 |
| `images/9339478-uhd_3840_2160_24fps-poster-640.avif` | 26,426 |
| `images/9339478-uhd_3840_2160_24fps-poster-640.webp` | 25,542 |
| `images/Electrical & Instrumentation-1080.avif` | 74,059 |
| `images/Electrical & Instrumentation-1080.webp` | 61,410 |
| `images/Electrical & Instrumentation-1920.avif` | 267,008 |
| `images/Electrical & Instrumentation-1920.webp` | 224,196 |
| `images/Electrical & Instrumentation-2560.avif` | 597,870 |
| `images/Electrical & Instrumentation-2560.webp` | 530,924 |
| `images/Electrical & Instrumentation-640.avif` | 32,044 |
| `images/Electrical & Instrumentation-640.webp` | 28,674 |
| `images/Procurement-supply-chain-1080.avif` | 135,350 |
| `images/Procurement-supply-chain-1080.webp` | 134,392 |
| `images/Procurement-supply-chain-1920.avif` | 353,460 |
| `images/Procurement-supply-chain-1920.webp` | 339,462 |
| `images/Procurement-supply-chain-640.avif` | 55,353 |
| `images/Procurement-supply-chain-640.webp` | 51,940 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-1080.avif` | 64,654 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-1080.webp` | 61,850 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-1920.avif` | 166,365 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-1920.webp` | 146,208 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-2560.avif` | 270,159 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-2560.webp` | 211,992 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-640.avif` | 29,311 |
| `images/alex-kotliarskyi-QBpZGqEMsKg-unsplash-640.webp` | 30,074 |
| `images/cement-plant-1080.avif` | 78,732 |
| `images/cement-plant-1080.webp` | 75,284 |
| `images/cement-plant-1920.avif` | 206,940 |
| `images/cement-plant-1920.webp` | 214,886 |
| `images/cement-plant-2560.avif` | 336,622 |
| `images/cement-plant-2560.webp` | 344,136 |
| `images/cement-plant-640.avif` | 32,788 |
| `images/cement-plant-640.webp` | 29,372 |
| `images/cement-plant-poster-1080.avif` | 103,279 |
| `images/cement-plant-poster-1080.webp` | 109,966 |
| `images/cement-plant-poster-1920.avif` | 268,839 |
| `images/cement-plant-poster-1920.webp` | 287,582 |
| `images/cement-plant-poster-2560.avif` | 400,988 |
| `images/cement-plant-poster-2560.webp` | 421,402 |
| `images/cement-plant-poster-640.avif` | 40,111 |
| `images/cement-plant-poster-640.webp` | 43,618 |
| `images/engineering-1080.avif` | 45,398 |
| `images/engineering-1080.webp` | 38,206 |
| `images/engineering-1920.avif` | 99,476 |
| `images/engineering-1920.webp` | 78,574 |
| `images/engineering-2560.avif` | 149,536 |
| `images/engineering-2560.webp` | 116,800 |
| `images/engineering-640.avif` | 22,928 |
| `images/engineering-640.webp` | 20,160 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-1080.avif` | 73,347 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-1080.webp` | 73,336 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-1920.avif` | 160,458 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-1920.webp` | 153,548 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-2560.avif` | 231,081 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-2560.webp` | 209,280 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-640.avif` | 31,032 |
| `images/frank-mckenna-tjX_sniNzgQ-unsplash-640.webp` | 31,586 |
| `images/haydn-n8TBTzFIRzs-unsplash-1080.avif` | 106,827 |
| `images/haydn-n8TBTzFIRzs-unsplash-1080.webp` | 87,056 |
| `images/haydn-n8TBTzFIRzs-unsplash-1920.avif` | 250,737 |
| `images/haydn-n8TBTzFIRzs-unsplash-1920.webp` | 198,572 |
| `images/haydn-n8TBTzFIRzs-unsplash-2560.avif` | 383,634 |
| `images/haydn-n8TBTzFIRzs-unsplash-2560.webp` | 297,144 |
| `images/haydn-n8TBTzFIRzs-unsplash-640.avif` | 44,530 |
| `images/haydn-n8TBTzFIRzs-unsplash-640.webp` | 36,108 |
| `images/industrial-plant-night-1080.avif` | 52,409 |
| `images/industrial-plant-night-1080.webp` | 49,380 |
| `images/industrial-plant-night-1920.avif` | 131,792 |
| `images/industrial-plant-night-1920.webp` | 126,676 |
| `images/industrial-plant-night-2560.avif` | 208,892 |
| `images/industrial-plant-night-2560.webp` | 199,502 |
| `images/industrial-plant-night-640.avif` | 22,194 |
| `images/industrial-plant-night-640.webp` | 20,484 |
| `images/industrial-plant-night-poster-1080.avif` | 58,283 |
| `images/industrial-plant-night-poster-1080.webp` | 43,922 |
| `images/industrial-plant-night-poster-1920.avif` | 127,562 |
| `images/industrial-plant-night-poster-1920.webp` | 94,882 |
| `images/industrial-plant-night-poster-640.avif` | 26,011 |
| `images/industrial-plant-night-poster-640.webp` | 19,358 |
| `images/offshore-1080.avif` | 161,779 |
| `images/offshore-1080.webp` | 167,932 |
| `images/offshore-1920.avif` | 413,963 |
| `images/offshore-1920.webp` | 418,840 |
| `images/offshore-2560.avif` | 644,351 |
| `images/offshore-2560.webp` | 619,594 |
| `images/offshore-640.avif` | 63,636 |
| `images/offshore-640.webp` | 65,068 |
| `images/offshore1-1080.avif` | 86,544 |
| `images/offshore1-1080.webp` | 83,150 |
| `images/offshore1-1920.avif` | 304,031 |
| `images/offshore1-1920.webp` | 279,500 |
| `images/offshore1-2560.avif` | 574,811 |
| `images/offshore1-2560.webp` | 546,264 |
| `images/offshore1-640.avif` | 29,902 |
| `images/offshore1-640.webp` | 29,144 |
| `images/oil-refinery-poster-1080.avif` | 91,646 |
| `images/oil-refinery-poster-1080.webp` | 91,718 |
| `images/oil-refinery-poster-1920.avif` | 241,605 |
| `images/oil-refinery-poster-1920.webp` | 242,126 |
| `images/oil-refinery-poster-2560.avif` | 374,161 |
| `images/oil-refinery-poster-2560.webp` | 369,900 |
| `images/oil-refinery-poster-640.avif` | 35,738 |
| `images/oil-refinery-poster-640.webp` | 36,674 |
| `images/pexels-joseph-russo-430180075-29590119-1080.avif` | 69,266 |
| `images/pexels-joseph-russo-430180075-29590119-1080.webp` | 64,372 |
| `images/pexels-joseph-russo-430180075-29590119-1920.avif` | 181,081 |
| `images/pexels-joseph-russo-430180075-29590119-1920.webp` | 158,508 |
| `images/pexels-joseph-russo-430180075-29590119-2560.avif` | 332,999 |
| `images/pexels-joseph-russo-430180075-29590119-2560.webp` | 262,372 |
| `images/pexels-joseph-russo-430180075-29590119-640.avif` | 29,899 |
| `images/pexels-joseph-russo-430180075-29590119-640.webp` | 26,976 |
| `images/pipe-rack-1080.avif` | 76,114 |
| `images/pipe-rack-1080.webp` | 65,812 |
| `images/pipe-rack-1920.avif` | 201,336 |
| `images/pipe-rack-1920.webp` | 159,956 |
| `images/pipe-rack-2560.avif` | 327,230 |
| `images/pipe-rack-2560.webp` | 244,192 |
| `images/pipe-rack-640.avif` | 30,991 |
| `images/pipe-rack-640.webp` | 27,814 |
| `images/pipe-rack1-1080.avif` | 58,610 |
| `images/pipe-rack1-1080.webp` | 52,974 |
| `images/pipe-rack1-1920.avif` | 144,118 |
| `images/pipe-rack1-1920.webp` | 127,796 |
| `images/pipe-rack1-2560.avif` | 223,785 |
| `images/pipe-rack1-2560.webp` | 190,252 |
| `images/pipe-rack1-640.avif` | 24,806 |
| `images/pipe-rack1-640.webp` | 22,770 |
| `images/pipe-welding-1080.avif` | 109,786 |
| `images/pipe-welding-1080.webp` | 102,854 |
| `images/pipe-welding-1920.avif` | 327,842 |
| `images/pipe-welding-1920.webp` | 309,146 |
| `images/pipe-welding-2560.avif` | 550,419 |
| `images/pipe-welding-2560.webp` | 517,600 |
| `images/pipe-welding-640.avif` | 43,998 |
| `images/pipe-welding-640.webp` | 41,424 |
| `images/pipeline-welding-poster-1080.avif` | 52,092 |
| `images/pipeline-welding-poster-1080.webp` | 38,776 |
| `images/pipeline-welding-poster-1920.avif` | 106,004 |
| `images/pipeline-welding-poster-1920.webp` | 77,698 |
| `images/pipeline-welding-poster-640.avif` | 23,835 |
| `images/pipeline-welding-poster-640.webp` | 18,208 |
| `images/power-plant-1080.avif` | 47,112 |
| `images/power-plant-1080.webp` | 37,580 |
| `images/power-plant-1920.avif` | 122,904 |
| `images/power-plant-1920.webp` | 94,234 |
| `images/power-plant-2560.avif` | 202,719 |
| `images/power-plant-2560.webp` | 149,974 |
| `images/power-plant-640.avif` | 21,090 |
| `images/power-plant-640.webp` | 16,796 |
| `images/power-plant-poster-1080.avif` | 64,011 |
| `images/power-plant-poster-1080.webp` | 53,864 |
| `images/power-plant-poster-1920.avif` | 148,994 |
| `images/power-plant-poster-1920.webp` | 122,862 |
| `images/power-plant-poster-2560.avif` | 211,603 |
| `images/power-plant-poster-2560.webp` | 172,846 |
| `images/power-plant-poster-640.avif` | 25,446 |
| `images/power-plant-poster-640.webp` | 22,680 |
| `images/project-management-1080.avif` | 129,106 |
| `images/project-management-1080.webp` | 136,314 |
| `images/project-management-1920.avif` | 399,037 |
| `images/project-management-1920.webp` | 422,562 |
| `images/project-management-2560.avif` | 660,901 |
| `images/project-management-2560.webp` | 701,706 |
| `images/project-management-640.avif` | 49,773 |
| `images/project-management-640.webp` | 53,056 |
| `images/scaffolding-1080.avif` | 138,713 |
| `images/scaffolding-1080.webp` | 153,912 |
| `images/scaffolding-1920.avif` | 340,175 |
| `images/scaffolding-1920.webp` | 307,314 |
| `images/scaffolding-640.avif` | 66,723 |
| `images/scaffolding-640.webp` | 74,610 |
| `images/scaffolding-poster-1080.avif` | 79,556 |
| `images/scaffolding-poster-1080.webp` | 76,864 |
| `images/scaffolding-poster-1920.avif` | 187,696 |
| `images/scaffolding-poster-1920.webp` | 169,756 |
| `images/scaffolding-poster-640.avif` | 33,482 |
| `images/scaffolding-poster-640.webp` | 32,984 |
| `images/steel-structure-construction-1-1080.avif` | 40,262 |
| `images/steel-structure-construction-1-1080.webp` | 41,284 |
| `images/steel-structure-construction-1-1920.avif` | 101,867 |
| `images/steel-structure-construction-1-1920.webp` | 92,782 |
| `images/steel-structure-construction-1-2560.avif` | 185,055 |
| `images/steel-structure-construction-1-2560.webp` | 143,424 |
| `images/steel-structure-construction-1-640.avif` | 19,250 |
| `images/steel-structure-construction-1-640.webp` | 20,748 |
| `images/steel-structure-construction-1080.avif` | 63,804 |
| `images/steel-structure-construction-1080.webp` | 71,628 |
| `images/steel-structure-construction-1920.avif` | 149,187 |
| `images/steel-structure-construction-1920.webp` | 148,994 |
| `images/steel-structure-construction-2560.avif` | 251,544 |
| `images/steel-structure-construction-2560.webp` | 220,784 |
| `images/steel-structure-construction-640.avif` | 31,115 |
| `images/steel-structure-construction-640.webp` | 36,668 |
| `videos/12966194_4096_2160_25fps-720.mp4` | 566,762 |
| `videos/14529100_3840_2160_30fps-1080-vp9.webm` | 2,472,831 |
| `videos/14529100_3840_2160_30fps-1080.mp4` | 1,370,149 |
| `videos/14529100_3840_2160_30fps-720.mp4` | 355,795 |
| `videos/15122253_2160_3840_30fps-720.mp4` | 275,337 |
| `videos/4392869-uhd_3840_2160_30fps-720.mp4` | 255,105 |
| `videos/9339478-uhd_3840_2160_24fps-720.mp4` | 822,155 |
| `videos/cement-plant-720.mp4` | 1,585,152 |
| `videos/industrial-plant-night-720.mp4` | 578,095 |
| `videos/oil-refinery-1080-vp9.webm` | 2,924,600 |
| `videos/oil-refinery-1080.mp4` | 3,090,795 |
| `videos/oil-refinery-720.mp4` | 936,260 |
| `videos/pipeline-welding-1080-vp9.webm` | 1,931,408 |
| `videos/pipeline-welding-1080.mp4` | 2,022,795 |
| `videos/pipeline-welding-720.mp4` | 1,479,689 |
| `videos/power-plant-720.mp4` | 146,226 |
| `videos/scaffolding-720.mp4` | 218,286 |

## Review controls and client questions

- Clean view: `/?review=0`. Review view: `/?review=1`; cookie persists for 30 days across routes. All STOCK/CONFIRM/TODO badges follow this setting. Clean footer retains “Preview — placeholder media”. NEXT_PUBLIC_SHOW_TODO_BADGES=1 can enable badges by default.
- Confirm media source URLs, authors and commercial licence rights for all stock assets before launch. Filenames alone are not licensing evidence.
- Obtain real Dodzel project photographs, names, sectors, scope, dates and publication approval; never relabel stock illustrations as completed projects.
- Obtain approved E&I, Project Facilities and Careers/team images and consent for identifiable people.
- Confirm statistics, QHSE/certification evidence, corporate team roles, geographic presence, and Plan & Procure/Build & Maintain service scope. Review the supplied logo source and wordmark red separately from the site's rust accent.
- Review the 6-second welding HD trim versus 8-second mobile/WebM variants, pipe-yard classifications, Qatar callout, and final page sequence.

## Changed files

- `.gitignore`
- `MEDIA_INVENTORY.json`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `public/placeholder/CREDITS.md`
- `src/app/about/page.tsx`
- `src/app/conduct/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/qhse/page.tsx`
- `src/app/robots.ts`
- `src/app/sectors/page.tsx`
- `src/app/services/[slug]/page.tsx`
- `src/app/services/page.tsx`
- `src/app/sitemap.ts`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MegaMenu.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/SmoothScrollProvider.tsx`
- `src/components/sections/CareersTeaser.tsx`
- `src/components/sections/ClosingCta.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/HowWeWork.tsx`
- `src/components/sections/InsightsGrid.tsx`
- `src/components/sections/IntentSelector.tsx`
- `src/components/sections/PresenceMap.tsx`
- `src/components/sections/ProjectReveal.tsx`
- `src/components/sections/QhseCertifications.tsx`
- `src/components/sections/SectorsGrid.tsx`
- `src/components/sections/ServicesGroups.tsx`
- `src/components/sections/TrustStats.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/InsightCard.tsx`
- `src/components/ui/MediaFrame.tsx`
- `src/components/ui/PageHero.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/components/ui/ReviewBadge.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/components/ui/StatCard.tsx`
- `src/components/ui/TodoBadge.tsx`
- `src/content/media.ts`
- `src/lib/constants.ts`
- `.env.example`
- `reports/`
- `scripts/`
- `src/components/layout/ReviewModeSync.tsx`
- `src/components/sections/CompanyIntro.tsx`
- `src/components/sections/ProjectFilters.tsx`
- `src/components/sections/ServiceGroup.tsx`
- `src/components/ui/ActiveVideo.tsx`
- `src/components/ui/HoverVideo.tsx`
- `src/components/ui/MediaCollection.tsx`
- `src/components/ui/StockBadge.tsx`
- `src/lib/animations.ts`
- `src/lib/media-image-loader.ts`
- `src/lib/use-media-policy.ts`
- `src/proxy.ts`
- Generated `public/media/images/` and `public/media/videos/`; replaced legacy flat media outputs.
- Verification artifacts in `reports/`.
