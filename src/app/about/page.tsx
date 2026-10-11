import { pageMetadata } from "@/lib/metadata";
import { real } from "@/content/real";
import Image from "next/image";
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
          {real.entities.map((entity) => {
            const subsidiary = real.subsidiaries.find((item) => item.fullName === entity.name);
            return (
            <section
              key={entity.name}
              id={subsidiary?.name.toLowerCase() ?? entity.name.toLowerCase().replaceAll(" ", "-")}
              className="border-t border-line pt-6"
            >
              {subsidiary && (
                <div className="mb-6 flex h-24 w-48 items-center justify-center rounded-card border border-line bg-white px-4 py-3">
                  <Image
                    src={subsidiary.logo}
                    alt={`${entity.name} logo`}
                    width={1401}
                    height={752}
                    sizes="160px"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
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
            );
          })}
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
        <section className="my-16 grid gap-8 rounded-card border-s-4 border-accent-2 bg-surface p-6 sm:p-8 lg:grid-cols-[15rem_1fr] lg:items-center lg:gap-12">
          <figure className="mx-auto w-full max-w-60">
            <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-[50%] border border-line bg-white ring-4 ring-white sm:w-52">
              <Image
                src="/images/team/syed-tahir-hussain.jpeg"
                alt="Syed Tahir Hussain, Chief Executive Officer"
                fill
                sizes="(min-width: 640px) 208px, 192px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="block text-lg font-semibold">Syed Tahir Hussain</span>
              <span className="mt-1 block text-sm text-muted">Chief Executive Officer</span>
            </figcaption>
          </figure>
          <div>
          <h2 className="mb-6 text-3xl">
            {real.ceoMessage.title} <ReviewBadge {...real.ceoMessage} />
          </h2>
          <blockquote className="max-w-4xl text-xl leading-relaxed">
            {real.ceoMessage.description}
          </blockquote>
          </div>
        </section>
        <section aria-labelledby="corporate-team-heading" className="rounded-card bg-white px-6 py-12 sm:px-10">
          <h2 id="corporate-team-heading" className="mb-10 text-center text-heading font-semibold">Corporate Team</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-8">
            {real.team.map((person) => (
              <article
                key={person.name}
                className="mx-auto w-full max-w-60 text-center last:sm:col-span-2 lg:col-span-2 last:lg:col-start-4"
              >
                <div className="relative mx-auto mb-6 aspect-[4/5] w-40 overflow-hidden rounded-[50%] border border-line bg-white ring-4 ring-paper/60 sm:w-44">
                  <Image
                    src={person.image}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(min-width: 640px) 176px, 160px"
                    className={person.name === "Syed Tahir Hussain" ? "object-cover object-center" : "object-cover object-top"}
                  />
                </div>
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{person.title}</p>
                <ReviewBadge {...person} />
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
