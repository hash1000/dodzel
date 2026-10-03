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
          {real.entities.map((entity) => (
            <section
              key={entity.name}
              id={entity.name.toLowerCase()}
              className="border-t border-line pt-6"
            >
              <h2 className="text-2xl font-semibold">
                {entity.name} <ReviewBadge {...entity} />
              </h2>
              <p className="my-4 text-sm text-muted">{entity.country}</p>
              {entity.url && (
                <a
                  className="mt-5 inline-block underline underline-offset-4"
                  href={entity.url}
                >
                  Visit website ↗
                </a>
              )}
            </section>
          ))}
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-card border-t-4 border-accent-2 bg-surface p-8">
            <h2 className="mb-5 text-3xl text-accent-2">
              {real.mission.title} <ReviewBadge {...real.mission} />
            </h2>
            <p className="leading-relaxed text-muted">
              {real.mission.description}
            </p>
          </section>
          <section className="rounded-card border-t-4 border-accent-2 bg-surface p-8">
            <h2 className="mb-5 text-3xl text-accent-2">
              {real.success.title} <ReviewBadge {...real.success} />
            </h2>
            <ul className="list-disc space-y-3 ps-5 text-muted">
              {real.success.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <section className="my-16 border-s-4 border-accent-2 bg-surface p-8">
          <h2 className="mb-6 text-3xl">
            {real.ceoMessage.title} <ReviewBadge {...real.ceoMessage} />
          </h2>
          <blockquote className="max-w-4xl text-xl leading-relaxed">
            {real.ceoMessage.description}
          </blockquote>
          <p className="mt-6 text-muted">Syed Tahir Hussain · CEO</p>
        </section>
        <section>
          <h2 className="mb-8 text-heading font-semibold">Corporate Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {real.team.map((person) => (
              <article
                key={person.name}
                className="rounded-card border border-line bg-surface p-6"
              >
                <div
                  aria-hidden="true"
                  className="mb-5 grid aspect-square place-items-center rounded-full bg-paper font-display text-4xl text-accent-2"
                >
                  {person.name
                    .replace("Mrs. ", "")
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </div>
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="my-3 text-sm text-muted">{person.title}</p>
                <ReviewBadge {...person} />
                <p className="mt-4 text-xs text-muted">
                  {placeholders.teamPhoto} <ReviewBadge todo />
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
