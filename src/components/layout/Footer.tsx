import Link from "next/link";
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
    <footer className="border-t border-dark-line bg-navy py-14 text-on-dark">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <p className="font-display text-3xl">
            Dodzel Engineering
            <span className="mt-2 block font-sans text-xs tracking-widest text-muted-dark">
              ENGINEERING · PROCUREMENT · CONSTRUCTION
            </span>
          </p>
          <Link
            href="/request-a-quote"
            className="text-amber underline underline-offset-4"
          >
            Start a conversation ↗
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-5 text-sm text-amber">Company</h2>
            <ul className="space-y-3 text-sm text-muted-dark">
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
            <h2 className="mb-5 text-sm text-amber">Services</h2>
            <ul className="space-y-3 text-sm text-muted-dark">
              {serviceGroups
                .flatMap((g) => g.services)
                .map((name) => (
                  <li key={name}>
                    <Link
                      href={serviceHref(name)}
                      className="hover:text-on-dark"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm text-amber">Sectors</h2>
            <ul className="space-y-3 text-sm text-muted-dark">
              {sectors.map((name) => (
                <li key={name}>
                  <Link href={sectorHref(name)} className="hover:text-on-dark">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm text-amber">Contact</h2>
            <div className="space-y-3 text-sm text-muted-dark">
              <p>{placeholders.contact.email}</p>
              <p>{placeholders.contact.phone}</p>
              <p>{placeholders.contact.address}</p>
              <TodoBadge />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 border-t border-dark-line py-6 text-sm">
          <span className="text-muted-dark">Our subsidiaries</span>
          {subsidiaries.map((s) => (
            <Link
              key={s.name}
              href={`/about#${s.name.toLowerCase()}`}
              className="hover:underline"
            >
              {s.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-dark-line pt-6 text-xs text-muted-dark">
          <p>© {new Date().getFullYear()} Dodzel Engineering Limited</p>
          <p>
            {placeholders.legal.text} <TodoBadge />
          </p>
        </div>
      </Container>
    </footer>
  );
}
