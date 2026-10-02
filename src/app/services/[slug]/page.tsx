import { MediaCollection } from "@/components/ui/MediaCollection";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceNames, serviceSlug, sectors, sectorHref } from "@/lib/nav";
import { getService } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { Button } from "@/components/ui/Button";
export function generateStaticParams() {
  return serviceNames.map((name) => ({ slug: serviceSlug(name) }));
}
export const dynamicParams = false;
async function resolve(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const name = serviceNames.find((name) => serviceSlug(name) === slug);
  if (!name) notFound();
  return getService(name);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await resolve(params);
  return pageMetadata(service.name, `/services/${serviceSlug(service.name)}`);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await resolve(params);
  return (
    <main id="main-content">
      <PageHero title={service.name} />
      <Container className="grid grid-cols-12 gap-x-4 gap-y-12 py-section lg:gap-x-8">
        <div className="col-span-12 min-w-0 lg:col-span-8">
          <ReviewBadge {...service} />
          <p className="my-6 text-xl leading-relaxed">{service.description}</p>
          <h2 className="mb-4 text-3xl">What we do</h2>
          <ul className="list-disc space-y-4 ps-5 text-muted">
            {placeholders.serviceBullets.map((item) => (
              <li key={item}>
                {item} <ReviewBadge todo />
              </li>
            ))}
          </ul>
          <h2 className="mb-4 mt-10 text-2xl">
            Explore our sectors <ReviewBadge confirm />
          </h2>
          <p className="mb-4 text-sm text-muted">
            Service-to-sector applicability requires confirmation.
          </p>
          <div className="mb-10 flex flex-wrap gap-4">
            {sectors.map((name) => (
              <Link
                key={name}
                href={sectorHref(name)}
                className="text-accent-on-light underline"
              >
                {name}
              </Link>
            ))}
          </div>

        </div>

      </Container>
      <Container className="pb-section"><MediaCollection slot={service.name} /></Container>
      <section data-tone="dark" className="bg-surface-raised py-section text-on-dark"><Container className="flex flex-wrap items-center justify-between gap-8"><div><p className="mb-3 text-xs uppercase tracking-widest text-accent">Discuss your requirements</p><h2 className="text-heading">Tell us about your scope</h2></div><Button href="/request-a-quote">Request a Quote</Button></Container></section>
    </main>
  );
}
