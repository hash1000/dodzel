import Link from "next/link";
import { Container } from "./Container";
import { MediaFrame } from "./MediaFrame";
export function PageHero({ title }: { title: string }) {
  return (
    <section
      data-tone="dark"
      className="relative isolate min-h-96 overflow-hidden bg-surface-dark pb-16 pt-44 text-on-dark"
    >
      <MediaFrame
        slot={title}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full rounded-none [&>div:last-child]:top-28"
      />
      <div aria-hidden="true" className="hero-shade absolute inset-0 -z-10 rtl:-scale-x-100" />
      <div
        aria-hidden="true"
        className="hero-bottom-shade absolute inset-0 -z-10"
      />
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-3 text-xs text-on-dark-muted"
        >
          <Link
            href="/"
            className="link-slide inline-flex min-h-11 items-center"
          >
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <h1 className="max-w-[18ch] text-page font-semibold">{title}</h1>
      </Container>
    </section>
  );
}
