import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { RfqForm } from "@/components/forms/RfqForm";
export function generateMetadata() {
  return pageMetadata("Contact", "/contact");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Contact" />
      <Container className="grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold">{real.company.name}</h2>
          <address className="mb-6 max-w-md not-italic leading-relaxed">
            {real.contact.address}
          </address>
          <a
            href={`mailto:${real.contact.email}`}
            className="text-lg underline underline-offset-4"
          >
            {real.contact.email}
          </a>
          <a href={real.company.url} className="mt-4 block underline">
            www.dodzel.com
          </a>
          <div className="mt-4">
            <ReviewBadge {...real.contact} />
          </div>
          <p className="mt-6 text-muted">
            {placeholders.contact.phone} <ReviewBadge todo />
          </p>
          <section aria-labelledby="group-contacts-heading" className="mt-12">
            <h2 id="group-contacts-heading" className="mb-6 text-2xl font-semibold">Our offices & group companies</h2>
            <div className="space-y-6">
              {real.entities.slice(1).map((entity) => (
                <article key={entity.name} className="flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:gap-5">
                  <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-card border border-line bg-white p-3">
                    <Image src={entity.logo} alt={`${entity.name} logo`} width={1401} height={752} sizes="104px" className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{entity.name}</h3>
                    <p className="mb-2 mt-1 text-sm text-muted">{[entity.city, entity.country].filter(Boolean).join(" · ")}</p>
                    <a href={`mailto:${entity.email}`} className="break-words text-sm underline underline-offset-4 hover:text-accent-on-light">{entity.email}</a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <div>
          <h2 className="mb-6 text-3xl">Tell us about your project</h2>
          <RfqForm />
        </div>
      </Container>
    </main>
  );
}
