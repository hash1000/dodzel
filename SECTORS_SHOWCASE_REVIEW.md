# Sectors showcase addition

Reusable component: src/components/sections/TabbedShowcase.tsx. Props: eyebrow, title, intro (ReactNode), items containing id/title/image (MediaAsset from the manifest)/description/chips/href/todo, plus optional confirm. Chips support href, CONFIRM/TODO and review-only display. Sector content is separate in src/content/sectors.ts; IDs and generated detail routes are owned by src/lib/nav.ts.

The reference informs layout and interaction only. Images, copy, palette, logo, flat surfaces and sharp radii come from Dodzel's existing assets and tokens.

## Layout and behavior

- Desktop starts at 1024px: 12-column grid, four-column vertical tabs and eight-column preview; 72px rows, hairline dividers, blue-950/honey selected row and 3px rust start rule. The column wrappers stretch to matching height and start alignment. The preview has section-bounded sticky styling for desktop viewports up to 900px tall.
- Four unique manifest posters/images, reserved 16:9 aspect, 15% uniform flat tint, first image eager and others lazy. No banner image is repeated above the showcase: /sectors uses the new flat PageHero plate variant.
- Image panels crossfade in 300ms; image scale settles 1.03→1 and copy fades/rises 8px. No rotation or autoplay. Reduced motion removes transitions and transforms entirely.
- Below lg: a single-open accordion, native buttons with aria-expanded/aria-controls and labelled regions, smooth grid-height expansion. Only the current breakpoint's structure is mounted, preventing duplicated responsive images/IDs.
- Desktop uses vertical tablist/tab/tabpanel roles, selected state and roving tabindex. Up/Down wrap, Home/End jump and activate, native Enter/Space activate, Tab enters the active panel then its service links. Inactive panels are inert and hidden from accessibility APIs during their visual fade.
- Fine-pointer hover activates after 120ms intent, cancelled on leave or keyboard/click selection. Selection replaces the URL hash without scrolling or building a history entry for every hover; native hash/popstate changes are also observed.
- /sectors#power opens Power on desktop and mobile. Homepage, footer, mobile menu and primary mega-menu sector links retain showcase hashes. Mega menu also provides direct “Explore” detail links.

## Content and image mapping

The intro is the client's existing CONFIRM-tagged wording, including commercial infrastructure. Commercial infrastructure is not added as an item or route. Only Oil & Gas, Refining, Power and Cement are shown. Cement is marked CONFIRM in review mode in the showcase, detail page and navigation.

Every sector description is exactly “Sector description to be approved.” with a review-mode TODO. Core service links (Civil & Buildings, Mechanical & Piping, Electrical & Instrumentation) are CONFIRM until applicability is approved. Upstream and Midstream are Oil & Gas review-only TODO: CONFIRM chips and are hidden in clean mode.

| Sector / ID | Manifest image | Detail route |
| --- | --- | --- |
| Oil & Gas / oil-gas | Sectors.jpg optimized variants | /sectors/oil-gas |
| Refining / refining | 9339478-uhd_3840_2160_24fps midpoint poster | /sectors/refining |
| Power / power | power-plant.mp4 midpoint poster | /sectors/power |
| Cement / cement | cement-plant.mp4 midpoint poster | /sectors/cement |

Four sector detail routes use generateStaticParams from nav data, flat PageHero plates with breadcrumbs, neutral TODO intro, three CONFIRM related services and RFQ CTA band. Invalid sector slugs use not-found behavior. The launch sitemap includes all four; preview sitemap stays empty and noindex protection is retained.

## Verification

Run `npm run verify:sectors` with production on port 3100 and dev on 3000. Override PLAYWRIGHT_BASE_URL, PLAYWRIGHT_DEV_URL and PLAYWRIGHT_CHROME_PATH if needed. Screenshot/evidence directory: reports/sectors-showcase.

Final results:

- `npm run lint` and `npm run build` pass. Four sector routes are statically generated; total static-page output is 33.
- 12 normal screenshots: all four selections at 1440, 1024 and 390px. Two additional reduced-motion screenshots. No duplicated images, broken active images or horizontal overflow; exactly one active tab panel/accordion region throughout.
- Keyboard-only ArrowUp/ArrowDown (including wrap), Home and End activate and move focus. Tab enters the selected tabpanel; the next Tab reaches Civil & Buildings.
- Fine-pointer hover remains inactive at 40ms, activates after the 120ms intent interval, and remains selected without rotation. Deep link /sectors#power selects Power at all three widths.
- Reduced motion at 1440 and 390: all preview/copy transforms are none, transition durations are 0s, and changing selection still works.
- All four details return HTTP 200 with matching H1, three related service links and one RFQ CTA.
- Five development routes (/sectors and all details): zero overlay issues and zero console warnings/errors in clean Playwright Chromium.
- Axe checks scoped to the showcase report zero violations in desktop/mobile, both clean and review mode.
- Upstream is display:none in clean mode and visible in review mode. Cement and core applicability retain review-only confirmation badges.
- Source checks: no CSS gradients/patterns/mask fades, no component hex values, no physical margin/padding/position Tailwind utilities. No Sanity/Studio changes. Diff whitespace check passes.

Artifacts: [verification JSON](reports/sectors-showcase/verification.json), [accessibility checks](reports/sectors-showcase/accessibility.json), [desktop Power](reports/sectors-showcase/1440-power.png), [1024px Power](reports/sectors-showcase/1024-power.png), [mobile Power](reports/sectors-showcase/390-power.png).

## Contrast

Measured from computed CSS colours, using WCAG relative luminance:

| Pair | Ratio |
| --- | ---: |
| Honey-400 active text / blue-950 | 7.66:1 |
| Blue-950 description / paper | 14.34:1 |

Both exceed 4.5:1. Images contain no copy beneath the flat tint, so no text-over-image claim is needed for the preview.

## Questions for the client

- Should “commercial infrastructure” remain part of the general description, be treated as a capability, or become a separately approved sector? It is not an additional tab/route.
- Confirm Cement as a sector, approve each sector description, and confirm which core services apply to each.
- Confirm whether Upstream/Midstream should eventually be public categories; they remain review-only.
- Provide source URLs/licences and approved Dodzel sector/project photographs. Current imagery remains illustrative stock.

## Limits

Local Chromium was used for responsive/keyboard/motion verification. Safari/Firefox, physical mobile devices and deployed performance were not tested. Preview safety was retained rather than temporarily enabling indexing to test a production sitemap.

## Changed files

- `package.json`
- `src/app/globals.css`
- `src/app/sectors/page.tsx`
- `src/app/sitemap.ts`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MegaMenu.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/ui/PageHero.tsx`
- `src/lib/nav.ts`
- `SECTORS_SHOWCASE_REVIEW.md`
- `reports/sectors-showcase/`
- `scripts/verify-sectors-showcase.mjs`
- `src/app/sectors/[slug]/`
- `src/components/sections/TabbedShowcase.tsx`
- `src/content/sectors.ts`
