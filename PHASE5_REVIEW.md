# Phase 5 review

Phase 5 replaces CSS gradients and blueprint patterns with flat image tints and crisp edges; adds a shared premium inner banner and motion hook; redesigns Services as linked cards; assigns distinct service images; and preserves review mode, preview noindex protection, reduced motion and desktop process pinning. Sanity/Studio and Arabic are unchanged.

## New media and service assignments

The rescan found two files not present in the Phase 4 inventory: Sectors.jpg and project-facilities.webp. Earlier supplied service photos were already optimized but unassigned; they now fill their matching capabilities. All sources remain illustrative stock, not proof of completed Dodzel work.

| Newly detected original | Assignment | Classification |
| --- | --- | --- |
| Sectors.jpg | Oil & Gas homepage/sector illustration | Offshore structures at sunset |
| project-facilities.webp | Project Facilities card/detail banner | Facility-management stock graphic, not a project photograph |

| Service | Original |
| --- | --- |
| Engineering | engineering.jpg |
| Procurement & Supply Chain | Procurement-supply-chain.jpg |
| Project Management | project-management.jpg |
| Civil & Buildings | scaffolding.jpg |
| Mechanical & Piping | pipe-welding.jpg |
| Electrical & Instrumentation | Electrical & Instrumentation.jpg |
| Structural Steel | steel-structure-construction-1.jpg |
| Plant Services (Turnaround & Shutdown) | Midpoint poster of 12966194_4096_2160_25fps.mp4 |
| Offshore | Midpoint poster of 4392869-uhd_3840_2160_30fps.mp4 |
| Project Facilities | project-facilities.webp |
| Maintenance | Midpoint poster of industrial-plant-night.mp4 |

Still need imagery: real Careers/team people with consent; dedicated shutdown/turnaround and maintenance photos should replace the provisional industrial illustrations. Every listed service currently has a distinct available stock illustration, so Engineering/Procurement/Project Management/E&I/Project Facilities no longer require duplicated substitutes. Missing slots still render a flat blue-800 “Image needed” panel with review-mode TODO, without an img element.

## Final slot mapping

Service details use the matching service asset only in their PageHero; the repeated body image was removed. Gallery images remain distinct. Homepage QHSE/CTA/insights and Oil & Gas were remapped to avoid repeats; the mega menu retains text instead of duplicating the page image. Plan & Procure uses real container-yard stock, while Build & Maintain changes its single image on row hover/focus. Section videos are static posters now; ambient motion is reserved for inner banners and the homepage hero video.

| Slot | Asset key |
| --- | --- |
| Engineering | `image:engineering` |
| Procurement & Supply Chain | `image:Procurement-supply-chain` |
| Project Management | `image:project-management` |
| Electrical & Instrumentation | `image:Electrical & Instrumentation` |
| Project Facilities | `image:project-facilities` |
| Sectors | `video:oil-refinery` |
| Projects | `image:offshore1` |
| Insights | `image:pexels-joseph-russo-430180075-29590119` |
| Careers | `image:scaffolding` |
| Become a Vendor | `image:pipe-rack1` |
| Request a Quote | `image:cement-plant` |
| hero-1 | `video:oil-refinery` |
| hero-2 | `video:pipeline-welding` |
| hero-3 | `video:14529100_3840_2160_30fps` |
| Oil & Gas | `image:Sectors` |
| Refining | `video:9339478-uhd_3840_2160_24fps` |
| Power | `video:power-plant` |
| Cement | `video:cement-plant` |
| refining-photo | `image:pexels-joseph-russo-430180075-29590119` |
| power-photo | `image:power-plant` |
| cement-photo | `image:cement-plant` |
| Civil & Buildings | `image:scaffolding` |
| Mechanical & Piping | `image:pipe-welding` |
| Structural Steel | `image:steel-structure-construction-1` |
| Plant Services (Turnaround & Shutdown) | `video:12966194_4096_2160_25fps` |
| Maintenance | `video:industrial-plant-night` |
| Offshore | `video:4392869-uhd_3840_2160_30fps` |
| offshore-photo | `image:offshore` |
| offshore-platform | `image:offshore1` |
| piping-yard | `image:pipe-rack` |
| piping-yard-alternate | `image:pipe-rack1` |
| mechanical-texture | `video:12966194_4096_2160_25fps` |
| civil-scaffolding-video | `video:scaffolding` |
| Plan & Procure | `image:frank-mckenna-tjX_sniNzgQ-unsplash` |
| Build & Maintain | `image:steel-structure-construction-1` |
| About | `image:industrial-plant-night` |
| Services | `image:steel-structure-construction` |
| QHSE | `image:pipe-welding` |
| Conduct | `image:pipe-rack` |
| Contact | `video:industrial-plant-night` |
| qhse-story | `video:15122253_2160_3840_30fps` |
| qhse-background | `image:industrial-plant-night` |
| cta-background | `image:offshore` |
| project-1 | `image:pexels-joseph-russo-430180075-29590119` |
| project-2 | `image:power-plant` |
| project-3 | `image:cement-plant` |
| insight-1 | `image:project-management` |
| insight-2 | `video:15122253_2160_3840_30fps` |
| insight-3 | `image:engineering` |

