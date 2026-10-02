# Phase 2 handoff

## Scope and source verification

The requested fixes, typography, content review layer, homepage upgrades and SEO routes are implemented. No Sanity schema, configuration or Studio route was edited. No CMS, email delivery or external messaging was connected.

`dodzel.com`, `www.dodzel.com` and the HTTP variant were unreachable through browsing and a direct request in this environment. The real content therefore uses the facts explicitly supplied in the Phase 2 brief, without claiming independent live verification. Each real record has `source: "dodzel.com (current site)"` and `confirm: true`. CONFIRM/TODO flags remain visible under the same `SHOW_TODO_BADGES` constant.

## The reported “1 Issue”

The existing dev server log (`.next/dev/logs/next-development.log`) contained a React hydration mismatch. Its diff showed extension-added `bis_skin_checked="1"`, `bis_register`, and a `__processed_...__` attribute on the body and many containers. Those attributes are not produced by this application.

A clean Chrome session at the existing server’s `http://localhost:3000` origin produced no hydration warning and no Issue badge. The original warning is fixed in the affected browser by disabling the injecting extension on localhost and reloading. Browser extensions were not changed, and `suppressHydrationWarning` was not added; genuine application mismatches should remain visible.

The initial diagnostic request through `127.0.0.1:3000` also encountered Next.js’s development HMR origin restriction. Retesting through the existing server’s localhost origin resolved that diagnostic-only problem; development origins were not broadened.

## CONFIRM — client approval required

- Legal company name, founding year 2020, SECP registration/public limited status, and CEO Syed Tahir Hussain.
- The exact Lahore address and `info@dodzel.com`.
- Presence in Pakistan, Qatar, Saudi Arabia and Iraq.
- The five entity names and their country associations: Dodzel Engineering Ltd / Novex Trading Company in Pakistan; Dodzel Engineering Qatar WLL / Belgrass Construction Company WLL / Bimex Trading Company in Qatar.
- Subsidiary names, current external websites and scope descriptions: Belgrass’s Qatar construction activity in Oil & Gas, Power and Cement; Bimex’s equipment/material supply chain; Novex’s machine technologies for Pakistan.
- All seven Build & Maintain service descriptions, including EPIC, telecom, structural steel scopes, offshore field maintenance and Plant Services’ SPIR inclusion.
- Zero Harm wording concerning people, the public and the environment.
- The four visible trust facts: Since 2020, 4 countries, 3 subsidiaries and 7 service lines. The seven-line count excludes the three unconfirmed planning services.
- Presence/map presentation and the two location markers. Lahore is a city marker; Qatar is country-level only. No KSA or Iraq city locations were invented.

## TODO: CONFIRM — explicit service questions

- Are Engineering, Procurement & Supply Chain and Project Management offered as standalone services? Supply approved descriptions if yes; otherwise remove or revise these entries.
- Are Upstream and Midstream valid Oil & Gas subcategories for the current offering?

## TODO — content and decisions still needed

- Is Belgrass merging into Dodzel? Confirm its current legal/brand name, status and website.
- Approved logo, hero poster/video, sector/project/article imagery and image descriptions. The monogram favicon and blueprint media frames remain temporary.
- Three hero slides, section headlines, service/sector introduction copy, process step descriptions, careers copy and the closing CTA.
- Real project records: title, sector, country, scope, client, year and imagery. No projects or clients were invented.
- Verified LTI-free man-hours, measurement period, safety chart data and certifications with validity/artwork. The dashboard contains no fabricated chart values.
- Insight articles, categories and publication dates. Category chips are static UI previews until editorial taxonomy is approved.
- Office details beyond the supplied Lahore address; subsidiary office addresses; public telephone number.
- Refining’s exact placement within the Oil & Gas submenu, plus page content for sectors, projects, insights, careers, conduct and vendors.
- Legal notices, privacy policy and RFQ delivery/attachment requirements. The RFQ preview does not send requests.
- Final social-sharing artwork. The generated navy/text OG image is marked TODO.

## Decisions to review

- Fonts are local, licensed WOFF2 assets: Saira variable 500–700 at 87.5% width, IBM Plex Sans 400/500/600. Headline scales use clamp tokens. IBM Plex Sans Arabic remains a future locale addition.
- A raised navy token owns active process backgrounds. Data attributes switch CSS states; GSAP does not interpolate CSS variable color strings. Completed steps retain their amber top line.
- The process owns a navy wrapper and spacer, pins only on desktop without reduced motion, and derives its scroll travel from viewport height. Font readiness refreshes ScrollTrigger; triggers and delayed refreshes clean up on route change.
- The first hero animation acts on the media slot while the server-rendered headline remains visible. Subsequent slide changes retain the text moment. Media space is reserved and the hero poster is prioritized.
- The root loading shell was removed after Lighthouse demonstrated a footer shift. Loading is scoped to the RFQ route; its submit loading/success/error states remain accessible.
- Navigation uses links plus disclosure buttons, arrow-key navigation, Escape, a dialog focus loop and native mobile accordion groups. Hovered or focused services populate the featured mega-menu card.
- Country geometry is simplified from Natural Earth’s public-domain 1:10m admin-0 dataset, bundled as inline SVG paths with no map library. The underlying data source is recorded in `src/lib/country-paths.ts`.
- Sitemap/canonical/Organization/OG URLs use `https://dodzel.com`. Studio is omitted from the sitemap and disallowed in robots. JSON-LD contains only supplied company facts; it excludes placeholder numbers, projects, phone, certificates and clients.
- Unused Phase 1 fonts and Next.js/Vercel demo assets were removed. The generic Next.js favicon was replaced with the temporary DE mark.

