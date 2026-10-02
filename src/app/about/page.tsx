import { pageMetadata } from "@/lib/metadata";
import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
export function generateMetadata() {
  return pageMetadata("About", "/about");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="About" />
      <Container className="py-16">
        <div className="max-w-3xl">
          <p className="text-xl leading-relaxed">
            {real.company.description} <ReviewBadge {...real.company} />
          </p>
          <p className="mt-6 text-muted">
            Chief Executive Officer: {real.company.ceo}{" "}
            <ReviewBadge {...real.company} />
          </p>
          <p className="mt-6 text-muted">
            Presence: {real.countries.map((country) => country.name).join(", ")}
            . <ReviewBadge confirm />
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {real.subsidiaries.map((entity) => (
            <section
              key={entity.name}
              id={entity.name.toLowerCase()}
              className="border-t border-line pt-6"
            >
              <h2 className="text-2xl font-semibold">
                {entity.fullName} <ReviewBadge {...entity} />
              </h2>
              <p className="my-4 text-sm text-muted">{entity.detail}</p>
              <p className="leading-relaxed text-muted">{entity.description}</p>
              <a
                className="mt-5 inline-block underline underline-offset-4"
                href={entity.url}
              >
                {entity.name} website ↗
              </a>
              {entity.name === "Belgrass" && (
                <p className="mt-5 border-s-2 border-amber ps-4 text-sm text-muted">
                  {placeholders.belgrassMerger.question} <ReviewBadge todo />
                </p>
              )}
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
