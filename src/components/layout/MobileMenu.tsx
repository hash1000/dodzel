import Link from "next/link";
import { getService } from "@/lib/services";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import {
  navLinks,
  serviceGroups,
  serviceHref,
  sectors,
  sectorHref,
} from "@/lib/nav";
import { OverlayMenu } from "./OverlayMenu";
import { Button } from "@/components/ui/Button";
export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="space-y-10">
      <nav aria-label="Mobile navigation" className="divide-y divide-dark-line">
        {navLinks.map((link) =>
          link.label === "Services" || link.label === "Sectors" ? (
            <details key={link.href} className="py-4">
              <summary className="text-2xl">{link.label}</summary>
              <Link
                className="mt-4 block text-amber"
                href={link.href}
                onClick={onNavigate}
              >
                View all {link.label.toLowerCase()}
              </Link>
              {link.label === "Services"
                ? serviceGroups.map((group) => (
                    <div key={group.title} className="mt-6">
                      <p className="mb-3 text-sm text-amber">{group.title}</p>
                      {group.services.map((name) => (
                        <Link
                          key={name}
                          href={serviceHref(name)}
                          onClick={onNavigate}
                          className="block py-2"
                        >
                          {name} <ReviewBadge {...getService(name)} />
                        </Link>
                      ))}
                    </div>
                  ))
                : sectors.map((name) => (
                    <Link
                      key={name}
                      href={sectorHref(name)}
                      onClick={onNavigate}
                      className="block py-2"
                    >
                      {name}
                    </Link>
                  ))}
            </details>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="block py-4 text-2xl"
            >
              {link.label}
            </Link>
          ),
        )}
      </nav>
      <Button href="/request-a-quote" onClick={onNavigate}>
        Request a Quote
      </Button>
      <OverlayMenu onNavigate={onNavigate} />
    </div>
  );
}