## Contrast over brightest sampled regions

The pipeline decodes each poster to 512px wide, scans averaged 8x8 patches across the full image, selects the patch with highest relative luminance, composites flat blue-950, and raises scrimStrength until honey text reaches at least 4.6:1. White copy then exceeds 9.4:1. Full measurements for every asset are in MEDIA_INVENTORY.json → bannerContrast.

These are measured patch ratios rather than a claim of pixel-by-pixel testing of every moving video frame. Banners use static posters. The homepage video retains the same flat tint; its moving highlights were not exhaustively sampled in Phase 5. A pure-white conservative bound at 84% tint is also approximately 9.6:1 white and 4.67:1 honey.

| Banner | Flat tint | White text | Honey text |
| --- | ---: | ---: | ---: |
| About | 84% | 9.64:1 | 4.68:1 |
| Services | 82% | 9.64:1 | 4.68:1 |
| Sectors | 83% | 9.50:1 | 4.62:1 |
| Projects | 82% | 9.70:1 | 4.71:1 |
| QHSE | 79% | 9.70:1 | 4.71:1 |
| Insights | 79% | 9.55:1 | 4.64:1 |
| Careers | 83% | 9.57:1 | 4.65:1 |
| Conduct | 82% | 9.48:1 | 4.61:1 |
| Become a Vendor | 81% | 9.68:1 | 4.70:1 |
| Contact | 76% | 9.58:1 | 4.65:1 |
| Request a Quote | 84% | 9.64:1 | 4.68:1 |

The higher tint strengths are intentional for AA honey text over bright skies/highlights. No gradient is used, including behind the navbar. Images without overlaid copy receive just a uniform 6% tint. Review this stronger flat-tint treatment visually; moving the eyebrow onto a solid surface would permit a lighter banner tint but would change the requested layout.

## Design / motion implementation

- PageHero: full-bleed manifest poster, focal point, eager high-priority next/image with blur, bottom-start breadcrumb/honey eyebrow/Saira title/intro, rust eyebrow line, 3px container rule and crisp bottom edge.
- Desktop banner height min(56vh,560px). Mobile minimum 44vh; long titles/copy can expand naturally to avoid clipping and navigation overlap.
- One useBannerMotion hook uses useGSAP/context cleanup and gsap.matchMedia. Shared cached plugin registration is also used by the existing smooth-scroll provider. One-second image clip reveal + 1.12→1 scale, masked word rise, short eyebrow/intro fade and rust-line draw; 22-second alternating ambient zoom. IntersectionObserver and visibilitychange pause the banner timeline.
- Services: 3 desktop / 2 tablet / 1 mobile cards per group, 4:3 unique media, one-line descriptions, whole-card links, rust title underline, visible focus and media-only hover scale.
- Section media reveals once on entry; no parallax/scrub or looping section decoration. How We Work remains pinned on desktop and a vertical list on mobile/reduced motion.
- 3px radius token for cards/buttons/images, hairline borders, paper/white space. Existing pill navigation is retained.
- Removed gradient definitions, gradient underlines, blueprint CSS/SVG patterns and the safety-chart grid. Placeholders are flat surfaces. Source grep shows no gradient/pattern/mask-fade implementations.

## Verification and artifacts

Run `npm run media:optimize`, `npm run lint`, `npm run build`, then start production on port 3100 and development on 3000; `npm run verify:phase5` uses Playwright with installed Chrome. Override PLAYWRIGHT_BASE_URL, PLAYWRIGHT_DEV_URL or PLAYWRIGHT_CHROME_PATH when needed. Playwright is a devDependency.

Results are recorded in reports/phase5/verification.json. Screenshots include all requested pages at 1440px and 390px, plus Sectors, Projects, Insights, Vendors and RFQ. Process screenshots cover progress 0/25/50/75/100% and after release. A reduced-motion Services screenshot is included.

The first screenshot pass exposed an E&I filename URL issue, a Next/Image immediate-parent positioning warning and oversized mobile service-detail gutters. Fixes: encode each URL path segment including ampersands, position the reveal wrapper relatively, and reduce the 12-column mobile gutter width.

Final results:

