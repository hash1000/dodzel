import Link from "next/link";
import { Container } from "./Container";
import { PageHero } from "./PageHero";
import { real } from "@/content/real";

type LegalSection = { id: string; title: string; paragraphs: string[] };

export function LegalPage({ title, intro, sections }: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main id="main-content">
      <PageHero title={title} intro={intro} variant="plate" />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside>
          <p className="text-sm text-[var(--fg-body)]">Last updated <time dateTime="2026-10-29">29 October 2026</time></p>
          <nav aria-label={`${title} contents`} className="mt-6 border-t border-line pt-6">
            <p className="type-label mb-3 text-sm text-[var(--fg-eyebrow)]">On this page</p>
            <ol className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="inline-flex min-h-11 items-center py-2 text-sm text-[var(--fg-body)] underline-offset-4 hover:underline">
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="min-w-0 max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-32 border-b border-line pb-10">
                <h2 id={`${section.id}-heading`} className="mb-4 text-2xl sm:text-3xl">{index + 1}. {section.title}</h2>
                <div className="space-y-4 text-base leading-relaxed text-[var(--fg-body)]">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
          <section aria-labelledby="legal-contact" className="mt-10 rounded-card border border-line bg-surface p-6 sm:p-8">
            <h2 id="legal-contact" className="mb-3 text-2xl">Contact us</h2>
            <p className="mb-4 text-[var(--fg-body)]">For questions about this {title === "Privacy Policy" ? "policy" : "document"}, contact {real.company.name}.</p>
            <a href={`mailto:${real.contact.email}`} className="break-words underline underline-offset-4">{real.contact.email}</a>
            <address className="mt-3 not-italic leading-relaxed text-[var(--fg-body)]">{real.contact.address}</address>
          </section>
          <nav aria-label="Legal pages" className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm">
            <Link href="/privacy-policy" className="underline underline-offset-4">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="underline underline-offset-4">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </Container>
    </main>
  );
}