## Changed files

- `README.md` — updated.
- `public/next.svg` — removed.
- `public/vercel.svg` — removed.
- `src/app/about/page.tsx` — updated.
- `src/app/careers/page.tsx` — updated.
- `src/app/conduct/page.tsx` — updated.
- `src/app/contact/page.tsx` — updated.
- `src/app/favicon.ico` — removed.
- `src/app/fonts/barlow-400.woff2` — removed.
- `src/app/fonts/barlow-500.woff2` — removed.
- `src/app/fonts/barlow-600.woff2` — removed.
- `src/app/fonts/barlow-700.woff2` — removed.
- `src/app/fonts/barlow-OFL.txt` — removed.
- `src/app/fonts/inter-100-900.woff2` — removed.
- `src/app/fonts/inter-OFL.txt` — removed.
- `src/app/globals.css` — updated.
- `src/app/insights/page.tsx` — updated.
- `src/app/layout.tsx` — updated.
- `src/app/page.tsx` — updated.
- `src/app/projects/page.tsx` — updated.
- `src/app/qhse/page.tsx` — updated.
- `src/app/request-a-quote/page.tsx` — updated.
- `src/app/sectors/page.tsx` — updated.
- `src/app/services/page.tsx` — updated.
- `src/app/vendors/page.tsx` — updated.
- `src/components/forms/RfqForm.tsx` — updated.
- `src/components/layout/Footer.tsx` — updated.
- `src/components/layout/MegaMenu.tsx` — updated.
- `src/components/layout/MobileMenu.tsx` — updated.
- `src/components/layout/Navbar.tsx` — updated.
- `src/components/layout/OverlayMenu.tsx` — updated.
- `src/components/layout/SmoothScrollProvider.tsx` — updated.
- `src/components/sections/Hero.tsx` — updated.
- `src/components/sections/HowWeWork.tsx` — updated.
- `src/components/sections/InsightsGrid.tsx` — updated.
- `src/components/sections/IntentSelector.tsx` — updated.
- `src/components/sections/PresenceMap.tsx` — updated.
- `src/components/sections/QhseCertifications.tsx` — updated.
- `src/components/sections/SectorsGrid.tsx` — updated.
- `src/components/sections/ServicesGroups.tsx` — updated.
- `src/components/sections/TrustStats.tsx` — updated.
- `src/components/ui/InsightCard.tsx` — updated.
- `src/components/ui/MediaFrame.tsx` — updated.
- `src/components/ui/PageHero.tsx` — updated.
- `src/components/ui/SectionHeading.tsx` — updated.
- `src/components/ui/StatCard.tsx` — updated.
- `src/content/placeholder.ts` — updated.
- `src/lib/nav.ts` — updated.

## Created files

- `PHASE2_HANDOFF.md`
- `src/app/fonts/ibm-plex-sans-400.woff2`
- `src/app/fonts/ibm-plex-sans-500.woff2`
- `src/app/fonts/ibm-plex-sans-600.woff2`
- `src/app/fonts/ibm-plex-sans-OFL.txt`
- `src/app/fonts/saira-500-700.woff2`
- `src/app/fonts/saira-OFL.txt`
- `src/app/icon.tsx`
- `src/app/not-found.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/request-a-quote/loading.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/seo/OrganizationJsonLd.tsx`
- `src/components/ui/ReviewBadge.tsx`
- `src/content/real.ts`
- `src/lib/country-paths.ts`
- `src/lib/metadata.ts`
- `src/lib/services.ts`
- `src/lib/theme.ts`

## Validation

- `npm run lint`: passed.
- `npm run build`: passed with Next.js 16.3.8 / Turbopack, including generated sitemap, robots, OG image and favicon.
- Chrome: twelve homepage sections, visible review flags, navbar/mega-menu arrow keys, Escape/focus return, full-screen focus loop, native accordions and true touch navigation passed.
- Widths 320/390/768: no horizontal overflow and navigation remained usable.
- Process scroll-end gap: exactly 0 pixels. Spacer/section backgrounds matched; active surface resolved to the raised navy token. Route changes removed the pin spacer.
- Reduced motion: no pinning, no video, no animated progress, static process list. The real trust facts are static and no count-up runs.
- RFQ submission using keyboard only: passed. No request was sent; validation-only confirmation appeared.
- Homepage and RFQ Axe WCAG A/AA scans: zero violations. No browser JavaScript errors.
- SEO: public-page canonical/OG metadata, JSON-LD presence, sitemap, robots, 404 status and generated PNG OG image passed.
- Color/logical-utility scan and `git diff --check`: passed.
- Lighthouse mobile results: pending final isolated run.

Temporary browser tools and reports live outside the repository; no test dependency was added to the application. Production metrics should be remeasured after real media and deployment.