- Lint and production build pass; diff whitespace check passes. No component hex literals or physical margin/padding/position Tailwind utilities; no Sanity/Studio changes.
- 28 page screenshots (14 routes at both widths), six process scroll captures and one reduced-motion screenshot. No image repeats, broken images or horizontal overflow in any captured route. All 11 service detail pages and all eight homepage Build & Maintain focus states also pass image checks.
- Nine development routes have zero overlay issues, console warnings or errors in clean Playwright Chromium. The final single-width facility-graphic warning was fixed using unoptimized for assets with only one generated width; affected pages were rechecked after the final build.
- Reduced motion: zero homepage videos, pinning, count-up or hero split words; banner has no split words, motion flag, clip or transform.
- Actual process scroll advances steps 0–4. At release, process bottom is 639.8125px and next section starts at 640.046875px (0.234375px rounding difference), and remains contiguous after further scroll. No excess gap after release.
- Ambient zoom changes while visible (1.0041→1.0071), remains 1.0072 while offscreen, and remains 1.0077 during the simulated hidden visibility event.
- Final URL repair encodes each segment, including ampersands; single-width graphics bypass the responsive loader. No warnings were suppressed.

Screenshots: [desktop Services](reports/phase5/1440-services.png), [mobile Services](reports/phase5/390-services.png), [mobile About](reports/phase5/390-about.png), [process after release](reports/phase5/process-1.4.png), [reduced motion](reports/phase5/390-services-reduced.png). Full evidence: [verification JSON](reports/phase5/verification.json).

Limits: screenshots/functional checks were run in local Chromium, not Safari/Firefox or a deployed environment. Offscreen zoom pause is tested directly; the hidden-tab branch is tested using a simulated visibilitychange event, not a physical tab switch. No Lighthouse rerun is claimed for Phase 5; the Phase 4 report remains a historical measurement.

## Decisions for review / client follow-up

- Confirm the provisional generic industrial imagery for Plant Services/Maintenance and the facility-management graphic for Project Facilities.
- Approve the new service image assignments and provide all missing stock source URLs, authors and licences; filenames are not licensing evidence.
- Supply real people, project and capability photos with publication permissions. Confirm unapproved service descriptions and sector applicability; existing badges still flag pending content in review mode.
- Review the flat 76–84% banner tints required by small honey text, mobile expansion for long service titles, short motion reveal and ambient zoom.
- Clean view `/?review=0`; review view `/?review=1` persists by cookie. Placeholder preview footer and noindex safety remain enabled.

## Changed files

- `MEDIA_INVENTORY.json`
- `package-lock.json`
- `package.json`
- `public/media-placeholder.svg`
- `public/placeholder/CREDITS.md`
- `scripts/optimize-media.mjs`
- `src/app/globals.css`
- `src/app/services/[slug]/page.tsx`
- `src/app/services/page.tsx`
- `src/components/layout/MegaMenu.tsx`
- `src/components/sections/ClosingCta.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/ProjectReveal.tsx`
- `src/components/sections/QhseCertifications.tsx`
- `src/components/sections/SectorsGrid.tsx`
- `src/components/sections/ServiceGroup.tsx`
- `src/components/ui/MediaFrame.tsx`
- `src/components/ui/PageHero.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/content/media.ts`
- `src/lib/animations.ts`
- `reports/phase5/`
- `scripts/verify-phase5.mjs`
- `src/components/ui/BannerMotion.tsx`
- `src/components/ui/MediaReveal.tsx`
- `src/lib/use-banner-motion.ts`
- Ten new AVIF/WebP output files for Sectors and Project Facilities, plus screenshots and verification JSON under reports/phase5.

## Media totals

Generated media: 55.29 MB; video remains 21.03 MB. Originals stay ignored. All generated-file bytes remain listed in MEDIA_INVENTORY.json.

## Final changed-file inventory

- `MEDIA_INVENTORY.json`
- `package-lock.json`
- `package.json`
- `public/media-placeholder.svg`
- `public/placeholder/CREDITS.md`
- `scripts/optimize-media.mjs`
- `src/app/globals.css`
- `src/app/services/[slug]/page.tsx`
- `src/app/services/page.tsx`
- `src/components/layout/MegaMenu.tsx`
- `src/components/sections/ClosingCta.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/ProjectReveal.tsx`
- `src/components/sections/QhseCertifications.tsx`
- `src/components/sections/SectorsGrid.tsx`
- `src/components/sections/ServiceGroup.tsx`
- `src/components/ui/MediaFrame.tsx`
- `src/components/ui/PageHero.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/content/media.ts`
- `src/lib/animations.ts`
- `PHASE5_REVIEW.md`
- `public/media/images/Sectors-1080.avif`
- `public/media/images/Sectors-1080.webp`
- `public/media/images/Sectors-1920.avif`
- `public/media/images/Sectors-1920.webp`
- `public/media/images/Sectors-2560.avif`
- `public/media/images/Sectors-2560.webp`
- `public/media/images/Sectors-640.avif`
- `public/media/images/Sectors-640.webp`
- `public/media/images/project-facilities-640.avif`
- `public/media/images/project-facilities-640.webp`
- `reports/phase5/`
- `scripts/verify-phase5.mjs`
- `src/components/ui/BannerMotion.tsx`
- `src/components/ui/MediaReveal.tsx`
- `src/lib/use-banner-motion.ts`
