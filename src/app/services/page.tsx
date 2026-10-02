import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { serviceGroups, serviceHref } from "@/lib/nav";
import { getService } from "@/lib/services";
export function generateMetadata() { return pageMetadata("Services", "/services"); }
export default function Page() {
  return <main id="main-content">
    <PageHero title="Services" />
    <Container className="grid grid-cols-12 gap-y-16 py-section">
      {serviceGroups.map((group, index) => <section key={group.title} className="col-span-12">
        <p className="eyebrow mb-3 text-xs uppercase tracking-widest">0{index + 1} / Our capabilities</p>
        <span aria-hidden="true" className="mb-5 block h-px w-16 bg-accent-shape" />
        <h2 className="mb-8 text-heading font-semibold">{group.title}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {group.services.map(name => {
            const service = getService(name);
            return <Link key={name} id={serviceHref(name).split("/").pop()} href={serviceHref(name)} className="service-card media-hover block overflow-hidden rounded-sm border border-line bg-surface">
              <MediaFrame reveal slot={name} className="aspect-[4/3] rounded-none" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
              <div className="p-6">
                <h3 className="service-title mb-3 text-2xl font-semibold">{name}</h3>
                <p className="truncate text-sm text-muted" title={service.description}>{service.description}</p>
                <div className="mt-3"><ReviewBadge {...service} /></div>
                <span className="mt-6 inline-flex min-h-11 items-center gap-4 text-sm font-semibold text-link">Learn more <ArrowUpRight size={18} aria-hidden="true" className="rtl:-scale-x-100" /></span>
              </div>
            </Link>;
          })}
        </div>
      </section>)}
    </Container>
  </main>;
}
