import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors, sectorHref } from "@/lib/nav";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { real } from "@/content/real";
export function SectorsGrid() {
  return (
    <section
      data-tone="dark"
      className="bg-surface-dark py-section text-on-dark"
    >
      <Container>
        <SectionHeading {...placeholders.headings.sectors} />
        <p className="mb-10 text-on-dark-muted">
          {real.industries.description} <ReviewBadge {...real.industries} />
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {sectors.map((name) => (
            <Link
              key={name}
              href={sectorHref(name)}
              className="sector-tile media-hover relative block overflow-hidden rounded-card bg-surface-dark text-on-dark"
            >
              <MediaFrame
        reveal
                slot={name}
                video
                scrim
                className="aspect-[16/9] pb-20 [&>div:last-child]:items-start"
              />
              <span className="absolute start-6 end-6 bottom-6 flex items-center justify-between gap-4 font-display text-3xl font-semibold">
                {name} <ReviewBadge confirm />
                <ArrowUpRight size={24} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
