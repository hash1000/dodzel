import Link from "next/link";
import { ReviewBadge } from "./ReviewBadge";
import { Container } from "./Container";
import { MediaFrame } from "./MediaFrame";
import { BannerMotion } from "./BannerMotion";
const intros: Record<string, string> = {
  About: "Get to know Dodzel Engineering Limited.",
  Services: "Explore our engineering, procurement and construction capabilities.",
  Sectors: "Explore the industrial sectors we serve.",
  Projects: "Illustrative sector media — approved project information is pending.",
  QHSE: "Our approach to quality, health, safety and the environment.",
  Insights: "Perspectives and updates — editorial content awaiting approval.",
  Careers: "Career information and people imagery awaiting approval.",
  Conduct: "Professionalism, integrity, safety and respect at work.",
  "Become a Vendor": "Supplier information and requirements awaiting approval.",
  Contact: "Start a conversation with Dodzel.",
  "Request a Quote": "Tell us about your project scope and requirements.",
};
export function PageHero({ title, intro, variant = "image", parent, confirm = false }: { title: string; intro?: string; variant?: "image" | "plate"; parent?: { title: string; href: string }; confirm?: boolean }) {
  if (variant === "plate") return <>
    <section data-tone="dark" className="bg-surface-dark pb-12 pt-36 text-on-dark sm:pb-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-3 text-xs">
          <Link href="/" className="link-slide inline-flex min-h-11 items-center">Home</Link><span aria-hidden="true">/</span>
          {parent && <><Link href={parent.href} className="link-slide inline-flex min-h-11 items-center">{parent.title}</Link><span aria-hidden="true">/</span></>}
          <span aria-current="page">{title}</span>
        </nav>
        <p className="mb-4 text-xs uppercase tracking-widest text-accent">Dodzel Engineering</p>
        <h1 className="max-w-[24ch] text-page font-semibold leading-tight">{title} <ReviewBadge confirm={confirm} /></h1>
        <p className="mt-4 max-w-[60ch] text-on-dark">{intro ?? intros[title] ?? "Sector information awaiting approval."}</p>
      </Container>
    </section>
    <Container><div aria-hidden="true" className="h-[3px] bg-accent-shape" /></Container>
  </>;
  return <>
    <BannerMotion>
      <MediaFrame slot={title} priority banner sizes="100vw" className="absolute inset-0 -z-20 h-full w-full rounded-none" />
      <Container className="relative grid h-full grid-cols-12 items-end pb-8 pt-32 sm:pb-12">
        <div className="col-span-12 lg:col-span-10">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-3 text-xs text-on-dark">
            <Link href="/" className="link-slide inline-flex min-h-11 items-center">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span>
          </nav>
          <p data-banner-follow className="mb-2 text-xs uppercase tracking-widest text-accent">Dodzel Engineering</p>
          <span data-banner-rule aria-hidden="true" className="banner-rule mb-4 block h-px w-16 bg-accent-shape" />
          <h1 className="max-w-[24ch] text-page font-semibold leading-tight">{title} <ReviewBadge confirm={confirm} /></h1>
          <p data-banner-follow className="mt-4 max-w-[60ch] text-sm text-on-dark sm:text-base">{intro ?? intros[title] ?? "Explore this capability and discuss your project requirements."}</p>
        </div>
      </Container>
    </BannerMotion>
    <Container><div aria-hidden="true" className="h-[3px] bg-accent-shape" /></Container>
  </>;
}
