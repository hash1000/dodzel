import Link from "next/link";
import { notFound } from "next/navigation";
import { sectorData, sectorDetailHref } from "@/lib/nav";
import { coreServiceChips, sectorDescription } from "@/content/sectors";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { Button } from "@/components/ui/Button";
export function generateStaticParams() { return sectorData.map(sector => ({ slug: sector.id })); }
export const dynamicParams = false;
async function resolve(params: Promise<{slug: string}>) {
  const {slug} = await params;
  const sector = sectorData.find(item => item.id === slug);
  if (!sector) notFound();
  return sector;
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const sector = await resolve(params);
  return pageMetadata(sector.name, sectorDetailHref(sector.name));
}
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const sector = await resolve(params);
  return <main id="main-content">
    <PageHero title={sector.name} variant="plate" parent={{title: "Sectors", href: "/sectors"}} confirm={sector.confirm} />
    <Container className="py-section">
      <p className="mb-12 max-w-[65ch] text-body text-ink">{sectorDescription} <ReviewBadge todo /></p>
      <h2 className="mb-5 text-heading">Related services <ReviewBadge confirm /></h2>
      <p className="mb-8 text-muted">Service applicability to this sector requires client confirmation.</p>
      <div className="flex flex-wrap gap-3">
        {coreServiceChips.map(chip => <Link key={chip.label} href={chip.href!} className="inline-flex min-h-11 items-center gap-3 rounded-sm border border-line bg-surface px-4 py-3 text-link">{chip.label} <ReviewBadge confirm /></Link>)}
      </div>
    </Container>
    <section data-tone="dark" className="bg-surface-raised py-section text-on-dark">
      <Container className="flex flex-wrap items-center justify-between gap-8">
        <div><p className="mb-4 text-xs uppercase tracking-widest text-accent">Discuss your requirements</p><h2 className="text-heading">Tell us about your scope</h2></div>
        <Button href="/request-a-quote">Request a Quote</Button>
      </Container>
    </section>
  </main>;
}
