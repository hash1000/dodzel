import Link from "next/link";
import { real } from "@/content/real";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { getService } from "@/lib/services";
import {
  navLinks,
  serviceGroups,
  serviceHref,
  sectors,
  sectorHref,
  subsidiaries,
  secondaryLinks,
} from "@/lib/nav";
import { placeholders } from "@/content/placeholder";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { Container } from "@/components/ui/Container";
export function Footer() {
  return (
    <footer
      data-tone="dark"
      className="border-t-4 border-accent-shape bg-surface-dark py-14 text-on-dark"
    >
      <Container>
        <p className="preview-note mb-8 text-xs text-on-dark-muted">
          Preview — placeholder media
        </p>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <p className="font-display text-3xl">
            Dodzel Engineering
            <span className="mt-2 block font-sans text-xs tracking-widest text-on-dark-muted">
              ENGINEERING · PROCUREMENT · CONSTRUCTION
            </span>
          </p>
          <Link
            href="/request-a-quote"
            className="text-accent underline underline-offset-4"
          >
            Start a conversation ↗
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-5 text-sm text-accent">Company</h2>
            <ul className="space-y-3 text-sm text-on-dark-muted">
              {[
                ...navLinks.filter(
                  (x) => !["Services", "Sectors"].includes(x.label),
                ),
                ...secondaryLinks,
              ].map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="hover:text-on-dark">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm text-accent">Services</h2>
            <ul className="space-y-3 text-sm text-on-dark-muted">
              {serviceGroups
                .flatMap((g) => g.services)
                .map((name) => (
                  <li key={name}>
                    <Link
                      href={serviceHref(name)}
                      className="hover:text-on-dark"
                    >
                      {name} <ReviewBadge {...getService(name)} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm text-accent">Sectors</h2>
            <ul className="space-y-3 text-sm text-on-dark-muted">
              {sectors.map((name) => (
                <li key={name}>
                  <Link href={sectorHref(name)} className="hover:text-on-dark">
                    {name} <ReviewBadge confirm={name === "Cement"} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm text-accent">Contact</h2>
            <div className="space-y-3 text-sm text-on-dark-muted">
              <a
                href={`mailto:${real.contact.email}`}
                className="block text-accent hover:underline"
              >
                {real.contact.email}
              </a>
              <p>{placeholders.contact.phone}</p>
              <address className="not-italic leading-relaxed">
                {real.contact.address}
              </address>
              <ReviewBadge {...real.contact} />
              <TodoBadge />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 border-t-4 border-accent-shape py-6 text-sm">
          <span className="text-on-dark-muted">Our subsidiaries</span>
          {subsidiaries.map((s) => (
            <Link key={s.name} href={s.url} className="hover:underline">
              {s.name} <ReviewBadge {...s} />
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t-4 border-accent-shape pt-6 text-xs text-on-dark-muted">
          <p>© 2026 Dodzel Engineering Limited.</p>
          <p>
            {placeholders.legal.text} <TodoBadge />
          </p>
        </div>
      </Container>
    </footer>
  );
}
