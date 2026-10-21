import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
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
      className="border-t-4 border-accent-shape on-navy bg-surface-dark py-14 text-[var(--fg-heading)]"
    >
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <p className="font-display text-3xl">
            Dodzel Engineering
            <span className="mt-2 block font-sans text-xs tracking-widest text-[var(--fg-body)]">
              ENGINEERING · PROCUREMENT · CONSTRUCTION
            </span>
          </p>
          <Link
            href="/request-a-quote"
            className="text-[var(--fg-eyebrow)] underline underline-offset-4"
          >
            Start a conversation ↗
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="type-label mb-5 text-sm text-[var(--fg-eyebrow)]">Company</h2>
            <ul className="space-y-3 text-sm text-[var(--fg-body)]">
              {[
                ...navLinks.filter(
                  (x) => !["Services", "Sectors"].includes(x.label),
                ),
                ...secondaryLinks,
              ].map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="hover:text-[var(--fg-heading)]">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="type-label mb-5 text-sm text-[var(--fg-eyebrow)]">Services</h2>
            <ul className="space-y-3 text-sm text-[var(--fg-body)]">
              {serviceGroups
                .flatMap((g) => g.services)
                .map((name) => (
                  <li key={name}>
                    <Link
                      href={serviceHref(name)}
                      className="hover:text-[var(--fg-heading)]"
                    >
                      {name} <ReviewBadge {...getService(name)} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="type-label mb-5 text-sm text-[var(--fg-eyebrow)]">Sectors</h2>
            <ul className="space-y-3 text-sm text-[var(--fg-body)]">
              {sectors.map((name) => (
                <li key={name}>
                  <Link href={sectorHref(name)} className="hover:text-[var(--fg-heading)]">
                    {name} <ReviewBadge confirm={name === "Cement"} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="type-label mb-5 text-sm text-[var(--fg-eyebrow)]">Get in Touch</h2>
            <div className="space-y-3 text-sm text-[var(--fg-heading)]">
              <address className="flex items-start gap-3 not-italic leading-relaxed">
                <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{real.contact.address}</span>
              </address>
              <p className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" aria-hidden="true" />
                <span>{placeholders.contact.phone}</span>
              </p>
              <a
                href={`mailto:${real.contact.email}`}
                className="flex items-start gap-3 transition-colors hover:text-brand-glow focus-visible:text-brand-glow"
              >
                <Mail size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 break-words">{real.contact.email}</span>
              </a>
              {/* Replace these noninteractive icons with external links once official URLs are supplied. */}
              <div className="flex flex-wrap items-center gap-2 pt-1" role="group" aria-label="Social profiles awaiting official links">
                {/* {[
                  { label: "Facebook", Icon: Facebook },
                  { label: "LinkedIn", Icon: Linkedin },
                  { label: "Instagram", Icon: Instagram },
                  { label: "YouTube", Icon: Youtube },
                ].map(({ label, Icon }) => (
                  <span
                    key={label}
                    aria-label={`${label}: official link pending`}
                    title={`${label}: official link pending`}
                    className="inline-flex h-11 w-11 items-center justify-center text-[var(--fg-heading)]"
                  >
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                ))} */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t-4 border-accent-shape py-6 text-sm">
          <span className="text-[var(--fg-body)]">Our subsidiaries</span>
          {subsidiaries.map((s) => (
            <Link key={s.name} href={s.url} aria-label={`Visit ${s.fullName}`} className="group flex h-20 w-40 items-center justify-center rounded-card border border-white/15 on-light bg-white px-4 py-3 transition-colors hover:border-accent focus-visible:border-accent">
              <Image src={s.logo} alt={s.name} width={1401} height={752} sizes="128px" className="h-full w-full object-contain" />
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t-4 border-accent-shape pt-6 text-xs text-[var(--fg-body)]">
          <p>© 2026 Dodzel Engineering Limited.</p>
          <p>
            {placeholders.legal.text} <TodoBadge />
          </p>
        </div>
      </Container>
    </footer>
  );
}
