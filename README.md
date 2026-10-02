# Dodzel Engineering — structure phase

The homepage contains the twelve requested sections, responsive navigation, supporting page stubs and an RFQ validation preview. Sanity schemas, Studio routes and existing CMS configuration remain untouched; no CMS is connected to the public site.

## Run

```sh
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Content handoff

All unfinished editorial content is in `src/content/placeholder.ts`. Every placeholder item has `todo: true`; `SHOW_TODO_BADGES` in `src/lib/constants.ts` controls the visible badges. Keep badges enabled until the relevant material is approved. Statistics use em dashes and have no invented numerical values. A numeric count-up is ready when verified numbers are supplied.

Client material required:

- Approved logo vector, brand palette and typography approval.
- Hero poster, optional video, three slide headlines, categories, descriptions and CTAs.
- Final section headlines and service/sector introductions; confirmation of Oil & Gas subcategories.
- Four verified company statistics with units and measurement dates.
- Descriptions for Engineer, Procure, Fabricate, Construct and Commission.
- At least three approved projects: title, sector, country, scope, client, year, imagery and image descriptions.
- Approved Zero Harm statement, QHSE policy, certificate names/artwork/validity and verified LTI-free man-hours.
- Three insight articles with categories, publication dates, titles and imagery.
- Office addresses and confirmation of entity-to-country mappings.
- Careers introduction, open roles and application instructions.
- Final closing CTA, contact email/telephone/address, legal notices and privacy policy.
- Approved copy for About, Services, Sectors, Projects, QHSE, Insights, Careers, Contact, Conduct and Vendors.
- RFQ delivery and attachment-handling requirements for the next phase.

## Decisions to review

- Temporary deep navy, safety amber and neutral tokens are defined in `src/app/globals.css`. Barlow is the display font; Inter is the text font. Latin WOFF2 subsets are bundled through `next/font/local`, with their OFL licenses, so builds do not fetch fonts externally.
- The typographic logo and abstract SVG media frames are temporary. No stock photos, fabricated projects, certifications, client names or statistics were added.
- Desktop dropdowns are explicit disclosure buttons beside links. The full-screen dialog supports Escape, a keyboard focus loop, touch scrolling and focus return. Mobile groups use native accordion disclosures.
- The process section pins only at widths of 1024px and above without reduced motion. Steps use border/background highlighting to maintain readable text contrast. Other screens receive a static list.
- Lenis is synchronized to ScrollTrigger and the GSAP ticker. Hero rotation/video, count-ups, pinning and project reveals respect reduced-motion preferences. The hero also pauses on hover/focus and has an explicit pause control.
- The map is indicative and stylized, with an accessible country selector and entity list. Entity associations supplied in the brief are retained; office details remain pending.
- Service, sector, subsidiary, project and insight links target matching anchors on stub pages until detailed routes are introduced.
- RFQ submission only validates and logs a minimal event. It sends no email and stores no request or file. The button and success message identify this preview behavior. The action has a clear TODO for Resend/SMTP.
- Next.js Server Action request capacity is 11 MB to accommodate a 10 MB file plus multipart overhead. The same Zod schema validates fields, file extension, nonempty files, maximum size and the honeypot on client and server.
- `@hookform/resolvers` 5.2.2 was selected to avoid a dependency conflict in the newest release; no forced dependency or audit fixes were run.

## Files created

- `src/components/forms/RfqForm.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MegaMenu.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/OverlayMenu.tsx`
- `src/components/layout/SiteShell.tsx`
- `src/components/layout/SkipLink.tsx`
- `src/components/layout/SmoothScrollProvider.tsx`
- `src/components/sections/CareersTeaser.tsx`
- `src/components/sections/ClosingCta.tsx`
- `src/components/sections/FeaturedProjects.tsx`
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
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/InsightCard.tsx`
- `src/components/ui/MediaFrame.tsx`
- `src/components/ui/PageHero.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/components/ui/StatCard.tsx`
- `src/components/ui/TodoBadge.tsx`
- `src/content/placeholder.ts`
- `src/lib/constants.ts`
- `src/lib/nav.ts`
- `src/lib/rfq-schema.ts`
- `src/lib/utils.ts`
- `src/app/fonts/barlow-400.woff2`
- `src/app/fonts/barlow-500.woff2`
- `src/app/fonts/barlow-600.woff2`
- `src/app/fonts/barlow-700.woff2`
- `src/app/fonts/barlow-OFL.txt`
- `src/app/fonts/inter-100-900.woff2`
- `src/app/fonts/inter-OFL.txt`
- `src/app/about/page.tsx`
- `src/app/services/page.tsx`
- `src/app/sectors/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/qhse/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/careers/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/conduct/page.tsx`
- `src/app/vendors/page.tsx`
- `src/app/request-a-quote/actions.ts`
- `src/app/request-a-quote/page.tsx`
- `public/media-placeholder.svg`

## Existing files updated

- `src/app/layout.tsx`: fonts, site shell and metadata.
- `src/app/page.tsx`: twelve homepage sections in the requested order.
- `src/app/globals.css`: Tailwind v4 tokens, focus styles and reduced-motion rules.
- `next.config.ts`: multipart request allowance for the RFQ action.
- `package.json`, `package-lock.json`: requested form dependencies.
- `README.md`: structure handoff and content inventory.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed using Next.js 16.3.8 / Turbopack; all requested pages prerendered successfully.
- Chrome verification: all twelve homepage sections and visible TODO badges, desktop dropdowns, Escape/focus return, forward Tab loop, native mobile accordions, service-anchor navigation, and true touch interaction passed.
- Responsive checks at 320, 390 and 768 pixels passed, including a visible menu button and no horizontal overflow.
- Reduced-motion checks passed: no pin spacer, no video, no animated hero progress; preferences can change while the page is open.
- RFQ checks passed: inline required-field errors, unsupported attachment type, size over 10 MB, and a successful 10 MB upload to the validation-only action.
- Axe WCAG A/AA scans: zero violations on the homepage and RFQ page. Browser checks produced no JavaScript errors.
- Component scan: no hardcoded color values or forbidden physical-direction Tailwind utilities. `git diff --check` passed.
- Local Chrome measurement on the production build: LCP 160 ms, CLS 0. These synthetic measurements do not establish production Core Web Vitals; real imagery and deployment should be measured in the next phase.

Temporary browser tools and screenshots were kept outside the repository; no browser-testing dependency was added to the application.
