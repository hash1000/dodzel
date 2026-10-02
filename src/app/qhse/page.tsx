import { MediaFrame } from "@/components/ui/MediaFrame";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
export function generateMetadata() {
  return pageMetadata("QHSE", "/qhse");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="QHSE" />
      <Container className="py-16">
        <h2 className="mb-6 text-heading font-semibold">
          {real.qhse.title} <ReviewBadge {...real.qhse} />
        </h2>
        <p className="max-w-2xl text-xl leading-relaxed">
          {real.qhse.description}
        </p>
        <div className="mt-12 grid gap-8">
          {real.policies.map((policy) => (
            <section
              key={policy.title}
              className="border-s-4 border-accent-2 bg-surface p-8"
            >
              <h2 className="mb-4 text-3xl text-accent-2">
                {policy.title} <ReviewBadge {...policy} />
              </h2>
              <p className="max-w-4xl leading-relaxed text-muted">
                {policy.description}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-muted">
          {placeholders.qhse.hoursLabel}: {placeholders.qhse.hours}{" "}
          <ReviewBadge todo />
        </p>
        <section className="my-12 grid items-center gap-8 sm:grid-cols-[1fr_20rem]">
          <div>
            <h2 className="mb-4 text-3xl">People and working environments</h2>
            <p className="text-muted">
              An illustrative stock view of an industrial worksite. Dodzel
              personnel imagery awaits approval.
            </p>
          </div>
          <MediaFrame
            slot="qhse-story"
            video
            className="aspect-[9/16]"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        </section>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {placeholders.certifications.map((cert) => (
            <article key={cert.title} className="border border-line p-6">
              <h3 className="mb-4 text-xl">{cert.title}</h3>
              <p className="mb-3 text-muted">{cert.detail}</p>
              <ReviewBadge todo />
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
